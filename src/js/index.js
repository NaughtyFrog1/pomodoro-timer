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
