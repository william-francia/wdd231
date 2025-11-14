const navbuttom = document.querySelector('#hamburgeridmenu');
const navlinks = document.querySelector('#navidmenu');

// Toggle the show class off and on
navbuttom.addEventListener('click', () => {
  navbuttom.classList.toggle('show');
  navlinks.classList.toggle('show');
});



// scripts/directory-main.js
document.addEventListener('DOMContentLoaded', () => {
  const membersContainer = document.getElementById('members');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');

  // Toggle views
  gridBtn.addEventListener('click', () => setView('grid'));
  listBtn.addEventListener('click', () => setView('list'));

  function setView(view) {
    if (view === 'grid') {
      membersContainer.classList.remove('list-view');
      membersContainer.classList.add('grid-view');
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
    } else {
      membersContainer.classList.remove('grid-view');
      membersContainer.classList.add('list-view');
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
    }
  }

  // carga y muestra miembros desde data/members.json
  async function loadMembers() {
    try {
      const resp = await fetch('data/members.json', { cache: 'no-store' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status} - ${resp.statusText}`);
      const members = await resp.json();
      renderMembers(members);
    } catch (err) {
      console.error('Error cargando members.json:', err);
      membersContainer.innerHTML = `<p style="color:#a00">No se pudieron cargar los miembros. Revisa la consola.</p>`;
    }
  }

  function renderMembers(members) {
    membersContainer.innerHTML = ''; // limpiar

    if (!Array.isArray(members) || members.length === 0) {
      membersContainer.innerHTML = '<p>No hay miembros disponibles.</p>';
      return;
    }

    members.forEach(m => {
      // usa las claves EXACTAS de tu JSON (con espacios)
      const name = m['names'] || 'Sin nombre';
      const address = m['addresses'] || '';
      const phone = m['phone numbers'] || '';
      const website = m['website URLs'] || '#';
      const img = m['image or icon file names'] || '';
      const level = m['membership_level'] || 1;
      const desc = m['description'] || '';

      // Crear card
      const card = document.createElement('article');
      card.className = 'member-card';

      // fallback image si no existe
      const imgSrc = img && img.trim() !== '' ? img : 'images/placeholder.webp';

      card.innerHTML = `
        <img class="logo" src="${imgSrc}" alt="Logo ${escapeHtml(name)}" loading="lazy" />
        <div class="member-info">
          <h3>${escapeHtml(name)}</h3>
          <p class="desc">${escapeHtml(desc)}</p>
          <p class="meta"><strong>Dirección:</strong> ${escapeHtml(address)}</p>
          <p class="meta"><strong>Tel:</strong> ${escapeHtml(phone)}</p>
          <p class="meta"><strong>Nivel:</strong> ${membershipLabel(level)}</p>
          <a class="visit" href="${escapeAttribute(website)}" target="_blank" rel="noopener">Visitar sitio</a>
        </div>
      `;

      membersContainer.appendChild(card);
    });
  }

  function membershipLabel(level) {
    switch (Number(level)) {
      case 3: return 'Gold';
      case 2: return 'Silver';
      default: return 'Member';
    }
  }

  // pequeñas funciones de seguridad para insertar texto
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

  // cargar al inicio y dejar vista por defecto grid
  setView('grid');
  loadMembers();
});


