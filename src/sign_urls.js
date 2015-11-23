#!/usr/bin/env node

/*
 * grunt-s3-signed-urls
 *
 *
 * Copyright (c) 2015 Guy Mograbi
 * Licensed under the MIT license.
 */

'use strict';

var AWS = require('aws-sdk');

var options = {
    bucketName: process.env.SIGN_BUCKET_NAME,
    expires: parseInt(process.env.SIGN_TIMEOUT || '' + ( 60 * 60 * 24 ),10), // 1 day by default. time in seconds,
    secretAccessKey: process.env.SIGN_SECRET_KEY,
    accessKeyId : process.env.SIGN_ACCESS_KEY,
    objectKey: process.env.SIGN_OBJECT_KEY // path to file inside bucket

};

var creds = new AWS.Credentials({
    accessKeyId: options.accessKeyId, secretAccessKey: options.secretAccessKey//,sessionToken: 'session'
});

var params = {Bucket: options.bucketName, Key: options.objectKey, Expires: options.expires};
var s3 = new AWS.S3({credentials: creds});
var url = s3.getSignedUrl('getObject', params);
console.log(url);



