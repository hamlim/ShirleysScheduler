import cherrypy

import base64
import json
import os

from schemas import AuthToken

class AuthRoot(object):
  def __init__(self, sessionFactory):
    self.sessionFactory = sessionFactory

  @cherrypy.expose
  def login(self):
    newToken = base64.urlsafe_b64encode(os.urandom(30))
    newValidator = base64.urlsafe_b64encode(os.urandom(30))
    newAuthToken = AuthToken(token=newToken, validator=newValidator)
    session = self.sessionFactory()
    session.add(newAuthToken)
    session.commit()
    return json.dumps({"token": newToken})
