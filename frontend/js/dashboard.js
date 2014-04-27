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
	// #user-calendar section of the dashboard.html file
	
	
	// #user-today section of the dashboard.html file
	//we want to create a simple repeatable semantic content container for the metadata
	//#user-today is on a Ul element
	//each event will be an li element
	var usertoday = $("#user-today"); //Store the location of the ul in a variable
	var libegin = "<li>";
	var liend = "</li>";
	var content = "";
	var obj = localStorage.getItem('apime');
	var apime = JSON.parse(obj);
	console.log(apime); //apime stores all the data from the database
	//now we iterate through all the events in the today array
	for (var i=0; i<apime["Today"].length; i++){
		var meetingname = "<h3>" + apime["Today"][i].meetingname + "</h3>";
		var loc = "<p>" + apime["Today"][i].location + "</p>";
		var times = "<p>" + apime["Today"][i].timebegin + " to " + apime["Today"][i].timeend + "</p>";
		var groupname = "<p>" + apime["Today"][i].groupname + "</p>";
		var div = "<div>" + meetingname + groupname + times + loc + "</div>";
		content += libegin + div + liend;
	};
	if (content == ""){
		content = "<li><div><h3>No events Today! Go have some fun!</h3></div><li>";
	};
	var today = content;
	usertoday.append(today);
	
	// #user-tomorrow section of the dashboard.html file
	// we want to do essentially the same thing as we did for today, and will do the same thing for yesterday
	var usertomorrow = $("#user-tomorrow"); // store the location of the user-tomorrow ul in a var
	content = ""; //clear out content's values for the new section
	for(var i=0; i<apime["Tomorrow"].length; i++){
		var meetingname = "<h3>" + apime["Tomorrow"][i].meetingname + "</h3>";
		var loc = "<p>" + apime["Tomorrow"][i].location + "</p>";
		var times = "<p>" + apime["Tomorrow"][i].timebegin + " to " + apime["Tomorrow"][i].timeend + "</p>";
		var groupname = "<p>" + apime["Tomorrow"][i].groupname + "</p>";
		var div = "<div>" + meetingname + groupname + times+ loc + "</div>"
		content += libegin + div + liend;
	};
	if (content ==""){
		content = "<li><div><h3>No events Tomorrow! Plan something fun!</h3></div><li>";
	};
	var tomorrow = content;
	usertomorrow.append(tomorrow);
	
	// #user-yesterday section
	
	var useryesterday = $("#user-yesterday");
	content = "";
	for ( var i=0; i<apime["Yesterday"].length; i++){
		var meetingname = "<h3>" + apime["Yesterday"][i].meetingname + "</h3>";
		var loc = "<p>" + apime["Yesterday"][i].location + "</p>";
		var times = "<p>" + apime["Yesterday"][i].timebegin + " to " + apime["Yesterday"][i].timeend + "</p>";
		var groupname = "<p>" + apime["Yesterday"][i].groupname + "</p>";
		var div = "<div>" + meetingname + groupname + times+ loc + "</div>"
		content += libegin + div + liend;
	};
	if (content == ""){
		content = "<li><div><h3>No events Yesterday!</h3></div><li>"
	}
	var yesterday = content;
	useryesterday.append(yesterday);
	
	// #user-meeting-invite section of the dashboard.html file
	// Here we represent the event invites to the user
	
});