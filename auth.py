import cherrypy

import base64
import json
import os
import urllib

import schemas
import errors

class AuthRoot(object):
  def __init__(self, sessionFactory):
    self.sessionFactory = sessionFactory

  @cherrypy.expose
  def login(self):
    session = self.sessionFactory()
    newToken = base64.urlsafe_b64encode(os.urandom(30))
    newValidator = base64.urlsafe_b64encode(os.urandom(30))
    newAuthToken = schemas.AuthToken(token=newToken, validator=newValidator)
    session.add(newAuthToken)
    session.commit()
    return json.dumps({"token": newToken})

  @cherrypy.expose
  def login_validate(self, token):
    session = self.sessionFactory()
    tokenPair = session.query(schemas.AuthToken).get(token)
    if tokenPair is None:
      errors.throwError(errors.InvalidToken)

    # We received a valid token originally from /auth/login. Continue with the
    # Google authentication process.
    googleURL = "https://accounts.google.com/o/oauth2/auth?" + urllib.urlencode({
      "response_type": "code",
      "client_id": cherrypy.request.app.config['google']['client_id'],
      "redirect_uri": "https://shirleys-scheduler.com/auth/login_callback",
      "scope": "profile email",
      "state": tokenPair.validator,
      "access_type": "offline",
      "include_granted_scopes": "true"
    })
    # Redirect the client to Google for authentication
    raise cherrypy.HTTPRedirect(googleURL)

  @cherrypy.expose
  def login_callback(state, code):
    # state is the validation code generated from /auth/login
    # code is the Google authorization code
    # TODO: Request a Google refresh token
    # TODO: Create user if necessary
    # TODO: Add Gmail adddress to stored token
    pass
