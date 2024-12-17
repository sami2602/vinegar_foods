// Navbar hide and show logic based on scroll and inactivity
let lastScrollTop = 0;
let navbar = document.getElementById("navbar");
let navbarHeight = navbar.offsetHeight;
let inactivityTimeout;

// Function to hide the navbar
function hideNavbar() {
    navbar.style.top = `-${navbarHeight}px`; // Hide navbar above the screen
}

// Function to show the navbar
function showNavbar() {
    navbar.style.top = "0"; // Show navbar
}

// Detect scroll event
window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show or hide the navbar based on scroll direction
    if (scrollTop > lastScrollTop) {
        // Scrolling down, hide navbar
        hideNavbar();
    } else {
        // Scrolling up, show navbar
        showNavbar();
    }

    // Update last scroll position
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Reset inactivity timer when scrolling
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(hideNavbar, 1000); // Hide navbar after 1 seconds of inactivity
});

// Detect mouse movement to show navbar and reset inactivity timer
document.addEventListener("mousemove", function (event) {
    if (event.clientY < 50) {
        showNavbar(); // Show navbar when mouse is near the top
    }

    // Reset inactivity timer whenever the mouse is moved
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(hideNavbar, 3000); // Hide navbar after 3 seconds of inactivity
});

