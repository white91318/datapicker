var month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
var month_name = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

var days_holder = document.getElementById("days");
var months_holder = document.getElementById("months");
var years_holder = document.getElementById("years");

var prev = document.getElementById("prev");
var next = document.getElementById("next");
var normal_title = document.getElementById("normal-title");
var year_title = document.getElementById("year-title");
var years_title = document.getElementById("years-title");
var cyear = document.getElementById("calendar-year");

var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();
var today = new Date()

document.onload = refreshDate()

function dayStart(month, year) {
	var tmpDate = new Date(year, month, 1);
	return (tmpDate.getDay());
}

function daysMonth(month, year) {
	var tmp = year % 4;
	if (tmp == 0) {
		return (month_olympic[month]);
	} else {
		return (month_normal[month]);
	}
}

function refreshDate(){
    var firstDay = dayStart(my_month, my_year)
    var totalDay = new Date(my_year,my_month,-firstDay)
    var thisMonth = daysMonth(my_month,my_year)
    $('.show-years').hide();
    $('.show-date').show();
    while (days_holder.firstChild) {
        days_holder.removeChild(days_holder.firstChild);
    }
    var date = totalDay.getDate();
    for (var i = 0; i < 6; i++){
        var newRow = document.createElement("div");
        for(var j = 0; j < 7; j++){
            var newDate = document.createElement("span");
            totalDay.setDate(++date);
            date = totalDay.getDate();
            if (totalDay.getMonth() != my_month){
                newDate.setAttribute("class", "not-this-period");
            }else {
                newDate.setAttribute("class", "date");
            }
            newDate.innerText = date;
            var dateInfo = totalDay.toLocaleDateString();
            newDate.setAttribute("id",dateInfo);
            
            if(date == today.getDate() && today.getMonth() == my_month && today.getFullYear() == my_year) {
                newDate.setAttribute("class", "today");
            }
            newDate.setAttribute("onclick", "selectDate(\"" + dateInfo+ "\")");
            newRow.appendChild(newDate);
        }
        days_holder.appendChild(newRow);
    }
	normal_title.innerHTML = month_name[my_month] +" "+ my_year; 
}

function showMonth(){
    $('.show-date').hide();
    $('.show-month').show();
    var get_month = new Date()
    var newRow = document.createElement("div");
    while (months_holder.firstChild) {
        months_holder.removeChild(months_holder.firstChild);
    }
    for (var i = 0 ; i<12 ;i++) {
        var newMonth = document.createElement("span");
        get_month.setMonth(i)
        newMonth.innerText  = month_name[i]
        newMonth.setAttribute("class", "date");
        if(i == my_month && today.getFullYear() == my_year) {
            newMonth.setAttribute("class", "today");
        }
        var dateInfo = get_month.getMonth();
        newMonth.setAttribute("onclick", "foucsDate(\"" + dateInfo+ "\")");
        newMonth.setAttribute("id",dateInfo)
        newRow.appendChild(newMonth);
    }
    months_holder.appendChild(newRow);
    year_title.innerHTML =  my_year;
}

function showYears(){
    $('.show-month').hide();
    $('.show-years').show();
    var total_year = my_year - (my_year % 10 + 1)
    var year_period = []
    var get_year = new Date()

    var newRow = document.createElement("div");
    while (years_holder.firstChild) {
        years_holder.removeChild(years_holder.firstChild);
    }
    for (var i = 0 ; i<12 ;i ++) {
        year_period.push(total_year++);
    }
    for (var i = 0 ; i< 12 ;i++) {
        var newYear = document.createElement("span");
        newYear.innerText  = year_period[i]
        get_year.setFullYear(year_period[i])
        newYear.setAttribute("class", "date");
        if(year_period[i] == new Date().getFullYear()) {
            newYear.setAttribute("class", "today");
        }
        if(i == 0 || i == 11) {
            newYear.setAttribute("class","not-this-period")
        }
        var dateInfo = get_year.getFullYear();
        newYear.setAttribute("onclick", "foucsDate(\"" + dateInfo+ "\")");
        newYear.setAttribute("id",dateInfo)
        newRow.appendChild(newYear);
    }

    years_holder.appendChild(newRow);
    years_title.innerHTML = year_period[1] +"-"+ year_period[10] ;
}

prev.onclick = function(e){
    if (e.target.className == "normal") {
        my_month--;
        if(my_month<0){
            my_year--;
            my_month = 11;
        }
        refreshDate();
    }else if (e.target.className == "month") {
        my_year --
        console.log(my_year)
        showMonth()
    }else if (e.target.className == "years") {
        my_year -= 10
        showYears()
    }
}
next.onclick = function(e){
    if (e.target.className == "normal") {
        my_month++;
        if(my_month>11){
            my_year++;
            my_month = 0;
        }
        refreshDate();
    }else if (e.target.className == "month") {
        my_year++
        showMonth()
    }else if (e.target.className == "years") {
        my_year  += 10
        showYears()
    }
}

normal_title.onclick = function(e) {
    e.preventDefault()
    showMonth(my_month)
    $('#normal-title').hide()
    $('#year-title').show()
    next.setAttribute("class","month")
    prev.setAttribute("class","month")
}
year_title.onclick = function(e) {
    e.preventDefault()
    showYears()
    $('#year-title').hide()
    $('#years-title').show()
    next.setAttribute("class","years")
    prev.setAttribute("class","years")
}
years_title.onclick = function(e) {
    e.preventDefault()
    refreshDate()
    $('#years-title').hide()
    $('#normal-title').show()
    next.setAttribute("class","normal")
    prev.setAttribute("class","normal")
}

function selectDate(e){
    console.log(e)
    $('.show-date span').removeClass("select")
    $('.show-month span').removeClass("select")
    $('.show-years span').removeClass("select")
    $('.today').css({"color":"red","background":"none"})
    document.getElementById(e).classList.add("select")
    $('#date-input').val(new Date(e).getFullYear() + "/" + (new Date(e).getMonth()+1) + "/" + new Date(e).getDate())
    $('.calendar').hide()
}
function foucsDate(e){
    $('.show-date span').removeClass("select")
    $('.show-month span').removeClass("select")
    $('.show-years span').removeClass("select")
    $('.today').css({"color":"red","background":"none"})
    document.getElementById(e).classList.add("select")
}
