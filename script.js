// Data for small and middle scale formulas
const formulas = {
  small: [
    { np30: 15, emal10: 6.5, sodaAbu: 6, sttp: 3, sodiumSulfat: 69.3, parfum: 0.2 },
    { np30: 14, emal10: 7, sodaAbu: 5, sttp: 3, sodiumSulfat: 70.75, parfum: 0.25 },
    { np30: 10, emal10: 10, sodaAbu: 5, sttp: 3, sodiumSulfat: 71.7, parfum: 0.3 },
    { np30: 16, emal10: 5, sodaAbu: 5, sttp: 3, sodiumSulfat: 70.7, parfum: 0.3 },
    { np30: 14, emal10: 7, sodaAbu: 5, sttp: 3, sodiumSulfat: 70.75, parfum: 0.25 },
    { np30: 20, emal10: 2, sodaAbu: 6, sttp: 3, sodiumSulfat: 68.8, parfum: 0.2 },
    { np30: 12, emal10: 8, sodaAbu: 5, sttp: 5, sodiumSulfat: 69.7, parfum: 0.3 }
  ],
  middle: [
    { np30: 20, emal10: 10, sodaAbu: 10, sttp: 6, sodiumSulfat: 50.65, parfum: 0.3, cmc: 3, antifoam: 0.05 },
    { np30: 15, emal10: 15, sodaAbu: 10, sttp: 6, sodiumSulfat: 50.65, parfum: 0.3, cmc: 3, antifoam: 0.05 },
    { np30: 18, emal10: 14, sodaAbu: 10, sttp: 6, sodiumSulfat: 48.65, parfum: 0.3, cmc: 3, antifoam: 0.05 },
    { np30: 15, emal10: 14, sodaAbu: 12, sttp: 6, sodiumSulfat: 49.65, parfum: 0.3, cmc: 3, antifoam: 0.05 },
    { np30: 14, emal10: 16, sodaAbu: 10, sttp: 5, sodiumSulfat: 50.65, parfum: 0.3, cmc: 4, antifoam: 0.05 },
    { np30: 15, emal10: 15, sodaAbu: 15, sttp: 5, sodiumSulfat: 46.65, parfum: 0.03, cmc: 3, antifoam: 0.05 },
    { np30: 20, emal10: 12, sodaAbu: 10, sttp: 6, sodiumSulfat: 48.65, parfum: 0.03, cmc: 3, antifoam: 0.05 }
  ]
};

// Function to calculate amounts based on scale
function calculateAmounts(scale, formula) {
  const totalWeight = scale === 'small' ? 10 : 25;
  return {
    np30: (formula.np30 / 100) * totalWeight,
    emal10: (formula.emal10 / 100) * totalWeight,
    sodaAbu: (formula.sodaAbu / 100) * totalWeight,
    sttp: (formula.sttp / 100) * totalWeight,
    sodiumSulfat: (formula.sodiumSulfat / 100) * totalWeight,
    parfum: (formula.parfum / 100) * totalWeight,
    cmc: formula.cmc ? (formula.cmc / 100) * totalWeight : 0,
    antifoam: formula.antifoam ? (formula.antifoam / 100) * totalWeight : 0
  };
}

// Function to render the table
function renderTable(scale) {
  const tableBody = document.querySelector('#formula-table tbody');
  tableBody.innerHTML = '';

  const selectedFormulas = formulas[scale];
  selectedFormulas.forEach((formula, index) => {
    const amounts = calculateAmounts(scale, formula);

    const row = `
      <tr>
        <td data-label="Formula">Formula ${index + 1}</td>
        <td data-label="NP-30 (%)">${formula.np30.toFixed(2)}%</td>
        <td data-label="Emal-10 (%)">${formula.emal10.toFixed(2)}%</td>
        <td data-label="Soda Abu (%)">${formula.sodaAbu.toFixed(2)}%</td>
        <td data-label="STTP (%)">${formula.sttp.toFixed(2)}%</td>
        <td data-label="Sodium Sulfat (%)">${formula.sodiumSulfat.toFixed(2)}%</td>
        <td data-label="Parfum (%)">${formula.parfum.toFixed(2)}%</td>
        <td data-label="CMC (%)">${formula.cmc ? formula.cmc.toFixed(2) + '%' : '-'}</td>
        <td data-label="Antifoam (%)">${formula.antifoam ? formula.antifoam.toFixed(2) + '%' : '-'}</td>
        <td data-label="Amount (kg)">${Object.values(amounts).reduce((sum, val) => sum + val, 0).toFixed(2)} kg</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Event listener for scale selection
document.getElementById('scale').addEventListener('change', (event) => {
  const scale = event.target.value;
  renderTable(scale);
});

// Initial render
renderTable('small');
