/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var signals = ['signal1', 'signal2', 'signal3', 'signal4', 'signal5'];

exports.register = function (socket) {

    (function loopNewSignal1() {
        var rand = Math.round(Math.random() * 15000) + 500;
        setTimeout(function () {
            sendNewSignal('signal1');
            //Call again loop function that creates timer
            loopNewSignal1();
        }, rand);
    }());
    (function loopNewSignal2() {
        var rand = Math.round(Math.random() * 15000) + 500;
        setTimeout(function () {
            sendNewSignal('signal2');
            //Call again loop function that creates timer
            loopNewSignal2();
        }, rand);
    }());
    (function loopNewSignal3() {
        var rand = Math.round(Math.random() * 15000) + 500;
        setTimeout(function () {
            sendNewSignal('signal3');
            //Call again loop function that creates timer
            loopNewSignal3();
        }, rand);
    }());
    (function loopNewSignal4() {
        var rand = Math.round(Math.random() * 15000) + 500;
        setTimeout(function () {
            sendNewSignal('signal4');
            //Call again loop function that creates timer
            loopNewSignal4();
        }, rand);
    }());
    (function loopNewSignal5() {
        var rand = Math.round(Math.random() * 15000) + 500;
        setTimeout(function () {
            sendNewSignal('signal5');
            //Call again loop function that creates timer
            loopNewSignal5();
        }, rand);
    }());


    //Send new temperature to all users
    function sendNewSignal(signal) {
        var obj = getSignalValues();
        obj.signal = signal;
        socket.emit('updateSignalValue', obj);
    }

}


function getSignalValues() {
    return {
        period: getRandomIntInclusive(0, 11),
        value: getRandomIntInclusive(0, 36)
    };
}
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}