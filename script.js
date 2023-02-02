// player1 = new Player('Human');
player1 = new AI('nim.AI', 'lp', 'n');
// player2 = new AI('nim.AI2', 'lp', 'n');
player2 = new Player('Žmogus');

nim = new Game(11, player1, player2);

let btns = document.querySelectorAll(`[id^="btn1"]`);
btns.forEach((b) => {
    b.addEventListener('click', player1.choiceMade);
});
btns = document.querySelectorAll(`[id^="btn2"]`);
btns.forEach((b) => {
    b.addEventListener('click', player2.choiceMade);
});

let selections = document.querySelectorAll(`[id^="select"]`);
selections.forEach((sel) => {
    sel.addEventListener('send', nim.moveMade);
});
document.getElementById('reset').addEventListener('click', nim.reset);
document.getElementById('resignAI1').addEventListener('resign', nim.aiResign);
document.getElementById('resignAI2').addEventListener('resign', nim.aiResign);

if (player1 instanceof AI) {
    document.getElementById('enableAI1').addEventListener('go', player1.go);
    player1.generateMoves(nim);
    document.getElementById('moves1').style.pointerEvents = 'none';
    document.getElementById('states1').style.display = 'flex';
    document.getElementById('ai1').innerHTML = `${player1.name} būsenos`;
}
if (player2 instanceof AI) {
    document.getElementById('enableAI2').addEventListener('go', player2.go);
    player2.generateMoves(nim);
    document.getElementById('moves2').style.pointerEvents = 'none';
    document.getElementById('states2').style.display = 'flex';
    document.getElementById('ai2').innerHTML = `${player2.name}2 būsenos:`;
}

let info_tgl = false;

function moreinfo() {
    document.getElementsByName('info_item').forEach((el) => {
        el.classList.toggle('hidden');
        el.classList.toggle('info');
    });
}
