'use strict';

//Public Globals
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Creating this globally to pull between date picker setup and its conditions in #createEvent
var evStVar = '';

//Establish Date
let c_date = new Date();
let day = c_date.getDay();
let month = c_date.getMonth();
let year = c_date.getFullYear();

let events = '';
let dateArray='';
let m = '';

/*-----------------------------Testing xhr------------------------------------*/
//https://youtu.be/4K33w-0-p2c

const jsonCommunication = (method, url, data) => {
    //The video above uses a promise method
    const promise = new Promise((resolve, reject) => {
        // create an XHR object
        const xhr = new XMLHttpRequest();

        // create a `GET` request by way of parsing arguments 'method' and 'url', then define response type (pulled from json data file)
        xhr.open(method, url);
        xhr.responseType = 'json';

        if(data){
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        
        // listen for `onload` event
            xhr.onload = () => {
        // parse JSON data in jsonEvents
            if (xhr.status >= 400) {
                reject(xhr.response);
            }else {
            resolve(xhr.response);
                }
            };
        
        xhr.onerror = () => {
            reject('Something went wrong!');
        }
            
        xhr.send(JSON.stringify(data));
    });
    return promise;
};

const getData = () => {
  jsonCommunication('GET', './json/backup.json').then(responseData => {
        console.log(responseData);
        localStorage.clear();
        localStorage.setItem('events', JSON.stringify(responseData));
  });  
};

getData();

const sendData = () => {
  jsonCommunication('POST', './json/events.json', {
                'id' : id,
                'eventText': eventText,
                'eventDate': eventDate,
                'eventEnd': eventEnd,
                'eventDesc': eventDesc,
                }).then(responseData => {
        console.log(responseData);
  }).catch(err => {
      console.log(err);
  });
};

(function App() {
    //Hey look! A table driven calendar app!
    const calendar = `<div class="container">
            <div class="row">
                <div class="col-sm-6 col-12 d-flex">
                    <div class="card border-0 mt-5 flex-fill">
                        <div class="card-header py-3 d-flex justify-content-between">
                            <span class="prevMonth">&#10096;</span>
                            <span><strong id="s_m"></strong></span>
                            <span class="nextMonth">&#10097;</span>
                        </div>
                        <div class="card-body px-1 py-3">
                            <div class="table-responsive">
                                <table class="table table-sm table-borderless">
                                    <thead class="days text-center">
                                        <tr>
                                            ${Object.keys(days).map(key => (
                                                `<th><span>${days[key].substring(0,3)}</span></th>`
                                            )).join('')}                                            
                                        </tr>
                                    </thead>
                                    <tbody id="dates" class="dates text-right"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 0px;">
            <div class="toast" style="position: absolute; top: 0; right: 15px;" data-delay="3000">
                <div class="toast-header">
                <strong class="mr-auto">Calendar</strong>
                <small>Just now</small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="toast-body">
                    
                </div>
            </div>
        </div>`;
    document.getElementById('app').innerHTML = calendar;   
})();

function renderCalendar(m, y) {
    //Month's first weekday
    let firstDay = new Date(y, m, 1).getDay();  
    //Days in Month
    let d_m = new Date(y, m+1, 0).getDate();
    //Days in Previous Month
    let d_pm = new Date(y, m, 0).getDate();
    
    let table = document.getElementById('dates');
    table.innerHTML = '';
    let s_m = document.getElementById('s_m');
    s_m.innerHTML = months[m] + ' ' + y;
    let date = 1;
    //remaing dates of last month
    let r_pm = (d_pm-firstDay) +1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {  
                let cell = document.createElement('td');
                let span = document.createElement('span');
                let div = document.createElement('div');
                let cellText = document.createTextNode(r_pm);
                span.classList.add('ntMonth');
                span.classList.add('prevMonth');
                span.classList.add('calCells');
                div.classList.add('showEvent');
                cell.appendChild(span).appendChild(cellText);
                cell.appendChild(span).appendChild(div);
                row.appendChild(cell);
                r_pm++;
            }
            else if (date > d_m && j <7) {
                if (j!==0) {
                    let i = 0; 
                    for (let k = j; k < 7; k++) {
                         i++;                                             
                        let cell = document.createElement('td');
                        let span = document.createElement('span');
                        let div = document.createElement('div');
                        let cellText = document.createTextNode(i);
                        span.classList.add('ntMonth');                    
                        span.classList.add('nextMonth');
                        span.classList.add('calCells');
                        div.classList.add('showEvent');
                        cell.appendChild(span).appendChild(cellText);
                        cell.appendChild(span).appendChild(div);
                        row.appendChild(cell);          
                    }                  
                }                
               break;
            }
            else {
                let cell = document.createElement('td');
                let span = document.createElement('span');
                let div = document.createElement('div');
                let cellText = document.createTextNode(date);
                div.classList.add('showEvent');
                span.classList.add('calCells');
                if (date === c_date.getDate() && y === c_date.getFullYear() && m === c_date.getMonth()) {
                    span.classList.add('bg-danger');
                    span.classList.add('active');
                } 
                cell.appendChild(span).appendChild(cellText);
                cell.appendChild(span).appendChild(div);
                row.appendChild(cell);
                date++;
            }
        }
        table.appendChild(row);
    }
}
renderCalendar(month, year);


