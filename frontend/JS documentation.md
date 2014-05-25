# Javascript Assorted Notes and Documentation For When Is Better

[Shirleys-scheduler.com](https://shirleys-scheduler.com)
-----------------

### A few notes before going onto the full documentation:
1. Use of LocalStorage to maintain persistent variables among several different html pages
2. Use of jQuery's AJAX calls to send and receive data to and from the backend server.
3. Use of FullCalendar developed by Adam Shaw. More info located [here](http://arshaw.com/fullcalendar/)
4. `dashboard.html`, `profile.html`, and `calendar.html` all have FullCalendar objects (with tabs)
5. Note if you change the value of something in the apime return JSON, like update the user email address, make the change to both the localStorage object and also a call to the server, this will allow us to keep up to date information on the user's computer (see `settings.js` for an example.)

## Documentation
#### Written by Matt Hamlin

> Documentation is laid out by the process that it is relevant to, so it will follow some example actions

### Put this on the top of JS
```Javascript
var obj = localStorage.getItem('apime');
if (obj == null || typeof obj == 'undefined'){
window.location.replace( 'index.html' );
} else { // the rest of your code }
```

### Login Process (`Index.html` is the page)

* User clicks Login button
* `click` event fires in JS `#google-login`
* `$.ajax` call is made to `/auth/login` to get the token
* token is stored in localstorage
* page is redirected to Google's servers to login
* Google gives an A-OK and redirects us back to the profile page
* on page load `$.ajax` GET call made to `/api/me` with token taken from local storage
* the call from above then returns all the info we need to know about the user 
* The content received from the `/api/me` is then stored in LocalStorage to make the process simpler for future calls
* Redirect to `dashboard.html` and populate with data from `/api/me`



### Add an Event (`add-meeting.html`)

#### Notes:


#### Fields:

* Fields we accept into JS as variables:
    * `#meeting-name`
    * `#meeting-location`
    * `#meeting-url`
    * `#meeting-date`
    * `#meeting-invitee`
    * `#meeting-repeat`

### Calendar (`calendar.html`)

#### Notes: 

* View will be monthly view
* onclick to go to event modal
* Modal information is found [here](http://getbootstrap.com/javascript/#modals)
* Information on formatting **EVENTS** [info here](http://arshaw.com/fullcalendar/docs/event_data/events_function/)

#### In depth Notes:
* Docs on event clicks is [here](http://arshaw.com/fullcalendar/docs/mouse/eventClick/)
* Docs on event feed is [here](http://arshaw.com/fullcalendar/docs/event_data/events_array/)

#### Fields:
* Fields we need to fill in:
    * `#meeting-name`
    * `#meeting-location`
    * `#meeting-url`
    * `#meeting-date`
    * `#meeting-time`

### Dashboard (`dashboard.html`) {brief for user}

#### Notes:
* `#accept-btn` button is when a user accepts an invite, remove the invite and add to events in calendar, AJAX stuff?

* Dashboard `#user-calendar` is a FullCalendar object
    * View is a week

* `#user-today/tomorrow/yesterday` is text based, simple summaries of the events including:
    * Meeting name
    * Group name
    * Time
    * Location


#### Fields:

* Fields we need to fill in:
    * `#user-calendar` 
    * `#user-today` Displays meetings for the day
    * `#user-tomorrow` Displays tomorrows events
    * `#user-yesterday` Displays yesterdays events
    * `#user-meeting-invite` Meeting invites


### Profile pages (`profile.html`)

#### Notes:
* [Color of events](http://arshaw.com/fullcalendar/docs/event_data/Event_Source_Object/#options)
* Multiple event sources: [eventSources](http://arshaw.com/fullcalendar/docs/event_data/events_json_feed/)

#### Fields:

### Settings Page (`settings.html`)

#### Notes:
* add extra emails
* change display name (nickname)
* add a phone #

#### Fields:
* Fields we need to collect input from:
    * Alias email: `#alias-email`
        * Button: `#email-btn`
    * Change name: `#nickname`
        * Button: `#name-btn`
    * Add Phone #: `#phone-number`
        * Button: `#phone-btn`

### Meeting Page (`meeting.html`)

#### Notes:

* Research:
    * Evernote API
        * Allow users to make a new note on the website, edit it there if possible, and then share with the rest of the group
    * Drive API
        * Allow users to make a folder of content for the meeting in a group directory, then allow users to upload documents to that folder.
    * Trello API
        * Grab the group's organization and allow the user to add todo's to a generic meeting board in the organization to TODO list


* What we want to display:
    * Meeting information:
        * Meeting name
        * Who is going to the meeting
        * Who isn't going to the meeting
        * where the meeting is
        * When the meeting occurs
        * Group name
    * Meeting Notes section:
        * Documents associated with the meeting (Drive)
        * Meeting notes ( "evernote plugin")
        * ToDo lists associated with the meeting (Trello)

#### Fields:

* What fields we need to populate:
    * title w/ meeting name: `title`
    * meeting name: `#meeting-name`
    * meeting time: `#meeting-time`
    * people going: `#p-going`
    * people not going: `#not-p-going`
    * meeting location: `#meeting-location`
    * group name: `#group-name`
    * documents: `#document-list`
    * To Do lists: `#todo-list`
    * Notes: `#meeting-notes`

## Foreign API's:

### Evernote:

* [Evernote Dev](http://dev.evernote.com/)

### Drive:

* [Google Drive Dev](https://developers.google.com/drive/)


### Trello:

* [Trell Dev](https://trello.com/docs/)

## Ideal WhenIsBetter API return results:

#### Notes:
* Need to parse the date format from unix timestamps [simply multiply by 1000]

```Javascript
//This file will have an example API/me return JS Object "JSON"
var apime = {
    "Today": [
        {
            "meetingname" : "Meeting with Adrian",
            "groupname" : "Friends",
            "location" : "Times Square",
            "timebegin" : 1398967200,
            "timeend" : 1398970800,
			"url" : ""
        }
    ],
    "Tomorrow": [
        {
            "meetingname": "Team Meeting",
            "groupname": "Schedulr Team",
            "location": "McNeil Room, Union",
            "timebegin": 1399042800,
            "timeend": 1399050000,
	    "url": ""
        },
        {    
            "meetingname": "Chat with V. Kudinov",
            "groupname": "ACME inc",
            "location": "Skype conference",
            "timebegin": 1398934800,
            "timeend": 1398938400,
			"url": ""
        }
    ],
    "Yesterday": [
        {
            "meetingname": "Team Meeting",
            "groupname": "SS inc",
            "location": "3rd floor, Union",
            "timebegin": 1398870000,
            "timeend": 1398877200,
	    "url": ""
        }
    ],
    "Invites": [
        {
            "eventid": 12345678,
            "meetingname": "Team Meeting",
            "owner": "Matt Hamlin"
        },
        {
            "eventid": 12345679,
            "meetingname": "Meet and Greet",
            "owner": "Steve"
        }
    ],
    "Groups": [
        { 
            "groupname": "SS inc",
            "groupid": 12345
        },
        {
	    "groupname": "Friends",
	    "groupid": 12346
	},
	{
	    "groupname": "ACME inc",
	    "groupid": 12347
	}
    ],
    "Calendar": [ 
        {
            "meetingname": "Team Meeting",
            "groupname": "SS inc",
            "location": "3rd floor, Union",
            "timebegin": 1399485600,
            "timeend": 1399489200,
            "url": ""
        },
        {
            "meetingname": "Meeting with Adrian",
            "groupname": "Friends",
            "location": "Times Square",
            "timebegin": 1398967200,
            "timeend": 1398970800,
            "url": ""
        },
        {
            "meetingname": "Team Meeting",
            "groupname": "Schedulr Team",
            "location": "McNeil Room, Union",
            "timebegin": 1399042800,
            "timeend": 1399050000,
            "url": ""
        },
    	{
    	    "meetingname": "Chat with V. Kudinov",
    	    "groupname": "SS inc",
    	    "location": "Skype conference",
    	    "timebegin": 1398934800,
    	    "timeend": 1398938400,
    	    "url": ""
    	},
        {
            "meetingname": "Meeting with Professor Hughes",
            "groupname": "ACME inc",
            "location": "Skype conference",
            "timebegin": 1399474800,
            "timeend": 1399482000,
            "url": ""
        },
        {
            "meetingname": "Study group meeting",
            "groupname": "ACME inc",
            "location": "Skype conference",
            "timebegin": 1398934800,
            "timeend": 1398938400,
            "url": ""
        },
        {
            "meetingname": "Last capstone meeting",
            "groupname": "ACME inc",
            "location": "Skype conference",
            "timebegin": 1399485600,
            "timeend": 1398938400,
            "url": ""
        },
        {
            "meetingname": "MITR meeting",
            "groupname": "Friends",
            "location": "Skype conference",
            "timebegin": 1398934800,
            "timeend": 1399496400,
            "url": ""
        },
        {
            "meetingname": "Google hangout meeting",
            "groupname": "ACME inc",
            "location": "Skype conference",
            "timebegin": 1399280400,
            "timeend": 1399287600,
            "url": ""
        },
        {
            "meetingname": "Team meeting",
            "groupname": "SS inc",
            "location": "Skype conference",
            "timebegin": 1399302000,
            "timeend": 1399305600,
            "url": ""
        },
        {
            "meetingname": "Meeting with Professor Plotka",
            "groupname": "ACME inc",
            "location": "Skype conference",
            "timebegin": 1399359600,
            "timeend": 1399374000,
            "url": ""
        },
        {
            "meetingname": "Short MITR meeting",
            "groupname": "Friends",
            "location": "Skype conference",
            "timebegin": 1399399200,
            "timeend": 1399402800,
            "url": ""
        },
        {
            "meetingname": "Comp Org study group",
            "groupname": "Friends",
            "location": "Skype conference",
            "timebegin": 1399622400,
            "timeend": 1399626000,
            "url": ""
        }
    ],
    "Person": {
        "name": "Matt Hamlin",
        "email": "hamlinmatt212@gmail.com",
        "profileimg": "https://lh5.googleusercontent.com/-vxyqgji3NqU/UuBNQ5TZGHI/AAAAAAAAMew/8uVx5bZVA5s/s231-no/7ef72ecb-fb60-41ed-83ea-767a3534579a.jpg",
        "description": "Entrepreneur and Student of Life.",
        "googlelink": "https://plus.google.com/+MattHamlinisawesome"
    }
}
```

```Javascript
var groups = {
    "Groupname": "Friends",
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
            "url"": ""
        }
    ]
};
```