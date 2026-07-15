document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Определяем базовый путь для fetch
    const basePath = window.location.pathname.includes('/projects/') ? '../' : './';
    
    fetch(basePath + 'projects-list.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(projects => {
            if (!Array.isArray(projects) || projects.length === 0) {
                grid.innerHTML = '<p style="color: #aaa; text-align: center; grid-column: 1/-1;">Проекты в разработке...</p>';
                return;
            }

            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                
                // Исправляем пути для вложенных страниц
                const htmlPath = project.html.startsWith('http') ? project.html : project.html;
                const imageUrl = project.image && project.image.startsWith('http') 
                    ? project.image 
                    : (project.image || 'https://picsum.photos/seed/default/400/250');
                
                card.innerHTML = `
                    <a href="${htmlPath}">
                        <img src="${imageUrl}" alt="${escapeHtml(project.title)}" loading="lazy" 
                             onerror="this.src='https://picsum.photos/seed/error/400/250'">
                        <h3>${escapeHtml(project.title)}</h3>
                        <p>${escapeHtml(project.shortDesc)}</p>
                    </a>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки проектов:', error);
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #1a1a2e; border-radius: 12px;">
                    <p style="color: #e94560; font-size: 1.2rem;">⚠️ Не удалось загрузить проекты</p>
                    <p style="color: #888; margin-top: 10px;">Попробуйте обновить страницу или проверьте соединение</p>
                    <button onclick="location.reload()" style="margin-top: 15px; padding: 10px 30px; background: #e94560; color: white; border: none; border-radius: 25px; cursor: pointer;">
                        Обновить
                    </button>
                </div>
            `;
        });

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});