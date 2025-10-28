// === CART FUNCTIONALITY ===
let cart = [];

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCartCount();
  alert(`${productName} added to cart!`);
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

// === SHOW CHECKOUT POPUP ===
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const popup = document.getElementById("checkout-popup");
  const orderList = document.getElementById("order-list");

  orderList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    orderList.appendChild(li);
  });

  popup.style.display = "flex";
}

// === CLOSE POPUP ===
function closePopup() {
  document.getElementById("checkout-popup").style.display = "none";
}

// === SUBMIT ORDER ===
function submitOrder(event) {
  event.preventDefault();

  const name = document.getElementById("cust-name").value;
  const email = document.getElementById("cust-email").value;
  const phone = document.getElementById("cust-phone").value;
  const address = document.getElementById("cust-address").value;

  let orderDetails = cart.map(item => `${item.name} - ₹${item.price}`).join("\n");

  fetch("https://formspree.io/f/movpedod", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      address: address,
      message: `New UNDERDAWGS Order:\n\n${orderDetails}`
    })
  })
  .then(response => {
    if (response.ok) {
      showThankYouScreen();
      cart = [];
      updateCartCount();
      document.getElementById("checkout-form").reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(() => alert("Network error. Please check your connection."));
}

// === SHOW THANK YOU SCREEN ===
function showThankYouScreen() {
  const popup = document.getElementById("checkout-popup");
  popup.innerHTML = `
    <div class="popup-content">
      <h2>THANK YOU 🐾</h2>
      <p>Your order has been placed successfully!</p>
      <p>Team <b>UNDERDAWGS</b> will contact you shortly.</p>
      <button onclick="closeThankYou()" class="add-cart">Close</button>
    </div>
  `;
  popup.style.display = "flex";
}

function closeThankYou() {
  document.getElementById("checkout-popup").style.display = "none";
}
