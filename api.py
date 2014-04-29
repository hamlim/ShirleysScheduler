import cherrypy

class ApiRoot(object):
  def __init__(self, sessionFactory):
    self.sessionFactory = sessionFactory

  @cherrypy.expose
  def index(self):
    return "hello"
