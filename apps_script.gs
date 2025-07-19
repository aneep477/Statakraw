function doPost(e) {
  const ss = SpreadsheetApp.openById("https://script.google.com/macros/s/AKfycbzMl_XId7bzVJlm6tYQh1sP47VLJSMJUD2UJ9O7k5h6CKdX3CR8mx2SEf3aEAthOuHG/exec");
  const sheet = ss.getSheetByName("Data");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.timestamp, data.team, data.opponent, data.date, data.action]);
  return ContentService.createTextOutput("Success");
}
