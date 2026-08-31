import {render} from "./render.js"
export function ScreenController(game){
    const p1Header = document.querySelector("#p1Header");
    const p2Header = document.querySelector("#p2Header");
    const p1Grid = document.querySelector("#p1Grid");
    const p2Grid = document.querySelector("#p2Grid");

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
        renderAll
    };
}