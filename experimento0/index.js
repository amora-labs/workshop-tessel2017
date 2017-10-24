'use strict';

// Importa a lib do Tessel
const tessel = require('tessel');

// Inicia com um LED ligado.
tessel.led[2].on();

// Pisca!
setInterval(() => {
  tessel.led[2].toggle();
  tessel.led[3].toggle();
}, 100);

console.log("To piscando (Aperte CTRL + C para interromper)");
