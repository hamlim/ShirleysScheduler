$(document).ready(function(){
	//The file has just loaded in/is loading in 
	//we need to call in the JS from the local storage
	/* 
		ID's we need to follow: 
			#user-calendar:
				Displays the user's calendar
				Week view beginning at the current day
				FullCalendar integration
			#user-today
				Displays the current day meetings
				Text based: each stored in a div
					location
					time
					Group name
					Meeting name h4 or h3
			#user-tomorrow
				Displays the meetings of the next day
				Text based: each stored in a div
					location
					time
					Group name
					Meeting name h4 or h3
			#user-yesterday
				Displays the meetings of the previous day
				Text based: each stored in a div
					location 
					time
					Group name
					Meeting name h4 or h3
			#user-meeting-invite
				Displays meeting invites from other users
				Will be link to the meeting
	*/
	//here we make the api call
	function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
	};
	var toke = readCookie("token");
	console.log("toke: " + toke);
	var tokenc = document.cookie;
	console.log("Test token cookie: " + tokenc);
	function getdata(callback){
		return $.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "JSON",
			url: "https://shirleys-scheduler.com/api/me",
			headers : { 'Authorization' : toke },
			success: function(data){
				console.log("we have api me data");
				//store data as "apime" in localstorage
				console.log(data);
			},
			error: function(xhr, text, e){
				console.log("AJAX Error: " + e);
				console.log("Unable to access data from server!"); //either the token is invalid or the token was not properly loaded from localstorage
			}
		});
	};
	getdata(function(data){
		localStorage.setItem("apime", JSON.stringify(data)); 
	});
	var obj = localStorage.getItem('apime');
	var apime = JSON.parse(obj);
	console.log(apime); //apime stores all the data from the database
