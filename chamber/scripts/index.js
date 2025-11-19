const tempToday = document.querySelector('#temp-today');
const day2Name = document.querySelector('#day2-name');
const tempDay2 = document.querySelector('#temp-day2');
const day3Name = document.querySelector('#day3-name');
const tempDay3 = document.querySelector('#temp-day3');

async function forecastFetch() {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            
            const todayTemp = data.list[0].main.temp;
            const day2Temp = data.list[8].main.temp;  // aprox 24h después
            const day3Temp = data.list[16].main.temp; // aprox 48h después

            const todayName = new Date(data.list[0].dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
            const day2Date = new Date(data.list[8].dt_txt);
            const day3Date = new Date(data.list[16].dt_txt);

            tempToday.textContent = `${Math.round(todayTemp)}°C`;
            day2Name.textContent = day2Date.toLocaleDateString('en-US', { weekday: 'long' });
            tempDay2.textContent = `${Math.round(day2Temp)}°C`;
            day3Name.textContent = day3Date.toLocaleDateString('en-US', { weekday: 'long' });
            tempDay3.textContent = `${Math.round(day3Temp)}°C`;

        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Forecast error:', error);
    }
}

forecastFetch();



// Cargar JSON de miembros


document.addEventListener('DOMContentLoaded', () => {
  const highlightsSection = document.getElementById('highlights');

  async function loadSpotlights() {
    try {
      
      const response = await fetch('data/members.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      const members = await response.json();

      const goldMembers = members.filter(m => Number(m.membership_level) === 3);

      if (goldMembers.length === 0) {
        highlightsSection.innerHTML += '<p>No hay miembros Gold disponibles.</p>';
        return;
      }


      const shuffled = goldMembers.sort(() => 0.5 - Math.random());


      const spotlightMembers = shuffled.slice(0, 3);

      spotlightMembers.forEach(member => {
        const card = document.createElement('article');
        card.className = 'spotlight-card';

        const imgSrc = member['image or icon file names']?.trim() || 'images/placeholder.webp';

        card.innerHTML = `
          <img class="logo" src="${imgSrc}" alt="Logo ${escapeHtml(member.names)}" loading="lazy" />
          <div class="member-info">
            <h3>${escapeHtml(member.names)}</h3>
            <p class="desc">${escapeHtml(member.description)}</p>
            <p class="meta"><strong>Dirección:</strong> ${escapeHtml(member.addresses)}</p>
            <p class="meta"><strong>Tel:</strong> ${escapeHtml(member['phone numbers'])}</p>
            <p class="meta"><strong>Nivel:</strong> Gold</p>
            <a class="visit" href="${escapeAttribute(member['website URLs'])}" target="_blank" rel="noopener">Visitar sitio</a>
          </div>
        `;

        highlightsSection.appendChild(card);
      });

    } catch (err) {
      console.error('Error cargando spotlights:', err);
      highlightsSection.innerHTML += '<p style="color:#a00">No se pudieron cargar los spotlights. Revisa la consola.</p>';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttribute(str) {
    if (!str) return '#';
    return String(str).replace(/"/g, '&quot;');
  }

  loadSpotlights();
});

