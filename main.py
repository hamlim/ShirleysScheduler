#!/usr/bin/env python

import cherrypy

import sqlalchemy
from sqlalchemy.orm import sessionmaker

from auth import AuthRoot
from api import ApiRoot
from schemas import ClassBase

class Root(object):
  def __init__(self):
    # TODO: Add a way to change the database username and password
    engine = sqlalchemy.create_engine(
        "mysql://root:root@localhost/shirleys_scheduler")
    ClassBase.metadata.create_all(engine)
    sessionFactory = sessionmaker(bind=engine)
    self.auth = AuthRoot(sessionFactory)
    self.api = ApiRoot(sessionFactory)

if __name__ == '__main__':
  cherrypy.quickstart(Root(), config="app.config")
