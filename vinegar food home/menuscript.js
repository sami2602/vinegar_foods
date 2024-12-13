let cart = [
   
];
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
});
// Cart Modal Close Logic
const closeCartButton = document.querySelector("#close-cart");
closeCartButton.addEventListener("click", function() {
    const cartModal = document.querySelector("#cart-modal");
    cartModal.style.display = "none";
});
// Cart Modal Close Logic

const cartModal = document.querySelector("#cart-modal");

closeCartButton.addEventListener("click", function() {
    cartModal.style.display = "none";
});
// Sample cart data for testing

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    cartItemsList.innerHTML = cart.map(item => `
        <li class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <span>${item.name}</span>
            <div class="quantity-controls">
                <button class="decrease" data-id="${item.id}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </li>
    `).join('');

    // Update total price
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Event listeners for quantity buttons
document.getElementById('cart-items-list').addEventListener('click', function(e) {
    const itemId = e.target.dataset.id;
    const item = cart.find(item => item.id == itemId);

    if (e.target.classList.contains('increase')) {
        item.quantity++;
    } else if (e.target.classList.contains('decrease')) {
        if (item.quantity > 1) {
            item.quantity--;
        }
    }

    updateCartDisplay();
});

// Initial display of cart
updateCartDisplay();
// Sample cart data for testing


// Function to update the cart display
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    cartItemsList.innerHTML = cart.map(item => `
        <li class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <span>${item.name}</span>
            <div class="quantity-controls">
                <button class="decrease" data-id="${item.id}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </li>
    `).join('');

    // Update total price
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Event listeners for quantity buttons
document.getElementById('cart-items-list').addEventListener('click', function(e) {
    const itemId = e.target.dataset.id;
    const item = cart.find(item => item.id == itemId);

    if (e.target.classList.contains('increase')) {
        item.quantity++;
    } else if (e.target.classList.contains('decrease')) {
        if (item.quantity > 1) {
            item.quantity--;
        }
    }

    updateCartDisplay();
});

// Initial display of cart
updateCartDisplay();

// Show cart modal
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});

// Checkout functionality
document.getElementById('checkout-button').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Proceeding to checkout...");
        // Clear cart after checkout
        cart = [];
        updateCartDisplay();
    }
});
// Sample cart data for testing


// Function to update the cart display
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    cartItemsList.innerHTML = cart.map(item => `
        <li class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <span>${item.name}</span>
            <div class="quantity-controls">
                <button class="decrease" data-id="${item.id}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </li>
    `).join('');

    // Update total price
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Event listeners for quantity buttons
document.getElementById('cart-items-list').addEventListener('click', function(e) {
    const itemId = e.target.dataset.id;
    const item = cart.find(item => item.id == itemId);

    if (e.target.classList.contains('increase')) {
        item.quantity++;
    } else if (e.target.classList.contains('decrease')) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            // Remove item if quantity reaches zero
            cart = cart.filter(item => item.id !== itemId);
        }
    }

    // Update cart display
    updateCartDisplay();
});

// Initial display of cart
updateCartDisplay();

// Show cart modal
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});

// Checkout functionality
document.getElementById('checkout-button').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Proceeding to checkout...");
        // Clear cart after checkout
        cart = [];
        updateCartDisplay();
    }
});
// Toggle the navigation menu on mobile when hamburger is clicked
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});
