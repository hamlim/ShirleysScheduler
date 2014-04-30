import cherrypy

import base64
import json
import os

from oauth2client.client import OAuth2WebServerFlow

import schemas
import errors

class AuthRoot(object):
  def __init__(self, settings, sessionFactory):
    self.sessionFactory = sessionFactory
    # TODO: We can't load this from app.config because CherryPy doesn't load it
    # until *after* this class is initialized. Perhaps use a different config
    # file for this stuff.
    self.googleFlow = OAuth2WebServerFlow(
        client_id=settings.get('google', 'client_id'),
        client_secret=settings.get('google', 'client_secret'),
        scope=settings.get('google', 'scopes'),
        redirect_uri=settings.get('google', 'redirect_uri')
    )

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
    raise cherrypy.HTTPRedirect(self.googleFlow.step1_get_authorize_url())

  @cherrypy.expose
  def login_callback(state, code, scope):
    # state is the validation code generated from /auth/login
    # code is the Google authorization code
    # scope contains the permissions associated with this code
    # TODO: Request the Google access and refresh tokens
    # TODO: Create user if necessary
    # TODO: Add Gmail adddress to stored token
    pass
