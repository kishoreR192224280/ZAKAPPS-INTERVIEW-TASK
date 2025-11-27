document.querySelectorAll(".product-card").forEach(card => {

    const title = card.dataset.title;
    const priceNew = parseFloat(card.dataset.priceNew).toFixed(2);
    const priceOld = parseFloat(card.dataset.priceOld).toFixed(2);
    const rating = parseInt(card.dataset.rating);

    const productInfo = card.querySelector(".product-info");

    // Generate star rating dynamically
    let stars = "";
    for (let i = 0; i < rating; i++) stars += "★";
    for (let i = rating; i < 5; i++) stars += "☆";

    productInfo.innerHTML = `
        <h4 class="p-title">${title}</h4>
        <p class="price">
            <span class="new-price">$${priceNew}</span>
            <span class="old-price">$${priceOld}</span>
        </p>
        <div class="rating">${stars}</div>
    `;
});
