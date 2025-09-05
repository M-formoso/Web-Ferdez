// FERDEZ - Productos JavaScript - DATOS REALES

// Variables globales
let currentFilter = 'all';
let allProducts = [];
let isFilterAnimating = false;

// Datos detallados de productos REALES basados en la ficha técnica
const productData = {
    'burlanda-humeda-wdgs': {
        name: 'Burlanda Húmeda de Maíz (WDGS)',
        category: 'húmedo',
        image: '../assets/imagenes/productos/Burlanda Humeda/Copia de DSC08081.jpg',
        description: 'Subproducto húmedo de la destilería de maíz con alto contenido proteico y energético. Ideal para ganado bovino en sistemas intensivos. Su alta palatabilidad y digestibilidad la convierten en una excelente opción para aumentar la producción lechera y el engorde.',
        specs: {
            'Materia Seca (%)': '31 - 36',
            'Energía Metabolizable (Mcal/kgMS)': '3.4 - 3.7',
            'Proteína Bruta (% base seca)': '25 - 29',
            'FDN (%)': '25',
            'FDA (%)': '16',
            'Fibra Cruda (% base seca)': '9',
            'Materia Grasa (% base seca)': '7 - 9',
            'Cenizas (% base seca)': '8 - 10',
            'Digestibilidad (%)': '80 - 85'
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
    'pellet-cascara-soja': {
        name: 'Pellet de Cáscara de Soja',
        category: 'seco',
        image: '../assets/imagenes/productos/Pellet de soja al 42_/Copia de DSC08031.jpg',
        description: 'Subproducto obtenido del descascarado de la soja. Proporciona fibra altamente digestible, esencial para mantener la función ruminal y mejorar la digestión. Ideal para vacas lecheras de alta producción.',
        specs: {
            'Materia Seca (%)': '89 - 91',
            'Energía Metabolizable (Mcal/kgMS)': '2.5 - 2.8',
            'Proteína Bruta (% base seca)': '10 - 12',
            'Fibra Cruda (% base seca)': '32 - 36',
            'Materia Grasa (% base seca)': '2.3 - 2.5',
            'Desmenuzado (% tal cual)': '12 - 18',
            'Digestibilidad (%)': '76 - 80'
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
    'pellet-alfalfa': {
        name: 'Pellet de Alfalfa',
        category: 'seco',
        image: '../assets/imagenes/productos/Pellet de alfalfa/Copia de DSC08038.jpg',
        description: 'Alfalfa procesada mediante deshidratación que conserva su valor nutricional. Rica en vitaminas, minerales y proteína de excelente calidad para bovinos lecheros.',
        specs: {
            'Materia Seca (%)': '90 - 92',
            'Energía Metabolizable (Mcal/kgMS)': '1.2 - 1.3',
            'Proteína Bruta (% base seca)': '19 - 21',
            'Fibra Cruda (% base seca)': '30 - 35',
            'FDN (% base seca)': '34 - 35',
            'aFDA (% base seca)': '43 - 44',
            'Materia Grasa (% base seca)': '1.4 - 1.6',
            'Desmenuzado (% tal cual)': '8 - 12',
            'Digestibilidad (%)': '58 - 62'
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
    },
    'expeller-soja': {
        name: 'Expeller de Soja',
        category: 'seco',
        image: '../assets/imagenes/productos/Expeller de Soja/Copia de DSC08046.jpg',
        description: 'Concentrado proteico de alta calidad obtenido por extrusión. Excelente perfil de aminoácidos esenciales y alta digestibilidad para máximo rendimiento productivo.',
        specs: {
            'Materia Seca (%)': '90 - 92',
            'Energía Metabolizable (Mcal/kgMS)': '2.8 - 3.2',
            'Proteína Bruta (% base seca)': '43.5 - 44.5',
            'Proteína Soluble / Proteína Bruta': '75%',
            'Materia Grasa (% base seca)': '6 - 7',
            'Actividad Ureásica UpH': '0.02'
        },
        benefits: [
            'Alta concentración proteica',
            'Excelente perfil de aminoácidos',
            'Proceso de extrusión controlado',
            'Mejora conversión alimenticia',
            'Buena palatabilidad',
            'Proteína de alta disponibilidad'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-2.5 kg/cab/día | Feedlot: 1.5-3 kg/cab/día'
    },
    'harina-soja-hi-pro': {
        name: 'Harina de Soja Hi Pro',
        category: 'seco',
        image: '../assets/imagenes/productos/Harina de soja Hipro/Copia de DSC08008.jpg',
        description: 'Máxima concentración proteica con alta solubilidad. Ideal para dietas de alta performance en producción intensiva donde se requiere máxima eficiencia proteica.',
        specs: {
            'Materia Seca (%)': '90',
            'Energía Metabolizable (Mcal/kgMS)': '2.6 - 2.7',
            'Proteína Bruta (% base seca)': '46 - 46.5',
            'Solubilidad de Proteínas': '78% MIN',
            'Cenizas Totales': '5.5 - 6.2',
            'Materia Grasa (% base seca)': '2',
            'Actividad Ureásica UpH': '0.02 - 0.2',
            'Fibra Cruda (% base seca)': '3.5 - 4'
        },
        benefits: [
            'Máxima concentración proteica',
            'Alta solubilidad de proteínas',
            'Mínimo contenido de fibra',
            'Excelente digestibilidad',
            'Ideal para alta producción',
            'Estándar de calidad superior'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-2 kg/cab/día | Feedlot: 1-2.5 kg/cab/día'
    },
    'pellet-girasol-integral': {
        name: 'Pellet de Girasol Integral',
        category: 'seco',
        image: '../assets/imagenes/productos/Pellet girasol integral/Copia de DSC07941.jpg',
        description: 'Subproducto del girasol con balance ideal entre proteína y fibra. Aporta energía y mejora la palatabilidad de las raciones con su característico color y sabor.',
        specs: {
            'Materia Seca (%)': '89 - 91',
            'Energía Metabolizable (Mcal/kgMS)': '2.2 - 2.5',
            'Proteína Bruta (% base seca)': '25 - 27',
            'Fibra Cruda (% base seca)': '28 - 32',
            'Materia Grasa (% base seca)': '2 - 2.5',
            'Desmenuzado (% tal cual)': '10 - 15',
            'Color / Tono': 'Negro Opaco',
            'Digestibilidad (%)': '67 - 70'
        },
        benefits: [
            'Balance proteína y fibra ideal',
            'Mejora palatabilidad de raciones',
            'Color característico atractivo',
            'Buena digestibilidad',
            'Facilita mezclado en TMR',
            'Versatilidad en formulaciones'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1.5-3 kg/cab/día | Feedlot: 2-4 kg/cab/día'
    },
    'harina-soja-low-pro': {
        name: 'Harina de Soja Low Pro',
        category: 'seco',
        image: '../assets/imagenes/productos/Harina de soja Lowpro/Copia de DSC08011.jpg',
        description: 'Concentrado proteico con contenido proteico ajustado, ideal para balancear dietas según requerimientos específicos sin exceso de proteína.',
        specs: {
            'Materia Seca (%)': '88 - 90',
            'Energía Metabolizable (Mcal/kgMS)': '2.3 - 2.5',
            'Proteína Bruta (% base seca)': '44',
            'Cenizas Totales': '5.5 - 6.5',
            'Materia Grasa (% base seca)': '1.05 - 2',
            'Actividad Ureásica UpH': '0.02 - 0.2',
            'Fibra Cruda (% base seca)': '5 - 6'
        },
        benefits: [
            'Contenido proteico balanceado',
            'Evita excesos de proteína',
            'Reduce costos de nitrógeno',
            'Versatilidad en formulaciones',
            'Buena relación calidad-precio',
            'Fácil incorporación en dietas'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-2 kg/cab/día | Feedlot: 1.5-2.5 kg/cab/día'
    },
    'viruta-pino': {
        name: 'Viruta de Pino',
        category: 'seco',
        image: '../assets/imagenes/productos/Viruta de pino/Copia de DSC07924.jpg',
        description: 'Material de cama natural con excelente capacidad de absorción y propiedades antisépticas naturales. Ideal para mantener la higiene y comodidad en instalaciones ganaderas.',
        specs: {
            'Capacidad de Absorción': 'Excelente',
            'Humedad (%)': '< 15',
            'Granulometría': 'Uniforme',
            'Propiedades': 'Antisépticas naturales',
            'Origen': '100% Pino natural',
            'Compactación': 'Mínima'
        },
        benefits: [
            'Excelente absorción de humedad',
            'Propiedades antisépticas naturales',
            'Reduce olores desagradables',
            'Comodidad para los animales',
            'Fácil manejo y limpieza',
            'Producto natural y ecológico'
        ],
        uses: ['Tambos', 'Cama Animal'],
        dosage: 'Según necesidad: 2-5 cm de espesor en corrales'
    },
    'pellet-cartamo': {
        name: 'Pellet de Cártamo',
        category: 'seco',
        image: '../assets/imagenes/productos/Pellet de cartamo/Copia de DSC08021.jpg',
        description: 'Subproducto del cártamo rico en proteína y fibra digestible, con excelente palatabilidad para bovinos. Aporta variedad nutricional a las dietas.',
        specs: {
            'Materia Seca (%)': '88 - 92',
            'Proteína Bruta (% base seca)': '20 - 24',
            'Fibra Cruda (% base seca)': '25 - 30',
            'Materia Grasa (% base seca)': '3 - 5',
            'Cenizas (% base seca)': '6 - 8',
            'Digestibilidad (%)': '70 - 75'
        },
        benefits: [
            'Buena fuente de proteína',
            'Fibra digestible de calidad',
            'Excelente palatabilidad',
            'Diversifica ingredientes de la dieta',
            'Estabilidad en almacenamiento',
            'Fácil incorporación en TMR'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-2 kg/cab/día | Feedlot: 1.5-3 kg/cab/día'
    },
    'harina-camelina': {
        name: 'Harina de Camelina',
        category: 'seco',
        image: '../assets/imagenes/productos/', // Imagen faltante en el HTML
        description: 'Concentrado proteico con perfil de aminoácidos balanceado y alta digestibilidad. Subproducto de semilla oleaginosa con características nutritivas distintivas.',
        specs: {
            'Materia Seca (%)': '90 - 93',
            'Proteína Bruta (% base seca)': '30 - 35',
            'Fibra Cruda (% base seca)': '12 - 15',
            'Materia Grasa (% base seca)': '8 - 12',
            'Cenizas (% base seca)': '6 - 8',
            'Digestibilidad (%)': '75 - 80'
        },
        benefits: [
            'Perfil de aminoácidos balanceado',
            'Alta digestibilidad proteica',
            'Contenido energético interesante',
            'Buena palatabilidad',
            'Ingrediente diferenciado',
            'Versatilidad en formulaciones'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 0.5-1.5 kg/cab/día | Feedlot: 1-2 kg/cab/día'
    },
    'burlanda-seca-ddgs': {
        name: 'Burlanda Seca de Maíz (DDGS)',
        category: 'seco',
        image: '../assets/imagenes/productos/Burlanda Seca de maiz/Copia de DSC07928.jpg',
        description: 'Granos secos de destilería con solubles, resultado del proceso de producción de etanol. Concentra proteínas, grasas y minerales del grano original con larga vida útil.',
        specs: {
            'Materia Seca (%)': '88 - 92',
            'Energía Metabolizable (Mcal/kgMS)': '3.4 - 3.7',
            'Proteína Bruta (% base seca)': '25 - 30',
            'FDN (%)': '25',
            'FDA (%)': '16',
            'Fibra Cruda (% base seca)': '9',
            'Materia Grasa (% base seca)': '8 - 15',
            'Cenizas (% base seca)': '10',
            'Digestibilidad (%)': '80 - 85'
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
    'pellet-afrechillo-trigo': {
        name: 'Pellet de Afrechillo de Trigo',
        category: 'seco',
        image: '../assets/imagenes/productos/Pellet de trigo/Copia de DSC07956.jpg',
        description: 'Subproducto del trigo rico en fibra digestible y proteína, ideal para mantener la función ruminal. Aporta estructura física a la dieta.',
        specs: {
            'Materia Seca (%)': '87 - 91',
            'Energía Metabolizable (Mcal/kgMS)': '2.5 - 2.7',
            'Proteína Bruta (% base seca)': '13 - 15',
            'FDN (%)': '51',
            'FDA (%)': '18',
            'Fibra Cruda (% base seca)': '13',
            'Materia Grasa (% base seca)': '2.5 - 3.5',
            'Cenizas (% base seca)': '5',
            'Digestibilidad (%)': '67 - 70'
        },
        benefits: [
            'Rica en fibra digestible',
            'Mantiene función ruminal',
            'Aporta estructura a la dieta',
            'Buena palatabilidad',
            'Facilita manejo en TMR',
            'Relación calidad-precio favorable'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-2.5 kg/cab/día | Feedlot: 1.5-3 kg/cab/día'
    },
    'pellet-soja': {
        name: 'Pellet de Soja',
        category: 'seco',
        image: '../assets/imagenes/productos/Pellet de soja al 42_/Copia de DSC08031.jpg',
        description: 'Concentrado proteico peletizado de alta calidad con excelente palatabilidad y digestibilidad. Forma física mejorada para facilitar manejo y mezclado.',
        specs: {
            'Materia Seca (%)': '88 - 90',
            'Energía Metabolizable (Mcal/kgMS)': '2.4 - 2.5',
            'Proteína Bruta (% base seca)': '42 - 43',
            'Cenizas Totales': '6 - 8%',
            'Materia Grasa (% base seca)': '0.8 - 1.5',
            'Fibra Cruda (% base seca)': '3 - 5',
            'Desmenuzado (%)': '8 - 10'
        },
        benefits: [
            'Forma física mejorada',
            'Facilita manejo y dosificación',
            'Reduce segregación en mezclas',
            'Excelente palatabilidad',
            'Mínimo desperdicio',
            'Uniformidad en la distribución'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-2 kg/cab/día | Feedlot: 1.5-2.5 kg/cab/día'
    },
    'hominy-feed': {
        name: 'Hominy Feed',
        category: 'seco',
        image: '../assets/imagenes/productos/Himiny feed/Copia de DSC07949.jpg',
        description: 'Subproducto del maíz rico en energía y almidón, ideal para sistemas de engorde intensivo. Excelente fuente energética para ganancia de peso.',
        specs: {
            'Materia Seca (%)': '80 - 85',
            'Energía Metabolizable (Mcal/kgMS)': '3.6',
            'Proteína Bruta (% base seca)': '11 - 13',
            'Cenizas Totales (%)': '3 - 4',
            'Materia Grasa (% base seca)': '8 - 9',
            'Fibra Cruda (% base seca)': '3 - 4',
            'Almidón (%)': '42 - 45'
        },
        benefits: [
            'Alto contenido energético',
            'Rico en almidón disponible',
            'Excelente para engorde',
            'Mejora conversión alimenticia',
            'Palatabilidad destacada',
            'Versatilidad en formulaciones'
        ],
        uses: ['Tambos', 'Feedlots'],
        dosage: 'Tambo: 1-2 kg/cab/día | Feedlot: 2-4 kg/cab/día'
    }
};

// Resto del código JavaScript se mantiene igual...
// [Aquí iría todo el código de funcionalidad que ya tienes]

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeFilters();
    initializeSearch();
    setupProductCards();
});

// === RESTO DE FUNCIONES EXISTENTES ===
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

function setActiveFilter(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function filterProducts(filter) {
    isFilterAnimating = true;
    currentFilter = filter;
    
    // Crear un array con todos los productos y sus categorías
    const productsData = Array.from(allProducts).map(card => ({
        element: card,
        categories: card.getAttribute('data-category').split(' '),
        shouldShow: filter === 'all' || card.getAttribute('data-category').split(' ').includes(filter)
    }));
    
    // Separar productos visibles e invisibles
    const visibleProducts = productsData.filter(p => p.shouldShow);
    const hiddenProducts = productsData.filter(p => !p.shouldShow);
    
    // Fase 1: Animar salida de productos que se van a ocultar
    hiddenProducts.forEach(product => {
        product.element.classList.add('fade-out');
    });
    
    // Fase 2: Ocultar elementos y reorganizar después de la animación
    setTimeout(() => {
        // Remover completamente del DOM los elementos ocultos
        hiddenProducts.forEach(product => {
            product.element.style.display = 'none';
        });
        
        // Mostrar elementos visibles y reorganizar
        visibleProducts.forEach((product, index) => {
            product.element.style.display = 'block';
            product.element.classList.remove('fade-out', 'hidden');
            
            // Animación escalonada de entrada
            setTimeout(() => {
                product.element.classList.add('fade-in');
                setTimeout(() => {
                    product.element.classList.remove('fade-in');
                }, 300);
            }, index * 50);
        });
        
        // Finalizar animación
        setTimeout(() => {
            isFilterAnimating = false;
        }, 500);
        
    }, 200);

    // Analytics
    trackEvent('Products', 'Filter', filter);
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

// === FUNCIONES GLOBALES ===
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.filterProducts = filterProducts;
window.downloadTechnicalSheet = downloadTechnicalSheet;

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
    
    if (filterControls) {
        if (isMobile) {
            filterControls.classList.add('mobile-layout');
        } else {
            filterControls.classList.remove('mobile-layout');
        }
    }
}

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    console.error('Error en productos:', e.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// === PWA FEATURES ===
// Detectar si está offline
window.addEventListener('online', function() {
    showNotification('Conexión restaurada', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Sin conexión a internet', 'warning');
});

console.log('FERDEZ Productos - Todas las funcionalidades inicializadas con datos reales');

/* === AGREGAR AL FINAL DE scripts/productos.js === */

// Variables para el slider de filtros
let currentFilterIndex = 0;
const filterSlider = document.getElementById('filterSlider');
const filterButtons = document.querySelectorAll('.filter-btn');
const filterIndicators = document.querySelectorAll('.filter-indicator');

// Inicializar slider de filtros
function initializeFilterSlider() {
    // Solo en móvil/tablet
    if (window.innerWidth <= 768) {
        updateFilterSlider();
        updateIndicators();
    }
}

// Función para scroll de filtros
function scrollFilters(direction) {
    if (window.innerWidth > 768) return; // Solo en móvil
    
    const totalFilters = filterButtons.length;
    currentFilterIndex += direction;
    
    // Controlar límites
    if (currentFilterIndex < 0) {
        currentFilterIndex = totalFilters - 1;
    } else if (currentFilterIndex >= totalFilters) {
        currentFilterIndex = 0;
    }
    
    updateFilterSlider();
    updateIndicators();
}

// Actualizar posición del slider
function updateFilterSlider() {
    if (window.innerWidth > 768) return;
    
    const filterWidth = 180; // Ancho de cada filtro en móvil
    const gap = 16; // Gap entre filtros
    const scrollPosition = currentFilterIndex * (filterWidth + gap);
    
    filterSlider.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Actualizar indicadores
function updateIndicators() {
    if (window.innerWidth > 768) return;
    
    filterIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentFilterIndex);
    });
}

// Scroll a filtro específico por indicador
function scrollToFilter(index) {
    if (window.innerWidth > 768) return;
    
    currentFilterIndex = index;
    updateFilterSlider();
    updateIndicators();
    
    // Activar el filtro
    const targetFilter = filterButtons[index];
    if (targetFilter) {
        setActiveFilter(targetFilter);
    }
}

// Función mejorada para activar filtro
function setActiveFilter(clickedBtn) {
    // Remover active de todos
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Agregar active al clickeado
    clickedBtn.classList.add('active');
    
    // Actualizar índice actual en móvil
    if (window.innerWidth <= 768) {
        currentFilterIndex = Array.from(filterButtons).indexOf(clickedBtn);
        updateIndicators();
    }
    
    // Aplicar filtro
    const filter = clickedBtn.getAttribute('data-filter');
    filterProducts(filter);
}

// Detectar swipe en móvil
let startX = 0;
let startY = 0;

filterSlider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

filterSlider.addEventListener('touchend', (e) => {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Solo si el swipe es más horizontal que vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) { // Mínimo 50px de swipe
            if (diffX > 0) {
                // Swipe left - siguiente
                scrollFilters(1);
            } else {
                // Swipe right - anterior
                scrollFilters(-1);
            }
        }
    }
    
    startX = 0;
    startY = 0;
});

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
    initializeFilterSlider();
});

// Reinicializar al cambiar tamaño de ventana
window.addEventListener('resize', function() {
    // Reset al cambiar a desktop
    if (window.innerWidth > 768) {
        currentFilterIndex = 0;
        filterSlider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        initializeFilterSlider();
    }
});

// Auto-scroll indicators basado en scroll manual
filterSlider.addEventListener('scroll', function() {
    if (window.innerWidth > 768) return;
    
    const scrollLeft = this.scrollLeft;
    const filterWidth = 180;
    const gap = 16;
    const newIndex = Math.round(scrollLeft / (filterWidth + gap));
    
    if (newIndex !== currentFilterIndex && newIndex >= 0 && newIndex < filterButtons.length) {
        currentFilterIndex = newIndex;
        updateIndicators();
    }
});

// Exportar funciones globales
window.scrollFilters = scrollFilters;
window.scrollToFilter = scrollToFilter;
window.setActiveFilter = setActiveFilter;