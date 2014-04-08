#!/usr/bin/env python

import cherrypy

class RootServer(object):
  @cherrypy.expose
  def index(self, **keywords):
    return "it works!"

if __name__ == '__main__':
  serverConfig = {
    'server.socket_host': '0.0.0.0',
    'server.socket_port': 443,

    'server.ssl_module': 'pyopenssl',
    'server.ssl_certificate': 'certs/ssl.crt',
    'server.ssl_private_key': 'certs/private.key',
    'server.ssl_certificate_chain': 'certs/ca.pem'
  }

  cherrypy.config.update(serverConfig)
  cherrypy.quickstart(RootServer())
