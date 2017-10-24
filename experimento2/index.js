//Manual da API de Hardware: https://tessel.gitbooks.io/t2-docs/content/API/Hardware_API.html

var tessel = require('tessel'); // Carrega lib

// Configura os pinos
var led = tessel.led[2];
var botao = tessel.port.A.pin[2];

// Desliga o LED inicialmente
led.off();

// Registra um evento. Quando a voltagem no botão subir, acende o LED
botao.on('change', function(valor) {
  if (valor == 1) {
    led.on();
    console.log("acende:", valor);
  } else {
    led.off();
    console.log("apaga:", valor);
  }
  
});
