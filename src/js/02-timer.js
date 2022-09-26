import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let dateSelected;
const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

const timer = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelected = selectedDates[0];
  },
});

function timerStart() {
  setInterval(() => {
    const dateNow = Date.now();
    const difference = dateSelected - dateNow;
    console.log(convertMs(difference));
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
