import cherrypy

import errors
import schemas

def getCurrentUser(dbSession):
  requestToken = cherrypy.request.headers['Authorization']
  token = dbSession.query(schemas.AuthToken).get(requestToken)
  if token is None:
    return None
  return dbSession.query(schemas.User).get(token.objectId)

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

    # Request the object
    if objectId == "me":
      dbObject = currentUser
    else:
      # SQLAlchemy automatically gets the object at its deepest type for us.
      dbObject = dbSession.query(schemas.ObjectBase).get(objectId)

    if dbObject is not None:
      return dbObject.toJson()
    else:
      errors.throwError(errors.InvalidObject)
