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

// Класс для слайдеров (чтобы не повторяться как долбаеб)
class Slider {
    constructor(sliderId, dotsId, prevBtnId, nextBtnId) {
        this.slider = document.getElementById(sliderId);
        this.dotsContainer = document.getElementById(dotsId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        
        this.slides = this.slider.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.visibleSlides = window.innerWidth <= 768 ? 1 : 3;
        
        this.init();
    }

    init() {
        this.createDots();
        this.updateSlider();
        this.bindEvents();
        
        // Автопрокрутка
        this.autoSlide = setInterval(() => this.shiftSlides('right'), 5000);
        
        // Пауза при наведении
        this.slider.addEventListener('mouseenter', () => clearInterval(this.autoSlide));
        this.slider.addEventListener('mouseleave', () => {
            this.autoSlide = setInterval(() => this.shiftSlides('right'), 5000);
        });
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToGroup(i));
            this.dotsContainer.appendChild(dot);
        }
        this.updateDots();
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goToGroup(index) {
        this.currentIndex = index;
        if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
        if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
        this.updateSlider();
    }

    shiftSlides(direction) {
        this.prevBtn.disabled = true;
        this.nextBtn.disabled = true;

        const currentSlides = this.slider.querySelectorAll('.slide');
        currentSlides.forEach(slide => {
            slide.style.animation = 'slideOut 0.5s forwards';
        });

        setTimeout(() => {
            if (direction === 'right') {
                this.currentIndex++;
                if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
            } else {
                this.currentIndex--;
                if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
            }
            this.updateSlider();
            this.prevBtn.disabled = false;
            this.nextBtn.disabled = false;
        }, 500);
    }

    updateSlider() {
        this.slider.innerHTML = '';
        for (let i = 0; i < this.visibleSlides; i++) {
            const slideIndex = (this.currentIndex + i) % this.slides.length;
            const newSlide = this.slides[slideIndex].cloneNode(true);
            newSlide.style.animation = 'slideIn 0.5s forwards';
            
            // Клик на товар
            newSlide.addEventListener('click', () => {
                const productId = newSlide.getAttribute('data-product-id');
                window.location.href = `product.html?id=${productId}`;
            });
            
            this.slider.appendChild(newSlide);
        }
        this.updateDots();
    }

    bindEvents() {
        // Кнопки
        this.nextBtn.addEventListener('click', () => this.shiftSlides('right'));
        this.prevBtn.addEventListener('click', () => this.shiftSlides('left'));

        // Свайпы
        let touchStartX = 0;
        let touchEndX = 0;

        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            clearInterval(this.autoSlide);
        });

        this.slider.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        this.slider.addEventListener('touchend', () => {
            const swipeDistance = touchStartX - touchEndX;
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    this.shiftSlides('right');
                } else {
                    this.shiftSlides('left');
                }
            }
            this.autoSlide = setInterval(() => this.shiftSlides('right'), 5000);
        });
    }
}

// Поиск по каталогу
const searchInput = document.getElementById('search');
const allSlides = Array.from(document.querySelectorAll('.slide'));

// Сохраняем оригинальные слайды для каждого слайдера
const originalSlides1 = allSlides.filter(slide => slide.closest('#slider1'));
const originalSlides2 = allSlides.filter(slide => slide.closest('#slider2'));

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    if (!query.trim()) {
        // Восстанавливаем оригинальные слайды
        if (slider1) {
            slider1.slides = [...originalSlides1];
            slider1.currentIndex = 0;
            slider1.updateSlider();
            slider1.createDots();
        }
        
        if (slider2) {
            slider2.slides = [...originalSlides2];
            slider2.currentIndex = 0;
            slider2.updateSlider();
            slider2.createDots();
        }
        return;
    }

    // Фильтруем для первого слайдера
    const filteredSlides1 = originalSlides1.filter(slide => 
        slide.querySelector('.slide-info p:first-child')
            .textContent.toLowerCase()
            .includes(query)
    );

    // Фильтруем для второго слайдера
    const filteredSlides2 = originalSlides2.filter(slide => 
        slide.querySelector('.slide-info p:first-child')
            .textContent.toLowerCase()
            .includes(query)
    );

    // Обработка первого слайдера
    if (filteredSlides1.length > 0 && slider1) {
        slider1.slides = filteredSlides1;
        slider1.currentIndex = 0;
        slider1.updateSlider();
        slider1.createDots();
    } else if (slider1) {
        slider1.slider.innerHTML = '<p style="text-align:center; padding:20px; width: 100%;">Товар не найден</p>';
        document.getElementById('slider1-dots').innerHTML = '';
    }

    // Обработка второго слайдера
    if (filteredSlides2.length > 0 && slider2) {
        slider2.slides = filteredSlides2;
        slider2.currentIndex = 0;
        slider2.updateSlider();
        slider2.createDots();
    } else if (slider2) {
        slider2.slider.innerHTML = '<p style="text-align:center; padding:20px; width: 100%;">Товар не найден</p>';
        document.getElementById('slider2-dots').innerHTML = '';
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

window.addEventListener('resize', () => {
    const newVisibleSlides = window.innerWidth <= 768 ? 1 : 3;
    [slider1, slider2].forEach(slider => {
        slider.visibleSlides = newVisibleSlides;
        slider.updateSlider();
    });
});

const slider1 = new Slider('slider1', 'slider1-dots', 'prevBtn1', 'nextBtn1');
const slider2 = new Slider('slider2', 'slider2-dots', 'prevBtn2', 'nextBtn2');

