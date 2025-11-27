let cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("orderItems");
const summarySubtotal = document.getElementById("summarySubtotal");
const summaryTotal = document.getElementById("summaryTotal");

function loadOrder() {
    orderItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        let total = item.qty * item.price;
        subtotal += total;

        orderItems.innerHTML += `
            <div class="order-item">
                <div style="display:flex;align-items:center;">
                    <img src="${item.image}">
                    <span>${item.title} &nbsp; x${item.qty}</span>
                </div>
                <strong>$${total.toFixed(2)}</strong>
            </div>
        `;
    });

    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    summaryTotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Place Order
document.getElementById("placeOrderBtn").addEventListener("click", () => {
    alert("Order Placed Successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});

loadOrder();
