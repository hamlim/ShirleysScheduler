import cherrypy
import json

InvalidToken = {
    "error": {
      "type": "InvalidToken",
      "httpCode": 401,
      "message": "The provided access token was either not found or not valid."
    }
}

def throwError(error):
  raise cherrypy.HTTPError(error["error"]["httpCode"], json.dumps(error))
