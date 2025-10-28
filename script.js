// ==================== CART LOGIC ====================
const cartCount = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const modal = document.getElementById("checkout-modal");
const cancelOrder = document.getElementById("cancel-order");
const checkoutForm = document.getElementById("checkout-form");
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");

let cart = [];

// Add to Cart Button Logic
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseInt(button.getAttribute("data-price"));
    cart.push({ name, price });
    cartCount.textContent = cart.length;

    // Automatically open checkout modal
    openCheckout(name, price);
  });
});

// ==================== CHECKOUT LOGIC ====================

// Open Checkout Modal
function openCheckout(name, price) {
  productNameInput.value = name;
  productPriceInput.value = "₹" + price;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Close Modal
cancelOrder.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
});

// ==================== FORMSPREE SUBMISSION ====================

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(checkoutForm);

  try {
    const response = await fetch("https://formspree.io/f/movpedod", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData,
    });

    if (response.ok) {
      alert("✅ Order placed successfully! We’ll contact you soon.");
      checkoutForm.reset();
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      cart = [];
      cartCount.textContent = "0";
    } else {
      alert("❌ Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("⚠️ Network error. Please check your internet connection.");
  }
});

// Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
});
