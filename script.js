const cartButton = document.getElementById('cart-button');
const cartPopup = document.getElementById('cart-popup');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const closeForm = document.getElementById('close-form');
const cartDetailsField = document.getElementById('cart-details-field');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cart = [];

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty 🛒</p>';
    checkoutBtn.disabled = true;
    cartTotal.textContent = 'Total: ₹0';
  } else {
    checkoutBtn.disabled = false;
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement('div');
      div.innerHTML = `${item.name} (${item.size}) - ₹${item.price} 
        <button onclick="removeItem(${index})">❌</button>`;
      cartItems.appendChild(div);
    });
    cartTotal.textContent = `Total: ₹${total}`;
  }

  cartCount.textContent = cart.length;
  cartDetailsField.value = JSON.stringify(cart);
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.closest('.product');
    const name = product.querySelector('h3').textContent;
    const price = parseInt(product.querySelector('.price').textContent.replace(/\D/g, ''));
    const size = product.querySelector('select').value;

    cart.push({ name, price, size });
    updateCart();
  });
});

cartButton.addEventListener('click', () => {
  cartPopup.classList.remove('hidden');
});

closeCart.addEventListener('click', () => {
  cartPopup.classList.add('hidden');
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  cartPopup.classList.add('hidden');
  checkoutForm.classList.remove('hidden');
});

closeForm.addEventListener('click', () => {
  checkoutForm.classList.add('hidden');
});

updateCart();
