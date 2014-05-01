import cherrypy
import json

InvalidToken = {
    "error": {
      "type": "InvalidToken",
      "httpCode": 401,
      "message": "The provided access token was either not found or not valid."
    }
}

InvalidObject = {
    "error": {
      "type": "InvalidObject",
      "httpCode": 400,
      "message": "The provided object ID was either not found or not valid."
    }
}

def throwError(error):
  raise cherrypy.HTTPError(error["error"]["httpCode"], json.dumps(error))
