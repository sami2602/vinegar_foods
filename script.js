
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        navbar.style.top = "-60px";
    } else {
        navbar.style.top = "0";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

navbar.addEventListener("mouseenter", function () {
    navbar.style.top = "0";
});

navbar.addEventListener("mouseleave", function () {
    if (window.pageYOffset > 0) {
        navbar.style.top = "-60px";
    }
});


hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


const menuItems = [
    {
        title: "Menu 1",
        description: "Tasty Dish 1",
        img: "https://via.placeholder.com/300x200"
    },
    {
        title: "Menu 2",
        description: "Delicious Dish 2",
        img: "https://via.placeholder.com/300x200"
    },
    {
        title: "Menu 3",
        description: "Delicious Dish 3",
        img: "https://via.placeholder.com/300x200"
    },
    {
        title: "Menu 4",
        description: "Delicious Dish 4",
        img: "https://via.placeholder.com/300x200"
    },
    {
        title: "Menu 5",
        description: "Delicious Dish 5",
        img: "https://via.placeholder.com/300x200"
    },
    {
        title: "Menu 6",
        description: "Delicious Dish 6",
        img: "https://via.placeholder.com/300x200"
    },
    {
        title: "Menu 7",
        description: "Delicious Dish 7",
        img: "https://via.placeholder.com/300x200"
    },
    {
        title: "Menu 8",
        description: "Delicious Dish 8",
        img: "https://via.placeholder.com/300x200"
    },
    {
        title: "Menu 9",
        description: "Delicious Dish 9",
        img: "https://via.placeholder.com/300x200"
    },


];

const menuCarousel = document.querySelector(".menu-carousel");

menuItems.forEach(item => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
    `;

    menuCarousel.appendChild(menuItem);
});


const delicacyList = document.getElementById("delicacy-list");
const delicacies = [
    { name: "Delicacy 1", description: "Delicious food from region 1", img: "https://via.placeholder.com/300x200" },
    { name: "Delicacy 2", description: "Delicious food from region 2", img: "https://via.placeholder.com/300x200" },
    
];

function loadDelicacies() {
    delicacies.forEach(delicacy => {
        const item = document.createElement("div");
        item.classList.add("delicacy-item");
        item.innerHTML = `
            <img src="${delicacy.img}" alt="${delicacy.name}">
            <h3>${delicacy.name}</h3>
            <p>${delicacy.description}</p>
        `;
        delicacyList.appendChild(item);
    });
}

function filterDelicacies() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = delicacies.filter(delicacy => 
        delicacy.name.toLowerCase().includes(query) || 
        delicacy.description.toLowerCase().includes(query)
    );
    delicacyList.innerHTML = "";
    filtered.forEach(delicacy => {
        const item = document.createElement("div");
        item.classList.add("delicacy-item");
        item.innerHTML = `
            <img src="${delicacy.img}" alt="${delicacy.name}">
            <h3>${delicacy.name}</h3>
            <p>${delicacy.description}</p>
        `;
        delicacyList.appendChild(item);
    });
}


loadDelicacies();
