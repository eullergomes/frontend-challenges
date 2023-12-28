if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // Botão remover produto
  const removeProductButtons = document.getElementsByClassName("remove-product-button");
  for (let i = 0; i < removeProductButtons.length; i++) {
    removeProductButtons[i].addEventListener("click", removeProduct);
  }

  // Mudança valor dos inputs
  const quantityInputs = document.getElementsByClassName("product-qtd-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNULL);
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("button-hover-background");
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart);
  }

  //Botão finalizar compra
  const buttonFinaly = document.getElementsByClassName("purchase-button")[0]
  buttonFinaly.addEventListener("click", makePurchase)
}

function makePurchase (){
  const totalCarrinho = document.querySelector(".cart-total-container span").innerText

  if (totalCarrinho === 'R$0,00'){
    alert("O carrinho está vazio")
  } else {
    alert(`Você finalizou a compra de ${totalCarrinho}
    Obrigado pela compra!!!`)

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
  }
}

function checkIfInputIsNULL(e) {
  if (e.target == '0'){
    e.target.parentElement.parentElement.remove()
  }

  updateTotal()
}

function addProductToCart(e) {
  const button = e.target;
  const productInfos = button.parentElement.parentElement;
  const productImage = productInfos.getElementsByClassName("product-image")[0].src;
  const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText;
  const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText;

  // se o produto já está no carrinho, aumenta a qtd
  const productsCartNames = document.getElementsByClassName("cart-product-title");
  for (let i = 0; i < productsCartNames.length; i++){
    if (productsCartNames[i].innerText === productTitle){
      productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++;
      updateTotal()
      return;
    }
  }

  let newCartProduct = document.createElement("tr");
  newCartProduct.classList.add("cart-product");

  newCartProduct.innerHTML = 
    `
    <td class="product-identification">
        <img src="${productImage}" alt="${productTitle}" class="cart-product-image">
        <strong class="cart-product-title">${productTitle}</strong>
    </td>
    <td>
        <span class="cart-product-price">${productPrice}</span>
    </td>
    <td>
        <input type="number" value="1" min="0" class="product-qtd-input">
        <button type="button" class="remove-product-button">Remover</button>
    </td>
    `

  const tableBody =  document.querySelector(".cart-table tbody");
  tableBody.append(newCartProduct);
  updateTotal()
  
  newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNULL);
  newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct);

}

function removeProduct(e) {
  e.target.parentElement.parentElement.remove();
  updateTotal();
}

function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product");
  let totalAmount = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    //percorrendo cada produto
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", "."); //tirando o cifrão e substituindo a ',' por um '.'

    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value;

    totalAmount += productPrice * productQuantity;
  }

  totalAmount = totalAmount.toFixed(2)
  totalAmount = totalAmount.replace(".", ",")
  document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}
