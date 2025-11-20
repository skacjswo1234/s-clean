# 빠른 시작 가이드

Google Sheets 링크가 설정되었습니다! 이제 몇 가지 단계만 완료하면 됩니다.

## ✅ 이미 완료된 작업
- ✅ Google Sheets 스프레드시트 ID: `1ORsOv_XZhaYXOsRSDXmW-a4mJJjM3kstcYQPCXj4PbU`
- ✅ 코드에 스프레드시트 ID 적용 완료

## 📋 다음 단계

### 1단계: Google Sheets에 헤더 추가 (필수!)

1. [Google Sheets 링크 열기](https://docs.google.com/spreadsheets/d/1ORsOv_XZhaYXOsRSDXmW-a4mJJjM3kstcYQPCXj4PbU/edit?usp=sharing)
2. 첫 번째 행(A1~F1)에 다음 헤더 입력:

| A1 | B1 | C1 | D1 | E1 | F1 |
|---|---|---|---|---|---|
| **접수일시** | **이름** | **연락처** | **서비스 유형** | **평수/면적** | **문의내용** |

**빠른 입력 방법:**
- A1에 다음을 복사해서 붙여넣기:
```
접수일시	이름	연락처	서비스 유형	평수/면적	문의내용
```

### 2단계: Google Apps Script 설정

1. **Google Sheets에서 Apps Script 열기**
   - 확장 프로그램 > Apps Script 클릭

2. **코드 붙여넣기**
   - `google-sheets-integration.js` 파일의 내용을 복사
   - Apps Script 에디터에 붙여넣기
   - (스프레드시트 ID는 이미 설정되어 있습니다!)

3. **헤더 자동 생성 (선택사항)**
   - `setupSheet` 함수 선택
   - 실행 버튼 클릭
   - 권한 허용 → 헤더가 자동으로 생성됩니다

4. **저장**
   - Ctrl+S (또는 Cmd+S)

### 3단계: 웹 앱으로 배포

1. **배포 메뉴**
   - Apps Script 에디터에서 **배포** > **새 배포** 클릭

2. **설정**
   - 톱니바퀴 아이콘(설정) 클릭
   - **유형**: 웹 앱 선택
   - **설명**: "쓸어담다 문의 폼" (원하는 이름)
   - **실행 사용자**: **나** 선택
   - **액세스 권한**: **모든 사용자** 선택

3. **배포**
   - **배포** 버튼 클릭
   - **웹 앱 URL** 복사
     - 예시: `https://script.google.com/macros/s/AKfycby.../exec`

### 4단계: HTML에 웹 앱 URL 입력

1. **index.html 파일 열기**

2. **URL 입력**
   - 다음 줄을 찾습니다 (약 743번째 줄):
   ```javascript
   const GOOGLE_SCRIPT_URL = '';
   ```
   
   - 3단계에서 복사한 웹 앱 URL을 입력:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

3. **저장**

## ✅ 테스트

1. 웹사이트의 문의하기 폼 작성
2. 제출 버튼 클릭
3. Google Sheets를 열어 새 데이터가 추가되었는지 확인

## 📊 예상 결과

Google Sheets에 다음과 같이 데이터가 추가됩니다:

| 접수일시 | 이름 | 연락처 | 서비스 유형 | 평수/면적 | 문의내용 |
|---------|------|--------|-----------|----------|---------|
| 2024-01-01 12:00:00 | 홍길동 | 010-1234-5678 | 입주청소 | 30평 | 문의 내용... |

## 🔧 문제 해결

### 데이터가 나타나지 않는 경우
1. 헤더가 첫 번째 행에 정확히 입력되었는지 확인
2. 웹 앱 배포 시 "모든 사용자"로 설정했는지 확인
3. 브라우저 개발자 도구(F12)에서 에러 확인

### 헤더가 없는 경우
- `setupSheet` 함수를 실행하거나
- 수동으로 첫 번째 행에 헤더 입력

## 🎉 완료!

이제 문의 폼이 제출될 때마다 Google Sheets에 자동으로 저장됩니다!