/*--------------------------Current ShowEvent Progress------------------------*/

function eventDisplay() {
//Let's grab all of the cells as an HTMLCollection
var ncvt = document.getElementsByClassName('calCells');

//Date Builder Month - Will be used to grab the index value of the month from const months
var dbm = "";
var dbpm = "";
var dbnm = "";

//Setting up a date array which pulls the innerHTML of each cell
let calArray = [];
for (let i = 0; i<ncvt.length; i++){
    
//Grab the innerHTML of each item in the 'New Calendar Variable Test'
var cellDates = ncvt[i].innerHTML;

//RegEx equation to remove the HTML tags
cellDates = cellDates.replace(/<\/?[^>]+(>|$)/g, "");

//Pushes to a calendar date array with just the dates
calArray.push(cellDates);
}

//Setting up a variable to pull the month at the top of the page
var displayMonth = document.getElementById('s_m').innerText;

//Removing the year
displayMonth = displayMonth.substring(0, displayMonth.length - 5);

//Should always set the value of i to be the visible month. Also grabbing previous and next month
for (let i = 0; i < months.length; i++) {
    if (months[i] == displayMonth) {
        dbm = i;
        dbpm = i-1;
        dbnm = i+1;
    }
}

//Setting up Date ID Distribution
for (let i = 0; i < calArray.length; i++) {
    if (ncvt[i].classList.contains('prevMonth')){
    
    var nd = calArray[i];
    var dateId = nd + dbpm + year;
    ncvt[i].setAttribute("id", dateId); 
    
    }else if (ncvt[i].classList.contains('nextMonth')){
    
    nd = calArray[i];
    dateId = nd + dbnm + year;
    ncvt[i].setAttribute("id", dateId);    
    
    }else {
    
    nd = calArray[i];
    dateId = nd + dbm + year;
    ncvt[i].setAttribute("id", dateId);
    
    }
}

//This function populates the required events on their respective days
let storedEvents = JSON.parse(localStorage.getItem('events'));
console.log(storedEvents);
let pullDate = '';
let idTest = '';
let pullId = '';
let munth = '';

if (storedEvents === null){
    void(0); 
}else{
    for (var evDa = 0; evDa < storedEvents.length; evDa++) {
        pullDate = storedEvents[evDa].eventDate;
        pullId = storedEvents[evDa].id;
        idTest = document.getElementById(pullDate);
        $(idTest).append(`<button type="button" class="eventListing close remove-event" data-event-id="${pullId}" data-dismiss="alert" aria-label="Close">${storedEvents[evDa].eventText}</button>`);
}
}
}

eventDisplay();

//Trying to get these events to fire for today upon page load

let storedEvents = JSON.parse(localStorage.getItem('events'));
let eventDate = $('.active');

eventDate = eventDate[0].id;
console.log(eventDate);
for (let i=0; i < storedEvents.length; i++){
    if (storedEvents[i] === null){
        $('.events-today').html('<div class="noEvents"><script></script>No events found</div class="noEvents">');
        }else{
        let eventsToday = storedEvents.filter(eventsToday => eventsToday.eventDate === eventDate);
        let eventsList = Object.keys(eventsToday).map(k => eventsToday[k]);
        let eventsLi ='';
            eventsList.forEach(event =>  $('.events-today').html(eventsLi +=`<button type="button" class="displayedEvents alert alert-danger alert-dismissible fade show close remove-event" role="alert" data-event-id="${event.id}" data-dismiss="alert" aria-label="Close">
            ${event.eventText} - Through ${event.eventEnd}</button>`));
        }
}
            
