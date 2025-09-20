document.addEventListener('DOMContentLoaded', () => {
  if (!load()) {
    state.profile = { userGender: '', partnerGender: '', notes: '' };
    state.qualities = [];
    save();
  }

  // Bind profile inputs
  byId('user-gender').addEventListener('change', e => {
    state.profile.userGender = e.target.value;
    save();
  });
  byId('partner-gender').addEventListener('change', e => {
    state.profile.partnerGender = e.target.value;
    save();
  });
  byId('profile-notes').addEventListener('input', e => {
    state.profile.notes = e.target.value;
    save();
  });

  // Add quality
  byId('btn-add-quality').addEventListener('click', () => {
    const name = (byId('add-quality-name').value || '').trim();
    if (!name || state.qualities.length >= 20) {
      byId('quality-warning').style.display = 'block';
      return;
    }
    state.qualities.push({ name, rating: 3 });
    byId('add-quality-name').value = '';
    byId('quality-warning').style.display = 'none';
    renderQualities();
    save();
  });

  // New
  byId('btn-new').addEventListener('click', () => {
    if (!confirm('Start a new scorecard? This clears current form (saved copy stays in browser).')) return;
    state.profile = { userGender: '', partnerGender: '', notes: '' };
    state.qualities = [];
    renderQualities();
    save();
  });

  // Save
  byId('btn-save').addEventListener('click', () => {
    save();
    alert('Saved to this browser.');
  });

  // Export to Excel
  byId('btn-export').addEventListener('click', exportExcel);

  // Initial render
  renderQualities();
});
