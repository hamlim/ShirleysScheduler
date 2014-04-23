import cherrypy

class ApiRoot(object):
  @cherrypy.expose
  def index(self):
    return "hello"
