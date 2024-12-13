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
    inactivityTimeout = setTimeout(hideNavbar, 1000); // Hide navbar after 5 seconds of inactivity
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


// Review carousel logic
let reviewsContainer = document.querySelector(".reviews");
let reviews = document.querySelectorAll(".review");
let currentIndex = 0;
let totalReviews = reviews.length;
let reviewsToShow = window.innerWidth <= 768 ? 1 : 3; // 1 review for mobile, 3 for desktop

// Function to change the reviews
function changeReviews() {
  // Move the first review to the last position (creating a sliding effect)
  reviewsContainer.appendChild(reviews[0]);

  // Reset the transform property (remove the current sliding effect)
  reviewsContainer.style.transition = 'none';
  reviewsContainer.style.transform = 'translateX(0)';

  // Force reflow to reset the transition
  reviewsContainer.offsetHeight; // triggers reflow

  // Set the transition again (for the next auto-change)
  setTimeout(() => {
    reviewsContainer.style.transition = `transform ${intervalTime / 1000}s ease-in-out`;
    reviewsContainer.style.transform = `translateX(-${(100 / reviewsToShow)}%)`; // Slide left
  }, 10); // tiny delay before starting the transition

  // Update the reviews array after the change
  reviews = document.querySelectorAll(".review");
}

// Set timing intervals based on screen size
let intervalTime = window.innerWidth <= 768 ? 1000 : 3000; // 1 second for mobile, 3 seconds for desktop

// Start interval for auto-changing reviews
setInterval(changeReviews, intervalTime);

// Reset the interval when the window is resized (for responsive behavior)
window.addEventListener("resize", function () {
  reviewsToShow = window.innerWidth <= 768 ? 1 : 3;
  intervalTime = window.innerWidth <= 768 ? 1000 : 3000;
});

