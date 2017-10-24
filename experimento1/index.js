'use strict';

//Manual da API de Hardware: https://tessel.gitbooks.io/t2-docs/content/API/Hardware_API.html

// Carrega a lib do Tessel
var tessel = require('tessel');

// Configura o pino para o LED e o valor inicial
var led = tessel.port.B.pin[0];
var aceso = true;

// Acendemos o LED ao escrever 1 na porta que ele está assim colocando ela em estado HIGH
function acende() {
  led.write(1);
  aceso = true;
  console.log("Aceso!");
}

// Desligamos o LED ao escrever 0 na porta, assim colocando ela em estado LOW
function apaga() {
  led.write(0);
  aceso = false;
  console.log("Apagado!");
}

// acende o LED.
acende();

// Pisca!
setInterval(() => {
  if (aceso) {
    apaga();
  } else {
    acende();
  }
}, 500);

console.log("To piscando! (Aperte CTRL + C para parar)");
