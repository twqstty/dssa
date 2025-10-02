const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

const orderBtn = document.querySelector('.order-btn');
const orderModal = document.getElementById('orderModal');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const overlay = document.getElementById('overlay');
const sizeSelect = document.getElementById('size');
const orderSizeInput = document.getElementById('orderSize');

orderBtn.addEventListener('click', () => {
    orderSizeInput.value = sizeSelect.value;
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

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

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
    },
    8: {
        name: 'Футболка Clash Royale Gay',
        price: '6500 ₽',
        image: 'https://i.etsystatic.com/58866856/r/il/c05805/7009095890/il_570xN.7009095890_yfs2.jpg',
        description: 'Футболка для настоящих геев, если ты один из нас то тебе следует ее купить'
    },
    9: {
        name: 'Футболка Clash Royale The Log',
        price: '2200 ₽',
        image: 'https://m.media-amazon.com/images/I/51CgLLViJNL._AC_SY350_QL65_.jpg',
        description: 'Крутая футболка для зала чтобы дамы знали свое место' 
    },
    10: {
        name: 'Футболка Clash Royale Inferno',
        price: '2200 ₽',
        image: 'https://basket-16.wbbasket.ru/vol2409/part240911/240911123/images/big/1.webp',
        description: 'Крутая футболка для зала чтобы дамы знали кто тут босс'
    },
    11: {
        name: 'Футболка Clash Royale Fuck',
        price: '2200 ₽',
        image: 'https://static.insales-cdn.com/images/products/1/2084/689162276/klehsh-royal-futbolka-ehmodzi.jpg',
        description: 'Лучшая футболка чтобы к тебе никто не приставал'
    },
    12: {
        name: 'Футболка Нигер на свинюшке',
        price: '2900 ₽',
        image: 'https://printbar.ru/upload/thumb/images/ea/eaebf20jbb6_580x0.jpg',
        description: 'Ну это самая лучшая футболка из всех возможных'
    },
    13: {
        name: 'Футболка Плаки Плаки',
        price: '2796 ₽',
        image: 'https://ae04.alicdn.com/kf/S46e1bb379db245f3a596149f642dda94L.jpg_480x480.jpg',
        description: 'Футболка подходит чтобы поприкалываться над своим другом '
    },
    14: {
        name: 'Футболка Clash Royale Golem',
        price: '3200 ₽',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmVZ6Tn4uvYsss-DAb2RQIJSjxOOiL1RjxPQ&s',
        description: ''
    }
};

console.log('Product ID:', productId);
const product = products[productId];
console.log('Product:', product);

if (product) {
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productImage').src = product.image;
    document.getElementById('productImage').alt = product.name;
    document.getElementById('productDescription').textContent = product.description;
} else {
    document.querySelector('.product-content').innerHTML = '<p>Товар не найден</p>';
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});