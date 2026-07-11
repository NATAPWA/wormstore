// Показываем кнопку "Добавить Червяка на экран", если ещё не в PWA-режиме
if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) {
    // Уже в PWA, скрываем кнопку самомустановки
    document.getElementById('installBtn').classList.add('hidden');
} else {
    document.getElementById('installBtn').classList.remove('hidden');
    document.getElementById('installBtn').addEventListener('click', () => {
        alert('Нажмите "Поделиться" (квадратик со стрелкой) → "На экран Домой".');
    });
}

// Обработчики для карточек приложений
document.querySelectorAll('.install-app-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const app = card.dataset.app;
        // Пока простая инструкция для MAX, позже сделаем универсальную обёртку
        if (app === 'max') {
            showInstallGuide('MAX', 'https://max.ru', 'Чтобы получать уведомления, откройте этот сайт и добавьте на экран «Домой» точно так же.');
        }
        // Здесь можно добавлять другие приложения
    });
});

document.querySelectorAll('.install-app-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const app = card.dataset.app;
        const url = app === 'max' ? 'https://max.ru' : 'https://vk.com/messenger';

        // Пробуем открыть системное меню «Поделиться»
        if (navigator.share) {
            navigator.share({
                title: `Установите ${app === 'max' ? 'MAX' : 'VK Мессенджер'}`,
                url: url
            }).then(() => {
                // Показываем мини-подсказку после закрытия меню
                showTooltip('👉 В Safari нажмите «Поделиться» → «На экран Домой»');
            }).catch(() => {});
        } else {
            // Fallback для десктопа: просто открываем сайт в новой вкладке
            window.open(url, '_blank');
            showTooltip('Откройте в Safari → «Поделиться» → «На экран Домой»');
        }
    });
});

function showTooltip(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.classList.add('visible'), 10);
    setTimeout(() => {
        tooltip.classList.remove('visible');
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
}
