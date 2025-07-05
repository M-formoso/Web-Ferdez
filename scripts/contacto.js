// FERDEZ - Contacto JavaScript

// Variables globales
let isFormSubmitting = false;
let formData = {};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeContacto();
});

function initializeContacto() {
    initializeContactForm();
    initializeFAQ();
    initializeScrollAnimations();
    initializeFormValidation();
    setupModalEvents();
    initializePhoneFormatting();
    setupFormTracking();
}

// === FORMULARIO DE CONTACTO ===
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Auto-save en localStorage
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        // Cargar datos guardados
        const savedValue = localStorage.getItem(`ferdez_form_${input.name}`);
        if (savedValue && input.type !== 'checkbox') {
            input.value = savedValue;
        } else if (input.type === 'checkbox' && savedValue === 'true') {
            input.checked = true;
        }
        
        // Guardar cambios
        input.addEventListener('input', function() {
            if (this.type === 'checkbox') {
                localStorage.setItem(`ferdez_form_${this.name}`, this.checked);
            } else {
                localStorage.setItem(`ferdez_form_${this.name}`, this.value);
            }
        });
    });
    
    // Limpiar datos guardados al enviar exitosamente
    form.addEventListener('form-success', function() {
        formInputs.forEach(input => {
            localStorage.removeItem(`ferdez_form_${input.name}`);
        });
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isFormSubmitting) return;
    
    const form = e.target;
    const formDataObj = new FormData(form);
    formData = Object.fromEntries(formDataObj);
    
    // Validación
    if (!validateForm(form)) {
        return;
    }
    
    // Cambiar estado del botón
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    isFormSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
    
    // Simular envío (aquí iría la lógica real)
    setTimeout(() => {
        // Simular éxito o error aleatoriamente para demo
        const success = Math.random() > 0.1; // 90% éxito
        
        if (success) {
            handleFormSuccess(form, submitBtn, originalText);
        } else {
            handleFormError(form, submitBtn, originalText);
        }
    }, 2000);
    
    // Tracking
    trackEvent('Contact', 'Form Submit', formData.motivoConsulta);
}

function handleFormSuccess(form, submitBtn, originalText) {
    showNotification('¡Consulta enviada exitosamente! Te contactaremos dentro de las próximas 24 horas.', 'success');
    
    // Resetear formulario
    form.reset();
    clearFormErrors(form);
    
    // Evento personalizado
    form.dispatchEvent(new CustomEvent('form-success'));
    
    // Restaurar botón
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    isFormSubmitting = false;
    
    // Redirección opcional
    setTimeout(() => {
        // window.location.href = 'gracias.html';
    }, 2000);
    
    trackEvent('Contact', 'Form Success', formData.motivoConsulta);
}

function handleFormError(form, submitBtn, originalText) {
    showNotification('Hubo un error al enviar tu consulta. Por favor, inténtalo nuevamente o contactanos por teléfono.', 'error');
    
    // Restaurar botón
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    isFormSubmitting = false;
    
    trackEvent('Contact', 'Form Error', 'Submit failed');
}

// === VALIDACIÓN DE FORMULARIO ===
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Validación en tiempo real
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Validación especial para email y teléfono
    const emailInput = form.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Ingresa un email válido');
            } else {
                clearFieldError(this);
            }
        });
    }
    
    const phoneInput = form.querySelector('#telefono');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            if (this.value && !isValidPhone(this.value)) {
                showFieldError(this, 'Ingresa un teléfono válido');
            } else {
                clearFieldError(this);
            }
        });
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validación específica de checkbox de términos
    const acceptCheckbox = form.querySelector('#acepto');
    if (acceptCheckbox && !acceptCheckbox.checked) {
        showNotification('Debes aceptar la política de privacidad para continuar', 'error');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    // Campo requerido vacío
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es requerido');
        return false;
    }
    
    // Validaciones específicas por tipo
    if (value) {
        switch (field.type) {
            case 'email':
                if (!isValidEmail(value)) {
                    showFieldError(field, 'Ingresa un email válido');
                    return false;
                }
                break;
            case 'tel':
                if (!isValidPhone(value)) {
                    showFieldError(field, 'Ingresa un teléfono válido');
                    return false;
                }
                break;
            case 'number':
                if (isNaN(value) || value < 0) {
                    showFieldError(field, 'Ingresa un número válido');
                    return false;
                }
                break;
        }
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remover mensaje anterior
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Agregar nuevo mensaje
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearFormErrors(form) {
    const errorFields = form.querySelectorAll('.error');
    const errorMessages = form.querySelectorAll('.error-message');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
}

// === VALIDADORES AUXILIARES ===
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Acepta diferentes formatos de teléfono argentino
    const phoneRegex = /^(\+54|0054|54)?[\s\-]?(?:\(?(?:11|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\)?[\s\-]?)?(?:\d{4}[\s\-]?\d{4}|\d{3}[\s\-]?\d{3}|\d{6,8})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// === FORMATEO DE TELÉFONO ===
function initializePhoneFormatting() {
    const phoneInput = document.getElementById('telefono');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        // Formatear teléfono argentino
        if (value.length >= 10) {
            if (value.startsWith('54')) {
                value = value.substring(2);
            }
            
            if (value.length === 10) {
                // Formato: (011) 1234-5678
                value = `(${value.substring(0, 3)}) ${value.substring(3, 7)}-${value.substring(7)}`;
            }
        }
        
        this.value = value;
    });
}

