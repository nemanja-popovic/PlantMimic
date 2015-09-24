/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var Redis = require('../components/redis/redis');
var Schema = require('../api/schema/schema.model');
var Signal = require('../api/signal/signal.model');
var Notification = require('../api/notification/notification.model');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function (data) {
        console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
    });
    
    // Insert sockets below
    require('../api/schema/schema.socket').register(socket);
    require('../api/signal/signal.socket').register(socket);
}

module.exports = function (socketio) {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"
    
    // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
    //
    // 1. You will need to send the token in `client/components/socket/socket.service.js`
    //
    // 2. Require authentication here:
    // socketio.use(require('socketio-jwt').authorize({
    //   secret: config.secrets.session,
    //   handshake: true
    // }));
    
    var client = Redis().getClient();
    client.on('message', function (channel, message) {
        if (channel == 'signal:new_val') {
            console.log('SUBSCRIBER:', message);
            var msgObj = JSON.parse(message);
            
            //Add new value to signals
            
            Signal.findById(msgObj.id, function (err, signal) {
                if (err) { return handleError(res, err); }
                try {
                    signal.values.push(msgObj.value);
                    if (signal.values.length > 1000) {
                        signal.values.splice(-1000);
                    }
                    //Mark modified and save
                    signal.markModified('values');
                    signal.save();
                }
                catch (e) { }
            });
            
            
            //Check if the new value if not in the right scope
            Schema.find(function (err, schemas) {
                if (err) { return handleError(res, err); }
                
                for (var i = 0; i < schemas.length; i++) {
                    var schema = schemas[i];
                    for (var j = 0; j < schema.points.length; j++) {
                        var point = schema.points[j];
                        //For signals
                        for (var k = 0; k < point.signals.length; k++) {
                            var signal = point.signals[k];
                            if (signal.value == msgObj.signal) {
                                if (msgObj.value > signal.max) {
                                    console.log('BIGGER THAT MAX', msgObj.value, signal.max);
                                    
                                    //Add notification to DB
                                    Notification.create({
                                        signalId: signal._id,
                                        schemaId: schema._id,
                                        title: 'Signal value too high!',
                                        message: signal.value + ' value: ' + msgObj.value + ' is bigger than maximum allowed value of ' + signal.max,
                                        type: 'error',
                                        time: new Date()
                                    });
                                    
                                    socketio.sockets.emit('signal_point:notification', {
                                        obj: msgObj, 
                                        signal: signal, 
                                        type: 'signal_bigger',
                                        title: 'Signal value too high!',
                                        message: signal.value + ' value: ' + msgObj.value + ' is bigger than maximum allowed value of ' + signal.max,
                                        time: new Date()
                                    });
                                    
                                }
                                else if (msgObj.value < signal.min) {
                                    console.log('SMALLER THAN MIN', msgObj.value, signal.min);
                                    
                                    //Add notification to DB
                                    Notification.create({
                                        signalId: signal._id,
                                        schemaId: schema._id,
                                        title: 'Signal value too low!',
                                        message: signal.value + ' value: ' + msgObj.value + ' is smaller than minimum allowed value of ' + signal.min,
                                        type: 'error',
                                        time: new Date()
                                    });

                                    socketio.sockets.emit('signal_point:notification', {
                                        obj: msgObj,
                                        signal: signal, 
                                        type: 'signal_smaller',
                                        title: 'Signal value too low!',
                                        message: signal.value + ' value: ' + msgObj.value + ' is smaller than minimum allowed value of ' + signal.min,
                                        time: new Date()
                                    });
                                 
                                }
                            }
                        }
                    }
                }

            });
            
            socketio.sockets.emit('signal_point:update', msgObj);
        }
    });
    
    socketio.on('connection', function (socket) {
        socket.address = socket.handshake.address !== null ?
                socket.handshake.address.address + ':' + socket.handshake.address.port :
                process.env.DOMAIN;
        
        socket.connectedAt = new Date();
        
        // Call onDisconnect.
        socket.on('disconnect', function () {
            onDisconnect(socket);
            console.info('[%s] DISCONNECTED', socket.address);
        });
        
        // Call onConnect.
        onConnect(socket);
        console.info('[%s] CONNECTED', socket.address);
    });
};