'use strict';

var mongoose = require('mongoose'),
    Signal = mongoose.Schema;

var SignalSchema = new Signal({
    value: String,
    max: Number,
    min: Number,
    values: {
        type: Array,
        'default': []
    }
});

module.exports = mongoose.model('Signal', SignalSchema);