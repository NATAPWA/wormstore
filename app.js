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
    // Создаём модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>📲 Установить ${appName}</h3>
            <p>Нажмите кнопку «Поделиться», затем «На экран Домой».</p>
            <img src="img/install-guide.png" alt="Инструкция" style="width:100%; border-radius:8px; margin:10px 0;">
            <button id="shareBtn" class="install-btn-main">📤 Поделиться</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Закрытие по крестику
    modal.querySelector('.close-btn').onclick = () => modal.remove();
    // Закрытие по клику вне окна
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    // Кнопка «Поделиться» вызывает нативное меню
    modal.querySelector('#shareBtn').onclick = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Установите ${appName}`,
                    url: appUrl
                });
                // После шеринга можно закрыть окно, но iOS не даёт отследить выбор «На экран Домой»
                modal.remove();
            } catch (err) {
                console.log('Share cancelled', err);
            }
        } else {
            // Fallback для устройств без Web Share API
            alert(`Откройте ${appUrl} в Safari → «Поделиться» → «На экран Домой».`);
            modal.remove();
        }
    };
}
