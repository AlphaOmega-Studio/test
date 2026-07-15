const projects = [
    {
        title: "Project ΑΩ",
        shortDesc: "тут будет описание",
        image: "projects/game1.jpg",
        html: "projects/game1.html"
    },
    {
        title: "Project ΑΩ: Λ",
        shortDesc: "тут тоже будет",
        image: "projects/game2.jpg",
        html: "projects/game2.html"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('projects-grid');

    grid.innerHTML = '';

    projects.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = (index * 0.5) + 's';

        const title = p.title;
        const desc = p.shortDesc;
        const img = p.image;
        const link = p.html;

        card.innerHTML = `
            <a href="${link}">
                <img src="${img}" alt="${title}">
                <h3>${escapeHtml(title)}</h3>
                <p>${escapeHtml(desc)}</p>
            </a>
        `;
        grid.appendChild(card);
    });
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
