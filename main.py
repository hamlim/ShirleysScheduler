#!/usr/bin/env python

import cherrypy

if __name__ == '__main__':
  cherrypy.quickstart(config="app.config")
