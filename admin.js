/* START OF admin.js FILE */
document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const settingsView = document.getElementById('settings-view'); // Nuevo elemento: Vista de configuración
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginError = document.getElementById('login-error');
    const productGrid = document.getElementById('product-grid');
    const addProductBtn = document.getElementById('add-product-btn');
    const settingsBtn = document.getElementById('settings-btn'); // Nuevo botón: Para ir a la configuración
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn'); // Nuevo botón: Para volver al dashboard
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const productForm = document.getElementById('product-form');
    const modalTitle = document.getElementById('modal-title');
    const colorsContainer = document.getElementById('colors-container');
    const addColorBtn = document.getElementById('add-color-btn');
    const hasSizesCheckbox = document.getElementById('has-sizes-checkbox');
    const stockManagementContainer = document.getElementById('stock-management-container');
    const settingsForm = document.getElementById('settings-form'); // Nuevo formulario: Para la configuración del sitio
    const pageTitleInput = document.getElementById('page-title-input'); // Nuevo input: Título de la página
    const bgColorInput = document.getElementById('bg-color-input'); // Nuevo input: Color de fondo

    // --- ESTADO DE LA APLICACIÓN ---
    let currentProducts = {};
    // --- CREDENCIALES ACTUALIZADAS ---
    const ADMIN_EMAIL = 'sportivastore2006@gmail.com';
    const ADMIN_PASSWORD = '9bX#2';
    const DB_KEY = 'sportivaProductsDB';

    // --- MANEJO DE DATOS ---
    const loadProducts = () => {
        const dbData = localStorage.getItem(DB_KEY);
        currentProducts = dbData ? JSON.parse(dbData) : (typeof productsDB !== 'undefined' ? productsDB : {});
    };

    const saveProducts = () => {
        localStorage.setItem(DB_KEY, JSON.stringify(currentProducts));
    };

    // --- RENDERIZADO DEL PANEL ---
    const renderProductGrid = () => {
        productGrid.innerHTML = '';
        Object.values(currentProducts).forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const firstImage = product.colors && product.colors.length > 0 ? product.colors[0].image : (product.models && product.models.length > 0 ? product.models[0].image : 'placeholder.png');

            productCard.innerHTML = `
                <img src="${firstImage}" alt="${product.name}" onerror="this.src='https://placehold.co/300x300/f7f7f7/333?text=Sin+Imagen'">
                <div class="product-card-info">
                    <h3>${product.name}</h3>
                    <p>Categoría: ${product.category}</p>
                </div>
                <div class="product-card-actions">
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </div>
            `;
            productCard.querySelector('.btn-edit').addEventListener('click', () => openModal(product.id));
            productCard.querySelector('.btn-delete').addEventListener('click', () => deleteProduct(product.id));
            productGrid.appendChild(productCard);
        });
    };

    // --- LÓGICA DEL MODAL (AGREGAR/EDITAR) ---
    const openModal = (productId = null) => {
        productForm.reset();
        colorsContainer.innerHTML = '<label>Colores y Fotos</label>';
        stockManagementContainer.innerHTML = '';
        document.getElementById('product-id').value = '';

        if (productId) {
            modalTitle.textContent = 'Editar Producto';
            const product = currentProducts[productId];
            if (product) {
                document.getElementById('product-id').value = product.id;
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-category').value = product.category;
                document.getElementById('product-unit-price').value = product.unitPrice || '';
                document.getElementById('product-wholesale-price').value = product.wholesalePrice || '';
                document.getElementById('product-description').value = product.description || '';

                hasSizesCheckbox.checked = !!product.sizes;
                toggleStockManagement(hasSizesCheckbox.checked, product.sizes);

                if (product.colors) {
                    product.colors.forEach(color => addColorField(color));
                }
            }
        } else {
            modalTitle.textContent = 'Agregar Nuevo Producto';
            toggleStockManagement(false);
        }
        modal.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    const addColorField = (color = {}) => {
        const colorEntry = document.createElement('div');
        colorEntry.className = 'color-entry';
        
        const existingImage = color.image || '';

        colorEntry.innerHTML = `
            <input type="text" placeholder="Nombre del color" value="${color.name || ''}">
            <input type="color" value="${color.hex || '#000000'}">
            <div class="file-input-wrapper">
                <input type="file" accept="image/*" data-original-image="${existingImage}">
                <span class="file-name">${existingImage || 'Seleccionar archivo...'}</span>
            </div>
            <button type="button" class="btn-remove-color">&times;</button>
        `;

        colorEntry.querySelector('.btn-remove-color').addEventListener('click', () => colorEntry.remove());
        colorEntry.querySelector('input[type="file"]').addEventListener('change', (e) => {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'Seleccionar archivo...';
            e.target.nextElementSibling.textContent = fileName;
        });
        colorsContainer.appendChild(colorEntry);
    };
    
    const toggleStockManagement = (show, sizes = null) => {
        if (show) {
            stockManagementContainer.style.display = 'grid';
            const standardSizes = ['XS', 'S', 'M', 'L', 'XL'];
            stockManagementContainer.innerHTML = ''; // Limpiar
            standardSizes.forEach(size => {
                const stock = sizes && sizes[size] ? sizes[size].stock : 0;
                const isSpecialOrder = stock === -1;
                const stockEntry = document.createElement('div');
                stockEntry.className = 'stock-entry';
                stockEntry.innerHTML = `
                    <label for="stock-${size}">${size} ${isSpecialOrder ? '<span class="special-order-text">(Bajo Pedido)</span>' : ''}</label>
                    <input type="number" id="stock-${size}" data-size="${size}" value="${isSpecialOrder ? '' : stock}" placeholder="${isSpecialOrder ? 'Bajo Pedido' : 'Stock'}">
                `;
                stockManagementContainer.appendChild(stockEntry);
            });
        } else {
            stockManagementContainer.style.display = 'none';
        }
    };

    hasSizesCheckbox.addEventListener('change', (e) => {
        const productId = document.getElementById('product-id').value;
        const product = currentProducts[productId];
        toggleStockManagement(e.target.checked, product ? product.sizes : null);
    });

    // --- LÓGICA DEL FORMULARIO ---
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        let productId = document.getElementById('product-id').value;
        if (!productId) {
            // Crear un ID único para el nuevo producto
            productId = document.getElementById('product-name').value.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
        }

        const productData = {
            id: productId,
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            unitPrice: parseFloat(document.getElementById('product-unit-price').value) || 0,
            wholesalePrice: parseFloat(document.getElementById('product-wholesale-price').value) || 0,
            description: document.getElementById('product-description').value,
            sizes: null,
            colors: []
        };

        // Recolectar datos de tallas si aplica
        if (hasSizesCheckbox.checked) {
            productData.sizes = {};
            stockManagementContainer.querySelectorAll('.stock-entry input').forEach(input => {
                const size = input.dataset.size;
                const stockValue = parseInt(input.value, 10);
                productData.sizes[size] = { stock: isNaN(stockValue) ? 0 : stockValue };
            });
        }

        // Recolectar datos de colores
        const colorDivs = colorsContainer.querySelectorAll('.color-entry');
        colorDivs.forEach(div => {
            const nameInput = div.querySelector('input[type="text"]');
            const hexInput = div.querySelector('input[type="color"]');
            const imageInput = div.querySelector('input[type="file"]');
            
            // Si el nombre del color está vacío, no lo agregamos
            if (!nameInput.value.trim()) return;

            // Lógica para conservar la imagen si no se sube una nueva
            let imageName = imageInput.dataset.originalImage || ''; // Usar la original por defecto
            if (imageInput.files[0]) {
                imageName = imageInput.files[0].name; // Si hay archivo nuevo, usarlo
            }

            productData.colors.push({
                name: nameInput.value.trim(),
                hex: hexInput.value,
                image: imageName
            });
        });

        currentProducts[productId] = productData;
        saveProducts();
        renderProductGrid();
        closeModal();
    };

    const deleteProduct = (productId) => {
        if (confirm(`¿Estás seguro de que quieres eliminar el producto "${currentProducts[productId].name}"?`)) {
            delete currentProducts[productId];
            saveProducts();
            renderProductGrid();
        }
    };
    
    // --- LÓGICA DE LA NUEVA VISTA DE CONFIGURACIÓN ---
    const showSettingsView = async () => {
        dashboardView.classList.remove('active');
        settingsView.classList.add('active');
        // Cargar datos actuales de Firestore en el formulario de configuración
        // Asegúrate de que loadWebsiteData esté disponible globalmente o importado
        if (typeof loadWebsiteData !== 'undefined') {
            const data = await loadWebsiteData();
            if (data) {
                pageTitleInput.value = data.pageTitle || '';
                bgColorInput.value = data.bgColor || '#ffffff';
            }
        } else {
            console.error("loadWebsiteData no está definido. Asegúrate de que script.js se cargue antes.");
        }
    };
    
    const showDashboardView = () => {
        settingsView.classList.remove('active');
        dashboardView.classList.add('active');
    };

    const handleSettingsSubmit = (e) => {
        e.preventDefault();
        const data = {
            pageTitle: pageTitleInput.value,
            bgColor: bgColorInput.value
        };
        // Llama a la función de Firestore para guardar los datos
        // Asegúrate de que saveWebsiteData esté disponible globalmente o importado
        if (typeof saveWebsiteData !== 'undefined') {
            saveWebsiteData(data);
            alert('Configuración guardada. Recarga el sitio web para ver los cambios.');
        } else {
            console.error("saveWebsiteData no está definido. Asegúrate de que script.js se cargue antes.");
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
    settingsBtn.addEventListener('click', showSettingsView); // Nuevo evento: Abre la vista de configuración
    backToDashboardBtn.addEventListener('click', showDashboardView); // Nuevo evento: Vuelve al dashboard desde configuración
    settingsForm.addEventListener('submit', handleSettingsSubmit); // Nuevo evento: Guarda la configuración del sitio
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    productForm.addEventListener('submit', handleFormSubmit);
    addColorBtn.addEventListener('click', () => addColorField());

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
