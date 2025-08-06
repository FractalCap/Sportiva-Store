/* =================================================================== */
/* ============ SCRIPT.JS - ADAPTADO PARA GOOGLE SHEETS ============ */
/* =================================================================== */

// --- CONFIGURACIÓN GLOBAL ---
// URL de la API de Google Apps Script que creamos.
const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbxqWm2JPUK0IPmeiHULFTxsqW9EZOS4-A_pLz7It7a_3iPBziYlGdnZ_2BbDDyZikxlmg/exec';

// Base de datos global de productos. Se llenará con los datos de Google Sheets.
let siteProducts = {};

// Estado global del carrito. Se sigue guardando en el navegador del usuario.
let cart = JSON.parse(localStorage.getItem('sportivaCart')) || [];


/* =================================================================== */
/* ============ LÓGICA DE LA BASE DE DATOS (NUEVO) ============ */
/* =================================================================== */

/**
 * Obtiene los datos de los productos desde la API de Google Sheets.
 * Utiliza sessionStorage para guardar los datos temporalmente y no tener
 * que pedirlos a la API en cada recarga de página, mejorando la velocidad.
 * @returns {Promise<Object>} El objeto con todos los productos.
 */
async function fetchProductsFromSheets() {
    // 1. Revisar si ya tenemos los productos en la sesión del navegador.
    const cachedProducts = sessionStorage.getItem('siteProductsCache');
    if (cachedProducts) {
        console.log("Productos cargados desde el caché de la sesión.");
        return JSON.parse(cachedProducts);
    }

    // 2. Si no están en caché, los pedimos a la API de Google Sheets.
    try {
        console.log("Obteniendo productos desde la API de Google Sheets...");
        const response = await fetch(SHEETS_API_URL);
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la red: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(`Error en la API de Google Sheets: ${data.message}`);
        }

        // 3. Guardamos los productos en el caché de la sesión para futuras cargas.
        sessionStorage.setItem('siteProductsCache', JSON.stringify(data));
        console.log("Productos obtenidos y guardados en caché.");
        return data;

    } catch (error) {
        console.error("FALLO CRÍTICO al obtener los productos:", error);
        // En caso de error, podríamos mostrar un mensaje al usuario.
        // Por ahora, devolvemos un objeto vacío para que la página no se rompa.
        return {};
    }
}


/* =================================================================== */
/* ============ FUNCIONES DEL CARRITO (SIN CAMBIOS) ============ */
/* =================================================================== */

// Formatea un número a moneda colombiana (COP).
const formatCurrency = (price) => {
    if (typeof price !== 'number') {
        price = 0;
    }
    return price.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
};

// Guarda el carrito en localStorage y actualiza la interfaz.
function saveAndRenderCart() {
    localStorage.setItem('sportivaCart', JSON.stringify(cart));
    renderCartItems();
    updateCartCounter();
    updateCartTotal();
}

// Dibuja los productos dentro del panel del carrito.
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="padding: 1rem; text-align: center;">Tu carrito está vacío.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.dataset.id = item.id;
        const sizeInfo = item.size ? `<p class="size-info">Talla: ${item.size}</p>` : '';

        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='https://placehold.co/80x80/f0f0f0/333?text=Img';">
            <div class="cart-item-info">
                <h4>${item.name.replace(` (Talla: ${item.size})`, '')}</h4>
                ${sizeInfo}
                <p class="price">${formatCurrency(item.price)}</p>
                <div class="cart-item-actions">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
            </div>
            <button class="remove-item-btn">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });
}

// Actualiza el contador de ítems en el ícono del carrito.
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (!cartCounter) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
    cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Actualiza el precio total en el pie del carrito.
function updateCartTotal() {
    const cartTotalPrice = document.getElementById('cart-total-price');
    if (!cartTotalPrice) return;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = formatCurrency(totalPrice);
}

// Añade un producto al carrito o actualiza su cantidad.
function addToCart(id, name, price, image, quantity = 1, size = null) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, image, quantity, size });
    }
    saveAndRenderCart();
}

// Cambia la cantidad de un ítem o lo elimina.
function updateQuantity(id, change, isRemoval = false) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        if (isRemoval) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
    }
    saveAndRenderCart();
}

/* =================================================================== */
/* ============ RENDERIZADO DINÁMICO DE PRODUCTOS ============ */
/* =================================================================== */

/**
 * Dibuja las tarjetas de producto en las diferentes secciones de la página principal.
 * AHORA USA los datos de `siteProducts` obtenidos de Google Sheets.
 */
