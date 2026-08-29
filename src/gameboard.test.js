import { gameBoard } from "./gameboard.js";
import {ship} from "./ship.js";

let testGameBoard;

beforeEach(() => {
    testGameBoard = new gameBoard();


    testGameBoard.addShip(3, [
        [0, 0],
        [0, 1],
        [0, 2]
    ]);

    testGameBoard.addShip(2, [
        [2, 3],
        [3, 3]
    ]);

    testGameBoard.addShip(4, [
        [5, 1],
        [5, 2],
        [5, 3],
        [5, 4]
    ]);
});

test("gameboard initializes correctly", () => {

    const ship1Coords = [
    [0, 0],
    [0, 1],
    [0, 2]
    ];

    const ship2Coords = [
        [2, 3],
        [3, 3]
    ];

    const ship3Coords = [
        [5, 1],
        [5, 2],
        [5, 3],
        [5, 4]
    ];
    let ship1=new ship(3, ship1Coords);
    let ship2=new ship(3, ship2Coords);
    let ship3=new ship(3, ship3Coords);
    expect(testGameBoard.ships).toEqual([
        ship1,
        ship2,
        ship3
    ]);
    expect(testGameBoard.hit).toEqual([]);
    expect(testGameBoard.miss).toEqual([]);
    expect(testGameBoard.allSunk).toBe(false);
    
});



test("records a hit", () => {
    testGameBoard.receiveAttack([0, 0]);


    expect(testGameBoard.hit).toEqual([
        [0, 0]
    ]);
   
});

test("does not record a missed shot", () => {
    testGameBoard.receiveAttack([5, 5]);

    expect(testGameBoard.hit).toEqual([]);
    expect(testGameBoard.miss).toEqual([[5,5]]);
});

test("records multiple hits", () => {
    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([0, 1]);

    expect(testGameBoard.hit).toEqual([
        [0, 0],
        [0, 1]
    ]);

    expect(testGameBoard.miss).toEqual([]);
});

test("records multiple misses", () => {
    testGameBoard.receiveAttack([9, 9]);
    testGameBoard.receiveAttack([8, 8]);

    expect(testGameBoard.miss).toEqual([
        [9, 9],
        [8, 8]
    ]);

    expect(testGameBoard.hit).toEqual([]);
});

test("duplicate hit is rejected", () => {
    expect(testGameBoard.receiveAttack([0, 0])).toBe(true);
    expect(testGameBoard.receiveAttack([0, 0])).toBe(false);

    expect(testGameBoard.hit).toEqual([
        [0, 0]
    ]);
});

test("duplicate miss is rejected", () => {
    expect(testGameBoard.receiveAttack([9, 9])).toBe(true);
    expect(testGameBoard.receiveAttack([9, 9])).toBe(false);

    expect(testGameBoard.miss).toEqual([
        [9, 9]
    ]);
});

test("allSunk stays false if some ships are still alive", () => {
    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([0, 1]);
    testGameBoard.receiveAttack([0, 2]);

    expect(testGameBoard.allSunk).toBe(false);
});

test("allSunk becomes true when every ship is sunk", () => {
    // ship 1
    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([0, 1]);
    testGameBoard.receiveAttack([0, 2]);

    // ship 2
    testGameBoard.receiveAttack([2, 3]);
    testGameBoard.receiveAttack([3, 3]);

    // ship 3
    testGameBoard.receiveAttack([5, 1]);
    testGameBoard.receiveAttack([5, 2]);
    testGameBoard.receiveAttack([5, 3]);
    testGameBoard.receiveAttack([5, 4]);

    expect(testGameBoard.allSunk).toBe(true);
});

test("clearBoard resets the gameboard", () => {
    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([9, 9]);

    testGameBoard.clearBoard();

    expect(testGameBoard.ships).toEqual([]);
    expect(testGameBoard.hit).toEqual([]);
    expect(testGameBoard.miss).toEqual([]);
    expect(testGameBoard.allSunk).toBe(false);
});