$(document).ready(function(){
	//The below code is for the calendar.html page
	// we will need to call the events in from localStorage 
	/*
		ID's we need to populate/take care of
			#meeting-name
				This will display the name of the meeting
				header element "<h3> or <h4>"
			#meeting-location
				This will display the name of the location
				(In future: link to google maps)
			#meeting-url
				This is a link to a meeting url, something like a livestream  event
			#meeting-date
				display the date for the meeting
			#meeting-time
				sidplay the beginning and end time of the meeting
		Modal Information found here: http://getbootstrap.com/javascript/#modals
	*/
	//---------------------------------------------------------------------------------------------------------------------------

	//we want to generate an array filled with colors for different events
		
	//---------------------------------------------------------------------------------------------------------------------------

	$('#pcalendar').fullCalendar('render');
	// Preliminary data allocation
	//first read in from local storage
	var obj = localStorage.getItem('apime');
	var me = JSON.parse(obj);
	console.log(me["Groups"].length);
	// me variable stores the JSON from the API/ME call to the server
	//we need to handle the calendar that is on the page
	//a large amount of the code from this page will happen within the  calendar initialization
	//need to handle events properly
	function eventarr(object){
		//note object is really only going to be apime
		//we need to isolate the events in the object
		// Note meeting location is a custom additional value
		var pubcalarr = [];
		for (var i=0; i<object["Calendar"].length; i++){
			//object["Calendar"][i] is an event
			//we want to isolate those events with and w/o a url

			if(object["Calendar"][i]["url"] == "" || object["Calendar"][i]["url"] == null){
				//no url to worry about:

				var start = new Date(object["Calendar"][i]["timebegin"]*1000);
				var end = new Date(object["Calendar"][i]["timeend"]*1000)
				var name = object["Calendar"][i]["meetingname"];
				var loc = object["Calendar"][i]["location"];
				pubcalarr.push({
					title: name,
					start: start,
					end: end,
					location: loc,
					gname: object["Calendar"][i]["groupname"]
				});
			} else {
				//there is a url
				var start = new Date(object["Calendar"][i]["timebegin"]*1000);
				var end = new Date(object["Calendar"][i]["timeend"]*1000);
				var url = object["Calendar"][i]["url"];
				var loc = object["Calendar"][i]["location"];
				pubcalarr.push({
					title: name,
					start: start,
					end: end,
					location: loc,
					gname: object["Calendar"][i]["groupname"],
					url: url
				});
			};
		};
		return pubcalarr;
	};

	$("#pcalendar").fullCalendar({
		//here we will:
		// set the view to a month
		// import the events
		// enable onclick of events
		defaultView: 'month',
		header: {
			left: 'prev, next, today',
			center: 'title',
			right: ''
		},
		editable: false,
		events: eventarr(me),
		eventClick: function(calEvent, jsEvent, view){
			//calEvent.datum = datum value
			//we make a modal first

			var day = "";
			function blah(){
				//generate a day name based on getUTCdate
				var val = calEvent.start.getUTCDay();
				if(val == 1){
					day = "Monday";
				} else if (val == 2){
					day = "Tuesday";
				} else if( val == 3){
					day = "Wednesday";
				} else if (val == 4){
					day = "Thursday";
				} else if (val == 5){
					day = "Friday";
				} else if (val == 6){
					day = "Saturday";
				} else {
					day = "Sunday";
				}
			};
			blah();
			if(calEvent.url != "" || calEvent.url != null){
				if(calEvent.loc == null || calEvent.loc == ""){
					$("#modal-title").text("Meeting Name: " + calEvent.title);
					$("#group-name").text("Group Name: " + calEvent.gname);
					$("#location").text("No location specified.");
					$("#url").append("<a href=" + calEvent.url + ">Link</a>");
					$("#meeting-date").text("Meeting Date: " + day);
					$("#meeting-time").text("Meeting Time: " + calEvent.start.getUTCHours());
					$("#popout-modal").modal('show');
				} else {
					$("#modal-title").text("Meeting Name: " + calEvent.title);
					$("#group-name").text("Group Name: " + calEvent.gname);
					$("#location").text("Location: " + calEvent.loc);
					$("#url").append("<a href=" + calEvent.url + ">Link</a>");
					$("#meeting-date").text("Meeting Date: " + day);
					$("#meeting-time").text("Meeting Time: " + calEvent.start.getUTCHours());
					$("#popout-modal").modal('show');
				}
			} else {
				if(calEvent.loc == null || calEvent.loc == ""){
					$("#modal-title").text("Meeting Name: " + calEvent.title);
					$("#group-name").text("Group Name: " + calEvent.gname);
					$("#location").text("No location specified.");
					$("#meeting-date").text("Meeting Date: " + day);
					$("#meeting-time").text("Meeting Time: " + calEvent.start.getUTCHours());
					$("#popout-modal").modal('show');
				} else {
					$("#modal-title").text("Meeting Name: " + calEvent.title);
					$("#group-name").text("Group Name: " + calEvent.gname);
					$("#location").text("Location: " + calEvent.loc);
					$("#meeting-date").text("Meeting Date: " + day);
					$("#meeting-time").text("Meeting Time: " + calEvent.start.getUTCHours());
					$("#popout-modal").modal('show');
				}
				console.log("Event " + calEvent);
			};

		}
	});
});