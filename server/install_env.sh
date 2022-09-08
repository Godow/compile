#!/usr/bin/env bash

apt-get update

apt-get install curl -y
curl -sL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs nodejs-legacy

apt-get install gcc -y
