'use strict';

var redis = require('redis');
var config = require('../../config/environment');
var Signal = require('../../api/signal/signal.model');

function createClient() {
    console.log('redis config:');
    console.log(config.redisCloud);

    var client = redis.createClient(config.redisCloud.port, config.redisCloud.host, { no_ready_check: true });
    client.auth(config.redisCloud.password, function (err) {
        if (err) {
            throw err;
        }
    });
    return client;
}

var subscribe_client;
function getClient() {
    if (!subscribe_client) {
        subscribe_client = createClient();
        subscribe_client.on('connect', function () {
            
            //Subscribe to event
            subscribe_client.subscribe('signal:new_val');
        });
    }
    return subscribe_client;
}

module.exports = function (app) {
    
    return {
        createClient: createClient,
        getClient: getClient
    };
}
