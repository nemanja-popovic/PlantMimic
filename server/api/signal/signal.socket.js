/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Signal = require('./signal.model');

exports.register = function (socket) {
    
    Signal.find(function (err, signals) {
        if (err) { return handleError(res, err); }
        for (var i = 0; i < signals.length; i++) {
            console.log(signals[i]);

            (function loopNewSignal(value) {
                var rand = Math.round(Math.random() * 15000) + 500;
                setTimeout(function () {
                    console.log(value);
                    sendNewSignal(value);
                    //Call again loop function that creates timer
                    loopNewSignal(value);
                }, rand);
            }(signals[i].value));
        }
    });
    
    
    //Send new signal value to all users
    function sendNewSignal(signal) {
        var obj = getSignalValues();
        obj.signal = signal;
        socket.emit('signal_point:update', obj);
    }

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