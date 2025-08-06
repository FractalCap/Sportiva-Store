document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginError = document.getElementById('login-error');
    const productGrid = document.getElementById('product-grid');
    const addProductBtn = document.getElementById('add-product-btn');
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const productForm = document.getElementById('product-form');
    const modalTitle = document.getElementById('modal-title');
    const colorsContainer = document.getElementById('colors-container');
    const addColorBtn = document.getElementById('add-color-btn');
    // Nuevos elementos para tallas y stock
    const hasSizesCheckbox = document.getElementById('has-sizes-checkbox');
    const stockManagementContainer = document.getElementById('stock-management-container');

    // --- ESTADO DE LA APLICACIÓN ---
    let currentProducts = {};
    const ADMIN_EMAIL = 'admin@tienda.com';
    const ADMIN_PASSWORD = 'password123';
    const DB_KEY = 'sportivaProductsDB';

    // --- MANEJO DE DATOS ---
    const loadProducts = () => {
        const storedProducts = localStorage.getItem(DB_KEY);
        if (storedProducts) {
            currentProducts = JSON.parse(storedProducts);
        } else {
            currentProducts = JSON.parse(JSON.stringify(productsDB)); // Fallback a la DB inicial
        }
    };

    const saveProducts = () => {
        localStorage.setItem(DB_KEY, JSON.stringify(currentProducts));
    };

    // --- RENDERIZADO ---
    const renderProductGrid = () => {
        productGrid.innerHTML = '';
        if (Object.keys(currentProducts).length === 0) {
            productGrid.innerHTML = '<p>No hay productos para mostrar. ¡Agrega el primero!</p>';
            return;
        }

        for (const productId in currentProducts) {
            const product = currentProducts[productId];
            const price = product.wholesalePrice || product.unitPrice || (product.models && product.models.length > 0 ? product.models[0].price : 0);
            const image = product.colors && product.colors.length > 0 ? product.colors[0].image : (product.models && product.models.length > 0 ? product.models[0].image : 'placeholder.jpg');
            
            // Calcular stock total si el producto tiene tallas
            let stockInfo = `Categoría: ${product.category || 'Sin categoría'}`;
            if (product.sizes) {
                const totalStock = Object.values(product.sizes).reduce((sum, size) => sum + (size.stock || 0), 0);
                stockInfo = `Stock Total: ${totalStock} unidades`;
            }

            const card = document.createElement('div');
            card.className = 'admin-product-card';
            card.innerHTML = `
                <div class="image-container">
                    <img src="${image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x300/f0f0f0/333?text=Imagen';">
                </div>
                <div class="info">
                    <h3>${product.name}</h3>
                    <p class="price">${price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}</p>
                    <p class="stock">${stockInfo}</p>
                    <div class="actions">
                        <button class="btn btn-secondary edit-btn" data-id="${productId}">Editar</button>
                        <button class="btn btn-danger delete-btn" data-id="${productId}">Eliminar</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        }

        document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.id)));
        document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', () => handleDelete(btn.dataset.id)));
    };

    // --- LÓGICA DEL MODAL ---
    const setupStockFields = (sizes = null) => {
        stockManagementContainer.innerHTML = '';
        const allSizes = ['S', 'M', 'L', 'XS'];
        allSizes.forEach(size => {
            const stockValue = sizes && sizes[size] ? sizes[size].stock : 0;
            const isSpecialOrder = size === 'L' || size === 'XS';
            const entry = document.createElement('div');
            entry.className = 'stock-entry';
            entry.innerHTML = `
                <label for="stock-${size}">
                    Stock Talla ${size}
                    ${isSpecialOrder ? '<span class="special-order-text">(se trae por encargo)</span>' : ''}
                </label>
                <input type="number" id="stock-${size}" data-size="${size}" value="${stockValue}" min="0" class="form-group">
            `;
            stockManagementContainer.appendChild(entry);
        });
    };
    
    hasSizesCheckbox.addEventListener('change', () => {
        stockManagementContainer.style.display = hasSizesCheckbox.checked ? 'grid' : 'none';
    });

    const openModal = (productId = null) => {
        productForm.reset();
        colorsContainer.innerHTML = '<label>Colores y Fotos</label>';
        stockManagementContainer.innerHTML = ''; // Limpiar campos de stock
        document.getElementById('product-id').value = productId || '';

        if (productId) {
            modalTitle.textContent = 'Editar Producto';
            const product = currentProducts[productId];
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-price').value = product.unitPrice;
            document.getElementById('product-wholesale-price').value = product.wholesalePrice || '';
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-category').value = product.category || 'women';

            // Configurar gestión de tallas
            if (product.sizes) {
                hasSizesCheckbox.checked = true;
                stockManagementContainer.style.display = 'grid';
                setupStockFields(product.sizes);
            } else {
                hasSizesCheckbox.checked = false;
                stockManagementContainer.style.display = 'none';
            }

            if(product.colors) {
                product.colors.forEach(color => addColorEntry(color.hex, color.name, color.image));
            }

        } else {
            modalTitle.textContent = 'Agregar Nuevo Producto';
            hasSizesCheckbox.checked = true; // Por defecto activado para nuevos productos
            stockManagementContainer.style.display = 'grid';
            setupStockFields(); // Configura campos de stock vacíos
            addColorEntry();
        }
        modal.classList.add('active');
    };

    const closeModal = () => modal.classList.remove('active');
    
    const addColorEntry = (hex = '#000000', name = '', imageUrl = '') => {
        const entry = document.createElement('div');
        entry.className = 'color-entry';
        entry.innerHTML = `
            <div class="form-group color-picker-wrapper">
                 <input type="color" class="color-hex" value="${hex}">
            </div>
            <div class="form-group">
                <input type="text" class="color-name" placeholder="Nombre del color" value="${name}" required>
            </div>
            <div class="form-group">
                <input type="url" class="color-image" placeholder="URL de la imagen" value="${imageUrl}" required>
            </div>
            <button type="button" class="btn-remove-color">&times;</button>
        `;
        colorsContainer.appendChild(entry);
        entry.querySelector('.btn-remove-color').addEventListener('click', () => entry.remove());
    };

    addColorBtn.addEventListener('click', () => addColorEntry());

    // --- FUNCIONES CRUD ---
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const productId = document.getElementById('product-id').value;
        const idToSave = productId || `prod-${Date.now()}`;

        const colors = [];
        document.querySelectorAll('.color-entry').forEach(entry => {
            const hex = entry.querySelector('.color-hex').value;
            const name = entry.querySelector('.color-name').value.trim();
            const image = entry.querySelector('.color-image').value.trim();
            if (name && image) {
                colors.push({ name, image, hex });
            }
        });

        if (colors.length === 0) {
            alert('Debes agregar al menos un color con su imagen.');
            return;
        }

        let productSizes = null;
        if (hasSizesCheckbox.checked) {
            productSizes = {};
            document.querySelectorAll('#stock-management-container .stock-entry input').forEach(input => {
                const size = input.dataset.size;
                const stock = parseInt(input.value, 10) || 0;
                productSizes[size] = { stock };
            });
        }

        const updatedProduct = {
            id: idToSave,
            name: document.getElementById('product-name').value,
            unitPrice: parseFloat(document.getElementById('product-price').value),
            wholesalePrice: parseFloat(document.getElementById('product-wholesale-price').value) || null,
            description: document.getElementById('product-description').value,
            category: document.getElementById('product-category').value,
            colors: colors,
            sizes: productSizes, // Guardar el objeto de tallas (o null)
            sustainability: "Confeccionado con prácticas sostenibles.",
            productCare: "Lavar a máquina con agua fría."
        };

        currentProducts[idToSave] = updatedProduct;
        saveProducts();
        renderProductGrid();
        closeModal();
    };

    const handleDelete = (productId) => {
        if (confirm(`¿Estás seguro de que quieres eliminar "${currentProducts[productId].name}"?`)) {
            delete currentProducts[productId];
            saveProducts();
            renderProductGrid();
        }
    };

    // --- AUTENTICACIÓN ---
    const showDashboard = () => {
        loginView.classList.remove('active');
        dashboardView.classList.add('active');
        loadProducts();
        renderProductGrid();
    };

    const showLogin = () => {
        dashboardView.classList.remove('active');
        loginView.classList.add('active');
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (document.getElementById('email').value === ADMIN_EMAIL && document.getElementById('password').value === ADMIN_PASSWORD) {
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            showDashboard();
        } else {
            loginError.textContent = 'Credenciales incorrectas.';
            setTimeout(() => loginError.textContent = '', 3000);
        }
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        showLogin();
    });

    // --- EVENT LISTENERS GENERALES ---
    addProductBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    productForm.addEventListener('submit', handleFormSubmit);

    // --- INICIALIZACIÓN ---
    const init = () => {
        if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
            showDashboard();
        } else {
            showLogin();
        }
    };

    init();
});
