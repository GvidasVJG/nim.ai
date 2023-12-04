let toggleAIvsHuman = true;
// player1 = new Player('Pirmasis žmogus');
player1 = new AI('nim.AI', 'lp', 'n');
// player2 = new AI('nim.AI.2', 'lp', 'p');
player2 = (player1 instanceof AI && toggleAIvsHuman) ? new Player('Žmogus') : new Player('Antrasis žmogus');

startingNum = 10;

document.getElementById('player_1').innerHTML = player1.name+":";
document.getElementById('player_2').innerHTML = player2.name+":";

nim = new Game(startingNum, player1, player2);

let states1 = document.getElementById('states1');
for(let i = 2; i < startingNum+1; ++i){
    let box = document.createElement('div');
    box.classList.add('box');
    let namebox = document.createElement('div');
    let boxbox = document.createElement('div');
    namebox.id = `name1_${i}`;
    boxbox.id = `box1_${i}`;
    box.appendChild(namebox);
    box.appendChild(boxbox);
    states1.appendChild(box);
}

let states2 = document.getElementById('states2');
for(let i = 2; i < startingNum+1; ++i){
    let box = document.createElement('div');
    box.classList.add('box');
    let namebox = document.createElement('div');
    let boxbox = document.createElement('div');
    namebox.id = `name2_${i}`;
    boxbox.id = `box2_${i}`;
    box.appendChild(namebox);
    box.appendChild(boxbox);
    states2.appendChild(box);
}

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
    document.getElementById('ai2').innerHTML = `${player2.name} būsenos:`;
}

let info_tgl = false;

function moreinfo() {
    document.getElementsByName('info_item').forEach((el) => {
        el.classList.toggle('hidden');
        el.classList.toggle('info');
    });
}

let matches_box = document.getElementById('matches');
matches = '';
for(let i = 0; i < startingNum; ++i){
    matches += '<img src="match.png" style="width:30px;">';
}
matches_box.innerHTML = matches;