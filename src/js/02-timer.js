import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let dateSelected;
const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
startBtnRef.disabled = true;

const timer = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelected = selectedDates[0];
    const dateNow = Date.now();
    const initDiff = dateSelected - dateNow;
    if (initDiff <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtnRef.disabled = false;
    }
  },
});

function timerStart() {
  const intervalID = setInterval(() => {
    const dateNow = Date.now();
    const difference = dateSelected - dateNow;
    if (difference <= 999) {
      clearInterval(intervalID);
      Notiflix.Notify.success('The time has come!');
      return;
    }
    const structuredDiff = convertMs(difference);
    console.log(structuredDiff);
    daysRef.textContent = addLeadingZero(structuredDiff.days);
    hoursRef.textContent = addLeadingZero(structuredDiff.hours);
    hoursRef.textContent = addLeadingZero(structuredDiff.hours);
    minutesRef.textContent = addLeadingZero(structuredDiff.minutes);
    secondsRef.textContent = addLeadingZero(structuredDiff.seconds);
  }, 1000);
}

startBtnRef.addEventListener('click', timerStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
