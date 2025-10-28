// UNDERDAWGS Cart System - Fixed Version

let cart = [];

// Add product to cart
function addToCart(name, price) {
  const sizeSelect = document.getElementById(`size-${name}`);
  const size = sizeSelect ? sizeSelect.value : "M";
  cart.push({ name, price, size });
  updateCart();
}

// Remove product
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update cart UI
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p style="text-align:center; color:#aaa;">Your cart is empty</p>`;
    totalPrice.textContent = "₹0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (${item.size})</span>
        <span>₹${item.price}</span>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalPrice.textContent = `₹${total}`;
}

// Cart popup logic
const cartPopup = document.getElementById("cart-popup");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout-btn");

cartBtn.addEventListener("click", () => {
  cartPopup.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartPopup.classList.remove("open");
});

// Checkout
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showAlert("🛒 Your cart is empty! Add something before checkout.");
  } else {
    window.location.href = "#checkout";
  }
});

// Styled alert box
function showAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.style.position = "fixed";
  alertBox.style.bottom = "20px";
  alertBox.style.left = "50%";
  alertBox.style.transform = "translateX(-50%)";
  alertBox.style.background = "#e50914";
  alertBox.style.color = "#fff";
  alertBox.style.padding = "10px 20px";
  alertBox.style.borderRadius = "8px";
  alertBox.style.fontWeight = "600";
  alertBox.style.zIndex = "9999";
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), 2500);
}
