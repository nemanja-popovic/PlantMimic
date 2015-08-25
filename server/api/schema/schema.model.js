'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SchemaSchema = new Schema({
    name: String,
    imageUrl: String,
    points: {
        type: Array,
        'default': []
    }
});

module.exports = mongoose.model('Schema', SchemaSchema);