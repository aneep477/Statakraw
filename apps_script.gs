function doPost(e) {
  const ss = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID");
  const sheet = ss.getSheetByName("Data");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.timestamp, data.team, data.opponent, data.date, data.action]);
  return ContentService.createTextOutput("Success");
}