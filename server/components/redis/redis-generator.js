'use strict';

var redis = require('redis');
var Signal = require('../../api/signal/signal.model');
var Redis = require('./redis');

module.exports = function (app) {
    
    var client = Redis().createClient();
    
    client.on('connect', function () {
        console.log('Connected to Redis');
        
        Signal.find(function (err, signals) {
            
            console.log('FOund signals', signals);

            if (err) { return handleError(res, err); }
            for (var i = 0; i < signals.length; i++) {
                
                (function loopNewSignal(value, id) {
                    var rand = Math.round(Math.random() * 15000) + 500;
                    setTimeout(function () {
                        sendNewSignal(value, id, client);
                        //Call again loop function that creates timer
                        loopNewSignal(value, id);
                    }, rand);
                }(signals[i].value, signals[i]._id));
            }
        });
    
    });
}


//Send new signal value to all users
function sendNewSignal(signal, id, redisClient) {
    var obj = getSignalValues();
    obj.signal = signal;
    obj.id = id;

    console.log('PUBLISH', JSON.stringify(obj));
    
    redisClient.publish('signal:new_val', JSON.stringify(obj));
}

function getSignalValues() {
    return {
        //period: getRandomIntInclusive(0, 11),
        value: getRandomIntInclusive(0, 30)
    };
}
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
