// ========== Установка самого Червяка ==========
(function() {
    var installBtn = document.getElementById('installBtn');
    var isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (installBtn && !isStandalone) {
        installBtn.classList.remove('hidden');
        installBtn.addEventListener('click', function() {
            showModal(
                'Установите Червяк',
                'Сейчас откроется сайт Червяка в Safari.Нажмите кнопку «Поделиться» (прямоугольник со стрелкой вверх) в нижнем меню,затем прокрутите вниз и выберите «На экран Домой».
                Нажмите «Добавить» — и магазин появится на главном экране.',
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
                        ''Сейчас откроется сайт Червяка в Safari.Нажмите кнопку «Поделиться» (прямоугольник со стрелкой вверх) в нижнем меню,затем прокрутите вниз и выберите «На экран Домой».
                        Нажмите «Добавить» — и магазин появится на главном экране.'',
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
// В функции для Червяка
showModal(
    'Установите Червяк',
    'Сейчас откроется браузер Safari.<br><br>' +
    '<b>1.</b> Внизу экрана нажмите кнопку <b>«Поделиться»</b> (прямоугольник со стрелкой вверх).<br>' +
    '<b>2.</b> Прокрутите вниз и выберите <b>«На экран Домой»</b>.<br>' +
    '<b>3.</b> Нажмите <b>«Добавить»</b> в правом верхнем углу.<br><br>' +
    'Готово! Иконка магазина появится на рабочем столе.',
    'https://natapwa.github.io/wormstore/'
);

// В функции для MAX и VK (обе одинаковые)
showModal(
    'Установите ' + name,
    'Сейчас откроется сайт в Safari.<br><br>' +
    '<b>1.</b> Внизу экрана нажмите кнопку <b>«Поделиться»</b> (прямоугольник со стрелкой вверх).<br>' +
    '<b>2.</b> Прокрутите вниз и выберите <b>«На экран Домой»</b>.<br>' +
    '<b>3.</b> Нажмите <b>«Добавить»</b> в правом верхнем углу.<br><br>' +
    'После этого приложение будет работать как обычное, с уведомлениями.',
    url
);
