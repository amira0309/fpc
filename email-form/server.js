const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Подключаем dotenv для конфиденциальных данных

// Настройка приложения Express
const app = express();
app.use(bodyParser.json());

// Настройка SMTP для почты больницы
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Хост SMTP (например, smtp.mail.kz)
    port: process.env.SMTP_PORT, // Порт SMTP (обычно 587 или 465)
    secure: process.env.SMTP_SECURE === 'true', // true для SSL, false для TLS
    auth: {
        user: process.env.EMAIL_USER, // Почта больницы (логин)
        pass: process.env.EMAIL_PASS, // Пароль от почты
    },
});

// Маршрут для обработки формы
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Настройка письма
    const mailOptions = {
        from: process.env.EMAIL_USER,          // Отправитель
        to: process.env.RECIPIENT_EMAIL,       // Получатель
        subject: 'Новое сообщение с сайта',    // Тема письма
        text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`, // Текст письма
    };

    // Отправка письма
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке:', error);
            res.status(500).send('Ошибка отправки сообщения.');
        } else {
            console.log('Email отправлен:', info.response);
            res.status(200).send('Сообщение отправлено!');
        }
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
