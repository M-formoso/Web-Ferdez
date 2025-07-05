// FERDEZ - Productos JavaScript

// Variables globales
let currentFilter = 'all';
let allProducts = [];
let isFilterAnimating = false;

// Datos detallados de productos
const productData = {
    'burlanda-humeda': {
        name: 'Burlanda Húmeda',
        category: 'húmedo',
        image: 'assets/images/productos/burlanda-humeda.jpg',
        description: 'Subproducto de la destilería de maíz con alto contenido proteico y energético. Ideal para ganado bovino en sistemas intensivos. Su alta palatabilidad y digestibilidad la convierten en una excelente opción para aumentar la producción lechera y el engorde.',
        specs: {
            'Proteína Bruta': '26-30%',
            'Materia Seca': '30-35%',
            'Fibra Bruta': '8-12%',
            'Grasa': '8-12%',
            'Energía Metabolizable': '2.8-3.2 Mcal/kg'
        },
        benefits: [
            'Alto contenido proteico y energético',
            'Excelente palatabilidad',
            'Mejora la producción lechera',
            'Reduce costos de alimentación',
            'Fácil digestibilidad',
            'Disponible todo el año'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 3-6 kg/cab/día | Feedlot: 4-8 kg/cab/día'
    },
    'burlanda-seca': {
        name: 'Burlanda Seca (DDGS)',
        category: 'seco',
        image: 'assets/images/productos/burlanda-seca.jpg',
        description: 'Granos secos de destilería con solubles, resultado del proceso de producción de etanol. Concentra proteínas, grasas y minerales del grano original. Ideal para sistemas que requieren alimentos con mayor conservación.',
        specs: {
            'Proteína Bruta': '28-32%',
            'Materia Seca': '88-92%',
            'Grasa': '8-12%',
            'Fibra Bruta': '7-12%',
            'Fósforo': '0.8-1.0%'
        },
        benefits: [
            'Larga vida útil',
            'Fácil almacenamiento',
            'Alto contenido de aminoácidos',
            'Rico en fósforo disponible',
            'Concentración nutricional',
            'Versatilidad en raciones'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-3 kg/cab/día | Feedlot: 2-4 kg/cab/día'
    },
    'cascarilla-soja': {
        name: 'Cascarilla de Soja',
        category: 'húmedo',
        image: 'assets/images/productos/cascarilla-soja.jpg',
        description: 'Subproducto obtenido del descascarado de la soja. Proporciona fibra altamente digestible, esencial para mantener la función ruminal y mejorar la digestión. Ideal para vacas lecheras de alta producción.',
        specs: {
            'Proteína Bruta': '11-13%',
            'Fibra Bruta': '35-40%',
            'Materia Seca': '85-90%',
            'Grasa': '1-2%',
            'Energía Digestible': '2.8-3.1 Mcal/kg'
        },
        benefits: [
            'Fibra altamente digestible',
            'Mejora la función ruminal',
            'Mantiene el pH ruminal',
            'Aumenta el tiempo de rumia',
            'Bajo costo por unidad nutritiva',
            'Palatabilidad excelente'
        ],
        uses: ['Tambos'],
        dosage: 'Tambo: 2-4 kg/cab/día'
    },
    'pellet-girasol': {
        name: 'Pellet de Girasol',
        category: 'seco',
        image: 'assets/images/productos/pellet-girasol.jpg',
        description: 'Subproducto de la extracción de aceite de girasol, peletizado para facilitar su manejo. Rico en proteínas de alta calidad y con un perfil de aminoácidos favorable para rumiantes.',
        specs: {
            'Proteína Bruta': '30-34%',
            'Grasa': '1-3%',
            'Fibra Bruta': '12-15%',
            'Materia Seca': '88-92%',
            'Lisina': '1.2-1.4%'
        },
        benefits: [
            'Alta concentración proteica',
            'Excelente perfil de aminoácidos',
            'Fácil manejo y dosificación',
            'Mejora conversión alimenticia',
            'Buena palatabilidad',
            'Larga conservación'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-2.5 kg/cab/día | Feedlot: 1.5-3 kg/cab/día'
    },
    'pulpa-citrus': {
        name: 'Pulpa de Citrus Húmeda',
        category: 'húmedo',
        image: 'assets/images/productos/pulpa-citrus.jpg',
        description: 'Subproducto de la industria citrícola con alta palatabilidad y energía digestible. Su contenido de pectinas y azúcares la convierte en una excelente fuente energética para engorde.',
        specs: {
            'Proteína Bruta': '6-8%',
            'Materia Seca': '20-25%',
            'Fibra Bruta': '12-15%',
            'Azúcares': '8-12%',
            'Pectinas': '15-20%'
        },
        benefits: [
            'Excelente palatabilidad',
            'Alta energía digestible',
            'Estimula el consumo',
            'Rico en pectinas',
            'Mejora la ganancia de peso',
            'Reduce acidosis ruminal'
        ],
        uses: ['Feedlots'],
        dosage: 'Feedlot: 3-8 kg/cab/día'
    },
    'alfalfa-deshidratada': {
        name: 'Alfalfa Deshidratada',
        category: 'húmedo',
        image: 'assets/images/productos/alfalfa-deshidratada.jpg',
        description: 'Alfalfa procesada mediante deshidratación artificial que conserva su valor nutricional. Rica en vitaminas, minerales y proteína de excelente calidad para bovinos lecheros.',
        specs: {
            'Proteína Bruta': '16-20%',
            'Fibra Bruta': '25-30%',
            'Calcio': '1.2-1.5%',
            'Fósforo': '0.2-0.3%',
            'Beta Caroteno': '150-200 mg/kg'
        },
        benefits: [
            'Rica en vitaminas y minerales',
            'Proteína de alta calidad',
            'Mejora la reproducción',
            'Aporta beta caroteno natural',
            'Fibra efectiva óptima',
            'Disponibilidad constante'
        ],
        uses: ['Tambos'],
        dosage: 'Tambo: 1-3 kg/cab/día'
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeFilters();
    initializeSearch();
    setupProductCards();
});

// === INICIALIZACIÓN ===
function initializeProducts() {
    allProducts = document.querySelectorAll('.product-card');
    
    // Agregar animaciones de entrada
    allProducts.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    // Configurar observer para animaciones
    setupScrollAnimations();
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            if (filter !== currentFilter && !isFilterAnimating) {
                setActiveFilter(this);
                filterProducts(filter);
            }
        });
    });
}

