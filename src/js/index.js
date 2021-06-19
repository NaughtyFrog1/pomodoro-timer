import '../scss/index.scss';

// Sounds
const clickSound = new Audio('assets/sounds/click.mp3');
const bellSound = new Audio('assets/sounds/bell.mp3');

// Options
const workOption = document.querySelector('#options-work');
const breakOption = document.querySelector('#options-break');
const longBreakOption = document.querySelector('#options-long-break');

// Pomodoro elements
const timer = document.querySelector('.pomodoro__timer');
const start = document.querySelector('.pomodoro__start');
const restart = document.querySelector('.pomodoro__restart');
const skip = document.querySelector('.pomodoro__skip');
const steps = document.querySelectorAll('.pomodoro__step');

// Pomodoro values
let workTime = workOption.value;
let breakTime = breakOption.value;
let longBreakTime = longBreakOption.value;
let minutes = workOption.value;
let seconds = 0;
let step = 0;
let isRunning = false;
let isWorkTime = true;
let timerInterval;

/**
 * [x] zeroFill()
 * [x] printTimer()
 * [x] updateTimer()
 * [x] toggleTimer()
 * [x] restartTimer()
 * [x] skipTimer()
 * [x] changeStep()
 * [ ] updateTime()
 */

const zeroFill = (num) => `${num < 10 ? '0' : ''}${num}`;

const printTimer = () => {
  const title = `${zeroFill(minutes)}:${zeroFill(seconds)}`;
  document.title = `${title} | Pomodoro Timer`;
  timer.innerText = title;
};

const updateStep = () => {
  steps[step - 1 >= 0 ? step - 1 : 3].classList.remove(
    'pomodoro__step--active'
  );
  steps[step].classList.add('pomodoro__step--active');
};

const updateTimer = (bellOn = true, toggleOn = true) => {
  if (seconds > 0) {
    seconds -= 1;
  } else if (minutes > 0) {
    minutes -= 1;
    seconds = 1; // 59
  } else {
    if (step < 3) {
      if (isWorkTime) {
        minutes = breakTime;
      } else {
        minutes = workTime;
        step += 1;
        updateStep();
      }
    } else if (!isWorkTime && step === 3) {
      step = 0;
      minutes = workTime;
      updateStep();
    } else {
      minutes = longBreakTime;
    }

    isWorkTime = !isWorkTime;
    if (bellOn) bellSound.play();
    // eslint-disable-next-line no-use-before-define
    if (toggleOn) togglePomodoro(false);
  }

  printTimer();
};

// Play or pause the timer
const togglePomodoro = (clickOn = true) => {
  if (clickOn) clickSound.play();

  if (isRunning) {
    // If it's running, then stop
    start.innerHTML = '<i class="fas fa-play"></i>';
    clearInterval(timerInterval);
  } else {
    // else start running again
    start.innerHTML = '<i class="fas fa-pause"></i>';
    timerInterval = setInterval(updateTimer, 1000);
  }

  isRunning = !isRunning;
};

const restartPomodoro = (clickOn = true) => {
  if (clickOn) clickSound.play();

  steps[step].classList.remove('pomodoro__step--active');
  step = 0;
  steps[step].classList.add('pomodoro__step--active');

  minutes = workTime;
  seconds = 0;
  isWorkTime = 1;
  if (isRunning) togglePomodoro(false);
  printTimer();
};

const skipPomodoro = (clickOn = true) => {
  if (clickOn) clickSound.play();
  seconds = 0;
  minutes = 0;
  updateTimer(false, isRunning);
};

const changeStep = (e) => {
  const stepElement = e instanceof MouseEvent ? e.target : e;

  steps[step].classList.remove('pomodoro__step--active');
  steps[stepElement.dataset.step].classList.add('pomodoro__step--active');

  if (isRunning) togglePomodoro(false);

  step = parseInt(stepElement.dataset.step, 10);
  minutes = workTime;
  seconds = 0;
  isWorkTime = true;
  printTimer();
};

printTimer();
updateStep();

//* EVENTLISTENNERS
start.addEventListener('click', togglePomodoro);
restart.addEventListener('click', restartPomodoro);
skip.addEventListener('click', skipPomodoro);

steps.forEach((element) => element.addEventListener('click', changeStep));

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') togglePomodoro(false);
  else if (e.code === 'KeyR') restartPomodoro(false);
  else if (e.code === 'KeyS') skipPomodoro(false);
  else if (e.code.includes('Digit') || e.code.includes('Numpad')) {
    const number = parseInt(
      e.code.split('Digit').pop().split('Numpad').pop(),
      10
    );
    if (number >= 1 && number <= 4) changeStep(steps[number - 1]);
  }
});
