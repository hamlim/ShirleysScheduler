import cherrypy

import base64
import json
import os

from apiclient.discovery import build
import httplib2
from oauth2client.client import OAuth2WebServerFlow

import schemas
import errors

class AuthRoot(object):
  def __init__(self, settings, sessionFactory):
    self.settings = settings
    self.sessionFactory = sessionFactory
    self.googleFlow = OAuth2WebServerFlow(
        client_id=self.settings.get('google', 'client_id'),
        client_secret=self.settings.get('google', 'client_secret'),
        scope=self.settings.get('google', 'scopes'),
        redirect_uri=self.settings.get('google', 'redirect_uri'))

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
    validateFlow = OAuth2WebServerFlow(
        client_id=self.settings.get('google', 'client_id'),
        client_secret=self.settings.get('google', 'client_secret'),
        scope=self.settings.get('google', 'scopes'),
        redirect_uri=self.settings.get('google', 'redirect_uri'),
        state=tokenPair.validator)
    raise cherrypy.HTTPRedirect(validateFlow.step1_get_authorize_url())

  @cherrypy.expose
  def login_callback(self, state, code):
    # state is the validation code generated from /auth/login
    # code is the Google authorization code
    # scope contains the permissions associated with this code
    session = self.sessionFactory()

    # Check if the validation key exists
    tokenPair = session.query(schemas.AuthToken).filter(
        schemas.AuthToken.validator == state).first()
    if tokenPair is None:
      errors.throwError(error.InvalidToken)

    # Request the Google access and refresh tokens
    credentials = self.googleFlow.step2_exchange(code)

    # Get some information about the authenticated user
    authHttp = credentials.authorize(httplib2.Http())
    googlePlus = build('plus', 'v1', http=authHttp)
    googleUser = googlePlus.people().get(userId='me',
        fields='displayName,name,emails,image,url').execute()
    # A Google account *must* have a unique account email associated with it.
    email = filter(
        lambda x: x['type'] == 'account', googleUser['emails'])[0]['value']

    user = session.query(schemas.User).filter(
        schemas.User.email == email).first()
    if user is None:
      newUser = schemas.User(
          email=email, name=googleUser['displayName'],
          credentials=credentials.to_json(), googlelink=googleUser['url'],
          profileimg=googleUser['image']['url'])
      session.add(newUser)
      session.commit() # Commit so that the user is assigned a numeric ID.
      user = session.query(schemas.User).filter(
          schemas.User.email == email).first()

    # Add user ID to stored token
    tokenPair.objectId = user.objectId
    session.commit()

    # Success. Redirect the user to the dashboard.
    raise cherrypy.HTTPRedirect("/dashboard.html")
