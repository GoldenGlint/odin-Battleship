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

    function setup() {
    setupRandomShips(game.player1);
    setupRandomShips(game.player2);
}

    function setupRandomShips(player) {
        const shipLengths = [5, 4, 3];
        const occupied = new Set();

        for (const length of shipLengths) {
            let placed = false;

            while (!placed) {
                const horizontal = Math.random() < 0.5;

                let row;
                let col;

                if (horizontal) {
                    row = Math.floor(Math.random() * 10);
                    col = Math.floor(Math.random() * (11 - length));
                } else {
                    row = Math.floor(Math.random() * (11 - length));
                    col = Math.floor(Math.random() * 10);
                }

                const coords = [];

                for (let i = 0; i < length; i++) {
                    if (horizontal) {
                        coords.push([row, col + i]);
                    } else {
                        coords.push([row + i, col]);
                    }
                }

                const overlaps = coords.some(([r, c]) =>
                    occupied.has(`${r},${c}`)
                );

                if (overlaps) {
                    continue;
                }

                game.addShip(
                    player,
                    length,
                    coords
                );

                coords.forEach(([r, c]) => {
                    occupied.add(`${r},${c}`);
                });

                placed = true;
            }
        }
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