function initializeSearch() {
    // Si agregamos búsqueda en el futuro
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchProducts(this.value);
            }, 300);
        });
    }
}

function setupProductCards() {
    allProducts.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Click tracking
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('product-cta')) {
                const productId = this.querySelector('.product-cta').onclick.toString().match(/'([^']+)'/)[1];
                openProductModal(productId);
            }
        });
    });
}

// === FILTROS ===
function setActiveFilter(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function filterProducts(filter) {
    isFilterAnimating = true;
    currentFilter = filter;
    
    // Fase 1: Fade out todos los productos
    allProducts.forEach(card => {
        card.classList.add('fade-out');
    });
    
    setTimeout(() => {
        // Fase 2: Mostrar/ocultar según filtro
        allProducts.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                card.classList.remove('hidden', 'fade-out');
                card.classList.add('fade-in');
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        });
        
        setTimeout(() => {
            // Fase 3: Limpiar clases de animación
            allProducts.forEach(card => {
                card.classList.remove('fade-out', 'fade-in');
            });
            isFilterAnimating = false;
        }, 300);
        
    }, 150);

    // Analytics
    trackEvent('Products', 'Filter', filter);
}

function searchProducts(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    allProducts.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
        const productSpecs = card.querySelector('.product-specs').textContent.toLowerCase();
        
        const matches = productName.includes(term) || 
                       productDesc.includes(term) || 
                       productSpecs.includes(term);
        
        if (matches || term === '') {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// === MODAL DE PRODUCTOS ===
function openProductModal(productId) {
    const product = productData[productId];
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }
    
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = createModalContent(product);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Cerrar con Escape
    document.addEventListener('keydown', handleModalKeydown);
    
    // Tracking
    trackEvent('Products', 'Modal Open', product.name);
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
}

function createModalContent(product) {
    const specsHtml = Object.entries(product.specs).map(([key, value]) => `
        <div class="modal-spec-card">
            <h4>${key}</h4>
            <div class="value">${value}</div>
        </div>
    `).join('');
    
    const benefitsHtml = product.benefits.map(benefit => `
        <li>${benefit}</li>
    `).join('');
    
    const usesHtml = product.uses.map(use => `
        <span class="use-tag">${use}</span>
    `).join('');
    
    return `
        <div class="modal-header">
            <img src="${product.image}" alt="${product.name}">
            <div class="modal-header-overlay"></div>
            <h2 class="modal-title">${product.name}</h2>
        </div>
        <div class="modal-body">
            <p class="modal-description">${product.description}</p>
            
            <h3>Especificaciones Técnicas</h3>
            <div class="modal-specs">
                ${specsHtml}
            </div>
            
            <div class="modal-benefits">
                <h3>Beneficios</h3>
                <ul>${benefitsHtml}</ul>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <h4>Usos recomendados:</h4>
                <div class="product-uses">${usesHtml}</div>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <h4>Dosificación sugerida:</h4>
                <p><strong>${product.dosage}</strong></p>
            </div>
            
            <div class="modal-actions">
                <a href="contacto.html" class="cta-button">Solicitar cotización</a>
                <button onclick="downloadTechnicalSheet('${product.name}')" class="cta-button-secondary">
                    <i class="fas fa-download"></i> Ficha técnica
                </button>
            </div>
        </div>
    `;
}

// === FUNCIONES AUXILIARES ===
function downloadTechnicalSheet(productName) {
    // Simulación de descarga de ficha técnica
    trackEvent('Products', 'Download Sheet', productName);
    
    // Aquí iría la lógica real de descarga
    showNotification(`Descargando ficha técnica de ${productName}...`, 'info');
    
    setTimeout(() => {
        showNotification('¡Ficha técnica descargada exitosamente!', 'success');
    }, 2000);
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos para animaciones
    document.querySelectorAll('.product-card, .advisory-content, .products-cta-section').forEach(el => {
        observer.observe(el);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
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
    }, 3000);
}

// === FUNCIONES GLOBALES ===
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.filterProducts = filterProducts;

// === UTILIDADES ===
function trackEvent(category, action, label) {
    // Integración con analytics
    console.log('Event tracked:', { category, action, label });
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// === LAZY LOADING MEJORADO ===
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// === PERFORMANCE ===
// Debounce para resize
const handleResize = debounce(function() {
    // Reajustar layout si es necesario
    adjustLayoutForMobile();
}, 250);

window.addEventListener('resize', handleResize);

function adjustLayoutForMobile() {
    const isMobile = window.innerWidth <= 768;
    const filterControls = document.querySelector('.filter-controls');
    
    if (isMobile) {
        filterControls.classList.add('mobile-layout');
    } else {
        filterControls.classList.remove('mobile-layout');
    }
}

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

// === INICIALIZACIÓN FINAL ===
// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeProductModal();
    }
});

