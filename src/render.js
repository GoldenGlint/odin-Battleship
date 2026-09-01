export const render={//test
    renderTitle(){
        const title = document.querySelector(".title");
        let text = document.createElement("h1");
        text.textContent="Battleship";
        title.appendChild(text);
    },
    renderBoard(board, gridElement, showShips, clickable, onCellClick){//board which board to render, gridElement is p1Grid or p2Grid that you alr selected, showShips is whether we want to show ships, clickable is if you can click on that board eg attack, onCellClick is what to do after click, callBack function
        gridElement.innerHTML="";
        const allShipCoords = board.ships.flatMap(ship => ship.coords);
        for(let row=0; row<10; row++){
            for(let col=0; col<10; col++){
                const cell=document.createElement("div");
                cell.classList.add("cell");
                if (board.miss.some(coord => coord[0] === row && coord[1] === col)) {
                    cell.classList.add("miss");
                }
                if (board.hit.some(coord => coord[0] === row && coord[1] === col)) {
                    cell.classList.add("hit");
                }
                if(allShipCoords.some(coord => coord[0] === row && coord[1] === col)&&showShips){
                    cell.classList.add("ship");
                }
                if(clickable){
                    cell.addEventListener("click", () => {
                        onCellClick([row, col]);
                    })
                }
                gridElement.appendChild(cell);
            }
        }
    },
    renderHeader(headerElement, playerName, sunkNumber){ //player header passes the header, playerName is the name to display, Sunk Number number sunk

        headerElement.innerHTML="";
        const playerN=document.createElement("h2");
        const sunk=document.createElement("h2");
        
        playerN.textContent=playerName;
        sunk.textContent=sunkNumber;

        playerN.classList.add("headerName");
        sunk.classList.add("sunkPlayer");

        headerElement.appendChild(playerN);
        headerElement.appendChild(sunk);

    },
    renderTurn(playerName) {
        const title = document.querySelector(".title h1");

        title.textContent = `BattleShip - ${playerName}'s Turn`;
    },


    renderWinner(playerName) {
        const title = document.querySelector(".title h1");

        title.textContent = `${playerName} Wins!`;
    }


}