/* START OF script.js FILE */

// --- Global Product Database ---
let siteProducts = {};
const DB_KEY = 'sportivaProductsDB';

// --- Global Cart State & Functions ---
let cart = JSON.parse(localStorage.getItem('sportivaCart')) || [];

// Function to format currency to Colombian Pesos (COP)
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

function saveAndRenderCart() {
    localStorage.setItem('sportivaCart', JSON.stringify(cart));
    renderCartItems();
    updateCartCounter();
    updateCartTotal();
}

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
        cartItemEl.dataset.id = item.id; // El ID único del item en el carrito
        
        // Muestra la talla si existe
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

function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (!cartCounter) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
    cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
}

function updateCartTotal() {
    const cartTotalPrice = document.getElementById('cart-total-price');
    if (!cartTotalPrice) return;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = formatCurrency(totalPrice);
}

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

function addToCart(id, name, price, image, quantity = 1, size = null) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price = price; // Actualiza el precio por si acaso
    } else {
        cart.push({ id, name, price, image, quantity, size });
    }
    saveAndRenderCart();
}

// --- Dynamic Product Rendering ---
function initializeProducts() {
    const storedProducts = localStorage.getItem(DB_KEY);
    if (storedProducts) {
        try {
            siteProducts = JSON.parse(storedProducts);
        } catch(e) {
            console.error("Error parsing products from localStorage, falling back to DB file.", e);
            siteProducts = productsDB;
        }
    } else {
        siteProducts = productsDB; // Fallback to original DB
    }
}

