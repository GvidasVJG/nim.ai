class Game {
    moveMade = (e) => this.turn(e);
    reset = () => this.start();
    aiResign = (e) => this.resignAI(e);

    constructor(startState, player1, player2) {
        this.startState = startState;
        this.currState = startState;
        this.player1 = player1;
        this.player2 = player2;
    };

    displayWinner = () => {
        this.display.innerText = `${this.winner.name} wins`;
    }

    teachAI = () => {
        if (player1 instanceof AI) {
            if (this.player1.mode == 'lp' || this.player1.mode == 'l') {
                this.player1.teach(this.winner);
            }
            this.player1.represent(this);
        }
        if (player2 instanceof AI) {
            if (this.player2.mode == 'lp' || this.player2.mode == 'l') {
                this.player2.teach(this.winner);
            }
            this.player2.represent(this);
        }
    }

    resignAI = (event) => {
        let ai = event.detail;
        if (this.currPlayer == ai) {
            this.winner = this.nextPlayer;
        } else {
            this.winner = this.currPlayer;
        }
        this.displayWinner();
        this.teachAI();
        if (this.player1 instanceof AI && this.player2 instanceof AI) {
            this.start();
        }
        return;
    }

    turn = (event) => {
        let choice = event.detail[0];

        this.currState -= choice;
        if (this.currState <= 3) {
            document.getElementById('btn1_3').classList.add('unavailable');
            document.getElementById('btn2_3').classList.add('unavailable');
        }
        if (this.currState <= 2) {
            document.getElementById('btn1_2').classList.add('unavailable');
            document.getElementById('btn2_2').classList.add('unavailable');
        }
        if (this.currState <= 1) {
            document.getElementById('btn1_1').classList.add('unavailable');
            document.getElementById('btn2_1').classList.add('unavailable');
        }
        if (this.currState == 1) {
            this.winner = this.currPlayer;
            this.displayWinner();
            this.teachAI();
            if (this.player1 instanceof AI && this.player2 instanceof AI) {
                this.start();
            }
            return;
        }
        ++this.turnNo;
        this.display.innerHTML = this.currState;
        this.swapPlayers();
    }

    swapPlayers = () => {
        let swap = this.currPlayer;
        this.currPlayer = this.nextPlayer;
        this.nextPlayer = swap;
        document.getElementById('moves1').classList.toggle('hidden');
        document.getElementById('moves2').classList.toggle('hidden');
        if (this.currPlayer instanceof AI && this.currPlayer == this.player1) {
            document.getElementById('enableAI1').dispatchEvent(new CustomEvent('go', { detail: [this, 1] }));
        } else if (this.currPlayer instanceof AI && this.currPlayer == this.player2) {
            document.getElementById('enableAI2').dispatchEvent(new CustomEvent('go', { detail: [this, 2] }));
        }
    }

    resetGame = () => {
        this.currState = this.startState;
        this.turnNo = Player.prototype.turnNo;
        let btns = document.querySelectorAll(`[id^="btn1"], [id^="btn2"]`);
        btns.forEach((b) => {
            if (b.classList.contains('unavailable')) {
                b.classList.remove('unavailable');
            }
        });
        if (document.getElementById('moves1').classList.contains('hidden')) {
            document.getElementById('moves1').classList.toggle('hidden');
            document.getElementById('moves2').classList.toggle('hidden');
        }
        this.display.innerHTML = this.currState;
        this.currPlayer = this.player1;
        this.nextPlayer = this.player2;
    }

    start = () => {
        this.resetGame();
        if (this.currPlayer instanceof AI) {
            document.getElementById('enableAI1').dispatchEvent(new CustomEvent('go', { detail: [this, 1] }));
        }
    }
}

Game.prototype.display = document.getElementById('display');
Game.prototype.turnNo = 1;
Game.prototype.startState = 11;
Game.prototype.currState = 11;
Game.prototype.player1 = new Player('Player1');
Game.prototype.player2 = new Player('Player2');
Game.prototype.winner = null;