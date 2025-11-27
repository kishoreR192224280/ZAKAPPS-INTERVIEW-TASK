document.addEventListener("DOMContentLoaded", () => {

    const products = [...document.querySelectorAll(".product-card")];

    const categoryFilter = document.getElementById("categoryFilter");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const sortFilter = document.getElementById("sortFilter");
    const showFilter = document.getElementById("showFilter");

    function filterProducts() {
        let filtered = [...products];

        let category = categoryFilter.value;
        let price = priceFilter.value;
        let rating = ratingFilter.value;
        let sort = sortFilter.value;
        let showCount = parseInt(showFilter.value);

        // CATEGORY FILTER
        if (category) {
            filtered = filtered.filter(p => p.dataset.category === category);
        }

        // PRICE FILTER
        if (price) {
            let [min, max] = price.split(" - ").map(Number);
            filtered = filtered.filter(p => {
                let pr = parseFloat(p.dataset.priceNew);
                return pr >= min && pr <= max;
            });
        }

        // RATING FILTER
        if (rating) {
            let minRating = parseFloat(rating);
            filtered = filtered.filter(p => parseFloat(p.dataset.rating) >= minRating);
        }

        // SORT FILTER
        if (sort === "low-high") {
            filtered.sort((a, b) => parseFloat(a.dataset.priceNew) - parseFloat(b.dataset.priceNew));
        }
        else if (sort === "high-low") {
            filtered.sort((a, b) => parseFloat(b.dataset.priceNew) - parseFloat(a.dataset.priceNew));
        }

        // LIMIT (SHOW X)
        filtered = filtered.slice(0, showCount);

        // CLEAR GRID
        const grid = document.querySelector(".product-grid");
        grid.innerHTML = "";

        // RE-ADD FILTERED ITEMS
        filtered.forEach(p => grid.appendChild(p));
    }

    // EVENT LISTENERS
    categoryFilter.addEventListener("change", filterProducts);
    priceFilter.addEventListener("change", filterProducts);
    ratingFilter.addEventListener("change", filterProducts);
    sortFilter.addEventListener("change", filterProducts);
    showFilter.addEventListener("change", filterProducts);

});
