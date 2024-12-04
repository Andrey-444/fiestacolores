// Sonidos para la fiesta
const sounds = {
    'red': new Audio("sonidos/ay_papi.mp3"),
    'blue': new Audio('sonidos/bien_afuegillo.mp3'),
    'orange': new Audio('sonidos/el_gistro_amarillo.mp3'),
    'purple': new Audio('sonidos/TRA.wav'),
    "green": new Audio("sonidos/saoko_papi_saoko.mp3"),
    "pink": new Audio("sonidos/tu_biscochito.mp3"),
    "nidea": new Audio("sonidos/woooti a_1.mp3"),
};

const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', "nidea",];
const colorVotes = {};
let inactivityTimer;
const partyTitle = document.getElementById('party-title');
const colorPalette = document.getElementById('color-palette');
const danceFloor = document.getElementById('dance-floor');
const voteDisplay = document.getElementById('vote-display');
const timerDisplay = document.getElementById('timer-display');
const resetBtn = document.getElementById('reset-btn');

// Inicializar votos, de color por cada color vas a hacer, que los votos por ese color empiezan desde 0
colors.forEach(color => colorVotes[color] = 0);

// Crear botones de colores
colors.forEach(color => {
    const btn = document.createElement('button'); //Creamos un botón.
    btn.className = 'color-btn';//Le asignamos una clase CSS.
    btn.style.backgroundColor = color;//Le damos un color de fondo. dependiendo del color elegido del array
    btn.addEventListener('mouseover', () => selectColor(color));//
    colorPalette.appendChild(btn);//Lo añadimos al contenedor en la página.
});

function selectColor(color) {
    // Cambiar color del título
    partyTitle.style.color = color;

    // Reproducir sonido
    if (sounds[color]) sounds[color].play();

    // Cambiar color de la pista de baile
    danceFloor.style.backgroundColor = color;

    // Registrar voto
    colorVotes[color]++;
    updateVoteDisplay();

    // Reiniciar temporizador de inactividad
    resetInactivityTimer();
}

function updateVoteDisplay() {
    const mostPopularColor = Object.keys(colorVotes).reduce((a, b) => //objet.keys Este método obtiene un array con todas las claves (colores) del objeto colorVotes.

        colorVotes[a] > colorVotes[b] ? a : b //forma de usar if else pero con alternador ? a verdadero o mayor en este caso: b falso
    );
    voteDisplay.textContent = `Color más popular: ${mostPopularColor.toUpperCase()} (${colorVotes[mostPopularColor]} votos)`;
}

function resetInactivityTimer() {
    // Limpia cualquier temporizador de inactividad previo para evitar múltiples temporizadores en ejecución simultáneamente
    clearTimeout(inactivityTimer);

    // Define el tiempo restante de inactividad en 10 segundos
    let timeLeft = 10;

    // Define una función interna llamada updateTimer que actualizará el temporizador cada segundo
    function updateTimer() {
        // Actualiza el texto en pantalla para mostrar el tiempo restante
        timerDisplay.textContent = `Tiempo restante: ${timeLeft}s`;

        // Si queda tiempo, disminuye el tiempo restante en 1 segundo Este operador disminuye el valor de la variable a la que está asociado en 1.
        if (timeLeft > 0) {
            timeLeft--;
            // Configura el temporizador de inactividad para ejecutar updateTimer nuevamente después de 1 segundo (1000 milisegundos)
            inactivityTimer = setTimeout(updateTimer, 1000);
        } else {
            // Si no queda tiempo, llama a la función resetParty para restablecer el estado inicial
            resetParty();
        }
    }

    // Inicia la primera ejecución de la función updateTimer
    updateTimer();
}


function resetParty() {
    partyTitle.style.color = 'black';
    danceFloor.style.backgroundColor = 'transparent';

    // Reiniciar votos
    updateVoteDisplay();

    // Reiniciar temporizador
    resetInactivityTimer();
}

resetBtn.addEventListener('click', resetParty);

// Iniciar primer temporizador de inactividad
resetInactivityTimer();