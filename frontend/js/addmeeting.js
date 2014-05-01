
    $(document).ready(function() {	

       var data = localStorage.getItem("apime");
			 var me = JSON.parse(data);
			 if (me == null || me == 'undefined'){
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
					if (Date.parse($("#start.input-group.date input[type=text]").val()) <= 0 || Date.parse($("#end.input-group.date input[type=text]").val()) <= 0) {
						document.getElementById("meeting-repeat").disabled=true;
					}

					// Undisable checkbox if both date boxes are filled
					// Need to fix bug - only one date filled and checkbox active again
					$("#start.input-group.date input[type=text], #end.input-group.date input[type=text]").change(function() {
						document.getElementById("meeting-repeat").disabled=false;
					});

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
									url: "https://shirleys-scheduler.com/auth/login",
									data: {meetingName:$("#meeting-name").val(), meetingLocation:$("#meeting-location").val(), meetingURL:$("#location-url").val(), startTime:start,endTime:end,checkbox:isChecked, group:invitees},
									dataType: 'JSON',
									async: false,
									success: function(toke) {  // Is response string valid JSON object?
										window.location.replace("https://shirleys-scheduler.com/auth/login_validate?token="+toke["token"]);
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
