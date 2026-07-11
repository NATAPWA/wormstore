// Показываем кнопку "Добавить Червяка на экран", если сайт открыт в браузере, а не в PWA
if (!window.matchMedia('(display-mode: standalone)').matches && !navigator.standalone) {
    document.getElementById('installBtn').classList.remove('hidden');
    document.getElementById('installBtn').addEventListener('click', () => {
        showInstallGuide(
            'Червяк',
            'https://natapwa.github.io/wormstore/',
            'Сейчас откроется этот же сайт. Нажмите «Поделиться» → «На экран Домой», чтобы установить магазин.'
        );
    });
}

// Обработчики для карточек приложений
document.querySelectorAll('.install-app-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const app = card.dataset.app;
        let url = '';
        let name = '';
        if (app === 'max') {
            name = 'MAX';
            url = 'https://max.ru';
        } else if (app === 'vk') {
            name = 'VK Мессенджер';
            url = 'https://vk.com/messenger';
        }
        if (url) {
            showInstallGuide(name, url, 'Сейчас откроется Safari. Нажмите «Поделиться» (прямоугольник со стрелкой) внизу экрана, затем выберите «На экран Домой» и нажмите «Добавить».');
        }
    });
});

function showInstallGuide(appName, appUrl, instructionText) {
    // Удаляем предыдущее модальное окно, если есть
    const oldModal = document.querySelector('.modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>📲 Установить ${appName}</h3>
            <p>${instructionText}</p>
            <button id="goToSafariBtn" class="install-btn-main">Перейти в Safari</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Закрытие по крестику
    modal.querySelector('.close-btn').onclick = () => modal.remove();
    // Закрытие по клику вне окна
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    // Кнопка "Перейти в Safari"
    modal.querySelector('#goToSafariBtn').onclick = () => {
        window.open(appUrl, '_blank');
        modal.remove();
    };
}                // Показываем мини-подсказку после закрытия меню
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
