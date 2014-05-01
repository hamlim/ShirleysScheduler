# Javascript Assorted Notes and Documentation For
ShirleysScheduler

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
```var obj = localStorage.getItem('apime');
	if (obj == null || typeof obj == 'undefined') {window.location.replace( 'index.html' );}
	else { // the rest of your code }
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

## API return results ideally:

#### Notes:
* Need to parse the date format from unix timestamps [simply multiply by 1000]

```Javascript
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
            "timebegin": 1398870000,
            "timeend": 1398877200,
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
	    "groupname": "ACME inc",
	    "location": "Skype conference",
	    "timebegin": 1398934800,
	    "timeend": 1398938400,
	    "url": ""
	}
    ],
    "Person": {
        "name": "Jaime Lannister",
        "email": "jlannister@gmail.com",
        "profileimg": "http://i.imgur.com/sx67gNb.jpg",
        "description": "Knight from the house of Lannister, moved to Albany for an amazing job.",
        "googlelink": ""
    }
}
```