//	if(apime == null || apime == 'undefined'){
//		window.location.replace("index.html");
//	} else {
		//---------------------------------------------------------------------------------------------------------------------------
		// #user-calendar section of the dashboard.html file
		// Uses FullCalendar
		//generate the array of events before the calendar section:
		function eventarr(object){

			//note object is really only going to be apime
			//we need to isolate the events in the object
			var pubcalarr = [];
			for (var i=0; i<object["Calendar"].length; i++){
				//object["Calendar"][i] is an event
				//we want to isolate those events with and w/o a url
				if(object["Calendar"][i]["url"] == "" || object["Calendar"][i] == null){
					//no url to worry about:
					var startt = new Date(object["Calendar"][i]["timebegin"]*1000);
					var stime = $.fullCalendar.formatDate(startt, "u");
					var endt = new Date(object["Calendar"][i]["timeend"]*1000)
					var etime = $.fullCalendar.formatDate(endt, "u");
					var name = object["Calendar"][i]["meetingname"];
					pubcalarr.push({
						title: name,
						start: stime, 
						end: etime
					});
				} else {
					//there is a url
					var startt = new Date(object["Calendar"][i]["timebegin"]*1000);
					var stime = $.fullCalendar.formatDate(startt, "u");
					var endt = new Date(object["Calendar"][i]["timeend"]*1000);
					var etime = $.fullCalendar.formatDate(endt, "u");
					var url = object["Calendar"][i]["url"];
					pubcalarr.push({
						title: name,
						start: stime, 
						end: etime, 

						url: url					
					});
				};
			};
			return pubcalarr;
		};
		var events = eventarr(apime);

		$("#pcalendar").fullCalendar({
			// week view

			defaultView: 'agendaWeek',
			firstHour: 4,
			maxTime: 17,
			allDayDefault: false,

			header: {
				left: 'prev, next today',
				center: 'title',
				right: ''
			},
			editable: false,
			events: eventarr(apime)
		});
		$('#pcalendar').fullCalendar('render');


		//---------------------------------------------------------------------------------------------------------------------------
		// #user-today section of the dashboard.html file
		//we want to create a simple repeatable semantic content container for the metadata
		//#user-today is on a Ul element
		//each event will be an li element
		var usertoday = $("#user-today"); //Store the location of the ul in a variable
		var content = "";
		var libegin = "<li class='list-group-item'>";
		var liend = "</li>";
		//now we iterate through all the events in the today array
		for (var i=0; i<apime["Today"].length; i++){
			var dateb = new Date(apime["Today"][i].timebegin*1000);
			var bh = dateb.getHours();
			var bm = dateb.getMinutes();
			var bs = dateb.getSeconds();
			var timeb = bh + ":" + bm + ":" + bs;
			var datee = new Date(apime["Today"][i].timeend*1000);
			var eh = datee.getHours();
			var em = datee.getMinutes();
			var es = datee.getSeconds();
			var timee = eh + ":" + em + ":" + es;
			var meetingname = "<h4>" + apime["Today"][i].meetingname + "</h4>";
			var loc = "<p>" + apime["Today"][i].location + "</p>";
			var times = "<p>" + timeb + " to " + timee + "</p>";
			var groupname = "<p>" + apime["Today"][i].groupname + "</p>";
			var div = "<div>" + meetingname + groupname + times + loc + "</div>";
			content += libegin + div + liend;
		};
		if (content == ""){
			content = "<li><div><h3>No events Today! Go have some fun!</h3></div><li>";
		};
		var today = content;
		usertoday.append(today);
		//---------------------------------------------------------------------------------------------------------------------------
		// #user-tomorrow section of the dashboard.html file
		// we want to do essentially the same thing as we did for today, and will do the same thing for yesterday
		var usertomorrow = $("#user-tomorrow"); // store the location of the user-tomorrow ul in a var
		content = ""; //clear out content's values for the new section
		for(var i=0; i<apime["Tomorrow"].length; i++){
			var dateb = new Date(apime["Tomorrow"][i].timebegin*1000);
			var bh = dateb.getHours();
			var bm = dateb.getMinutes();
			var bs = dateb.getSeconds();
			var timeb = bh + ":" + bm + ":" + bs;
			var datee = new Date(apime["Tomorrow"][i].timeend*1000);
			var eh = datee.getHours();
			var em = datee.getMinutes();
			var es = datee.getSeconds();
			var timee = eh + ":" + em + ":" + es;
			var meetingname = "<h4>" + apime["Tomorrow"][i].meetingname + "</h4>";
			var loc = "<p>" + apime["Tomorrow"][i].location + "</p>";
			var times = "<p>" + timeb + " to " + timee + "</p>";
			var groupname = "<p>" + apime["Tomorrow"][i].groupname + "</p>";
			var div = "<div>" + meetingname + groupname + times+ loc + "</div>"
			content += libegin + div + liend;
		};
		if (content ==""){
			content = "<li><div><h3>No events Tomorrow! Plan something fun!</h3></div><li>";
		};
		var tomorrow = content;
		usertomorrow.append(tomorrow);
		//---------------------------------------------------------------------------------------------------------------------------
		// #user-yesterday section

		var useryesterday = $("#user-yesterday");
		content = "";
		for ( var i=0; i<apime["Yesterday"].length; i++){
			var dateb = new Date(apime["Yesterday"][i].timebegin*1000);
			var bh = dateb.getHours();
			var bm = dateb.getMinutes();
			var bs = dateb.getSeconds();
			var timeb = bh + ":" + bm + ":" + bs;
			var datee = new Date(apime["Yesterday"][i].timeend*1000);
			var eh = datee.getHours();
			var em = datee.getMinutes();
			var es = datee.getSeconds();
			var timee = eh + ":" + em + ":" + es;
			var meetingname = "<h4>" + apime["Yesterday"][i].meetingname + "</h4>";
			var loc = "<p>" + apime["Yesterday"][i].location + "</p>";
			var times = "<p>" + timeb + " to " + timee + "</p>";
			var groupname = "<p>" + apime["Yesterday"][i].groupname + "</p>";
			var div = "<div>" + meetingname + groupname + times+ loc + "</div>"
			content += libegin + div + liend;
		};
		if (content == ""){
			content = "<li><div><h3>No events Yesterday!</h3></div><li>"
		}
		var yesterday = content;
		useryesterday.append(yesterday);
		//---------------------------------------------------------------------------------------------------------------------------
		// #user-meeting-invite section of the dashboard.html file
		// Here we represent the event invites to the user
		var invites = $("#user-meeting-invite");
		content = "";
		for (var k = 0; k< apime["Invites"].length; k++){
			var eventlink = "<h5><a href='https://shirleys-scheduler.com/group.html' title='Event Information'>" + apime["Invites"][k].meetingname + "</a></h5>";
			var invite = "<h3>" + apime["Invites"][k].owner + " invited you! </h3>";
      var buttonView = "<div align='right'><button id='accept-btn' type='button' class='btn btn-primary btn-sm'> Accept " +  apime["Invites"][k].meetingname + "</button></div>";
			content += libegin + invite + eventlink + buttonView + liend;
		};
		if (content == ""){
			content = "<h4>No one has invited you. :(</h4>";
		};
		var invitecontent = content;
		invites.append(invitecontent);
//	};
});