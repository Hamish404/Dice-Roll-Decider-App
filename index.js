const winnerText = document.querySelector('.winner');

const dice = document.querySelector('.dice');

const diceOne = document.querySelector('.dice-1');
const diceTwo = document.querySelector('.dice-2');

const rowTwo1 = document.querySelector('.dice-1 .row-2');
const rowTwo2 = document.querySelector('.dice-2 .row-2');

const dotOne1 = document.querySelector('.dice-1 .dot-1');
const dotTwo1 = document.querySelector('.dice-1 .dot-2');
const dotThree1 = document.querySelector('.dice-1 .dot-3');
const dotFour1 = document.querySelector('.dice-1 .dot-4');
const dotFive1 = document.querySelector('.dice-1 .dot-5');
const dotSix1 = document.querySelector('.dice-1 .dot-6');

const dotOne2 = document.querySelector('.dice-2 .dot-1');
const dotTwo2 = document.querySelector('.dice-2 .dot-2');
const dotThree2 = document.querySelector('.dice-2 .dot-3');
const dotFour2 = document.querySelector('.dice-2 .dot-4');
const dotFive2 = document.querySelector('.dice-2 .dot-5');
const dotSix2 = document.querySelector('.dice-2 .dot-6');

const dotsDice1 = [dotOne1, dotTwo1, dotThree1, dotFour1, dotFive1, dotSix1];
const dotsDice2 = [dotOne2, dotTwo2, dotThree2, dotFour2, dotFive2, dotSix2];

const rollBtn = document.querySelector('.roll-btn');

rollInitialization();
eventListenersInit();

function diceRoll(dotOne, dotTwo, dotThree, dotFour, dotFive, dotSix, rowTwo) {
  const result = Math.ceil(Math.random() * 6);
  if (result === 1) {
    addHideClass(dotTwo, dotThree, dotFour, dotFive);
    removeHideClass(dotOne);
    hideSix(dotSix, rowTwo);
  } else if (result === 2) {
    addHideClass(dotOne, dotThree, dotFour);
    removeHideClass(dotTwo, dotFive);
    hideSix(dotSix, rowTwo);
  } else if (result === 3) {
    addHideClass(dotThree, dotFour);
    removeHideClass(dotOne, dotTwo, dotFive);
    hideSix(dotSix, rowTwo);
  } else if (result === 4) {
    addHideClass(dotOne);
    removeHideClass(dotTwo, dotThree, dotFour, dotFive);
    hideSix(dotSix, rowTwo);
  } else if (result === 5) {
    removeHideClass(dotOne, dotTwo, dotThree, dotFour, dotFive);
    hideSix(dotSix, rowTwo);
  } else {
    removeHideClass(dotOne, dotTwo, dotThree, dotFour, dotFive);
    showSix(dotSix, rowTwo);
  }
  return result;
}

function rollInitialization() {
  diceRoll(dotOne1, dotTwo1, dotThree1, dotFour1, dotFive1, dotSix1, rowTwo1);
  diceRoll(dotOne2, dotTwo2, dotThree2, dotFour2, dotFive2, dotSix2, rowTwo2);
}

function rollBoth() {
  const scoreOne = diceRoll(dotOne1, dotTwo1, dotThree1, dotFour1, dotFive1, dotSix1, rowTwo1);
  const scoreTwo = diceRoll(dotOne2, dotTwo2, dotThree2, dotFour2, dotFive2, dotSix2, rowTwo2);
  determineWinner(scoreOne, scoreTwo);
}

function determineWinner(scoreOne, scoreTwo) {
  if (scoreOne > scoreTwo) {
    winnerText.textContent = 'Player One wins!' 
  } else if (scoreTwo > scoreOne) {
    winnerText.textContent = 'Player Two wins!'
  } else {
    winnerText.textContent = "It's a draw!"
  }
}

function addHideClass(...elements) {
  elements.forEach(element => {
    if (element) element.classList.add('hide');
  })
};

function removeHideClass(...elements) {
  elements.forEach(element => {
    if (element) element.classList.remove('hide');
  })
}

function hideSix(dotSix, rowTwo) {
  dotSix.classList.add('display-none');
  dotSix.classList.add('hide');
  rowTwo.style.justifyContent = 'center';
}

function showSix(dotSix, rowTwo) {
  dotSix.classList.remove('display-none');
  dotSix.classList.remove('hide');
  rowTwo.style.justifyContent = 'space-between';
}

function animateDiceRoll() {
  diceOne.style.animation = 'rotateDice 1.5s ease-out';
  diceTwo.style.animation = 'rotateDiceReverse 1.5s ease-out';

  setTimeout(() => {
    diceOne.style.animation = '';
    diceTwo.style.animation = '';
  }, 1500); 
}

function eventListenersInit() {

  rollBtn.addEventListener('click', () => {
    setTimeout(rollBoth, 1400);
    animateDiceRoll();
  })

  diceOne.addEventListener('mouseover', () => {
    diceOne.style.backgroundColor = 'white';
    dotsDice1.forEach(dot => {
      dot.style.backgroundColor = 'black';
    })
  });

  diceOne.addEventListener('mouseout', () => {
    diceOne.style.backgroundColor = 'transparent';
    dotsDice1.forEach(dot => {
      dot.style.backgroundColor = 'transparent';
    })
  });

  diceTwo.addEventListener('mouseover', () => {
    diceTwo.style.backgroundColor = 'white';
    dotsDice2.forEach(dot => {
      dot.style.backgroundColor = 'black';
    })
  });

  diceTwo.addEventListener('mouseout', () => {
    diceTwo.style.backgroundColor = 'transparent';
    dotsDice2.forEach(dot => {
      dot.style.backgroundColor = 'transparent';
    })
  });
}