function renderProductGrids() {
    const grids = {
        shorts: document.getElementById('shorts-grid'),
        yoga: document.getElementById('yoga-grid'),
        tops: document.getElementById('tops-grid'),
        leggins: document.getElementById('leggins-grid'),
        enterizos: document.getElementById('enterizos-grid'),
        womenOthers: document.getElementById('women-others-grid'),
        men: document.getElementById('men-grid'),
        discounts: document.getElementById('discounts-grid')
    };

    // Si no estamos en la página principal, no hacer nada.
    if (!grids.shorts) return;

    // Limpiar todas las grillas antes de llenarlas.
    Object.values(grids).forEach(grid => {
        if (grid) grid.innerHTML = '';
    });

    for (const productId in siteProducts) {
        const product = siteProducts[productId];
        
        // Determinar la imagen principal (la del primer color).
        const image = product.colors && product.colors.length > 0
            ? product.colors[0].image
            : 'placeholder.jpg';

        // Determinar el precio a mostrar.
        let priceHTML = '';
        // Si hay precio de descuento (wholesalePrice), mostrar "Antes" y "Ahora".
        if (product.wholesalePrice && product.wholesalePrice < product.unitPrice) {
            priceHTML = `<span class="old-price">Antes: ${formatCurrency(product.unitPrice)}</span><span class="new-price">Ahora: ${formatCurrency(product.wholesalePrice)}</span>`;
        } else {
            priceHTML = formatCurrency(product.unitPrice);
        }
        
        const cardHTML = `
            <div class="luxury-product-card animate-on-scroll">
                <div class="luxury-image-wrapper">
                    <img src="${image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x550/f0f0f0/333?text=${encodeURIComponent(product.name)}';">
                </div>
                <div class="luxury-product-info">
                    <div class="luxury-product-details">
                        <h3>${product.name}</h3>
                        <p class="luxury-product-price">${priceHTML}</p>
                    </div>
                    <a href="productos.html?product=${product.id}" class="luxury-product-btn">Ver Detalles</a>
                </div>
            </div>
        `;

        // Clasificar el producto en su grilla correspondiente.
        if (product.category === 'women') {
            const pId = product.id.toLowerCase();
            if (pId.includes('short')) grids.shorts.innerHTML += cardHTML;
            else if (pId.includes('yoga')) grids.yoga.innerHTML += cardHTML;
            else if (pId.includes('top')) grids.tops.innerHTML += cardHTML;
            else if (pId.includes('leggings')) grids.leggins.innerHTML += cardHTML;
            else if (pId.includes('enterizo')) grids.enterizos.innerHTML += cardHTML;
            else grids.womenOthers.innerHTML += cardHTML;
        } else if (product.category === 'men') {
            grids.men.innerHTML += cardHTML;
        } else if (product.category === 'discount') {
            grids.discounts.innerHTML += cardHTML;
        }
    }
}

/**
 * Dibuja la página de detalle de un producto específico.
 * AHORA USA los datos de `siteProducts` obtenidos de Google Sheets.
 */
