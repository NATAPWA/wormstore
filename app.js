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

function showInstallGuide(name, url, hint) {
    const guide = `
        📲 Установка ${name}
        1. Откройте Safari и перейдите на ${url}
        2. Авторизуйтесь (если нужно)
        3. Нажмите кнопку «Поделиться» (прямоугольник со стрелкой)
        4. Выберите «На экран „Домой“»
        5. Нажмите «Добавить»
        ✅ После этого ${name} появится как отдельное приложение с уведомлениями.
        ${hint ? '\n💡 ' + hint : ''}
    `;
    alert(guide);
    // В будущем заменим alert на красивое модальное окно
document.querySelectorAll('.install-app-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const app = card.dataset.app;
        if (app === 'max') {
            showInstallGuide('MAX', 'https://max.ru');
        } else if (app === 'vk') {
            showInstallGuide('VK Мессенджер', 'https://vk.com/messenger');
        }
    });
});}
