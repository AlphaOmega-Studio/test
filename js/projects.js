const projects = [
    {
        title: "Space Adventure",
        shortDesc: "Космическая сага о поиске новой родины.",
        image: "https://picsum.photos/seed/space/400/250",
        html: "../projects/game1.html"
    },
    {
        title: "Mystic Quest",
        shortDesc: "Фэнтезийное приключение в мире магии.",
        image: "https://picsum.photos/seed/mystic/400/250",
        html: "../projects/game2.html"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('projects-grid');
    if (!grid) {
        console.error('Контейнер #projects-grid не найден');
        return;
    }

    grid.innerHTML = '';

    if (projects.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:40px; color:#aaa;">Проекты в разработке...</p>`;
        return;
    }

    projects.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = (index * 0.1) + 's';

        const title = p.title || 'Без названия';
        const desc = p.shortDesc || 'Описание отсутствует';
        const img = p.image || 'https://picsum.photos/seed/default/400/250';
        const link = p.html || '#';

        card.innerHTML = `
            <a href="${link}">
                <img src="${img}" alt="${title}" loading="lazy"
                     onerror="this.src='https://picsum.photos/seed/error/400/250'">
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
