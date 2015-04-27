/*
 * grunt-s3-signed-urls
 *
 *
 * Copyright (c) 2015 Guy Mograbi
 * Licensed under the MIT license.
 */

'use strict';

/*var AWS = require('aws-sdk');

// loading the config file
  var conf = AWS.config.loadFromPath('../dev/config.json');
  var _accessKeyId = conf.credentials.accessKeyId;
var _secretAccessKey = conf.credentials.secretAccessKey;

      var creds = new AWS.Credentials({
   accessKeyId: _accessKeyId, secretAccessKey: _secretAccessKey//,sessionToken: 'session'
 });

 var bucketName = 'liron-by-nodejs';
 var expire = 120;
 var paramsForUrl = {Bucket: bucketName, Key: key, Expires: expire};
 var s3 = new AWS.S3({credentials:creds});

 var signedURLS3 = function(){
 var url = s3.getSignedUrl('getObject', paramsForUrl);
 console.log('The URL is', url);
 };

signedURLS3();*/
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

      // run grunt and get --> Warning: ENOENT, no such file or directory '../dev/config.json' Use --force to continue.
      var AWS = require('aws-sdk');
      var conf = AWS.config.loadFromPath('../dev/config.json');


  });

};
