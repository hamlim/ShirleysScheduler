import cherrypy

import json
import urllib

import errors
import schemas

def getCurrentUser(dbSession):
  requestToken = cherrypy.request.headers['Authorization']
  token = dbSession.query(schemas.AuthToken).get(requestToken)
  if token is None:
    return None
  return dbSession.query(schemas.User).get(token.email)

def handleGetUser(currentUser, dbSession, userId, subObject=None):
  user = dbSession.query(schemas.User).get(userId)
  if user is None:
    errors.throwError(errors.InvalidObject)

  return user.toJson()

class ApiRoot(object):
  exposed = True
  def __init__(self, settings, sessionFactory):
    self.settings = settings
    self.sessionFactory = sessionFactory

  def GET(self, objectId, subObject=None):
    dbSession = self.sessionFactory()
    currentUser = getCurrentUser(dbSession)
    if currentUser is None:
      errors.throwError(errors.InvalidToken)
    if objectId == "me":
      objectId = currentUser.email

    objectId = urllib.unquote(objectId).decode('utf8')
    if schemas.EMAIL_REGEX.match(objectId):
      return handleGetUser(currentUser, dbSession, objectId, subObject)
    else:
      errors.throwError(errors.InvalidObject)
