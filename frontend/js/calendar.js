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
	var content = ""; //Simple variable to store appended content
	var mnameb = "<h4 id='meeting-name'>";
	var mlocb = "<p id='meeting-location'>";
	var murlb = "<a id='meeting-url' href=";
	var mdateb = "<p id='meeting-date'>";
	var mtimeb = "<p id='meeting-time'>";
	//we need to handle the calendar that is on the page
	//a large amount of the code from this page will happen within the  calendar initialization
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
		
		
	});
	
});