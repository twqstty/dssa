// Управление секциями
const aboutLink = document.querySelector('[data-toggle="about"]');
const aboutSection = document.getElementById('about');
const closeBtn = document.querySelector('.close-btn');
const contactLink = document.querySelector('[data-toggle="contact"]');
const contactSection = document.getElementById('contact');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSection(aboutSection);
});

closeBtn.addEventListener('click', () => aboutSection.classList.add('hidden'));

contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSection(contactSection);
});

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

// Управление слайдером
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('slider-dots');

let currentIndex = 0;
let visibleSlides = window.innerWidth <= 768 ? 1 : 3; // 1 слайд на мобильных, 3 на десктопе
const totalGroups = Math.ceil(slides.length / visibleSlides);

// Обновляем visibleSlides при изменении размера окна
window.addEventListener('resize', () => {
    visibleSlides = window.innerWidth <= 768 ? 1 : 3;
    updateSlider();
});

// Создаем точки
function createDots() {
    dotsContainer.innerHTML = ''; // Очищаем точки перед созданием
    for (let i = 0; i < slides.length; i++) { // Точки теперь для каждого слайда
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToGroup(i));
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

// Обновляем активную точку
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Переход к конкретному слайду
function goToGroup(index) {
    currentIndex = index;
    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    updateSlider();
}

// Сдвиг слайдов
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

// Обновление слайдера
function updateSlider() {
    slider.innerHTML = '';
    for (let i = 0; i < visibleSlides; i++) {
        const slideIndex = (currentIndex + i) % slides.length;
        const newSlide = slides[slideIndex].cloneNode(true);
        newSlide.style.animation = 'slideIn 0.5s forwards';
        slider.appendChild(newSlide);
    }
    updateDots();
}

// Автоматическая прокрутка
let autoSlide = setInterval(() => shiftSlides('right'), 5000);
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => autoSlide = setInterval(() => shiftSlides('right'), 5000));

// Сенсорные жесты для слайдера
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

// Обработчики событий для слайдера
nextBtn.addEventListener('click', () => shiftSlides('right'));
prevBtn.addEventListener('click', () => shiftSlides('left'));

// Инициализация
createDots();
updateSlider();




