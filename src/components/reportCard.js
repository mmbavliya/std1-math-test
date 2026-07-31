// Progress Report Card & Printable Certificate Generator (Page 14 Assessment Grid)
export class ReportCardController {
  constructor() {
    this.tbodyEl = document.getElementById('report-table-body');
    this.studentNameEl = document.getElementById('results-student-name');
    this.starsSummaryEl = document.getElementById('score-stars-summary');
  }

  renderReport(studentName, scores, totalStars, lang = 'gu') {
    this.studentNameEl.textContent = `${lang === 'gu' ? 'વિદ્યાર્થીનું નામ' : 'Student Name'}: ${studentName || 'આરાધ્યા / Aaradhya'}`;
    
    // Render Star String
    const numStars = Math.min(5, Math.ceil((totalStars / 7) * 5));
    this.starsSummaryEl.textContent = '⭐'.repeat(numStars) + '☆'.repeat(5 - numStars);

    const outcomes = [
      { id: 'inside_outside', name: { gu: 'અંદર-બહારની વસ્તુઓને ઓળખી બતાવે છે.', en: 'Identifies objects inside vs outside.' } },
      { id: 'above_below', name: { gu: 'ઉપર-નીચે ઓળખી બતાવે છે.', en: 'Identifies objects above vs below.' } },
      { id: 'topmost_bottommost', name: { gu: 'સૌથી ઉપર - સૌથી નીચે ઓળખી બતાવે છે.', en: 'Identifies topmost vs bottommost objects.' } },
      { id: 'near_far', name: { gu: 'નજીક-દૂર ઓળખી બતાવે છે.', en: 'Identifies near vs far objects.' } },
      { id: 'in_front_behind', name: { gu: 'આગળ-પાછળને ઓળખી બતાવે છે.', en: 'Identifies objects in front vs behind.' } },
      { id: 'frontmost_rearmost', name: { gu: 'સૌથી આગળ અને સૌથી પાછળને ઓળખી બતાવે છે.', en: 'Identifies frontmost vs rearmost objects.' } },
      { id: 'classification', name: { gu: 'કદ, રંગ, આકાર ગુણધર્મોના આધારે વર્ગીકરણ કરે છે.', en: 'Classifies objects by size, color & shape.' } }
    ];

    this.tbodyEl.innerHTML = '';
    outcomes.forEach((item, index) => {
      const isPassed = scores[item.id] !== false;
      const grade = isPassed ? 'A' : 'B';
      const gradeClass = `grade-${grade}`;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name[lang]}</td>
        <td><span class="grade-badge ${gradeClass}">${grade} (${isPassed ? 'ઉત્કૃષ્ટ / Excellent' : 'સુધારાસ્પદ / Good'})</span></td>
      `;
      this.tbodyEl.appendChild(row);
    });
  }

  printCertificate() {
    window.print();
  }
}
