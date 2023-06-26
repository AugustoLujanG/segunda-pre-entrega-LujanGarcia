const carritoId = localStorage.getItem('cart-id');
const addToCart = document.querySelectorAll('.addToCart');
const deleteToCart = document.querySelectorAll('.deleteToCart');
const deleteCart = document.querySelectorAll('.deleteCart');

if (!carritoId) {
  alert('no id');

  const data = {};

  fetch(`/carts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Response:', data);
      localStorage.setItem('cart-id', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

addToCart.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-productid');

    addProductToCart(productId);
  });
});

deleteToCart.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-productid');
    console.log(productId);
    deleteProductToCart(productId);
  });
});

deleteCart.forEach(button => {
  button.addEventListener('click', () => {
    const cartId = button.getAttribute('data-cartid');
    console.log(cartId);
    deleteAllCart(cartId);
  });
});

function addProductToCart(productId) {
  const products = { products: { product: productId } };
  const cartId = localStorage.getItem('cart-id');
  console.log(cartId);
  fetch(`/carts/${cartId}/product/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Producto añadido al carrito:', data);
    })
    .catch(error => {
      console.error('Error al añadir el producto al carrito:', error);
    });
}

function deleteProductToCart(productId) {
  const products = { products: { product: productId } };
  const cartId = localStorage.getItem('cart-id');
  fetch(`/carts/${cartId}/product/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Producto eliminado del carrito:', data);
    })
    .catch(error => {
      console.error('Error al eliminar el producto del carrito:', error);
    });
}

function deleteAllCart(cartId) {
  fetch(`/carts/${cartId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Carrito eliminado:', data);
    })
    .catch(error => {
      console.error('Error el carrito:', error);
    });
}
