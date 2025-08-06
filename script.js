/* =================================================================== */
/* ============ SCRIPT.JS - VERSIÓN FINAL (TALLAS POR COLOR) ========= */
/* =================================================================== */

// --- CONFIGURACIÓN GLOBAL ---
const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbxqWm2JPUK0IPmeiHULFTxsqW9EZOS4-A_pLz7It7a_3iPBziYlGdnZ_2BbDDyZikxlmg/exec';
let siteProducts = {};
let cart = JSON.parse(localStorage.getItem('sportivaCart')) || [];

// ===================================================================
// === LÓGICA DE LA BASE DE DATOS (CONEXIÓN A GOOGLE SHEETS) ========
// ===================================================================

async function fetchProductsFromSheets() {
    const cachedProducts = sessionStorage.getItem('siteProductsCache');
    if (cachedProducts) {
        console.log("Productos cargados desde el caché de la sesión.");
        return JSON.parse(cachedProducts);
    }
    try {
        console.log("Obteniendo productos desde la API de Google Sheets...");
        const response = await fetch(SHEETS_API_URL);
        if (!response.ok) throw new Error(`Error en la red: ${response.statusText}`);
        const data = await response.json();
        if (data.error) throw new Error(`Error en la API: ${data.message}`);
        sessionStorage.setItem('siteProductsCache', JSON.stringify(data));
        console.log("Productos obtenidos y guardados en caché.");
        return data;
    } catch (error) {
        console.error("FALLO CRÍTICO al obtener los productos:", error);
        return {};
    }
}

// ===================================================================
// === FUNCIONES DEL CARRITO DE COMPRAS ===============================
// ===================================================================

