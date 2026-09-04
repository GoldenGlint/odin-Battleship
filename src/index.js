import "./styles.css"
//http://localhost:8080/
import {ship} from "./ship.js"
import {gameBoard} from  "./gameboard.js"
import {Player} from "./player.js"
import { gameController } from "./gamecontroller.js"
import { ScreenController } from "./screenController.js"

let game;

function startGame(){
    
    const startScreen=document.querySelector("#initial-screen");
    const startButton=document.querySelector("#start-game");

    startScreen.showModal();

    startButton.addEventListener("click", ()=>{
        const playerOneName=document.querySelector("#player-one-name").value||"Player One";
        const playerTwoName=document.querySelector("#player-two-name").value||"Player Two";
        const playerOneType = document.querySelector("#player-one-type").value||"HUMAN"; 
        const playerTwoType = document.querySelector("#player-two-type").value||"HUMAN";
        startScreen.close();
        game = new gameController(
            playerOneName,
            playerTwoName,
            playerOneType,
            playerTwoType
        )
        setup(game);


        const screen = ScreenController(game);

        screen.renderAll();

    })
    
    
}

function setup(game){
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
}

startGame();







