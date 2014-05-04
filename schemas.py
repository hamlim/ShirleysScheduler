import json

from sqlalchemy import Column, Integer, String, ForeignKey
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
  # The token provides acccess to the user identified by this object ID.
  objectId = Column(Integer)

class ObjectBase(ClassBase):
  __tablename__ = "objects"

  objectId = Column(Integer, primary_key=True, nullable=False,
      autoincrement=True)
  type = Column('type', String(64))

  def asDict(self):
    return {'objectId': self.objectId}

  def toJson(self):
    return json.dumps(self.asDict())

  __mapper_args__ = {'polymorphic_on': type}

# A user on our service.
class User(ObjectBase):
  __tablename__ = "users"

  objectId = Column(Integer, ForeignKey('objects.objectId'), primary_key=True,
      nullable=False)
  # The user's email, as Google reports it.
  email = Column(String(256), nullable=False)
  # We are literally serializing the Google credentials object to JSON and
  # storing it as a string here. Sorry.
  credentials = Column(String(8192))
  name = Column(String(256))
  profileimg = Column(String(256))
  description = Column(String(1024))
  googlelink = Column(String(256))

  def asDict(self):
    dictionary = super(User, self).asDict()
    dictionary.update({
      'email': self.email,
      'name': self.name,
      'profileimg': self.profileimg,
      'description': self.description,
      'googlelink': self.googlelink})
    return dictionary

  __mapper_args__ = {
      'polymorphic_identity': 'user',
      'inherit_condition': (objectId == ObjectBase.objectId)}
