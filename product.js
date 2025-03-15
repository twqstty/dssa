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
        name: 'Футболка с принтом', 
        price: '2500 ₽', 
        image: 'https://i1.sndcdn.com/artworks-EVuQNIzzl9yNvHOA-E3zCGA-t500x500.jpg',
        description: 'Стильная футболка с уникальным принтом, выполненная из 100% хлопка. Подходит для повседневной носки.'
    },
    2: { 
        name: 'Худи oversize', 
        price: '4500 ₽', 
        image: 'https://the-flow.ru/uploads/images/resize/830x0/adaptiveResize/11/49/82/06/35/fef811140cd7.jpg',
        description: 'Тёплое и уютное худи в стиле oversize. Отличный выбор для прохладной погоды.'
    },
    3: { 
        name: 'Футболка с принтом', 
        price: '2500 ₽', 
        image: 'https://i1.sndcdn.com/artworks-EVuQNIzzl9yNvHOA-E3zCGA-t500x500.jpg',
        description: 'Ещё одна вариация нашей популярной футболки с принтом. Лёгкая и удобная.'
    },
    4: { 
        name: 'Футболка с принтом', 
        price: '2500 ₽', 
        image: 'https://i1.sndcdn.com/artworks-EVuQNIzzl9yNvHOA-E3zCGA-t500x500.jpg',
        description: 'Классическая футболка с ярким дизайном, созданная вручную.'
    },
    5: { 
        name: 'Футболка с принтом', 
        price: '2500 ₽', 
        image: 'https://i1.sndcdn.com/artworks-EVuQNIzzl9yNvHOA-E3zCGA-t500x500.jpg',
        description: 'Простая, но стильная футболка для любого случая.'
    },
    6: { 
        name: 'Футболка с принтом', 
        price: '2500 ₽', 
        image: 'https://i1.sndcdn.com/artworks-EVuQNIzzl9yNvHOA-E3zCGA-t500x500.jpg',
        description: 'Футболка с минималистичным дизайном, подчёркивающим индивидуальность.'
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