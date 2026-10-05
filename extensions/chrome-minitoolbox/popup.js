const TOOLS = [
  { name: 'Schengen 90/180 Tracker', sub: 'EU Rolling Rule Calculator', icon: '🇪🇺', url: 'https://schengen.minitoolbox.dev' },
  { name: 'Anmeldung Document Prep', sub: 'German Registration & Redaction', icon: '🇩🇪', url: 'https://anmeldung.minitoolbox.dev' },
  { name: 'Rirekisho Builder', sub: 'Japanese Resume JIS PDF & Wareki', icon: '🇯🇵', url: 'https://rirekisho.minitoolbox.dev' },
  { name: 'Cross-Border Size Converter', sub: 'US/EU/UK/KR/VN Shoe & Clothes', icon: '👟', url: 'https://size.minitoolbox.dev' },
  { name: 'Secure PDF Suite', sub: 'Client-Side PDF Merge & Split', icon: '📄', url: 'https://pdf.minitoolbox.dev' },
  { name: 'WASM Media Studio', sub: 'Local Video/Audio Converter', icon: '🎬', url: 'https://media.minitoolbox.dev' },
  { name: 'VisaRun Planner', sub: 'Southeast Asia Border Run Tracker', icon: '✈️', url: 'https://visarun.minitoolbox.dev' },
  { name: 'Nomad TimeSync', sub: 'World Timezone & Meeting Golden Hours', icon: '🌐', url: 'https://timesync.minitoolbox.dev' },
  { name: 'Cờ Caro Online', sub: 'Gomoku Strategy vs Local AI', icon: '🎮', url: 'https://caro.minitoolbox.dev' }
];

const listEl = document.getElementById('toolList');
const searchInput = document.getElementById('searchInput');

function render(items) {
  listEl.innerHTML = '';
  if (items.length === 0) {
    listEl.innerHTML = '<div style="text-align:center; padding:16px; font-size:11px; color:#94a3b8;">No tools found</div>';
    return;
  }
  items.forEach(t => {
    const a = document.createElement('a');
    a.className = 'tool-item';
    a.href = t.url;
    a.target = '_blank';
    a.innerHTML = `
      <div class="tool-info">
        <div class="tool-icon">${t.icon}</div>
        <div class="tool-text">
          <span class="tool-name">${t.name}</span>
          <span class="tool-sub">${t.sub}</span>
        </div>
      </div>
      <span class="arrow">↗</span>
    `;
    listEl.appendChild(a);
  });
}

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = TOOLS.filter(t => t.name.toLowerCase().includes(q) || t.sub.toLowerCase().includes(q));
  render(filtered);
});

render(TOOLS);
