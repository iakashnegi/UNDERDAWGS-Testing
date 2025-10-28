// UNDERDAWGS - Cart + Checkout System

let cart = [];

// Add product to cart
function addToCart(name, price) {
  const sizeSelect = document.getElementById(`size-${name}`);
  const size = sizeSelect ? sizeSelect.value : "M"; // default size M
  const item = { name, price, size };
  cart.push(item);
  updateCart();
}

// Remove product from cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update cart display
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p style="text-align:center; color:#aaa;">Your cart is empty</p>`;
  } else {
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
  }

  totalPrice.textContent = `₹${total}`;
}

// Show or hide cart popup
const cartPopup = document.getElementById("cart-popup");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");

cartBtn.addEventListener("click", () => {
  cartPopup.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartPopup.classList.remove("open");
});

// Checkout button
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    // Stylish alert
    const alertBox = document.createElement("div");
    alertBox.textContent = "🛒 Your cart is empty! Add something before checkout.";
    alertBox.style.position = "fixed";
    alertBox.style.bottom = "20px";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translateX(-50%)";
    alertBox.style.background = "#e50914";
    alertBox.style.color = "white";
    alertBox.style.padding = "10px 20px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.fontWeight = "600";
    alertBox.style.zIndex = "9999";
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 2500);
  } else {
    // Proceed to checkout form
    window.location.href = "#checkout";
  }
});
