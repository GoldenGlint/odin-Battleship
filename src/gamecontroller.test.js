import { gameController } from "./gamecontroller.js";

let game;

beforeEach(() => {
    game = new gameController("Player 1", "Player 2");
});

test("game initializes correctly", () => {
    expect(game.player1.name).toBe("Player 1");
    expect(game.player2.name).toBe("Player 2");

    expect(game.activePlayer).toBe(game.player1);
    expect(game.gameOver).toBe(false);
    expect(game.winner).toBe(null);
});

test("can add ship to player 1", () => {
    game.addShip(game.player1, 3, [
        [0, 0],
        [0, 1],
        [0, 2]
    ]);

    expect(game.player1.gameboard.ships.length).toBe(1);

    expect(game.player1.gameboard.ships[0].coords).toEqual([
        [0, 0],
        [0, 1],
        [0, 2]
    ]);
});

test("can add ship to player 2", () => {
    game.addShip(game.player2, 2, [
        [5, 5],
        [5, 6]
    ]);

    expect(game.player2.gameboard.ships.length).toBe(1);

    expect(game.player2.gameboard.ships[0].coords).toEqual([
        [5, 5],
        [5, 6]
    ]);
});

test("valid turn switches active player", () => {
    game.addShip(game.player2, 2, [
        [5, 5],
        [5, 6]
    ]);

    expect(game.activePlayer).toBe(game.player1);

    game.playTurn([5, 5]);

    expect(game.activePlayer).toBe(game.player2);
});

test("invalid duplicate turn does not switch player", () => {
    game.addShip(game.player2, 2, [
        [5, 5],
        [5, 6]
    ]);

    game.playTurn([5, 5]);

    // player 2's turn now
    game.playTurn([9, 9]);

    // player 1's turn again
    expect(game.activePlayer).toBe(game.player1);

    // player 1 already attacked [5,5]
    const result = game.playTurn([5, 5]);

    expect(result).toBe(false);

    // should still be player 1's turn
    expect(game.activePlayer).toBe(game.player1);
});

test("game ends when enemy ships are all sunk", () => {
    game.addShip(game.player2, 1, [
        [0, 0]
    ]);

    game.playTurn([0, 0]);

    expect(game.gameOver).toBe(true);
    expect(game.winner).toBe(game.player1);
});

test("winner is null before game is over", () => {
    game.addShip(game.player2, 2, [
        [0, 0],
        [0, 1]
    ]);

    game.playTurn([0, 0]);

    expect(game.gameOver).toBe(false);
    expect(game.winner).toBe(null);
});

test("plays a full game", () => {
    // Give each player one ship
    game.addShip(game.player1, 2, [
        [0, 0],
        [0, 1]
    ]);

    game.addShip(game.player2, 2, [
        [5, 5],
        [5, 6]
    ]);

    // Player 1 attacks Player 2
    expect(game.activePlayer).toBe(game.player1);

    game.playTurn([5, 5]);

    expect(game.player2.gameboard.hit).toEqual([
        [5, 5]
    ]);

    expect(game.gameOver).toBe(false);
    expect(game.activePlayer).toBe(game.player2);

    // Player 2 attacks Player 1
    game.playTurn([0, 0]);

    expect(game.player1.gameboard.hit).toEqual([
        [0, 0]
    ]);

    expect(game.gameOver).toBe(false);
    expect(game.activePlayer).toBe(game.player1);

    // Player 1 misses
    game.playTurn([9, 9]);

    expect(game.player2.gameboard.miss).toEqual([
        [9, 9]
    ]);

    expect(game.activePlayer).toBe(game.player2);

    // Player 2 misses
    game.playTurn([8, 8]);

    expect(game.player1.gameboard.miss).toEqual([
        [8, 8]
    ]);

    expect(game.activePlayer).toBe(game.player1);

    // Player 1 sinks Player 2's ship
    game.playTurn([5, 6]);

    expect(game.player2.gameboard.hit).toEqual([
        [5, 5],
        [5, 6]
    ]);

    expect(game.player2.gameboard.allSunk).toBe(true);
    expect(game.gameOver).toBe(true);

    // Player 1 should be the winner
    expect(game.winner).toBe(game.player1);
});