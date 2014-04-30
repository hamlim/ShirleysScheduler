from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

ClassBase = declarative_base()

class AuthToken(ClassBase):
  __tablename__ = "tokens"

  token = Column(String(256), primary_key=True, nullable=False)
  validator = Column(String(256))
  gmail = Column(String(256))

class User(ClassBase):
  __tablename__ = "users"

  gmail = Column(String(256), primary_key=True, nullable=False)
  credentials = Column(String(8192))
  displayName = Column(String(256))
