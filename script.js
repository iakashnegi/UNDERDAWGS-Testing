// === CART FUNCTIONALITY ===
let cart = [];

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCartCount();
  alert(`${productName} added to cart!`);
}

// === UPDATE CART ICON ===
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

// === OPEN ORDER FORM ===
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Create form data string
  let orderDetails = cart.map(
    item => `${item.name} - ₹${item.price}`
  ).join('\n');

  // Send order to Formspree
  fetch("https://formspree.io/f/movpedod", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: "akashnegiwork@gmail.com",
      message: `New order received:\n${orderDetails}`
    })
  })
  .then(response => {
    if (response.ok) {
      alert("Order placed successfully! We'll contact you soon via email.");
      cart = [];
      updateCartCount();
    } else {
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(() => alert("Network error. Please check your connection."));
}
