
// --- A Mi Gusto App Logic ---
const amigustoApp = {
    state: {
        isOpen: false,
        type: 'pizza', // 'pizza' or 'calzone'
        limit: 4,
        selected: [],
        currentSizeName: '',
        currentPrice: 0,
        currentImg: ''
    },

    ingredients: [
        { id: 'am-aceitunas-n', name: 'Aceitunas Negras', img: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-aceitunas-v', name: 'Aceitunas Verdes', img: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-aji', name: 'Ají', img: 'https://images.unsplash.com/photo-1582285194593-fb3dceacbb84?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-albahaca', name: 'Albahaca', img: 'https://images.unsplash.com/photo-1615486171439-d3e75344439c?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-cabanossi', name: 'Cabanossi', img: 'https://images.unsplash.com/photo-1627308595186-e3d81b312781?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-cebolla', name: 'Cebolla', img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-cecina', name: 'Cecina', img: 'https://images.unsplash.com/photo-1606487140880-60bce29b6dc6?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-champinones', name: 'Champiñones', img: 'https://images.unsplash.com/photo-1603417757913-92b0253fce98?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-chorizo', name: 'Chorizo', img: 'https://images.unsplash.com/photo-1542838965-0a149c71fb2a?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-durazno', name: 'Durazno', img: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-esparrago', name: 'Espárrago', img: 'https://images.unsplash.com/photo-1518733355593-3d0d6255776f?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-hotdog', name: 'Hot Dog', img: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-jamon', name: 'Jamón', img: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-papaya', name: 'Papaya', img: 'https://images.unsplash.com/photo-1517282009859-f000ef1b4395?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-pepperoni', name: 'Pepperoni', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-pimiento', name: 'Pimiento', img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-pina', name: 'Piña', img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-platano', name: 'Plátano', img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-pollo', name: 'Pollo', img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-salame', name: 'Salame', img: 'https://images.unsplash.com/photo-1534065261546-d2efb4be3eb8?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-salchicha', name: 'Salchicha', img: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-tocino', name: 'Tocino', img: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?auto=format&fit=crop&w=200&q=80' },
        { id: 'am-tomate', name: 'Tomate en rodajas', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80' }
    ],

    init() {
        const grid = document.getElementById('amigusto-ingredients-grid');
        if (!grid) return;

        // In the design, cards have a white background, grey border, rounded corners, image on left/top, text and add button
        grid.innerHTML = this.ingredients.map(ing => `
            <div id="amigusto-card-${ing.id}" class="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm hover:border-gray-200 transition-colors flex flex-col">
                <div class="h-24 w-full bg-gray-100 overflow-hidden relative">
                    <img src="${ing.img}" alt="${ing.name}" class="w-full h-full object-cover">
                    <!-- Overlay if selected -->
                    <div id="amigusto-overlay-${ing.id}" class="absolute inset-0 bg-red-600/20 hidden"></div>
                </div>
                <div class="p-3 flex flex-col flex-grow items-center text-center">
                    <span class="text-[11px] font-bold text-gray-800 leading-tight mb-2 flex-grow line-clamp-2">${ing.name}</span>
                    <button id="amigusto-btn-${ing.id}" onclick="amigustoApp.toggleIngredient('${ing.id}')" class="w-full py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                        <div class="w-3.5 h-3.5 rounded-full border border-gray-300 flex items-center justify-center">
                            <div class="w-1.5 h-1.5 rounded-full bg-transparent"></div>
                        </div>
                        Seleccionar
                    </button>
                </div>
            </div>
        `).join('');
    },

    openModal(type) {
        if (this.state.type !== type) {
            this.state.selected = [];
            this.state.type = type;
        }

        let name, price, img, limit;
        let modalTitle = 'Construye tu producto';
        let modalImg = '';

        if (type === 'pizza') {
            const sizeBtn = document.querySelector(`button[data-pizza-id="4"].selected-size`);
            if (!sizeBtn) {
                alert('Seleccione un tamaño primero (Personal, Mediana o Familiar) para la pizza A Mi Gusto.');
                return;
            }

            name = sizeBtn.getAttribute('data-name');
            price = parseFloat(sizeBtn.getAttribute('data-price'));
            img = sizeBtn.getAttribute('data-img');
            const isPersonal = name.includes('Personal');
            limit = isPersonal ? 4 : 6;
            modalTitle = 'Construye tu pizza';
            modalImg = img;
        } else if (type === 'calzone') {
            name = 'Calzone A Mi Gusto';
            price = 31.00;
            img = 'IM/CAL.jpg';
            limit = 6;
            modalTitle = 'Construye tu calzone';
            modalImg = img;
        } else {
            return;
        }

        this.state.limit = limit;
        this.state.currentSizeName = name;
        this.state.currentPrice = price;
        this.state.currentImg = img;

        // Trim selected if switching size down
        if (this.state.selected.length > this.state.limit) {
            this.state.selected = this.state.selected.slice(0, this.state.limit);
        }

        const titleEl = document.getElementById('amigusto-modal-title');
        const imgEl = document.getElementById('amigusto-modal-img');
        if (titleEl) titleEl.innerText = modalTitle;
        if (imgEl) imgEl.src = modalImg;

        this.updateUI();

        const modal = document.getElementById('amigusto-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    },

    closeModal() {
        const modal = document.getElementById('amigusto-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    },

    toggleIngredient(id) {
        const idx = this.state.selected.indexOf(id);
        if (idx > -1) {
            this.state.selected.splice(idx, 1);
        } else {
            if (this.state.selected.length < this.state.limit) {
                this.state.selected.push(id);
            } else {
                alert(`Solo puedes escoger hasta ${this.state.limit} ingredientes en el tamaño seleccionado.`);
            }
        }
        this.updateUI();
    },

    updateUI() {
        const maxTexts = document.querySelectorAll('#amigusto-max-text, #amigusto-limit-text');
        maxTexts.forEach(el => el.innerText = this.state.limit);

        const countText = document.getElementById('amigusto-count-text');
        if (countText) countText.innerText = this.state.selected.length;

        const priceText = document.getElementById('amigusto-price-text');
        if (priceText) priceText.innerText = `S/ ${this.state.currentPrice.toFixed(2)}`;

        this.ingredients.forEach(ing => {
            const card = document.getElementById(`amigusto-card-${ing.id}`);
            const btn = document.getElementById(`amigusto-btn-${ing.id}`);
            const overlay = document.getElementById(`amigusto-overlay-${ing.id}`);

            if(!card || !btn || !overlay) return;

            if (this.state.selected.includes(ing.id)) {
                card.classList.add('border-red-500');
                card.classList.remove('border-gray-100');

                btn.classList.add('bg-red-50', 'text-red-700', 'border-red-200');
                btn.classList.remove('text-gray-600', 'border-gray-200', 'hover:bg-gray-50', 'bg-white');
                btn.innerHTML = `
                    <div class="w-3.5 h-3.5 rounded-full border-2 border-red-500 flex items-center justify-center">
                        <div class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    </div>
                    Seleccionado
                `;
                overlay.classList.remove('hidden');
            } else {
                card.classList.remove('border-red-500');
                card.classList.add('border-gray-100');

                btn.classList.remove('bg-red-50', 'text-red-700', 'border-red-200');
                btn.classList.add('text-gray-600', 'border-gray-200', 'hover:bg-gray-50', 'bg-white');
                btn.innerHTML = `
                    <div class="w-3.5 h-3.5 rounded-full border border-gray-300 flex items-center justify-center">
                        <div class="w-1.5 h-1.5 rounded-full bg-transparent"></div>
                    </div>
                    Seleccionar
                `;
                overlay.classList.add('hidden');
            }
        });
    },

    addToCart(directType) {
        // If triggered directly from "Agregar al carrito" on the card
        if (directType && directType !== this.state.type) {
             this.state.selected = [];
             this.state.type = directType;
             if (directType === 'pizza') {
                  const sizeBtn = document.querySelector(`button[data-pizza-id="4"].selected-size`);
                  if (!sizeBtn) {
                      alert('Seleccione un tamaño primero (Personal, Mediana o Familiar) para la pizza A Mi Gusto.');
                      return;
                  }
                  this.state.currentSizeName = sizeBtn.getAttribute('data-name');
                  this.state.currentPrice = parseFloat(sizeBtn.getAttribute('data-price'));
                  this.state.currentImg = sizeBtn.getAttribute('data-img');
             } else if (directType === 'calzone') {
                  this.state.currentSizeName = 'Calzone A Mi Gusto';
                  this.state.currentPrice = 31.00;
                  this.state.currentImg = 'IM/CAL.jpg';
             }
        }

        if (this.state.selected.length === 0) {
            // Require at least one ingredient? Usually up to max. We'll allow empty or prompt.
            if (!confirm(`No has seleccionado ningún ingrediente. ¿Deseas agregar el ${this.state.type} así?`)) {
                return;
            }
        }

        let desc = 'Sin ingredientes adicionales';
        if (this.state.selected.length > 0) {
            const names = this.state.selected.map(id => this.ingredients.find(i => i.id === id).name);
            desc = "Ingredientes elegidos: " + names.join(', ');
        }

        cartApp.addItem(this.state.currentSizeName, this.state.currentPrice, this.state.currentImg, desc);
        this.closeModal();

        // Reset
        this.state.selected = [];
        this.updateUI();
    }
};

function openAmigustoModal(type) {
    amigustoApp.openModal(type);
}
function closeAmigustoModal() {
    amigustoApp.closeModal();
}
function addAmigustoToCart(type) {
    amigustoApp.addToCart(type);
}

// Tailwind configuration and other custom JS
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#E62117', // Red from the logo/buttons
                dark: '#111111',
                darker: '#0a0a0a',
                light: '#F8F8F8'
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Playfair Display', 'serif'] // For some headings if needed
            }
        }
    }
}

// Dynamic Menu Filtering

// --- Vegetariana App Logic ---
const vegApp = {
    state: {
        isOpen: false,
        limit: 4,
        selected: [],
        currentCall: ""
    },

    // Using the same ingredients as calzoneApp
    ingredients: [
        { id: 'v-aceitunas-n', name: 'Aceitunas Negras', emoji: '🫒' },
        { id: 'v-aceitunas-v', name: 'Aceitunas Verdes', emoji: '🍈' },
        { id: 'v-aji', name: 'Ají', emoji: '🌶️' },
        { id: 'v-albahaca', name: 'Albahaca', emoji: '🌿' },
        { id: 'v-cabanossi', name: 'Cabanossi', emoji: '🌭' },
        { id: 'v-cebolla', name: 'Cebolla', emoji: '🧅' },
        { id: 'v-cecina', name: 'Cecina', emoji: '🥩' },
        { id: 'v-champinones', name: 'Champiñones', emoji: '🍄' },
        { id: 'v-chorizo', name: 'Chorizo', emoji: '🌭' },
        { id: 'v-durazno', name: 'Durazno', emoji: '🍑' },
        { id: 'v-esparrago', name: 'Espárrago', emoji: '🥬' },
        { id: 'v-jamon', name: 'Jamón', emoji: '🍖' },
        { id: 'v-papaya', name: 'Papaya', emoji: '🥭' },
        { id: 'v-pepperoni', name: 'Pepperoni', emoji: '🍕' },
        { id: 'v-pimiento', name: 'Pimiento', emoji: '🫑' },
        { id: 'v-pina', name: 'Piña', emoji: '🍍' },
        { id: 'v-platano', name: 'Plátano', emoji: '🍌' },
        { id: 'v-pollo', name: 'Pollo', emoji: '🍗' },
        { id: 'v-salame', name: 'Salame', emoji: '🍖' },
        { id: 'v-salchicha', name: 'Salchicha', emoji: '🌭' },
        { id: 'v-tocino', name: 'Tocino', emoji: '🥓' },
        { id: 'v-tomate', name: 'Tomate en rodajas', emoji: '🍅' }
    ],

    init() {
        const grid = document.getElementById('veg-ingredients-grid');
        if (!grid) return;

        grid.innerHTML = this.ingredients.map(ing => `
            <button onclick="vegApp.toggleIngredient('${ing.id}')" id="veg-ing-${ing.id}" class="bg-white border border-gray-200 rounded-md p-1.5 flex flex-col items-center justify-center gap-1 hover:border-primary transition relative h-16 w-full">
                <div id="veg-check-${ing.id}" class="hidden absolute top-0.5 right-0.5 text-primary text-[10px]"><i class="fas fa-check-circle"></i></div>
                <div class="text-xl leading-none">${ing.emoji}</div>
                <span class="text-[8px] text-center leading-tight mt-0.5 text-gray-600 line-clamp-2">${ing.name}</span>
            </button>
        `).join('');
    },

    togglePanel() {
        if (!this.state.currentCall) {
            alert("Seleccione un tamaño antes de personalizar los ingredientes");
            return;
        }
        this.state.isOpen = !this.state.isOpen;
        const panel = document.getElementById('veg-panel');
        if (panel) {
            panel.classList.toggle('hidden', !this.state.isOpen);
        }
    },

    updateLimit(limit, callCode) {
        this.state.limit = limit;
        this.state.currentCall = callCode;

        // If they switch size and have more selected than allowed, trim the array
        if (this.state.selected.length > limit) {
            this.state.selected = this.state.selected.slice(0, limit);
        }

        this.updateUI();
    },

    toggleIngredient(id) {
        const idx = this.state.selected.indexOf(id);
        if (idx > -1) {
            this.state.selected.splice(idx, 1);
        } else {
            if (this.state.selected.length < this.state.limit) {
                this.state.selected.push(id);
            } else {
                // Optionally show a toast/alert that limit is reached
                alert(`Solo puedes escoger hasta ${this.state.limit} ingredientes en este tamaño.`);
            }
        }
        this.updateUI();
    },

    updateUI() {
        const limitText = document.getElementById('veg-limit-text');
        const countText = document.getElementById('veg-count');

        if (limitText) limitText.innerText = `Elige hasta ${this.state.limit} ingredientes`;
        if (countText) countText.innerText = this.state.selected.length;

        this.ingredients.forEach(ing => {
            const btn = document.getElementById(`veg-ing-${ing.id}`);
            const check = document.getElementById(`veg-check-${ing.id}`);
            if(!btn || !check) return;

            if (this.state.selected.includes(ing.id)) {
                btn.classList.add('border-primary', 'bg-red-50');
                btn.classList.remove('border-gray-200', 'bg-white');
                check.classList.remove('hidden');
            } else {
                btn.classList.remove('border-primary', 'bg-red-50');
                btn.classList.add('border-gray-200', 'bg-white');
                check.classList.add('hidden');
            }
        });
    },

    addToCart(pizzaIdx = '4') {
        const sizeBtn = document.querySelector(`button[data-pizza-id="${pizzaIdx}"].selected-size`);
        if (!sizeBtn) {
            alert("Seleccione un tamaño antes de agregar al carrito");
            return;
        }

        const name = sizeBtn.getAttribute('data-name');
        const price = parseFloat(sizeBtn.getAttribute('data-price'));
        const img = sizeBtn.getAttribute('data-img');

        let desc = 'Ingredientes predeterminados';
        if (this.state.selected.length > 0) {
            const names = this.state.selected.map(id => this.ingredients.find(i => i.id === id).name);
            desc = "Ingredientes elegidos: " + names.join(', ');
        }

        // Use cartApp to add
        cartApp.addItem(name, price, img, desc);

        // Close panel and reset optional
        this.state.isOpen = false;
        const panel = document.getElementById('veg-panel');
        if (panel) panel.classList.add('hidden');

        this.state.selected = [];
        this.updateUI();
    }
};

// Make sure to initialize vegApp
document.addEventListener('DOMContentLoaded', () => {
    const isMenuPage = window.location.pathname.includes('menu.html');
    const menuSections = document.querySelectorAll('.menu-section');
    const categoryLinks = document.querySelectorAll('a[data-category]');

    // Function to filter sections based on category string
    function filterCategory(category) {
        if (!isMenuPage || !menuSections.length) return;

        let found = false;
        menuSections.forEach(section => {
            if (section.dataset.category === category || category === 'all') {
                section.classList.remove('hidden');
                found = true;
            } else {
                section.classList.add('hidden');
            }
        });

        // Optional: If a category was requested but doesn't exist yet, we could show all or a message
        // For now, if nothing matches, maybe just show everything
        if (!found && category !== 'all') {
            // Un-hide everything just in case
            menuSections.forEach(sec => sec.classList.remove('hidden'));
        }
    }

    // Handle clicks on data-category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // If we are on the menu page and the link points to the menu page hash
            const category = link.getAttribute('data-category');

            if (isMenuPage) {
                e.preventDefault();
                // Change hash to naturally trigger hashchange event without reloading
                window.location.hash = category;
                filterCategory(category);
            }
            // If on index.html, let the default behavior navigate to menu.html#category
        });
    });

    // Handle initial load on menu.html
    if (isMenuPage) {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            filterCategory(hash);
        } else {
            // Default to showing all if no hash
            filterCategory('all');
        }

        // Handle browser back/forward buttons
        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash.replace('#', '');
            filterCategory(newHash || 'all');
        });
    }
});

