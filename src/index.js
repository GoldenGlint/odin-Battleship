import "./styles.css"
//http://localhost:8080/


class ship{
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

const testShip = new ship(3, [
    [0, 0],
    [0, 1],
    [0, 2]
]);

function test(name, actual, expected) {
    const actualText = JSON.stringify(actual);
    const expectedText = JSON.stringify(expected);

    if (actualText === expectedText) {
        console.log(`PASS: ${name}`);
    } else {
        console.log(`FAIL: ${name}`);
        console.log(`Expected: ${expectedText}`);
        console.log(`Actual:   ${actualText}`);
    }
}

console.log("Initial:");
console.log("Length:", testShip.length);       // 3
console.log("Coords:", testShip.coords);       // [[0,0],[0,1],[0,2]]
console.log("Hit count:", testShip.hitCount);   // 0
console.log("Hit coords:", testShip.hitCoords); // []
console.log("Sunk:", testShip.sunk);            // false

console.log("\nShoot [0, 0]");
testShip.processShot([0, 0]);
console.log("Hit count:", testShip.hitCount);   // 1
console.log("Hit coords:", testShip.hitCoords); // [[0,0]]
console.log("Sunk:", testShip.sunk);            // false

console.log("\nShoot [5, 5]");
testShip.processShot([5, 5]);
console.log("Hit count:", testShip.hitCount);   // still 1
console.log("Sunk:", testShip.sunk);            // false

console.log("\nShoot [0, 1]");
testShip.processShot([0, 1]);
console.log("Hit count:", testShip.hitCount);   // 2
console.log("Hit coords:", testShip.hitCoords);
console.log("Sunk:", testShip.sunk);            // false

console.log("\nShoot [0, 2]");
testShip.processShot([0, 2]);
console.log("Hit count:", testShip.hitCount);   // 3
console.log("Hit coords:", testShip.hitCoords);
console.log("Sunk:", testShip.sunk);            // true
const testShip1 = new ship(3, [
    [0, 0],
    [0, 1],
    [0, 2]
]);

test("starts with 0 hits", testShip1.hitCount, 0);
test("starts not sunk", testShip1.sunk, false);

testShip1.processShot([0, 0]);

test("hit count becomes 1", testShip1.hitCount, 1);
test("records first hit", testShip1.hitCoords, [[0, 0]]);
test("still not sunk", testShip1.sunk, false);

testShip1.processShot([0, 1]);

test("hit count becomes 2", testShip1.hitCount, 2);
test(
    "records two hits",
    testShip1.hitCoords,
    [[0, 0], [0, 1]]
);

testShip1.processShot([0, 2]);

test("hit count becomes 3", testShip1.hitCount, 3);
test("ship is sunk", testShip1.sunk, true);