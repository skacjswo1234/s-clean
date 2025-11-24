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
    
    // 이메일 수신 주소
    const RECIPIENT_EMAIL = 'seonghwan14566@gmail.com';
    
    // 스프레드시트 열기
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // 받은 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    
    // 현재 날짜/시간
    const timestamp = new Date();
    const formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    // 데이터를 시트에 추가
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.service || '',
      data.area || '',
      data.message || ''
    ]);
    
    // 이메일 제목
    const emailSubject = '🚨 쓸어담다 새 문의 접수: ' + (data.name || '이름 없음');
    
    // 이메일 본문 작성
    const emailBody = `
새로운 문의가 접수되었습니다!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 문의 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 이름: ${data.name || '미입력'}
📞 연락처: ${data.phone || '미입력'}
🏠 서비스 유형: ${data.service || '미입력'}
📏 평수/면적: ${data.area || '미입력'}
💬 문의내용: ${data.message || '미입력'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ 접수일시: ${formattedDate}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

빠른 시일 내에 연락드려주세요!

쓸어담다 문의 시스템
    `.trim();
    
    // 이메일 전송
    try {
      GmailApp.sendEmail(
        RECIPIENT_EMAIL,
        emailSubject,
        emailBody,
        {
          // HTML 형식으로 더 예쁘게 보낼 수도 있습니다
          // htmlBody: createHtmlEmail(data, formattedDate)
        }
      );
    } catch (emailError) {
      // 이메일 전송 실패해도 시트 저장은 성공했으므로 로그만 남김
      console.error('이메일 전송 실패:', emailError);
    }
    
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
 * HTML 형식 이메일 생성 함수 (선택사항)
 * 더 예쁜 이메일을 원하시면 이 함수를 사용하세요
 */
function createHtmlEmail(data, formattedDate) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #cfbeb0 0%, #8b7355 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f8f8; padding: 20px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #8b7355; }
        .label { font-weight: bold; color: #8b7355; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🚨 새로운 문의가 접수되었습니다!</h2>
        </div>
        <div class="content">
          <div class="info-box">
            <span class="label">👤 이름:</span> ${data.name || '미입력'}
          </div>
          <div class="info-box">
            <span class="label">📞 연락처:</span> ${data.phone || '미입력'}
          </div>
          <div class="info-box">
            <span class="label">🏠 서비스 유형:</span> ${data.service || '미입력'}
          </div>
          <div class="info-box">
            <span class="label">📏 평수/면적:</span> ${data.area || '미입력'}
          </div>
          <div class="info-box">
            <span class="label">💬 문의내용:</span><br>
            ${data.message || '미입력'}
          </div>
          <div class="info-box">
            <span class="label">⏰ 접수일시:</span> ${formattedDate}
          </div>
        </div>
        <div class="footer">
          <p>빠른 시일 내에 연락드려주세요!</p>
          <p>쓸어담다 문의 시스템</p>
        </div>
      </div>
    </body>
    </html>
  `;
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
