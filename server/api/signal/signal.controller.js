/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /schemas              ->  index
 * POST    /schemas              ->  create
 * GET     /schemas/:id          ->  show
 * PUT     /schemas/:id          ->  update
 * DELETE  /schemas/:id          ->  destroy
 */

'use strict';

var Signal = require('./signal.model');

// Get list of signals
exports.index = function (req, res) {
    Signal.find(function (err, signals) {
        if (err) { return handleError(res, err); }
        return res.json(200, signals);
    });
};

// Get a single signal data
exports.show = function (req, res) {
    //Schema.findById(req.params.id, function (err, schema) {
    //    if (err) { return handleError(res, err); }
    //    if (!schema) { return res.send(404); }
    //    return res.json(schema);
    //});
    var signalData = [];
    return res.json(signalData);
};

function handleError(res, err) {
    return res.send(500, err);
}