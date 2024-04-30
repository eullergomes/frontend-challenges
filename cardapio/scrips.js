const menu = document.getElementById('menu'); //burgers and drinks menu
const cartBtn = document.getElementById('cart-btn'); //cart button
const cartModal = document.getElementById('cart-modal'); //shopping cart that appears after clicking on 'cart Btn'
const cartItemsContainer = document.getElementById('cart-items'); //cart items list
const cartTotao = document.getElementById('cart-total'); //cart total
const checkoutBtn = document.getElementById('checkout-btn'); //finalize purchase
const closeModalBtn = document.getElementById('close-modal-btn'); //cart close button
const cartCounter = document.getElementById('cart-count'); //qtd. items in cart
const addressInput = document.getElementById('address'); //address input
const addressWarm = document.getElementById('address-warm'); //address warning
const checkOpen = document.getElementById('check-open'); //open or closed restaurant

let cart = [];

//open cart modal
cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'flex';
  updateCartModal();
});

//close cart modal
cartModal.addEventListener('click', (e) => {  
  if (e.target === cartModal || e.target === closeModalBtn) {
    cartModal.style.display = 'none';
  }
});

menu.addEventListener('click', e => {
  let parentButton = e.target.closest('.add-to-cart-btn'); //add cart button

  if (parentButton) {
    const name = parentButton.getAttribute('data-name');
    const price = parseFloat(parentButton.getAttribute('data-price'));

    //add item to cart
    addToCart(name, price);
  }
});

//add item to cart
function addToCart (name, price) {
  //pointer
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({name, price, quantity: 1});
  }

  updateCartModal();
}

//update cart
function updateCartModal() {
  cartItemsContainer.innerHTML  = '';
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('flex', 'flex-col', 'justify-between', 'mb-4');

    cartItemElement.innerHTML = `
    <div class='flex justify-between items-center'>
      <div>
        <p class='font-medium'>${item.name}</p>
        <p>Qtd: ${item.quantity}</p>
        <p class='font-medium mt2'>R$ ${item.price}</p>
      </div>
      <button class='underline remove-btn' data-name="${item.name}">Remover</button>
    </div>`
    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  })
  cartTotao.textContent = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});  

  cartCounter.innerHTML = cart.length;
}

//remove item from cart
cartItemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const name = e.target.getAttribute('data-name');
    
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1) { //finded
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.pop(index);
    }
    updateCartModal();
  }
}

addressInput.addEventListener('input', e => {
  let inputValue = e.target.value;

  if (inputValue !== '') {
    addressWarm.classList.add('hidden');
    addressInput.classList.remove('border-red-500');
  }
})

checkoutBtn.addEventListener('click', e => {
  if (!isOpen) {
    alert('Restaurante fechado');
    return;
  }

  if (cart.length === 0) {
    alert('Carrinho vazio');
    return;
  }
  
  if (addressInput.value === '') {
    addressWarm.classList.remove('hidden');
    addressInput.classList.add('border-red-500');
    return;
  }

  const cartItems = cart.map(item => {
    return (`*Nome:* ${item.name}\n*Quantidade:* ${item.quantity}\n`)
  }).join('\n');
  
  const message = encodeURIComponent(`Boa noite, eu gostaria de realizar o seguinte pedido:\n\n${cartItems}\n`);
  const phone = '98985334778';

  window.open(`https://wa.me/${phone}?text=${message} *Endereço*: ${addressInput.value}`, "_blank");
});



function checkRestaurantIsOpen () {
  const date = new Date();
  const hour = date.getHours();

  //return hour >= 18 && hour <= 22;
  return true;
}

const spanItem = document.getElementById('date-span');
const isOpen = checkRestaurantIsOpen();
if (isOpen) {
  checkOpen.textContent = 'Aberto';
  spanItem.classList.add('bg-green-500');
} else {
  checkOpen.textContent = 'Fechado';
  spanItem.classList.add('bg-red-500');
}