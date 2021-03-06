'use strict';

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,
    
    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8000,
    
    // MongoDB connection options
    mongo: {
        uri: process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/plantmimicv1'
    },
    
    // Redis connection options
    redisCloud: {
        port: process.env.REDISCLOUD_PORT || '18367',
        host: process.env.REDISCLOUD_HOSTNAME || 'pub-redis-18367.us-east-1-4.6.ec2.redislabs.com',
        password: process.env.REDISCLOUD_PASSWORD || ''
    }
};