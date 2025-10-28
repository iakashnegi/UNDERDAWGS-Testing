// CART SYSTEM
let cart = [];

// Add to Cart Function
function addToCart(productName, price) {
  cart.push({ productName, price });
  alert(`${productName} added to cart!`);
  updateCheckoutForm();
}

// Update checkout form automatically with latest item
function updateCheckoutForm() {
  if (cart.length > 0) {
    const lastItem = cart[cart.length - 1];
    document.getElementById("productName").value = lastItem.productName;
    document.getElementById("price").value = lastItem.price;
  }
}

// Handle Checkout Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("orderForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/movpedod", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("✅ Order placed successfully! You’ll receive a confirmation soon.");
        form.reset();
        cart = [];
      } else {
        alert("❌ Something went wrong. Please try again!");
      }
    } catch (error) {
      alert("⚠️ Network error. Please check your connection.");
    }
  });
});

// Cancel button
function cancelOrder() {
  document.getElementById("orderForm").reset();
  alert("Order canceled!");
}