const formatCurrency = (price) => {
    if (typeof price !== 'number') price = 0;
    return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

function saveAndRenderCart() {
    localStorage.setItem('sportivaCart', JSON.stringify(cart));

    // --- LÓGICA CENTRALIZADA DE DESCUENTO ---
    const tieDyeId = 'short-tie-dye';
    const tieDyeProduct = siteProducts[tieDyeId];
    let applyTieDyeDiscount = false;

    if (tieDyeProduct && tieDyeProduct.mayoristaPrice) {
        const tieDyeItemsInCart = cart.filter(item => item.id.startsWith(tieDyeId));
        const tieDyeQuantity = tieDyeItemsInCart.reduce((sum, item) => sum + item.quantity, 0);
        if (tieDyeQuantity >= 2) {
            applyTieDyeDiscount = true;
        }
    }
    // --- FIN DE LA LÓGICA ---

    renderCartItems(applyTieDyeDiscount);
    updateCartCounter();
    updateCartTotal(applyTieDyeDiscount);
}

function renderCartItems(applyTieDyeDiscount) {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = cart.length === 0 ? '<p style="padding: 1rem; text-align: center;">Tu carrito está vacío.</p>' : '';
    
    const tieDyeId = 'short-tie-dye';
    const tieDyeProduct = siteProducts[tieDyeId];

    cart.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.dataset.id = item.id;
        const sizeInfo = item.size ? `<p class="size-info">Talla: ${item.size}</p>` : '';

        // Determinar el precio a mostrar para este item
        let displayPrice = item.price;
        if (applyTieDyeDiscount && item.id.startsWith(tieDyeId)) {
            displayPrice = tieDyeProduct.mayoristaPrice;
        }

        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='https://placehold.co/80x80/f0f0f0/333?text=Img';">
            <div class="cart-item-info">
                <h4>${item.name.replace(` (Talla: ${item.size})`, '')}</h4>
                ${sizeInfo}
                <p class="price">${formatCurrency(displayPrice)}</p>
                <div class="cart-item-actions">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
            </div>
            <button class="remove-item-btn">&times;</button>`;
        container.appendChild(el);
    });
}

function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    if (!counter) return;
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = total;
    counter.style.display = total > 0 ? 'flex' : 'none';
}

function updateCartTotal(applyTieDyeDiscount) {
    const totalEl = document.getElementById('cart-total-price');
    if (!totalEl) return;

    const tieDyeId = 'short-tie-dye';
    const tieDyeProduct = siteProducts[tieDyeId];

    const total = cart.reduce((sum, item) => {
        let itemPrice = item.price;
        if (applyTieDyeDiscount && item.id.startsWith(tieDyeId)) {
            itemPrice = tieDyeProduct.mayoristaPrice;
        }
        return sum + (itemPrice * item.quantity);
    }, 0);

    totalEl.textContent = formatCurrency(total);
}


function addToCart(id, name, price, image, quantity = 1, size = null) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, image, quantity, size });
    }
    saveAndRenderCart();
}

function updateQuantity(id, change, isRemoval = false) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        if (isRemoval || (cart[index].quantity + change <= 0)) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity += change;
        }
    }
    saveAndRenderCart();
}

// ===================================================================
// === RENDERIZADO DINÁMICO DE PRODUCTOS ============================
// ===================================================================

function renderProductGrids() {
    const grids = {
        shorts: document.getElementById('shorts-grid'), yoga: document.getElementById('yoga-grid'),
        tops: document.getElementById('tops-grid'), leggins: document.getElementById('leggins-grid'),
        enterizos: document.getElementById('enterizos-grid'), womenOthers: document.getElementById('women-others-grid'),
        men: document.getElementById('men-grid'), discounts: document.getElementById('discounts-grid')
    };
    if (!grids.shorts) return;
    Object.values(grids).forEach(grid => { if (grid) grid.innerHTML = ''; });

    for (const productId in siteProducts) {
        const product = siteProducts[productId];
        const image = product.colors && product.colors.length > 0 ? product.colors[0].image : 'placeholder.jpg';
        let priceHTML = (product.wholesalePrice && product.wholesalePrice < product.unitPrice)
            ? `<span class="old-price">Antes: ${formatCurrency(product.unitPrice)}</span><span class="new-price">Ahora: ${formatCurrency(product.wholesalePrice)}</span>`
            : formatCurrency(product.unitPrice);
        
        const cardHTML = `
            <div class="luxury-product-card animate-on-scroll">
                <div class="luxury-image-wrapper"><img src="${image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x550/f0f0f0/333?text=${encodeURIComponent(product.name)}';"></div>
                <div class="luxury-product-info">
                    <div class="luxury-product-details"><h3>${product.name}</h3><p class="luxury-product-price">${priceHTML}</p></div>
                    <a href="productos.html?product=${product.id}" class="luxury-product-btn">Ver Detalles</a>
                </div>
            </div>`;
        
        const pId = product.id.toLowerCase();
        if (product.category === 'women') {
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
    observeAnimatedElements();
}

function renderProductDetail() {
    const container = document.getElementById('product-detail-main');
    if (!container) return;

    const productId = new URLSearchParams(window.location.search).get('product');
    const product = siteProducts[productId];

    if (!product) {
        container.innerHTML = `<div class="product-not-found"><h2>Lo sentimos, producto no encontrado.</h2><a href="index.html" class="btn">Volver a la tienda</a></div>`;
        return;
    }

    document.title = `${product.name} - Sportiva Store`;

    const initialVariant = product.colors[0] || {};
    
    const generatePriceHTML = (variant) => {
        let price = variant.price || product.unitPrice;
        let discountPrice = variant.discountPrice || product.wholesalePrice;
        if (discountPrice && discountPrice < price) {
            const discount = Math.round((1 - (discountPrice / price)) * 100);
            return `<span class="old-price">${formatCurrency(price)}</span><span class="current-price">${formatCurrency(discountPrice)}</span><span class="save-badge">AHORRA ${discount}%</span>`;
        }
        return `<span class="current-price single-price">${formatCurrency(price)}</span>`;
    };

    container.innerHTML = `
        <div class="product-detail-image-wrapper"><img src="${initialVariant.image || 'placeholder.jpg'}" alt="${product.name}" id="product-detail-image"></div>
        <div class="product-detail-info">
            <h1 class="product-detail-title">${product.name}</h1>
            <div class="product-pricing-new" id="product-price-display">${generatePriceHTML(initialVariant)}</div>
            <div class="product-colors-new">
                <p class="product-options-label">COLOR: <span id="selected-color-name">${initialVariant.name || ''}</span></p>
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
    
    const paletteContainer = document.getElementById('color-palette-container');
    const productImage = document.getElementById('product-detail-image');
    const selectedColorName = document.getElementById('selected-color-name');
    const priceDisplay = document.getElementById('product-price-display');
    const sizeContainer = document.getElementById('size-selector-container');
    let selectedVariant = initialVariant;

    const renderSizeSelector = (variant) => {
        if (!variant.hasSizes || !variant.sizes) {
            sizeContainer.innerHTML = '';
            return;
        }
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL'];
        let sizeHTML = `
            <div class="product-sizes-new">
                <p class="product-options-label">TALLA:</p>
                <p style="font-size: 0.8rem; color: #8a8a8a; margin-bottom: 1rem;">(Tallas XS, L y XL bajo encargo)</p>
                <div class="size-selector-new">`;
        sizeOrder.forEach(size => {
            if (variant.sizes[size]) {
                const stock = variant.sizes[size].stock;
                const isSpecialOrder = stock === -1;
                const isDisabled = stock === 0 && !isSpecialOrder;
                sizeHTML += `
                    <div class="size-option-new">
                        <input type="radio" id="size-${size}" name="product-size" value="${size}" ${isDisabled ? 'disabled' : ''}>
                        <label for="size-${size}">${size}${isSpecialOrder ? '' : ''}</label>
                    </div>`;
            }
        });
        sizeHTML += `</div></div>`;
        sizeContainer.innerHTML = sizeHTML;
    };

    product.colors.forEach((variant, index) => {
        const swatch = document.createElement('span');
        swatch.className = 'color-swatch-new';
        swatch.style.backgroundColor = variant.hex || '#ccc';
        if (index === 0) swatch.classList.add('active');
        
        swatch.addEventListener('click', () => {
            selectedVariant = variant;
            selectedColorName.textContent = variant.name;
            priceDisplay.innerHTML = generatePriceHTML(variant);
            renderSizeSelector(variant);
            
            productImage.src = variant.image;
            document.querySelector('.color-swatch-new.active')?.classList.remove('active');
            swatch.classList.add('active');
        });
        paletteContainer.appendChild(swatch);
    });

    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        let selectedSize = null;
        if (selectedVariant.hasSizes) {
            const checkedSizeInput = sizeContainer.querySelector('input[name="product-size"]:checked');
            if (!checkedSizeInput) return alert('Por favor, selecciona una talla.');
            selectedSize = checkedSizeInput.value;
        }
        const quantity = parseInt(document.getElementById('quantity-input').value);
        const finalPrice = selectedVariant.discountPrice || selectedVariant.price;
        const cartId = `${product.id}-${selectedVariant.name.replace(/\s+/g, '-')}` + (selectedSize ? `-${selectedSize}` : '');
        const cartName = `${product.name} - ${selectedVariant.name}`;
        addToCart(cartId, cartName, finalPrice, selectedVariant.image, quantity, selectedSize);
        document.getElementById('cart-panel').classList.add('active');
    });

    renderSizeSelector(initialVariant);
    setupPageInteractions();
}

