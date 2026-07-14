// ========== Установка самого Червяка ==========
(function() {
    var installBtn = document.getElementById('installBtn');
    var isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (installBtn && !isStandalone) {
        installBtn.classList.remove('hidden');
        installBtn.addEventListener('click', function() {
            showModal(
                'Установите Червяк',
                'Сейчас откроется Safari. Нажмите кнопку "Поделиться" (прямоугольник со стрелкой) внизу экрана, затем выберите "На экран Домой" и нажмите "Добавить".',
                'https://natapwa.github.io/wormstore/'
            );
        });
    }
})();

// ========== Установка приложений (MAX, VK) ==========
(function() {
    function bindButtons() {
        var buttons = document.querySelectorAll('.install-app-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function(e) {
                var card = e.target.closest('.card');
                if (!card) return;
                var app = card.getAttribute('data-app');
                var url = '';
                var name = '';
                if (app === 'max') {
                    name = 'MAX';
                    url = 'https://max.ru';
                } else if (app === 'vk') {
                    name = 'VK Мессенджер';
                    url = 'https://vk.com/messenger';
                }
                if (url) {
                    showModal(
                        'Установите ' + name,
                        'Сейчас откроется Safari. Нажмите кнопку "Поделиться" (прямоугольник со стрелкой) внизу экрана, затем выберите "На экран Домой" и нажмите "Добавить".',
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
        window.open(url, '_blank');
        modal.remove();
    };
}
