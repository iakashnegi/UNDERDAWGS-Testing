// === GLOBAL CART HANDLER === //
const cartBtn = document.getElementById("cart-btn");
const cartPopup = document.getElementById("cart-popup");
const closeCart = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("checkout-form");
const closeCheckout = document.getElementById("close-checkout");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCart();

// === ADD TO CART BUTTONS === //
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = button.closest(".product") || document.querySelector(".product-detail");
    const name = product.querySelector("h3").innerText;
    const price = parseInt(product.querySelector(".price").innerText.replace(/[^\d]/g, ""));
    const sizeSelect = product.querySelector(".size-select");
    const size = sizeSelect ? sizeSelect.value : "M";

    cart.push({ name, price, size });
    saveCart();
    updateCart();

    // Show toast message
    showToast(`${name} added to cart!`);
  });
});

// === UPDATE CART DISPLAY === //
function updateCart() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} (${item.size}) - ₹${item.price}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCart();
      updateCart();
    };
    li.appendChild(removeBtn);
    cartItemsContainer.appendChild(li);
  });

  if (cartTotal) cartTotal.textContent = `Total: ₹${total}`;
  if (cartCount) cartCount.textContent = cart.length;
}

// === SAVE TO LOCAL STORAGE === //
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// === TOAST MESSAGE === //
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

// === CART POPUP TOGGLE === //
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    cartPopup.style.display = "flex";
  });
}

if (closeCart) {
  closeCart.addEventListener("click", () => {
    cartPopup.style.display = "none";
  });
}

// === CHECKOUT === //
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }
    cartPopup.style.display = "none";
    checkoutForm.style.display = "flex";
  });
}

if (closeCheckout) {
  closeCheckout.addEventListener("click", () => {
    checkoutForm.style.display = "none";
  });
}
