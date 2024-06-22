document.addEventListener('DOMContentLoaded', () => {
  const cartItems = [];
  
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const placeOrderButton = document.getElementById('place-order');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-name');
      const itemPrice = parseFloat(button.getAttribute('data-price'));
      addItemToCart(itemName, itemPrice);
      updateCartDisplay();
    });
  });

  placeOrderButton.addEventListener('click', () => {
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (address === '' || phone === '') {
      alert('Please enter both address and phone number.');
      return;
    }

    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    if (cartItems.length > 0) {
      alert('Placed order successfully!');
      cartItems.length = 0; // Clear the cart
      updateCartDisplay();
    } else {
      alert('Your cart is empty.');
    }
  });

  function addItemToCart(name, price) {
    const item = cartItems.find(item => item.name === name);
    if (item) {
      item.quantity += 1;
    } else {
      cartItems.push({ name, price, quantity: 1 });
    }
  }

  function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
      cartItemsList.appendChild(listItem);
      total += item.price * item.quantity;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
});