/*---------------------- End of Current ShowEvent Progress -------------------*/


    $(function(){
        function showEvent(eventDate){
            let storedEvents = JSON.parse(localStorage.getItem('events'));
                console.log(storedEvents);
            if (storedEvents == null){
                $('.events-today').html('<div class="noEvents"><script></script>No events found</div class="noEvents">');               
            }else{
                let eventsToday = storedEvents.filter(eventsToday => eventsToday.eventDate === eventDate);
                let eventsList = Object.keys(eventsToday).map(k => eventsToday[k]);
                if(eventsList.length>0){
                    let eventsLi ='';
                    eventsList.forEach(event =>  $('.events-today').html(eventsLi +=`<button type="button" class="displayedEvents alert alert-danger alert-dismissible fade show close remove-event" role="alert" data-event-id="${event.id}" data-dismiss="alert" aria-label="Close">
                    ${event.eventText} - Through ${event.eventEnd}</button>`));
                }else{
                    $('.events-today').html('<h5 class="text-center">No events found</h5 class="text-center">');
                }               
            }
        }   
        
        function removeEvent(id){
            let storedEvents = JSON.parse(localStorage.getItem('events'));
            if(storedEvents != null){
                storedEvents = storedEvents.filter( ev => ev.id != id ); 
                localStorage.setItem('events', JSON.stringify(storedEvents));
                $('.toast-body').html('Your event has been removed');
                $('.toast').toast('show');
            }
        }        
        /* $(document).on('click', '.remove-event', function(){
            let confirmVar = this;
            let confirmAction = confirm("Are you sure you want to delete this event?");
            console.log(confirmAction);
                if (confirmAction === true) {
                    let eventId = $(confirmVar).data('event-id');
                    removeEvent(eventId);
                }
                else{
                    alert("Your event was not deleted. Refresh the page (F5 or ctrl+shift+r) if changes occur.");
                    /*location.reload();*/
                    /*throw new Error("Your Event Was Not Deleted.");*/
                    
                /*}
        });*/



        $(document).on('click', '.prevMonth', function(){
            year = (month === 0) ? year - 1 : year;
            month = (month === 0) ? 11 : month - 1;
            renderCalendar(month, year);
            window.onload = eventDisplay();
        });
        $(document).on('click', '.nextMonth', function(){
            year = (month === 11) ? year + 1 : year;
            month = (month + 1) % 12;
            renderCalendar(month, year);
            window.onload = eventDisplay();
        });

        $(document).ready(function(){
            let todaysDate = $(".active").text().slice(0,2) +' '+ (months[month]) +' '+ year;
            let eventDay = days[new Date(year, month, $(this).text()).getDay()];
            let eventDate = $(this).replace(/\D+/g, '') + month + year;
            $('.event-date').html(todaysDate).data('eventDate', eventDate);
            $('.event-day').html(eventDay);
        });
    
        $(document).on('click', '.calCells', function(){
            $('.calCells').removeClass('active');
            /*$('#event').removeClass('d-none');*/
            $(this).addClass('active');
            
/*------------------Setting up Date Picker Min End Date-----------------------*/
            //Realizing I need this here to pull the active/desired event date
            //Grab active date and current date
            let activeDate;
            let currentDate;
            activeDate = $(".active").text().replace(/[^\d.]/g, '');
            console.log(activeDate);
            //Heck. Current date doesn't store between months...
            console.log($(".bg-danger"));
            currentDate = $(".bg-danger").text().replace(/[^\d.]/g, '');
            console.log(currentDate);
//Todo: Submit case for different month (prev/next). Always have min end date formatting follow the active date            
            /*activeMonth = $(".active").text().slice(2,4);*/
            
            //Set up Selected Date Variable to locally pull values
            var selDate = new Date();
            var dd = selDate.getDate();
            console.log(dd);
            var mm = selDate.getMonth()+1; //January is 0 so need to add 1 to make it 1!
            console.log(mm);
            
            //Grabbing the month displayed
            var amo = document.getElementById('s_m').innerText;
            amo = amo.slice(0, amo.length - 5);
            console.log(amo);
            
            
            //Start Here. Try to verify month by pulling the value of i from the array when months = June / current month
            if (months[mm] == amo){
                console.log(true);
            }else {
                console.log(false);
            }
            
            //If this is the case, set the month value (i-1) to mm


/*----------------------------------------------------------------------------*/

            var yyyy = selDate.getFullYear();
            console.log(yyyy);
            
            //Pad the date and month for formatting
            if(activeDate<10){
                activeDate='0'+activeDate;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            
            
            //Check if the activeDate is greater than today, support both conditions
            if (currentDate<activeDate) {
                selDate = yyyy+'-'+mm+'-'+activeDate;   
            }
            if (activeDate<currentDate) {
                selDate = yyyy+'-'+mm+'-'+currentDate;
            }
            /**/if (activeDate === currentDate) {
                selDate = yyyy+'-'+mm+'-'+activeDate;
            }/**/
            
            //Assign Min Date Attribute to Date Picker
            document.getElementById("end").setAttribute("min", selDate);
            
/*------------Continue with your regularly scheduled programming-------------*/ 
            let todaysDate = $(this).text().slice(0,2) +' '+ (months[month]) +' '+ year;
            let eventDay = days[new Date(year, month, $(this).text()).getDay()];
            let eventDate = $(this).text().slice(0,2) + month + year;
            $('.event-date').html(todaysDate).data('eventDate', eventDate);
            $('.event-day').html(eventDay);
            showEvent(eventDate);
        });
        
        $(document).on('click', '.hide', function(){
            $('#event').addClass('d-none');
        });
        
        $(document).on('click', '#createEvent', function(){
            let events = localStorage.getItem('events');
            let obj = [];
            if (events) {
                obj = JSON.parse(events);
            }
            let eventDate = $('.event-date').data('eventDate');
            console.log(eventDate);

/* ---------------------- Setting Event End format --------------------------*/ 

            let eventEndHyphens = $('#end').val();
            let eventEndTest = eventEndHyphens.replaceAll("-","");
            let eey = eventEndTest.substr(0,4);
            let eem1 = eventEndTest.substr(4,2);
            let eem = parseInt(eem1, 10);
            eem = eem - 1;
            eem = eem.toString();
            let eed = eventEndTest.substr(6,2);
            eed = parseInt(eed, 10);
            eed = eed.toString();
            let eventEnd = eed+eem+eey;

/* -------------------Setting Conditions for Date Picker----------------------*/ 
            let eventText = $('#eventTxt').val();
            let valid = false;
            $('#eventTxt').removeClass('data-invalid');
            $('.error').remove();
            
//Reformatting Date Picker Entries to check for end date coming before start date
//Declare a local scope variable
            let evEnVar = eey+eem+eed;
            
//Declare some out-of-scope variables
            let esy = "";
            let esm = "";
            let esd = "";
            if (eventDate.length === "8") {
                                
            } 
            
//No Event Name
            if (eventText == ''){
                $('.events-input').append(`<span class="error">Please enter event name.</span>`);
                $('#eventTxt').addClass('data-invalid');
                $('#eventTxt').trigger('focus');
            }
            
//Event Name less than 3 chars
            else if(eventText.length < 3){
                $('#eventTxt').addClass('data-invalid');
                $('#eventTxt').trigger('focus');
                $('.events-input').append(`<span class="error">Please use at least three characters.</span>`);
            }
            
//Event End is NaN
            else if(isNaN(eventEnd)){
                $('.events-input').append(`<span class="error">Please choose an ending date.</span>`);
                $('#eventTxt').addClass('data-invalid');
                $('#eventTxt').trigger('focus');
                
            }
            
//Event Date is NaN
            else if(isNaN(eventDate)){
                $('.events-input').append(`<span class="error">Please choose a date on the calendar for your event.</span>`);
                $('#eventTxt').addClass('data-invalid');
                $('#eventTxt').trigger('focus');

            }else{
                valid = true;
            }
            
            if (valid){
                let id =1;
                if (obj.length > 0) {
                    id = Math.max.apply('', obj.map(function (entry) { return parseFloat(entry.id); })) + 1;
                }
                
                else {
                    id = 1;
                }
                
                obj.push({
                    'id' : id,
                    'eventText': eventText,
                    'eventDate': eventDate,
                    'eventEnd': eventEnd,
                    'eventDesc': eventDesc,
                });           
                
                localStorage.setItem('events', JSON.stringify(obj));

/*--------------------------fix-----------------------------------------------*/

                //sendData('events', JSON.stringify(obj));
                
                
                /*const xhr = new XMLHttpRequest();
                let theUrl = '/admin/employee/calendar/json/events.json';
                console.log(theUrl);
                
                xhr.open('GET', theUrl, true);
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                xhr.onload = () => {
                
                // process response
                    if (xhr.status == 200) {
                // parse JSON data
                        console.log(JSON.parse(xhr.response));
                                            } else {
                        console.error('Error!');
                                                    }
                                            };
                
                xhr.send(JSON.stringify(storedEvents));*/
                
                // Finished Loading POST, failed Loading GET
                /*let theUrl = '/admin/employee/calendar/json/events.json';
                
                function post(theUrl, obj, cb) {
                const xhr = new XMLHttpRequest();
                console.log(theUrl);
                xhr.onload = function () {
                    cb(JSON.parse(xhr.response));
                }
                xhr.open('POST', theUrl, true);
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                /*xhr.onload = () => {
                
                // process response
                    if (xhr.status == 200) {
                // parse JSON data
                        console.log(JSON.parse(xhr.response));
                                            } else {
                        console.error('Error!');
                                                    }
                                            };
                *//*
                xhr.send(JSON.stringify(obj));
                }
                post();*/
                
                
                $('#eventTxt').val('');
                $('.toast-body').html('Your event has been added!');
                $('.toast').toast('show');
                showEvent(eventDate);
            }
        });
    });