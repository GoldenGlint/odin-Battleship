import { gameBoard } from "./gameboard";

export class Player{
    #name="Player";
    #gameboard=new gameBoard();
    #id=crypto.randomUUID();
    #type="HUMAN"
    constructor(name, type){
        this.name=name;
        this.#type=type;
    }
    attack(enemyBoard, pair){
        return enemyBoard.receiveAttack(pair);
    }
    placeShip(length, coords){
        return this.gameboard.addShip(length, coords);
    }
    get type(){
        return this.#type;
    }
    get id(){
        return this.#id;
    }
    get gameboard(){
        return this.#gameboard;
    }
    get name(){
        return this.#name;
    }
    set name(name){
        this.#name=name;
    }

}