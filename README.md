
## 인증

'인증' API를 통해 로그인한 사용자만 `/loginHome`으로 이동할 수 있습니다.<br> 
#### `/home`과 `/loginHome`의 차이점

- 헤더의 Guest > 사용자 닉네임
- MapleStory Market에 오신 것을 환영합니다! > 사용자 닉넴임 + MapleStory Market에 오신 것을 환영합니다!
- 로그인/회원가입 > 마이페이지/제품검색

![게스트 화면](https://user-images.githubusercontent.com/102528180/179904663-baf96551-6744-4fb9-b34f-1c9ce29567b9.PNG)

![로그인한 메인화면](https://user-images.githubusercontent.com/102528180/179905131-a25c2e1c-cf5c-4b98-9ace-d91d1604a15d.PNG)

### 회원가입





### 로그인

- 발급된 `accessToken`은 24시간 후 만료됩니다.(만료 후 다시 로그인 필요)

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login
  \ -X 'POST'
```

```plaintext
@param {String} email - 사용자 아이디 (필수!)
@param {String} password - 사용자 비밀번호 (필수!) 
@return {Object} userInfo
@return {Object} userInfo.user - 로그인한 사용자 정보
@return {String} userInfo.accessToken - 사용자 접근 토큰
```

요청 데이터 예시:

```json
{
  "email": "thesecon@gmail.com",
  "password": "********"
}
```

응답 데이터 예시:

```json
{
  "user": {
    "email": "thesecon@gmail.com",
    "displayName": "ParkYoungWoong",
    "profileImg": "https://storage.googleapis.com/heropy-api/vAKjlJ-Gx5v163442.png"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)"
}
```

### 인증 확인

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext 
@return {Object} - 로그인한 사용자 정보
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
{
  "email": "thesecon@gmail.com",
  "displayName": "ParkYoungWoong",
  "profileImg": "https://storage.googleapis.com/heropy-api/vAKjlJ-Gx5v163442.png"
}
```

### 로그아웃

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext 
@return {Boolean} - 로그아웃 여부
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
true
```

### 사용자 정보 수정

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user 
  \ -X 'PUT'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@param {String} displayName - 새로운 사용자 이름
@param {String} profileImgBase64 - 새로운 사용자 프로필 이미지(base64)
@param {String} oldPassword - 기존 사용자 비밀번호
@param {String} newPassword - 새로운 사용자 비밀번호
@return {Object} - 수정된 사용자 정보
```

요청 데이터 예시:

```json
{
  "oldPassword": "********",
  "newPassword": "**********"
}
```

응답 데이터 예시:

```json
{
  "email": "thesecon@gmail.com",
  "displayName": "ParkYoungWoong",
  "profileImg": "https://storage.googleapis.com/heropy-api/vAKjlJ-Gx5v163442.png"
}
```

<hr />

## 계좌

'계좌' 관련 API는 모두 일반 사용자 전용입니다.

### 선택 가능한 은행 목록 조회

- 은행 당 하나의 계좌만 허용됩니다.
- 사용자가 계좌를 추가하면, 해당 은행 정보 `disabled` 속성이 `true`로 변경됩니다.
- 은행 정보 `digits` 속성의 숫자를 모두 더하면 각 은행의 유효한 계좌번호 길이가 됩니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@return {Object[]} - 선택 가능한 은행 목록
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
[
  {
    "name": "KB국민은행",
    "code": "004",
    "digits": [3, 2, 4, 3],
    "disabled": false
  },
  {
    "name": "신한은행",
    "code": "088",
    "digits": [3, 3, 6],
    "disabled": true
  },
  {
    "name": "우리은행",
    "code": "020",
    "digits": [4, 3, 6],
    "disabled": true
  },
  {
    "name": "하나은행",
    "code": "081",
    "digits": [3, 6, 5],
    "disabled": false
  },
  {
    "name": "케이뱅크",
    "code": "089",
    "digits": [3, 3, 6],
    "disabled": false
  },
  {
    "name": "카카오뱅크",
    "code": "090",
    "digits": [4, 2, 7],
    "disabled": false
  },
  {
    "name": "NH농협은행",
    "code": "011",
    "digits": [3, 4, 4, 2],
    "disabled": false
  }
]
```

### 계좌 목록 및 잔액 조회

- 계좌번호는 일부만 노출됩니다. E.g. `"356-XXXX-XXXX-XX"`
- 잔액의 단위는 '원화(￦)'입니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account 
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@return {Object} object
@return {Object} object.totalBalance - 계좌 잔액 총합
@return {Object[]} object.accounts - 계좌 정보 배열
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
{
  "totalBalance": 5999900,
  "accounts": [
    {
      "id": "jQMfKla8vOIFELA3mAXv",
      "bankName": "NH농협은행",
      "bankCode": "011",
      "accountNumber": "356-XXXX-XXXX-XX",
      "balance": 2999900
    },
    {
      "id": "wiPgsXvMAmcLw8AuRHIi",
      "bankName": "KB국민은행",
      "bankCode": "004",
      "accountNumber": "123-XX-XXXX-XXX",
      "balance": 3000000
    }
  ]
}
```

### 계좌 연결

- 연결된 계좌 잔액에는 자동으로 기본 '3백만원'이 추가됩니다.
- 요청하는 계좌번호에는 `-` 구분이 없어야 합니다.
- 요청하는 전화번호에는 `-` 구분이 없어야 합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@param {String} bankCode - 은행 코드 (필수!)
@param {String} accountNumber - 계좌번호 (필수!)
@param {String} phoneNumber - 전화번호 (필수!)
@param {Boolean} signature - 서명 (필수!)
@return {Object} - 연결한 계좌 정보
```

요청 데이터 예시:

```json
{
  "bankCode": "088",
  "accountNumber": "123456789012",
  "phoneNumber": "01012345678",
  "signature": true
}
```

응답 데이터 예시:

```json
{
  "id": "1qRFC6Ey5VkSu6nyj5Ba",
  "bankName": "신한은행",
  "bankCode": "088",
  "accountNumber": "123-XXX-XXXXXX",
  "balance": 3000000
}
```

### 계좌 해지

- 해지한 계좌는 다시 연결해도 잔액이 반영되지 않습니다.(기본 금액으로 추가됩니다)

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account 
  \ -X 'DELETE'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@param {String} accountId - 계좌 ID (필수!)
@param {Boolean} signature - 서명 (필수!)
@return {Boolean} - 계좌 해지 여부
```

요청 데이터 예시:

```json
{
  "accountId": "jQMfKla8vOIFELA3mAXv",
  "signature": true
}
```

응답 데이터 예시:

```js
true
```

<hr />

## 제품

'제품' 관련 API는 관리자 전용과 일반 사용자 전용으로 구분됩니다.<br>
공용 API도 있으니 주의하세요!

### 모든 제품 조회

- 관리자 전용 API입니다.
- 상세 정보가 아닌 기본 정보의 제품 설명은 100자까지만 포함됩니다.
- 상세 정보가 아닌 기본 정보의 제품 상세 사진은 포함되지 않습니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products 
  \ -X 'GET'
  \ -H 'masterKey: true'
```

```plaintext
@return {Object[]} - 관리하는 모든 제품의 배열
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
[
  {
    "id": "cFmeC7aY5KjZbBAdJE9y",
    "title": "삼성전자 스마트모니터 M7 S43AM700",
    "price": 639000,
    "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
    "tags": [
      "가전",
      "모니터",
      "컴퓨터"
    ],
    "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png",
    "isSoldOut": false
  },
  {
    "id": "nbqtQvEivYwEXTDet7YM",
    "title": "MacBook Pro 16",
    "price": 3360000,
    "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성",
    "tags": [
      "가전",
      "노트북",
      "컴퓨터"
    ],
    "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
    "isSoldOut": false
  }
]
```

### 전체 판매 내역

- 관리자 전용 API입니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all 
  \ -X 'GET'
  \ -H 'masterKey: true'
```

```plaintext
@return {Object[]} - 판매한 모든 정보 내역
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
[
  {
    "detailId": "dMhfxyrAupQP18OYmywy",
    "user": {
      "email": "thesecon@gmail.com",
      "displayName": "ParkYoungWoong",
      "profileImg": "https://storage.googleapis.com/heropy-api/vsLRqTlPO5v200111.png"
    },
    "product": {
      "productId": "cFmeC7aY5KjZbBAdJE9y",
      "title": "삼성전자 스마트모니터 M7 S43AM700",
      "price": 639000,
      "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
      "tags": [
        "가전",
        "모니터",
        "컴퓨터"
      ],
      "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png"
    },
    "account": {
      "bankName": "KB국민은행",
      "bankCode": "004",
      "accountNumber": "123-XX-XXXX-XXX"
    },
    "reservation": null,
    "timePaid": "2021-11-07T20:01:49.100Z",
    "isCanceled": false,
    "done": false
  }
]
```

응답 데이터에 `reservation` 값이 `null`이 아닌 경우 예시:

```json
[
  {
    "reservation": {
      "start": "2021-11-12T06:00:00.000Z",
      "end": "2021-11-12T07:00:00.000Z",
      "isCanceled": false,
      "isExpired": true
    }
  }
]
```

### 판매 내역 관리

- 관리자 전용 API입니다.
- 판매 내역을 취소하면, 예약도 같이 취소됩니다.
- 판매 내역을 취소 해제하면, 예약도 같이 취소 해제됩니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/:detailId 
  \ -X 'PUT'
  \ -H 'masterKey: true'
```

```plaintext
@param {Boolean} isCanceled - 판매 취소 여부 (사용자의 '제품 구매 취소' 상태와 같습니다)
@param {Boolean} done - 판매 완료 여부 (사용자의 '제품 구매 확정' 상태와 같습니다)
@return {Boolean} - 처리 여부
```

요청 데이터 예시:

```json
{
  "isCanceled": true
}
```

응답 데이터 예시:

```js
true
```

### 제품 추가

- 관리자 전용 API입니다.
- 파일(사진)은 Base64로 요청해야 합니다.
- 제품 썸네일 사진은 1MB 이하여야 합니다.
- 제품 상세 사진은 4MB 이하여야 합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products 
  \ -X 'POST'
  \ -H 'masterKey: true'
```

```plaintext
@param {String} title - 제품 이름 (필수!)
@param {Number} price - 제품 가격 (필수!)
@param {String} description - 제품 상세 설명 (필수!)
@param {String[]} tags - 제품 태그
@param {String} thumbnailBase64 - 제품 썸네일 사진 Base64
@param {String} photoBase64 - 제품 상세 사진 Base64
@return {Object} object - 추가한 제품의 상세 내용
```

요청 데이터 예시:

```json
{
  "title": "MacBook Pro 16",
  "price": 3360000,
  "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
  "tags": [
    "가전",
    "노트북",
    "컴퓨터"
  ],
  "thumbnailBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...(생략)"
}
```

응답 데이터 예시:

```json
{
  "id": "nbqtQvEivYwEXTDet7YM",
  "title": "MacBook Pro 16",
  "price": 3360000,
  "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
  "tags": [
    "가전",
    "노트북",
    "컴퓨터"
  ],
  "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
  "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
  "isSoldOut": false
}
```

### 제품 수정

- 관리자 전용 API입니다.
- 사용자의 구매 내역 확인을 위해, 제품을 실제로는 삭제하지 않고 매진(Sold Out) 처리해야 합니다.
- 매진은 다시 해제할 수 있습니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/:productId
  \ -X 'PUT'
  \ -H 'masterKey: true'
```

```plaintext
@param {String} title - 제품 이름
@param {Number} price - 제품 가격
@param {String} description - 제품 상세 설명
@param {String[]} tags - 제품 태그
@param {String} thumbnailBase64 - 제품 썸네일 사진 
@param {String} photoBase64 - 제품 상세 사진
@param {Boolean} isSoldOut - 제품 매진 여부
@return {Object} - 수정한 제품의 상세 내용
```

요청 데이터 예시:

```json
{
  "price": 1500
}
```

응답 데이터 예시:

```json
{
  "id": "nbqtQvEivYwEXTDet7YM",
  "title": "MacBook Pro 16",
  "price": 1500,
  "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
  "tags": [
    "가전",
    "노트북",
    "컴퓨터"
  ],
  "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
  "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
  "isSoldOut": false
}
```

### 단일 제품 상세 조회

- 공용 API입니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/:productId
  \ -X 'GET'
```

```plaintext
@return {Object} - 제품의 상세 내용
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
{
  "id": "nbqtQvEivYwEXTDet7YM",
  "title": "MacBook Pro 16",
  "price": 3360000,
  "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
  "tags": [
    "가전",
    "노트북",
    "컴퓨터"
  ],
  "isSoldOut": false,
  "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
  "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
  "reservations": []
}
```

응답 데이터에 `reservations` 값이 `[]`(빈 배열)이 아닌 경우 예시:

```json
{
  "reservations": [
    {
      "reservation": {
        "start": "2021-11-12T06:00:00.000Z",
        "end": "2021-11-12T07:00:00.000Z",
        "isCanceled": false,
        "isExpired": true
      }
    }
  ] 
}
```

### 제품 검색

- 사용자 전용 API입니다.
- 제품 이름과 태그를 동시에 검색할 수 있고, 'And' 조건으로 결과를 반환합니다.
- 제품의 기본 정보만 반환합니다.
- 매진된 제품은 검색되지 않습니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search
  \ -X 'POST'
```

```plaintext
@param {String} searchText - 제품 이름으로 검색
@param {Array} searchTags - 제품 태그로 검색
@return {Object[]} - 검색한 제품 배열
```

요청 데이터 예시:

```json
{
  "searchText": "삼성전자",
  "searchTags": ["가전"]
}
```

응답 데이터 예시:

```json
[
  {
    "id": "cFmeC7aY5KjZbBAdJE9y",
    "title": "삼성전자 스마트모니터 M7 S43AM700",
    "price": 639000,
    "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
    "tags": [
      "가전",
      "모니터",
      "컴퓨터"
    ],
    "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png"
  }
]
```

### 제품 구매 신청

- 사용자 전용 API입니다.
- 구매 신청시 연결된 계좌에서 결제됩니다.
- 결제할 계좌(ID)를 꼭 선택해야 합니다.(`계좌 목록 및 잔액 조회` API를 사용하세요)
- 선택한 계좌의 잔액보다 결제 금액이 크면 결제 처리되지 않습니다.(에러 반환)

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/buy 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@param {String} productId - 구매할 제품 ID (필수!)
@param {String} accountId - 결제할 계좌 ID (필수!)
@param {Object} reservation - 예약 정보
@param {String} reservation.start - 예약 시작 시간 (ISO)
@param {String} reservation.end - 예약 종료 시간 (ISO)
@return {Boolean} - 결제 여부
```

요청 데이터 예시:

```json
{
  "productId": "nbqtQvEivYwEXTDet7YM",
  "accountId": "Mq2KKHk8vlmr6Xkg58Fa",
  "reservation": {
    "start": "2021-11-12T06:00:00.000Z",
    "end": "2021-11-12T07:00:00.000Z"
  }
}
```

응답 데이터 예시:

```json
true
```

### 제품 구매 취소

- 사용자 전용 API입니다.
- 구매 취소시 결제한 계좌로 환불됩니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@param {String} detailId - 구매를 취소할 구매 내역 ID (필수!)
@return {Boolean} - 취소 여부
```

요청 데이터 예시:

```json
{
  "detailId": "dMhfxyrAupQP18OYmywy"
}
```

응답 데이터 예시:

```json
true
```

### 제품 구매 확정

- 사용자 전용 API입니다.
- 구매 확정 후에는 취소할 수 없습니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/ok 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@param {String} detailId - 구매를 확정할 구매 내역 ID (필수!)
@return {Boolean} - 구매 확정 여부
```

요청 데이터 예시:

```json
{
  "detailId": "dMhfxyrAupQP18OYmywy"
}
```

응답 데이터 예시:

```json
true
```

### 제품 전체 구매 내역

- 사용자 전용 API입니다.
- 내역의 기본 정보만 포함됩니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details 
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@return {Object[]} - 구매 정보 배열
```

요청 데이터 예시:

```js
undefined
```

응답 데이터 예시:

```json
[
  {
    "detailId": "9jAoagzrZBkSWI5NctEB",
    "product": {
      "productId": "nbqtQvEivYwEXTDet7YM",
      "title": "MacBook Pro 16",
      "price": 3360000,
      "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성",
      "tags": [
        "가전",
        "노트북",
        "컴퓨터"
      ],
      "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png"
    },
    "reservation": null,
    "timePaid": "2021-11-07T20:17:32.112Z",
    "isCanceled": true,
    "done": false
  },
  {
    "detailId": "dMhfxyrAupQP18OYmywy",
    "product": {
      "productId": "cFmeC7aY5KjZbBAdJE9y",
      "title": "삼성전자 스마트모니터 M7 S43AM700",
      "price": 639000,
      "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
      "tags": [
        "가전",
        "모니터",
        "컴퓨터"
      ],
      "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png"
    },
    "reservation": {
      "start": "2021-11-12T06:00:00.000Z",
      "end": "2021-11-12T07:00:00.000Z",
      "isCanceled": false,
      "isExpired": true
    },
    "timePaid": "2021-11-07T20:01:49.100Z",
    "isCanceled": false,
    "done": true
  }
]
```

### 단일 제품 상세 구매 내역

- 사용자 전용 API입니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@param {String} detailId - 상세 내용을 확인할 구매 내역 ID (필수!)
@return {Object} - 해당 제품의 상세 구매 정보
```

요청 데이터 예시:

```json
{
  "detailId": "dMhfxyrAupQP18OYmywy"
}
```

응답 데이터 예시:

```json
{
  "detailId": "dMhfxyrAupQP18OYmywy",
  "product": {
    "productId": "cFmeC7aY5KjZbBAdJE9y",
    "title": "삼성전자 스마트모니터 M7 S43AM700",
    "price": 639000,
    "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,000:1 / 최대 주사율: 60Hz / HDMI 2.0 / USB Type-C / 플리커 프리 / 블루라이트 차단 / 게임모드 지원 / 스피커 / 리모컨 / USB허브 / Wi-Fi(무선) / 스마트TV / 블루투스 / 틸트(상하) / 200 x 200mm / HDR / HDR10 / 10.6kg 기획전 차세대 게임 라이프 PS5 매력분석 관련기사 큐소닉, 43인치 4K UHD 스마트 모니터 ‘삼성전자 M7 S43AM700’ 출시 및 할인 행사 사용기 삼성 스마트모니터 m7 s43am700",
    "tags": [
      "가전",
      "모니터",
      "컴퓨터"
    ],
    "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png",
    "photo": "https://storage.googleapis.com/heropy-api/vVLP-ox_zSDv195712.jpg"
  },
  "account": {
    "bankName": "KB국민은행",
    "bankCode": "004",
    "accountNumber": "123-XX-XXXX-XXX"
  },
  "reservation": null,
  "timePaid": "2021-11-07T20:01:49.100Z",
  "isCanceled": false,
  "done": true
}
```
