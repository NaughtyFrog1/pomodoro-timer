import '../scss/index.scss';

// Sounds
const clickSound = new Audio('assets/sounds/click.mp3');
const bellSound = new Audio('assets/sounds/bell.mp3');

// Modals
const modals = document.querySelectorAll('.modal');
const modalsClose = document.querySelectorAll('.modal__close');
const modalsOk = document.querySelectorAll('.modal__ok');

// Options
const modalOption = document.querySelector('.modal--options');
const btnOption = document.querySelector('.btn--options');
const presetsOption = document.querySelectorAll('.options__preset');

const workOption = document.querySelector('#options-work');
const breakOption = document.querySelector('#options-break');
const longBreakOption = document.querySelector('#options-long-break');

workOption.value = parseInt(localStorage.getItem('workTime') ?? 25, 10);
breakOption.value = parseInt(localStorage.getItem('breakTime') ?? 5, 10);
longBreakOption.value = parseInt(
  localStorage.getItem('longBreakTime') ?? 15,
  10
);

// Pomodoro elements
const timer = document.querySelector('.pomodoro__timer');
const start = document.querySelector('.pomodoro__start');
const restart = document.querySelector('.pomodoro__restart');
const skip = document.querySelector('.pomodoro__skip');
const steps = document.querySelectorAll('.pomodoro__step');

// Pomodoro values
let workTime = parseInt(workOption.value, 10);
let breakTime = parseInt(breakOption.value, 10);
let longBreakTime = parseInt(longBreakOption.value, 10);
let minutes = workOption.value;
let seconds = 0;
let step = 0;
let isRunning = false;
let isWorkTime = true;
let timerInterval;

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
    seconds = 59;
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
  isWorkTime = true;
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

const setWorkTime = (newTime) => {
  if (isWorkTime) {
    minutes = newTime - (workTime - minutes); // newTime - elapsedTime
    if (minutes < 0) skipPomodoro(false);
  }

  workTime = newTime;
  workOption.value = newTime;
  localStorage.setItem('workTime', newTime);
  printTimer();
};

const setBreakTime = (newTime) => {
  if (!isWorkTime && step <= 2) {
    minutes = newTime - (breakTime - minutes);
    if (minutes < 0) skipPomodoro();
  }

  breakTime = newTime;
  breakOption.value = newTime;
  localStorage.setItem('breakTime', newTime);
  printTimer();
};

const setLongBreakTime = (newTime) => {
  if (!isWorkTime && step === 3) {
    minutes = newTime - (longBreakTime - minutes);
    if (minutes < 0) skipPomodoro();
  }

  longBreakTime = newTime;
  longBreakOption.value = newTime;
  localStorage.setItem('longBreakTime', newTime);
  printTimer();
};

const checkPresetTimes = () => {
  let presetPos = -1;

  if (workTime === 25 && breakTime === 5 && longBreakTime === 15) {
    presetPos = 0;
  } else if (workTime === 45 && breakTime === 10 && longBreakTime === 30) {
    presetPos = 1;
  } else if (workTime === 90 && breakTime === 20 && longBreakTime === 60) {
    presetPos = 2;
  }

  if (presetPos !== -1) {
    const oldActive = document.querySelector('.options__preset.active');
    if (oldActive) oldActive.classList.remove('active');
    presetsOption[presetPos].classList.add('active');
  }
};

printTimer();
updateStep();
checkPresetTimes();

localStorage.setItem('workTime', workTime);
localStorage.setItem('breakTime', breakTime);
localStorage.setItem('longBreakTime', longBreakTime);

//* EVENTLISTENNERS

start.addEventListener('click', togglePomodoro);
restart.addEventListener('click', restartPomodoro);
skip.addEventListener('click', skipPomodoro);

steps.forEach((element) => element.addEventListener('click', changeStep));

document.addEventListener('keydown', (e) => {
  if (e.target.tagName !== 'INPUT') {
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
  }
});

btnOption.addEventListener('click', () =>
  modalOption.classList.toggle('hidden')
);

modals.forEach((modal) =>
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) modal.classList.add('hidden');
  })
);

modalsClose.forEach((close) =>
  close.addEventListener('click', () => {
    close.parentElement.parentElement.parentElement.classList.add('hidden');
  })
);

modalsOk.forEach((ok) =>
  ok.addEventListener('click', () => {
    ok.parentElement.parentElement.parentElement.classList.add('hidden');
  })
);

workOption.addEventListener('change', () => {
  setWorkTime(parseInt(workOption.value, 10));
  checkPresetTimes();
});

breakOption.addEventListener('change', () => {
  setBreakTime(parseInt(breakOption.value, 10));
  checkPresetTimes();
});

longBreakOption.addEventListener('change', () => {
  setLongBreakTime(parseInt(longBreakOption.value, 10));
  checkPresetTimes();
});

presetsOption.forEach((preset) =>
  preset.addEventListener('click', () => {
    const oldActive = document.querySelector('.options__preset.active');
    if (oldActive) oldActive.classList.remove('active');

    preset.classList.add('active');
    if (preset.dataset.preset === 'popular') {
      setWorkTime(25);
      setBreakTime(5);
      setLongBreakTime(15);
    } else if (preset.dataset.preset === 'medium') {
      setWorkTime(45);
      setBreakTime(10);
      setLongBreakTime(30);
    } else if (preset.dataset.preset === 'extended') {
      setWorkTime(90);
      setBreakTime(20);
      setLongBreakTime(60);
    }
  })
);
