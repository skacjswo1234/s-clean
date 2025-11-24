# 이메일 알림 설정 가이드

## 📧 구글 시트 데이터 입력 시 이메일 자동 전송 설정

### ✅ 작동 원리
1. 웹사이트에서 문의 폼 제출
2. Google Apps Script가 구글 시트에 데이터 저장
3. **자동으로 seonghwan14566@gmail.com으로 이메일 전송**
4. Gmail 앱이 휴대폰에 푸시 알림 표시

---

## 🔧 설정 방법

### 1단계: Google Apps Script 코드 업데이트

1. **Google Sheets 열기**
   - 기존에 사용 중인 구글 시트를 엽니다

2. **Apps Script 에디터 열기**
   - `확장 프로그램` > `Apps Script` 클릭

3. **코드 교체**
   - `google-sheets-integration.js` 파일의 내용을 복사
   - Apps Script 에디터의 기존 코드를 모두 삭제하고 붙여넣기

4. **스프레드시트 ID 확인**
   ```javascript
   const SPREADSHEET_ID = '여기에_스프레드시트_ID_입력';
   ```
   - 구글 시트 URL에서 ID 복사
   - 예: `https://docs.google.com/spreadsheets/d/1ORsOv_XZhaYXOsRSDXmW-a4mJJjM3kstcYQPCXj4PbU/edit`
   - ID는 `1ORsOv_XZhaYXOsRSDXmW-a4mJJjM3kstcYQPCXj4PbU` 부분

5. **이메일 주소 확인**
   ```javascript
   const RECIPIENT_EMAIL = 'seonghwan14566@gmail.com';
   ```
   - 이미 설정되어 있습니다

6. **저장**
   - `Ctrl + S` 또는 `파일` > `저장`

---

### 2단계: 권한 승인

1. **첫 실행 시 권한 요청**
   - Apps Script 에디터에서 `실행` 버튼 클릭
   - 또는 `doPost` 함수 선택 후 실행

2. **권한 승인**
   - "이 앱이 확인되지 않았습니다" 경고가 나오면
   - `고급` > `seonghwan14566@gmail.com(으)로 이동` 클릭
   - `허용` 클릭

3. **필요한 권한**
   - ✅ Google Sheets 접근 권한
   - ✅ Gmail 전송 권한

---

### 3단계: 웹 앱 배포 (이미 했다면 건너뛰기)

1. **배포 메뉴**
   - `배포` > `새 배포` 클릭

2. **배포 설정**
   - **유형 선택**: `웹 앱` 클릭
   - **설명**: "문의 폼 데이터 수신 및 이메일 전송"
   - **실행 사용자**: `나`
   - **액세스 권한**: `모든 사용자`

3. **배포**
   - `배포` 버튼 클릭
   - 생성된 **웹 앱 URL** 복사

4. **URL 업데이트**
   - `index.html` 파일의 `GOOGLE_SCRIPT_URL` 변수에 URL 입력

---

### 4단계: 휴대폰 Gmail 앱 설정

#### 📱 Android
1. **Gmail 앱 설치** (이미 설치되어 있다면 건너뛰기)
2. **알림 설정**
   - Gmail 앱 열기
   - `설정` > `계정` > `seonghwan14566@gmail.com` 선택
   - `알림` 켜기
   - `이메일 알림` 켜기
   - `소리 및 진동` 설정

#### 📱 iOS
1. **Gmail 앱 설치** (이미 설치되어 있다면 건너뛰기)
2. **알림 설정**
   - iPhone `설정` 앱 열기
   - `알림` > `Gmail` 선택
   - `알림 허용` 켜기
   - `소리`, `배지`, `화면 표시` 모두 켜기

---

## 🧪 테스트 방법

### 방법 1: 웹사이트에서 테스트
1. 웹사이트의 문의 폼 작성
2. 제출 버튼 클릭
3. 구글 시트에 데이터가 저장되는지 확인
4. **seonghwan14566@gmail.com 메일함 확인**
5. **휴대폰에 알림이 오는지 확인**

### 방법 2: Apps Script에서 직접 테스트
```javascript
// Apps Script 에디터에서 실행
function testEmail() {
  const testData = {
    name: '테스트',
    phone: '010-1234-5678',
    service: '입주청소',
    area: '30평',
    message: '테스트 문의입니다'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  doPost(mockEvent);
}
```

---

## 📧 이메일 내용

이메일에는 다음 정보가 포함됩니다:
- ✅ 이름
- ✅ 연락처
- ✅ 서비스 유형
- ✅ 평수/면적
- ✅ 문의내용
- ✅ 접수일시

---

## ⚠️ 주의사항

1. **Gmail 일일 전송 한도**
   - 무료 계정: 하루 500통
   - 일반적으로 충분하지만, 문의가 많을 경우 주의

2. **스팸 메일함**
   - 처음에는 스팸 메일함에 들어갈 수 있음
   - `스팸 아님` 표시 후 정상 수신됨

3. **알림이 안 올 때**
   - Gmail 앱 알림 설정 확인
   - 휴대폰 알림 설정 확인
   - 배터리 최적화 설정 확인 (Android)

---

## 🔍 문제 해결

### 이메일이 안 가는 경우
1. Apps Script 실행 로그 확인
2. Gmail 전송 권한 확인
3. 이메일 주소 오타 확인

### 알림이 안 오는 경우
1. Gmail 앱 알림 설정 확인
2. 휴대폰 알림 설정 확인
3. Gmail 앱 재시작

---

## 📞 추가 도움말

문제가 발생하면:
1. Apps Script 실행 로그 확인
2. Gmail 전송 기록 확인
3. 구글 시트에 데이터가 저장되는지 확인

