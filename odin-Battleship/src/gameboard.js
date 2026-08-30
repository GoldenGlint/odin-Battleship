import {ship} from "./ship"

export class gameBoard{
    #ships=[];
    #miss=[];
    #hit=[];
    #allSunk;
    #size=10;

    constructor(){
        this.#allSunk=false;
    };

    isValidCoordinate(pair) {
        const [row, col] = pair;

        return (
            row >= 0 &&
            row < this.#size &&
            col >= 0 &&
            col < this.#size
        );
    }

    addShip(length, coords){
        let newShip=new ship(length, coords);
        this.#ships.push(newShip);
    }

    receiveAttack(pair){
        if (!this.isValidCoordinate(pair)) {
            return false;
        }
        
        const alreadyHit = this.#hit.some(
        coord => coord[0] === pair[0] && coord[1] === pair[1]
        );

        const alreadyMissed = this.#miss.some(
            coord => coord[0] === pair[0] && coord[1] === pair[1]
        );

        if (alreadyHit || alreadyMissed) {
            return false;
        }

        for(let i=0; i<this.#ships.length; i++){
            if(this.#ships[i].processShot(pair)){
                this.#hit.push(pair);
                this.checkSunk();
                return true;
            }
        }

        this.#miss.push(pair);
        return true;


    }

    checkSunk(){
        let ans=true;
        for(let i=0; i<this.#ships.length; i++){
            if(!this.#ships[i].sunk){
                ans=false;
            }
        }
        if(ans){
            this.#allSunk=true;
            return true;
        }
        else{
            return false;
        }
    }

    clearBoard(){
        this.#ships=[];
        this.#allSunk=false;
        this.#hit=[];
        this.#miss=[];
    }
    
    get hit(){
        return this.#hit;
    }

    get miss(){
        return this.#miss;
    }

    get ships(){
        return this.#ships;
    }
    get allSunk(){
        return this.#allSunk;
    }

}

/*
Create a Gameboard class/factory.
Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
Gameboards should keep track of missed attacks so they can display them properly.
Gameboards should be able to report whether or not all of their ships have been sunk.
*/