const cellElemtents = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTxtElements = document.querySelector("[data-winning-message-txt]")
const winningMessage = document.querySelector("[data-winning-message]")
const restartButton = document.querySelector("[data-restart-message-button]")

let isCicleTurn;
const startGame= () =>{
    isCicleTurn = false;

    for(const cell of cellElemtents){
        cell.classList.remove("circle")
        cell.classList.remove("x")
        cell.removeEventListener("click",handleclik,{once:true})
        cell.addEventListener('click',handleclik,{once : true})
    } 
    setBoardHoverClass();
    winningMessage.classList.remove("showwinningmessage")

}
const endGame = (isDraw) =>{
    if(isDraw){
        winningMessageTxtElements.innerText = "Empate"
    }else{
        winningMessageTxtElements.innerText = isCicleTurn ? "O venceu": "X venceu";
    }
    winningMessage.classList.add('showwinningmessage')
}
const winnigCombinations= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const checkForWin = (currentPlayer) =>{
    return winnigCombinations.some((combination)=>{
        return combination.every((index) =>{
            return cellElemtents[index].classList.contains(currentPlayer);
        });
    });
}

const checkForDraw = () =>{
    return[...cellElemtents].every(cell =>{
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};
const setBoardHoverClass = () =>{
    board.classList.remove('circle');
    board.classList.remove('x');
    
    if(isCicleTurn){
        board.classList.add('circle');
    }else{
        board.classList.add('x');
    }
}
const swapTurns =() =>{
    isCicleTurn = !isCicleTurn;
    setBoardHoverClass();
}

const handleclik = (e) => {
    //colocar x ou O
    const cell = e.target;
    const classToAdd = isCicleTurn ? "circle" : "x" ;

    placeMark(cell, classToAdd);

    //verificar vitoria ou derrota
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();
    if(isWin){
        endGame(false)
    }else if(isDraw){
        endGame(true);
    }else{
        swapTurns();
    }
    //verificar empate
};
startGame();
restartButton.addEventListener('click',startGame);
