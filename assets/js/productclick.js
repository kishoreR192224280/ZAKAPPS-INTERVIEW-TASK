document.addEventListener("DOMContentLoaded", () => {
    const productImages = document.querySelectorAll(".product-card .product-img img");

    productImages.forEach(img => {
        img.addEventListener("click", () => {
            const card = img.closest(".product-card");

            const productData = {
                title: card.dataset.title,
                oldPrice: card.dataset.priceOld,
                newPrice: card.dataset.priceNew,
                discount: card.dataset.discount,
                rating: card.dataset.rating,
                stock: card.dataset.stock,
                desc: card.dataset.desc,
                category: card.dataset.category,
                tags: card.dataset.tags,
                images: JSON.parse(card.dataset.images)
            };

            localStorage.setItem("selectedProduct", JSON.stringify(productData));

            window.location.href = "purchase.html";
        });
    });
});
