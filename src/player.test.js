import { Player } from "./player.js";
import { gameBoard } from "./gameboard.js";

let testPlayer;

beforeEach(() => {
    testPlayer = new Player("Darren", "HUMAN");
});

test("player initializes correctly", () => {
    expect(testPlayer.name).toBe("Darren");
    expect(testPlayer.type).toBe("HUMAN");
    expect(testPlayer.gameboard).toBeInstanceOf(gameBoard);
});

test("player can attack another gameboard", () => {
    const enemyBoard = new gameBoard();

    enemyBoard.addShip(3, [
        [0, 0],
        [0, 1],
        [0, 2]
    ]);

    const result = testPlayer.attack(enemyBoard, [0, 0]);

    expect(result).toBe(true);
    expect(enemyBoard.hit).toEqual([
        [0, 0]
    ]);
});

test("player attack can record a miss", () => {
    const enemyBoard = new gameBoard();

    const result = testPlayer.attack(enemyBoard, [9, 9]);

    expect(result).toBe(true);
    expect(enemyBoard.miss).toEqual([
        [9, 9]
    ]);
});

test("player attack rejects duplicate coordinates", () => {
    const enemyBoard = new gameBoard();

    enemyBoard.addShip(3, [
        [0, 0],
        [0, 1],
        [0, 2]
    ]);

    expect(testPlayer.attack(enemyBoard, [0, 0])).toBe(true);
    expect(testPlayer.attack(enemyBoard, [0, 0])).toBe(false);

    expect(enemyBoard.hit).toEqual([
        [0, 0]
    ]);
});