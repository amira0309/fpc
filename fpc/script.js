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

    // Загружаем содержимое хедера из файла header_kk.html
fetch('header_kk.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header_kk-placeholder').innerHTML = data;
});


    // Загружаем содержимое gov из файла gov.html
fetch('gov.html')
.then(response => response.text())
.then(data => {
    document.getElementById('gov-placeholder').innerHTML = data;
});

   // Загружаем содержимое gov из файла gov_kk.html
   fetch('gov_kk.html')
   .then(response => response.text())
   .then(data => {
       document.getElementById('gov_kk-placeholder').innerHTML = data;
   });
    // Загружаем содержимое хедера из файла footer.html
fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
});

   // Загружаем содержимое хедера из файла footer.html
   fetch('footer_kk.html')
   .then(response => response.text())
   .then(data => {
       document.getElementById('footer_kk-placeholder').innerHTML = data;
   });

// Загружаем содержимое форму из файла form.html
fetch('form.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('form-placeholder').innerHTML = data;
    });

    // Загружаем содержимое форму из файла form_kk.html
fetch('form_kk.html')
.then(response => response.text())
.then(data => {
    document.getElementById('form_kk-placeholder').innerHTML = data;
});

// Загружаем содержимое кнопки застрахованности из файла saqtandyry.html
fetch('saqtandyry.html')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
        }
        return response.text();
    })
    .then(data => {
        const placeholder = document.getElementById('saqtandyry-placeholder');
        if (placeholder) {
            placeholder.innerHTML = data;
        } else {
            console.error("Элемент 'saqtandyry-placeholder' не найден");
        }
    })
    .catch(error => console.error('Ошибка:', error));

// Функция для открытия формы
function openForm() {
    const formContainer = document.getElementById('saqtandyry-status-form-id');
    if (formContainer) {
        formContainer.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Отключить прокрутку страницы
    } else {
        console.error("Элемент 'saqtandyry-status-form-id' не найден");
    }
}

// Функция для закрытия формы
function closeForm() {
    const formContainer = document.getElementById('saqtandyry-status-form-id');
    if (formContainer) {
        formContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Включить прокрутку страницы
    } else {
        console.error("Элемент 'saqtandyry-status-form-id' не найден");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.status-button');
    const closeHandle = document.querySelector('.handle');

    if (button) {
        button.addEventListener('click', openForm);
    } else {
        console.error("Кнопка '.status-button' не найдена");
    }

    if (closeHandle) {
        closeHandle.addEventListener('click', closeForm);
    } else {
        console.error("Кнопка закрытия '.handle' не найдена");
    }
});



// Открытие и закрытие мобильного меню
function toggleMobileMenu() {
    const navMenuContainer = document.querySelector('.nav-menu-container');
    const hamburgerIcon = document.querySelector('.hamburger');
    const closeMenuIcon = document.querySelector('.close-menu');
    
    const isMenuOpen = navMenuContainer.style.display === 'flex';
    navMenuContainer.style.display = isMenuOpen ? 'none' : 'flex';
    hamburgerIcon.style.display = isMenuOpen ? 'block' : 'none';
    closeMenuIcon.style.display = isMenuOpen ? 'none' : 'block';

    if (!isMenuOpen) {
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

function toggleNestedSubmenu(event) {
    event.preventDefault();
    const parentLi = event.target.closest('li');
    const isSubmenuOpen = parentLi.classList.contains('nested-show');

    closeAllNestedSubmenus(); // Закрываем все остальные подменю

    if (!isSubmenuOpen) {
        parentLi.classList.add('nested-show'); // Открываем текущее подменю
    }
}

function closeAllNestedSubmenus() {
    const allNestedSubmenus = document.querySelectorAll('.has-dropdown.nested-show');
    allNestedSubmenus.forEach(submenu => submenu.classList.remove('nested-show'));
}

// Закрытие всех вложенных подменю
function closeAllNestedSubmenus() {
    const allNestedSubmenus = document.querySelectorAll('.has-dropdown.nested-show');
    allNestedSubmenus.forEach(submenu => submenu.classList.remove('nested-show'));
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


// Функция для прокрутки вверх
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  
  // Функция для прокрутки вниз
  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }
  
// новости


function loadNews() {
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            const newsPlaceholder = document.getElementById('news-placeholder');
            data.slice(0, 4).forEach(news => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('news-card');
                
                // Определяем контент: изображение или видео
                let mediaContent;
                if (news.type === 'video') {
                    mediaContent = `
                        <video class="news-card-image" autoplay muted loop playsinline>
                            <source src="${news.image}" type="video/mp4">
                            Ваш браузер не поддерживает тег video.
                        </video>
                    `;
                } else if (news.type === 'image') {
                    mediaContent = `<img src="${news.image}" alt="${news.title}" class="news-card-image">`;
                }

                // Заполняем HTML-контент карточки новости
                newsCard.innerHTML = `
                    ${mediaContent}
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

// Загружаем новости при загрузке страницы
window.onload = loadNews;

// Текст в ОСМС - Скрипт для аккордеонов
// Скрипт для аккордеонов с плавной анимацией
const accordions = document.querySelectorAll(".accordion");

accordions.forEach(accordion => {
    accordion.addEventListener("click", function() {
        // Переключение класса "active" для текущего аккордеона
        this.classList.toggle("active");

        // Получение следующего элемента .panel для открытия/закрытия
        const panel = this.nextElementSibling;

        // Если панель скрыта, показать её, иначе скрыть
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
});

    // язык
    document.addEventListener("DOMContentLoaded", function () {
        const rusLink = document.getElementById("rus-link");
        const kazLink = document.getElementById("kaz-link");
    
        // Check the URL to determine the active language
        if (window.location.href.includes("index_kk.html")) {
            // Kazakh page
            kazLink.classList.add("active-language");
            rusLink.classList.remove("active-language");
        } else {
            // Default to Russian page
            rusLink.classList.add("active-language");
            kazLink.classList.remove("active-language");
        }
    });
    
    



    // папки в гос закупках
function toggleFolder(element) {
    element.classList.toggle("open");
    let content = element.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
}
