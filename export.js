function exportExcel() {
  const wb = XLSX.utils.book_new();

  const profileSheet = XLSX.utils.aoa_to_sheet([
    ['You are', state.profile.userGender],
    ['Your date is', state.profile.partnerGender],
    ['Notes', state.profile.notes]
  ]);
  XLSX.utils.book_append_sheet(wb, profileSheet, 'Profile');

  const qualitiesSheet = XLSX.utils.aoa_to_sheet([
    ['Quality', 'Standard', 'Partner Rating', 'Weighted'],
    ...state.qualities.map(q => [q.name, STANDARD, q.rating, STANDARD * q.rating])
  ]);
  XLSX.utils.book_append_sheet(wb, qualitiesSheet, 'Qualities');

  XLSX.writeFile(wb, 'false-alarm-scorecard.xlsx');
}
