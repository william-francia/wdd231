const courses = [
    { code: "WDD 130", name: "Web Fundamentals", completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", completed: true },
    { code: "WDD 231", name: "Frontend Development", completed: false },
    { code: "CSE 110", name: "Intro to Programming", completed: true },
    { code: "CSE 210", name: "Programming with Classes", completed: false }
];

const container = document.getElementById("course-container");
const buttons = document.querySelectorAll(".filter-buttons button");

function displayCourses(filter) {
    if (!container) {
        console.warn('Elemento #course-container no encontrado en el DOM.');
        return;
    }

    container.innerHTML = "";
    const filtered = filter === "all"
        ? courses
        : courses.filter(c => c.code.startsWith(filter.toUpperCase()));

    filtered.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course", course.completed ? "completed" : "not-completed");
        div.textContent = `${course.code} - ${course.name}`;
        container.appendChild(div);
    });
}

if (buttons && buttons.length) {
    buttons.forEach(btn => {
        btn.addEventListener("click", () => displayCourses(btn.id));
    });
} else {
    console.warn('No se encontraron botones de filtro (.filter-buttons button).');
}

displayCourses("all");
