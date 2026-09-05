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

        startButton.addEventListener("click", async ()=>{
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

            startScreen.close();

            await setup();

            renderAll();

        })
        
        
    }

    async function setup() {
        if (game.player1.type === "CPU") {
            setupRandomShips(game.player1);
        } 
        else{
            await setupHumanShips(game.player1);
        }

        if (game.player2.type === "CPU") {
            setupRandomShips(game.player2);
        }
        else{
            await setupHumanShips(game.player2);
        }
    }

    function setupHumanShips(player) {
        return new Promise((resolve) => {

            const shipLengths = [5, 4, 3];

            let shipIndex = 0;
            let horizontal = true;

            const occupied = new Set();

            const placementControls =
                document.querySelector("#placement-controls");

            const placementMessage =
                document.querySelector("#placement-message");

            const rotateButton =
                document.querySelector("#rotate-ship");

            const grid =
                player === game.player1
                    ? p1Grid
                    : p2Grid;

            const otherGrid =
                player === game.player1
                    ? p2Grid
                    : p1Grid;

            placementControls.hidden = false;

            // Don't show the other player's board while placing
            otherGrid.innerHTML = "";

            function rotateShip() {
                horizontal = !horizontal;
                updateMessage();
            }

            rotateButton.addEventListener("click", rotateShip);

            function updateMessage() {
                const length = shipLengths[shipIndex];

                placementMessage.textContent =
                    `${player.name}: place your length ${length} ship — ` +
                    `${horizontal ? "Horizontal" : "Vertical"}`;
            }

            function getCoordinates(start, length) {
                const [row, col] = start;

                const coords = [];

                for (let i = 0; i < length; i++) {
                    if (horizontal) {
                        coords.push([row, col + i]);
                    } else {
                        coords.push([row + i, col]);
                    }
                }

                return coords;
            }

            function validPlacement(coords) {
                for (const [row, col] of coords) {

                    // Outside the board
                    if (
                        row < 0 ||
                        row >= 10 ||
                        col < 0 ||
                        col >= 10
                    ) {
                        return false;
                    }

                    // Overlaps another ship
                    if (occupied.has(`${row},${col}`)) {
                        return false;
                    }
                }

                return true;
            }

            function placeShip(startCoords) {
                const length = shipLengths[shipIndex];

                const coords =
                    getCoordinates(startCoords, length);

                if (!validPlacement(coords)) {
                    placementMessage.textContent =
                        "Invalid position. Try another square.";

                    return;
                }

                game.addShip(
                    player,
                    length,
                    coords
                );

                coords.forEach(([row, col]) => {
                    occupied.add(`${row},${col}`);
                });

                shipIndex++;

                // All ships placed
                if (shipIndex === shipLengths.length) {
                    rotateButton.removeEventListener(
                        "click",
                        rotateShip
                    );

                    placementControls.hidden = true;

                    resolve();

                    return;
                }

                updateMessage();

                render.renderBoard(
                    player.gameboard,
                    grid,
                    true,
                    true,
                    placeShip
                );
            }

            updateMessage();

            render.renderBoard(
                player.gameboard,
                grid,
                true,
                true,
                placeShip
            );
        });
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