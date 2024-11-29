const DATA_PATH = "./data";

async function loadData(fileName) {
  const response = await fetch(`${DATA_PATH}/${fileName}`);
  return await response.json();
}

async function saveData(fileName, data) {
  console.log(`Saving data to ${fileName}:`, JSON.stringify(data, null, 2));
  alert("Changes saved!");
}

let news = [];
let currentEditingIndex = null;

// Инициализация
async function init() {
  news = await loadData("news.json");
  renderNews();
}

// Отображение новостей
function renderNews() {
  const newsList = document.getElementById("news-list");
  newsList.innerHTML = news.map((item, index) => `
    <div>
      <h3>${item.title}</h3>
      <p>${item.date}</p>
      ${item.type === "image" ? `<img src="${item.video}" alt="${item.title}" style="max-width: 200px;">` : `<video src="${item.video}" controls style="max-width: 200px;"></video>`}
      <a href="${item.link}" target="_blank">View More</a>
      <button onclick="editNews(${index})">Edit</button>
      <button onclick="deleteNews(${index})">Delete</button>
    </div>
  `).join("");
}

// Открытие формы для добавления/редактирования новостей
function openNewsForm(index = null) {
  const modal = document.getElementById("news-modal");
  modal.classList.remove("hidden");

  const titleInput = document.getElementById("news-title");
  const dateInput = document.getElementById("news-date");
  const typeInput = document.getElementById("news-type");
  const mediaPreview = document.getElementById("media-preview");
  const linkInput = document.getElementById("news-link");

  if (index !== null) {
    currentEditingIndex = index;
    const item = news[index];
    titleInput.value = item.title;
    dateInput.value = item.date;
    typeInput.value = item.type;
    linkInput.value = item.link;
    mediaPreview.innerHTML = item.type === "image"
      ? `<img src="${item.video}" alt="Preview">`
      : `<video src="${item.video}" controls></video>`;
  } else {
    currentEditingIndex = null;
    titleInput.value = "";
    dateInput.value = "";
    typeInput.value = "image";
    linkInput.value = "";
    mediaPreview.innerHTML = "";
  }
}

// Закрытие формы
function closeNewsForm() {
  const modal = document.getElementById("news-modal");
  modal.classList.add("hidden");
}

// Предварительный просмотр медиа
function previewMedia(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("media-preview");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.innerHTML = event.target.accept.includes("image")
        ? `<img src="${e.target.result}" alt="Preview">`
        : `<video src="${e.target.result}" controls></video>`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
  }
}

// Сохранение новости
document.getElementById("news-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("news-title").value;
  const date = document.getElementById("news-date").value;
  const type = document.getElementById("news-type").value;
  const link = document.getElementById("news-link").value;
  const fileInput = document.getElementById("news-media");
  let mediaUrl = "";

  if (fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      mediaUrl = e.target.result;

      if (currentEditingIndex !== null) {
        news[currentEditingIndex] = { title, date, type, video: mediaUrl, link };
      } else {
        news.push({ title, date, type, video: mediaUrl, link });
      }

      saveData("news.json", news);
      renderNews();
      closeNewsForm();
    };
    reader.readAsDataURL(file);
  } else {
    if (currentEditingIndex !== null) {
      news[currentEditingIndex] = { title, date, type, video: mediaUrl, link };
    } else {
      news.push({ title, date, type, video: mediaUrl, link });
    }

    saveData("news.json", news);
    renderNews();
    closeNewsForm();
  }
});

// Удаление новости
function deleteNews(index) {
  news.splice(index, 1);
  saveData("news.json", news);
  renderNews();
}

init();
