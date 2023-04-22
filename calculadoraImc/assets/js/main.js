//Capturar evento de submit do formulário
const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //id 'peso' e 'altura' que estão dentro do form 'e'
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if (!peso){
        setResultado('Peso inválido!', false);
        return;
    }
    if (!altura){
        setResultado('Altura inválido!', false);
        return;
    }

    const imc = getImc(peso, altura);

    const nivelImc = getNivelImc(imc);

    const msg = `Seu IMC é ${imc} (${nivelImc})`;
    setResultado(msg, true);
});

function getImc (peso, altura){
    const imc = peso / altura **2;
    return imc.toFixed(2);
}

//cria um parágrafo
function criaP () {
    const p = document.createElement('p'); //cria um elemento HTML (<p>)
    return p;
}

function getNivelImc (imc){
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau I', 'Obesidade grau II', 'Obesidade grau III'];
    if (imc >= 40){
        return nivel[5];
    } 
    if (imc >= 35){
        return nivel[4];
    } 
    if (imc >= 30){
        return nivel[3];
    } 
    if (imc >= 25){
        return nivel[2];
    } 
    if (imc >= 18.5){
        return nivel[1];
    } 
    if (imc < 18.5) {
        return nivel[0]
    }

}

function setResultado (msg, isValid){
    const resultado = document.querySelector('.resultado');
    resultado.innerHTML = '';

    const p = criaP();
    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad'); 
    }

    p.innerHTML = msg;
    resultado.appendChild(p); //insere o <p> dentro da div 'resultado' sendo seu filho
}