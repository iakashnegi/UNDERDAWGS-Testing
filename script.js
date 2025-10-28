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

// ✅ Create a small toast notification div
const toast = document.createElement("div");
toast.id = "toast";
toast.style.position = "fixed";
toast.style.bottom = "30px";
toast.style.left = "50%";
toast.style.transform = "translateX(-50%)";
toast.style.background = "#e50914";
toast.style.color = "#fff";
toast.style.padding = "10px 20px";
toast.style.borderRadius = "6px";
toast.style.fontWeight = "600";
toast.style.display = "none";
toast.style.zIndex = "500";
document.body.appendChild(toast);

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.transition = "opacity 0.5s ease";
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.style.display = "none";
      toast.style.transition = "none";
    }, 500);
  }, 1500);
}

// ✅ Add to Cart functionality
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const name = product.querySelector("h3").innerText;
    const price = parseInt(product.querySelector(".price").innerText.replace(/[^\d]/g, ""));
    const size = product.querySelector(".size-select").value;

    cart.push({ name, price, size });
    updateCart();
    showToast("✅ Added to cart");
  });
});

// ✅ Update cart view
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

// ✅ Cart popup fade-in/out
cartBtn.addEventListener("click", () => {
  cartPopup.style.display = "flex";
  cartPopup.style.opacity = "0";
  setTimeout(() => (cartPopup.style.opacity = "1"), 10);
});

closeCart.addEventListener("click", () => closeCartPopup());

function closeCartPopup() {
  cartPopup.style.opacity = "0";
  setTimeout(() => (cartPopup.style.display = "none"), 300);
}

// ✅ Close cart when clicking outside content
cartPopup.addEventListener("click", (e) => {
  if (e.target === cartPopup) closeCartPopup();
});

// ✅ Prevent checkout if cart empty
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("🛒 Your cart is empty!");
    return;
  }
  closeCartPopup();
  checkoutForm.style.display = "flex";
  checkoutForm.style.opacity = "0";
  setTimeout(() => (checkoutForm.style.opacity = "1"), 10);
});

closeCheckout.addEventListener("click", () => {
  checkoutForm.style.opacity = "0";
  setTimeout(() => (checkoutForm.style.display = "none"), 300);
});

// ✅ Form submission via Formspree
const checkoutFormElement = checkoutForm.querySelector("form");
checkoutFormElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: checkoutFormElement.querySelector('input[type="text"]').value,
    email: checkoutFormElement.querySelector('input[type="email"]').value,
    address: checkoutFormElement.querySelector("textarea").value,
    mobile: checkoutFormElement.querySelector('input[type="tel"]').value,
    cartItems: cart.map(item => `${item.name} (${item.size}) - ₹${item.price}`).join(", "),
    total: cartTotal.textContent
  };

  showToast("📦 Placing your order...");
  try {
    const response = await fetch("https://formspree.io/f/movpedod", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showToast("✅ Order placed successfully!");
      cart = [];
      updateCart();
      checkoutForm.style.display = "none";
      checkoutFormElement.reset();
    } else {
      showToast("⚠️ Something went wrong, try again!");
    }
  } catch (err) {
    showToast("⚠️ Network error!");
  }
});
