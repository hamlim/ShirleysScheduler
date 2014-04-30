#!/usr/bin/env python

import cherrypy

import ConfigParser
import sqlalchemy
from sqlalchemy.orm import sessionmaker

from auth import AuthRoot
from api import ApiRoot
from schemas import ClassBase

class Root(object):
  def __init__(self, settings):
    # TODO: Add a way to change the database username and password
    engine = sqlalchemy.create_engine(
        "mysql://root:root@localhost/shirleys_scheduler")
    ClassBase.metadata.create_all(engine)
    sessionFactory = sessionmaker(bind=engine)
    self.auth = AuthRoot(settings, sessionFactory)
    self.api = ApiRoot(settings, sessionFactory)

if __name__ == '__main__':
  configParser = ConfigParser.ConfigParser()
  configParser.read("api.config")
  cherrypy.quickstart(Root(configParser), config="app.config")
