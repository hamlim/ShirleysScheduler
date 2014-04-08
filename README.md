Shirley's Scheduler
=====================

A group scheduler that doesn't suck.

Originally developed as a term project for Web Science at RPI.

-------

### File Structure

#### `api`

The implementation of the backend API. See [here](http://goo.gl/xfPWdL) for API
documentation.

The API is implemented in CherryPy, which is also the static file server.

##### `api/certs`

SSL/TLS certificates (not checked into the repository). We expect the following
layout:

* TLS certificate: `ssl.crt`
* Private key: `private.key`
* Certificate chain: `ca.pem`

#### A small todo list for features to add:


* Notifications (?)
* fix bugs with too many Doge in system files 
