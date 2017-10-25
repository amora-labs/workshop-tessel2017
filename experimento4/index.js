'use strict';

var tessel = require('tessel');
var router = require('tiny-router');
var os = require('os');

var dados = [];
var led = tessel.port.B.pin[0];
var sensor_luz = tessel.port.B.pin[7];
var limite = 0.05;

/* Parte dos Sensores */


// Acendemos o LED ao escrever 1 na porta que ele está assim colocando ela em estado HIGH
function acende() {
  led.write(1);
}

// Desligamos o LED ao escrever 0 na porta, assim colocando ela em estado LOW
function apaga() {
  led.write(0);
}


// Leitura do sensor de luz
function le_sensor() {
  sensor_luz.analogRead((error, number) => {
    if (error) {
      throw error;
    }
  
    dados.push(number); 

    if (dados.length > 10) {
      dados = dados.splice(1, 10);
    }

    if (number <= limite) {
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
}, 1000);


/* Parte do servidor Web */


router.use('static', {path: __dirname + '/public'});

// Mostra os requests no console
router.use(function(req, res, next){
    console.log('URL: ', req.url);
    next();
});

// Responde a AJAX pedindo os dados
router.get("/dados", function(req, res) {
  console.log(JSON.stringify(dados));
  res.send(dados)
});

// Liga o servidor...
router.listen(8080);


// Gambi para poder listar o IP da placa. Parece complicado né? Foi Copy & Paste.
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}


console.log("Web Server ligado de boa esperando o seu navegador em http://"+addresses[0]+":8080/");
