document.addEventListener("DOMContentLoaded", () => {

    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    // Load saved cart count
    let cartValue = parseInt(localStorage.getItem("cartValue")) || 0;
    cartCount.textContent = cartValue;

    // Update Cart Function (NO REDIRECT)
    function updateCart() {
        cartValue++;
        cartCount.textContent = cartValue;
        localStorage.setItem("cartValue", cartValue);

        // Small bump animation
        cartCount.classList.add("cart-bump");
        setTimeout(() => cartCount.classList.remove("cart-bump"), 300);
    }

    // Product Card Cart Buttons
    document.querySelectorAll(".cart-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent triggering card click
            updateCart();
        });
    });

    // Quick View Cart Button (if exists)
    const qvAddCart = document.querySelector(".qv-addcart");
    if (qvAddCart) {
        qvAddCart.addEventListener("click", updateCart);
    }

});
document.addEventListener("DOMContentLoaded", () => {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) return;

    let cartValue = parseInt(localStorage.getItem("cartValue")) || 0;
    cartCount.textContent = cartValue;

    // ✔ Increase Cart ONLY (For product card buttons)
    function addToCartOnly() {
        cartValue++;
        cartCount.textContent = cartValue;
        localStorage.setItem("cartValue", cartValue);

        // Bump animation
        cartCount.classList.add("cart-bump");
        setTimeout(() => cartCount.classList.remove("cart-bump"), 300);
    }

    // ✔ Redirect ONLY (For top header big cart icon)
    function goToPurchasePage() {
        window.location.href = "purchase.html";
    }

    // ============================
    // PRODUCT CARD CART BUTTONS
    // ============================
    document.querySelectorAll(".product-card .cart-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            addToCartOnly();     // ✔ Only increase count
        });
    });

    // ============================
    // TOP NAV BAR CART ICON
    // ============================
    const headerCart = document.querySelector(".icon-box.cart");

    if (headerCart) {
        headerCart.addEventListener("click", (e) => {
            e.stopPropagation();
            goToPurchasePage();   // ✔ Only redirect
        });
    }

});
