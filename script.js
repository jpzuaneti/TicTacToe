const tic_tac_toe = {
    board: ['','','','','','','','',''],
    wins: [0, 0],  
    simbols: {
        options: ['X','O'],
        turn_index: 0,
        change() {
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    wining_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    init(container) {
        this.container_element = container;
        this.make_description();
        this.add_rank();
    },

    make_play(position) {
        if(this.gameover) return false;
        if(this.board[position] === '') {
            this.board[position] = this.simbols.options[this.simbols.turn_index];
            this.draw();
            let wining_sequences_index = this.check_wining_sequences(this.simbols.options[this.simbols.turn_index])
            if(wining_sequences_index >= 0) {
                this.game_is_over();
            } else {
                this.simbols.change();
                this.make_description();
                this.check_old();
            }

            return true;
        } else {
            return false;
        }
    },

    game_is_over() {
        // pegar o simbolo ganhador
        const turn = this.simbols.turn_index
        const winner = this.simbols.options[turn];

        const description = document.querySelector('.description');
        description.innerHTML = `<p> VENCEDOR ' ${winner} ' !!</p>`;
        description.classList.add('winner');

        this.wins[turn] += 1;
        this.add_rank();
        this.gameover = true;
    },  

    add_rank() {
        const rank_list_1 = document.querySelector('.rank_list_1');
        const rank_list_2 = document.querySelector('.rank_list_2');
        const rank_winner = document.querySelector('.rank_winner');
        const rank_restart = document.querySelector('.rank_restart');

        rank_list_1.innerHTML = `X = ${this.wins[0]}`;
        rank_list_2.innerHTML = `O = ${this.wins[1]}`;

        if(this.wins[0] == 3) {
            rank_winner.innerHTML = `'X' Ganhou !!`;
            rank_winner.classList.add('rank_winner_visible');
            rank_restart.classList.add('rank_restart_visible');
        } else if(this.wins[1] == 3) {
            rank_winner.innerHTML = `'O' Ganhou !!`;
            rank_winner.classList.add('rank_winner_visible');
            rank_restart.classList.add('rank_restart_visible');
        }
    },

    clear_rank() {
        this.wins[0] = 0
        this.wins[1] = 0
        this.add_rank();
        const rank_restart = document.querySelector('.rank_restart');
        const rank_winner = document.querySelector('.rank_winner');
        rank_restart.classList.remove('rank_restart_visible');
        rank_winner.classList.remove('rank_winner_visible');

    },

    check_wining_sequences(simbol) {
        for(i in this.wining_sequences) {
            if ( 
                this.board[ this.wining_sequences[i][0] ] == simbol && 
                this.board[ this.wining_sequences[i][1] ] == simbol && 
                this.board[ this.wining_sequences[i][2] ] == simbol ) {
                    return i;
            }
        };

        return -1;
    },

    make_description() {
        const description = document.querySelector('.description')
        if(description.classList.contains('winner')) {
            description.classList.remove('winner');
        }

        if(description.classList.contains('old')) {
            description.classList.remove('old');
        }

        description.innerHTML = `<p> VEZ DO ' ${this.simbols.options[this.simbols.turn_index]} '</p>`
    },

    check_old() {
        if(!this.board.includes('')) {
            const description = document.querySelector('.description');
            description.innerHTML = `<p> DEU VELHA !!</p>`;
            description.classList.add('old');
        }
    },
    
    draw() {
        let content = '';

        for(i in this.board) {
            content += `<div onclick="tic_tac_toe.make_play('${i}')">${this.board[i]}</div>`;
        };

        this.container_element.innerHTML = content;;
    },

    restart() {
        this.start();
        this.make_description();
    },

    start() {
        this.board.fill(''); // preenche todo o array com ''
        this.draw();
        this.gameover = false;
    },

    reset() {
        this.restart();
        this.clear_rank();
    },
};
