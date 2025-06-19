document.getElementById('searchBtn').addEventListener('click', async () => {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
  
    try {
      const res = await fetch('/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, date })
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch bus data");
      }
  
      const data = await res.json();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
  
      data.forEach(bus => {
        const div = document.createElement('div');
        div.innerHTML = `
          <strong>${bus.name}</strong> (${bus.from} → ${bus.to})<br>
          🕓 ${bus.departure} - ${bus.arrival} (${bus.duration})<br>
          💰 ${bus.price} <br>
          🔗 <a href="${bus.link}" target="_blank">Book Now</a>
          <hr/>
        `;
        resultsDiv.appendChild(div);
      });
  
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    }
  });
  