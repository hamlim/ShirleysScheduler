import cherrypy

import json

import errors
import schemas

class ApiRoot(object):
  exposed = True
  def __init__(self, settings, sessionFactory):
    self.settings = settings
    self.sessionFactory = sessionFactory

  def getCurrentUser(self, dbSession):
    requestToken = cherrypy.request.headers['Authorization']
    token = dbSession.query(schemas.AuthToken).get(requestToken)
    if token is None:
      return None
    return dbSession.query(schemas.User).get(token.gmail)

  def GET(self, objectId, subObject=None):
    dbSession = self.sessionFactory()
    currentUser = self.getCurrentUser(dbSession)
    if currentUser is None:
      errors.throwError(errors.InvalidToken)

    # TODO: Do something more useful than just returning the user's name
    return currentUser.displayName
