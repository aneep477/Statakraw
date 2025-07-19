let usScore = 0;
let themScore = 0;
let currentRotation = 1;
let stats = JSON.parse(localStorage.getItem('sepaktakraw_stats')) || [];
let players = ['Pemain1', 'Pemain2', 'Pemain3', 'Simpanan1', 'Simpanan2'];
let spiderChart = null;

// Muat data semula jika ada
if (stats.length > 0) {
  calculateScores();
  updateStatsTable();
}

function recordAction(player, action, type) {
  stats.push({ player: player, action: action, type: type, rotation: currentRotation, time: new Date().toISOString() });
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
  currentRotation = (currentRotation % 3) + 1;
  updateScores();
  alert('Rotation ditukar!');
}

function changeServer() {
  alert('Server ditukar!');
}

function timeOut() {
  alert('Time Out!');
}

function playerChange() {
  alert('Player Change!');
}

function changeSet() {
  alert('Set ditukar!');
}

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
  updateSpiderChart();
}

function updateSpiderChart() {
  const ctx = document.getElementById('spiderChart').getContext('2d');
  const datasets = players.map(player => {
    const playerStats = stats.filter(s => s.player === player);
    const pointsWon = playerStats.filter(s => s.type === 'earned').length;
    const errors = playerStats.filter(s => s.type === 'error' || s.type === 'fault').length;
    const total = playerStats.length;
    return {
      label: player,
      data: [pointsWon, errors, total],
      fill: true,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
      pointBackgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    };
  });

  if (spiderChart) {
    spiderChart.destroy();
  }

  spiderChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Points Won', 'Errors', 'Total Actions'],
      datasets: datasets
    },
    options: {
      elements: {
        line: {
          borderWidth: 3
        }
      }
    }
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
  alert('Data direset!');
}

function exportData() {
  const dataStr = JSON.stringify(stats, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sepaktakraw_stats.json';
  a.click();
  URL.revokeObjectURL(url);
  alert('Data dieksport!');
}
