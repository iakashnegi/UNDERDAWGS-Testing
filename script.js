// === CART FUNCTIONALITY ===
let cart = [];
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCart = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout-btn");

// Show / Hide Cart
cartBtn.addEventListener("click", () => cartModal.classList.remove("hidden"));
closeCart.addEventListener("click", () => cartModal.classList.add("hidden"));

// Add to Cart
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const hoodie = e.target.closest(".hoodie");
    const name = hoodie.querySelector("h3").textContent;
    const price = parseFloat(
      hoodie.querySelector(".price").textContent.replace("₹", "")
    );
    const size = hoodie.querySelector("select").value;

    const existingItem = cart.find(
      (item) => item.name === name && item.size === size
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, size, quantity: 1 });
    }

    updateCart();
  });
});

// Update Cart Display
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (${item.size}) x${item.quantity} - ₹${item.price * item.quantity}
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: ₹${total}`;
  removeItemListeners();
}

// Remove item from cart
function removeItemListeners() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// === CHECKOUT FUNCTIONALITY ===
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  cartModal.classList.add("hidden");
  openCheckoutForm();
});

function openCheckoutForm() {
  const checkoutModal = document.createElement("div");
  checkoutModal.id = "checkout-modal";
  checkoutModal.style.position = "fixed";
  checkoutModal.style.top = "0";
  checkoutModal.style.left = "0";
  checkoutModal.style.width = "100%";
  checkoutModal.style.height = "100%";
  checkoutModal.style.backgroundColor = "rgba(0,0,0,0.85)";
  checkoutModal.style.display = "flex";
  checkoutModal.style.justifyContent = "center";
  checkoutModal.style.alignItems = "center";
  checkoutModal.innerHTML = `
    <div class="notify-content">
      <h2>Checkout</h2>
      <form action="https://formspree.io/f/movpedod" method="POST">
        <input type="text" name="name" placeholder="Full Name" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="text" name="address" placeholder="Shipping Address" required><br>
        <input type="tel" name="phone" placeholder="Phone Number" required><br>
        <textarea name="order" readonly style="width:80%;height:70px;background:#000;color:white;border:1px solid #e50914;border-radius:8px;margin-top:10px;padding:5px;">${cart
          .map((item) => `${item.name} (${item.size}) x${item.quantity}`)
          .join(", ")}</textarea>
        <button type="submit">Confirm Order</button>
        <button type="button" id="close-checkout" style="margin-left:10px;">Cancel</button>
      </form>
    </div>
  `;
  document.body.appendChild(checkoutModal);

  document
    .getElementById("close-checkout")
    .addEventListener("click", () => checkoutModal.remove());
}

// === COMING SOON (NOTIFY) FUNCTIONALITY ===
const notifyBtn = document.getElementById("notify-btn");
const notifyModal = document.getElementById("notify-modal");
const closeNotify = document.getElementById("close-notify");

notifyBtn.addEventListener("click", () => notifyModal.classList.remove("hidden"));
closeNotify.addEventListener("click", () => notifyModal.classList.add("hidden"));
