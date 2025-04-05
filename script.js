// script.js

document.getElementById('analyzeBtn').addEventListener('click', () => {
  const files = document.getElementById('fileInput').files;
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (!files.length) {
    output.innerHTML = '<p>Please upload some files first.</p>';
    return;
  }

  [...files].forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target.result;

      if (file.name.endsWith('.json')) {
        try {
          const json = JSON.parse(content);
          output.innerHTML += `<h3>${file.name}</h3><pre>${JSON.stringify(json, null, 2)}</pre>`;
        } catch {
          output.innerHTML += `<p>Invalid JSON in ${file.name}</p>`;
        }
      } else if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        output.innerHTML += `<h3>${file.name}</h3><pre>${content}</pre>`;
      } else {
        output.innerHTML += `<p>Unsupported file type: ${file.name}</p>`;
      }
    };
    reader.readAsText(file);
  });

  drawTimeline();
});

function drawTimeline() {
  const ctx = document.getElementById('timelineChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['09:00', '10:00', '11:00', '12:00'],
      datasets: [{
        label: 'Activity Events',
        data: [5, 8, 2, 4],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Mock Timeline Activity'
        }
      }
    }
  });
}
