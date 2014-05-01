$(document).ready(function(){
	var groups = {
    "Groupname": "Friends",
		"Groupid": 12346,
    "Users": [
        {
            "email": "jlannister@gmail.com",
            "name": "Jaime Lannister"
        },
        {
            "email": "hamlinmatt212@gmail.com",
            "name": "Matt Hamlin"
        }
    ],
    "Events": [
        {
            "meetingname": "Meeting with Adrian",
            "location": "Times Square",
            "timebegin": 1398967200,
            "timeend": 1398970800,
            "url": ""
        },
        {
            "meetingname": "Meeting with John",
            "location": "Union @ RPI",
            "timebegin": 1399390200,
            "timeend": 1399392000,
            "url": ""
        }
    ]
	};
	
	var obj = localStorage.getItem('apime');
	if (obj == null || typeof obj == 'undefined') {window.location.replace( 'index.html' );}
	else {
		var apime = JSON.parse(obj);
		var gid = groups["Groupid"];
		$("#group-name").text(groups["Groupname"]);
		for (var i = 0; i < groups["Users"].length; i++) {
			$("#list-users").append('<h3 class="list-group-item">'+groups["Users"][i].name+'</h3>');
			$("#list-users").append('<h5 class="list-group-item">'+groups["Users"][i].email+'</h5>');
		}
		for (var i = 0; i < groups["Events"].length; i++) {
			$("#group-events").append("<div class='panel-heading'><h3 class='list-group-item'>"+groups["Events"][i].meetingname+"</h3></div><div class='todo'><em>Location:</em> " +groups["Events"][i].location+"<br/>" + 
			"<em>Start: </em>"+new Date(groups["Events"][i].timebegin)+"<br/><em>End: </em>"+new Date(groups["Events"][i].timeend) +"</div>"
			);

		}
	}
	$("#adduserbtn").click (function(e) {
		e.preventDefault();
		$('#adduser').show();
	});
	
	$("#submitusers").click (function(e) {
		e.preventDefault();
		
		// Get invitees into an object
		var users = new Array();
		$("span.tag").each(function() {
			users.push($(this).text());
		});
		// also include self?
		
		if (users.length == 0) {
			alert("Please enter at least one member to add!");
			return;
		}
		
		// invitees.push(apime["Person"]["email"]);
		// create newgroup object to be stored
		// attributes:
		// 		invitees  - array of email addresses of people to be added to groups

		$.ajax({
				url: "https://shirleys-scheduler.com/api/me/group",
				dataType: "json",
				type: "POST",
				data: users,
				success: function(e){
					console.log("Success!");
				},
				error: function(xhr, e){
					console.log("Error!");
					alert("Error updating values, please try again, or email us: hamlim@outlook.com");
				}
		});
		
		apime["Groups"].push(users);
		console.log(apime);
		$("#notification").text("Added "+users.length+" new users to : "+groups["Groupname"]);
	});
	function checkEmail(test) {
		var testthis = test.slice(-10);
		if (testthis == "@gmail.com") return true;
		else return false;
	}
	
  		// Adding invitees to meeting
  	$("#tags input").on("focusout", function() {    
		var txt= this.value.replace(/[^a-zA-Z0-9\.\@]/g,""); // Allowed characters list
		
		if(txt && checkEmail(txt)) {
				$(this).before("<span class='tag'>"+ txt +"</span>");
		}
  	    this.value="";
  	}).on('keyup',function( e ) {
		if(/(188|13)/.test(e.which)) { 
			$(this).focusout(); 
		} // On comma or enter
  	});

  	// Deleting invitees that were added
  	$("#tags").on("click",".tag",function(){
  	  if( confirm("Delete tag?") ) $(this).remove(); 
  	});
});