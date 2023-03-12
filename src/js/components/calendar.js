const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = months[currentDate.getMonth()];
const currentDay = currentDate.getDate();
let selectedMonth = currentDate.getMonth();
let selectedYear = currentYear;
let dateForRequest = null;
const eventSetDate = new Event('setdate', { bubbles: true }); // для створення події про установку дати

const refsCalendar = {
    calendarFild: document.querySelector('.calendar__fild'),
    calendarInput: document.querySelector('.calendar__input'),
    calendarDays: document.querySelector('.calendar__days'),
    calendarIconUp: document.querySelector('.calendar__icon--up'),
    calendarIconDown: document.querySelector('.calendar__icon--down'),
    calendarMonthSpan: document.getElementById('month-span'),
    calendarYearSpan: document.getElementById('year-span'),
    calendarPrevButtonMonth: document.getElementById('prev-button-month'),
    calendarNextButtonMonth: document.getElementById('next-button-month'),
    calendarPrevButtonYear: document.getElementById('prev-button-year'),
    calendarNextButtonYear: document.getElementById('next-button-year'),
};

refsCalendar.calendarInput.addEventListener('focus', onCalendarInputFocus);
refsCalendar.calendarDays.addEventListener('click', onDaysClick);
refsCalendar.calendarIconUp.addEventListener('click', onButtonUpClick);
refsCalendar.calendarPrevButtonMonth.addEventListener(
    'click',
    onPrevButtonMonth
);
refsCalendar.calendarNextButtonMonth.addEventListener(
    'click',
    onNextButtonMonth
);
refsCalendar.calendarPrevButtonYear.addEventListener('click', onPrevButtonYear);
refsCalendar.calendarNextButtonYear.addEventListener('click', onNextButtonYear);
refsCalendar.calendarInput.addEventListener('keyup', onCalendarInputKeyUp); // Для очищення інпуту

createCurrentMonth();

function onCalendarInputFocus() {
    refsCalendar.calendarFild.classList.add('focus');
    refsCalendar.calendarInput.classList.add('focus');
    refsCalendar.calendarIconUp.classList.remove('calendar-is-hidden');
    refsCalendar.calendarIconDown.classList.add('calendar-is-hidden');
}

function onDaysClick(e) {
    if (e.target.nodeName !== 'LI') return;

    const currentDateEl = document.querySelector('.calendar__current-date');
    currentDateEl?.classList.remove('calendar__current-date');
    e.target.classList.add('calendar__current-date');

    refsCalendar.calendarFild.classList.remove('focus');
    refsCalendar.calendarInput.classList.remove('focus');
    refsCalendar.calendarIconUp.classList.add('calendar-is-hidden');
    refsCalendar.calendarIconDown.classList.remove('calendar-is-hidden');
    refsCalendar.calendarInput.value = `${addLeadingZero(
        e.target.textContent
    )}-${addLeadingZero(selectedMonth + 1)}-${selectedYear}`;

    dateForRequest = currentDate.setFullYear(
        selectedYear,
        selectedMonth,
        Number(e.target.textContent)
    );

    refsCalendar.calendarInput.dispatchEvent(eventSetDate);
}

function onButtonUpClick() {
    refsCalendar.calendarFild.classList.remove('focus');
    refsCalendar.calendarInput.classList.remove('focus');
    refsCalendar.calendarIconUp.classList.add('calendar-is-hidden');
    refsCalendar.calendarIconDown.classList.remove('calendar-is-hidden');
}

function createCurrentMonth() {
    refsCalendar.calendarMonthSpan.textContent = currentMonth.name;
    refsCalendar.calendarYearSpan.textContent = currentYear;
    refsCalendar.calendarDays.innerHTML = createDaysMarkup(
        currentYear,
        currentMonth.days
    );
    const currentDayEl = document.getElementById(
        `currentmonth-day-${currentDay}`
    );
    currentDayEl.classList.add('calendar__current-date');
}

function onPrevButtonYear() {
    selectedYear -= 1;
    refsCalendar.calendarYearSpan.textContent = selectedYear;
    refsCalendar.calendarDays.innerHTML = createDaysMarkup(
        selectedYear,
        months[selectedMonth].days
    );
}

function onNextButtonYear() {
    selectedYear += 1;
    refsCalendar.calendarYearSpan.textContent = selectedYear;
    refsCalendar.calendarDays.innerHTML = createDaysMarkup(
        selectedYear,
        months[selectedMonth].days
    );
}

function onPrevButtonMonth() {
    selectedMonth -= 1;
    refsCalendar.calendarMonthSpan.textContent = months[selectedMonth].name;
    if (selectedMonth === 0)
        refsCalendar.calendarPrevButtonMonth.disabled = true;
    if (selectedMonth < 11)
        refsCalendar.calendarNextButtonMonth.disabled = false;
    refsCalendar.calendarDays.innerHTML = createDaysMarkup(
        selectedYear,
        months[selectedMonth].days
    );
}

function onNextButtonMonth() {
    selectedMonth += 1;
    refsCalendar.calendarMonthSpan.textContent = months[selectedMonth].name;
    if (selectedMonth === 11)
        refsCalendar.calendarNextButtonMonth.disabled = true;
    if (selectedMonth > 0)
        refsCalendar.calendarPrevButtonMonth.disabled = false;
    refsCalendar.calendarDays.innerHTML = createDaysMarkup(
        selectedYear,
        months[selectedMonth].days
    );
}

function createDaysMarkup(year, month) {
    currentDate.setFullYear(selectedYear, selectedMonth, 1);
    let firstDay = currentDate.getDay();
    let emptyFild = '';
    let markup = '';

    if (year % 4 === 0 && month === 28) month += 1;
    if (firstDay === 0) firstDay += 7;

    for (let i = 1; i <= month; i += 1) {
        markup += `<li class="calendar__day" id="currentmonth-day-${i}">${i}</li>`;
    }

    for (let i = 0; i < firstDay - 1; i += 1) {
        emptyFild += '<li class="calendar__day calendar__day--empty"></li>';
    }

    return emptyFild + markup;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function onCalendarInputKeyUp(event) {
    const { key } = event;
    if (key === 'Enter') {
        refsCalendar.calendarFild.classList.remove('focus');
        refsCalendar.calendarInput.classList.remove('focus');
        refsCalendar.calendarIconUp.classList.add('calendar-is-hidden');
        refsCalendar.calendarIconDown.classList.remove('calendar-is-hidden');

        refsCalendar.calendarInput.dispatchEvent(eventSetDate);
        refsCalendar.calendarInput.blur();
        createCurrentMonth();
    }
}
