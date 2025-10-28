// --- SELECTORS ---
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cart-count');
const cartBtn = document.getElementById('cart-btn');
const cartPopup = document.getElementById('cart-popup');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const closeCheckout = document.getElementById('close-checkout');

let cart = [];

// --- ADD TO CART FUNCTIONALITY ---
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const productElement = button.closest('.product');
    const name = productElement.querySelector('h3').innerText;
    const priceText = productElement.querySelector('.price').innerText;
    const discountedPrice = parseInt(priceText.replace(/[^0-9]/g, ''));
    const size = productElement.querySelector('.size-select').value;
    const imageSrc = productElement.querySelector('img').src;

    const existingItem = cart.find(item => item.name === name && item.size === size);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, size, price: discountedPrice, imageSrc, quantity: 1 });
    }

    updateCartCount();
    saveCart();
    showToast(`${name} (Size: ${size}) added to cart`);
  });
});

// --- UPDATE CART COUNT ---
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// --- SAVE & LOAD CART FROM LOCALSTORAGE ---
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem('cart');
  if (saved) cart = JSON.parse(saved);
  updateCartCount();
}

// --- DISPLAY CART POPUP ---
cartBtn.addEventListener('click', () => {
  renderCart();
  cartPopup.style.display = 'flex';
});

closeCart.addEventListener('click', () => {
  cartPopup.style.display = 'none';
});

// --- RENDER CART ITEMS ---
function renderCart() {
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cart-item">
        <img src="${item.imageSrc}" alt="${item.name}">
        <div>
          <p><strong>${item.name}</strong></p>
          <p>Size: ${item.size}</p>
          <p>₹${item.price} × ${item.quantity}</p>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      </div>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = `Total: ₹${total}`;
  attachRemoveButtons();
}

// --- REMOVE ITEM ---
function attachRemoveButtons() {
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      cart.splice(index, 1);
      saveCart();
      renderCart();
      updateCartCount();
    });
  });
}

// --- CHECKOUT ---
checkoutBtn.addEventListener('click', () => {
  cartPopup.style.display = 'none';
  checkoutForm.style.display = 'flex';
});

closeCheckout.addEventListener('click', () => {
  checkoutForm.style.display = 'none';
});

// --- TOAST MESSAGE ---
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// --- INIT ---
loadCart();
