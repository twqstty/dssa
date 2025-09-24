// Темная тема
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Модальное окно для заказа
const orderBtn = document.querySelector('.order-btn');
const orderModal = document.getElementById('orderModal');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const overlay = document.getElementById('overlay');
const sizeSelect = document.getElementById('size');
const orderSizeInput = document.getElementById('orderSize');

orderBtn.addEventListener('click', () => {
    orderSizeInput.value = sizeSelect.value; // Подставляем выбранный размер
    openModal(orderModal);
});

modalCloseBtn.addEventListener('click', () => closeModal(orderModal));
overlay.addEventListener('click', () => closeModal(orderModal));

function openModal(modal) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    modal.style.animation = 'fadeIn 0.3s ease-in';
}

function closeModal(modal) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Получение данных о товаре из URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id')); // Приводим к числу

const products = {
    1: { 
        name: 'Толстовка с принтом Brawl', 
        price: '1500 ₽', 
        image: 'https://maek-mir.ru/image/cache/data/catalog/tolstovki/tolstovka-brawl-stars-800x800.jpg',
        description: 'Стильная толстовка с уникальным принтом, выполненная из 100% хлопка. Подходит для повседневной носки.'
    },
    2: { 
        name: 'Шорты MM', 
        price: '4500 ₽', 
        image: 'https://ir-3.ozone.ru/s3/multimedia-1-b/c1000/7349795831.jpg',
        description: 'Шорты Maison Margela'
    },
    3: { 
        name: 'Футболка Сахур', 
        price: '4200 ₽', 
        image: 'https://cdn1.ozone.ru/s3/multimedia-1-e/7450322846.jpg',
        description: 'Ещё одна вариация нашей популярной футболки с принтом. Лёгкая и удобная.'
    },
    4: { 
        name: 'Рик Оувенсы', 
        price: '37600 ₽', 
        image: 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-67w8-p-rik-ovens-png-24.png',
        description: 'Самая лучшая обувь с ярким дизайном, созданная вручную.'
    },
    5: { 
        name: 'Футболка erd', 
        price: '7000 ₽', 
        image: 'https://frankfurt.apollo.olxcdn.com/v1/files/9l78uzcm66rn2-KZ/image;s=1000x884',
        description: 'Простая, но стильная футболка для любого случая.'
    },
    6: { 
        name: 'Скини джинсы', 
        price: '2506 ₽', 
        image: 'https://usmall.ru/image/694/28/50/efb5448674248f043c78627aaec1ab37.jpeg',
        description: 'Покупай штанишки'
    },
    7: {
        name: 'Футболка Clash Royale',
        price: '6969,69 ₽',
        image: 'https://basket-16.wbbasket.ru/vol2560/part256059/256059540/images/big/1.webp',
        description: 'Футболка для настоящих сигм'
    }
};

console.log('Product ID:', productId); // Отладка
const product = products[productId];
console.log('Product:', product); // Отладка

if (product) {
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productImage').src = product.image;
    document.getElementById('productImage').alt = product.name;
    document.getElementById('productDescription').textContent = product.description;
} else {
    document.querySelector('.product-content').innerHTML = '<p>Товар не найден</p>';
}

// Навигация
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});