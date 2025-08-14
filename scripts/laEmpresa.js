// FERDEZ - La Empresa JavaScript

// Variables globales
let currentGalleryIndex = 0;
const galleryImages = [];
let timelineObserver;
let statsAnimated = false;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeEmpresa();
});

function initializeEmpresa() {
    initializeTimeline();
    initializeGallery();
    initializeScrollAnimations();
    initializeStatsCounter();
    initializeParallax();
    setupSmoothScrolling();
}

// === TIMELINE ANIMATIONS ===
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    // Observer para animar timeline items
    timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Animación escalonada
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// === GALERÍA DE INSTALACIONES ===
function initializeGallery() {
    const mainImage = document.querySelector('.gallery-main-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    // Guardar todas las imágenes
    galleryImages.push(mainImage.src);
    thumbnails.forEach(thumb => {
        galleryImages.push(thumb.src);
    });
    
    // Agregar eventos de click a thumbnails
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            changeGalleryImage(this.src, index + 1);
        });
        
        // Hover effect
        thumb.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
        });
        
        thumb.addEventListener('mouseleave', function() {
            this.style.opacity = '0.7';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Navigation con teclado
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.instalaciones-gallery')) {
            if (e.key === 'ArrowRight') {
                navigateGallery(1);
            } else if (e.key === 'ArrowLeft') {
                navigateGallery(-1);
            }
        }
    });
}

function changeGalleryImage(src, index = null) {
    const mainImage = document.querySelector('.gallery-main-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
    
    if (!mainImage) return;
    
    // Fade out
    mainImage.style.opacity = '0.5';
    mainImage.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        mainImage.src = src;
        
        // Fade in
        mainImage.style.opacity = '1';
        mainImage.style.transform = 'scale(1)';
        
        // Update current index
        if (index !== null) {
            currentGalleryIndex = index;
        }
        
        // Update thumbnail states
        thumbnails.forEach((thumb, i) => {
            if (thumb.src === src) {
                thumb.style.opacity = '1';
                thumb.style.transform = 'scale(1.1)';
            } else {
                thumb.style.opacity = '0.7';
                thumb.style.transform = 'scale(1)';
            }
        });
        
    }, 200);
    
    // Analytics
    trackEvent('Empresa', 'Gallery Image Change', src);
}

function navigateGallery(direction) {
    currentGalleryIndex += direction;
    
    if (currentGalleryIndex >= galleryImages.length) {
        currentGalleryIndex = 0;
    } else if (currentGalleryIndex < 0) {
        currentGalleryIndex = galleryImages.length - 1;
    }
    
    changeGalleryImage(galleryImages[currentGalleryIndex], currentGalleryIndex);
}

// === ANIMACIONES AL SCROLL ===
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animación especial para cards
                if (entry.target.classList.contains('valor-card') || 
                    entry.target.classList.contains('equipo-member') ||
                    entry.target.classList.contains('certificacion-item')) {
                    
                    const cards = entry.target.parentElement.children;
                    const index = Array.from(cards).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                }
            }
        });
    }, observerOptions);
    
    // Elementos a observar
    const elementsToAnimate = document.querySelectorAll(`
        .valor-card,
        .equipo-member,
        .certificacion-item,
        .feature-item,
        .historia-text,
        .historia-image,
        .instalaciones-text,
        .instalaciones-gallery,
        .logistica-text,
        .logistica-map
    `);
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// === CONTADOR DE ESTADÍSTICAS ===
function initializeStatsCounter() {
    const statsSection = document.querySelector('.coverage-stats');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Formatear número
            if (target >= 500) {
                stat.textContent = Math.floor(current) + '+';
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// === EFECTO PARALLAX ===
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background img, .logistica-map img');
    
    if (parallaxElements.length === 0) return;
    
    const handleScroll = throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const speed = 0.5;
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }, 16);
    
    window.addEventListener('scroll', handleScroll);
}

// === SMOOTH SCROLLING PARA ANCLAS ===
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                trackEvent('Empresa', 'Anchor Click', targetId);
            }
        });
    });
}

// === MODAL DE IMAGEN EXPANDIDA ===
function createImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeImageModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <img src="" alt="Imagen ampliada" class="modal-image">
                <button class="modal-close" onclick="closeImageModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-nav">
                    <button class="modal-prev" onclick="navigateModal(-1)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="modal-next" onclick="navigateModal(1)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function openImageModal(imageSrc, imageIndex = 0) {
    let modal = document.querySelector('.image-modal');
    
    if (!modal) {
        modal = createImageModal();
    }
    
    const modalImage = modal.querySelector('.modal-image');
    modalImage.src = imageSrc;
    
    currentGalleryIndex = imageIndex;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Cerrar con Escape
    document.addEventListener('keydown', handleModalKeydown);
    
    trackEvent('Empresa', 'Image Modal Open', imageSrc);
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    document.removeEventListener('keydown', handleModalKeydown);
}

