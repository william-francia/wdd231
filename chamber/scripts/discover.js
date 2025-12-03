import { places } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
    displayItems(places);
});

function displayItems(items) {
    const container = document.querySelector("#items-container");

    if (!container) {
        console.error("❌ No existe el contenedor #items-container");
        return;
    }

    items.forEach(item => {
        const imgSrc = item.image && item.image.trim() !== "" ? item.image : "images/placeholder.webp";

        container.innerHTML += `
            <article class="item-card">
                
                <h2>${item.name}</h2>

                <figure>
                    <img src="${imgSrc}" alt="${item.name}" loading="lazy">
                </figure>

                <address>${item.address}</address>

                <p>${item.description}</p>

                <button class="learn-more">Learn More</button>
            </article>
        `;
    });
}



const msToDays = 1000 * 60 * 60 * 24;

const messageElement = document.querySelector("#visit-message");

let lastVisit = localStorage.getItem("lastVisit");
let now = Date.now();

if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    let diff = now - Number(lastVisit);
    let days = Math.floor(diff / msToDays);

    if (days < 1) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        messageElement.textContent = "You last visited 1 day ago.";
    } else {
        messageElement.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);
