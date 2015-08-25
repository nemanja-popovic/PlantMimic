'use strict';

var express = require('express');
var controller = require('./schema.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/image/:id', controller.getImage);
router.post('/image', controller.postImage);
router.get('/signals', controller.getSignals);

module.exports = router;