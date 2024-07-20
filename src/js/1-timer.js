 import flatpickr from "flatpickr";
 import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
 //import iziToast from "izitoast";
 import "izitoast/dist/css/iziToast.min.css";

const elements = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}

const picker = document.getElementById('datetime-picker');
const button = document.querySelector('[data-start]');


// поточний час
const currentTime = new Date();
let selectedDateTime;
const day = currentTime.getDay();
const hour = currentTime.getHours();
const minute = currentTime.getMinutes();
const second = currentTime.getSeconds();


button.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDateTime = selectedDates;
      console.log(selectedDates[0]);
    },
    onChange: function(selectedDates, dateStr, instance) {
        if(selectedDates != null) {
            var dateSelected = new Date(Date.parse(selectedDates));
            const dm = dateSelected.getTime() -  new Date().getTime();
            if(dm <= 0)
            {
                iziToast.error({title : 'Error',
                                 message : 'Please choose a date in the future',
                                 position: 'topRight'
                });
                button.disabled = true;
            }
            else
            {
                button.disabled = false;
                calendar.close();
            }
        }

    },
  };

  function addLeadingZero(value)
  {
    return value.toString().padStart(2,0);
  }

  let calendar = flatpickr(picker, options);
  button.addEventListener('click', handleClick);
  function handleClick() {
    const timer = setInterval(() => {
        if(selectedDateTime != null) {
            var dateSelected = new Date(Date.parse(selectedDateTime));
            const dm = dateSelected.getTime() -  new Date().getTime();
            if(dm > 0)
            {
                picker.disabled = true;
                button.disabled = true;
                const leftTime = convertMs(dm);
                elements.days.textContent = addLeadingZero(leftTime.days);
                elements.hours.textContent = addLeadingZero(leftTime.hours);
                elements.minutes.textContent = addLeadingZero(leftTime.minutes);
                elements.seconds.textContent = addLeadingZero(leftTime.seconds);
            }
            else
            {
                picker.disabled = false;
                clearInterval(timer);
            }
        }
    }, 1000)
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
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}