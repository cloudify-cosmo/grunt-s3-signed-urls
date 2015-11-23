# grunt-s3-signed-urls

> Generate s3 signed urls

This plugin will generate temporary signed URLs for you to use 
```
{
    "object_key_1": "https://bucket_name.s3.amazonaws.com/object_key_1?AWSAccessKeyId=your_key&Expires=timestamp&Signature=random_signature",
    "object_key_2": "https://bucket_name.s3.amazonaws.com/object_key_2?AWSAccessKeyId=your_key&Expires=timestamp&Signature=random_signature"
}
```

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-s3-signed-urls --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-s3-signed-urls');
```

## The "s3_signed_urls" task

### Overview
In your project's Gruntfile, add a section named `s3_signed_urls` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  s3_signed_urls: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.bucketName
Type: `String`
Default value: `''`

Name of s3 bucket

#### options.expire
Type: `Number`
Default value: `60*60*24`

seconds until link will expire

#### options.secretAccessKey
Type: `String`
Default value: `null`

AWS secret access key

#### options.accessKeyId
Type: `String`
Default value: `null`

AWS access key ID

#### options.objectKey
Type: `String|Array<String>`
Default value:`''`

Object key or list object keys to get links for

### Usage Examples

```
s3_signed_urls: {
    options: {
       bucketName : '<%=s3Details.bucketName %>',
       expire : '<%=s3Details.expire %>',
       secretAccessKey : '<%=s3Details.secretAccessKey %>',
       accessKeyId : '<%=s3Details.accessKeyId %>',
       objectKey : '<%=s3Details.objectKey %>'
    },
    all : {}
},
```


## Command line support

```

sudo npm install guy-mograbi-at-gigaspaces/grunt-s3-signed-urls

export SIGN_BUCKET_NAME="..."
export SIGN_TIMEOUT="..." # time in seconds. 1 day by default. 
export SIGN_ACCESS_KEY="..."
export SIGN_SECRET_KEY="..."
export SIGN_OBJECT_KEY="..." # path to file inside bucket


s3-sign

==> https://pathToKeyStuff?AWSAccessKeyId=accessKeyId&Expires=someLongNumberTimestamp&Signature=someSignature
```

## Contributing
Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.0.1 first release

## License
Copyright (c) 2015 Guy Mograbi. Licensed under the MIT license.
