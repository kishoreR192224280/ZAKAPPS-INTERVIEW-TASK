document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       ELEMENT REFERENCES
    ================================== */
    const modal = document.getElementById("quickViewModal");
    const closeBtn = document.querySelector(".close-quickview");

    const mainImg = document.getElementById("quickViewMainImg");
    const thumbList = document.getElementById("qv-thumbs");

    const qvTitle = document.getElementById("qv-title");
    const qvRating = document.getElementById("qv-rating");
    const qvStock = document.getElementById("qv-stock");
    const qvOldPrice = document.getElementById("qv-oldprice");
    const qvNewPrice = document.getElementById("qv-newprice");
    const qvDiscount = document.getElementById("qv-discount");
    const qvDesc = document.getElementById("qv-desc");
    const qvCategory = document.getElementById("qv-category");
    const qvTags = document.getElementById("qv-tags");

    const qtyText = document.getElementById("qv-qty");
    const qtyMinus = document.querySelector(".qty-minus");
    const qtyPlus = document.querySelector(".qty-plus");

    const btnAddCart = document.getElementById("qv-addcart");

    /* ================================
       OPEN QUICKVIEW
    ================================== */

    // If you want Quickview only on a button, replace selector:
    // document.querySelectorAll(".quickview-btn").forEach(btn => { ... });

card.addEventListener("click", () => {
    quickViewModal.style.display = "flex";
});

    function openQuickView(card) {
        modal.style.display = "flex";

        /* Read product data */
        const data = card.dataset;

        qvTitle.textContent = data.title;
        qvDesc.textContent = data.desc;
        qvCategory.textContent = data.category;
        qvTags.textContent = data.tags;

        qvOldPrice.textContent = `$${data.priceOld}`;
        qvNewPrice.textContent = `$${data.priceNew}`;
        qvDiscount.textContent = data.discount;

        qvRating.innerHTML = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

        qvStock.textContent = data.stock;
        qvStock.classList.toggle("in-stock", data.stock === "In Stock");

        /* Reset quantity */
        qtyText.textContent = "1";

        /* Load images */
        const images = JSON.parse(data.images);
        mainImg.src = images[0];

        thumbList.innerHTML = "";
        images.forEach((src, i) => {
            let t = document.createElement("img");
            t.src = src;
            if (i === 0) t.classList.add("active");

            t.addEventListener("click", () => {
                document.querySelectorAll("#qv-thumbs img").forEach(el => el.classList.remove("active"));
                t.classList.add("active");
                mainImg.src = src;
            });

            thumbList.appendChild(t);
        });
    }

    /* ================================
       CLOSE QUICKVIEW
    ================================== */

    closeBtn.addEventListener("click", () => modal.style.display = "none");

    modal.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });

    /* ================================
       QUANTITY CONTROL
    ================================== */
    qtyMinus.addEventListener("click", () => {
        let val = parseInt(qtyText.textContent);
        if (val > 1) qtyText.textContent = val - 1;
    });

    qtyPlus.addEventListener("click", () => {
        let val = parseInt(qtyText.textContent);
        qtyText.textContent = val + 1;
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".cart-btn, .qv-addcart");

    cartButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // ⛔ Stop opening quick view
        });
    });
});
