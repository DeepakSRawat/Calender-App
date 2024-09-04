// const currentDate = document.querySelector(".current-date");
const monthPicker = document.querySelector(".month-picker");
const yearPicker = document.querySelector(".year-picker");
const daysTag = document.querySelector(".days");
const weeksTag = document.querySelector(".weeks");
const todayBtn = document.querySelector("#today");
const lang = document.querySelector(".lang")
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const calendar = document.querySelector(".wrapper");
const month_picker = document.querySelector("#month-picker")
const year_picker = document.querySelector("#year-picker")
const addEvent = document.querySelector('.add-event')
const eventContainer = document.querySelector(".event-container")
const backDrop = document.querySelector('#modalBackDrop')
const eventTitleInput = document.querySelector('#eventTitleInput')
const newEventModal = document.querySelector('#newEventModal')
const deleteEventModal = document.querySelector('#deleteEventModal')


// 3 sep 2024
let clicked = null;
let events = localStorage.getItem('events')?JSON.parse(localStorage.getItem('events')): []

// getting new date, current year and month
let date = new Date()
let currentYear = date.getFullYear()
let currentMonth = date.getMonth();

const en_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
const hindi_months = ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"]
const en_weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hindi_weeks =["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"];
let months = [...en_months];
let weeks = [...en_weeks];
let language = "हिन्दी";


const renderCalendar = ()   => {
    let firstDayOfMonth = new Date(currentYear,currentMonth, 1).getDay();
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    let lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay()
    let lastDateOfLastMonth = new Date(currentYear, currentMonth,0).getDate();
    let daysLiTag = "";
    let weeksLiTag = "";


    for(let index = 0; index < weeks.length; index++) {
        weeksLiTag += `<li>${weeks[index]}</li>`;
    }

    // Render previous month's days
    for (let index = firstDayOfMonth; index > 0; index--) {
        daysLiTag += `<li class="inactive">${lastDateOfLastMonth - index + 1}</li>`;
        
    }

    // Render current month's days
    for (let index = 1; index <= lastDateOfMonth; index++) {
        let isToday = index === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()? "active":"none";
        daysLiTag += `<li class="${isToday}">${index}</li>`;
        
    }

    // to make height of calendar constant we use these filler at the end of the calendar
    let filler = 0;
    if(firstDayOfMonth === 0 && lastDateOfMonth === 28){filler = 20}
    else if(firstDayOfMonth <= 3) {filler = 13}
    else if( firstDayOfMonth === 4){
        if(lastDateOfMonth === 31){filler = 13}
        else {filler = 13}
    }
    else if(firstDayOfMonth === 5){
        if(lastDateOfMonth === 31){filler = 6}
        else {filler = 13}
    }
    else if(firstDayOfMonth === 6 && (lastDateOfMonth === 28 || lastDateOfMonth === 29)){filler = 13}
    else {filler = 6}
    for (let index = lastDayOfMonth; index < filler; index++) {
        daysLiTag += `<li class="inactive">${index - lastDayOfMonth + 1}</li>`;
    }
    

    // Update the calendar days
    document.querySelector('.days').innerHTML = daysLiTag;

    monthPicker.innerText = `${months[currentMonth]}`;
    yearPicker.innerText = `${currentYear}`;
    daysTag.innerHTML = daysLiTag;
    weeksTag.innerHTML = weeksLiTag;
    lang.innerHTML =  language;

    hideTodayBtn();
    monthPickerList();
    YearPickerList();
    eventCreater();
    
}

function addEventsMarkers() {
    // adding event marks
    document.querySelectorAll('.days li').forEach(function(list){
        // Check if the list item has either 'active' or 'none' class
        if(list.classList.contains('active') || list.classList.contains('none')){
            const dayString = `${currentMonth + 1}/${list.innerText}/${currentYear}`
            
            const eventForDay = events.find(e => e.date === dayString);
            
            if(eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                list.appendChild(eventDiv);
            }
        } 
    })
}