// --- Cart Logic ---
const cartApp = {
    state: {
        items: [],
        isOpen: false
    },

    init() {
        this.loadCart();
        this.updateBadge();
        this.renderCart();
    },

    loadCart() {
        try {
            // Use pathname + search to avoid false matches, but EXCLUDE hash to not mistake hash changes for navigation.
            const currentUrl = window.location.pathname + window.location.search;
            const lastUrl = sessionStorage.getItem('chezMaggyLastUrl');
            let isManualReload = false;

            if (lastUrl === currentUrl) {
                const navType = window.performance && window.performance.navigation ? window.performance.navigation.type : 0;
                const navEntry = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation").length > 0 ? window.performance.getEntriesByType("navigation")[0].type : '';
                if (navType === 1 || navEntry === "reload") {
                    isManualReload = true;
                }
            }
            sessionStorage.setItem('chezMaggyLastUrl', currentUrl);

            if (isManualReload) {
                // Clear cart on manual reload
                sessionStorage.removeItem('chezMaggyCart');
                this.state.items = [];
            } else {
                const savedItems = sessionStorage.getItem('chezMaggyCart');
                if (savedItems) {
                    this.state.items = JSON.parse(savedItems);
                }
            }
        } catch (e) {
            console.error('Error loading cart from sessionStorage', e);
        }
    },

    saveCart() {
        try {
            sessionStorage.setItem('chezMaggyCart', JSON.stringify(this.state.items));
        } catch (e) {
            console.error('Error saving cart to sessionStorage', e);
        }
    },

    toggleModal() {
        const modal = document.getElementById('cart-modal');
        if (!modal) return;
        this.state.isOpen = !this.state.isOpen;
        modal.classList.toggle('hidden', !this.state.isOpen);
    },

    removeItem(id) {
        const itemIndex = this.state.items.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            // Remove completely
            this.state.items.splice(itemIndex, 1);
            this.saveCart();
            this.updateBadge();
            this.renderCart();
        }
    },

    updateItemQty(id, change) {
        const item = this.state.items.find(i => i.id === id);
        if (item) {
            item.qty += change;
            if (item.qty <= 0) {
                this.removeItem(id);
            } else {
                this.saveCart();
                this.updateBadge();
                this.renderCart();
            }
        }
    },

    addItem(name, price, imageSrc, desc = '') {
        // Check if item exists (match by both name and exact description)
        const existing = this.state.items.find(i => i.name === name && i.desc === desc);
        if (existing) {
            existing.qty += 1;
        } else {
            this.state.items.push({
                id: Date.now().toString(),
                name,
                price: parseFloat(price),
                imageSrc,
                desc,
                qty: 1
            });
        }
        this.saveCart();
        this.updateBadge();
        this.renderCart();

        // Show subtle feedback (optional, we'll just update the UI)
    },

    updateBadge() {
        const badge = document.getElementById('cart-badge');
        if (!badge) return;

        const totalItems = this.state.items.reduce((sum, item) => sum + item.qty, 0);
        badge.innerText = totalItems;

        if (totalItems > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    },

    renderCart() {
        const container = document.getElementById('cart-items-container');
        const emptyState = document.getElementById('cart-empty-state');
        const totalEl = document.getElementById('cart-total-price');

        if (!container || !emptyState || !totalEl) return;

        if (this.state.items.length === 0) {
            container.innerHTML = '';
            container.classList.add('hidden');
            emptyState.classList.remove('hidden');
            totalEl.innerText = 'S/ 0.00';
            return;
        }

        container.classList.remove('hidden');
        emptyState.classList.add('hidden');

        let html = '';
        let total = 0;

        this.state.items.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            const descHtml = item.desc ? `<div class="text-xs text-gray-500 mt-1 leading-tight">${item.desc}</div>` : '';
            const imgHtml = item.imageSrc ? `<div class="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50"><img src="${item.imageSrc}" class="w-full h-full object-cover"></div>` : '';

            html += `
                <div class="bg-white rounded-2xl p-4 flex gap-4 border border-gray-100 shadow-sm relative">
                    ${imgHtml}
                    <div class="flex-grow min-w-0 flex flex-col justify-between">
                        <div>
                            <h4 class="font-bold text-gray-800 text-sm md:text-base leading-tight pr-6">${item.name}</h4>
                            ${descHtml}
                        </div>
                        <div class="mt-3 flex items-center justify-between">
                            <div class="flex items-center bg-gray-50 border border-gray-200 rounded-full px-1 py-1">
                                <button onclick="cartApp.updateItemQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center text-gray-700 hover:text-primary transition font-bold">
                                    <i class="fas fa-minus text-xs"></i>
                                </button>
                                <span class="text-gray-800 font-bold px-3 text-sm">${item.qty}</span>
                                <button onclick="cartApp.updateItemQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center text-gray-700 hover:text-primary transition font-bold">
                                    <i class="fas fa-plus text-xs"></i>
                                </button>
                            </div>
                            <div class="font-bold text-gray-800 text-base">S/ ${itemTotal.toFixed(2)}</div>
                        </div>
                    </div>
                    <button onclick="cartApp.removeItem('${item.id}')" class="absolute top-4 right-4 text-red-500 hover:text-red-700 transition" title="Eliminar del carrito">
                        <i class="fas fa-trash-alt text-base"></i>
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;
        totalEl.innerText = `S/ ${total.toFixed(2)}`;
    },

    checkout() {
        if (this.state.items.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        let message = "Hola Chez Maggy, me gustaría hacer el siguiente pedido:\n\n";
        let total = 0;

        this.state.items.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            message += `- ${item.qty}x ${item.name} (S/ ${itemTotal.toFixed(2)})\n`;
            if (item.desc) {
                message += `  Detalles: ${item.desc}\n`;
            }
        });

        message += `\nTotal a pagar: S/ ${total.toFixed(2)}`;

        // Numero de WhatsApp proporcionado, si no hay usar un placeholder.
        // Asumiendo +51 para Perú (Chiclayo) ya que el HTML menciona (074) 123 456 y "Chiclayo".
        // El user no especificó el número exacto, pondremos el que está en el footer o uno generico si no hay.
        // Let's use standard +51 917 142 975 or check footer. Footer has "(074) 123 456". Let's just use "51917142975" as a placeholder that the user can replace later.
        // Or wait, can I prompt the user for the number? The user asked "puedes colocar un número de wsp". Let's just use "51917142975".

        const phoneNumber = "51917142975";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    }
};

// Bind existing menu '+' buttons
function bindGridAddButtons() {
    const gridItems = document.querySelectorAll('.grid > div');
    gridItems.forEach(item => {
        // Find all buttons in the grid item that don't have an onclick handler
        const btns = item.querySelectorAll('button:not([onclick])');
        btns.forEach(addBtn => {
            addBtn.addEventListener('click', () => {
                const name = item.querySelector('h4').innerText;
                const priceStr = item.querySelector('.text-primary.font-bold').innerText;
                const price = priceStr.replace('S/ ', '').trim();
                const img = item.querySelector('img').src;

                cartApp.addItem(name, price, img);
            });
        });
    });
}


// --- Calzone App Logic ---
// Modified to work with the new layout, binding directly to cartApp instead of the custom UI.
const calzoneApp = {
    init() {
        // We do not need to bind buttons here anymore because bindGridAddButtons() handles all grid items
        // but we keep the object to prevent errors if something tries to call calzoneApp.init()
    }
};

// Initialize apps when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    amigustoApp.init();
    cartApp.init();
    calzoneApp.init();
    vegApp.init();
    bebidasApp.init();
    bindGridAddButtons();

    // Mobile menu toggle logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileMenuBtn && mobileMenu) {
        const openMenu = () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            // Slight delay to allow display:flex to apply before animating transform
            setTimeout(() => {
                mobileMenu.classList.remove('-translate-x-full');
            }, 10);

            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('hidden');
            }
            document.body.classList.add('overflow-hidden'); // Prevent scrolling
        };

        const closeMenu = () => {
            mobileMenu.classList.add('-translate-x-full');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('hidden');
            }
            document.body.classList.remove('overflow-hidden');

            // Wait for animation to finish before hiding completely
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 300); // 300ms matches Tailwind's transition duration
        };

        mobileMenuBtn.addEventListener('click', openMenu);

        if (mobileMenuCloseBtn) {
            mobileMenuCloseBtn.addEventListener('click', closeMenu);
        }

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMenu);
        }

        // Close menu when a link inside it is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});

// Handle Back-Forward Cache (bfcache) navigation
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // The page was restored from the bfcache (e.g., user swiped back).
        // The DOMContentLoaded event is NOT fired in this case, so we need to
        // explicitly sync the UI with the latest state from sessionStorage.
        console.log('Page restored from bfcache, syncing cart...');
        cartApp.loadCart();
        cartApp.updateBadge();
        cartApp.renderCart();
    }
});

const bebidasApp = {
    state: {
        marca: null, // Inca Kola, Coca-Cola, Fanta
        tamano: null, // 1 1/2 Litros, 1/2 Litro
        temperatura: null, // Helada, Sin helar
        qty: 1
    },

    prices: {
        '1 1/2 Litros': 12.00,
        '1/2 Litro': 5.00
    },

    images: {
        'Inca Kola': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
        'Coca-Cola': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
        'Fanta': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80'
    },

    init() {
        this.updateUI();
    },

    selectMarca(marca) {
        this.state.marca = marca;
        this.updateUI();
    },

    selectTamano(tamano) {
        this.state.tamano = tamano;
        this.updateUI();
    },

    selectTemperatura(temperatura) {
        this.state.temperatura = temperatura;
        this.updateUI();
    },

    updateUI() {
        const pPrice = document.getElementById('bebidas-price');
        const pTitle = document.getElementById('bebidas-title');

        if (pPrice && pTitle) {
            if (this.state.tamano) {
                pPrice.innerText = 'S/ ' + this.prices[this.state.tamano].toFixed(2);
            } else {
                pPrice.innerText = 'S/ 0.00';
            }

            const m = this.state.marca || 'Seleccione Marca';
            const t = this.state.tamano || 'Seleccione Tamaño';
            const temp = this.state.temperatura || 'Seleccione Temp';

            pTitle.innerText = `${m} (${t}) - ${temp}`;

            if (!this.state.marca && !this.state.tamano && !this.state.temperatura) {
                 pTitle.innerText = 'Selecciona tus opciones';
            }
        }

        // Update selected states of buttons
        ['Inca Kola', 'Coca-Cola', 'Fanta'].forEach(m => {
            const btn = document.getElementById(`bebidas-marca-${m.replace(/ /g, '-')}`);
            if (btn) {
                if (m === this.state.marca) {
                    btn.classList.add('border-primary', 'bg-primary/5');
                    btn.classList.remove('border-gray-200');
                } else {
                    btn.classList.remove('border-primary', 'bg-primary/5');
                    btn.classList.add('border-gray-200');
                }
            }
        });

        ['1 1/2 Litros', '1/2 Litro'].forEach(t => {
            const btn = document.getElementById(`bebidas-tamano-${t.replace(/[\/ ]/g, '-')}`);
            if (btn) {
                if (t === this.state.tamano) {
                    btn.classList.add('border-primary', 'bg-primary/5');
                    btn.classList.remove('border-gray-200');
                } else {
                    btn.classList.remove('border-primary', 'bg-primary/5');
                    btn.classList.add('border-gray-200');
                }
            }
        });

        ['Helada', 'Sin helar'].forEach(temp => {
            const btn = document.getElementById(`bebidas-temp-${temp.replace(/ /g, '-')}`);
            if (btn) {
                if (temp === this.state.temperatura) {
                    btn.classList.add('border-primary', 'bg-primary/5');
                    btn.classList.remove('border-gray-200');
                } else {
                    btn.classList.remove('border-primary', 'bg-primary/5');
                    btn.classList.add('border-gray-200');
                }
            }
        });
    },

    addToCart() {
        if (!this.state.marca || !this.state.tamano || !this.state.temperatura) {
            alert('Por favor selecciona marca, tamaño y temperatura.');
            return;
        }
        const name = `${this.state.marca} ${this.state.tamano}`;
        const price = this.prices[this.state.tamano];
        const img = this.images[this.state.marca] || 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80';
        const desc = `Temp: ${this.state.temperatura}`;

        cartApp.addItem(name, price, img, desc, document.getElementById('add-bebida-btn'));
    }
};

// Function to handle olive selection logic
function selectOliveType(btn, pizzaIdx, type) {
    const container = document.querySelector(`.olive-selector-container[data-pizza-id="${pizzaIdx}"]`);
    if (!container) return;

    // Remove selected state from all chips in this container
    const chips = container.querySelectorAll('.olive-chip');
    chips.forEach(chip => {
        chip.classList.remove('selected', 'bg-red-50', 'border-red-500', 'text-red-700');
        chip.classList.add('bg-gray-50', 'border-gray-200', 'text-gray-600');
    });

    // Add selected state to the clicked chip
    btn.classList.add('selected', 'bg-red-50', 'border-red-500', 'text-red-700');
    btn.classList.remove('bg-gray-50', 'border-gray-200', 'text-gray-600');

    // Hide error message if it was shown
    const errorMsg = document.getElementById(`olive-error-${pizzaIdx}`);
    if (errorMsg) {
        errorMsg.classList.add('hidden');
    }
}


function selectPizzaSize(btn, pizzaIdx) {
    const buttons = document.querySelectorAll(`button[data-pizza-id="${pizzaIdx}"]`);
    buttons.forEach(b => {
        b.className = "size-btn flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 relative border-2 border-transparent w-full bg-gray-50 text-gray-500 hover:bg-gray-100";
        b.classList.remove('selected-size');
    });

    btn.className = "size-btn flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 relative border-2 border-transparent w-full bg-gradient-to-br from-primary to-red-700 shadow-[0_4px_12px_rgba(230,33,23,0.3)] text-white scale-[1.02] selected-size";

    const addBtn = document.getElementById(`add-btn-${pizzaIdx}`);
    if (addBtn) {
        if (pizzaIdx === '4') {
            const isPersonal = btn.innerText.includes('PERSONAL');
            if (typeof vegApp !== 'undefined') {
                vegApp.updateLimit(isPersonal ? 4 : 6, btn);
                addBtn.setAttribute("onclick", `vegApp.addToCart('${pizzaIdx}')`);
            }
        } else {
            addBtn.setAttribute("onclick", `addPizzaToCart('${pizzaIdx}')`);
        }
    }
}

function addPizzaToCart(pizzaIdx) {
    const sizeBtn = document.querySelector(`button[data-pizza-id="${pizzaIdx}"].selected-size`);
    if (!sizeBtn) {
        alert('Seleccione un tamaño antes de agregar al carrito');
        return;
    }

    const name = sizeBtn.getAttribute('data-name');
    const price = parseFloat(sizeBtn.getAttribute('data-price'));
    const img = sizeBtn.getAttribute('data-img');
    let finalName = name;

    const oliveContainer = document.querySelector(`.olive-selector-container[data-pizza-id="${pizzaIdx}"]`);
    if (oliveContainer) {
        const selectedOlive = oliveContainer.querySelector('.olive-chip.selected');
        if (!selectedOlive) {
            document.getElementById(`olive-error-${pizzaIdx}`).classList.remove('hidden');
            return;
        }
        document.getElementById(`olive-error-${pizzaIdx}`).classList.add('hidden');
        const oliveType = selectedOlive.getAttribute('data-type');
        finalName += ` (Aceitunas ${oliveType})`;
    }

    cartApp.addItem(finalName, price, img);
}

// --- Pizza Search Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pizza-search-input');
    const suggestionsContainer = document.getElementById('pizza-search-suggestions');
    const searchBtn = document.getElementById('pizza-search-btn');
    const pizzaGrid = document.getElementById('pizza-grid');

    if (!searchInput || !pizzaGrid) return;

    // Build pizza data array
    const pizzaCards = Array.from(pizzaGrid.children);
    const pizzas = pizzaCards.map((card, index) => {
        const titleEl = card.querySelector('h4');
        return {
            title: titleEl ? titleEl.textContent.trim() : '',
            element: card,
            index: index
        };
    });

    const renderSuggestions = (query) => {
        if (!query) {
            suggestionsContainer.classList.add('hidden');
            suggestionsContainer.innerHTML = '';
            // Show all cards
            pizzaCards.forEach(card => {
                card.style.display = '';
                card.classList.remove('hidden');
            });
            return;
        }

        const lowerQuery = query.toLowerCase();
        const matches = pizzas.filter(p => p.title.toLowerCase().startsWith(lowerQuery));

        // Live filter cards
        pizzaCards.forEach(card => {
            const isMatch = matches.some(m => m.element === card);
            card.style.display = isMatch ? '' : 'none';
        });

        // Show suggestions
        if (matches.length > 0) {
            suggestionsContainer.innerHTML = matches.map(match => `
                <button class="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors flex items-center justify-between group" data-index="${match.index}">
                    <span class="font-medium text-gray-700 group-hover:text-primary transition-colors">${match.title}</span>
                    <i class="fas fa-chevron-right text-gray-300 group-hover:text-primary text-xs transition-colors"></i>
                </button>
            `).join('');
            suggestionsContainer.classList.remove('hidden');
            suggestionsContainer.classList.add('flex');
        } else {
            suggestionsContainer.innerHTML = `
                <div class="px-4 py-4 text-center text-gray-500 text-sm">
                    No se encontraron pizzas con "${query}"
                </div>
            `;
            suggestionsContainer.classList.remove('hidden');
            suggestionsContainer.classList.add('flex');
        }
    };

    searchInput.addEventListener('input', (e) => {
        renderSuggestions(e.target.value.trim());
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target) && !searchBtn.contains(e.target)) {
            suggestionsContainer.classList.add('hidden');
            suggestionsContainer.classList.remove('flex');
        }
    });

    // Handle suggestion click
    suggestionsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn) {
            const index = btn.getAttribute('data-index');
            const match = pizzas.find(p => p.index == index);
            if (match) {
                searchInput.value = match.title;
                suggestionsContainer.classList.add('hidden');
                suggestionsContainer.classList.remove('flex');

                // Show only this card
                pizzaCards.forEach(card => {
                    card.style.display = card === match.element ? '' : 'none';
                });

                // Scroll to it
                const y = match.element.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    });

    // Handle Search Button Click
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        renderSuggestions(query);
        suggestionsContainer.classList.add('hidden');
        suggestionsContainer.classList.remove('flex');
        if (query) {
             const lowerQuery = query.toLowerCase();
             const firstMatch = pizzas.find(p => p.title.toLowerCase().startsWith(lowerQuery));
             if (firstMatch) {
                 const y = firstMatch.element.getBoundingClientRect().top + window.scrollY - 100;
                 window.scrollTo({ top: y, behavior: 'smooth' });
             }
        }
    });
});

// Function specifically for adding Calzone Vegetariano with olive validation
function addCalzoneVegToCart() {
    const container = document.querySelector('.olive-selector-container[data-pizza-id="calzone-veg"]');
    if (!container) return;

    const selectedOlive = container.querySelector('.olive-chip.selected');
    const errorMsg = document.getElementById('olive-error-calzone-veg');

    if (!selectedOlive) {
        if (errorMsg) errorMsg.classList.remove('hidden');
        return;
    }

    if (errorMsg) errorMsg.classList.add('hidden');

    const oliveType = selectedOlive.getAttribute('data-type');
    const name = `Calzone Vegetariano (Aceitunas ${oliveType})`;
    const price = 26.90;
    const img = 'IM/CAL.jpg';

    cartApp.addItem(name, price, img);
}

// Generic function for Calzones without olive selection
function addCalzoneToCart(name, price) {
    const img = 'IM/CAL.jpg';
    cartApp.addItem(name, price, img);
}

// Ravioles Modal Logic
function openRaviolesModal() {
    const modal = document.getElementById('ravioles-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeRaviolesModal() {
    const modal = document.getElementById('ravioles-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function confirmRavioles() {
    const selectedSauce = document.querySelector('input[name="ravioles-sauce"]:checked');
    if (!selectedSauce) return;

    const sauceName = selectedSauce.value;
    const name = `Ravioles (Salsa ${sauceName})`;
    const price = 24.00;
    const img = 'IM/pasta.png'; // Assuming pasta.png as it was used before in menu.html
    const category = 'Pasta';

    cartApp.addItem(name, price, img, category);
    closeRaviolesModal();
}


// Fetuccini Modal Logic
function openFetucciniModal() {
    const modal = document.getElementById('fetuccini-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeFetucciniModal() {
    const modal = document.getElementById('fetuccini-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function confirmFetuccini() {
    const selectedSauce = document.querySelector('input[name="fetuccini-sauce"]:checked');
    if (!selectedSauce) return;

    const sauceName = selectedSauce.value;
    const name = `Fetuccini (Salsa ${sauceName})`;
    const price = 23.00;
    const img = 'IM/pasta.png';
    const category = 'Pasta';

    cartApp.addItem(name, price, img, category);
    closeFetucciniModal();
}

// Espaguetis Modal Logic
function openEspaguetisModal() {
    const modal = document.getElementById('espaguetis-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeEspaguetisModal() {
    const modal = document.getElementById('espaguetis-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function confirmEspaguetis() {
    const selectedSauce = document.querySelector('input[name="espaguetis-sauce"]:checked');
    if (!selectedSauce) return;

    const sauceName = selectedSauce.value;
    const name = `Espaguetis (Salsa ${sauceName})`;
    const price = 22.00;
    const img = 'IM/pasta.png';
    const category = 'Pasta';

    cartApp.addItem(name, price, img, category);
    closeEspaguetisModal();
}
