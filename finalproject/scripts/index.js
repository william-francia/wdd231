document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("companiesworkwithid");

    fetch("data/company.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el JSON");
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("company-card");

                card.innerHTML = `
                    <img src="${item["image or icon file names"]}" alt="${item.names}">
                    <h3>${item.names}</h3>
                    <p class="country">${item.country}</p>
                    <p class="desc">${item.description}</p>
                    <a href="${item["website URLs"]}" target="_blank">Visitar sitio</a>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error cargando datos:", error);
            container.innerHTML += `
        <p style="color:red; font-weight:bold;">
            ERROR: ${error.message}
        </p>
    `;
        });

});


