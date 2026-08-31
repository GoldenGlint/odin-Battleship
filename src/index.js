import "./styles.css"
//http://localhost:8080/
import {ship} from "./ship.js"
import {gameBoard} from  "./gameboard.js"
import {Player} from "./player.js"
import { gameController } from "./gamecontroller.js"
import { ScreenController } from "./screenController.js"


const game = new gameController(
    "Player One",
    "Player Two"
);

game.addShip(
    game.player1,
    5,
    [[0,0], [0,1], [0,2], [0,3], [0,4]]
);

game.addShip(
    game.player1,
    4,
    [[2,0], [2,1], [2,2], [2,3]]
);

game.addShip(
    game.player1,
    3,
    [[4,0], [4,1], [4,2]]
);


game.addShip(
    game.player2,
    5,
    [[1,0], [1,1], [1,2], [1,3], [1,4]]
);

game.addShip(
    game.player2,
    4,
    [[3,0], [3,1], [3,2], [3,3]]
);

game.addShip(
    game.player2,
    3,
    [[5,0], [5,1], [5,2]]
);


const screen = ScreenController(game);

screen.renderAll();



