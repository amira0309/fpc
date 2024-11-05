const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Показ первого слайда
showSlide(currentIndex);

// Автоматическая прокрутка слайдов каждые 5 секунд
setInterval(nextSlide, 5000);


// Загружаем содержимое хедера из файла header.html
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    });

    // Загружаем содержимое gov из файла gov.html
fetch('gov.html')
.then(response => response.text())
.then(data => {
    document.getElementById('gov-placeholder').innerHTML = data;
});

    // Загружаем содержимое хедера из файла footer.html
fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
});

// Загружаем содержимое форму из файла form.html
fetch('form.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('form-placeholder').innerHTML = data;
    });

    // Загружаем содержимое кнопки застрахованности из файла saqtandyry.html
fetch('saqtandyry.html')
.then(response => response.text())
.then(data => {
    document.getElementById('saqtandyry-placeholder').innerHTML = data;
});

     // Функция для открытия формы
    function openForm() {
        document.getElementById('saqtandyry-status-form-id').style.display = 'block';
        document.body.style.overflow = 'hidden'; // Отключить прокрутку страницы
    }

    // Функция для закрытия формы
    function closeForm() {
        document.getElementById('saqtandyry-status-form-id').style.display = 'none';
        document.body.style.overflow = 'auto'; // Включить прокрутку страницы
    }

    function toggleMenu() {
        const menu = document.querySelector('.nav-menu-container');
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    }
    
    function showSubMenu(subMenu) {
        const allDropdowns = document.querySelectorAll('.dropdown');
        allDropdowns.forEach(dropdown => dropdown.style.display = 'none'); // Скрываем все подменю
        subMenu.style.display = 'block'; // Показываем выбранное подменю
    }
    
   // Для подменю при клике на родительский элемент
document.querySelectorAll('.has-submenu > a').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        const subMenu = this.nextElementSibling; // Получаем подменю
        subMenu.style.display = (subMenu.style.display === 'block') ? 'none' : 'block'; // Открыть/закрыть подменю
    });
});

// Кнопка "Назад" скрывает подменю
document.querySelector('.back-button').addEventListener('click', function() {
    const allDropdowns = document.querySelectorAll('.dropdown, .dropdown1');
    allDropdowns.forEach(dropdown => dropdown.style.display = 'none'); // Скрываем все подменю
});

    
    