function setupPageInteractions() {
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            item.classList.toggle('active');
            const content = button.nextElementSibling;
            content.style.maxHeight = item.classList.contains('active') ? `${content.scrollHeight}px` : null;
        });
    });
    const quantitySelector = document.querySelector('.quantity-selector');
    if (quantitySelector) {
        const input = quantitySelector.querySelector('input');
        quantitySelector.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            let val = parseInt(input.value);
            if (action === 'increase' && val < 10) input.value = val + 1;
            else if (action === 'decrease' && val > 1) input.value = val - 1;
        });
    }
}

// ===================================================================
// === INICIALIZACIÓN Y EVENT LISTENERS GLOBALES =====================
// ===================================================================

function observeAnimatedElements() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => observer.observe(element));
}

async function initializeSite() {
    siteProducts = await fetchProductsFromSheets();
    renderProductGrids();
    renderProductDetail();
    saveAndRenderCart();
    setupGlobalEventListeners();
    observeAnimatedElements();
}

function setupGlobalEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const cartBtn = document.getElementById('cart-btn');
    const cartPanel = document.getElementById('cart-panel');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const navContainer = document.querySelector('.carousel-nav');
    if (slides.length > 0 && navContainer) {
        let currentSlide = 0;
        let slideInterval;
        const dots = [];

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            navContainer.appendChild(dot);
            dots.push(dot);
        });
        
        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            setCarouselInterval();
        };
        
        const nextSlide = () => goToSlide(currentSlide + 1);

        const setCarouselInterval = () => {
            clearInterval(slideInterval);
            const duration = slides[currentSlide].id === 'video-slide' ? 20000 : 4500;
            slideInterval = setInterval(nextSlide, duration);
        };
        setCarouselInterval();
    }

    if(searchBtn && searchOverlay && closeSearchBtn && searchInput) {
        searchBtn.addEventListener('click', () => searchOverlay.classList.add('active'));
        closeSearchBtn.addEventListener('click', () => searchOverlay.classList.remove('active'));
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.luxury-product-card').forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = productName.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    }

    if (cartBtn && cartPanel && closeCartBtn) {
        cartBtn.addEventListener('click', () => cartPanel.classList.add('active'));
        closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('active'));
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (!cartItem) return;
            const id = cartItem.dataset.id;
            if (e.target.classList.contains('quantity-btn')) updateQuantity(id, e.target.dataset.action === 'increase' ? 1 : -1);
            if (e.target.classList.contains('remove-item-btn')) updateQuantity(id, 0, true);
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return alert('Tu carrito está vacío.');
            createPaymentModal();
        });
    }

    const cursor = document.getElementById('custom-cursor');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (cursor && !isTouchDevice) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        document.querySelectorAll('a, button, input, .featured-card, .color-swatch-new, label, .accordion-header').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
        });
        document.body.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
        document.body.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
    } else if (cursor) {
        cursor.style.display = 'none';
    }
}

function createPaymentModal() {
    document.querySelector('.payment-modal-overlay')?.remove();
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
                        <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                        <h4>¡Pedido Copiado!</h4>
                        <p>Estás a un solo paso. Haz clic abajo para enviarnos tu pedido por WhatsApp.</p>
                        <div class="modal-actions"><a href="https://wa.me/573223175541" id="open-whatsapp-btn" class="modal-btn whatsapp" target="_blank">Enviar Pedido por WhatsApp</a></div>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modalOverlay);
    setTimeout(() => modalOverlay.classList.add('active'), 10);
    
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
        navigator.clipboard.writeText(modalOverlay.querySelector('#whatsapp-message-textarea').value).then(() => goToView(3));
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

document.addEventListener('DOMContentLoaded', initializeSite);
