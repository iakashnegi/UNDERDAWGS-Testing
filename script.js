let cart = [];

const cartBtn = document.getElementById("cart-btn");
const cartPopup = document.getElementById("cart-popup");
const closeCart = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("checkout-form");
const closeCheckout = document.getElementById("close-checkout");

cartBtn.addEventListener("click", () => {
  cartPopup.style.display = "block";
});

closeCart.addEventListener("click", () => {
  cartPopup.style.display = "none";
});

checkoutBtn.addEventListener("click", () => {
  cartPopup.style.display = "none";
  checkoutForm.style.display = "block";
});

closeCheckout.addEventListener("click", () => {
  checkoutForm.style.display = "none";
});

document.querySelectorAll(".add-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const product = e.target.closest(".product");
    const name = product.querySelector("h3").textContent;
    const price = 1200;
    const size = product.querySelector(".size").value;
    cart.push({ name, price, size });
    updateCart();
  });
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} (${item.size}) - ₹${item.price} 
      <button onclick="removeFromCart(${index})">❌</button>`;
    cartItems.appendChild(li);
    total += item.price;
  });

  document.getElementById("cart-total").textContent = total;
  document.getElementById("cart-count").textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
