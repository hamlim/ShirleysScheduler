import cherrypy

class AuthRoot(object):
  @cherrypy.expose
  def index(self):
    return "hello"
