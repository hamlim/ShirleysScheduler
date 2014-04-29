//This file will have an example API/me return JS Object "JSON"
var apime = {
    Today: {
        {
            meetingname : "Meeting with Adrian",
            groupname : "Friends",
            location : "Times Square",
            timebegin : 1398967200,
            timeend : 1398970800,
						url : ""
        }
    },
    Tomorrow: {
        {
            meetingname : "Team Meeting",
            groupname : "Schedulr Team",
            location : "McNeil Room, Union",
            timebegin : 1399042800,
            timeend : 1399050000,
						url : ""
        },
        {    
            meetingname : "Chat with V. Kudinov",
            groupname : "ACME inc",
            location : "Skype conference",
            timebegin : 1398934800,
            timeend : 1398938400,
						url : ""
        }
    },
    Yesterday: {
        {
            meetingname : "Team Meeting",
            groupname : "SS inc",
            location : "3rd floor, Union",
            timebegin : 1398870000,
            timeend : 1398877200,
						url = ""
        }
    },
    Invites: {
        {
            eventid : 1234,
            meetingname : "Team Meeting",
            owner : "Matt Hamlin"
        },
        {
            eventid : "eventid",
            meetingname : "name",
            owner : "Name of event creator"
        }
    },
    Groups: {
        { 
            groupname : "blah",
            groupid : "blah",
            [MORE LATER]
        },
    },
    Calendar: { 
        {
            meetingname : "Team Meeting",
            groupname : "SS inc",
            location : "3rd floor, Union",
            timebegin : 1398870000,
            timeend : 1398877200,
            url : ""
        },
        {
            meetingname : "blah",
            groupname : "blah",
            location : "blah",
            timebegin : int,
            timeend : int,
            url : "url here"
        },
        {
            meetingname : "blah",
            groupname : "blah",
            location : "blah",
            timebegin : int,
            timeend : int,
            url : "url here"
        },
    }
    Person : {
        name : "Joe smith",
        email : "gmail",
        aliasemail : "outlook",
        username : "usernamehere",
				phonenumber : "Phone number here!",
        groups : {
            {
                groupname : "name",
                groupid : "id"
            },
            {
                groupname : "name",
                groupid : "id"
            },
        },
        datejoined : int,
        profileimg : "link to profile image",
        description : "description text",
        googlelink : "link to google+ profile"
    }
}