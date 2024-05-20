const boxes = document.querySelectorAll(".box");
const main = document.querySelector("main");
const gameBox = document.getElementById('game');
const winMsg = document.getElementById("winMsg");
const newGame = document.getElementById("new-game");
const resetBtn = document.getElementById("reset-btn");
const msg = document.getElementById("msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const disableBtn = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBtn = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerHTML = "O";
            turnO = false;

        } else {
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();

    })
})

// function reset() {
//     if (!resetButtonCreated) {
//         resetButtonCreated = true;
//         const resetBtn = document.createElement("button");
//         resetBtn.classList.add("reset");
//         resetBtn.innerHTML = "Reset";
//         main.appendChild(resetBtn);

//         resetBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             boxes.forEach((box) => {
//                 box.innerHTML = "";
//             })

//         })
//     }
// }
const showWinner = (winner) => {
    winMsg.classList.toggle("hide");
    msg.innerHTML = `Congratulation! ${winner} is the winner.`;
    resetBtn.style.display = "none";
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let box1Val = boxes[pattern[0]].innerText;
        let box2Val = boxes[pattern[1]].innerText;
        let box3Val = boxes[pattern[2]].innerText;

        if (box1Val !== "" && box2Val !== "" && box3Val !== "") {
            if (box1Val === box2Val && box2Val === box3Val) {
                gameBox.style.display = "none";
                showWinner(box1Val);
                disableBtn();
            }
        }
    }
}

const reset = () => {
    turnO = true;
    enableBtn();
}

newGame.addEventListener("click", () => {
    winMsg.classList.toggle("hide");
    gameBox.style.display = "flex";
    resetBtn.style.display = "block";
    reset();
});
resetBtn.addEventListener("click", reset);