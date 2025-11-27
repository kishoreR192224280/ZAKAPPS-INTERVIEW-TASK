// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartItems");
const summarySubtotal = document.getElementById("summarySubtotal");
const summaryTotal = document.getElementById("summaryTotal");
const cartCount = document.getElementById("cartCount");

// Update header cart count
function updateHeaderCartCount() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = total;
}

// Render cart items into checkout table
function renderCart() {
    cartContainer.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="padding:30px; text-align:center; width:100%;">
                <h3>Your cart is empty 😔</h3>
                <a href="product.html" style="
                    display:inline-block;
                    margin-top:15px;
                    padding:12px 25px;
                    background:#00a149;
                    color:#fff;
                    border-radius:30px;">
                    Shop Now
                </a>
            </div>
        `;
        summarySubtotal.textContent = "$0.00";
        summaryTotal.textContent = "$0.00";
        updateHeaderCartCount();
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <div class="item-info">
                    <img src="${item.image}">
                    <span>${item.title}</span>
                </div>

                <span>$${item.price.toFixed(2)}</span>

                <div class="qty-box">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>

                <span>$${itemTotal.toFixed(2)}</span>

                <span class="remove-btn" onclick="removeItem(${index})">×</span>
            </div>
        `;
    });

    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    summaryTotal.textContent = `$${subtotal.toFixed(2)}`;

    localStorage.setItem("cart", JSON.stringify(cart));
    updateHeaderCartCount();
}

// Change quantity
function changeQty(index, amount) {
    cart[index].qty += amount;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Proceed Button
document.getElementById("proceedBtn").addEventListener("click", () => {
    window.location.href = "payment.html";
});

// Init
renderCart();
updateHeaderCartCount();