function navigateModal(direction) {
    currentGalleryIndex += direction;
    
    if (currentGalleryIndex >= galleryImages.length) {
        currentGalleryIndex = 0;
    } else if (currentGalleryIndex < 0) {
        currentGalleryIndex = galleryImages.length - 1;
    }
    
    const modal = document.querySelector('.image-modal');
    const modalImage = modal.querySelector('.modal-image');
    modalImage.src = galleryImages[currentGalleryIndex];
}

function handleModalKeydown(e) {
    switch(e.key) {
        case 'Escape':
            closeImageModal();
            break;
        case 'ArrowLeft':
            navigateModal(-1);
            break;
        case 'ArrowRight':
            navigateModal(1);
            break;
    }
}

// === FORMULARIO DE CONTACTO RÁPIDO ===
function initializeQuickContact() {
    const quickContactForm = document.getElementById('quickContactForm');
    
    if (!quickContactForm) return;
    
    quickContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validación
        if (!data.name || !data.email || !data.message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        // Simular envío
        showNotification('Consultando...', 'info');
        
        setTimeout(() => {
            showNotification('¡Consulta enviada! Te contactaremos pronto.', 'success');
            this.reset();
            trackEvent('Empresa', 'Quick Contact', 'Form Submit');
        }, 2000);
    });
}

// === TESTIMONIALES ROTATIVOS ===
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length === 0) return;
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
    
    // Initialize first testimonial
    showTestimonial(0);
}

// === UTILIDADES ===
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

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// === EXPORTAR FUNCIONES GLOBALES ===
window.changeGalleryImage = changeGalleryImage;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.navigateModal = navigateModal;

// === LAZY LOADING AVANZADO ===
function initializeLazyLoadingAdvanced() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Crear imagen temporal para precarga
                const tempImg = new Image();
                tempImg.onload = function() {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.classList.remove('lazy');
                };
                tempImg.src = img.dataset.src;
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// === SCROLL SUAVE MEJORADO ===
function initializeAdvancedScrolling() {
    // Detectar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Agregar parallax suave a elementos específicos
        const parallaxElements = document.querySelectorAll('.valor-card, .equipo-member');
        
        const scrollHandler = throttle(() => {
            const scrolled = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrolled;
                const elementHeight = rect.height;
                
                // Solo aplicar parallax si el elemento está visible
                if (rect.bottom >= 0 && rect.top <= viewportHeight) {
                    const scrollProgress = (scrolled + viewportHeight - elementTop) / (viewportHeight + elementHeight);
                    const translateY = (scrollProgress - 0.5) * 20; // Movimiento sutil
                    
                    element.style.transform = `translateY(${translateY}px)`;
                }
            });
        }, 16);
        
        window.addEventListener('scroll', scrollHandler);
    }
}

// === GESTIÓN DE ERRORES ===
function initializeErrorHandling() {
    // Manejo de errores de imágenes
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Imagen de fallback
            this.src = '../assets/images/placeholder.jpg';
            this.alt = 'Imagen no disponible';
            console.warn('Error cargando imagen:', this.src);
        });
    });
    
    // Manejo de errores globales
    window.addEventListener('error', function(e) {
        console.error('Error en la página de empresa:', e.error);
        trackEvent('Error', 'JavaScript Error', e.error.message);
    });
}

