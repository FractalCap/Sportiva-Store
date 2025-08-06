/**
 * products-db.js
 * Base de datos simulada para todos los productos de la tienda Sportiva Store.
 * NOTA: Se ha añadido el campo 'category' y un objeto 'sizes' para gestionar el stock por talla.
 * Esta base de datos sirve como punto de partida si el almacenamiento local está vacío.
 */

const productsDB = {
    // ===================================================================
    // ===              COLECCIÓN DE ENTERIZOS                         ===
    // ===================================================================
    'enterizos': {
        id: 'enterizos',
        name: 'Colección de Enterizos',
        category: 'women',
        // Se añade estructura de tallas a la colección general de enterizos
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        models: [
            { id: 'enterizo-julia-negro', name: 'Enterizo Julia Negro', price: 79900, image: 'Enterizo Julia negro.jpeg', description: 'Un diseño elegante y cómodo, perfecto para destacar con estilo y confort.' },
            { id: 'enterizo-julia-azul', name: 'Enterizo Julia Azul', price: 79900, image: 'Enterizo Julia azul.jpeg', description: 'El clásico diseño Julia en un vibrante tono azul que resalta tu figura.' },
            { id: 'enterizo-ibby', name: 'Enterizo Ibby', price: 64900, image: 'Enterizo Ibby.jpeg', description: 'Una prenda versátil y sofisticada, ideal para cualquier tipo de evento o para el día a día.' },
            { id: 'enterizo-sai-negro', name: 'Enterizo Sai Negro', price: 69900, image: 'Enterizo Sai Negro.png', description: 'Estilo moderno y minimalista que ofrece una silueta estilizada y actual.' },
            { id: 'enterizo-sai-gris', name: 'Enterizo Sai Gris', price: 68000, image: 'Enterizo Sai Gris.png', description: 'La elegancia del modelo Sai ahora en un sofisticado tono gris.' },
            { id: 'enterizo-london-corto-azul', name: 'Enterizo London Corto Azul', price: 64900, image: 'Enterizo London Corto Azul.png', description: 'Un look atrevido y chic en color azul, perfecto para marcar tendencia.' },
            { id: 'enterizo-london-corto-rojo', name: 'Enterizo London Corto Rojo', price: 64900, image: 'Enterizo London Corto Rojo.png', description: 'La versión más audaz del London Corto en un apasionante color rojo.' },
            { id: 'enterizo-london-corto-negro', name: 'Enterizo London Corto Negro', price: 64900, image: 'Enterizo London Corto Negro.png', description: 'El enterizo London Corto en un clásico y elegante negro.' },
            { id: 'enterizo-back', name: 'Enterizo Back', price: 64900, image: 'Enterizo Back.jpeg', description: 'Destaca con su espectacular diseño de espalda abierta, combinando sensualidad y elegancia.' },
            { id: 'enterizo-brenda-blanco', name: 'Enterizo Brenda Blanco', price: 69900, image: 'Enterizo Brenda blanco.png', description: 'Elegancia y sofisticación en una sola prenda, ideal para ocasiones especiales.' },
            { id: 'enterizo-brenda-negro', name: 'Enterizo Brenda Negro', price: 69900, image: 'Enterizo Brenda negro.png', description: 'El poder y la elegancia del negro en el sofisticado modelo Brenda.' },
            { id: 'enterizo-brenda-rojo-oscuro', name: 'Enterizo Brenda Rojo Oscuro', price: 69900, image: 'Enterizo Brenda rojo oscuro.png', description: 'Un tono rojo profundo que añade un toque de misterio y glamour al diseño Brenda.' },
            { id: 'enterizo-brenda-rojo', name: 'Enterizo Brenda Rojo', price: 69900, image: 'Enterizo Brenda rojo.jpeg', description: 'La versión más vibrante del enterizo Brenda, para no pasar desapercibida.' },
            { id: 'enterizo-katy', name: 'Enterizo Katy', price: 79900, image: 'Enterizo Katy Negro.jpeg', description: 'Comodidad y estilo se unen en este diseño práctico y moderno para tu rutina.' },
            { id: 'enterizo-manga-larga', name: 'Enterizo Manga Larga', price: 99900, image: 'Enterizo Manga larga cafe.jpeg', description: 'Ideal para climas más frescos sin sacrificar el estilo. Una prenda versátil y abrigadora.' },
            { id: 'enterizo-botacampana', name: 'Enterizo Botacampana', price: 85000, image: 'Enterizo Botacampana Rojo.jpeg', description: 'Un estilo retro y muy a la moda que estiliza la figura con su corte acampanado.' },
            { id: 'enterizo-un-hombro', name: 'Enterizo Un Hombro', price: 64900, image: 'Enterizo Un hombro 1.jpeg', description: 'Un toque asimétrico y vanguardista para un look único y llamativo.' },
            { id: 'enterizo-milan', name: 'Enterizo Milan', price: 59900, image: 'Enterizo Milan 1.jpeg', description: 'Inspirado en la alta costura, este enterizo te hará sentir en una pasarela.' },
            { id: 'enterizo-betsy', name: 'Enterizo Betsy', price: 69900, image: 'Enterizo Betsy 1.jpeg', description: 'Un diseño dulce y sofisticado que resalta la feminidad con elegancia.' }
        ],
        colors: [
            { name: 'Julia (N)', hex: '#2F2F2F', modelId: 'enterizo-julia-negro' },
            { name: 'Julia (A)', hex: '#4682B4', modelId: 'enterizo-julia-azul' },
            { name: 'Ibby', hex: '#C0C0C0', modelId: 'enterizo-ibby' },
            { name: 'Sai (N)', hex: '#1A1A1A', modelId: 'enterizo-sai-negro' },
            { name: 'Sai (G)', hex: '#808080', modelId: 'enterizo-sai-gris' },
            { name: 'London (A)', hex: '#0000FF', modelId: 'enterizo-london-corto-azul' },
            { name: 'London (R)', hex: '#FF0000', modelId: 'enterizo-london-corto-rojo' },
            { name: 'London (N)', hex: '#363636', modelId: 'enterizo-london-corto-negro' },
            { name: 'Back', hex: '#006D77', modelId: 'enterizo-back' },
            { name: 'Brenda (B)', hex: '#F5F5F5', modelId: 'enterizo-brenda-blanco' },
            { name: 'Brenda (N)', hex: '#000000', modelId: 'enterizo-brenda-negro' },
            { name: 'Brenda (RO)', hex: '#8B0000', modelId: 'enterizo-brenda-rojo-oscuro' },
            { name: 'Brenda (R)', hex: '#E63946', modelId: 'enterizo-brenda-rojo' },
            { name: 'Katy', hex: '#454545', modelId: 'enterizo-katy' },
            { name: 'M. Larga', hex: '#A0522D', modelId: 'enterizo-manga-larga' },
            { name: 'Botacampana', hex: '#D90429', modelId: 'enterizo-botacampana' },
            { name: 'Un Hombro', hex: '#8D99AE', modelId: 'enterizo-un-hombro' },
            { name: 'Milan', hex: '#6A0572', modelId: 'enterizo-milan' },
            { name: 'Betsy', hex: '#457B9D', modelId: 'enterizo-betsy' }
        ],
        sustainability: "Confeccionado con prácticas sostenibles para reducir nuestro impacto ambiental y promover la moda consciente.",
        productCare: "Lavar a máquina con agua fría en ciclo suave. No usar blanqueador. Secar a baja temperatura o colgar para secar. Planchar a baja temperatura si es necesario para mantener la calidad de la prenda."
    },
    
    'leggings-unicolor-push-up': {
        id: 'leggings-unicolor-push-up',
        name: 'Leggings Unicolor Con Push Up',
        category: 'women',
        unitPrice: 50000,
        wholesalePrice: null,
        description: "Diseñados para realzar tu figura, estos leggings con efecto push-up te brindan comodidad y estilo en cada movimiento.",
        sizes: {
            S: { stock: 15 },
            M: { stock: 15 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Verde Océano Claro', hex: '#5E8B7E', image: 'Leggings-Unicolor-Con-Push-Up-Verde-oceano-claro.jpeg' },
            { name: 'Azul Celeste Intenso', hex: '#4A90E2', image: 'Leggings-Unicolor-Con-Push-Up-Celeste-Intenso.jpeg' },
            { name: 'Gris Humo', hex: '#707070', image: 'Leggings-Unicolor-Con-Push-Up-Gris-humo.jpeg' },
            { name: 'Terracota Intenso', hex: '#C06C5D', image: 'Leggings-Unicolor-Con-Push-Up-Terracota-Intensa.jpeg' },
            { name: 'Azul Marino Suave', hex: '#5A7D9A', image: 'Leggings-Unicolor-Con-Push-Up-Azul-marino-suave.jpeg' },
            { name: 'Marrón Piedra', hex: '#A3917F', image: 'Leggings-Unicolor-Con-Push-Up-Marron-piedra.jpeg' },
            { name: 'Gris Natural', hex: '#BDB5AD', image: 'Leggings-Unicolor-Con-Push-Up-Gris.jpeg' },
            { name: 'Café Cacao', hex: '#5D4037', image: 'Leggings-Unicolor-Con-Push-Up-Cafe-cacao.jpg' },
            { name: 'Palo Rosa', hex: '#E1C1C1', image: 'Leggings-Unicolor-Con-Push-Up-Rosa-Palo.jpeg' },
            { name: 'Terracota', hex: '#E07A5F', image: 'Leggings-Unicolor-Con-Push-Up-Terracota.jpeg' },
            { name: 'Rojo Terracota', hex: '#B85C4D', image: 'Leggings-Unicolor-Con-Push-Up-Rojo Terracota.jpeg' },
            { name: 'Celeste Pastel', hex: '#A7C7E7', image: 'Leggings-Unicolor-Con-Push-Up-Celeste-pastel.jpeg' },
            { name: 'Verde Militar Claro', hex: '#A8B89A', image: 'Leggings-Unicolor-Con-Push-Up-Verde militar claro.jpeg' },
            { name: 'Verde Supex', hex: '#78866B', image: 'Leggings Unicolor Con Push Up Verde.jpeg' },
            { name: 'Gris Beige', hex: '#D3C5B7', image: 'Leggings Unicolor Con Push Up Beige.jpeg' },
            { name: 'Morado', hex: '#8A2BE2', image: 'Leggings Unicolor Con Push Up Morado.jpeg' },
        ],
        sustainability: "Fabricado con tejidos reciclados de alto rendimiento.",
        productCare: "Lavar a máquina en frío, no usar secadora."
    },
    'short-unicolor': {
        id: 'short-unicolor',
        name: 'Short unicolor',
        category: 'women',
        unitPrice: 40000,
        wholesalePrice: null,
        description: "El short deportivo clásico que no puede faltar en tu armario. Comodidad y libertad de movimiento garantizadas.",
        sizes: {
            S: { stock: 20 },
            M: { stock: 20 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Azul Agua Marina', hex: '#008080', image: '1 short azul agua marina.jpg' },
            { name: 'Azul Piscina', hex: '#0077be', image: '1 short azul Geo piscina.jpg' },
            { name: 'Azul Oscuro', hex: '#465a7e', image: '1 short azul oscuro.jpg' },
            { name: 'Camel', hex: '#c19a6b', image: '1 short camel.jpg' },
            { name: 'Fucsia', hex: '#ff00ff', image: '1 short fucsia.jpg' },
            { name: 'Gris Deslavado', hex: '#8a8a8a', image: '1 short gris deslavado.jpg' },
            { name: 'Gris Jaspeado', hex: '#808080', image: '1 short gris jaspeado.jpg' },
            { name: 'Gris Oscuro Jaspeado', hex: '#696969', image: '1 short gris oscuro jaspeado.jpg' },
            { name: 'Marrón', hex: '#964b00', image: '1 short marron.jpg' },
            { name: 'Rosado', hex: '#ffc0cb', image: '1 short rosado.jpg' },
            { name: 'Terracota', hex: '#e2725b', image: '1 short terracota.jpg' },
            { name: 'Verde Claro', hex: '#90ee90', image: '1 short verde claro.jpg' },
            { name: 'Vino', hex: '#722f37', image: '1 short vino.jpg' },
            { name: 'Negro', hex: '#000000', image: '1 short.jpg' }
        ],
        sustainability: "Algodón orgánico certificado.",
        productCare: "Lavar a máquina con colores similares."
    },
    'short-tie-dye': {
        id: 'short-tie-dye',
        name: 'Short Tie Dye',
        category: 'women',
        unitPrice: 40000,
        wholesalePrice: 35000,
        description: "Atrévete con el estilo tie-dye. Cada short tiene un diseño único e irrepetible. ¡Lleva 2 o más por $35.000 cada uno!",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Azul Royal y Blanco', hex: '#4169E1', image: '2 short Tie-dye azul royal y blanco.jpg' },
            { name: 'Marmolado Blanco y Gris', hex: '#B0B0B0', image: '2 Short Marmoleado gris carbón sobre blanco hueso.jpg' },
            { name: 'Marmolado Rojo', hex: '#D9534F', image: '2 Short Marmoleado rojo coral sobre durazno.jpg' },
            { name: 'Rosa Palo', hex: '#E0B4B4', image: '2 Short Marmoleado vino tinto sobre rosa palo.jpg' },
            { name: 'Gris Mismo Tono', hex: '#8C8C8C', image: '2 short tie dye gris marmoleado.jpg' },
            { name: 'Fondo Azul y Vetas Blancas', hex: '#87CEFA', image: '2 Short Tie-dye azul marino tenue con fondo azul pastel.jpg' },
            { name: 'Fondo Café Claro', hex: '#D2B48C', image: '2 Short Tie-dye carbón con base café rojizo.jpg' },
            { name: 'Fondo Verde Claro', hex: '#70867081', image: '2 Short Tie-dye carbón con fondo oliva oscuro.jpg' },
            { name: 'Fondo Blanco y Vetas Verdes', hex: '#556b46cd', image: '2 short Tie-dye marrón verdoso con fondo blanco.jpg' },
            { name: 'Musgo Claro', hex: '#81ac6698', image: '2 Short Tie-dye musgo claro con base blanca.jpg' },
            { name: 'Rosa Eléctrico', hex: '#FF00FF', image: '2 Short Tie-dye negro con base rosa eléctrico.jpg' },
            { name: 'Amarillo con Blanco', hex: '#FFD700', image: '2 short Tie-dye amarillo mostaza y blanco.jpg' },
            { name: 'Blanco con Naranja', hex: '#E6E6FA', image: '2 short Tie-dye óxido con base blanca.jpg' },
            { name: 'Púrpura con Manchas Blancas', hex: '#8A2BE2', image: '2 short Tie-dye púrpura claro con manchas en negro.jpg' },
            { name: 'Rojo Vino Durazno', hex: '#DC143C', image: '2 Short Tie-dye rojo vino y durazno.jpg' },
            { name: 'Rosa con Blanco', hex: '#FF69B4', image: '2 Short Tie-dye rosa intenso con base blanca.jpg' }
        ],
        sustainability: "Tintes naturales y proceso de bajo consumo de agua.",
        productCare: "Lavar a mano por separado para conservar el color."
    },
    'yoga-jacket-lineas': {
        id: 'yoga-jacket-lineas',
        name: 'Yoga Jacket Lineas',
        category: 'women',
        unitPrice: 69900,
        wholesalePrice: null,
        description: "Chaqueta ligera y elástica con un diseño de líneas que estiliza tu figura. Perfecta para antes y después de tu práctica de yoga.",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Negro', hex: '#000000', image: 'Yoga Jacket lineas negro.jpg' },
            { name: 'Blanco', hex: '#FFFFFF', image: 'Yoga Jacket lineas blanco.jpg' },
            { name: 'Rosa', hex: '#D5A6B0', image: 'Yoga Jacket lineas Rosa.jpg' }
        ],
        sustainability: "Materiales reciclados post-consumo.",
        productCare: "Cerrar la cremallera antes de lavar."
    },
    'yoga-jacket-clasica': {
        id: 'yoga-jacket-clasica',
        name: 'Yoga Jacket Clasica',
        category: 'women',
        unitPrice: 69900,
        wholesalePrice: null,
        description: "La chaqueta de yoga clásica que combina con todo. Su tejido suave y transpirable te mantiene cómoda en todo momento.",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Verde Oscuro', hex: '#5a6e45', image: 'Yoga Jacket Clasica verde oscuro.jpg' },
            { name: 'Azul Oscuro', hex: '#4a5a7e', image: 'Yoga Jacket Clasica azul oscuro.jpg' },
            { name: 'Verde Claro', hex: '#d4d8c6', image: 'Yoga Jacket Clasica verde claro.jpg' },
            { name: 'Rojo Vibrante', hex: '#E63946', image: 'Yoga-Jacket-Clasica-Rojo-Vibrante.jpg' },
            { name: 'Gris Grafito', hex: '#333333', image: 'Yoga-Jacket-Clasica-Gris-Grafito.jpg' },
            { name: 'Morado Lavanda', hex: '#9370DB', image: 'Yoga-Jacket-Clasica-Morado-Lavanda.jpg' }
        ],
        sustainability: "Tejidos orgánicos y de comercio justo.",
        productCare: "No usar suavizante para mantener la transpirabilidad."
    },
    'top-cruzado': {
        id: 'top-cruzado',
        name: 'Top Cruzado',
        category: 'women',
        unitPrice: 32900,
        wholesalePrice: null,
        description: "Diseño moderno con tiras cruzadas que ofrece un soporte ligero y un estilo único.",
        sizes: {
            S: { stock: 12 },
            M: { stock: 12 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Blanco', hex: '#FFFFFF', image: 'Top cruzado.jpg' },
            { name: 'Negro', hex: '#000000', image: 'Top cruzado.jpg' },
            { name: 'Terracota', hex: '#9E5440', image: 'Top cruzado.jpg' }
        ],
        sustainability: "Elaborado con fibras de nylon reciclado.",
        productCare: "Lavar a mano y secar a la sombra."
    },
    'top-3-tiras': {
        id: 'top-3-tiras',
        name: 'Top 3 Tiras',
        category: 'women',
        unitPrice: 38900,
        wholesalePrice: null,
        description: "Un top deportivo con un detalle de tres tiras en la espalda para un look llamativo y ventilación adicional.",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Fucsia', hex: '#FF00FF', image: '3 tiras.jpg' },
            { name: 'Blanco', hex: '#FFFFFF', image: '3 tiras.jpg' },
            { name: 'Negro', hex: '#000000', image: '3 tiras.jpg' }
        ],
        sustainability: "Tejido con certificación OEKO-TEX®.",
        productCare: "Lavar a máquina, no planchar sobre el estampado."
    },
    'top-cruzado-b2': {
        id: 'top-cruzado-b2',
        name: 'Top Cruzado B2',
        category: 'women',
        unitPrice: 32900,
        wholesalePrice: null,
        description: "Versión mejorada del top cruzado, con mayor soporte y un ajuste perfecto para actividades de alto impacto.",
        sizes: {
            S: { stock: 15 },
            M: { stock: 15 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Terracota', hex: '#B45F50', image: 'Top Cruzado B2.jpg' },
            { name: 'Negro', hex: '#000000', image: 'Top Cruzado B2.jpg' },
            { name: 'Beige', hex: '#EAE0D5', image: 'Top Cruzado B2.jpg' },
            { name: 'Azul Claro', hex: '#B0C4DE', image: 'Top Cruzado B2.jpg' }
        ],
        sustainability: "Producido en una fábrica con certificación de comercio justo.",
        productCare: "Lavar con colores similares."
    },
    'top-bea': {
        id: 'top-bea',
        name: 'Top Bea',
        category: 'women',
        unitPrice: 38900,
        wholesalePrice: null,
        description: "Un top de diseño femenino y delicado, con un ajuste cómodo que te permite moverte con total libertad.",
        sizes: {
            S: { stock: 8 },
            M: { stock: 8 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Rosado', hex: '#FFC0CB', image: 'Top Bea Rosado.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Top Bea Negro.jpeg' },
            { name: 'Blanco', hex: '#FFFFFF', image: 'Top Bea Blanco.jpeg' },
            { name: 'Marrón', hex: '#654321', image: 'Top Bea Marron.jpeg' }
        ],
        sustainability: "Materiales veganos y libres de crueldad.",
        productCare: "Lavar a mano preferiblemente."
    },
    'top-sencillo': {
        id: 'top-sencillo',
        name: 'Top Sencillo',
        category: 'women',
        unitPrice: 30000,
        wholesalePrice: null,
        description: "El básico esencial. Un top simple, cómodo y versátil que combina con todo.",
        sizes: {
            S: { stock: 20 },
            M: { stock: 20 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Verde', hex: '#008000', image: 'Top sencillo Verde.jpeg' },
            { name: 'Rosado', hex: '#ff9be9ff', image: 'Top sencillo Rosado.jpeg' }
        ],
        sustainability: "Algodón 100% orgánico.",
        productCare: "Apto para lavadora y secadora."
    },
    'top-un-hombro': {
        id: 'top-un-hombro',
        name: 'Top Un Hombro',
        category: 'women',
        unitPrice: 29900,
        wholesalePrice: null,
        description: "Un diseño asimétrico y moderno que te hará destacar. Ideal para yoga, pilates o un look casual.",
        sizes: {
            S: { stock: 5 },
            M: { stock: 5 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Rosado', hex: '#ffc5feff', image: 'Top un hombro.jpeg' },
        ],
        sustainability: "Fabricado con un 50% de fibras recicladas.",
        productCare: "Lavar a máquina en ciclo delicado."
    },
    'top-gota': {
        id: 'top-gota',
        name: 'Top Gota',
        category: 'women',
        unitPrice: 33900,
        wholesalePrice: null,
        description: "Elegante y funcional, este top presenta un corte en forma de gota en el escote para un toque de estilo.",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Azul', hex: '#7a7affff', image: 'Top gota azul.jpeg' },
            { name: 'Rojo', hex: '#ff3b3bff', image: 'Top gota rojo.jpeg' }
        ],
        sustainability: "Tejido transpirable de fuentes responsables.",
        productCare: "No usar blanqueador."
    },
    'top-kiss': {
        id: 'top-kiss',
        name: 'Top Kiss',
        category: 'women',
        unitPrice: 38900,
        wholesalePrice: null,
        description: "Un diseño coqueto y funcional con un detalle cruzado en la espalda que simula un beso.",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Marrón', hex: '#995c07ff', image: 'Top kiss marron.jpeg' },
            { name: 'Rosa', hex: '#ff6e97ff', image: 'Top kiss rosa.jpeg' }
        ],
        sustainability: "Proceso de teñido con ahorro de agua.",
        productCare: "Lavar a mano para mayor durabilidad."
    },
    'top-fruncido': {
        id: 'top-fruncido',
        name: 'Top Fruncido',
        category: 'women',
        unitPrice: 29900,
        wholesalePrice: null,
        description: "Detalle fruncido en el centro para un ajuste personalizable y un look favorecedor.",
        sizes: {
            S: { stock: 12 },
            M: { stock: 12 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Negro', hex: '#000000', image: 'Top Fruncido Negro.jpeg' },
        ],
        sustainability: "Hecho con materiales reciclados.",
        productCare: "Ajustar el fruncido antes de lavar."
    },
    'top-convencional': {
        id: 'top-convencional',
        name: 'Top Convencional',
        category: 'women',
        unitPrice: 32900,
        wholesalePrice: null,
        description: "El top de tirantes clásico, rediseñado con un tejido de mayor calidad y un ajuste mejorado.",
        sizes: {
            S: { stock: 15 },
            M: { stock: 15 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Marrón', hex: '#612d01ff', image: 'Top Convencional Marron.jpeg' },
            { name: 'Gris', hex: '#808080', image: 'Top Convencional Gris.jpeg' }
        ],
        sustainability: "Fabricado para durar, reduciendo el desperdicio.",
        productCare: "Lavar y secar a máquina sin problemas."
    },
    'pantalon-bota-campana': {
        id: 'pantalon-bota-campana',
        name: 'Pantalón Bota Campana',
        category: 'women',
        unitPrice: 65900,
        wholesalePrice: null,
        description: "Un estilo retro que vuelve con fuerza. Este pantalón bota campana estiliza la figura y te da un look único y a la moda.",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Marrón', hex: '#8B4513', image: 'Pantalon Bota Campana marron.jpeg' },
            { name: 'Rosa', hex: '#FFC0CB', image: 'Pantalon Bota Campana rosa.jpeg' },
            { name: 'Rojo', hex: '#DC143C', image: 'Pantalon Bota Campana rojo.jpeg' },
            { name: 'Blanco', hex: '#F5F5DC', image: 'Pantalon Bota Campana blanco.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Pantalon Bota Campana Negro.jpeg' }
        ],
        sustainability: "Fabricado con una mezcla de algodón orgánico y fibras recicladas.",
        productCare: "Lavar a máquina con agua fría, secar al aire para mantener la forma."
    },
    'conjunto-premium': {
        id: 'conjunto-premium',
        name: 'Conjunto Premium',
        category: 'women',
        unitPrice: 89900,
        wholesalePrice: null,
        description: "La combinación perfecta de estilo y rendimiento. Este conjunto premium está diseñado para ofrecerte la máxima comodidad y un look impecable.",
        sizes: {
            S: { stock: 8 },
            M: { stock: 8 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Rojo', hex: '#ff0000ff', image: 'Conjunto Premium Rojo.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Conjunto Premium Negro.jpeg' },
            { name: 'Rosa', hex: '#ffa1ffff', image: 'Conjunto Premium Rosa.jpeg' }
        ],
        sustainability: "Tejido de alto rendimiento fabricado con plásticos reciclados del océano.",
        productCare: "Lavar del revés para proteger el tejido. No usar suavizante."
    },
    'conjunto-rib': {
        id: 'conjunto-rib',
        name: 'Conjunto Rib',
        category: 'women',
        unitPrice: 79900,
        wholesalePrice: null,
        description: "Siente la suavidad y el ajuste perfecto del tejido rib. Este conjunto es ideal tanto para tus entrenamientos como para un look casual y moderno.",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Blanco', hex: '#ffffffff', image: 'Conjunto Rib Blanco.jpeg' },
            { name: 'Rojo', hex: '#ff0000ff', image: 'Conjunto Rib Rojo.jpeg' },
        ],
        sustainability: "Fabricado con algodón orgánico y tintes naturales de bajo impacto.",
        productCare: "Lavar a mano o en ciclo delicado para mantener la textura del tejido rib."
    },
    'blusa-compresiva': {
        id: 'blusa-compresiva',
        name: 'Blusa Compresiva',
        category: 'women',
        unitPrice: 39900,
        wholesalePrice: null,
        description: "Diseñada para ofrecer soporte y estilizar la figura, nuestra blusa compresiva es ideal para entrenamientos de alta intensidad. Su tejido transpirable se adapta a tu cuerpo como una segunda piel.",
        sizes: {
            S: { stock: 15 },
            M: { stock: 15 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Blanco', hex: '#FFFFFF', image: 'Blusa Compresiva Blanco.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Blusa Compresiva Negro.jpeg' },
            { name: 'Rojo', hex: '#E63946', image: 'Blusa Compresiva Rojo.jpeg' },
            { name: 'Gris', hex: '#808080', image: 'Blusa Compresiva Gris.jpeg' }
        ],
        sustainability: "Confeccionada con 80% de nylon reciclado, reduciendo el impacto ambiental sin sacrificar rendimiento.",
        productCare: "Lavar a máquina en frío con colores similares. Secar a baja temperatura. No planchar."
    },
    // --- PRODUCTOS HOMBRE ---
    'chaqueta-licrada-hombre': {
        id: 'chaqueta-licrada-hombre',
        name: 'Chaqueta Licrada Hombre',
        category: 'men',
        unitPrice: 72900,
        wholesalePrice: null,
        description: "Perfecta para entrenar al aire libre, esta chaqueta licrada te ofrece libertad de movimiento y protección ligera. Su tejido elástico se ajusta a tu cuerpo para máximo confort.",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Azul', hex: '#1d3557', image: 'Chaqueta Licrada Hombre azul.jpeg' },
            { name: 'Blanco', hex: '#FFFFFF', image: 'Chaqueta Licrada Hombre blanco.jpeg' }
        ],
        sustainability: "Fabricada con poliéster reciclado y spandex para una mayor durabilidad y menor impacto ambiental.",
        productCare: "Lavar a máquina en frío, no usar secadora. Cerrar la cremallera antes de lavar."
    },
    'esqueleto-licrado-hombre': {
        id: 'esqueleto-licrado-hombre',
        name: 'Esqueleto Licrado Hombre',
        category: 'men',
        unitPrice: 39900,
        wholesalePrice: null,
        description: "El esqueleto esencial para tus rutinas más exigentes. Su tejido licrado y transpirable mantiene la frescura mientras entrenas, ofreciendo un ajuste atlético.",
        sizes: {
            S: { stock: 15 },
            M: { stock: 15 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Blanco', hex: '#FFFFFF', image: 'Esqueleto Licrado Hombre.jpeg' },
            { name: 'Gris', hex: '#808080', image: 'Esqueleto Licrado Hombre.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Esqueleto Licrado Hombre.jpeg' }
        ],
        sustainability: "Tejido con certificación OEKO-TEX®, libre de sustancias nocivas.",
        productCare: "Lavar con colores similares. No usar suavizante para mantener la transpirabilidad."
    },
    'pantalon-hombre': {
        id: 'pantalon-hombre',
        name: 'Pantalones Hombre',
        category: 'men',
        unitPrice: 40000,
        wholesalePrice: null,
        description: "Comodidad y estilo se unen en estos pantalones deportivos. Ideales para el gimnasio o para un look casual y relajado. Cuentan con bolsillos prácticos y un ajuste moderno.",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Azul Oscuro', hex: '#00008B', image: 'Pantalones Hombres.jpeg' },
            { name: 'Gris', hex: '#808080', image: 'Pantalones Hombres.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Pantalones Hombres.jpeg' }
        ],
        sustainability: "Mezcla de algodón orgánico y poliéster reciclado para un menor consumo de agua y energía.",
        productCare: "Lavar a máquina con agua fría. Secar a baja temperatura."
    },
    'esqueleto-capota-hombre': {
        id: 'esqueleto-capota-hombre',
        name: 'Esqueleto con Capota',
        category: 'men',
        unitPrice: 39900,
        wholesalePrice: null,
        description: "Un estilo urbano y funcional. Este esqueleto con capota es perfecto para un look moderno en el gimnasio o en la calle. Tejido ligero y de secado rápido.",
        sizes: {
            S: { stock: 12 },
            M: { stock: 12 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Blanco', hex: '#FFFFFF', image: 'Esqueleto con Capota.jpeg' }
        ],
        sustainability: "Hecho con algodón 100% orgánico certificado.",
        productCare: "Lavar a mano o en ciclo delicado para proteger la forma de la capota."
    },
    'esqueleto-harder-hombre': {
        id: 'esqueleto-harder-hombre',
        name: 'Esqueleto Harder',
        category: 'men',
        unitPrice: 39900,
        wholesalePrice: null,
        description: "Para los que entrenan sin límites. El esqueleto 'Harder' tiene un corte atlético y un diseño audaz que te motiva a darlo todo en cada repetición.",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Beige', hex: '#F5F5DC', image: 'Esqueleto Harder.jpeg' }
        ],
        sustainability: "Producido en una fábrica con certificación de comercio justo, garantizando condiciones laborales éticas.",
        productCare: "Lavar del revés para proteger el estampado. No planchar sobre el diseño."
    },
    'conjunto-oversize-hombre': {
        id: 'conjunto-oversize-hombre',
        name: 'Conjunto Oversize Esqueleto Hombre',
        category: 'men',
        unitPrice: 64900,
        wholesalePrice: null,
        description: "Lleva tu estilo urbano al siguiente nivel con nuestro conjunto oversize. La combinación perfecta de comodidad y tendencia, ideal para un look relajado y moderno tanto dentro como fuera del gimnasio.",
        sizes: {
            S: { stock: 10 },
            M: { stock: 10 },
            L: { stock: 0 },
            XS: { stock: 0 }
        },
        colors: [
            { name: 'Blanco', hex: '#FFFFFF', image: 'Conjunto Oversize Esqueleto Hombre Blanco.jpeg' },
            { name: 'Gris', hex: '#A9A9A9', image: 'Conjunto Oversize Esqueleto Hombre Gris.jpeg' },
            { name: 'Negro', hex: '#2c3e50', image: 'Conjunto Oversize Esqueleto Hombre Negro.jpeg' },
            { name: 'Rojo Oscuro', hex: '#8B0000', image: 'Conjunto Oversize Esqueleto Hombre Rojo oscuro.jpeg' },
            { name: 'Verde Claro', hex: '#cdffcdff', image: 'Conjunto Oversize Esqueleto Hombre Verde Claro.jpeg' }
        ],
        sustainability: "Algodón de alta densidad y bajo impacto, cultivado de forma sostenible.",
        productCare: "Lavar a máquina con agua fría. Para mantener el estilo oversize, secar al aire o a baja temperatura."
    },
    // ===================================================================
    // ===                 NUEVOS PRODUCTOS EN DESCUENTO               ===
    // ===================================================================
    'buso-palo-rosa-descuento': {
        id: 'buso-palo-rosa-descuento',
        name: 'Enterizo Licra',
        category: 'discount',
        unitPrice: 35000,
        wholesalePrice: 20000,
        description: "¡Oferta especial! Un enterizo de licra cómodo y versátil, perfecto para tus entrenamientos.",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Palo de Rosa', hex: '#E0B4B4', image: 'Enterizo Licra Descuento.jpeg' },
            { name: 'Gris', hex: '#808080', image: 'Enterizo Licra Descuento.jpeg' }
        ],
        sustainability: "Algodón orgánico certificado.",
        productCare: "Lavar a máquina con colores similares."
    },
    'set-bicolor-descuento': {
        id: 'set-bicolor-descuento',
        name: 'Blusa Polo',
        category: 'discount',
        unitPrice: 26000,
        wholesalePrice: 20000,
        description: "Una blusa tipo polo elegante y deportiva a un precio increíble. ¡Aprovecha la oferta!",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Blanco', hex: '#FFFFFF', image: 'Blusa Polo.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Blusa Polo.jpeg' },
            { name: 'Azul Claro', hex: '#ADD8E6', image: 'Blusa Polo.jpeg' },
            { name: 'Marrón', hex: '#ffbd76fe', image: 'Blusa Polo.jpeg' },
            { name: 'Rosado', hex: '#f760ffff', image: 'Blusa Polo.jpeg' },
            { name: 'Morado', hex: '#c363ffff', image: 'Blusa Polo.jpeg' },
            { name: 'Naranja', hex: '#FFA500', image: 'Blusa Polo.jpeg' }
        ],
        sustainability: "Fabricado con fibras recicladas.",
        productCare: "Lavar a máquina en frío."
    },
    'pantaloneta-unicolor-descuento': {
        id: 'pantaloneta-unicolor-descuento',
        name: 'Pantaloneta Era',
        category: 'discount',
        unitPrice: 28000,
        wholesalePrice: 22000,
        description: "¡En oferta! Pantaloneta unicolor 'Era', ligera y versátil para cualquier rutina de ejercicio.",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Negro', hex: '#000000', image: 'Pantalon Era.jpeg' },
            { name: 'Rosado', hex: '#ff219fff', image: 'Pantalon Era.jpeg' },
            { name: 'Gris', hex: '#808080', image: 'Pantalon Era.jpeg' },
            { name: 'Verde Oscuro', hex: '#019c6bff', image: 'Pantalon Era.jpeg' }
        ],
        sustainability: "Materiales de bajo impacto ambiental.",
        productCare: "Lavar a máquina."
    },
    'leggins-pushup-descuento': {
        id: 'leggins-pushup-descuento',
        name: 'Busos Polo',
        category: 'discount',
        unitPrice: 32000,
        wholesalePrice: 25000,
        description: "Busos tipo polo cómodos y con estilo, ahora con un descuento especial. ¡No te quedes sin el tuyo!",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Blanco', hex: '#FFFFFF', image: 'Buzos Polo.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Buzos Polo.jpeg' },
            { name: 'Naranja', hex: '#FFA500', image: 'Buzos Polo.jpeg' },
            { name: 'Rosado', hex: '#ff5ccbff', image: 'Buzos Polo.jpeg' },
            { name: 'Azul Claro', hex: '#ADD8E6', image: 'Buzos Polo.jpeg' },
            { name: 'Morado', hex: '#c783ffff', image: 'Buzos Polo.jpeg' },
            { name: 'Marrón', hex: '#ffa889ce', image: 'Buzos Polo.jpeg' }
        ],
        sustainability: "Tejido de alto rendimiento con fibras recicladas.",
        productCare: "Lavar del revés para proteger el tejido."
    },
    'leggins-suplex-descuento': {
        id: 'leggins-suplex-descuento',
        name: 'Leggins Suplex',
        category: 'discount',
        unitPrice: 35000,
        wholesalePrice: 20000,
        description: "Confeccionados en tela suplex de alta calidad, estos leggins sin push up ofrecen un ajuste perfecto y comodidad superior. ¡Ahora en oferta!",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Morado', hex: '#6A0DAD', image: 'Leggins Suplex Morado sin push up descuento.jpeg' },
            { name: 'Azul Oscuro', hex: '#00008B', image: 'Leggins Suplex Azul Oscuro sin push up descuento.jpeg' },
            { name: 'Verde Claro', hex: '#2E8B57', image: 'Leggins Suplex Verde Claro sin push up descuento.jpeg' },
            { name: 'Negro', hex: '#36454F', image: 'Leggins Suplex Negro sin push up descuento.jpeg' },
            { name: 'Rojo', hex: '#C21807', image: 'Leggins Suplex Rojo sin push up descuento.jpeg' },
            { name: 'Rosa', hex: '#FF007F', image: 'Leggins Suplex Rosa sin push up descuento.jpeg' }
        ],
        sustainability: "Proceso de teñido con ahorro de agua.",
        productCare: "Lavar a máquina en ciclo delicado."
    },
    'short-pushup-descuento': {
        id: 'short-pushup-descuento',
        name: 'Short Push Up',
        category: 'discount',
        unitPrice: 30000,
        wholesalePrice: 19900,
        description: "Comodidad y un efecto realzador en este short push up. ¡Aprovecha la oferta!",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Negro', hex: '#000000', image: 'Short PushUp Negro Descuento.jpeg' },
            { name: 'Negro Intenso', hex: '#1C1C1C', image: 'Short PushUp Negro Intenso Descuento.jpeg' },
            { name: 'Rosa Oscuro', hex: '#C48189', image: 'Short PushUp Rosa OscuroDescuento.jpeg' },
            { name: 'Gris', hex: '#D3D3D3', image: 'Short PushUp Gris Descuento.jpeg' },
            { name: 'Vinotinto', hex: '#800000', image: 'Short PushUp Vinotinto Descuento.jpeg' },
            { name: 'Morado', hex: '#8A2BE2', image: 'Short PushUp Morado Descuento.jpeg' }
        ],
        sustainability: "Fibras recicladas de alto rendimiento.",
        productCare: "Lavar a máquina en frío."
    },
    'leggins-unicolor-descuento': {
        id: 'leggins-unicolor-descuento',
        name: 'Leggins Unicolor',
        category: 'discount',
        unitPrice: 50000,
        wholesalePrice: 29900,
        description: "Los leggings básicos que no pueden faltar en tu clóset, ahora con un precio especial. Disponibles en varios colores.",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Rosa', hex: '#FFC0CB', image: 'Leggins PushUp Rosa Descuento.jpeg' },
            { name: 'Fucsia', hex: '#FF00FF', image: 'Leggins PushUp Rosa Intenso Descuento.jpeg' },
            { name: 'Azul', hex: '#427dfdff', image: 'Leggins PushUp Azul Descuento.jpeg' }
        ],
        sustainability: "Tejido de alta durabilidad para reducir el desperdicio.",
        productCare: "Lavar con colores similares."
    },
    'pantalon-sudadera-descuento': {
        id: 'pantalon-sudadera-descuento',
        name: 'Pantalón Sudadera',
        category: 'discount',
        unitPrice: 38000,
        wholesalePrice: 25000,
        description: "Máxima comodidad para tus días de descanso o entrenamientos ligeros. ¡No te pierdas esta oferta!",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Morado', hex: '#9370DB', image: 'Pantalon sudadera morado.jpeg' },
            { name: 'Azul', hex: '#699cd0ff', image: 'Pantalon Sudadera Azul.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Pantalon sudadera negro.jpeg' }
        ],
        sustainability: "Mezcla de algodón orgánico y poliéster reciclado.",
        productCare: "Lavar a máquina con agua fría."
    },
    'bolso-deportivo-descuento': {
        id: 'bolso-deportivo-descuento',
        name: 'Bolso Deportivo',
        category: 'discount',
        unitPrice: 25000,
        wholesalePrice: 15900,
        description: "El accesorio ideal para llevar todo lo que necesitas al gimnasio. Espacioso, práctico y ahora en descuento.",
        sizes: null, // No aplica tallas
        colors: [
            { name: 'Gris', hex: '#808080', image: 'Maleta Toto Gris.jpeg' },
            { name: 'Rosa', hex: '#FFC0CB', image: 'Maleta Toto Rosa Piel.jpeg' },
            { name: 'Negro', hex: '#000000', image: 'Maleta Toto Negra.jpeg' },
            { name: 'Lila', hex: '#E6E6FA', image: 'Maleta Toto Rosa.jpeg' }
        ],
        sustainability: "Materiales veganos y de alta durabilidad.",
        productCare: "Limpiar con un paño húmedo."
    }
};
