# Frontend Readme file
### Initial creation 15/4/14

------------

File structure to come soon!

# UI Component IDs by template
Below is a list of fields that will be populated with variables from variables.

#### index.html
```html
    #google-login
```
Button to login to the service
-----------------------------------------------------------

#### add-meeting.html
```html
    #meeting-name
```
Display the name of the meeting
```html
    #meeting-location
```
Display location of the meeting (could include Google Maps Integration)

```html
    #meeting-url
```
Display url for Google Hangouts, Join.me, etc. if this is an online seminar/meeting

```html
    #meeting-date
```
Display meeting date 

```html
    #meeting-invitee
```
Display invitees in a list 

```html
    #meeting-repeat
```
Users are given an option to repeat an event. This will come up as a modal window or tooltip. [Reference iCalendar] (https://drupal.org/files/issues/iCal-Third-Wednesday.jpg)

#### calendar.html

```html
    #meeting-name
```
Display the name of the meeting
```html
    #meeting-location
```
Display location of the meeting (could include Google Maps Integration)

```html
    #meeting-url
```
Display url for Google Hangouts, Join.me, etc. if this is an online seminar/meeting

```html
    #meeting-date
```
Display meeting date 

```html
    #meeting-time
```
Display time of day for meeting



#### dashboard.html

-----------------------------------------------------------
```html
    #user-calendar
```
Display user calendar

```html
    #user-today
```
Display meetings of current day 

```html
    #user-tomorrow
```
Display meetings of the next day

```html
    #user-yesterday
```
Display meetings from yesterday 

```html
    #user-meeting-invite
```
Display meeting invites


-----------------------------------------------------------
#### group.html

```html
    #group-user
```
Display user's groups



```html
    #group-date-created
```
Display group creation date


```html
    #group-image
```
Display group image

```html
    #group-description
```
Display group

```html
    #group-meeting-url
```
Display link to online

```html
    #group-memebers
```
Show list of members in group

-----------------------------------------------------------

#### profile.html


```html
    #user-full-name
```
Display User's full name [first, last name]

```html
    #user-username
```
Display username


```html
    #user-email-address
```
Display email address


```html
    #user-date-joioned
```
Display date user joined


```html
    #user-profile-image
```
Display profile image

```html
    #user-profile-description
```
Display user's description (user would include details like thier occupation, class year, etc. )

```html
    #user-google-profile
```
Display link to Google+ profile

```html
    #user-group
```
Show list of groups user has joined

```html
    #user-calendar
```
Display calendar of meetins



------------

[FullCalendar Documentation](www.arshaw.com/fullcalendar/docs)

[Notes and documentation](https://draftin.com/documents/307677?token=4xObTg_TTgzRgbIf7yajnOkKOepn_l-j9qgo9CRyAjTseM-UHtbfQZPzmzf03pmKQi5enl_OmnslfXYS-0iTDBE)

Naming Conventions:

* JS files that are central to the html page will follow the naming convention: `[htmlfilename].js`.
