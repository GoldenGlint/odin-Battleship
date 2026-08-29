import { ship } from "./ship.js";

let testShip;

beforeEach(() => {
    testShip = new ship(3, [
        [0, 0],
        [0, 1],
        [0, 2]
    ]);
});

test("ship initializes correctly", () => {
    expect(testShip.length).toBe(3);
    expect(testShip.coords).toEqual([
        [0, 0],
        [0, 1],
        [0, 2]
    ]);
    expect(testShip.hitCount).toBe(0);
    expect(testShip.hitCoords).toEqual([]);
    expect(testShip.sunk).toBe(false);
});

test("records a hit", () => {
    testShip.processShot([0, 0]);

    expect(testShip.hitCount).toBe(1);
    expect(testShip.hitCoords).toEqual([
        [0, 0]
    ]);
    expect(testShip.sunk).toBe(false);
});

test("does not record a missed shot", () => {
    testShip.processShot([5, 5]);

    expect(testShip.hitCount).toBe(0);
    expect(testShip.hitCoords).toEqual([]);
    expect(testShip.sunk).toBe(false);
});

test("records multiple hits", () => {
    testShip.processShot([0, 0]);
    testShip.processShot([0, 1]);

    expect(testShip.hitCount).toBe(2);
    expect(testShip.hitCoords).toEqual([
        [0, 0],
        [0, 1]
    ]);
    expect(testShip.sunk).toBe(false);
});

test("ship becomes sunk after all coordinates are hit", () => {
    testShip.processShot([0, 0]);
    testShip.processShot([0, 1]);
    testShip.processShot([0, 2]);

    expect(testShip.hitCount).toBe(3);
    expect(testShip.hitCoords).toEqual([
        [0, 0],
        [0, 1],
        [0, 2]
    ]);
    expect(testShip.sunk).toBe(true);
});