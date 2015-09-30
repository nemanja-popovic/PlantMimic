/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Signal = require('../api/signal/signal.model');

Signal.find({}).remove(function () {
    Signal.create({
        value: 'signal1',
        max: 35, 
        min: -10,
        values: []
    }, 
        {
        value: 'signal2', 
        max: 53, 
        min: -18,
        values: []
    },
    {
        value: 'signal3', 
        max: 15, 
        min: -1,
        values: []
    }, 
    {
        value: 'signal4', 
        max: 230, 
        min: -100,
        values: []
    }, 
    {
        value: 'signal5', 
        max: 45,
        min: -10,
        values: []
    }, 
    {
        value: 'signal6', 
        max: 3,
        min: 0,
        values: []
    });
});

User.find({}).remove(function () {
    User.create(
        {
            provider: 'local',
            name: 'Test',
            email: 'test@test.com',
            password: 'test',
            sendEmail: false
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Nemanja Popovic',
            email: 'nemanja23031991@gmail.com',
            password: 'test',
            sendEmail: false
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin',
            sendEmail: false
        }, function () {
            console.log('finished populating users');
        }
    );
});