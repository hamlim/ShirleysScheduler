Internal (we can probably expose this if we want to) RESTful API

Unit tests? With a new testing account (with Google)?

TODO: Use something like Doxygen to automatically generate documentation

# Authentication

All API calls not directly involved with authentication require an access token. We use the Google OAuth process and then provide our own access token.

Design based on [this article](http://broadcast.oreilly.com/2009/12/principles-for-standardized-rest-authentication.html).

## API calls

### GET /auth/login

The first step to log in or create new users. Returns a new, invalid access token.

#### Basic example

##### Request

    GET /auth/login

##### Response

    {"token": "RANDOMLY_GENERATED_INVALID_TOKEN"}

### GET /auth/login_validate

The second step to log in or create new users. Expects the access token (which must still be invalid) from `/auth/login`.

Intended for use directly from the client browser (not AJAX) - this will redirect the client to Google for authentication (see [Google’s documentation](https://developers.google.com/accounts/docs/OAuth2WebServer)). A separate activation token is also sent to Google as part of the callback URL.

#### Basic example

###### Request

    GET /auth/login_validate?token=INVALID_TOKEN_FROM_AUTH_LOGIN

##### Response

The client is redirected to Google for authentication.

### GET /auth/login_callback [private]

The third step to log in or create new users. Called automatically on `/auth/login_validate` success.

After Google authenticates a user, Google redirects the client to this callback with a Google authorization token and our activation token. This validates our access token from `/auth/login` and associates it with that user’s Google account. See [Google’s documentation](https://developers.google.com/accounts/docs/OAuth2WebServer#handlingtheresponse) for other details.

If no user associated with the Google account exists, a new one is created with default settings populated from the user’s Google+ profile.

### POST /auth/logout

Deactivates the provided internal access token.

## Authenticating all other API calls

All other API calls expect a token created and validated using the above process using the `Authorization` header in the HTTPS request:

    GET /api/SOME_ENDPOINT
    Authorization: VALIDATED_TOKEN

# Profiles

## Fields
TODO

## API calls

### GET /api/{user-id or group-id}

Gets all information for that id for the specified time period (if relevant). If no time period is specified, use the current (day/week/month/?).

An id of “me” always refers to the currently authenticated user.

### DELETE /api/{user-id or group-id}

Deletes a user or group (and its events).

After this is called, the user or group’s data cannot be automatically restored.

#### Access

Users can only DELETE themselves (DELETE /api/me). 

Deleting a user also deletes the associated Google refresh and access tokens.

TODO: who can delete a group?

# Groups

## Fields

TODO

## API calls

### POST /api/me/group

Create a new group. The authenticated user is automatically added to the group.

### GET /api/{user-id}/groups

List a user’s groups.

### GET /api/{group-id}/members

List a group’s members.

# Events/Calendar

## Fields

TODO

## API calls

### GET /api/{user-id or group-id}/events

### GET /api/{event-id}

### POST /api/{group-id}/event

Create a new event within a group.

### DELETE /api/{event-id}

# Availability

## Fields

TODO

## API calls

GET /api/{user-id or group-id}/availability

# Settings

## Fields

TODO

## API calls

### GET /api/{user-id or group-id}/settings

Gets the specified settings from that id. If no settings are specified, return all settings.

### POST /api/{user-id or group-id}/settings

Write one or more settings at once.
