$(document).ready(function(){
	// should be able to change description
	// and add / remove groups
	//The file has just loaded in/is loading in 
	//we need to call in the JS from the local storage DB
	//we need to call in the JS from the local storage
	
	var username = $("#user-name");
	var useremail = $("#user-email-address");
	var userdatejoined = $("#user-date-joined");
	var userdesc = $("#user-profile-desc");
	var content;
	
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
		content += div;
	};
	var today = libegin + content + liend;
	usertoday.append(today);
	
	// #user-tomorrow section of the dashboard.html file
	// we want to do essentially the same thing as we did for today, and will do the same thing for yesterday
	
});
