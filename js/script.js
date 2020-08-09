let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let sound = true;
let on = false;
let win;

const turnCounter = document.querySelector('#round');
const topLeft = document.querySelector('#blue');
const topRight = document.querySelector('#red');
const bottomLeft = document.querySelector('#yellow');
const bottomRight = document.querySelector('#green');
const startButton = document.querySelector('#start');
const easyButton = document.querySelector('#easy');
const middleButton = document.querySelector('#middle');
const difficultButton = document.querySelector('#difficult');


startButton.addEventListener('click', (event) => {
  play();
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (let i = 0; i < 4; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  // console.log(order);
  compTurn = true;


  if (easyButton.checked == true) {
    intervalId = setInterval(gameTurn, 1500);
  } else if (middleButton.checked == true) {
    intervalId = setInterval(gameTurn, 1000);
  } else if(difficultButton.checked == true) {
    intervalId = setInterval(gameTurn, 400);
  }

}

function gameTurn() {
  on = false;
  
  if(flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if(compTurn) {
    clearColor();
    setTimeout(() => {
      if(order[flash] == 1) one();
      if(order[flash] == 2) two();
      if(order[flash] == 3) three();
      if(order[flash] == 4) four();
      flash++;
    }, 200)
  }
}

function one() {
  if (sound) {
    var audio = document.getElementById('clip1');
    audio.play();
  }
  sound = true;
  topLeft.style.opacity = '0.6';
}

function two() {
  if (sound) {
    var audio = document.getElementById('clip2');
    audio.play();
  }
  sound = true;
  topRight.style.opacity = '0.6';
}

function three() {
  if (sound) {
    var audio = document.getElementById('clip3');
    audio.play();
  }
  sound = true;
  bottomLeft.style.opacity = '0.6';
}


function four() {
  if (sound) {
    var audio = document.getElementById('clip4');
    audio.play();
  }
  sound = true;
  bottomRight.style.opacity = '0.6';
}

function clearColor() {
  topLeft.style.opacity = '1';
  topRight.style.opacity = '1';
  bottomLeft.style.opacity = '1';
  bottomRight.style.opacity = '1';
}

function flashColor() {
  topLeft.style.opacity = '0.6';
  topRight.style.opacity = '0.6';
  bottomLeft.style.opacity = '0.6';
  bottomRight.style.opacity = '0.6';
}

topLeft.addEventListener('click', (event) => {
  if(on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300)
    }
  }
});

topRight.addEventListener('click', (event) => {
  if(on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300)
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if(on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300)
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if(on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300)
    }
  }
})

function check() {
  if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) good = false;

  if(playerOrder.length == 4 && good) {
    winGame();
  }

  if(good == false) {
    gameOver();
    // flashColor();
    // turnCounter.innerHTML = 'А вот и нет...';
    // if (easyButton.checked == true) {
    //   setTimeout(() => {
    //     playAgain()
    //   }, 1500);
    // } else if (middleButton.checked == true) {
    //   setTimeout(() => {
    //     playAgain()
    //   }, 1000);
    // } else if(difficultButton.checked == true) {
    //   setTimeout(() => {
    //     playAgain()
    //   }, 400);
    // }

    // sound = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;

    if (easyButton.checked == true) {
      intervalId = setInterval(gameTurn, 1500);
    } else if (middleButton.checked == true) {
      intervalId = setInterval(gameTurn, 1000);
    } else if(difficultButton.checked == true) {
      intervalId = setInterval(gameTurn, 400);
    }
  }
}

// function playAgain() {
//   turnCounter.innerHTML = turn;
//   clearColor();
//   play();
// }

function gameOver() {
  turnCounter.innerHTML = '0';
  clearColor();
  on = false;
  sound = false;
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = 'Победа!';
  on = false;
  win = true;
}


