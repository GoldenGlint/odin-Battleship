export const render={
    renderTitle(){
        const title = document.querySelector(".title");
        let text = document.createElement("h1");
        text.textContent="Battleship";
        title.appendChild(text);
    },
    board(board, gridElement, showShips, clickable, onCellClick){
        gridElement.innerHTML="";
        for(let row=0; row<10; row++){
            for(let col=0; col<10; col++){
                const cell=document.createElement(div);
                cell.classList.add("cell");
                if(clickable){
                    cell.addEventListener("click", () => {
                        onCellClick([row, col]);
                    })
                }
                gridElement.appendChild(cell);
            }
        }
    }

}