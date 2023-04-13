import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/dark.css');
import Notiflix from 'notiflix';

refs = {
  calendar: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      console.log(selectedDates);
      Notiflix.Notify.failure('Please choose a date in the future!');
    } else {
      refs.startBtn.removeAttribute('disabled', 'disabled');
      refs.startBtn.addEventListener('click', onStart);

      function onStart() {
        refs.startBtn.setAttribute('disabled', 'disabled');
        const intervalId = setInterval(() => {
          const ms = selectedDates[0].getTime() - Date.now();
          const { days, hours, minutes, seconds } = convertMs(ms);
          const isEnd =
            days === 0 && hours === 0 && minutes === 0 && seconds === 0;
          refs.days.textContent = addLeadingZero(days.toString());
          refs.hours.textContent = addLeadingZero(hours.toString());
          refs.minutes.textContent = addLeadingZero(minutes.toString());
          refs.seconds.textContent = addLeadingZero(seconds.toString());
          if (isEnd) {
            clearInterval(intervalId);
            Notiflix.Notify.success('Time is over!');
          }
        }, 1000);
      }
    }
  },
};

flatpickr(refs.calendar, options);

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
  return value.padStart(2, '0');
}
