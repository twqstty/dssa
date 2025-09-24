window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
});

// Управление секциями
const aboutLink = document.querySelector('[data-toggle="about"]');
const aboutSection = document.getElementById('about');
const closeBtn = document.querySelector('.close-btn');
const contactLink = document.querySelector('[data-toggle="contact"]');
const contactModal = document.getElementById('contact');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const overlay = document.getElementById('overlay');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSection(aboutSection);
});

closeBtn.addEventListener('click', () => aboutSection.classList.add('hidden'));

contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(contactModal);
});

modalCloseBtn.addEventListener('click', () => closeModal(contactModal));
overlay.addEventListener('click', () => closeModal(contactModal));

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function toggleSection(section) {
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        section.style.animation = 'fadeIn 0.5s ease-in';
    } else {
        section.classList.add('hidden');
    }
}

function openModal(modal) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    modal.style.animation = 'fadeIn 0.3s ease-in';
}

function closeModal(modal) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Темная тема
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Галерея
const galleryImages = document.querySelectorAll('.gallery img');
const preview = document.querySelector('.gallery-preview');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        preview.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    });
});

// Управление слайдером
const slider = document.getElementById('slider');
let slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('slider-dots');
const searchInput = document.getElementById('search');

let currentIndex = 0;
let visibleSlides = window.innerWidth <= 768 ? 1 : 3;

window.addEventListener('resize', () => {
    visibleSlides = window.innerWidth <= 768 ? 1 : 3;
    updateSlider();
});

function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToGroup(i));
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToGroup(index) {
    currentIndex = index;
    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    updateSlider();
}

function shiftSlides(direction) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    const currentSlides = slider.querySelectorAll('.slide');
    currentSlides.forEach(slide => {
        slide.style.animation = 'slideOut 0.5s forwards';
    });

    setTimeout(() => {
        if (direction === 'right') {
            currentIndex++;
            if (currentIndex >= slides.length) currentIndex = 0;
        } else {
            currentIndex--;
            if (currentIndex < 0) currentIndex = slides.length - 1;
        }
        updateSlider();
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }, 500);
}

function updateSlider() {
    slider.innerHTML = '';
    for (let i = 0; i < visibleSlides; i++) {
        const slideIndex = (currentIndex + i) % slides.length;
        const newSlide = slides[slideIndex].cloneNode(true);
        newSlide.style.animation = 'slideIn 0.5s forwards';
        newSlide.addEventListener('click', () => {
            const productId = newSlide.getAttribute('data-product-id');
            window.location.href = `product.html?id=${productId}`;
        });
        slider.appendChild(newSlide);
    }
    updateDots();
}

let autoSlide = setInterval(() => shiftSlides('right'), 5000);
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => autoSlide = setInterval(() => shiftSlides('right'), 5000));

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoSlide);
});

slider.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
    const swipeDistance = touchStartX - touchEndX;
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            shiftSlides('right');
        } else {
            shiftSlides('left');
        }
    }
    autoSlide = setInterval(() => shiftSlides('right'), 5000);
});

nextBtn.addEventListener('click', () => shiftSlides('right'));
prevBtn.addEventListener('click', () => shiftSlides('left'));

// ✅ Новый поиск по каталогу
const allSlides = Array.from(document.querySelectorAll('.slide'));
slides = allSlides;

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    if (!query.trim()) {
        // Пустой запрос → показываем все товары
        slides = allSlides;
        currentIndex = 0;
        updateSlider();
        createDots();
        return;
    }

    const filteredSlides = allSlides.filter(slide => 
        slide.querySelector('.slide-info p:first-child')
            .textContent.toLowerCase()
            .includes(query)
    );

    if (filteredSlides.length > 0) {
        slides = filteredSlides;
        currentIndex = 0;
        updateSlider();
        createDots();
    } else {
        slider.innerHTML = '<p style="text-align:center; padding:20px;">Товар не найден</p>';
        dotsContainer.innerHTML = '';
    }
});

// Кнопка "Наверх"
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 200);
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Инициализация
createDots();
updateSlider();
