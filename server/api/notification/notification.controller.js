/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /schemas              ->  index
 * POST    /schemas              ->  create
 * GET     /schemas/:id          ->  show
 * PUT     /schemas/:id          ->  update
 * DELETE  /schemas/:id          ->  destroy
 */

'use strict';

var Notification = require('./notification.model');

// Get notifications
exports.index = function (req, res) {
    Notification.find(function (err, notifications) {
        if (err) { return handleError(res, err); }
        return res.json(200, notifications);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}