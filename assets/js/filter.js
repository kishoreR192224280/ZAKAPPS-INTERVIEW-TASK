// ======== SELECT ELEMENTS =========
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const ratingFilter = document.getElementById("ratingFilter");

const activeFilters = document.getElementById("activeFilters");
const filterList = document.getElementById("filterList");

const productCards = document.querySelectorAll(".product-card");

// TRACK ACTIVE FILTERS
let filters = {
    category: "",
    price: "",
    rating: ""
};


// ======== APPLY FILTERS =========
function applyFilters() {

    productCards.forEach(card => {
        let show = true;

        // Category Filter
        if (filters.category !== "" && card.dataset.category !== filters.category) {
            show = false;
        }

        // Price Filter
        if (filters.price !== "") {
            const [min, max] = filters.price.split(" - ").map(Number);
            const price = parseFloat(card.dataset.priceNew);

            if (price < min || price > max) show = false;
        }

        // Rating Filter
        if (filters.rating !== "") {
            const cardRating = card.dataset.rating.length; // ★★★★☆
            const required = parseInt(filters.rating);

            if (cardRating < required) show = false;
        }

        card.style.display = show ? "block" : "none";
    });

    updateActiveFilterTags();
}


// ========= UPDATE ACTIVE FILTER TAGS =========
function updateActiveFilterTags() {

    filterList.innerHTML = ""; // Clear tags

    Object.keys(filters).forEach(key => {
        if (filters[key] !== "") {

            const tag = document.createElement("div");
            tag.classList.add("filter-tag");
            tag.innerHTML = `
                ${filters[key]}
                <span data-key="${key}">&times;</span>
            `;

            // Remove filter on X click
            tag.querySelector("span").addEventListener("click", (e) => {
                let field = e.target.dataset.key;
                filters[field] = "";

                // Reset dropdown
                if (field === "category") categoryFilter.value = "";
                if (field === "price") priceFilter.value = "";
                if (field === "rating") ratingFilter.value = "";

                applyFilters();
            });

            filterList.appendChild(tag);
        }
    });

    // Show or hide container
    activeFilters.style.display = (filterList.children.length > 0) ? "flex" : "none";
}


// ========= FILTER CHANGE EVENTS =========
categoryFilter.addEventListener("change", () => {
    filters.category = categoryFilter.value;
    applyFilters();
});

priceFilter.addEventListener("change", () => {
    filters.price = priceFilter.value;
    applyFilters();
});

ratingFilter.addEventListener("change", () => {
    filters.rating = ratingFilter.value;
    applyFilters();
});


// INITIAL LOAD
applyFilters();
