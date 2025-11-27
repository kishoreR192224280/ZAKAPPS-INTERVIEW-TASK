// Dummy product data
let products = [
    { id: 1, name: "Smart Watch", price: 1999, rating: 4, category: "Electronics", image: "images/watch.jpg" },
    { id: 2, name: "Headphones", price: 1499, rating: 5, category: "Electronics", image: "images/headphones.jpg" },
    { id: 3, name: "Sneakers", price: 2499, rating: 3, category: "Fashion", image: "images/shoes.jpg" },
    { id: 4, name: "Backpack", price: 999, rating: 4, category: "Accessories", image: "images/bag.jpg" },
    { id: 5, name: "Shirt", price: 799, rating: 2, category: "Fashion", image: "images/shirt.jpg" }
];

const productList = document.getElementById("productList");
const ratingFilter = document.getElementById("ratingFilter");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");

// Load products initially
displayProducts(products);

// Display product items
function displayProducts(list) {
    productList.innerHTML = "";

    list.forEach(product => {
        const div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p class="product-title">${product.name}</p>
            <p class="product-price">₹${product.price}</p>
            <p>⭐ ${product.rating}</p>
        `;

        div.addEventListener("click", () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        });

        productList.appendChild(div);
    });
}

// Apply filters + sorting
function applyFilters() {
    let filtered = [...products];

    // Rating filter
    if (ratingFilter.value) {
        filtered = filtered.filter(p => p.rating >= Number(ratingFilter.value));
    }

    // Category filter
    if (categoryFilter.value) {
        filtered = filtered.filter(p => p.category === categoryFilter.value);
    }

    // Sorting
    if (sortBy.value === "lowHigh") {
        filtered.sort((a, b) => a.price - b.price);
    }
    else if (sortBy.value === "highLow") {
        filtered.sort((a, b) => b.price - a.price);
    }
    else if (sortBy.value === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(filtered);
}

// Event listeners
ratingFilter.addEventListener("change", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortBy.addEventListener("change", applyFilters);
