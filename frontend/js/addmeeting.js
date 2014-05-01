
    $(document).ready(function() {	

       var data = localStorage.getItem("apime");
			 var apime = JSON.parse(data);
			 if (apime == null || apime == 'undefined'){
				 window.location.replace('index.html');
			 } else {
				 //Navigation Menu Slider
					$('#nav-expander').on('click',function(e){
						e.preventDefault();
						$('body').toggleClass('nav-expanded');
					});
					$('#nav-close').on('click',function(e){
						e.preventDefault();
						$('body').removeClass('nav-expanded');
					});


					// Initialize navgoco with default options
					$(".main-menu").navgoco({
							caret: '<span class="caret"></span>',
							accordion: false,
							openClass: 'open',
							save: true,
							cookie: {
									name: 'navgoco',
									expires: false,
									path: '/'
							},
							slide: {
									duration: 300,
									easing: 'swing'
							}
					});

					// Date/time picker objects
					$("#start").datetimepicker();
					$("#end").datetimepicker();

					// Can't repeat until date & time selected first
          /*
					if (Date.parse($("#start.input-group.date input[type=text]").val()) <= 0 || Date.parse($("#end.input-group.date input[type=text]").val()) <= 0) {
						document.getElementById("meeting-repeat").disabled=true;
					}*/

					// Undisable checkbox if both date boxes are filled
					// Need to fix bug - only one date filled and checkbox active again
          /*
					$("#start.input-group.date input[type=text], #end.input-group.date input[type=text]").change(function() {
						document.getElementById("meeting-repeat").disabled=false;
					});*/

					/*
					var startFilled = $("#start .input-group.date input[type=text]").change(function() {

					});

					var endFilled = $("#end .input-group.date input[type=text]").change(function() {

					});

					//Example followed deferring event trigger
					var load = $.Deferred(function (dfd) {
						$('#div1').load(…, dfd.resolve);
					}).promise();

					var animate = $('html,body').animate(…);

					$.when(load, animate).then(function () {
						// Do your thing here!
					});
					*/

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
      events: eventarr(apime),
      // ADD EVENTSOURCES
      eventClick: function(calEvent, jsEvent, view){
        //calEvent.datum = datum value
        //we make a modal first

        var day = "";
        function blah() {
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

        if(typeof calEvent.url != 'undefined' && calEvent.url != "" && calEvent.url != null){

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

					// Pick group for meeting
					for (var i = 0; i < apime["Groups"].length; ++i) {
						$("#usergroups").append('<option>'+ apime["Groups"][i].groupname+ '</option>');
					}


					// Show meeting day options
					$("#meeting-repeat").change(function() {
						$("#expand").slideToggle("fast");
					});


					// When meeting form submitted..
					$("#meetingButton").click(function() {

						// Verify dates filled out
						var start = Date.parse($("#start.input-group.date input[type=text]").val())/1000;
						var end = Date.parse($("#end.input-group.date input[type=text]").val())/1000;

						// Verify if checkbox checked?
						var isChecked = $("#meeting-repeat").is(":checked")?true:false;



						// Validate form input
						try {

							/*// No null fields (except optionally URL)
							if ($("#meeting-name").val().length === 0 || $("#meeting-name").val().length === undefined)
								throw "Meeting title incomplete";
							if ($("#meeting-location").val().length === 0 || $("#meeting-name").val().length === undefined) 
									throw "Meeting online URL incomplete";
							*/

							// Any UNIX timestamp greater than 0 is a valid date
							if (start === 0 || end === 0) 
								throw "Date field incomplete";

							// End date must come after start date
							if (end < start)
								throw "End date must be after start date";

							/*// Need at least one invitee
							if (invitees.length === 0)
								throw "You can't have a meeting by yourself #ForeverAlone";
							*/

							// Submitting form
							$.ajax({
									type: 'POST',
									url: "https://shirleys-scheduler.com/api/"+ {[GroupID]} +"/event",
									data: {meetingName:$("#meeting-name").val(), meetingLocation:$("#meeting-location").val(), meetingURL:$("#location-url").val(), startTime:start,endTime:end,checkbox:isChecked, group:invitees},
									dataType: 'JSON',
									async: false,
									success: function(toke) {  // Is response string valid JSON object?
										console.log("Success, now we need to update the localstorage stuff");
										// in here push stuff to local storage, ie, add a new event to the calendar arr, then set the new JSON thingy as apime in local storage
									},
									error: function(xhr, err) {
										alert("Error connecting to the server! Please try again!");
									}
							});
						}
						catch(err) {
							alert(err);
						}

					});
			 };
    });
