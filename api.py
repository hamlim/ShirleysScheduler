import cherrypy

class ApiRoot(object):
  def __init__(self, settings, sessionFactory):
    self.sessionFactory = sessionFactory

  @cherrypy.expose
  def index(self):
    return "hello"
