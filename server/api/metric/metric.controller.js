/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /schemas              ->  index
 * POST    /schemas              ->  create
 * GET     /schemas/:id          ->  show
 * PUT     /schemas/:id          ->  update
 * DELETE  /schemas/:id          ->  destroy
 */

'use strict';

var Async = require('async');
var Signal = require('../signal/signal.model');
var Schema = require('../schema/schema.model');
var User = require('../user/user.model');

var metric = {
    
    signalCount: function (callback) {
        Signal.count({}, function (err, data) {
            if (err)
                return callback(err)
            
            callback(null, data);
        });
    }, 
    schemaCount: function (callback) {
        Schema.count({}, function (err, data) {
            if (err)
                return callback(err)
            
            callback(null, data);
        });
    }, 

    userCount: function (callback) {
        User.count({}, function (err, data) {
            if (err)
                return callback(err)
            
            callback(null, data);
        });
    }
};


// Get metric data
exports.index = function (req, res) {
    Async.parallel(metric, function (err, results) {
        if (err) { return handleError(res, err); }
        return res.json(200, results);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}