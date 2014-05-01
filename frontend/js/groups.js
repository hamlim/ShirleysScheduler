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
			$("#list-users").append('<h3 class="list-group-item">'+groups["Users"][i].name+'</h3>');
			$("#list-users").append('<h5 class="list-group-item">'+groups["Users"][i].email+'</h5>');
		}
		for (var i = 0; i < groups["Events"].length; i++) {
			$("#group-events").append("<div><h3 class='list-group-item'>"+groups["Events"][i].meetingname+"</h3><blockquote><em>Location:</em> " +groups["Events"][i].location+"<br/>" + 
			"<em>Start: </em>"+new Date(groups["Events"][i].timebegin)+"<br/><em>End: </em>"+new Date(groups["Events"][i].timeend) +"</blockquote></div>"
			);

		}
		
		
	}
});