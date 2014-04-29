# Javascript Assorted Notes and Documentation For
ShirleysScheduler

[Shirleys-scheduler.com](https://shirleys-scheduler.com)
-----------------

### A few notes before going onto the full documentation:
1. Use of LocalStorage to maintain persistent variables among several different html pages
2. Use of jQuery's AJAX calls to send and receive data to and from the backend server.
3. Use of FullCalendar developed by Adam Shaw. More info located [here](http://arshaw.com/fullcalendar/)

## Documentation
#### Written by Matt Hamlin

> Documentation is laid out by the process that it is relevant to, so it will follow some example actions

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

In depth Notes:
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

#### Fields:

### Settings Page (`settings.html`)



## API return results ideally:

#### Notes:
* Need to parse the date format from unix timestamps

```
api me = {
    Today : {
        {
            meetingname : "blah",
            groupname : "blah",
            location : "location here",
            timebegin : int,
            timeend : int
        },
        {    
            meetingname : "blahblah",
            groupname : "blahblah inc",
            location : "here",
            timebegin : int,
            timeend : int
        }
    },
    Tomorrow : {
        {
            meetingname : "blah",
            groupname : "blah",
            location : "location here",
            timebegin : int,
            timeend : int
        },
        {    
            meetingname : "blahblah",
            groupname : "blahblah inc",
            location : "here",
            timebegin : int,
            timeend : int
        }
    },
    Yesterday : {
        {
            meetingname : "blah",
            groupname : "blah",
            location : "location here",
            timebegin : int,
            timeend : int
        },
        {    
            meetingname : "blahblah",
            groupname : "blahblah inc",
            location : "here",
            timebegin : int,
            timeend : int
        }
    },
    Invites : {
        {
            eventid : "eventid",
            meetingname : "name",
            owner : "Name of event creator"
        },
        {
            eventid : "eventid",
            meetingname : "name",
            owner : "Name of event creator"
        }
    },
    Groups : {
        { 
            groupname : "blah",
            groupid : "blah",
            [MORE LATER]
        },
    },
    Calendar : { // Notes: calendar includes all events for the user
        {
            meetingname : "blah",
            groupname : "blah",
            location : "blah",
            timebegin : int,
            timeend : int,
            url : "url"
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
```
