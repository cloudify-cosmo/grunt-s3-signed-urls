/*
 * grunt-s3-signed-urls
 *
 *
 * Copyright (c) 2015 Guy Mograbi
 * Licensed under the MIT license.
 */

'use strict';

var AWS = require('aws-sdk');


module.exports = function (grunt) {
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('s3_signed_urls', 'Generate s3 signed urls', function () {
        grunt.log.ok('getting that url..');

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            bucketName: '',
            expires: 60 * 60 * 24, // 1 day by default. time in seconds,
            secretAccessKey: null,
            accessKeyId : null,
            objectKey: '' // path to file inside bucket

        });

        var creds = new AWS.Credentials({
            accessKeyId: options.accessKeyId, secretAccessKey: options.secretAccessKey//,sessionToken: 'session'
        });

        var objectKeys = [].concat(options.objectKey);
        var results = {};
        objectKeys.forEach(function(item){

            var params = {Bucket: options.bucketName, Key: item, Expires: options.expires};
            var s3 = new AWS.S3({credentials: creds});
            var url = s3.getSignedUrl('getObject', params);
            results[item]= url;
        });
        console.log(JSON.stringify(results,{},4));


    });

};
