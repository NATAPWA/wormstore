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

function showInstallGuide(appName, appUrl) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>📲 Установить ${appName}</h3>
            <div class="steps">
                <div class="step">
                    <span class="step-num">1</span>
                    <p>Нажмите кнопку <strong>«Поделиться»</strong> <br>(прямоугольник со стрелкой в Safari)</p>
                </div>
                <div class="step">
                    <span class="step-num">2</span>
                    <p>Прокрутите вниз и выберите <strong>«На экран Домой»</strong></p>
                </div>
                <div class="step">
                    <span class="step-num">3</span>
                    <p>Нажмите <strong>«Добавить»</strong></p>
                </div>
            </div>
            ${appUrl ? `<p style="margin-top:15px; font-size:0.9em; color:#8b949e;">Ссылка: ${appUrl}</p>` : ''}
            <button id="closeGuideBtn" class="install-btn-main">Понятно</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Закрытие по крестику, по кнопке «Понятно» и по клику вне окна
    modal.querySelector('.close-btn').onclick = () => modal.remove();
    modal.querySelector('#closeGuideBtn').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}
