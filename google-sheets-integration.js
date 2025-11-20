/**
 * Google Apps Script 코드
 * 
 * 사용 방법:
 * 1. Google Sheets 새 스프레드시트 생성
 * 2. 확장 프로그램 > Apps Script 클릭
 * 3. 아래 코드를 복사하여 붙여넣기
 * 4. 저장 후 배포 > 새 배포 > 유형: 웹 앱
 * 5. 실행 사용자: 자신
 * 6. 액세스 권한: 모든 사용자
 * 7. 배포 후 생성된 웹 앱 URL을 복사
 * 8. index.html의 GOOGLE_SCRIPT_URL 변수에 URL 입력
 */

function doPost(e) {
  try {
    // 스프레드시트 ID를 여기에 입력하세요
    const SPREADSHEET_ID = '1ORsOv_XZhaYXOsRSDXmW-a4mJJjM3kstcYQPCXj4PbU';
    
    // 스프레드시트 열기
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // 받은 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    
    // 현재 날짜/시간
    const timestamp = new Date();
    
    // 데이터를 시트에 추가
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.service || '',
      data.area || '',
      data.message || ''
    ]);
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '문의가 성공적으로 접수되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': '오류가 발생했습니다: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리 (테스트용)
 * 브라우저에서 직접 URL을 열 때 사용
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Google Sheets 연동 스크립트가 정상적으로 작동 중입니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 테스트 함수 (선택사항)
 * Apps Script 에디터에서 직접 실행하여 시트에 헤더 추가
 */
function setupSheet() {
  const SPREADSHEET_ID = '1ORsOv_XZhaYXOsRSDXmW-a4mJJjM3kstcYQPCXj4PbU';
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
  
  // 헤더 추가 (이미 있으면 건너뛰기)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      '접수일시',
      '이름',
      '연락처',
      '서비스 유형',
      '평수/면적',
      '문의내용'
    ]);
    
    // 헤더 스타일링
    const headerRange = sheet.getRange(1, 1, 1, 6);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#cfbeb0');
    headerRange.setFontColor('#ffffff');
    
    // 열 너비 자동 조정
    sheet.autoResizeColumns(1, 6);
  }
}
