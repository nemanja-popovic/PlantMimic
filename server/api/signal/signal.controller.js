/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /schemas              ->  index
 * POST    /schemas              ->  create
 * GET     /schemas/:id          ->  show
 * PUT     /schemas/:id          ->  update
 * DELETE  /schemas/:id          ->  destroy
 */

'use strict';

// Get list of signals
exports.index = function (req, res) {
    var signals = ['signal1', 'signal2', 'signal3', 'signal4', 'signal5'];
    return res.json(200, signals);
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