function renderProductGrids() {
    // Grids for specific women categories
    const shortsGrid = document.getElementById('shorts-grid');
    const yogaGrid = document.getElementById('yoga-grid');
    const topsGrid = document.getElementById('tops-grid');
    const legginsGrid = document.getElementById('leggins-grid');
    const enterizosGrid = document.getElementById('enterizos-grid');
    const womenOthersGrid = document.getElementById('women-others-grid');

    // Grids for main categories
    const menGrid = document.getElementById('men-grid');
    const discountsGrid = document.getElementById('discounts-grid');

    // Ensure all grid containers exist before proceeding
    if (!shortsGrid || !yogaGrid || !topsGrid || !legginsGrid || !enterizosGrid || !womenOthersGrid || !menGrid || !discountsGrid) {
        // This can happen if the user is not on index.html
        return;
    }
    
    // Clear grids before rendering
    shortsGrid.innerHTML = '';
    yogaGrid.innerHTML = '';
    topsGrid.innerHTML = '';
    legginsGrid.innerHTML = '';
    enterizosGrid.innerHTML = '';
    womenOthersGrid.innerHTML = '';
    menGrid.innerHTML = '';
    discountsGrid.innerHTML = '';


    for (const productId in siteProducts) {
        const product = siteProducts[productId];
        let price = product.unitPrice || (product.models && product.models.length > 0 ? product.models[0].price : 0);
        let image = product.colors && product.colors.length > 0 ? product.colors[0].image : (product.models && product.models.length > 0 ? product.models[0].image : 'placeholder.jpg');
        
        if (product.id === 'enterizos') {
            image = 'Enterizo Betsy 1.jpeg';
        }

        let priceHTML = formatCurrency(price);
        if (product.category === 'discount' && product.wholesalePrice && product.wholesalePrice < product.unitPrice) {
            priceHTML = `<span class="old-price">Antes: ${formatCurrency(product.unitPrice)}</span><span class="new-price">Ahora: ${formatCurrency(product.wholesalePrice)}</span>`;
        } else if (product.id === 'enterizos') {
            priceHTML = `Desde ${formatCurrency(price)}`;
        }
        
        const buttonText = (product.id === 'enterizos' || !product.sizes) ? 'Ver Detalles' : 'Ver Colores y Tallas';
        
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
                    <a href="productos.html?product=${product.id}" class="luxury-product-btn">${buttonText}</a>
                </div>
            </div>
        `;

        // Sort products into their respective grids
        if (product.category === 'women') {
            const pId = product.id.toLowerCase();
            if (pId.includes('short')) {
                shortsGrid.innerHTML += cardHTML;
            } else if (pId.includes('yoga')) {
                yogaGrid.innerHTML += cardHTML;
            } else if (pId.includes('top')) {
                topsGrid.innerHTML += cardHTML;
            } else if (pId.includes('leggings')) {
                legginsGrid.innerHTML += cardHTML;
            } else if (pId.includes('enterizo')) {
                enterizosGrid.innerHTML += cardHTML;
            } else {
                womenOthersGrid.innerHTML += cardHTML;
            }
        } else if (product.category === 'men') {
            menGrid.innerHTML += cardHTML;
        } else if (product.category === 'discount') {
            discountsGrid.innerHTML += cardHTML;
        }
    }
}


// --- Logic to run after DOM is loaded ---
document.addEventListener('DOMContentLoaded', () => {
    
    initializeProducts();
    renderProductGrids();
    saveAndRenderCart();

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
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => observer.observe(element));


    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const navContainer = document.querySelector('.carousel-nav');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && navContainer) {
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            navContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.carousel-dot');

        function setCarouselInterval() {
            clearInterval(slideInterval);
            const activeSlide = slides[currentSlide];
            const duration = activeSlide.id === 'video-slide' ? 20000 : 4500;
            slideInterval = setInterval(nextSlide, duration);
        }

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            setCarouselInterval();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
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

        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', (e) => {
                const target = e.target;
                const cartItem = target.closest('.cart-item');
                if (!cartItem) return;
                const id = cartItem.dataset.id;
                if (!id) return;

                if (target.classList.contains('quantity-btn')) {
                    const action = target.dataset.action;
                    updateQuantity(id, action === 'increase' ? 1 : -1);
                }

                if (target.classList.contains('remove-item-btn') || target.parentElement.classList.contains('remove-item-btn')) {
                    updateQuantity(id, 0, true);
                }
            });
        }
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Agrega productos para continuar.');
                return;
            }
            createPaymentModal();
        });
    }

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
                            <div class="payment-option"><input type="radio" id="pay-nequi" name="payment_method" value="Nequi"><label for="pay-nequi"><img src="https://seeklogo.com/images/N/nequi-logo-5437E35250-seeklogo.com.png" alt="[Imagen de logo de Nequi]" onerror="this.style.display='none'"><span>Nequi</span></label></div>
                            <div class="payment-option"><input type="radio" id="pay-daviplata" name="payment_method" value="Daviplata"><label for="pay-daviplata"><img src="https://www.logo.wine/a/logo/DaviPlata/DaviPlata-Logo.wine.svg" alt="[Imagen de logo de Daviplata]" onerror="this.style.display='none'"><span>Daviplata</span></label></div>
                            <div class="payment-option"><input type="radio" id="pay-credit" name="payment_method" value="Tarjeta de Crédito (Bold)"><label for="pay-credit"><img src="https://bold.co/assets/images/logo-bold-604d5a957a.svg" alt="[Imagen de logo de Bold]" onerror="this.style.display='none'"><span>Crédito</span></label></div>
                            <div class="payment-option"><input type="radio" id="pay-debit" name="payment_method" value="Tarjeta de Débito (Bold)"><label for="pay-debit"><img src="https://bold.co/assets/images/logo-bold-604d5a957a.svg" alt="[Imagen de logo de Bold]" onerror="this.style.display='none'"><span>Débito</span></label></div>
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
        setupModalLogic(modalOverlay);
    }

    function setupModalLogic(modalOverlay) {
        const views = modalOverlay.querySelectorAll('.modal-view');
        const progressLine = modalOverlay.querySelector('.progress-line-active');
        const progressSteps = modalOverlay.querySelectorAll('.progress-step');
        let selectedPaymentMethod = null;

        const goToView = (viewNumber) => {
            views.forEach(v => v.classList.remove('active'));
            modalOverlay.querySelector(`#view-${viewNumber}`).classList.add('active');
            progressSteps.forEach(step => {
                const stepNum = parseInt(step.dataset.step);
                step.classList.toggle('active', stepNum <= viewNumber);
            });
            progressLine.style.width = `${((viewNumber - 1) / (progressSteps.length - 1)) * 100}%`;
        };

        const continueBtn = modalOverlay.querySelector('#continue-to-step-2');
        modalOverlay.querySelectorAll('input[name="payment_method"]').forEach(radio => {
            radio.addEventListener('change', () => {
                selectedPaymentMethod = radio.value;
                continueBtn.disabled = false;
            });
        });

        continueBtn.addEventListener('click', () => {
            let message = '¡Hola Sportiva Store! 👋\n\nQuisiera hacer el siguiente pedido:\n\n';
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                // El nombre del item ya incluye la talla, así que se agrega directamente
                message += `- *${item.quantity}x* ${item.name} (${formatCurrency(item.price)} c/u)\n`;
            });
            message += `\n*Total del Pedido:* ${formatCurrency(total)}\n`;
            message += `*Método de Pago:* ${selectedPaymentMethod}\n\n`;
            message += '¡Quedo atento/a para coordinar!';
            modalOverlay.querySelector('#whatsapp-message-textarea').value = message;
            goToView(2);
        });

        modalOverlay.querySelector('#copy-order-btn').addEventListener('click', () => {
            const textarea = modalOverlay.querySelector('#whatsapp-message-textarea');
            navigator.clipboard.writeText(textarea.value).then(() => goToView(3))
            .catch(err => alert('Error al copiar. Por favor, copia el texto manualmente.'));
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

    const cursor = document.getElementById('custom-cursor');
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (cursor && !isTouchDevice()) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .featured-card, .color-swatch-new, .quantity-btn, .remove-item-btn, .payment-option label, input, .accordion-header, .size-option-new label');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
        });

        document.body.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
        document.body.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
        
    } else if (cursor) {
        cursor.classList.add('touch-cursor');
        document.addEventListener('touchstart', e => {
            const touch = e.touches[0];
            cursor.style.left = touch.clientX + 'px';
            cursor.style.top = touch.clientY + 'px';
            cursor.classList.add('active');
        }, { passive: true });
    }
});
