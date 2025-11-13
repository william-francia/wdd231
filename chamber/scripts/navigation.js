const navbuttom = document.querySelector('#hamburgeridmenu');
const navlinks = document.querySelector('#navidmenu');

// Toggle the show class off and on
navbuttom.addEventListener('click', () => {
  navbuttom.classList.toggle('show');
  navlinks.classList.toggle('show');
});


fetch('data/members.json')
  .then(res => res.json())
  .then(data => console.log(data));



// ===== CARGAR MIEMBROS DEL JSON =====
const membersContainer = document.querySelector("#members");

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error cargando members.json:", error);
    membersContainer.innerHTML = "<p>Error al cargar los miembros.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const div = document.createElement("div");
    div.innerHTML = `
            <h3>${member.names}</h3>
            <p>${member.description}</p>
            <p><strong>Dirección:</strong> ${member.addresses}</p>
            <p><strong>Teléfono:</strong> ${member["phone numbers"]}</p>
            <a href="${member["website URLs"]}" target="_blank">Visitar sitio</a>
        `;
    membersContainer.appendChild(div);
  });
}

// Agregar clase grid-view por defecto
if (membersContainer) {
  membersContainer.classList.add("grid-view");
}

// Cargar miembros al iniciar
if (membersContainer) {
  loadMembers();
}

// ===== CAMBIAR VISTA GRID/LIST =====
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

if (gridBtn) {
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");
  });
}

if (listBtn) {
  listBtn.addEventListener("click", () => {
    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");
  });
}


