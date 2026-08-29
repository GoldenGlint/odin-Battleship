export class ship{
    #length;
    #sunk;
    #coords=[];
    #hitCount;
    #hitCoords=[];

    constructor(length, coords){
        this.#length=length;
        this.#coords=coords;
        this.#sunk=false;
        this.#hitCount=0;
    }
    processShot(pair){
        const result = this.#coords.filter(x => !this.#hitCoords.includes(x));
        for(let i=0; i<result.length; i++){
            if(pair[0]==result[i][0]&&pair[1]==result[i][1]){
                this.#hitCount++;
                this.#hitCoords.push(pair);
                this.checkSunk();
            }
        }
    }
    checkSunk(){
        if(this.#coords.length==this.#hitCoords.length){
            this.#sunk=true;
        }
    }
    get length(){
        return this.#length;
    }
    get sunk(){
        return this.#sunk;
    }
    get coords(){
        return this.#coords;
    }
    get hitCount(){
        return this.#hitCount;
    }
    get hitCoords(){
        return this.#hitCoords;
    }


}