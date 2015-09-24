/* global io */
'use strict';

angular.module('plantMimicApp')
  .factory('socket', function (socketFactory) {
    
    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
        // Send auth token on connection, you will need to DI the Auth service above
        // 'query': 'token=' + Auth.getToken()
        path: '/socket.io-client'
    });
    
    var socket = socketFactory({
        ioSocket: ioSocket
    });
    
    return {
        socket: socket,
        
        /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates: function (modelName, array, cb) {
            cb = cb || angular.noop;
            
            socket.on('signal_point:update', function (item) {
                var event = 'update';
                array.push(item);
                if (array.length > 10) {
                    array = array.slice(Math.max(array.length - 10, 1));
                }
                cb(event, item, array);
            });

        },
        syncNotifications: function (modelName, array, cb) {
            cb = cb || angular.noop;
            
            socket.on('signal_point:notification', function (item) {
                cb(event, item, array);
            });
        },
        
        /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
            socket.removeAllListeners('signal_point:update');
            socket.removeAllListeners(modelName + ':remove');
        }
    };
});
