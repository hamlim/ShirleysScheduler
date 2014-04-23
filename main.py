#!/usr/bin/env python

import cherrypy

from auth import AuthRoot
from api import ApiRoot

class Root(object):
  def __init__(self):
    self.auth = AuthRoot()
    self.api = ApiRoot()

if __name__ == '__main__':
  cherrypy.quickstart(Root(), config="app.config")
