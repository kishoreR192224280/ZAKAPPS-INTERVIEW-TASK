/* -------------------- CHANGE MAIN IMAGE -------------------- */
function changeImage(img) {
    const mainImage = document.getElementById("mainImage");
    if (mainImage) {
        mainImage.src = img.src;
    }
}

/* -------------------- TAB SWITCHING -------------------- */
function openTab(evt, tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-btn");

    tabs.forEach(t => t.classList.remove("active"));
    buttons.forEach(b => b.classList.remove("active"));

    const targetTab = document.getElementById(tabName);
    if (targetTab) targetTab.classList.add("active");

    evt.target.classList.add("active");
}

/* -------------------- BUY NOW POPUP -------------------- */
document.addEventListener("DOMContentLoaded", function () {

    const buyBtn = document.querySelector(".btn-buy");
    const popup = document.getElementById("successPopup");
    const closeBtn = document.querySelector(".popup-close");
    const popupBox = document.querySelector(".popup-box");

    /* OPEN POPUP */
    if (buyBtn && popup) {
        buyBtn.addEventListener("click", function () {

            // Show popup
            popup.style.display = "flex";

            // Start confetti
            launchConfetti();

            // Cleanup confetti after animation ends
            setTimeout(() => {
                const oldConfetti = popupBox.querySelectorAll(".confetti");
                oldConfetti.forEach(el => el.remove());
            }, 2000);

        });
    }

    /* CLOSE POPUP (BUTTON) */
    if (closeBtn && popup) {
        closeBtn.addEventListener("click", function () {
            popup.style.display = "none";
        });
    }

    /* CLOSE WHEN CLICKING OUTSIDE POPUP */
    if (popup) {
        popup.addEventListener("click", function (e) {
            if (e.target === popup) popup.style.display = "none";
        });
    }

});

/* -------------------- CONFETTI FUNCTION -------------------- */
function launchConfetti() {
    const popup = document.querySelector(".popup-box");

    for (let i = 0; i < 35; i++) {
        const conf = document.createElement("div");
        conf.classList.add("confetti");

        // Random position + color
        conf.style.setProperty("--left", Math.random() * 100 + "%");
        conf.style.setProperty("--color",
            ["#ffcc00", "#ff4444", "#00c2ff", "#3BB77E", "#ff66c4"][Math.floor(Math.random() * 5)]
        );

        popup.appendChild(conf);

        // Remove after falling
        setTimeout(() => conf.remove(), 1800);
    }
}
document.addEventListener("DOMContentLoaded", () => {

    const data = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!data) return;

    // MAIN IMAGE
    const mainImage = document.getElementById("mainImage");
    mainImage.src = data.images[0];

    // THUMBNAILS
    const thumbRow = document.querySelector(".thumbnail-row");
    thumbRow.innerHTML = "";

    data.images.forEach(img => {
        const el = document.createElement("img");
        el.src = img;
        el.classList.add("thumb");

        el.addEventListener("click", () => {
            mainImage.src = img;
        });

        thumbRow.appendChild(el);
    });

    // PRODUCT INFO
    document.querySelector(".product-info h1").textContent = data.title;
    document.querySelector(".rating").textContent = "★★★★☆ (" + data.rating + ")";
    document.querySelector(".price-new").textContent = "$" + data.newPrice;
    document.querySelector(".price-old").textContent = "$" + data.oldPrice;
    document.querySelector(".in-stock").textContent = data.stock;
    document.querySelector(".product-info p").textContent = data.desc;

    // META
    document.querySelector(".meta p:nth-child(1) span").textContent = data.category;
    document.querySelector(".meta p:nth-child(2) span").textContent = data.tags;
});
