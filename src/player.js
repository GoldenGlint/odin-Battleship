import { gameBoard } from "./gameboard";

export class Player{
    name="Player";
    #gameboard=new gameBoard();
    #id=crypto.randomUUID();
    #win=false;
    #type="CPU"
    constructor(name, type){
        this.name=name;
        this.#type=type;
    }
    attack(enemyBoard, pair){
        return enemyBoard.receiveAttack(pair);
    }
    get type(){
        return this.#type;
    }
    get id(){
        return this.#id;
    }
    get win(){
        return this.#win;
    }
    get gameboard(){
        return this.#gameboard;
    }
    get name(){
        return this.name;
    }

}