function renderProductDetail() {
    const productDetailContainer = document.getElementById('product-detail-main');
    // Si no estamos en la página de producto, no hacer nada.
    if (!productDetailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    const product = siteProducts[productId];

    if (!product) {
        productDetailContainer.innerHTML = `<div class="product-not-found"><h2>Lo sentimos, producto no encontrado.</h2><a href="index.html" class="btn">Volver a la tienda</a></div>`;
        return;
    }

    document.title = `${product.name} - Sportiva Store`;

    // Lógica de precios para la página de detalle.
    let priceHTML = '';
    let finalPrice = product.unitPrice;
    if (product.wholesalePrice && product.wholesalePrice < product.unitPrice) {
        const discount = Math.round((1 - (product.wholesalePrice / product.unitPrice)) * 100);
        priceHTML = `<span class="old-price">${formatCurrency(product.unitPrice)}</span><span class="current-price">${formatCurrency(product.wholesalePrice)}</span><span class="save-badge">AHORRA ${discount}%</span>`;
        finalPrice = product.wholesalePrice;
    } else {
        priceHTML = `<span class="current-price single-price">${formatCurrency(product.unitPrice)}</span>`;
    }

    const initialImage = product.colors.length > 0 ? product.colors[0].image : 'placeholder.jpg';
    const initialColorName = product.colors.length > 0 ? product.colors[0].name : '';

    // Construir el HTML principal del detalle del producto.
    productDetailContainer.innerHTML = `
        <div class="product-detail-image-wrapper">
            <img src="${initialImage}" alt="${product.name}" id="product-detail-image" onerror="this.onerror=null;this.src='https://placehold.co/600x800/f0f0f0/333?text=${encodeURIComponent(product.name)}';">
        </div>
        <div class="product-detail-info">
            <h1 class="product-detail-title">${product.name}</h1>
            <div class="product-pricing-new">${priceHTML}</div>
            <div id="out-of-stock-container"></div>
            
            <div class="product-colors-new">
                <p class="product-options-label">COLOR: <span id="selected-color-name">${initialColorName}</span></p>
                <div class="color-palette-new" id="color-palette-container"></div>
            </div>

            <div id="size-selector-container"></div>

            <div class="product-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <input type="number" id="quantity-input" value="1" min="1" max="10" readonly>
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
                <button class="btn-add-to-cart-new" id="add-to-cart-btn">Agregar al Carrito</button>
            </div>
            <div class="product-description-section"><p><strong>Descripción:</strong> ${product.description}</p></div>
            <div class="product-accordion">
                <div class="accordion-item"><button class="accordion-header">Sostenibilidad<span class="accordion-icon">+</span></button><div class="accordion-content"><p>${product.sustainability || 'Info no disponible.'}</p></div></div>
                <div class="accordion-item"><button class="accordion-header">Cuidado del Producto<span class="accordion-icon">+</span></button><div class="accordion-content"><p>${product.productCare || 'Info no disponible.'}</p></div></div>
            </div>
        </div>`;
    
    // Lógica para el selector de colores.
    const paletteContainer = document.getElementById('color-palette-container');
    const productImage = document.getElementById('product-detail-image');
    const selectedColorName = document.getElementById('selected-color-name');
    let selectedColor = product.colors[0];

    product.colors.forEach((color, index) => {
        const swatch = document.createElement('span');
        swatch.className = 'color-swatch-new';
        swatch.style.backgroundColor = color.hex || '#ccc';
        if (index === 0) swatch.classList.add('active');
        
        swatch.addEventListener('click', () => {
            selectedColor = color;
            selectedColorName.textContent = color.name;
            
            productImage.classList.add('image-fade-out');
            setTimeout(() => {
                productImage.src = color.image;
                productImage.alt = `${product.name} - ${color.name}`;
                productImage.classList.remove('image-fade-out');
            }, 400);

            document.querySelector('.color-swatch-new.active').classList.remove('active');
            swatch.classList.add('active');
        });
        paletteContainer.appendChild(swatch);
    });

    // Lógica para el selector de tallas.
    if (product.hasSizes && product.sizes) {
        const sizeContainer = document.getElementById('size-selector-container');
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];
        // HTML a inyectar.
        let sizeSelectorHTML = `
            <div class="product-sizes-new">
                <p class="product-options-label">TALLA:</p>
                <p style="font-size: 0.8rem; color: #8a8a8a; margin-bottom: 1rem;">(Tallas XS, L y XL bajo encargo)</p>
                <div class="size-selector-new">`;
        
        sizeOrder.forEach(size => {
            if (product.sizes[size]) {
                const stock = product.sizes[size].stock;
                const isSpecialOrder = stock === -1;
                const isDisabled = stock === 0 && !isSpecialOrder;
                
                // Ya no mostramos el texto '(por encargo)' individualmente.
                sizeSelectorHTML += `
                    <div class="size-option-new">
                        <input type="radio" id="size-${size}" name="product-size" value="${size}" ${isDisabled ? 'disabled' : ''}>
                        <label for="size-${size}">
                            ${size}
                        </label>
                    </div>`;
            }
        });
        sizeSelectorHTML += `</div></div>`;
        sizeContainer.innerHTML = sizeSelectorHTML;
    }

    // Lógica del botón "Agregar al Carrito".
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        let selectedSize = null;
        if (product.hasSizes) {
            const checkedSizeInput = document.querySelector('input[name="product-size"]:checked');
            if (!checkedSizeInput) {
                alert('Por favor, selecciona una talla.');
                return;
            }
            selectedSize = checkedSizeInput.value;
        }

        const quantity = parseInt(document.getElementById('quantity-input').value);
        const cartId = `${product.id}-${selectedColor.name.replace(/\s+/g, '-')}` + (selectedSize ? `-${selectedSize}` : '');
        const cartName = `${product.name} - ${selectedColor.name}`;

        addToCart(cartId, cartName, finalPrice, selectedColor.image, quantity, selectedSize);
        document.getElementById('cart-panel').classList.add('active');
    });

    // Lógica de los botones de cantidad y acordeón.
    setupPageInteractions();
}

