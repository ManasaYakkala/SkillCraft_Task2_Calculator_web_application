const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function backspaceDisplay() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    // Basic validation to prevent eval injection of invalid chars
    if (/[^0-9+\-*/.]/.test(display.value)) {
      throw new Error('Invalid Input');
    }
    const result = eval(display.value);
    if (result === undefined) throw new Error('Error');
    display.value = result;
  } catch (err) {
    display.value = 'Error';
    setTimeout(clearDisplay, 1500); // clear after a moment
  }
}

// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    const val = e.target.dataset.value;
    if (val !== undefined) appendToDisplay(val);
  });
});

// Equal, Clear, Backspace
equals.addEventListener('click', calculate);
clear.addEventListener('click', clearDisplay);
backspace.addEventListener('click', backspaceDisplay);

// Keyboard input support
document.addEventListener('keydown', e => {
  const allowedKeys = '0123456789+-*/.';
  if (allowedKeys.includes(e.key)) {
    appendToDisplay(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    backspaceDisplay();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
