# Google Sheets 연동 설정 가이드

이 문서는 문의하기 폼을 Google Sheets와 연동하는 방법을 안내합니다.

## 📋 사전 준비

1. Google 계정이 있어야 합니다.
2. Google Drive 접근 권한이 필요합니다.

## 🚀 설정 단계

### 1단계: Google Sheets 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com)에 접속합니다.
2. 새 스프레드시트를 생성합니다.
3. 스프레드시트 이름을 변경합니다 (예: "쓸어담다 문의 접수").
4. **URL에서 스프레드시트 ID를 복사합니다.**
   - URL 예시: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - `SPREADSHEET_ID` 부분이 스프레드시트 ID입니다.

### 2단계: Google Apps Script 설정

1. 스프레드시트에서 **확장 프로그램** > **Apps Script**를 클릭합니다.
2. `google-sheets-integration.js` 파일의 내용을 복사하여 Apps Script 에디터에 붙여넣습니다.
3. **스프레드시트 ID 입력**:
   - `const SPREADSHEET_ID = '여기에_스프레드시트_ID_입력';` 부분을 찾습니다.
   - 1단계에서 복사한 스프레드시트 ID로 변경합니다.
   ```javascript
   const SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID';
   ```
4. **저장** 버튼을 클릭합니다 (Ctrl+S 또는 Cmd+S).

### 3단계: 헤더 설정 (선택사항, 권장)

1. Apps Script 에디터에서 `setupSheet` 함수를 선택합니다.
2. **실행** 버튼을 클릭합니다.
3. 권한 요청이 나타나면 **권한 검토** > 계정 선택 > **고급** > **안전하지 않은 페이지로 이동**을 클릭합니다.
4. 허용을 클릭합니다.
5. 다시 실행 버튼을 클릭하면 시트에 헤더가 생성됩니다.

### 4단계: 웹 앱으로 배포

1. Apps Script 에디터에서 **배포** > **새 배포**를 클릭합니다.
2. 톱니바퀴 아이콘(설정)을 클릭하고 다음을 설정합니다:
   - **유형**: 웹 앱
   - **설명**: "문의 폼 데이터 수집" (자유롭게 작성)
   - **실행 사용자**: 나
   - **액세스 권한**: 모든 사용자
3. **배포** 버튼을 클릭합니다.
4. **웹 앱 URL**이 표시됩니다. 이 URL을 복사합니다.
   - 예시: `https://script.google.com/macros/s/AKfycby.../exec`

### 5단계: HTML에 URL 연결

1. `index.html` 파일을 엽니다.
2. 다음 줄을 찾습니다:
   ```javascript
   const GOOGLE_SCRIPT_URL = '';
   ```
3. 4단계에서 복사한 웹 앱 URL을 입력합니다:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. 파일을 저장합니다.

## ✅ 확인 방법

1. 웹사이트의 문의하기 폼을 작성합니다.
2. 제출 버튼을 클릭합니다.
3. Google Sheets를 열어 새 행이 추가되었는지 확인합니다.

## 🔧 문제 해결

### 데이터가 시트에 나타나지 않는 경우

1. **스프레드시트 ID 확인**: Apps Script 코드의 `SPREADSHEET_ID`가 올바른지 확인합니다.
2. **배포 URL 확인**: HTML의 `GOOGLE_SCRIPT_URL`이 최신 배포 URL인지 확인합니다.
3. **권한 확인**: 웹 앱 배포 시 "모든 사용자"로 설정했는지 확인합니다.
4. **브라우저 콘솔 확인**: F12를 눌러 개발자 도구를 열고 에러 메시지를 확인합니다.

### 헤더가 없는 경우

1. Apps Script에서 `setupSheet` 함수를 실행합니다.
2. 또는 수동으로 시트에 다음 헤더를 추가합니다:
   - 접수일시
   - 이름
   - 연락처
   - 서비스 유형
   - 평수/면적
   - 문의내용

### CORS 에러가 발생하는 경우

- `no-cors` 모드로 설정되어 있어 응답을 읽을 수 없습니다. 이는 정상 동작입니다.
- 데이터는 여전히 Google Sheets에 저장됩니다.

## 📊 데이터 형식

시트에 저장되는 데이터 형식:

| 접수일시 | 이름 | 연락처 | 서비스 유형 | 평수/면적 | 문의내용 |
|---------|------|--------|-----------|----------|---------|
| 2024-01-01 12:00:00 | 홍길동 | 010-1234-5678 | 입주청소 | 30평 | 문의내용... |

## 🔒 보안 참고사항

- 웹 앱 URL은 공개되면 누구나 액세스할 수 있습니다.
- 악의적인 요청을 방지하려면 추가 인증을 구현하는 것을 고려하세요.
- 스프레드시트 ID와 웹 앱 URL을 소스 코드에 직접 포함하지 않고 환경 변수로 관리하는 것이 좋습니다.

## 💡 추가 기능 (선택사항)

### 이메일 알림 추가

Apps Script 코드에 다음을 추가하면 문의가 접수될 때마다 이메일을 받을 수 있습니다:

```javascript
// doPost 함수 내에 추가
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: '새로운 문의가 접수되었습니다',
  body: `이름: ${data.name}\n연락처: ${data.phone}\n서비스: ${data.service}`
});
```

### 스프레드시트 자동 포맷팅

`setupSheet` 함수에 추가하여 데이터가 들어올 때마다 자동으로 포맷을 적용할 수 있습니다.
