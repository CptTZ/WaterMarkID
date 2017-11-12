#!/usr/bin/env bash
mvn clean package -Dmaven.test.skip=true
cp ./target/app.jar ~/app.jar
cd ~
nohup java -jar -Dspring.profiles.active=prod app.jar