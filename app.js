function recordAction(action) {
  const team = document.getElementById('teamName').value;
  const opponent = document.getElementById('opponentName').value;
  const date = document.getElementById('matchDate').value;
  const data = { team, opponent, date, action, timestamp: new Date().toISOString() };
  console.log("Saving to Google Sheets:", data);
  // Integrate with Google Apps Script Web App endpoint here
}