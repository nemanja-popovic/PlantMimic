'use strict';

var nodemailer = require('nodemailer');
var config = require('../../config/environment');
//var Signal = require('../../api/signal/signal.model');

var _transporter;
function getTransporter() {
    if (!_transporter) {
        // create reusable transporter object using SMTP transport
        
        _transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.adminGmail.email,
                pass: config.adminGmail.password
            }
        });
    }
    return _transporter;
}

function sendEmail(to, subject, text, html){
    
    var transporter = getTransporter();

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'PlantMimic', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = function (app) {
    
    return {
        sendEmail: sendEmail,
        getTransporter: getTransporter
    };
}