prevBtn.addEventListener('click', () => {
    currentMonth = currentMonth - 1;
    if(currentMonth < 0){
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
    }
    else{
        date = new Date();
    }
    load();
})
nextBtn.addEventListener('click', () => {
    currentMonth = currentMonth + 1;
    if(currentMonth > 11){
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
    }
    else{
        date = new Date();
    }
    load();
})

todayBtn.addEventListener("click", () => {
    let date = new Date();
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    load();
  });


function hideTodayBtn() {
    if(currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()){
        todayBtn.style.visibility = "hidden";
    }
    else{
        todayBtn.style.visibility = "visible";
    }
}

function monthPickerList() {
    month_picker.onclick = () => {
        // Get the month list div
        let month_list = calendar.querySelector(".month-list");

        // Clear the month list to avoid appending months again
        month_list.innerHTML = '';

        // Add the 'show' class to display the month list
        month_list.classList.add('show');

        // Loop through the months and create div elements
        months.forEach((e, index) => {
            let month_item = document.createElement('div');
            month_item.innerHTML = `<div>${e}</div>`;

            // Set onclick event for each month
            month_item.onclick = () => {
                // Hide the month list after selection
                month_list.classList.remove('show');

                // Set the current month
                currentMonth = index;

                // Render the calendar for the selected month
                load();
            };

            // Append the month item to the month list
            month_list.appendChild(month_item);
        });
    };
}

// function to render the calendar by year
function YearPickerList(){
    yearPicker.addEventListener("click",(e)=>{
        const gotoBtn = document.querySelector(".goto-btn");
        const backBtn = document.querySelector(".back-btn");
        const dateInput = document.querySelector(".date-input");
        
        yearInput.style.display="block";
        backDrop.style.display="block";
        dateInput.classList.remove('error')
        dateInput.value = '';

        let renderYear
        let isValid

        // Regular expression to check if the input is a four-digit number
        dateInput.addEventListener("input",(e) => {
            renderYear = dateInput.value;
            isValid = /^[0-9]{4}$/.test(renderYear);
        })

        backBtn.addEventListener("click", function(){
            yearInput.style.display="none";
            backDrop.style.display="none";
        })

        gotoBtn.addEventListener("click",gotoDate);

        function gotoDate(){
            if(renderYear === undefined || !isValid){
                dateInput.classList.add('error')
                backDrop.style.display =  'block';
            }else{
                yearInput.style.display="none";
                backDrop.style.display="none";
                currentYear = renderYear;
                load();
            }

        }

    })
}


// toggle switch
document.addEventListener('DOMContentLoaded', function () {
    let checkbox = document.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
          months = [...hindi_months]
          weeks = [...hindi_weeks]
          lang.innerHTML = '';
          language = "eng"
          load();
        } else {
            months = [...en_months]
            weeks = [...en_weeks]
            lang.innerHTML = '';
            language = "हिन्दी";
            load();
      }
    });
  })


// Event Modal
function closeModal(){
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load()
}

function saveEvent(){
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');
        
        events.push({
            date: clicked,
            title: eventTitleInput.value
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }else{
        eventTitleInput.classList.add('error');
    }
}

function openModal(date){
    clicked = date;
    const eventForDay = events.find(e => e.date === clicked);
    if(eventForDay){
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    }else{
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
    initButton();
}


function eventCreater(){
    let lists = document.querySelectorAll('li')
    
    lists.forEach(function(list){
        list.addEventListener('click', function(){
            const dayString = `${currentMonth + 1}/${list.innerText}/${currentYear}`

            const eventForDay = events.find(e => e.date === dayString);

            if(list.className ==='active' || list.className === 'none'){openModal(dayString)}
        })
    })
}


function deleteEvent(){
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButton(){
    document.getElementById('saveButton').addEventListener('click',saveEvent)
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click',deleteEvent)
    document.getElementById('closeButton').addEventListener('click', closeModal);
}


function load(){
    renderCalendar();
    addEventsMarkers();
}

load()