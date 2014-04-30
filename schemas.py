from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

ClassBase = declarative_base()

# Internal access tokens for using our APIs.
class AuthToken(ClassBase):
  __tablename__ = "tokens"

  # The token itself
  token = Column(String(256), primary_key=True, nullable=False)
  # A validation string for validating a token. This is passed to Google to
  # identify a token in place of the token itself.
  validator = Column(String(256))
  # The token provides acccess to the user identified by this Gmail address.
  gmail = Column(String(256))

# A user on our service.
class User(ClassBase):
  __tablename__ = "users"

  # We use Gmail address to uniquely identify users.
  gmail = Column(String(256), primary_key=True, nullable=False)
  # We are literally serializing the Google credentials object to JSON and
  # storing it as a string here. Sorry.
  credentials = Column(String(8192))
  # The user's full name.
  displayName = Column(String(256))
