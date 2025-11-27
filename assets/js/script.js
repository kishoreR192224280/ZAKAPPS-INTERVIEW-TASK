// MAIN SCRIPT (cleaned, merged, optimized)
document.addEventListener("DOMContentLoaded", () => {
    console.info("[script] DOMContentLoaded");

    /* ---------------- SAFE SELECTORS ---------------- */
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));


    /* ---------------- QUICK VIEW ---------------- */
    const quickViewModal = $("#quickViewModal");
    const closeQuickView = $(".close-quickview");

    if (quickViewModal) {
        console.info("[QuickView] Modal ready");
    } else {
        console.warn("[QuickView] #quickViewModal missing");
    }

    const productCards = $$(".product-card");
    if (productCards.length) {
        console.info(`[QuickView] ${productCards.length} product cards found`);

        productCards.forEach(card => {
            card.addEventListener("click", () => {
                if (quickViewModal) quickViewModal.style.display = "flex";
                console.info("[QuickView] opened");
            });
        });
    }

    if (closeQuickView) {
        closeQuickView.addEventListener("click", () => {
            if (quickViewModal) quickViewModal.style.display = "none";
            console.info("[QuickView] closed (button)");
        });
    }

    window.addEventListener("click", (e) => {
        if (quickViewModal && e.target === quickViewModal) {
            quickViewModal.style.display = "none";
            console.info("[QuickView] closed (overlay)");
        }
    });


    /* ---------------- FILTERS ---------------- */
    const activeFiltersContainer = $("#activeFilters");
    const filterList = $("#filterList");

    const filters = { category: "", price: "", rating: "" };

    function updateFilterUI() {
        if (!filterList || !activeFiltersContainer) return;

        filterList.innerHTML = "";

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                const tag = document.createElement("div");
                tag.className = "filter-tag";
                tag.innerHTML = `${value} <span data-filter="${key}">×</span>`;
                filterList.appendChild(tag);
            }
        });

        activeFiltersContainer.style.display =
            Object.values(filters).some(v => v) ? "flex" : "none";
    }

    const categoryFilter = $("#categoryFilter");
    const priceFilter = $("#priceFilter");
    const ratingFilter = $("#ratingFilter");

    if (categoryFilter) {
        categoryFilter.addEventListener("change", (e) => {
            filters.category = e.target.value || "";
            updateFilterUI();
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener("change", (e) => {
            filters.price = e.target.value || "";
            updateFilterUI();
        });
    }

    if (ratingFilter) {
        ratingFilter.addEventListener("change", (e) => {
            filters.rating = e.target.value ? e.target.value + " ★" : "";
            updateFilterUI();
        });
    }

    if (filterList) {
        filterList.addEventListener("click", (e) => {
            if (e.target.tagName === "SPAN") {
                const key = e.target.dataset.filter;
                filters[key] = "";

                const drop = document.getElementById(key + "Filter");
                if (drop) drop.value = "";

                updateFilterUI();
            }
        });
    }


    /* ---------------- SHOP NOW BUTTON ---------------- */
    const shopBtn = $(".shop-btn");
    if (shopBtn) {
        shopBtn.addEventListener("click", () => {
            window.location.href = "product.html";
        });
    }


    /* ---------------- HEADER SCROLL ---------------- */
    const header = $(".header");
    window.addEventListener("scroll", () => {
        if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    });


    /* ---------------- CART REDIRECTS ---------------- */

    // For product.html (you used "mainCart")
    const mainCart = $("#mainCart");
    if (mainCart) {
        mainCart.addEventListener("click", () => {
            window.location.href = "purchase.html";
        });
    }

    // For index.html header cart
    const checkoutCart = $("#goToCheckout");
    if (checkoutCart) {
        checkoutCart.style.cursor = "pointer";
        checkoutCart.addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    }

    /* ---------------- FINAL LOG ---------------- */
    console.info("[script] All components initialized");
});
/*product click */
document.addEventListener("DOMContentLoaded", () => {
    const productImages = document.querySelectorAll(".product-card .product-img img");

    productImages.forEach(img => {
        img.style.cursor = "pointer"; // show click cursor

        img.addEventListener("click", () => {
            window.location.href = "purchase.html";
        });
    });
});
