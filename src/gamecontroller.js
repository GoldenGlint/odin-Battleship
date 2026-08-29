import {ship} from "./ship.js"
import {gameBoard} from  "./gameboard.js"
import {Player} from "./player.js"

class gameController{
    #player1;
    #player2;
    #activePlayer;
    #gameOver=false;

    constructor(player1name, player2name, player1type="HUMAN", player2type="HUMAN"){
        this.#player1=new Player(player1name, player1type);
        this.#player2=new Player(player2name, player2type);
        this.#activePlayer=this.#player1;
    }

    addShip(player, length, coords){
        player.#activePlayer.placeShip(length, coords);
        return true;
    }

    playTurn(pair){
        let enemy=this.#activePlayer==this.#player1 ? this.#player2 : this.#player1;
        const valid = this.#activePlayer.attack(enemy.gameboard, pair);
        if(!valid){
            return false;
        }

        if(enemy.gameboard.allSunk){
            this.#gameOver=true;
            return true;
        }

        this.#activePlayer=this.#activePlayer===this.#player1 ? this.#player2 : this.#player1;

        return true; 

    }

    get winner(){
        if(!this.#gameOver){
            return null;
        }

        return this.#activePlayer;
    }

    get activePlayer(){
        return this.#activePlayer;
    }

    get gameOver(){
        return this.#gameOver;
    }
    
}