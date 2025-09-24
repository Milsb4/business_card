const button = document.querySelector('button')


button.addEventListener('click', createFirework)

function createFirework(x, y) {
    const container = document.getElementById('fireworks-container');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
    // Создаем вспышку
    const flash = document.createElement('div');
    flash.className = 'firework-flash';
    flash.style.left = x + 'px';
    flash.style.top = y + 'px';
    container.appendChild(flash);
    
    // Создаем частицы
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // Случайный цвет
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Позиционируем частицу
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Случайное направление и расстояние
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        // Случайная задержка для более натурального взрыва
        particle.style.animationDelay = (Math.random() * 0.2) + 's';
        
        container.appendChild(particle);
        
        // Удаляем частицу после анимации
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1200);
    }
    
    // Удаляем вспышку после анимации
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 500);
}

// Обработчик клика на кнопку
document.querySelector('button').addEventListener('click', function(e) {
    // Создаем несколько фейерверков в случайных местах
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = 100 + Math.random() * (window.innerHeight - 200);
            createFirework(x, y);
        }, i * 200);
    }
    
    // Дополнительные фейерверки вокруг курсора
    createFirework(e.clientX, e.clientY);
    
    // Фейерверки по краям экрана
    createFirework(50, 100);
    createFirework(window.innerWidth - 50, 100);
    createFirework(50, window.innerHeight - 100);
    createFirework(window.innerWidth - 50, window.innerHeight - 100);
});

// Очистка контейнера при изменении размера окна
window.addEventListener('resize', function() {
    const container = document.getElementById('fireworks-container');
    container.innerHTML = '';
});