// === FAQ SECTION ===
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                toggleFAQ(this);
            });
        }
    });
}

function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    
    const isOpen = faqItem.classList.contains('active');
    
    // Cerrar otros FAQs
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
            item.querySelector('.faq-question i').classList.remove('fa-chevron-up');
            item.querySelector('.faq-question i').classList.add('fa-chevron-down');
        }
    });
    
    // Toggle FAQ actual
    if (isOpen) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = null;
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    } else {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    }
    
    // Tracking
    trackEvent('FAQ', isOpen ? 'Close' : 'Open', button.querySelector('span').textContent);
}

// === MODALES ===
function setupModalEvents() {
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Cerrar modales con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

function openMapModal() {
    const modal = document.getElementById('mapModal');
    if (modal) {
        modal.style.display = 'block';
        trackEvent('Contact', 'Open Map', 'Map Modal');
    }
}

function closeMapModal() {
    const modal = document.getElementById('mapModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openPrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'block';
        trackEvent('Contact', 'Open Privacy', 'Privacy Modal');
    }
}

function closePrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// === ANIMACIONES DE SCROLL ===
function initializeScrollAnimations() {
    // Crear observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animación especial para contadores
                if (entry.target.hasAttribute('data-count')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos animables
    const animatableElements = document.querySelectorAll('.contact-method, .faq-item, .office-details .detail-item');
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentCount = Math.floor(progress * target);
        element.textContent = currentCount.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// === NOTIFICACIONES ===
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// === TRACKING Y ANALYTICS ===
function setupFormTracking() {
    // Tracking de inicio de formulario
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    let formStarted = false;
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (!formStarted) {
                trackEvent('Contact', 'Form Start', 'First Input Focus');
                formStarted = true;
            }
        });
    });
    
    // Tracking de abandono
    let formTouched = false;
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            formTouched = true;
        });
    });
    
    window.addEventListener('beforeunload', function() {
        if (formTouched && !isFormSubmitting) {
            trackEvent('Contact', 'Form Abandon', 'Page Leave');
        }
    });
}

function trackEvent(category, action, label) {
    // Integración con Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Integración con Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', {
            event_category: category,
            event_action: action,
            event_label: label
        });
    }
    
    // Log para desarrollo
    console.log(`Event: ${category} - ${action} - ${label}`);
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
    };
}

// === FUNCIONES GLOBALES PARA HTML ===
// Estas funciones necesitan estar en el scope global para ser llamadas desde HTML
window.toggleFAQ = toggleFAQ;
window.openMapModal = openMapModal;
window.closeMapModal = closeMapModal;
window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;
window.closeNotification = closeNotification;

// === PERFORMANCE Y OPTIMIZACIÓN ===
// Lazy loading para imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
});

// === MANEJO DE ERRORES ===
window.addEventListener('error', function(e) {
    console.error('Error en contacto.js:', e.error);
    trackEvent('Error', 'JavaScript Error', e.error.message);
});

// === EXPORTAR FUNCIONES PARA TESTING ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        isValidEmail,
        isValidPhone,
        trackEvent
    };
}