// === PERFORMANCE MONITORING ===
function initializePerformanceMonitoring() {
    // Medir tiempo de carga
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Página cargada en ${loadTime}ms`);
        
        trackEvent('Performance', 'Page Load Time', Math.round(loadTime));
        
        // Reportar Core Web Vitals si están disponibles
        if ('web-vital' in window) {
            // Esto sería con una librería externa como web-vitals
            // import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';
        }
    });
}

// === ACCESIBILIDAD MEJORADA ===
function initializeAccessibility() {
    // Skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-orange);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Mejorar navegación por teclado en galería
    const galleryContainer = document.querySelector('.instalaciones-gallery');
    if (galleryContainer) {
        galleryContainer.setAttribute('role', 'region');
        galleryContainer.setAttribute('aria-label', 'Galería de instalaciones');
        
        const thumbnails = galleryContainer.querySelectorAll('.gallery-thumbnails img');
        thumbnails.forEach((thumb, index) => {
            thumb.setAttribute('role', 'button');
            thumb.setAttribute('tabindex', '0');
            thumb.setAttribute('aria-label', `Ver imagen ${index + 1} de las instalaciones`);
            
            thumb.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Agregar ARIA labels a elementos interactivos
    const interactiveElements = document.querySelectorAll('.valor-card, .equipo-member, .certificacion-item');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'article');
    });
}

// === INTEGRACIÓN CON MAPAS ===
function initializeInteractiveMap() {
    const mapContainer = document.querySelector('.logistica-map');
    if (!mapContainer) return;
    
    // Agregar puntos interactivos al mapa
    const locations = [
        { name: 'Córdoba - Sede Central', x: 50, y: 60 },
        { name: 'Buenos Aires', x: 70, y: 80 },
        { name: 'Santa Fe', x: 60, y: 50 },
        { name: 'Entre Ríos', x: 65, y: 70 }
    ];
    
    locations.forEach(location => {
        const point = document.createElement('div');
        point.className = 'map-point';
        point.style.cssText = `
            position: absolute;
            left: ${location.x}%;
            top: ${location.y}%;
            width: 12px;
            height: 12px;
            background: var(--primary-orange);
            border: 3px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
        `;
        
        point.setAttribute('title', location.name);
        point.setAttribute('aria-label', `Ubicación: ${location.name}`);
        
        point.addEventListener('click', function() {
            showLocationInfo(location);
        });
        
        mapContainer.appendChild(point);
    });
    
    // Agregar estilos CSS para la animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function showLocationInfo(location) {
    const tooltip = document.createElement('div');
    tooltip.className = 'location-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <h4>${location.name}</h4>
            <p>Zona de cobertura activa</p>
        </div>
    `;
    tooltip.style.cssText = `
        position: fixed;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        pointer-events: none;
        transform: translate(-50%, -100%);
    `;
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top + 'px';
    
    // Remover después de 3 segundos
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
    
    trackEvent('Empresa', 'Map Point Click', location.name);
}

// === EFECTOS VISUALES AVANZADOS ===
/* === REEMPLAZAR EN scripts/laEmpresa.js === */

// Comentar o eliminar la función de efecto typing
function initializeAdvancedEffects() {
    // COMENTAR/ELIMINAR ESTA SECCIÓN DEL EFECTO TYPING:
    /*
    // Efecto de typing en el hero
    const heroTitle = document.querySelector('.empresa-hero h1');
    if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeEffect = setInterval(() => {
            heroTitle.textContent = originalText.slice(0, i);
            i++;
            
            if (i > originalText.length) {
                clearInterval(typeEffect);
            }
        }, 50);
    }
    */
    
    // MANTENER SOLO LA PARTE DE ESTADÍSTICAS:
    // Efecto de conteo en estadísticas con IntersectionObserver
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateStatNumber(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });
}

// O ALTERNATIVA: Reemplazar toda la función por esta versión sin typing:
function initializeAdvancedEffects() {
    // Efecto de conteo en estadísticas con IntersectionObserver
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateStatNumber(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateStatNumber(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
            current = target;
            clearInterval(timer);
        }
        
        // Formatear número con animación easing
        const easeOutQuart = 1 - Math.pow(1 - step / steps, 4);
        const displayValue = Math.floor(target * easeOutQuart);
        
        if (target >= 500) {
            element.textContent = displayValue + '+';
        } else {
            element.textContent = displayValue;
        }
    }, duration / steps);
}

function animateStatNumber(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
            current = target;
            clearInterval(timer);
        }
        
        // Formatear número con animación easing
        const easeOutQuart = 1 - Math.pow(1 - step / steps, 4);
        const displayValue = Math.floor(target * easeOutQuart);
        
        if (target >= 500) {
            element.textContent = displayValue + '+';
        } else {
            element.textContent = displayValue;
        }
    }, duration / steps);
}

// === INICIALIZACIÓN COMPLETA ===
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initializeEmpresa();
    initializeLazyLoadingAdvanced();
    initializeAdvancedScrolling();
    initializeErrorHandling();
    initializePerformanceMonitoring();
    initializeAccessibility();
    initializeInteractiveMap();
    initializeAdvancedEffects();
    initializeQuickContact();
    initializeTestimonials();
    
    // Precargar imágenes críticas
    preloadCriticalImages();
    
    console.log('FERDEZ Empresa - Todas las funcionalidades inicializadas');
});

function preloadCriticalImages() {
    const criticalImages = [
        '../assets/images/fundadores-campo.jpg',
        '../assets/images/empresa-hero.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// === SERVICE WORKER PARA PWA ===
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