let news = [];
let contacts = {};
let feedback = [];

async function init() {
  news = await loadData("news.json");
  contacts = await loadData("contacts.json");
  feedback = await loadData("feedback.json");

  renderNews();
  renderContacts();
  renderFeedback();
}

function renderNews() {
  const newsList = document.getElementById("news-list");
  newsList.innerHTML = news.map((item, index) => `
    <div>
      <h3>${item.title}</h3>
      <p>${item.content}</p>
      <button onclick="editNews(${index})">Edit</button>
      <button onclick="deleteNews(${index})">Delete</button>
    </div>
  `).join("");
}

function openNewsForm(index = null) {
  const title = prompt("Title:", index !== null ? news[index].title : "");
  const content = prompt("Content:", index !== null ? news[index].content : "");

  if (index !== null) {
    news[index] = { title, content };
  } else {
    news.push({ title, content });
  }

  saveData("news.json", news);
  renderNews();
}

function deleteNews(index) {
  news.splice(index, 1);
  saveData("news.json", news);
  renderNews();
}

function renderContacts() {
  document.getElementById("contact-address").value = contacts.address || "";
  document.getElementById("contact-phone").value = contacts.phone || "";
}

document.getElementById("contacts-form").addEventListener("submit", (e) => {
  e.preventDefault();

  contacts.address = document.getElementById("contact-address").value;
  contacts.phone = document.getElementById("contact-phone").value;

  saveData("contacts.json", contacts);
});

function renderFeedback() {
  const feedbackList = document.getElementById("feedback-list");
  feedbackList.innerHTML = feedback.map((item) => `
    <div>
      <p>${item.message}</p>
    </div>
  `).join("");
}

init();

const newsContainer = document.getElementById("news-container");

// Отображение новостей на странице
function renderNews() {
  newsContainer.innerHTML = news
    .map(
      (item) => `
    <div class="news-item">
      <img src="${item.video}" alt="News Image" class="news-image">
      <div class="news-content">
        <a href="${item.link}" class="news-title">${item.title}</a>
        <p class="news-date">${item.date}</p>
      </div>
    </div>
  `
    )
    .join("");
}

// Инициализация
async function init() {
  news = await loadData("news.json"); // Загружаем данные из JSON
  renderNews(); // Отображаем новости
}

init();
