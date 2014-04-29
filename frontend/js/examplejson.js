//This file will have an example API/me return JS Object "JSON"
var apime = {
    "Today": {
        "event1": {
            "meetingname" : "Meeting with Adrian",
            "groupname" : "Friends",
            "location" : "Times Square",
            "timebegin" : 1398967200,
            "timeend" : 1398970800,
			"url" : ""
        }
    },
    "Tomorrow": {
        "event1": {
            "meetingname": "Team Meeting",
            "groupname": "Schedulr Team",
            "location": "McNeil Room, Union",
            "timebegin": 1399042800,
            "timeend": 1399050000,
			"url": ""
        },
        "event2": {    
            "meetingname": "Chat with V. Kudinov",
            "groupname": "ACME inc",
            "location": "Skype conference",
            "timebegin": 1398934800,
            "timeend": 1398938400,
			"url": ""
        }
    },
    "Yesterday": {
        "event1": {
            "meetingname": "Team Meeting",
            "groupname": "SS inc",
            "location": "3rd floor, Union",
            "timebegin": 1398870000,
            "timeend": 1398877200,
			"url": ""
        }
    },
    "Invites": {
        "invite1": {
            "eventid": 12345678,
            "meetingname": "Team Meeting",
            "owner": "Matt Hamlin"
        },
        "invite2": {
            "eventid": 12345679,
            "meetingname": "Meet and Greet",
            "owner": "Steve"
        }
    },
    "Groups": {
        "group1": { 
            "groupname": "SS inc",
            "groupid": 12345
        },
				"group2": {
						"groupname": "Friends",
					"groupid": 12346
				},
				"group3": {
						"groupname": "ACME inc",
					"groupid": 12347
				}
    },
    "Calendar": { 
        "event1": {
            "meetingname": "Team Meeting",
            "groupname": "SS inc",
            "location": "3rd floor, Union",
            "timebegin": 1398870000,
            "timeend": 1398877200,
            "url": ""
        },
        "event2": {
            "meetingname": "Meeting with Adrian",
            "groupname": "Friends",
            "location": "Times Square",
            "timebegin": 1398967200,
            "timeend": 1398970800,
            "url": ""
        },
        "event3": {
            "meetingname": "Team Meeting",
            "groupname": "Schedulr Team",
            "location": "McNeil Room, Union",
            "timebegin": 1399042800,
            "timeend": 1399050000,
            "url": ""
        },
				"event4": {
					"meetingname": "Chat with V. Kudinov",
					"groupname": "ACME inc",
					"location": "Skype conference",
					"timebegin": 1398934800,
					"timeend": 1398938400,
					"url": ""
				}
    },
    "Person": {
        "name": "Jaime Lannister",
        "email": "jlannister@aol.com",
        "aliasemail": "kingslayer434@outlook.com",
        "username": "k1ng5layr",
		"phonenumber": "518-555-0160",
        "datejoined": 1398517200,
        "profileimg": "http://i.imgur.com/sx67gNb.jpg",
        "description": "Knight from the house of Lannister, moved to Albany for an amazing job.",
        "googlelink": ""
    }
}