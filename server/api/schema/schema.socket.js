/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var schema = require('./schema.model');

exports.register = function (socket) {
    schema.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('schema:save', doc);
}
