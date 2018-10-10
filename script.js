var globalHolidays =[];
var restURL="https://python-exam-tsgroup-hectordavid1228.c9users.io:8082";
var currYear;
function initYear(value){
	currYear=value;
	$.ajax({
  	url: restURL+"/getHolidays?year="+value,
  	method: "GET",
  	data: {},
  	crossDomain:true,
  	success: function(data){
  		globalHolidays=data.result;
  		drawYear(value,globalHolidays);
	},
  	dataType: "JSON"
	});
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

window.onload = function(){


}

function saveHolidays(){
	var dataToSend={'dates' : globalHolidays,'year' : currYear};
	console.log(dataToSend);
  $.ajax({
  	url: restURL+"/storeHolidays",
  	method: "POST",
  	contentType: "application/json; charset=utf-8", 
  	data: JSON.stringify(dataToSend),
  	crossDomain:true,
  	success: function(data){
	},
  	dataType: "JSON"
	});
}

function addHoliday(date){
	found=false;
	index=-1
	var cDate=new Date(date);
	for(var d=0;d<globalHolidays.length;d++){
		var gDate=new Date(globalHolidays[d]);
		if(gDate.getTime()===cDate.getTime()){
			found=true;
			index=d;
			break;
		}
	}
	if(found){
		document.getElementById(date).style.color = "black";
		globalHolidays.splice(index, 1);
	}
	else{
		document.getElementById(date).style.color = "red";
		globalHolidays.push(date);
	}
	
}

function drawYear(year,holidays){

	for(var m=0;m<12;m++){
		prepareCalendar(m,year,holidays);
	}
}

function isHoliday(day,month,year,holidays){
	var holidayDates=[];
	for(var h=0;h<holidays.length;h++){
		holidayDates.push(new Date(holidays[h]));
	}
	holidays=holidayDates;
	var itis=false;
	var date=new Date(year,month,day);
	for(var h=0; h<holidays.length;h++){

		if(holidays[h].getTime()===date.getTime()){
			itis=true;
		}
	}
	return itis;
}

function prepareCalendar(month,year,holidays){
	var month_name=["January","February","March","April","May","June","July","August","September","October","November","December"];

	var first_date = "01" + "-" + month_name[month] + "-" + year;
	var tmp = new Date(first_date);

    var first_day=tmp.getDay();
    var days=daysInMonth(month+1,year);
    var calendar=getCalendar(first_day,days,holidays,month,year);
    document.getElementById("calendar-month-year"+month.toString()).innerHTML=month_name[month]+" "+year;
    document.getElementById("calendar-dates"+month.toString()).innerHTML = "";
    document.getElementById("calendar-dates"+month.toString()).appendChild(calendar);
}

function getCalendar(first_day,days,holidays,month,year){
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var c;

	for(c=0;c<7;c++){
		var td = document.createElement('td');
		td.innerHTML= "SMTWTFS"[c];
		tr.appendChild(td);
	}
	table.appendChild(tr);
	tr = document.createElement('tr');
	for(c=0;c<7;c++){
		if(c==first_day){
			break;
		}
		var td = document.createElement('td');
		if(c==0){
			td.classList.add('holiday');
		}
		td.innerHTML= "";
		tr.appendChild(td);
	}
    
	var counter=1;
	for(;c<7;c++){
		var td = document.createElement('td');
		if(c==0 || c==6){
			td.innerHTML=counter;
		}
		else{
		var onclickstr="onclick='addHoliday("
		var strYear=year.toString();
		var strMonth=((month+1).toString());
		var strDay=counter.toString();
		var date='"'+strMonth+"-"+strDay+"-"+strYear;
		td.innerHTML= "<p id="+date+'" '+onclickstr+date+'")'+"'>"+counter.toString()+"</p>";
		}
		if(c==0 || isHoliday(counter,month,year,holidays)){
			td.classList.add('holiday');
		}
		else{

		}
		counter++;
		tr.appendChild(td);
	}
	table.appendChild(tr);
	for(var r=3; r<=7;r++){
		tr = document.createElement('tr');
		for(var c=0;c<7;c++){
			if(counter>days){
				table.appendChild(tr);
				return table;
			}
			var td = document.createElement('td');
			if(c==0 || c==6){
			td.innerHTML=counter;
			}
			else{
			var onclickstr="onclick='addHoliday("
			var strYear=year.toString();
			var strMonth=((month+1).toString());
			var strDay=counter.toString();
			var date='"'+strMonth+"-"+strDay+"-"+strYear;
			td.innerHTML= "<p id="+date+'" '+onclickstr+date+'")'+"'>"+counter.toString()+"</p>";
			}
			if(c==0 || isHoliday(counter,month,year,holidays)){
				td.classList.add('holiday');
			}
			else{
				
		    }
			counter++;
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}