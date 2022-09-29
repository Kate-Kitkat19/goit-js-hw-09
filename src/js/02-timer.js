import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let dateSelected = null;
const startBtnRef = document.querySelector('button[data-start]');
const timerRefs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

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
      notifyError();
    } else {
      startBtnRef.disabled = false;
    }
  },
});

startBtnRef.addEventListener('click', timerStart);

function timerStart() {
  const intervalID = setInterval(() => {
    const dateNow = Date.now();
    const difference = dateSelected - dateNow;
    if (difference <= 0) {
      notifySuccess();
      clearInterval(intervalID);
      return;
    }
    const structuredDiff = convertMs(difference);
    updateDOM(timerRefs, structuredDiff);
  }, 1000);
}

function updateDOM(refs, data) {
  Object.keys(refs).forEach(key => {
    refs[key].textContent = addLeadingZero(data[key]);
  });
}

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

function notifyError() {
  Notiflix.Notify.failure('Please choose a date in the future');
}
function notifySuccess() {
  Notiflix.Notify.success('The time has come!');
}
