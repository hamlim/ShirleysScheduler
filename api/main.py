#!/usr/bin/env python

import cherrypy

class RootServer(object):
  @cherrypy.expose
  def index(self, **keywords):
    return "it works!"

if __name__ == '__main__':
  cherrypy.quickstart(RootServer(), config="app.config")
