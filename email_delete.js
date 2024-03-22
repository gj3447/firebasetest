const admin = require('firebase-admin');

// 서비스 계정 키 초기화
const serviceAccount = {
  type: "service_account",
  project_id: "mathtwo-dev",
  private_key_id: "52b9929f22cb105ca33c37546fa5062fec63f81e",
  private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClZ3aXdBfaauvN\nDONMg+PII6N4rz94BMZjWpvu3f/7I0q7tUpJbUfmBYZoFiXDjAsnUiOIQdvtEAcH\ni4MBvdoM9fIvNrxRGG7KwkEYSHMIEDDoOLLmXnUPtkIW0lsSMejesFIsmkshqPbh\nVCW0QOnWnUjZ8oUWRtpmz4L6lRNcywvjhREpBSoano+2LFBBfdO4bl53dT2XmJR0\npeoCzhcLamP6LZe+WnIJ4vyDVARzNWNJTncyDSkCGG/SgHZrULqKdBEsHjBX75aL\nNwnKkA81ZoFnnlLtm7lO+AcNF+v6iwe2MQ6+POw7suPXcgBJHnh7a9bub8KfAIKX\nICwQbQdpAgMBAAECggEADJ1Q6T5p3qGz58NZXHRckrQhG1WmOLAzNHrsadxq0YuV\n/1iAA2HpugG8Mpj/JU7mFN10p0d6jzW0i4nuIluz0wmOKwqjdGiGyUDlDQXi0VUc\nHcHL5w+CIazL6oioIxbvryLHCZl01xWB9UULy8JS8ygIrn01Utxxe1DNKPDl9U10\nQ+wb3tbthCPXPSJY6aIQdtbICTRB17fwhpZUyB2UxSvZONYQAU5JohcrElDgdrhu\nbMsTGMuC3+fltrUjPZ7CjJJdwRlDkfTHQ+2Gh8MC1LfmzRHKWwTBwZOk8DcurXEF\nfH9KUh2sdbpd9AipMsrxmauwlUDN8jjwsDCAoFk4LwKBgQDShhslRKMyezhDFtHU\np90lN3bQ7a7BVWUR/xLvlRyO9Bo6aa16qf8wzhAtGUaASDwLXRtFmKe1bvKTqny7\nvIG6T6xn1j97SrU/U/s07c0Bn+KsXnmGx5Y9PR8AsVWAbZMfogwlUkV8oEmAQ6Ho\nYXHMlF9CTATN6r0Zpzt/EUAH+wKBgQDJIkEETO44YHWEelOOrhuaC/zgpDKfdtb0\nC0kRVaUOoT9thbZ9joyqwChJOvxCH/NEPj5zT6COyxT6LqV/c8MIWz1p79mIteYr\nGOflBATdTHCBLvsvoAteiJYmP9JsRRkmt+KPBFEtCUa67XT69/9aRWEYfdhFq887\ntEpavz7c6wKBgQCIUrrlSSr8l3n5R5+cuw6i+OWBqUfOfcOzAZ97cO1LTJpnVOM3\nWTmcmvMyoPlcPGpVWXc9e/qtrCh8opue3hSLVuhnXP9CkUAIwBMdVRe5g5U+1PaQ\n5lFNWnTm9+5L+aiZhU+kI0BH0WuHGUSQu/j65uFAhwVdajIFmJsYT01NXQKBgEN+\nYyL2TdpNRCI4imGOu2RuMWWQtAwe7PLn9pUCkGjgY1B1Vk+7ziheYyZvzMbDwfZc\njMhVKCPCsj9h99dVGVVsiKdL/UuK/rnnmamYN6mrRPWUtmW85xPJ8djUAeCjL1V2\nz2f+ot7iBgIkPOUa421/ap21XSXECb6XOXxKQOYRAoGAP89J7E+lmEvggjCJd3/u\nYzJ/wT0lSc8F2aAKYhacJZzTJS+7WGpwLN65H3yy5TUIzkTeWe+ng1BalzYG4oqv\nMU9IytmMTu9qAAM8OQ9D1QYmQitYjzuIPm5X5Oaim0oO+hf6ibt3bFU3gVCcIbid\nRSpVxnGccIkbCOB17WkGX6Q=\n-----END PRIVATE KEY-----\n`,
  client_email: "firebase-adminsdk-r8q6w@mathtwo-dev.iam.gserviceaccount.com",
  client_id: "108128045480664849481",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r8q6w%40mathtwo-dev.iam.gserviceaccount.com"
};

//파이어 베이스 테스트
try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin SDK has been successfully initialized.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization failed:', error);
    return;
  }
  
  // Firebase Authentication 사용자 정보 찾아오기
  admin.auth().listUsers() // 1명의 사용자 정보만 가져옴으로써 연결 확인
    .then(listUsersResult => {
      if (listUsersResult.users.length > 0) {
        listUsersResult.users.forEach(userRecord => {console.log(userRecord.email)});
        console.log('Successfully connected to Firebase Authentication service.');
      } else {
        console.log('Firebase Authentication service is accessible, but no users found.');
      }
    })
    .catch(error => {
      console.error('Failed to connect to Firebase Authentication service:', error);
    });

// 이메일 주소를 사용하여 사용자 검색 및 삭제
const userEmail = 'pjk2101a@honam.hs.kr';

admin.auth().getUserByEmail(userEmail)
  .then((userRecord) => {
    // 성공적으로 사용자를 찾았으면 삭제
    return admin.auth().deleteUser(userRecord.uid);
  })
  .then(() => {
    console.log(`Successfully deleted user with email: ${userEmail}`);
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });
  