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
    var signals = [{ value: 'signal1', max: 35, min: -10 }, { value: 'signal2', max: 53, min: -18 },
        { value: 'signal3', max: 15, min: -1 }, { value: 'signal4', max: 230, min: -100 }, { value: 'signal5', max: 45, min: -10 }];
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