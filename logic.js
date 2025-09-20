function compute() {
  const totalCompat = state.qualities.reduce((sum, q) => sum + STANDARD * (Number(q.rating) || 1), 0);
  byId('total-compat').textContent = totalCompat;
}

function renderQualities() {
  const tbody = byId('qualities-body');
  tbody.innerHTML = state.qualities.map((q, i) => `
    <tr>
      <td>${escapeHtml(q.name)}</td>
      <td>${STANDARD}</td>
      <td>
        <select class="rating" data-idx="${i}">
          ${[1,2,3,4,5].map(n => `<option ${q.rating==n?'selected':''}>${n}</option>`).join('')}
        </select>
      </td>
      <td>${STANDARD * q.rating}</td>
      <td><button class="btn danger" data-remove-quality="${i}">Remove</button></td>
    </tr>
  `).join('');
  compute();
  bindQualityEvents();
}

function escapeHtml(s) {
  return s.replace(/[&<>\"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]));
}

function bindQualityEvents() {
  document.querySelectorAll('select.rating').forEach(sel => {
    sel.addEventListener('change', e => {
      const idx = Number(e.target.dataset.idx);
      state.qualities[idx].rating = Number(e.target.value);
      renderQualities();
    });
  });
  document.querySelectorAll('button[data-remove-quality]').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = Number(e.target.getAttribute('data-remove-quality'));
      state.qualities.splice(idx, 1);
      renderQualities();
    });
  });
}

function save() {
  localStorage.setItem('false-alarm', JSON.stringify(state));
}

function load() {
  const blob = localStorage.getItem('false-alarm');
  if (!blob) return false;
  try {
    Object.assign(state, JSON.parse(blob));
    return true;
  } catch {
    return false;
  }
}
