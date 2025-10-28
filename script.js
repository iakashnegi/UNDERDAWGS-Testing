document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cart-btn');
  const cartPopup = document.getElementById('cart-popup');
  const closeCartBtn = document.getElementById('close-cart');
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const placeOrderBtn = document.getElementById('place-order');
  const cancelOrderBtn = document.getElementById('cancel-order');

  let cart = [];

  // ✅ Hide popups initially
  cartPopup.style.display = 'none';
  checkoutForm.style.display = 'none';

  // ✅ Open cart popup
  cartBtn.addEventListener('click', () => {
    updateCart();
    cartPopup.style.display = 'block';
  });

  // ✅ Close cart popup
  closeCartBtn.addEventListener('click', () => {
    cartPopup.style.display = 'none';
  });

  // ✅ Close checkout form
  cancelOrderBtn.addEventListener('click', () => {
    checkoutForm.style.display = 'none';
    cartPopup.style.display = 'block';
  });

  // ✅ Add to cart functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.hoodie-card');
      const name = productCard.querySelector('h3').innerText;
      const price = parseInt(productCard.querySelector('.price').innerText.replace('₹', ''));
      const size = productCard.querySelector('select').value;
      const imgSrc = productCard.querySelector('img').src;

      const existing = cart.find(item => item.name === name && item.size === size);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, size, imgSrc, quantity: 1 });
      }
      updateCart();
    });
  });

  // ✅ Update cart display
  function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty 🛒</p>';
      totalPriceElement.innerText = '₹0';
      checkoutBtn.disabled = true;
    } else {
      cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>Size: ${item.size}</p>
            <p>₹${item.price} × ${item.quantity}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(div);
        total += item.price * item.quantity;
      });
      totalPriceElement.innerText = `₹${total}`;
      checkoutBtn.disabled = false;
    }

    document.getElementById('cart-count').innerText = cart.length;

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        updateCart();
      });
    });
  }

  // ✅ Proceed to checkout
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Add some hoodies before checkout.');
      return;
    }
    cartPopup.style.display = 'none';
    checkoutForm.style.display = 'block';
  });

  // ✅ Place order
  placeOrderBtn.addEventListener('click', () => {
    alert('Thank you for your order, brother! 🐾');
    cart = [];
    updateCart();
    checkoutForm.style.display = 'none';
  });
});
