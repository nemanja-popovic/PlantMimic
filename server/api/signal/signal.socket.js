/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Signal = require('./signal.model');

exports.register = function (socket) {
    
    Signal.find(function (err, signals) {
        if (err) { return handleError(res, err); }
        for (var i = 0; i < signals.length; i++) {
            
            (function loopNewSignal(value, id) {
                var rand = Math.round(Math.random() * 15000) + 500;
                setTimeout(function () {
                    console.log(value, id);
                    sendNewSignal(value, id);
                    //Call again loop function that creates timer
                    loopNewSignal(value, id);
                }, rand);
            }(signals[i].value, signals[i]._id));
        }
    });
    
    
    //Send new signal value to all users
    function sendNewSignal(signal, id) {
        var obj = getSignalValues();
        obj.signal = signal;
        
        Signal.findById(id, function (err, signal) {
            if (err) { return handleError(res, err); }
        
            signal.values.push(obj.value);
            if (signal.values.length > 1000) {
                signal.values.splice(-1000);
            }

            //Mark modified and save
            signal.markModified('values');
            signal.save();
        });
        
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