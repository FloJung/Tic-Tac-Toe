// git init 
// git add .
// git commit -m "first commit"
// git push

let fields = [
    null, 'circle', 'circle',
    'circle', null, null,
    'cross', 'cross', null,
];


function init() {
    render();
}

function render() {
    const content = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < fields.length; i++) {
        if (i % 3 === 0) { // Neue Zeile nach jeder dritten Zelle
            html += '<tr>';
        }

        html += '<td class="cell">';
        if (fields[i] === 'circle') {
            html += 'O';
        } else if (fields[i] === 'cross') {
            html += 'X';
        }
        html += '</td>';

        if ((i + 1) % 3 === 0) { // Schließe die Zeile nach jeder dritten Zelle
            html += '</tr>';
        }
    }

    html += '</table>';
    content.innerHTML = html;
}


