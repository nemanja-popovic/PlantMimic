'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    signalId: String,
    schemaId: String,
    title: String,
    message: String,
    type: String,
    time: Date
});

module.exports = mongoose.model('Notification', NotificationSchema);