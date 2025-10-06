const start = document.querySelector('#start');
const btn = document.querySelector('#guess-btn');
const numberInput = document.querySelector('#number');
const reset = document.querySelector('#reset');
const response = document.querySelector('.comment');
const addANumber = document.querySelector('.addNumber');
const lastGuess = document.querySelector('.last-guess');
const gameOn = document.querySelector('.game');

const numbersList = document.querySelector('.guessed-numbers-list');
const addNumberToList = document.querySelector('.added-number');

let numberOfGuesses = 0;

btn.addEventListener('click', (e) => {
  e.preventDefault();

  const value = numberInput.value;

  const check = localStorage.getItem('number');

  if (!check) {
    alert('Press start to play');
    return;
  }

  if (!value) {
    addANumber.innerHTML = 'Add a number';
    return;
  } else {
    addANumber.innerHTML = '';
  }

  localStorage.setItem('guess', value);

  let guessList = JSON.parse(localStorage.getItem('guessList')) || [];
  guessList.push(value);
  localStorage.setItem('guessList', JSON.stringify(guessList));

  guessedNumber();

  lastGuess.innerHTML = value;
  addNumberToList.innerHTML = guessList
    .map((num) => `<li>${num}</li>`)
    .join('');
  numberInput.value = '';
});

start.addEventListener('click', () => {
  randomNumber();
});

const randomNumber = () => {
  const storedNumber = localStorage.getItem('number');

  if (storedNumber === null) {
    let number = Math.ceil(Math.random(1) * 100);

    const encoded = btoa(String(number));
    localStorage.setItem('number', encoded);

    console.log('Generated number:', number);
    gameOn.innerHTML = 'Guess a number';
  } else {
    alert('There is allready a number asshole!!');
  }
};

const getActiveNumber = () => {
  const encoded = localStorage.getItem('number');
  if (!encoded) return null;

  return Number(atob(encoded));
};

const guessedNumber = () => {
  const guessedNumber = Number(localStorage.getItem('guess'));
  const activeNumber = getActiveNumber();

  numberOfGuesses++;

  if (guessedNumber < activeNumber) {
    response.innerHTML = 'Higher!!';
    // numberOfGuesses++;
    console.log(numberOfGuesses);
  } else if (guessedNumber > activeNumber) {
    response.innerHTML = 'Lower!!';
    // numberOfGuesses++;
    console.log(numberOfGuesses);
  } else {
    response.innerHTML = `OMG!!! That is correct! You guessed in ${numberOfGuesses} tries!`;
    localStorage.removeItem('number');
    localStorage.removeItem('guess');
    lastGuess.innerHTML = '';
  }
};

reset.addEventListener('click', () => {
  localStorage.removeItem('number');
  localStorage.removeItem('guess');
  localStorage.removeItem('guessList');
  addNumberToList.innerHTML = '';
  gameOn.innerHTML = 'Press start to play';
  lastGuess.innerHTML = '';
  response.innerHTML = '';
  numberOfGuesses = 0;
});

window.addEventListener('DOMContentLoaded', () => {
  const guessList = JSON.parse(localStorage.getItem('guessList')) || [];
  addNumberToList.innerHTML = guessList
    .map((num) => `<li>${num}</li>`)
    .join('');
});
