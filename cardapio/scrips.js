const menu = document.getElementById('menu'); //menu de hamburgueres e bebidas
const cartBtn = document.getElementById('cart-btn'); //botao de carrinho
const cartModal = document.getElementById('cart-modal'); //carrinho de compras que aparece após clicar em 'cartBtn'
const cartItemsContainer = document.getElementById('cart-items'); //lista de itens no carrinho
const cartTotao = document.getElementById('cart-total'); //total do carrinho
const checkoutBtn = document.getElementById('checkout-btn'); //botao de finalizar compra no carrinho
const closeModalBtn = document.getElementById('close-modal-btn'); //botao de fechar carrinho
const cartCounter = document.getElementById('cart-count'); //qtd. de itens no carrinho
const addressInput = document.getElementById('address'); //input de endereço
const addressWarm = document.getElementById('address-warm'); //mensagem de erro de endereço
const checkOpen = document.getElementById('check-open');

let cart = [];

//abrir o modal do carrinho
cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'flex';
  updateCartModal();
});

//fechar o modal do carrinho
cartModal.addEventListener('click', (e) => {  
  if (e.target === cartModal || e.target === closeModalBtn) {
    cartModal.style.display = 'none';
  }
});

menu.addEventListener('click', e => {
  let parentButton = e.target.closest('.add-to-cart-btn'); //botao de adicionar ao carrinho

  if (parentButton) {
    const name = parentButton.getAttribute('data-name');
    const price = parseFloat(parentButton.getAttribute('data-price'));

    //adicionar item ao carrinho
    addToCart(name, price);
  }
});

//adicionar item ao carrinho
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

//atualizar o carrinho
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

//remover item do carrinho
cartItemsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const name = e.target.getAttribute('data-name');
    
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1) { //encontrou na lista
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