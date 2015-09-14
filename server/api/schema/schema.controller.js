/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /schemas              ->  index
 * POST    /schemas              ->  create
 * GET     /schemas/:id          ->  show
 * PUT     /schemas/:id          ->  update
 * DELETE  /schemas/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var path = require('path');
var Schema = require('./schema.model');

var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs');

// Get list of schemas
exports.index = function (req, res) {
    Schema.find(function (err, schemas) {
        if (err) { return handleError(res, err); }
        return res.json(200, schemas);
    });
};

// Get a single schema
exports.show = function (req, res) {
    Schema.findById(req.params.id, function (err, schema) {
        if (err) { return handleError(res, err); }
        if (!schema) { return res.send(404); }
        return res.json(schema);
    });
};

// Creates a new schema in the DB.
exports.create = function (req, res) {
    Schema.create(req.body, function (err, schema) {
        if (err) { return handleError(res, err); }
        return res.json(201, schema);
    });
};

// Updates an existing schema in the DB.
exports.update = function (req, res) {
    if (req.body._id) { delete req.body._id; }
    Schema.findById(req.params.id, function (err, schema) {
        if (err) { return handleError(res, err); }
        if (!schema) { return res.send(404); }
        var updated = _.merge(schema, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, schema);
        });
    });
};

// Deletes a schema from the DB.
exports.destroy = function (req, res) {
    Schema.findById(req.params.id, function (err, schema) {
        if (err) { return handleError(res, err); }
        if (!schema) { return res.send(404); }
        schema.remove(function (err) {
            if (err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

var folder = path.normalize(__dirname + '../../../uploads/');

// Get image
exports.getImage = function (req, res) {
    var fileName = folder + '/' + req.params.id;
    
    res.sendfile(fileName, {}, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
};

// Post image
exports.postImage = function (req, res) {
    try {
        ensureExists(__dirname + '/temp', function (err) {
            if (err) {
                res.json(err);
            }// handle folder creation error
            else {
                var url = req.get('Host');
                var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                
                var form = new multiparty.Form({ uploadDir: __dirname + '/temp' });
                
                form.parse(req, function (err, fields, files) {
                    var file = files.file[0];
                    var contentType = file.headers['content-type'];
                    var tmpPath = file.path;
                    var extIndex = tmpPath.lastIndexOf('.');
                    var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
                    // uuid is for generating unique filenames. 
                    var fileName = uuid.v4() + extension;
                    var destPath = folder + fileName;
                    
                    // Server side file type checker.
                    if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
                        fs.unlink(tmpPath);
                        return res.status(400).send('Unsupported file type.');
                    }
                    
                    fs.rename(tmpPath, destPath, function (err) {
                        if (err) {
                            return res.status(400).send('Image is not saved:' + err);
                        }
                        return res.json(fullUrl + '/' + fileName);
                    });
                });
            }
        });
    }
    catch (e) {
        res.json(e);
    }
};


// Get list of signals
exports.getSignals = function (req, res) {
    var signals = ['signal1', 'signal2', 'signal3', 'signal4', 'signal5'];
    return res.json(200, signals);
};

function ensureExists(path, cb) {
    //var mask = 0744;
    fs.mkdir(path, function (err) {
        if (err) {
            if (err.code === 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}

function handleError(res, err) {
    return res.send(500, err);
}