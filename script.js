const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const weeksTag = document.querySelector(".weeks");
let prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date()
let currentYear = date.getFullYear()
let currentMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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


    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = daysLiTag;
    weeksTag.innerHTML = weeksLiTag;
    
}

renderCalendar();

prevNextIcon.forEach(icon =>{
    icon.addEventListener('click',()=>{
        if(icon.id === "prev"){ currentMonth = currentMonth - 1}
        else if(icon.id === "next"){currentMonth = currentMonth + 1}
        else{}

        // updating month and year if user go to  calendar next year or previous year
        if(currentMonth < 0 || currentMonth > 11){
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear(); 
            currentMonth = date.getMonth();
        }
        else{
            date = new Date();
        }

        renderCalendar();
    })
})