// git init 
// git add .
// git commit -m "first commit"
// git push

let fields = [
    null, null, null,
    null, null, null,
    null, null, null,
];

let currentPlayer = 'circle';
let gameActive = true;

function init() {
    render();
}

function render() {
    const content = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < fields.length; i++) {
        if (i % 3 === 0) {
            html += '<tr>';
        }

        html += `<td class="cell" onclick="makeMove(${i})">`;
        if (fields[i] === 'circle') {
            html += createAnimatedCircle();
        } else if (fields[i] === 'cross') {
            html += createCross();
        }
        html += '</td>';

        if ((i + 1) % 3 === 0) {
            html += '</tr>';
        }
    }

    html += '</table>';
    content.innerHTML = html;
}

function restartGame() {
    fields = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];
    render();
}

function makeMove(index) {
    if (fields[index] === null && gameActive) {
        fields[index] = currentPlayer;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        render();
        checkForWin();
    }
}

function checkForWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Zeilen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]            // Diagonalen
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            gameActive = false; // Spiel beendet
            drawWinLine(condition);
            break;
        }
    }
}


function drawWinLine(winCondition) {
    const [a, b, c] = winCondition;
    const content = document.getElementById('content');
    let x1, y1, x2, y2;

    // Berechne die Koordinaten für die Start- und Endpunkte der Linie
    // basierend auf den Indexwerten a, b und c
    x1 = (a % 3) * 60 + 32; // 60 ist die Breite/Höhe einer Zelle, 30 für die Mitte der Zelle
    y1 = Math.floor(a / 3) * 60 + 32;

    x2 = (c % 3) * 60 + 32;
    y2 = Math.floor(c / 3) * 60 + 32;

    // Erstellen des SVG-Elements für die Linie
    const svgLine = `
        <svg class="win-line" width="180px" height="180px" xmlns="http://www.w3.org/2000/svg" style="position: absolute;">
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="5" />
        </svg>
    `;

    // Hinzufügen des SVG-Elements zum Content-Div
    content.innerHTML += svgLine;
}



function createAnimatedCircle() {
    const svgHTML = `
        <svg width="60px" height="60px" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="7">
                <animate attributeName="stroke-dashoffset" from="188.49556" to="0" dur="0.5s" begin="0s" fill="freeze" />
            </circle>
        </svg>
        <style>
            svg circle {
                stroke-dasharray: 188.49556; /* Circumference of the circle */
                stroke-dashoffset: 188.49556;
            }
        </style>
    `;

    return svgHTML;
}

function createCross() {
    const svgHTML = `
        <svg width="60px" height="60px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(45, 30, 30)">
                <!-- Linien des Kreuzes -->
                <!-- Oben Links nach Mitte -->
                <line x1="0" y1="30" x2="30" y2="30" stroke="#FFC000" stroke-width="7" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.5s" fill="freeze" />
                </line>
                <!-- Oben Rechts nach Mitte -->
                <line x1="60" y1="30" x2="30" y2="30" stroke="#FFC000" stroke-width="7" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.5s" fill="freeze" />
                </line>
                <!-- Unten Links nach Mitte -->
                <line x1="30" y1="0" x2="30" y2="30" stroke="#FFC000" stroke-width="7" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.5s" fill="freeze" />
                </line>
                <!-- Unten Rechts nach Mitte -->
                <line x1="30" y1="60" x2="30" y2="30" stroke="#FFC000" stroke-width="7" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.5s" fill="freeze" />
                </line>
            </g>
        </svg>
        <style>
            svg line {
                stroke-dasharray: 30; /* Länge jeder Linie */
                stroke-dashoffset: 30; /* Startet unsichtbar und wird sichtbar */
            }
        </style>
    `;

    return svgHTML;
}








