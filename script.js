// UNDERDAWGS Script – Final Functional Version

const cartButton = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];

// Add to Cart
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", (event) => {
    const hoodie = event.target.closest(".hoodie");
    const name = hoodie.querySelector("h3").textContent;
    const price = parseInt(hoodie.querySelector("p").textContent.replace("₹", ""));
    const size = hoodie.querySelector("select").value;

    const item = { name, price, size };
    cart.push(item);
    updateCart();
  });
});

// Open Cart
cartButton.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

// Close Cart
closeCartBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Update Cart UI
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (${item.size}) - ₹${item.price}
      <button onclick="removeItem(${index})">✖</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

// Remove Item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Open checkout form dynamically
  document.body.innerHTML = `
    <div class="checkout">
      <h2>Checkout</h2>
      <form action="https://formspree.io/f/movpedod" method="POST">
        <input type="text" name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="text" name="address" placeholder="Delivery Address" required />
        <input type="text" name="phone" placeholder="Mobile Number" required />
        <input type="hidden" name="cart" value='${JSON.stringify(cart)}' />
        <button type="submit">Place Order</button>
      </form>
    </div>
  `;
});

// --- Coming Soon (T-shirts) ---
const notifyModal = document.getElementById("notify-modal");
const notifyBtn = document.getElementById("notify-btn");
const closeNotify = document.getElementById("close-notify");
const notifyForm = document.getElementById("notify-form");

if (notifyBtn) {
  notifyBtn.addEventListener("click", () => {
    notifyModal.classList.remove("hidden");
  });
}

if (closeNotify) {
  closeNotify.addEventListener("click", () => {
    notifyModal.classList.add("hidden");
  });
}

if (notifyForm) {
  notifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks! We’ll notify you when T-shirts drop 🔥");
    notifyModal.classList.add("hidden");
  });
}
