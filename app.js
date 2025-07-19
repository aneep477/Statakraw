let usScore = 0;
let themScore = 0;
let currentRotation = 1;
let stats = JSON.parse(localStorage.getItem('sepaktakraw_stats')) || [];
let players = ['Pemain1', 'Pemain2', 'Pemain3', 'Simpanan1', 'Simpanan2'];  // Ubah nama jika perlu

// Muat data semula jika ada
if (stats.length > 0) {
  calculateScores();
  updateStatsTable();
}

function recordAction(action, type) {
  // Asumsi tindakan untuk pemain pertama; anda boleh tambah pemilihan pemain
  stats.push({ player: players[0], action: action, type: type, rotation: currentRotation, time: new Date().toISOString() });
  if (type === 'earned') usScore++;
  if (type === 'error' || type === 'fault') themScore++;
  updateScores();
  updateStatsTable();
}

function updateScores() {
  document.getElementById('usScore').textContent = usScore;
  document.getElementById('themScore').textContent = themScore;
  document.getElementById('rotation').textContent = currentRotation;
}

function changeRotation() {
  // Logic tukar rotasi (contoh: cycle 1-3)
  currentRotation = (currentRotation % 3) + 1;
  updateScores();
}

// Fungsi lain (placeholder)
function changeServer() { alert('Server ditukar!'); }
function timeOut() { alert('Time Out!'); }

function calculateScores() {
  usScore = stats.filter(item => item.type === 'earned').length;
  themScore = stats.filter(item => (item.type === 'error' || item.type === 'fault')).length;
}

function updateStatsTable() {
  const tbody = document.querySelector('#statsTable tbody');
  tbody.innerHTML = '';
  players.forEach(player => {
    const playerStats = stats.filter(s => s.player === player);
    const pointsWon = playerStats.filter(s => s.type === 'earned').length;
    const errors = playerStats.filter(s => s.type === 'error' || s.type === 'fault').length;
    const total = playerStats.length;
    const row = document.createElement('tr');
    row.innerHTML = `<td>${player}</td><td>${pointsWon}</td><td>${errors}</td><td>${total}</td>`;
    tbody.appendChild(row);
  });
}

function saveData() {
  localStorage.setItem('sepaktakraw_stats', JSON.stringify(stats));
  alert('Data disimpan!');
}

function clearData() {
  stats = [];
  usScore = 0;
  themScore = 0;
  localStorage.removeItem('sepaktakraw_stats');
  updateScores();
  updateStatsTable();
}
