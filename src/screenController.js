import { render } from "./render.js";
import { gameController } from "./gamecontroller.js";

export function ScreenController(){

    let game;

    const p1Header = document.querySelector("#p1Header");
    const p2Header = document.querySelector("#p2Header");
    const p1Grid = document.querySelector("#p1Grid");
    const p2Grid = document.querySelector("#p2Grid");
    const restartButton = document.querySelector("#restart");
    const winnerScreen = document.querySelector("#winners-screen");

    restartButton.addEventListener("click", () => {
        window.location.reload();
    });

    function startGame(){
        
        const startScreen=document.querySelector("#initial-screen");
        const startButton=document.querySelector("#start-game");

        startScreen.showModal();

        startButton.addEventListener("click", ()=>{
            const playerOneName=document.querySelector("#player-one-name").value||"Player One";
            const playerTwoName=document.querySelector("#player-two-name").value||"Player Two";
            const playerOneType = document.querySelector("#player-one-type").value||"HUMAN"; 
            const playerTwoType = document.querySelector("#player-two-type").value||"HUMAN";
            
            game = new gameController(
                playerOneName,
                playerTwoName,
                playerOneType,
                playerTwoType
            )
            setup();

            startScreen.close();

            renderAll();

        })
        
        
    }

    function setup(){
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

    
    function handleAttack(coords) {
        const valid = game.playTurn(coords);
        if(!valid){
            return;
        }
        renderAll();
    }

    function renderAll(){
        if (game.gameOver) {

            render.renderWinner(
                game.winner.name
            );

            // Show both boards, neither clickable
            render.renderBoard(
                game.player1.gameboard,
                p1Grid,
                true,
                false,
                handleAttack
            );

            render.renderBoard(
                game.player2.gameboard,
                p2Grid,
                true,
                false,
                handleAttack
            );

            return;
        }

        render.renderTurn(game.activePlayer.name);

        render.renderHeader(
            p1Header, game.player1.name, game.player1.gameboard.sunkNumber
        );

        render.renderHeader(
            p2Header, game.player2.name, game.player2.gameboard.sunkNumber
        );

        if(game.activePlayer==game.player1){
            render.renderBoard(game.player1.gameboard, p1Grid, true, false, handleAttack);
            render.renderBoard(game.player2.gameboard, p2Grid, false, true, handleAttack);
        }
        else{
            render.renderBoard(game.player1.gameboard, p1Grid, false, true, handleAttack);
            render.renderBoard(game.player2.gameboard, p2Grid, true, false, handleAttack);
        }

    }
    return{
        startGame,
        renderAll
    };
}