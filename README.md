# PlantMimic

PlantMimic is Angular.js aplication created using yeoman generator (https://github.com/DaftMonk/generator-angular-fullstack) for angular fullstack applications.

## Tools required

1. MongoDB installed
2. Node.js installed
3. Account at https://redislabs.com/ (There is free trial)
4. Heroku or OpenShift (https://www.openshift.com/) account for deploying (OpenShift has free trial for Node.js server, MongoDb database, Redis server and allows persistent connections used by socket.io so it is maybe a better choice in this case)

## How to install

1. Clone this repository
2. Run **npm install** from root folder of this application (maybe needs to be runned with --force parameter)
3. Run **bower install** from root folder of this application

## How to setup project

File **local.env.js** should be added to **server/config** folder
File should look something like this but with all fields filled with correct values:

```
use strict';

module.exports = {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: "",
    
    FACEBOOK_ID: '',
    FACEBOOK_SECRET: '',
    
    GOOGLE_ID: '',
    GOOGLE_SECRET: '',
    
    REDISCLOUD_URL: '',
    REDISCLOUD_PORT: '',
    REDISCLOUD_PASSWORD: '',
    
    ADMIN_GMAIL_EMAIL: '',
    ADMIN_GMAIL_PASSWORD: '',
    
};
```
Values from this file should be also **added as environment variables* in order to run project locally. Example:

```$ SET REDISCLOUD_URL=http://some_url.com```

## Runing

After everything configured correctly, having MongoDB running and having correct credentials for Redis server stored as environment variables project can be started using **```grunt serve```** command.



