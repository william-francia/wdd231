
const navbuttom = document.querySelector('#hamburgeridmenu');
const navlinks = document.querySelector('#navidmenu');

// Toggle the show class off and on
navbuttom.addEventListener('click', () => {
    navbuttom.classList.toggle('show');
    navlinks.classList.toggle('show');
});




// dates //
const currentYear = new Date().getFullYear();

document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;

document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;





 