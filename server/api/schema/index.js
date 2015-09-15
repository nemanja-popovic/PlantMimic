'use strict';

var express = require('express');
var controller = require('./schema.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/image/:id', controller.getImage);
router.post('/image', auth.hasRole('admin'), controller.postImage);
router.get('/signals', auth.isAuthenticated(), controller.getSignals);

module.exports = router;