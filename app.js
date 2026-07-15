// ========== Установка самого Червяка ==========
(function() {
    var installBtn = document.getElementById('installBtn');
    var isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (installBtn && !isStandalone) {
        installBtn.classList.remove('hidden');
        installBtn.addEventListener('click', function() {
            showModal(
                'Установите Червяк Jobs',
                'Сейчас откроется Safari. Нажмите значок «Поделиться» (квадрат со стрелкой) внизу экрана. Затем нажмите на галочку «Показать больше» в правом углу и выберите «На экран Домой», нажмите «Добавить».',
                'https://natapwa.github.io/wormstore/'
            );
        });
    }
})();

// ========== Установка приложений ==========
(function() {
    function bindButtons() {
        var buttons = document.querySelectorAll('.install-app-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function(e) {
                var card = e.target.closest('.card');
                if (!card) return;
                var app = card.getAttribute('data-app');
                if (!app) return;
                var url = '';
                var name = '';

                if (app === 'max') {
                    name = 'MAX';
                    url = 'https://web.max.ru';
                } else if (app === 'vk') {
                    name = 'VK Мессенджер';
                    url = 'https://vk.com/messenger';
                } else if (app === 'sberbank') {
                    name = 'СберБанк Онлайн';
                    url = 'https://online.sberbank.ru';
                } else if (app === 'gosuslugi') {
                    name = 'Госуслуги';
                    url = 'https://www.gosuslugi.ru';
                } else if (app === 'yandexmaps') {
                    name = 'Яндекс.Карты';
                    url = 'https://yandex.ru/maps';
                } else if (app === 'ozon') {
                    name = 'Ozon';
                    url = 'https://ozon.ru';
                } else if (app === 'wildberries') {
                    name = 'Wildberries';
                    url = 'https://wildberries.ru';
                } else if (app === 'avito') {
                    name = 'Авито';
                    url = 'https://www.avito.ru';
                } else if (app === 'youmoney') {
                    name = 'ЮMoney';
                    url = 'https://yoomoney.ru/';
                } else if (app === 'dzen') {
                    name = 'Дзен';
                    url = 'https://dzen.ru';
                } else {
                    // Неизвестное приложение — игнорируем без ошибки
                    return;
                }

                if (url) {
                    showModal(
                        'Установите ' + name,
                        'Сейчас откроется Safari. Нажмите значок «Поделиться» (квадрат со стрелкой) внизу экрана. Затем нажмите на галочку «Показать больше» в правом углу и выберите «На экран Домой», нажмите «Добавить».',
                        url
                    );
                }
            });
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindButtons);
    } else {
        bindButtons();
    }
})();

// ========== Функция показа модального окна ==========
function showModal(title, text, url) {
    var old = document.querySelector('.modal');
    if (old) old.remove();

    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-content">' +
        '<span class="close-btn">&times;</span>' +
        '<h3>' + title + '</h3>' +
        '<p>' + text + '</p>' +
        '<button class="install-btn-main" id="goToSafariBtn">Перейти в Safari</button>' +
    '</div>';
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    modal.querySelector('.close-btn').onclick = function() { modal.remove(); };
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    modal.querySelector('#goToSafariBtn').onclick = function() {
        // Открываем ссылку через создание элемента <a> — работает везде
        var a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        modal.remove();
    };
}