/**
 * Configura los event listeners que son comunes o se recrean dinámicamente.
 */
function setupPageInteractions() {
    // Acordeón en la página de producto.
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            item.classList.toggle('active');
            const content = button.nextElementSibling;
            content.style.maxHeight = item.classList.contains('active') ? content.scrollHeight + "px" : null;
        });
    });

    // Selector de cantidad en la página de producto.
    const quantitySelector = document.querySelector('.quantity-selector');
    if (quantitySelector) {
        const quantityInput = quantitySelector.querySelector('input');
        quantitySelector.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            let currentValue = parseInt(quantityInput.value);
            if (action === 'increase' && currentValue < 10) {
                quantityInput.value = currentValue + 1;
            } else if (action === 'decrease' && currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
}


/* =================================================================== */
/* ============ INICIALIZACIÓN Y EVENT LISTENERS GLOBALES ============ */
/* =================================================================== */

/**
 * Función principal que se ejecuta cuando el DOM está listo.
 * Orquesta la carga de datos y la inicialización de la página.
 */
async function initializeSite() {
    // 1. Obtener los productos de Google Sheets y guardarlos globalmente.
    siteProducts = await fetchProductsFromSheets();

    // 2. Renderizar las grillas de productos (si estamos en index.html).
    renderProductGrids();

    // 3. Renderizar el detalle del producto (si estamos en productos.html).
    renderProductDetail();

    // 4. Inicializar el carrito de compras.
    saveAndRenderCart();

    // 5. Configurar todos los event listeners estáticos de la página.
    setupGlobalEventListeners();
}

// Configura los listeners que solo necesitan ser añadidos una vez.
function setupGlobalEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search');
    const cartBtn = document.getElementById('cart-btn');
    const cartPanel = document.getElementById('cart-panel');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Menú hamburguesa para móviles.
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Carrusel de imágenes del Hero.
    const slides = document.querySelectorAll('.carousel-slide');
    const navContainer = document.querySelector('.carousel-nav');
    if (slides.length > 0 && navContainer) {
        let currentSlide = 0;
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            navContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.carousel-dot');
        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };
        setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    // Funcionalidad de búsqueda.
    if (searchBtn && searchOverlay && closeSearchBtn) {
        searchBtn.addEventListener('click', () => searchOverlay.classList.add('active'));
        closeSearchBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));
    }

    // Panel del carrito.
    if (cartBtn && cartPanel && closeCartBtn) {
        cartBtn.addEventListener('click', () => cartPanel.classList.add('active'));
        closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('active'));
    }

    // Acciones dentro del carrito (aumentar, disminuir, eliminar).
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const cartItem = target.closest('.cart-item');
            if (!cartItem) return;
            const id = cartItem.dataset.id;
            if (target.classList.contains('quantity-btn')) {
                updateQuantity(id, target.dataset.action === 'increase' ? 1 : -1);
            }
            if (target.classList.contains('remove-item-btn')) {
                updateQuantity(id, 0, true);
            }
        });
    }

    // Botón de finalizar compra.
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Agrega productos para continuar.');
                return;
            }
            createPaymentModal();
        });
    }

    // Cursor personalizado (si no es un dispositivo táctil).
    const cursor = document.getElementById('custom-cursor');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (cursor && !isTouchDevice) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button, input, .featured-card, .color-swatch-new, label').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
        });
    } else if (cursor) {
        cursor.style.display = 'none'; // Ocultar cursor personalizado en táctiles.
    }
}

