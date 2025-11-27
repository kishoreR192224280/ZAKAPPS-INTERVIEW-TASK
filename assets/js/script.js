// DEBUG-FRIENDLY MAIN SCRIPT
document.addEventListener("DOMContentLoaded", () => {
    console.info("[script] DOMContentLoaded");

    // Helper: safe query
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    /* ---------------- QUICK VIEW ---------------- */
    const quickViewModal = document.getElementById("quickViewModal");
    const closeQuickView = $(".quickview-close"); // matches your markup

    if (quickViewModal) {
        console.info("[QuickView] modal found");
    } else {
        console.warn("[QuickView] #quickViewModal not found");
    }

    // open quick view when product-card clicked
    const productCards = $$(".product-card");
    if (productCards.length) {
        console.info(`[QuickView] ${productCards.length} product-card(s) found`);
        productCards.forEach(card => {
            card.addEventListener("click", (e) => {
                e.stopPropagation();
                if (quickViewModal) {
                    quickViewModal.style.display = "flex";
                    console.info("[QuickView] opened by product-card click");
                }
            });
        });
    } else {
        console.info("[QuickView] no .product-card elements found (ok if none)");
    }

    // close btn
    if (closeQuickView) {
        closeQuickView.addEventListener("click", () => {
            if (quickViewModal) quickViewModal.style.display = "none";
            console.info("[QuickView] closed (button)");
        });
    } else {
        console.warn("[QuickView] .quickview-close not found");
    }

    // click outside to close
    window.addEventListener("click", (e) => {
        if (quickViewModal && e.target === quickViewModal) {
            quickViewModal.style.display = "none";
            console.info("[QuickView] closed (overlay click)");
        }
    });


    /* ---------------- FILTERS ---------------- */
    const activeFiltersContainer = document.getElementById("activeFilters");
    const filterList = document.getElementById("filterList");

    if (!filterList || !activeFiltersContainer) {
        console.warn("[Filters] activeFilters or filterList missing — filter UI will be disabled");
    } else {
        console.info("[Filters] UI containers found");
    }

    const filters = { category: "", price: "", rating: "" };

    function updateFilterUI() {
        if (!filterList || !activeFiltersContainer) return;
        filterList.innerHTML = "";
        Object.entries(filters).forEach(([k, v]) => {
            if (v) {
                const tag = document.createElement("div");
                tag.className = "filter-tag";
                tag.innerHTML = `${v} <span data-filter="${k}">×</span>`;
                filterList.appendChild(tag);
            }
        });
        const show = Object.values(filters).some(x => x);
        activeFiltersContainer.style.display = show ? "flex" : "none";
        console.info("[Filters] updated", JSON.parse(JSON.stringify(filters)));
    }

    // attach dropdowns safely
    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");

    if (categoryFilter) {
        categoryFilter.addEventListener("change", (e) => {
            filters.category = e.target.value || "";
            updateFilterUI();
        });
    } else console.info("[Filters] #categoryFilter not found");

    if (priceFilter) {
        priceFilter.addEventListener("change", (e) => {
            filters.price = e.target.value || "";
            updateFilterUI();
        });
    } else console.info("[Filters] #priceFilter not found");

    if (ratingFilter) {
        ratingFilter.addEventListener("change", (e) => {
            filters.rating = e.target.value ? e.target.value + " ★" : "";
            updateFilterUI();
        });
    } else console.info("[Filters] #ratingFilter not found");

    // remove tag (delegation)
    if (filterList) {
        filterList.addEventListener("click", (e) => {
            if (e.target && e.target.tagName === "SPAN") {
                const key = e.target.dataset.filter;
                if (key && key in filters) {
                    filters[key] = "";
                    const drop = document.getElementById(key + "Filter");
                    if (drop) drop.value = "";
                    updateFilterUI();
                    console.info("[Filters] removed", key);
                }
            }
        });
    }


    /* ---------------- SHOP NOW ---------------- */
    const shopBtn = $(".shop-btn");
    if (shopBtn) {
        shopBtn.addEventListener("click", () => {
            console.info("[Shop] shop-btn clicked → redirect to product.html");
            window.location.href = "product.html";
        });
    } else {
        console.warn("[Shop] .shop-btn not found");
    }


    /* ---------------- HEADER SCROLL ---------------- */
    const header = $(".header");
    window.addEventListener("scroll", () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 10);
    });


    /* --------------- FINAL LOG --------------- */
    console.info("[script] initialization complete");
});
