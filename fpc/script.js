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

// Открытие и закрытие мобильного меню
function toggleMobileMenu() {
    const navMenuContainer = document.querySelector('.nav-menu-container');
    const isMenuOpen = navMenuContainer.style.display === 'flex';

    navMenuContainer.style.display = isMenuOpen ? 'none' : 'flex';
    document.querySelector('.hamburger').style.display = isMenuOpen ? 'block' : 'none';
    document.querySelector('.close-menu').style.display = isMenuOpen ? 'none' : 'block';

    if (!isMenuOpen) {
        document.querySelector('.back-button').style.display = 'none';
        closeAllSubmenus(); // Закрываем все подменю при закрытии мобильного меню
    }
}

// Открытие и закрытие подменю по клику
function toggleSubmenu(event) {
    event.preventDefault();

    const parentLi = event.target.closest('li');
    const isSubmenuOpen = parentLi.classList.contains('show');

    closeAllSubmenus(); // Закрываем все подменю перед открытием текущего

    if (!isSubmenuOpen) {
        parentLi.classList.add('show'); // Открываем только текущее подменю
    }
}

// Открытие и закрытие вложенного подменю (dropdown1)
function toggleNestedSubmenu(event) {
    event.preventDefault();

    const parentLi = event.target.closest('li');
    const isSubmenuOpen = parentLi.classList.contains('nested-show');

    closeAllNestedSubmenus(); // Закрываем все вложенные подменю перед открытием текущего

    if (!isSubmenuOpen) {
        parentLi.classList.add('nested-show'); // Открываем только текущее вложенное подменю
    }
}

// Закрытие всех подменю
function closeAllSubmenus() {
    document.querySelectorAll('.nav-menu li').forEach(menu => menu.classList.remove('show'));
    closeAllNestedSubmenus(); // Закрываем все вложенные подменю
}

// Закрытие всех вложенных подменю
function closeAllNestedSubmenus() {
    document.querySelectorAll('.dropdown1').forEach(menu => menu.closest('li').classList.remove('nested-show'));
}

// Закрытие меню и подменю при клике вне его области
document.addEventListener('click', function(event) {
    const isClickInsideMenu = event.target.closest('.nav-menu-container') || event.target.closest('.hamburger');
    if (!isClickInsideMenu) {
        closeAllSubmenus();
        document.querySelector('.nav-menu-container').style.display = 'none';
        document.querySelector('.hamburger').style.display = 'block';
        document.querySelector('.close-menu').style.display = 'none';
    }
});

// Навешивание обработчиков клика на элементы с подменю и вложенные подменю
document.querySelectorAll('.has-dropdown > a').forEach(anchor => {
    anchor.addEventListener('click', toggleSubmenu);
});
document.querySelectorAll('.dropdown .has-dropdown > a').forEach(anchor => {
    anchor.addEventListener('click', toggleNestedSubmenu);
});

// Показать или скрыть кнопку при прокрутке
window.onscroll = function () {
  toggleScrollToTopButton();
};

function toggleScrollToTopButton() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Функция для прокрутки вверх
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Функция для загрузки новостей из файла JSON
function loadNews() {
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            const newsPlaceholder = document.getElementById('news-placeholder');
            data.forEach(news => {
                // Создаём HTML для каждой карточки новости
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card');
                newsCard.innerHTML = `
                    <img src="${news.image}" alt="Изображение новости" class="news-card-image">
                    <div class="news-card-content">
                        <a href="${news.link}" class="news-card-title">${news.title}</a>
                        <p class="news-card-date">${news.date}</p>
                    </div>
                `;
                // Добавляем карточку в контейнер
                newsPlaceholder.appendChild(newsCard);
            });
        })
        .catch(error => console.error('Ошибка загрузки новостей:', error));
}

// Вызов функции при загрузке страницы
window.onload = loadNews;
