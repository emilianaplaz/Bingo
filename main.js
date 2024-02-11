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

var celdasResaltadas = {
    jugador1: [],
    jugador2: [],
    jugador3: [],
    jugador4: []
};


// MOSTRAR UN CARTON A LA VEZ
document.addEventListener('DOMContentLoaded', function() {
    showAllCartons();
    llenarPlayerSelect();
    showDefaultCarton();
});

function showAllCartons() {
    var cartonesBingo = document.getElementById("cartones-bingo");
    var totalJugadores = 4;

    for (var jugador = 1; jugador <= totalJugadores; jugador++) {
        var carton = localStorage.getItem('cartonJugador' + jugador);

        if (carton) {
            // Crear container para los cartones
            var cartonContainer = document.createElement('div');
            cartonContainer.className = 'carton-container' + jugador;

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

function showSelectedPlayerCarton() {
    var playerSelect = document.getElementById("player-select");
    var selectedPlayer = parseInt(playerSelect.value);
    var cartonContainers = document.querySelectorAll('.carton-container');
    var nombreJugador = document.getElementById("nombre-jugador");

    // Hide all carton containers
    cartonContainers.forEach(function(container) {
        container.style.display = 'none';
    });

    // Show the selected player's carton container
    cartonContainers[selectedPlayer - 1].classList.add('active');
    nombreJugador.textContent= "Jugador" + selectedPlayer;
}

function showDefaultCarton() {
    // Show the first carton container by default
    var cartonContainers = document.querySelectorAll('.carton-container');
    cartonContainers[0].classList.add('active');
}
    
     



function getRandomNumber() {
    document.getElementById("random-number").textContent = "Siguiente";
    
    if (turno <= 50) {
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
                checkRow(jugador);
            }
        });
        turno++;
        
        // if (turno > 25) {
        //     document.getElementById("random-number").disabled = true;
        //     document.getElementById("random-number").textContent = "Juego terminado";
        //     alert("Juego terminado");
        // }
    }
}

var puntajeJugador1 = 0;
var puntajeJugador2 = 0;
var puntajeJugador3 = 0;
var puntajeJugador4 = 0;

function checkRow(jugador) {
    var cells = celdasResaltadas[jugador];
    var cartonSize = 4; // Assuming each carton has 4 rows and 4 columns

    // Check each row for a win
    for (var i = 0; i < cartonSize; i++) {
        var cellsInRow = cells.filter(function (cell) {
            var rowIndex = parseInt(cell.dataset.rowIndex);
            return rowIndex === i && cell.style.backgroundColor === "pink";
            
        });

        

        // If all cells in the row are highlighted, increment the player's points
        if (cellsInRow.length === cartonSize) {
            if (jugador === 'jugador1') {
                puntajeJugador1++;
            } else if (jugador === 'jugador2') {
                puntajeJugador2++;
            } else if (jugador === 'jugador3') {
                puntajeJugador3++;
            } else if (jugador === 'jugador4') {
                puntajeJugador4++;
            } else {
                console.error("Invalid jugador:", jugador);
            }

            console.log("Row win for jugador", jugador);
            break; // Exit the loop after finding a win to avoid double-counting
        }
    }

    // console.log("Updated puntajes:", getPuntajes());
}

function getPuntajes() {
    return {
        jugador1: puntajeJugador1,
        jugador2: puntajeJugador2,
        jugador3: puntajeJugador3,
        jugador4: puntajeJugador4
    };
}












