'use strict';

//Manual da API de Hardware: https://tessel.gitbooks.io/t2-docs/content/API/Hardware_API.html

// Carrega a lib do Tessel
var tessel = require('tessel');

// Configura o pino para o LED e o valor inicial
var led = tessel.port.B.pin[0];
var sensor_luz = tessel.port.B.pin[7];
var aceso = true;
var limite = 456;

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

// Leitura do sensor de luz
function le_sensor() {
  sensor_luz.analogRead((error, number) => {
    if (error) {
      throw error;
    }
  
    console.log(number); 

    if (number >= limite) {
      acende();
    } else {
      apaga();
    }
  });
}

apaga();

// Pisca!
setInterval(() => {
  le_sensor();
}, 500);

console.log("(Aperte CTRL + C para parar)");
