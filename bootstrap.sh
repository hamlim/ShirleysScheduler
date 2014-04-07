#!/usr/bin/env bash

PACKAGES='python python-cherrypy python-sqlalchemy python-openssl'
MYSQL_PASSWORD='root'

apt-get update

echo "Installing MySQL"
debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_PASSWORD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_PASSWORD"
apt-get install -y mysql-server

echo "Installing $PACKAGES"
apt-get install -y $PACKAGES
