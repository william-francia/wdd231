const navbuttom = document.querySelector('#hamburgeridmenu');
const navlinks = document.querySelector('#navidmenu');

// Toggle the show class off and on
navbuttom.addEventListener('click', () => {
  navbuttom.classList.toggle('show');
  navlinks.classList.toggle('show');
});


