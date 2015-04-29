/*
 * grunt-s3-signed-urls
 *
 *
 * Copyright (c) 2015 Guy Mograbi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        s3_signed_urls: {
            options: {
               bucketName : '<%=s3Details.bucketName %>',
               expires : '<%=s3Details.expire %>', // 1 year
               secretAccessKey : '<%=s3Details.secretAccessKey %>',
               accessKeyId : '<%=s3Details.accessKeyId %>',
               objectKey : '<%=s3Details.objectKey %>'
            },
            all : {}
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    grunt.registerTask('loadAwsDetails',function(){

        grunt.config.data.s3Details = grunt.file.readJSON( 'dev/test.json' );
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('manualTest',['loadAwsDetails','s3_signed_urls']);
    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'loadAwsDetails','s3_signed_urls', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
