#!/usr/bin/env bash

PACKAGES='python python-pip python-sqlalchemy python-mysqldb python-openssl'
PYTHON_PACKAGES='cherrypy google-api-python-client'
# TODO: Add a simple way to change the database password
MYSQL_PASSWORD='root'
MYSQL_DATABASE='shirleys_scheduler'

apt-get update

echo "Installing MySQL"
debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_PASSWORD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_PASSWORD"
apt-get install -y mysql-server
mysql -u root -p $MYSQL_PASSWORD -e "CREATE DATABASE IF NOT EXISTS '$MYSQL_DATABASE'"

echo "Installing $PACKAGES"
apt-get install -y $PACKAGES

echo "Installing Python modules $PYTHON_PACKAGES"
pip install $PYTHON_PACKAGES
