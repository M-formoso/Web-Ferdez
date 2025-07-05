// FERDEZ - Main JavaScript File

// Variables globales
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Inicializar aplicación
function initializeApp() {
    initializeNavigation();
    initializeCarousel();
    initializeScrollAnimations();
    initializeProductsCarousel();
    initializeSmoothScrolling();
    initializeFormValidation();
}

// === NAVEGACIÓN ===
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu móvil
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Cerrar menu al hacer click en link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar sticky behavior
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });

    // Active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// === CAROUSEL HERO ===
function initializeCarousel() {
    if (slides.length === 0) return;

    // Manejar errores de video
    initializeVideoHandling();
    
    startCarousel();
    
    // Auto-play carousel
    slideInterval = setInterval(nextSlide, 5000);

    // Pausar en hover
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });

        heroSection.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    heroSection.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    heroSection.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// === MANEJO DE VIDEOS ===
function initializeVideoHandling() {
    const videos = document.querySelectorAll('.hero-video');
    
    videos.forEach(video => {
        video.addEventListener('loadstart', function() {
            console.log('Video cargando...');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video listo para reproducir');
            this.style.opacity = '1';
        });
        
        video.addEventListener('error', function() {
            console.error('Error cargando video:', this.error);
            // Mostrar imagen de fallback
            const fallbackImg = this.nextElementSibling;
            if (fallbackImg && fallbackImg.tagName === 'IMG') {
                this.style.display = 'none';
                fallbackImg.style.display = 'block';
            }
        });

        // Intentar cargar el video
        video.load();
        
        // Reproducir cuando sea posible
        video.play().catch(error => {
            console.log('Autoplay bloqueado:', error);
            // El autoplay puede estar bloqueado, pero el video debería mostrarse
        });
    });
}

function startCarousel() {
    showSlide(currentSlide);
}

function showSlide(index) {
    // Ocultar todas las slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remover active de todos los indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    // Mostrar slide actual
    if (slides[index]) {
        slides[index].classList.add('active');
    }

    // Activar indicator correspondiente
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Funciones globales para los controles del carousel
function changeSlide(direction) {
    clearInterval(slideInterval);
    
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
    
    // Reiniciar auto-play
    slideInterval = setInterval(nextSlide, 5000);
}

function currentSlideIndex(index) {
    clearInterval(slideInterval);
    currentSlide = index - 1;
    showSlide(currentSlide);
    
    // Reiniciar auto-play
    slideInterval = setInterval(nextSlide, 5000);
}

// === ANIMACIONES AL SCROLL ===
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll(`
        .diferencial-item,
        .service-card,
        .about-text,
        .about-image,
        .product-slide
    `);

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Animación de contadores (si los agregamos después)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        observer.observe(counter);
        counter.addEventListener('visible', animateCounter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// === CAROUSEL DE PRODUCTOS ===
function initializeProductsCarousel() {
    const productsContainer = document.querySelector('.products-container');
    
    if (productsContainer) {
        // Duplicar slides para efecto infinito
        const slides = productsContainer.innerHTML;
        productsContainer.innerHTML = slides + slides;

        // Pausar animación en hover
        productsContainer.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        productsContainer.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// === SMOOTH SCROLLING ===
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === VALIDACIÓN DE FORMULARIOS ===
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'Este campo es requerido');
            isValid = false;
        } else {
            clearFieldError(input);
            
            // Validaciones específicas
            if (input.type === 'email' && !isValidEmail(input.value)) {
                showFieldError(input, 'Ingresa un email válido');
                isValid = false;
            }
            
            if (input.type === 'tel' && !isValidPhone(input.value)) {
                showFieldError(input, 'Ingresa un teléfono válido');
                isValid = false;
            }
        }
    });
    
    if (isValid) {
        submitForm(form);
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Mostrar loading
    submitButton.innerHTML = '<span class="loading"></span> Enviando...';
    submitButton.disabled = true;
    
    // Simular envío (aquí iría la lógica real de envío)
    setTimeout(() => {
        // Mostrar mensaje de éxito
        showSuccessMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        form.reset();
        
        // Restaurar botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 4000);
}

// === UTILIDADES ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// === LAZY LOADING DE IMÁGENES ===
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// === GESTIÓN DE ERRORES ===
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    // Aquí podrías enviar errores a un servicio de logging
});

// === ANALYTICS (PLACEHOLDER) ===
function trackEvent(category, action, label) {
    // Aquí iría la integración con Google Analytics o similar
    console.log('Event tracked:', { category, action, label });
}

// === PERFORMANCE ===
// Optimizar scroll events
const optimizedScroll = throttle(updateActiveNavLink, 100);
window.addEventListener('scroll', optimizedScroll);

// === ACCESIBILIDAD ===
// Manejo de teclado para carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Skip links para accesibilidad
function addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// === INICIALIZACIÓN FINAL ===
// Agregar skip links
addSkipLinks();

// Inicializar lazy loading cuando esté disponible
if ('IntersectionObserver' in window) {
    initializeLazyLoading();
}

// Service Worker (si se implementa PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado correctamente');
            })
            .catch(function(err) {
                console.log('ServiceWorker falló al registrarse');
            });
    });
}

// Exportar funciones globales necesarias para HTML
window.changeSlide = changeSlide;
window.currentSlide = currentSlideIndex;