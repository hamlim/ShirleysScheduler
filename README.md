Shirley's Scheduler
=====================

A group scheduler that doesn't suck.

Originally developed as a term project for Web Science at RPI.

-------

### File Structure

#### `[root]`

The implementation of the backend API. See [here](http://goo.gl/xfPWdL) for API
documentation.

The API is implemented in CherryPy, which is also the static file server.

##### `certs`

SSL/TLS certificates (not checked into the repository). We expect the following
layout:

* TLS certificate: `ssl.crt`
* Private key: `private.key`
* Certificate chain: `ca.pem`


#### `frontend`

Main file tree for the static web page server

##### `frontend/html`

Files containing basic html structures for the web application.

##### `frontend/js`

Javascript files that will make API calls and also handle frontend animations/tricks.

##### `frontend/css`

CSS files to handle layout of the pages.

##### `frontend/imports`

Files that we are using as imports, such as bootstrap files and other open source code



#### A small todo list for features to add:


* Notifications (?)
* fix bugs with too many Doge in system files 