// Inicializar lazy loading si está disponible
if ('IntersectionObserver' in window) {
    initializeLazyLoading();
}

// === ACCESIBILIDAD ===
// Navegación por teclado en filtros
document.addEventListener('keydown', function(e) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const currentFocus = document.activeElement;
    const currentIndex = Array.from(filterBtns).indexOf(currentFocus);
    
    if (currentIndex !== -1) {
        let nextIndex;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = (currentIndex + 1) % filterBtns.length;
                filterBtns[nextIndex].focus();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                nextIndex = (currentIndex - 1 + filterBtns.length) % filterBtns.length;
                filterBtns[nextIndex].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                currentFocus.click();
                break;
        }
    }
});

// === FUNCIONES DE COMPARACIÓN ===
let compareList = [];

function addToCompare(productId) {
    if (compareList.length >= 3) {
        showNotification('Máximo 3 productos para comparar', 'warning');
        return;
    }
    
    if (!compareList.includes(productId)) {
        compareList.push(productId);
        updateCompareUI();
        showNotification('Producto agregado a comparación', 'success');
        trackEvent('Products', 'Add to Compare', productId);
    }
}

function removeFromCompare(productId) {
    compareList = compareList.filter(id => id !== productId);
    updateCompareUI();
    showNotification('Producto removido de comparación', 'info');
}

