const messages = [
    "Только сегодня! Скидки до 50%",
    "Новые поступления уже здесь!",
    "Лучшие товары на рынке!",
    "Не упустите бесплатную доставку!",
    "Предложите свои идеи!"
];

let index = 0;

function changeText() {
    const dynamicText = document.getElementById('dynamic-text');
    dynamicText.style.opacity = 0; // Сделать текст прозрачным для плавного исчезновения

    setTimeout(() => {
        dynamicText.textContent = messages[index];
        dynamicText.style.opacity = 1; // Вернуть текст в видимый режим
        index = (index + 1) % messages.length; // Переход к следующему сообщению
    }, 1000); // Задержка для плавного изменения
}

setInterval(changeText, 4000); // Менять текст каждые 4 секунды