let cart = [];
let userLocation = '';
let promoCode = 'DISCOUNT10';  // Example promo code for 10% off
let discountApplied = false;  // Track whether the discount has been applied
let promoCodeApplied = false;  // Track whether the promo code has been used

document.addEventListener("DOMContentLoaded", function() {
    const cartLink = document.querySelector(".cart-link a");
    const cartModal = document.querySelector("#cart");
    const cartItemsList = document.querySelector("#cart-items");
    const closeCartButton = document.querySelector("#close-cart-button");
    const locationModal = document.querySelector("#location-modal");
    const setLocationButton = document.querySelector("#set-location");
    const locationSelect = document.querySelector("#location-select");
    const customLocationInput = document.querySelector("#custom-location");
    const promoCodeInput = document.querySelector("#promo-code");
    const applyPromoButton = document.querySelector("#apply-promo-code");
    const promoMessage = document.querySelector("#promo-message");
    const cartTotalDisplay = document.querySelector("#cart-total");
    const checkoutButton = document.querySelector("#checkout-button");  // Checkout button

    // Handle Location Selection
    setLocationButton.addEventListener("click", function() {
        const selectedLocation = locationSelect.value || customLocationInput.value.trim();

        if (selectedLocation) {
            userLocation = selectedLocation;
            locationModal.style.display = 'none';
            console.log('Location set to:', userLocation);
        } else {
            alert("Please select or enter a location.");
        }
    });

    // Update Cart Display
    function updateCartDisplay() {
        // Update cart count in navbar
        cartLink.innerText = `Cart (${cart.length})`;

        // Update cart items list in modal
        cartItemsList.innerHTML = cart.map(item => `
            <li class="cart-item">
                <span>${item.name}</span>
                <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <div class="item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </li>
        `).join("");

        // Calculate total price
        let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (discountApplied) {
            total *= 0.9; // Apply 10% discount
        }
        cartTotalDisplay.innerText = total.toFixed(2);
    }

    // Add to Cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const category = this.dataset.category;
            const id = this.dataset.id;
            const name = this.previousElementSibling.previousElementSibling.textContent;
            const price = parseFloat(this.previousElementSibling.textContent.replace('$', '').trim());

            // Check if item already exists in the cart
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ category, id, name, price, quantity: 1 });
            }
            updateCartDisplay();
        });
    });

    // Open cart modal
    cartLink.addEventListener("click", function(e) {
        e.preventDefault();
        cartModal.style.display = 'flex';
    });

    // Close cart modal
    closeCartButton.addEventListener("click", function() {
        cartModal.style.display = 'none';
    });

    // Increase item quantity in cart
    cartItemsList.addEventListener("click", function(e) {
        if (e.target.classList.contains("increase-quantity")) {
            const itemId = e.target.dataset.id;
            const item = cart.find(item => item.id === itemId);
            if (item) {
                item.quantity++;
                updateCartDisplay();
            }
        }
    });

    // Decrease item quantity in cart
    cartItemsList.addEventListener("click", function(e) {
        if (e.target.classList.contains("decrease-quantity")) {
            const itemId = e.target.dataset.id;
            const item = cart.find(item => item.id === itemId);
            if (item) {
                item.quantity--;
                if (item.quantity === 0) {
                    // Remove item from cart if quantity is 0
                    cart = cart.filter(item => item.id !== itemId);
                }
                updateCartDisplay();
            }
        }
    });

    // Apply promo code
    applyPromoButton.addEventListener("click", function() {
        const enteredCode = promoCodeInput.value.trim();

        if (promoCodeApplied) {
            promoMessage.textContent = "Promo code already redeemed.";
            promoMessage.style.color = "red";
        } else if (enteredCode ==="home") {
            discountApplied = true;
            promoCodeApplied = true;
            promoMessage.textContent = "Promo code applied! 10% off.";
            promoMessage.style.color = "green";
            updateCartDisplay();
        } else {
            promoMessage.textContent = "Invalid promo code.";
            promoMessage.style.color = "red";
        }
    });

    // Handle checkout
    checkoutButton.addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add items before checking out.");
            return;
        }

        // Display the order placed message as an alert
        alert("Your order has been placed successfully!");

        // Clear the cart after order is placed
        cart = [];
        updateCartDisplay();

        // Close the cart modal
        cartModal.style.display = 'none';

        // Reset promo code state
        promoCodeApplied = false;
        discountApplied = false;
        promoMessage.textContent = '';
        promoMessage.style.color = 'black';
        promoCodeInput.value = '';  // Clear the promo code input
    });
});
let lastScrollTop = 0; // To track the last scroll position
let navbar = document.querySelector('.navbar'); // Get the navbar element

// Function to hide/show navbar based on scroll direction
function handleScroll() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // If scrolling down, hide the navbar
    if (currentScroll > lastScrollTop) {
        navbar.style.top = '-60px'; // Hide the navbar (adjust height as needed)
    } else {
        // If scrolling up, show the navbar
        navbar.style.top = '0';
    }
    
    // Update last scroll position to the current position
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

// Listen to scroll events
window.addEventListener('scroll', handleScroll);

// Show navbar when mouse moves
document.addEventListener('mousemove', function() {
    navbar.style.top = '0'; // Show the navbar on mouse move
});

// You can adjust the value of the navbar's top position (e.g., -60px) based on your navbar height

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navbarMenu = document.querySelector(".navbar-links");

hamburgerMenu.addEventListener("click", function() {
    navbarMenu.classList.toggle("active"); // Toggle visibility
});
