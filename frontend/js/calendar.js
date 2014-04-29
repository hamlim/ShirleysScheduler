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
	// Preliminary data allocation
	//first read in from local storage
	var obj = localStorage.getItem('apime');
	var me = JSON.parse(obj);
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
			if(object["Calendar"][i]["url"] == "" || object["Calendar"][i] == null){
				//no url to worry about:
				var microarr = [];
				console.log(microarr);
				var start = new Date(object["Calendar"][i]["timebegin"]*1000);
				var end = new Date(object["Calendar"][i]["timeend"]*1000)
				var name = object["Calendar"][i]["meetingname"];
				var loc = object["Calendar"][i]["location"];
				microarr["title"] = name;
				microarr["start"] = start;
				microarr["end"] = end;
				microarr["location"] = loc;
				microarr["gname"] = object["Calendar"][i]["groupname"];
				pubcalarr.push(microarr);
			} else {
				//there is a url
				var microarr = [];
				var start = new Date(object["Calendar"][i]["timebegin"]*1000);
				var end = new Date(object["Calendar"][i]["timeend"]*1000);
				var url = object["Calendar"][i]["url"];
				var loc = object["Calendar"][i]["location"];
				microarr["title"] = name;
				microarr["start"] = start;
				microarr["end"] = end;
				microarr["url"] = url;
				microarr["location"] = loc;
				microarr["gname"] = object["Calendar"][i]["groupname"];
				pubcalarr.push(microarr)
			};
		};
		return pubcalarr;
	};
	$("#calendar").fullCalendar({
		//here we will:
		// set the view to a month
		// import the events
		// enable onclick of events
		defaultView: 'month',
		header: {
			left: 'prev, next today',
			center: 'title',
			right: ''
		},
		editable: false,
		events: eventarr(me),
		eventClick: function(calEvent, jsEvent, view){
			//calEvent.datum = datum value
			//we make a modal first
			var body = document.getElementsByTagName("body");
			if(calEvent.url != "" || calEvent.url != null){
				var modal = "<div id='popout-modal' class='modal fade'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><h4 class='modal-title'>" + calEvent.title + "</h4></div><div class='modal-body'><h4 id='group-name'>" + calEvent.gname + "</h4><p id='location'>" + calEvent.loc + "</p><p id='url'><a href=" + calEvent.url + ">Link</a></p><p id='meeting-date'>" + calEvent.start.getUTCDay() + "</p><p id='meeting-time'>" + calEvent.start.getUTCHours() + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
			} else {
				var modal = "<div id='popout-modal' class='modal fade'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><h4 class='modal-title'>" + calEvent.title + "</h4></div><div class='modal-body'><h4 id='group-name'>" + calEvent.gname + "</h4><p id='location'>" + calEvent.loc + "</p><p id='url'>None</p><p id='meeting-date'>" + calEvent.start.getUTCDay() + "</p><p id='meeting-time'>" + calEvent.start.getUTCHours() + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
			};
			body.append(modal);
		
		}
	});
});