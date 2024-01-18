//formata os segundos para 00:00:00
function getTimeFromSeconds (seconds){
    const date = new Date (seconds * 1000); //definindo os segundos
    return date.toLocaleTimeString('pt-br', {hour12: false, timeZone: 'UTC'}); //GMT ou UTC
}

const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
let seconds = 0; //guarda os segundos para manter o mesmo valor ao PAUSAR ou zerar quando ZERAR
let timer;

//os segundos vão sendo incrementados em uma variável conforme os segundos, o txt vai sendo atualizado
function startClock () {
    relogio.classList.remove('stopped');
    timer = setInterval(() => {
        seconds++;
        relogio.innerHTML = getTimeFromSeconds (seconds);
    }, 10);
}

//pegar um evento de click no botão (iniciar)
iniciar.addEventListener('click', (e) => {
    startClock();
});

pausar.addEventListener('click', () => {
    clearInterval(timer);
    relogio.classList.add('stopped');
})

zerar.addEventListener('click', () => {
    clearInterval(timer);
    relogio.innerHTML = '00:00:00';
    seconds = 0; //clear
})