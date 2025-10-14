// Variáveis globais
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Elementos DOM
const floatingCart = document.getElementById('floatingCart');
const cartToggle = document.getElementById('cartToggle');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Função para adicionar item ao carrinho
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCart();
}

// Função para remover item do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Função para atualizar quantidade
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Função para atualizar carrinho
function updateCart() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = `MZN ${cartTotal.toFixed(2)}`;
    
    renderCartItems();
    updateCheckoutButton();
}

// Função para renderizar itens do carrinho
function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">MZN ${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para atualizar botão de checkout
function updateCheckoutButton() {
    checkoutBtn.disabled = cart.length === 0;
}

// Função para mostrar carrinho
function showCart() {
    cartModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Função para esconder carrinho
function hideCart() {
    cartModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Event Listeners
cartToggle.addEventListener('click', showCart);
closeCart.addEventListener('click', hideCart);
cartOverlay.addEventListener('click', hideCart);

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideCart();
    }
});

// Inicializar carrinho
updateCart();

// Exemplo de uso: adicionar ao seu código existente
// Substitua a função addToCart existente por:
/*
function addToCart(productId) {
    const product = foodProducts.find(p => p.id === productId);
    if (product) {
        addToCart(product);
    }
}
*/