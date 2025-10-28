// ========== CART SYSTEM ==========
let cart = [];

// Create floating cart icon dynamically
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.createElement("div");
  cartIcon.id = "cart-icon";
  cartIcon.innerHTML = `
    🛒 <span id="cart-count">0</span>
  `;
  document.body.appendChild(cartIcon);

  const cartPopup = document.createElement("div");
  cartPopup.id = "cart-popup";
  cartPopup.innerHTML = `
    <h3>Your Cart</h3>
    <ul id="cart-items"></ul>
    <button id="checkoutBtn">Checkout</button>
  `;
  document.body.appendChild(cartPopup);

  // Cart icon click toggles popup visibility
  cartIcon.addEventListener("click", () => {
    cartPopup.classList.toggle("show");
  });

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    document.getElementById("cart-popup").classList.remove("show");
    document.querySelector("#checkout").scrollIntoView({ behavior: "smooth" });
  });

  // Attach submit listener for Formspree
  const form = document.getElementById("orderForm");
  form.addEventListener("submit", handleFormSubmit);
});

// ========== FUNCTIONS ==========

// Add product to cart
function addToCart(productName, price) {
  cart.push({ productName, price });
  updateCartDisplay();
  alert(`${productName} added to your cart 🐾`);
}

// Update floating cart UI
function updateCartDisplay() {
  document.getElementById("cart-count").textContent = cart.length;

  const itemsList = document.getElementById("cart-items");
  itemsList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.productName} - ₹${item.price}`;
    itemsList.appendChild(li);
  });

  // Auto-fill checkout form with last added item
  if (cart.length > 0) {
    const last = cart[cart.length -