// Modal de pago (sin cambios en su lógica interna).
function createPaymentModal() {
    const oldModal = document.querySelector('.payment-modal-overlay');
    if (oldModal) oldModal.remove();

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'payment-modal-overlay';
    
    modalOverlay.innerHTML = `
        <div class="payment-modal-content">
            <button class="close-btn">&times;</button>
            <div class="modal-progress-bar">
                <div class="progress-steps-container">
                    <div class="progress-step active" data-step="1">Pago</div>
                    <div class="progress-step" data-step="2">Confirmar</div>
                    <div class="progress-step" data-step="3">Enviar</div>
                </div>
                <div class="progress-line-container"><div class="progress-line-active"></div></div>
            </div>
            <div class="modal-views-container">
                <div class="modal-view active" id="view-1">
                    <h4>1. Elige tu método de pago</h4>
                    <div class="payment-options">
                        <div class="payment-option"><input type="radio" id="pay-nequi" name="payment_method" value="Nequi"><label for="pay-nequi"><img src="https://seeklogo.com/images/N/nequi-logo-5437E35250-seeklogo.com.png" alt="Nequi"><span>Nequi</span></label></div>
                        <div class="payment-option"><input type="radio" id="pay-daviplata" name="payment_method" value="Daviplata"><label for="pay-daviplata"><img src="https://www.logo.wine/a/logo/DaviPlata/DaviPlata-Logo.wine.svg" alt="Daviplata"><span>Daviplata</span></label></div>
                        <div class="payment-option"><input type="radio" id="pay-credit" name="payment_method" value="Tarjeta de Crédito (Bold)"><label for="pay-credit"><img src="https://bold.co/assets/images/logo-bold-604d5a957a.svg" alt="Bold"><span>Crédito</span></label></div>
                        <div class="payment-option"><input type="radio" id="pay-debit" name="payment_method" value="Tarjeta de Débito (Bold)"><label for="pay-debit"><img src="https://bold.co/assets/images/logo-bold-604d5a957a.svg" alt="Bold"><span>Débito</span></label></div>
                    </div>
                    <div class="modal-actions"><button id="continue-to-step-2" class="modal-btn primary" disabled>Continuar</button></div>
                </div>
                <div class="modal-view" id="view-2">
                    <h4>2. Copia el resumen de tu pedido</h4>
                    <textarea id="whatsapp-message-textarea" readonly></textarea>
                    <div class="modal-actions"><button id="copy-order-btn" class="modal-btn primary">Copiar y Continuar</button></div>
                </div>
                <div class="modal-view" id="view-3">
                    <div class="modal-final-step">
                        <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                        <h4>¡Pedido Copiado!</h4>
                        <p>Estás a un solo paso. Haz clic abajo para enviarnos tu pedido por WhatsApp.</p>
                        <div class="modal-actions"><a href="https://wa.me/573223175541" id="open-whatsapp-btn" class="modal-btn whatsapp" target="_blank">Enviar Pedido por WhatsApp</a></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);
    setTimeout(() => modalOverlay.classList.add('active'), 10);
    
    // Lógica interna del modal.
    const views = modalOverlay.querySelectorAll('.modal-view');
    const progressLine = modalOverlay.querySelector('.progress-line-active');
    const progressSteps = modalOverlay.querySelectorAll('.progress-step');
    const goToView = (viewNumber) => {
        views.forEach(v => v.classList.remove('active'));
        modalOverlay.querySelector(`#view-${viewNumber}`).classList.add('active');
        progressSteps.forEach(step => step.classList.toggle('active', parseInt(step.dataset.step) <= viewNumber));
        progressLine.style.width = `${((viewNumber - 1) / (progressSteps.length - 1)) * 100}%`;
    };
    const continueBtn = modalOverlay.querySelector('#continue-to-step-2');
    let selectedPaymentMethod = '';
    modalOverlay.querySelectorAll('input[name="payment_method"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedPaymentMethod = e.target.value;
            continueBtn.disabled = false;
        });
    });
    continueBtn.addEventListener('click', () => {
        let message = '¡Hola Sportiva Store! 👋\n\nQuisiera hacer el siguiente pedido:\n\n';
        cart.forEach(item => {
            message += `- *${item.quantity}x* ${item.name}` + (item.size ? ` (Talla: ${item.size})` : '') + `\n`;
        });
        message += `\n*Total del Pedido:* ${document.getElementById('cart-total-price').textContent}\n`;
        message += `*Método de Pago:* ${selectedPaymentMethod}\n\n¡Quedo atento/a para coordinar!`;
        modalOverlay.querySelector('#whatsapp-message-textarea').value = message;
        goToView(2);
    });
    modalOverlay.querySelector('#copy-order-btn').addEventListener('click', () => {
        const textarea = modalOverlay.querySelector('#whatsapp-message-textarea');
        navigator.clipboard.writeText(textarea.value).then(() => goToView(3));
    });
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        setTimeout(() => modalOverlay.remove(), 300);
    };
    modalOverlay.querySelector('#open-whatsapp-btn').addEventListener('click', () => {
        cart = [];
        saveAndRenderCart();
        closeModal();
    });
    modalOverlay.querySelector('.close-btn').addEventListener('click', closeModal);
}

// Punto de entrada: Ejecutar initializeSite() cuando la página esté lista.
document.addEventListener('DOMContentLoaded', initializeSite);
