// const currentDate = document.querySelector(".current-date");
const monthPicker = document.querySelector(".month-picker");
const yearPicker = document.querySelector(".year-picker");
const daysTag = document.querySelector(".days");
const weeksTag = document.querySelector(".weeks");
const todayBtn = document.querySelector("#today");
let lang = document.querySelector(".lang")
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let calendar = document.querySelector(".wrapper");
let month_picker = document.querySelector("#month-picker")
let year_picker = document.querySelector("#year-picker")

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
// console.log(date, currentYear, currentMonth);

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

    for (let index = firstDayOfMonth; index > 0; index--) {
        daysLiTag += `<li class="inactive">${lastDateOfLastMonth - index + 1}</li>`;
        
    }

    // console.log(lastDateOfMonth);
    for (let index = 1; index <= lastDateOfMonth; index++) {
        let isToday = index === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()? "active":"";
        // console.log(index);
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


    monthPicker.innerText = `${months[currentMonth]}`;
    yearPicker.innerText = `${currentYear}`;
    daysTag.innerHTML = daysLiTag;
    weeksTag.innerHTML = weeksLiTag;
    lang.innerHTML =  language;

    hideTodayBtn();
    monthPickerList();
    YearPickerList();
    
}

renderCalendar();


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
    renderCalendar();
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
    renderCalendar();
})

todayBtn.addEventListener("click", () => {
    let date = new Date();
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    renderCalendar();
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
                renderCalendar();
            };

            // Append the month item to the month list
            month_list.appendChild(month_item);
        });
    };
}

// function to render the calendar by year
function YearPickerList(){
    year_picker.onclick = () =>{
    let yearInput = document.querySelector('.year-input');
    yearInput.innerHTML = '';
    yearInput.classList.add('show');
    let year_item = document.createElement('div');
    year_item.innerHTML = `<div class="goto">
              <input type="number" maxlength = "4" placeholder="yyyy" class="date-input" />
              <button class="goto-btn">Go</button>
            </div>`;
    yearInput.appendChild(year_item);
    let dateInput = document.querySelector(".date-input");
    let gotoBtn = document.querySelector(".goto-btn");
    let renderYear
    let isValid
    // Regular expression to check if the input is a four-digit number
    dateInput.addEventListener("input",(e) => {

            renderYear = dateInput.value;
            isValid = /^[0-9]{4}$/.test(renderYear);
    })

    gotoBtn.addEventListener("click",gotoDate);
    
    function gotoDate(){
        console.log(renderYear)
        if(renderYear == undefined){
            alert("Invalid Year")}
        else if(!isValid){
            alert("Invalid Year")
            preventDefault();
        }
        else{
            yearInput.classList.remove('show')
            currentYear = renderYear;
            renderCalendar();
        }
        return;

    }
}
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
          renderCalendar();
        } else {
            months = [...en_months]
            weeks = [...en_weeks]
            lang.innerHTML = '';
            language = "हिन्दी";
        renderCalendar();
      }
    });
  })