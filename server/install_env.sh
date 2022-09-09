#!/usr/bin/env bash

apt-get update

apt-get install curl -y
curl -sL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs nodejs-legacy

apt-get install build-essential -y

apt-get install openjdk-11-jdk -y

apt-get install golang -y
