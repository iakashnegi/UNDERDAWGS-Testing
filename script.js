let cart = [];

function addToCart(name, price, image, size) {
  cart.push({ name, price, image, size });
  updateCartCount();
  alert(`${name} (${size}) added to cart!`);
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

function toggleCart() {
  const cartBox = document.getElementById('cart');
  cartBox.style.display = cartBox.style.display === 'block' ? 'none' : 'block';
  displayCart();
}

function displayCart() {
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" width="40" style="border-radius:4px;vertical-align:middle;"> 
      <b>${item.name}</b> - ${item.size} - ₹${item.price}
    `;
    list.appendChild(li);
    total += item.price;
  });

  document.getElementById('total').innerText = `Total: ₹${total}`;
}

function checkout() {
  alert('Checkout feature coming soon — payments will link to your bank!');
}
