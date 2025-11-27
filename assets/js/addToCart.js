document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       UPDATE CART COUNT (GLOBAL)
    --------------------------*/
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const total = cart.reduce((sum, item) => sum + item.qty, 0);

        const countEl = document.getElementById("cartCount");
        if (countEl) countEl.textContent = total;
    }

    updateCartCount(); // Run on page load



    /* -------------------------
       ADD TO CART (PRODUCT CARDS)
    --------------------------*/
    const productCardButtons = document.querySelectorAll(".cart-btn");

    productCardButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {

            e.preventDefault();
            e.stopPropagation(); // prevents quickview opening

            const card = btn.closest(".product-card");
            if (!card) return;

            const item = {
                title: card.dataset.title,
                price: parseFloat(card.dataset.priceNew || 0),
                image: card.querySelector(".product-img img").src,
                qty: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let exist = cart.find(p => p.title === item.title);

            if (exist) {
                exist.qty++;
            } else {
                cart.push(item);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });




    /* -------------------------
       ADD TO CART (PURCHASE PAGE)
    --------------------------*/
    const purchaseAddBtn = document.querySelector(".btn-cart");

    if (purchaseAddBtn) {
        purchaseAddBtn.addEventListener("click", () => {

            const title = document.querySelector(".product-info h1")?.textContent.trim();
            const price = parseFloat(document.querySelector(".price-new")?.textContent.replace("$", "").trim());
            const image = document.getElementById("mainImage")?.src;

            if (!title || !price || !image) return;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let exist = cart.find(p => p.title === title);

            if (exist) {
                exist.qty++;
            } else {
                cart.push({ title, price, image, qty: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();

            // Optional toast
            // alert("Added to cart!");
        });
    }

});
