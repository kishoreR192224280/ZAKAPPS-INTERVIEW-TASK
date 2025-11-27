document.addEventListener("DOMContentLoaded", () => {
    fetch("navbar.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("globalHeader").innerHTML = data;

            // Re-run cart count & click listeners after injecting header
            if (typeof updateHeaderCartCount === "function") {
                updateHeaderCartCount();
            }

            const checkoutCart = document.getElementById("goToCheckout");
            if (checkoutCart) {
                checkoutCart.addEventListener("click", () => {
                    window.location.href = "checkout.html";
                });
            }
        });
});
