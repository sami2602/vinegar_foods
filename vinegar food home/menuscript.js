let cart = [];
let discountApplied = false;
let promoCode = 'DISCOUNT10';

document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.getElementById('cart-link');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items-list');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout-button');
    const promoCodeInput = document.getElementById('promo-code');
    const applyPromoButton = document.getElementById('apply-promo-code');
    const promoMessage = document.getElementById('promo-message');
    const cartTotalDisplay = document.getElementById('cart-total');

    // Add item to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const item = {
                id: e.target.dataset.id,
                name: e.target.dataset.name,
                price: parseFloat(e.target.dataset.price),
                quantity: 1
            };

            const existingItem = cart.find(c => c.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(item);
            }

            updateCartDisplay();
        });
    });

    // Update cart display
    function updateCartDisplay() {
        cartLink.innerText = `Cart (${cart.length})`;

        cartItemsList.innerHTML = cart.map(item => `
            <li>
                <img src="${item.name.toLowerCase()}.jpg" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>Quantity: <button class="decrease-quantity" data-id="${item.id}">-</button> ${item.quantity} <button class="increase-quantity" data-id="${item.id}">+</button></p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            </li>
        `).join('');

        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (discountApplied) {
            total *= 0.9; // Apply 10% discount
        }

        cartTotalDisplay.innerText = total.toFixed(2);
    }

    // Increase/Decrease item quantity
    cartItemsList.addEventListener('click', (e) => {
        const itemId = e.target.dataset.id;
        const item = cart.find(c => c.id === itemId);

        if (e.target.classList.contains('increase-quantity')) {
            item.quantity++;
        } else if (e.target.classList.contains('decrease-quantity')) {
            item.quantity--;
            if (item.quantity === 0) {
                cart = cart.filter(c => c.id !== itemId);
            }
        }
        updateCartDisplay();
    });

    // Apply promo code
    applyPromoButton.addEventListener('click', () => {
        if (promoCodeInput.value.toUpperCase() === promoCode) {
            discountApplied = true;
            promoMessage.innerText = 'Promo code applied! 10% off';
            promoMessage.style.color = 'green';
            updateCartDisplay();
        } else {
            promoMessage.innerText = 'Invalid promo code';
            promoMessage.style.color = 'red';
        }
    });

    // Checkout
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty! Please add items before checking out.');
        } else {
            alert('Your order has been placed successfully!');
            cart = [];
            updateCartDisplay();
            cartModal.style.display = 'none';
        }
    });

    // Open cart modal
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'flex';
    });

    // Close cart modal
    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Mobile navigation toggle
    document.querySelector('.hamburger-menu').addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('active');
    });
});
// Open cart modal
cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'flex';

    // Ensure that modal height and scroll behavior are adjusted on open
    cartModal.style.maxHeight = '80vh';  // You can adjust this if necessary
    cartModal.style.overflowY = 'auto';  // Enable scrolling when needed
});
