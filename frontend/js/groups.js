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
	
	if (groups == null || typeof groups == 'undefined') {window.location.replace( 'index.html' );}
	else {
		
		var gid = groups["Groupid"];
		$("#group-name").text(groups["Groupname"]);
		for (var i = 0; i < groups["Users"].length; i++) {
			
		}
		for (var i = 0; i < groups["Events"].length; i++) {
			
		}
		
		
	}
});