const navbuttom = document.querySelector('#hamburgeridmenu');
const navlinks = document.querySelector('#navidmenu');

// Toggle the show class off and on
navbuttom.addEventListener('click', () => {
  navbuttom.classList.toggle('show');
  navlinks.classList.toggle('show');
});

const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const members = document.querySelector("#members");

gridBtn.addEventListener("click", () => {
  members.classList.add("grid-view");
  members.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  members.classList.add("list-view");
  members.classList.remove("grid-view");
});

