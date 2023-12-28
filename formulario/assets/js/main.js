const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordConfirmation = document.getElementById('password-confirmation')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInput()
})

function checkInput(){
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if (usernameValue == '') { //se vazio
        setErrorFor (username, 'O nome de usuário é obrigatório')
    } else {
        setSucessFor (username)
    }

    if (emailValue === '') {
        setErrorFor(email, 'O email é obrigatório')
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, 'Por favor, insira um email válido')
    } else {
        setSucessFor(email)
    }

    if (passwordValue === '') {
        setErrorFor (password, 'A senha é obrigatório')
    } else if (passwordValue.length < 8){
        setErrorFor (password, 'A senha precisa ter no mínimo 8 caracteres')
    } else {
        setSucessFor(password)
    }

    if (passwordConfirmationValue === '') {
        setErrorFor (passwordConfirmation, 'A confirmação de senha é obrigatória')
    } else if (passwordConfirmationValue !== passwordValue) {
        setErrorFor(passwordConfirmation, "As senhas não conferem")
    } else {
        setSucessFor(passwordConfirmation)
    }

}

function setErrorFor (input, msg){
    const formControl = input.parentElement; //retorna a div PAI do input
    const small = formControl.querySelector('small')

    small.innerText = msg //add msg de erro

    formControl.className = "form-control error" //add class de erro


}

function setSucessFor (input){
    const formControl = input.parentElement;

    formControl.className = "form-control success"
}


function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }