(function () {
  // ==================== TIMESTAMP ====================
  function setTimestamp() {
    try {
      let timestampField = document.getElementById("timestamp") 
                        || document.querySelector('input[name="timestamp"]');
      if (!timestampField) {
        const form = document.querySelector("form");
        if (!form) return console.error("No <form> found for timestamp.");
        timestampField = document.createElement("input");
        timestampField.type = "hidden";
        timestampField.id = "timestamp";
        timestampField.name = "timestamp";
        form.appendChild(timestampField);
      }
      timestampField.value = new Date().toISOString();
    } catch (err) {
      console.error("Error setting timestamp:", err);
    }
  }

  // ==================== MODALES ====================
  function initModals() {
    // Abrir modal
    document.querySelectorAll('[data-modal]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "block";
      });
    });

    // Cerrar modal al presionar X
    document.querySelectorAll('.modal .close').forEach(btn => {
      btn.addEventListener('click', function () {
        this.closest('.modal').style.display = "none";
      });
    });

    // Cerrar modal al hacer clic afuera
    window.addEventListener('click', function (e) {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = "none";
      }
    });
  }

  // ==================== EJECUTAR CUANDO DOM LISTO ====================
  function init() {
    setTimestamp();
    initModals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


