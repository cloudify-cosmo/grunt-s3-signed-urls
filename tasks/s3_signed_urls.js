/*
 * grunt-s3-signed-urls
 *
 *
 * Copyright (c) 2015 Guy Mograbi
 * Licensed under the MIT license.
 */

'use strict';

var AWS = require('aws-sdk');
var init = require('../Conf');

var bucketName = init.bucket_name;
var expire = init.expire;

module.exports = function (grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('s3_signed_urls', 'Generate s3 signed urls', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(file.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });

    // loading the config file, cannot do so with 'init'! do not use 'init.json' for that cause.
      var conf = AWS.config.loadFromPath('./conf/dev/aws.json');
      var _accessKeyId = conf.credentials.accessKeyId;
      var _secretAccessKey = conf.credentials.secretAccessKey;

      var creds = new AWS.Credentials({
          accessKeyId: _accessKeyId, secretAccessKey: _secretAccessKey//,sessionToken: 'session'
      });

      // do not change the Key value from '' !!
      var params = {Bucket: bucketName, Key: '', Expires: expire};
      var s3 = new AWS.S3({credentials:creds});
      var url = s3.getSignedUrl('getObject', params);
      console.log(url);



  });

};
