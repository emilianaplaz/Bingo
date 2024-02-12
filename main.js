// FUNCION PARA CREAR LOS CARTONES DE BINGO

function crearCarton() {
    var cartonSize = document.getElementById("carton-size").value;
    var jugadores = document.querySelectorAll("[name='jugadores']");
    
    jugadores.forEach(function(jugador, index) {
        var carton = [];

        // Crear carton para cada jugador
        for (var i = 0; i < cartonSize; i++) {
            var row = [];
            for (var j = 0; j < cartonSize; j++) {
                row.push(Math.floor(Math.random() * 50) + 1); // Llenar el array con números aleatorios del 1 al 50
            }
            carton.push(row);
        }

        localStorage.setItem('cartonJugador' + (index + 1), JSON.stringify(carton));
    });

    window.location.href = 'carton.html';
}

var turno = 1;
var totalJugadores=4;


// MOSTRAR CARTONES 
document.addEventListener('DOMContentLoaded', function() {
    showAllCartons();
    llenarPlayerSelect();
});

function showAllCartons() {
    var cartonesBingo = document.getElementById("cartones-bingo");
    var totalJugadores = 4;

    for (var jugador = 1; jugador <= totalJugadores; jugador++) {
        var carton = localStorage.getItem('cartonJugador' + jugador);

        if (carton) {
            // Crear container para los cartones
            var cartonContainer = document.createElement('div'); //Crear espacio para cada carton
            cartonContainer.className = 'player-carton';
            cartonContainer.id = 'player-carton-' + jugador;
            cartonContainer.style.margin = '10px'; 

            // Crear título para el carton dependiendo del jugador
            var nombreJugador = document.createElement('h2');
            nombreJugador.textContent = "Jugador " + jugador;
            cartonContainer.appendChild(nombreJugador);

            var cartonIndividual = JSON.parse(carton);

            cartonIndividual.forEach(function (row) {
                var rowContainer = document.createElement('div');
                rowContainer.className = 'row-container';

                row.forEach(function (number) {
                    var cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.setAttribute('data-jugador', 'jugador' + jugador);
                    cell.textContent = number;
                    rowContainer.appendChild(cell);
                });

                cartonContainer.appendChild(rowContainer);
            });

            cartonesBingo.appendChild(cartonContainer);
        }
    }
}

//LLENAR EL SELECT CON LAS OPCIONES DE JUGADORES
function llenarPlayerSelect() {
    var playerSelect = document.getElementById("player-select");
    var totalJugadores = 4;

    for (var i = 1; i <= totalJugadores; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = "Jugador " + i;
        playerSelect.appendChild(option);
    }
}

var puntajeJugador1 = 0;
var puntajeJugador2 = 0;
var puntajeJugador3 = 0;
var puntajeJugador4 = 0;

var celdasResaltadas = {
    jugador1: [],
    jugador2: [],
    jugador3: [],
    jugador4: []
};


function getRandomNumber() {
    document.getElementById("random-number").textContent = "Siguiente";
    
    if (turno <= 25) {
        var randomnumber = Math.floor(Math.random() * 50);
        document.getElementById("numero-bingo").textContent = randomnumber;
        document.getElementById("turno-actual").textContent = turno;
        celda=document.getElementById("cell");

        var cartonJuego = document.querySelectorAll(".carton-container .cell");

        cartonJuego.forEach(function (celda) {
            if (parseInt(celda.textContent) === randomnumber) {
                // Agregar celda a la lista del jugador correspondiente
                var jugador = celda.getAttribute("data-jugador");
                celdasResaltadas[jugador].push(celda);

                // console.log(celdasResaltadas);

                // Cambiar estilo de la celda
                celda.style.backgroundColor = "pink";
            }
        });
        turno++;
        
        if (turno > 25) {
             document.getElementById("random-number").disabled = true;
             document.getElementById("random-number").textContent = "Juego terminado";
            alert("Juego terminado");
         }
    }
}



















