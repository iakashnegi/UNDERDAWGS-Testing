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

let cart = [];

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const name = product.querySelector("h3").innerText;
    const price = parseInt(product.querySelector(".price").innerText.replace(/[^\d]/g, ""));
    const size = product.querySelector(".size-select").value;

    cart.push({ name, price, size });
    updateCart();
  });
});

function updateCart() {
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
      updateCart();
    };
    li.appendChild(removeBtn);
    cartItemsContainer.appendChild(li);
  });
  cartTotal.textContent = `Total: ₹${total}`;
  cartCount.textContent = cart.length;
}

cartBtn.addEventListener("click", () => {
  cartPopup.style.display = "flex";
});

closeCart.addEventListener("click", () => {
  cartPopup.style.display = "none";
});

checkoutBtn.addEventListener("click", () => {
  cartPopup.style.display = "none";
  checkoutForm.style.display = "flex";
});

closeCheckout.addEventListener("click", () => {
  checkoutForm.style.display = "none";
});