function updateCompareUI() {
    const compareBtn = document.getElementById('compareButton');
    if (compareBtn) {
        compareBtn.style.display = compareList.length > 0 ? 'block' : 'none';
        compareBtn.textContent = `Comparar (${compareList.length})`;
    }
    
    // Actualizar estado de botones en cards
    allProducts.forEach(card => {
        const productId = getProductIdFromCard(card);
        const compareBtn = card.querySelector('.compare-btn');
        if (compareBtn) {
            if (compareList.includes(productId)) {
                compareBtn.classList.add('active');
                compareBtn.innerHTML = '<i class="fas fa-check"></i>';
            } else {
                compareBtn.classList.remove('active');
                compareBtn.innerHTML = '<i class="fas fa-plus"></i>';
            }
        }
    });
}

function showCompareModal() {
    if (compareList.length < 2) {
        showNotification('Selecciona al menos 2 productos para comparar', 'warning');
        return;
    }
    
    const modal = document.getElementById('compareModal');
    const modalContent = document.getElementById('compareModalContent');
    
    modalContent.innerHTML = createCompareContent();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    trackEvent('Products', 'Compare Modal', compareList.join(','));
}

function createCompareContent() {
    const products = compareList.map(id => productData[id]);
    
    let tableRows = '';
    const allSpecs = new Set();
    
    // Recopilar todas las especificaciones
    products.forEach(product => {
        Object.keys(product.specs).forEach(spec => allSpecs.add(spec));
    });
    
    // Crear filas de la tabla
    allSpecs.forEach(spec => {
        tableRows += `
            <tr>
                <td class="spec-name">${spec}</td>
                ${products.map(product => `
                    <td>${product.specs[spec] || 'N/A'}</td>
                `).join('')}
            </tr>
        `;
    });
    
    return `
        <div class="compare-header">
            <h2>Comparación de Productos</h2>
            <button class="close-compare" onclick="closeCompareModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="compare-content">
            <div class="compare-products">
                ${products.map(product => `
                    <div class="compare-product">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <div class="product-uses">
                            ${product.uses.map(use => `<span class="use-tag">${use}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="compare-table">
                <table>
                    <thead>
                        <tr>
                            <th>Especificación</th>
                            ${products.map(product => `<th>${product.name}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
            <div class="compare-actions">
                <button onclick="clearCompare()" class="cta-button-outline">
                    Limpiar comparación
                </button>
                <a href="contacto.html" class="cta-button">
                    Solicitar cotización
                </a>
            </div>
        </div>
    `;
}

function closeCompareModal() {
    const modal = document.getElementById('compareModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function clearCompare() {
    compareList = [];
    updateCompareUI();
    closeCompareModal();
    showNotification('Comparación limpiada', 'info');
}

function getProductIdFromCard(card) {
    const ctaButton = card.querySelector('.product-cta');
    if (ctaButton && ctaButton.onclick) {
        const match = ctaButton.onclick.toString().match(/'([^']+)'/);
        return match ? match[1] : null;
    }
    return null;
}

// === FAVORITOS ===
let favoritesList = JSON.parse(localStorage.getItem('ferdez_favorites') || '[]');

function toggleFavorite(productId) {
    const index = favoritesList.indexOf(productId);
    
    if (index === -1) {
        favoritesList.push(productId);
        showNotification('Producto agregado a favoritos', 'success');
    } else {
        favoritesList.splice(index, 1);
        showNotification('Producto removido de favoritos', 'info');
    }
    
    localStorage.setItem('ferdez_favorites', JSON.stringify(favoritesList));
    updateFavoritesUI();
    trackEvent('Products', 'Toggle Favorite', productId);
}

function updateFavoritesUI() {
    allProducts.forEach(card => {
        const productId = getProductIdFromCard(card);
        const favoriteBtn = card.querySelector('.favorite-btn');
        if (favoriteBtn) {
            if (favoritesList.includes(productId)) {
                favoriteBtn.classList.add('active');
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                favoriteBtn.classList.remove('active');
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
            }
        }
    });
}

// === FILTROS AVANZADOS ===
function initializeAdvancedFilters() {
    const advancedFilters = {
        protein: { min: 0, max: 50 },
        fiber: { min: 0, max: 50 },
        dryMatter: { min: 0, max: 100 }
    };
    
    // Crear sliders para filtros avanzados
    Object.keys(advancedFilters).forEach(filter => {
        createRangeSlider(filter, advancedFilters[filter]);
    });
}

function createRangeSlider(filterId, range) {
    const container = document.getElementById(`${filterId}Filter`);
    if (!container) return;
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = range.min;
    slider.max = range.max;
    slider.value = range.max;
    slider.className = 'range-slider';
    
    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'range-value';
    valueDisplay.textContent = `${slider.value}%`;
    
    slider.addEventListener('input', function() {
        valueDisplay.textContent = `${this.value}%`;
        applyAdvancedFilters();
    });
    
    container.appendChild(slider);
    container.appendChild(valueDisplay);
}

function applyAdvancedFilters() {
    const filters = {
        protein: document.querySelector('#proteinFilter .range-slider')?.value || 50,
        fiber: document.querySelector('#fiberFilter .range-slider')?.value || 50,
        dryMatter: document.querySelector('#dryMatterFilter .range-slider')?.value || 100
    };
    
    allProducts.forEach(card => {
        const productId = getProductIdFromCard(card);
        const product = productData[productId];
        
        if (product) {
            const matchesFilters = checkProductAgainstFilters(product, filters);
            
            if (matchesFilters) {
                card.classList.remove('filtered-out');
            } else {
                card.classList.add('filtered-out');
            }
        }
    });
}

function checkProductAgainstFilters(product, filters) {
    // Extraer valores numéricos de las especificaciones
    const proteinValue = extractNumericValue(product.specs['Proteína Bruta']);
    const fiberValue = extractNumericValue(product.specs['Fibra Bruta']);
    const dryMatterValue = extractNumericValue(product.specs['Materia Seca']);
    
    return (
        (!proteinValue || proteinValue <= filters.protein) &&
        (!fiberValue || fiberValue <= filters.fiber) &&
        (!dryMatterValue || dryMatterValue <= filters.dryMatter)
    );
}

function extractNumericValue(specString) {
    if (!specString) return null;
    const match = specString.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
}

// === EXPORTAR FUNCIONES ===
window.addToCompare = addToCompare;
window.removeFromCompare = removeFromCompare;
window.showCompareModal = showCompareModal;
window.closeCompareModal = closeCompareModal;
window.clearCompare = clearCompare;
window.toggleFavorite = toggleFavorite;
window.downloadTechnicalSheet = downloadTechnicalSheet;

// === INICIALIZACIÓN FINAL ===
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar favoritos
    updateFavoritesUI();
    
    // Ajustar layout inicial
    adjustLayoutForMobile();
    
    // Precargar modal si hay hash en URL
    const hash = window.location.hash.substring(1);
    if (hash && productData[hash]) {
        setTimeout(() => openProductModal(hash), 500);
    }
});

// === PWA FEATURES ===
// Detectar si está offline
window.addEventListener('online', function() {
    showNotification('Conexión restaurada', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Sin conexión a internet', 'warning');
});

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    console.error('Error en productos:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// === SOCIAL SHARING ===
function shareProduct(productId) {
    const product = productData[productId];
    if (!product) return;
    
    const shareData = {
        title: `${product.name} - FERDEZ`,
        text: product.description,
        url: `${window.location.origin}/productos.html#${productId}`
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => trackEvent('Products', 'Share', productId))
            .catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copiar URL al clipboard
        navigator.clipboard.writeText(shareData.url)
            .then(() => {
                showNotification('Enlace copiado al portapapeles', 'success');
                trackEvent('Products', 'Copy Link', productId);
            })
            .catch(() => {
                showNotification('No se pudo copiar el enlace', 'error');
            });
    }
}

window.shareProduct = shareProduct;