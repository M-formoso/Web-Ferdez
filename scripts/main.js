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
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeFormValidation();
    
    // Ejecutar el carrusel al final
    initializeProductsCarousel();
    
    // Inicializar navegación de productos
    initializeProductLinks();
    
    // Manejar navegación desde URL con hash
    handleProductNavigation();
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

// Hero Video Management
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    const heroFallback = document.querySelector('.hero-fallback');
    
    if (heroVideo) {
        // Handle video load errors
        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load, showing fallback image');
            heroVideo.style.display = 'none';
            if (heroFallback) {
                heroFallback.style.display = 'block';
            }
        });
        
        // Ensure video plays (some browsers block autoplay)
        heroVideo.addEventListener('canplay', function() {
            heroVideo.play().catch(function(error) {
                console.log('Autoplay prevented:', error);
                // If autoplay fails, you could show a play button here
            });
        });
        
        // Optional: Pause video when page is not visible (performance optimization)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(function(error) {
                    console.log('Could not resume video:', error);
                });
            }
        });
    }
});

// Mobile Menu Toggle (keep your existing mobile menu code)
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// === NAVEGACIÓN DE PRODUCTOS (NUEVA FUNCIONALIDAD) ===

// Función para manejar la navegación desde el carousel
function handleProductNavigation() {
    // Detectar si estamos en la página de productos con un hash
    if (window.location.pathname.includes('productos.html') && window.location.hash) {
        const productId = window.location.hash.substring(1);
        
        // Esperar a que la página cargue completamente
        setTimeout(() => {
            // Abrir modal del producto si existe
            if (typeof openProductModal === 'function' && typeof productData !== 'undefined' && productData[productId]) {
                openProductModal(productId);
            } else {
                // Alternativa: scroll al producto específico
                scrollToProduct(productId);
            }
        }, 500);
    }
}

// Función para hacer scroll a un producto específico
function scrollToProduct(productId) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const button = card.querySelector('.product-cta');
        if (button && button.onclick) {
            const buttonProductId = button.onclick.toString().match(/'([^']+)'/);
            if (buttonProductId && buttonProductId[1] === productId) {
                // Scroll suave al producto
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Destacar temporalmente el producto
                highlightProduct(card);
                
                // Abrir modal después del scroll
                setTimeout(() => {
                    if (typeof openProductModal === 'function') {
                        openProductModal(productId);
                    }
                }, 1000);
            }
        }
    });
}

// Función para destacar un producto temporalmente
function highlightProduct(productCard) {
    // Agregar clase de highlight
    productCard.classList.add('highlighted');
    
    // Quitar la clase después de 2 segundos
    setTimeout(() => {
        productCard.classList.remove('highlighted');
    }, 2000);
}

// Función para rastrear clicks en el carousel
function trackCarouselClick(productName, productId) {
    // Analytics tracking
    if (typeof trackEvent === 'function') {
        trackEvent('Product Carousel', 'Click', productName);
    }
    
    // Console log para debugging
    console.log(`Navegando a producto: ${productName} (${productId})`);
}

// Función para pausar/reanudar el carousel
function toggleCarouselAnimation(pause = true) {
    const container = document.querySelector('.products-container');
    if (!container) return;
    
    if (pause) {
        container.style.animationPlayState = 'paused';
    } else {
        container.style.animationPlayState = 'running';
    }
}

// Inicializar event listeners para productos
function initializeProductLinks() {
    // Agregar event listeners a los enlaces del carousel
    const productLinks = document.querySelectorAll('.product-slide-link');
    
    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.includes('#')) {
                const productId = href.split('#')[1];
                const productName = this.querySelector('h3')?.textContent || 'Unknown Product';
                
                // Tracking del click
                trackCarouselClick(productName, productId);
                
                // Agregar clase de loading visual (opcional)
                this.classList.add('loading-navigation');
                
                // Remover clase después de un momento
                setTimeout(() => {
                    this.classList.remove('loading-navigation');
                }, 300);
            }
        });
        
        // Mejorar accesibilidad con teclado
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Pausar carousel cuando el usuario está interactuando
    const carousel = document.querySelector('.products-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            toggleCarouselAnimation(true);
        });
        
        carousel.addEventListener('mouseleave', () => {
            toggleCarouselAnimation(false);
        });
        
        // Pausar en focus para accesibilidad
        productLinks.forEach(link => {
            link.addEventListener('focus', () => {
                toggleCarouselAnimation(true);
            });
            
            link.addEventListener('blur', () => {
                // Solo reanudar si ningún elemento del carousel tiene focus
                setTimeout(() => {
                    const focusedElement = document.activeElement;
                    const carouselHasFocus = carousel.contains(focusedElement);
                    if (!carouselHasFocus) {
                        toggleCarouselAnimation(false);
                    }
                }, 100);
            });
        });
    }
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

// === CAROUSEL DE PRODUCTOS INFINITO - VERSION MEJORADA ===
function initializeProductsCarousel() {
    console.log('Iniciando carrusel infinito...');
    
    // Esperar un poco más para asegurar que el DOM esté listo
    setTimeout(() => {
        const productsContainer = document.querySelector('.products-container');
        console.log('Container encontrado:', productsContainer);
        
        if (!productsContainer) return;
        
        const products = productsContainer.querySelectorAll('.product-slide-link');
        console.log('Productos encontrados:', products.length);
        
        if (products.length === 0) return;
        
        // DUPLICAR PRODUCTOS PARA EFECTO INFINITO
        const originalProducts = Array.from(products);
        
        // Crear una copia completa de todos los productos
        originalProducts.forEach(product => {
            const clone = product.cloneNode(true);
            productsContainer.appendChild(clone);
        });
        
        // Configurar el container para scroll infinito
        productsContainer.style.cssText = `
            display: flex;
            gap: 2rem;
            animation: scrollProductsInfinite 25s linear infinite;
            width: max-content;
            will-change: transform;
        `;
        
        // Crear la animación CSS infinita si no existe
        let existingStyle = document.querySelector('#carousel-styles');
        if (!existingStyle) {
            const style = document.createElement('style');
            style.id = 'carousel-styles';
            style.innerHTML = `
                @keyframes scrollProductsInfinite {
                    0% { 
                        transform: translateX(0); 
                    }
                    100% { 
                        transform: translateX(-50%); 
                    }
                }
                
                .products-container:hover {
                    animation-play-state: paused;
                }
                
                /* Responsive speeds */
                @media (max-width: 768px) {
                    .products-container {
                        animation-duration: 30s !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .products-container {
                        animation-duration: 35s !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('Carrusel infinito aplicado con velocidad ajustada');
        
        // Re-aplicar event listeners a todos los elementos (originales y clonados)
        setTimeout(() => {
            initializeProductLinks();
        }, 100);
        
    }, 500);
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
window.handleProductNavigation = handleProductNavigation;
window.trackCarouselClick = trackCarouselClick;