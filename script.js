function goToProductPage(name, cpu, ram, storage, screen, price, image, description) {
    const url = `tovar.html?name=${encodeURIComponent(name)}&cpu=${encodeURIComponent(cpu)}&ram=${encodeURIComponent(ram)}&storage=${encodeURIComponent(storage)}&screen=${encodeURIComponent(screen)}&price=${price}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`;
    window.location.href = url;
}

// Функция для добавления товара в корзину
function addToCart(name, cpu, ram, gpu, price, image) {
    // Получаем текущую корзину из localStorage или создаём новую, если корзина пустая
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Проверяем, есть ли уже этот товар в корзине
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // Если товар уже есть, увеличиваем количество
        existingItem.quantity += 1;
    } else {
        // Если товара нет в корзине, добавляем новый товар
        cart.push({
            name,
            cpu,
            ram,
            gpu,
            price,
            image,
            quantity: 1
        });
    }

    // Сохраняем обновлённую корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Выводим сообщение о том, что товар добавлен в корзину
    alert('Товар добавлен в корзину!');
}

// Функция для перехода на страницу корзины
function goToCartPage() {
    // Переход на страницу корзины
    window.location.href = "cart.html";  // замените на путь вашей страницы корзины
}

// Функция для отображения количества товаров в корзине на значке корзины
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const cartElement = document.querySelector('.cart');
    if (cartCount > 0) {
        cartElement.innerHTML = `🛒 Корзина (${cartCount})`;  // показываем количество товаров в корзине
    } else {
        cartElement.innerHTML = "🛒 Корзина";  // если корзина пуста
    }
}

// Вызываем функцию для обновления значка корзины при загрузке страницы
window.onload = updateCartIcon;

// Пример товаров, добавленных в корзину
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для отображения товаров в корзине
// Функция для отображения товаров в корзине
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Очищаем контейнер перед рендером
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        // Проверяем корректность данных перед вставкой
        const itemPrice = item.price ? item.price : 0; // Если price не существует, ставим 0

        itemElement.innerHTML = `
            <img src="${item.image}" alt="Product Image">
            <div class="cart-item-info">
                <p><strong>${item.name}</strong></p>
                <p>Цена: ${itemPrice.toLocaleString()} руб.</p>
                <p>Количество: <span id="quantity-${index}">${item.quantity}</span></p>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <button onclick="updateQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Удалить</button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
        totalPrice += itemPrice * item.quantity;
    });

    // Обновление итоговой суммы
    document.getElementById('totalPrice').innerText = totalPrice.toLocaleString() + ' руб.';
}

// Функция для обновления количества товара в корзине
function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;

    if (item.quantity <= 0) {
        item.quantity = 1; // Не разрешаем количество меньше 1
    }

    // Обновляем данные в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Функция для удаления товара из корзины
function removeItem(index) {
    cart.splice(index, 1); // Удаляем товар из массива
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Инициализация страницы корзины
renderCart();

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".user").addEventListener("click", function () {
        window.location.href = "vhod.html";
    });
});


