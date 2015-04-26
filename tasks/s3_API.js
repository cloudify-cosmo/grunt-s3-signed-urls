/**
 * Created by liron on 4/26/15.
 */
var AWS = require('aws-sdk');

// loading the config file
var conf = AWS.config.loadFromPath('../dev/config.json');
var _accessKeyId = conf.credentials.accessKeyId;
var _secretAccessKey = conf.credentials.secretAccessKey;

// creating credentials object

var creds = new AWS.Credentials({
    accessKeyId: _accessKeyId, secretAccessKey: _secretAccessKey //,sessionToken: 'session'
});

var bucketName = 'liron-by-nodejs';
var expire = 120;

var paramsForCreate = {Bucket: bucketName, /* required */ ACL: 'public-read', CreateBucketConfiguration: {LocationConstraint: 'EU'}};
var paramsForDelete = {Bucket: bucketName };
var paramsForUrl = {Bucket: bucketName, Key: 'cloudify', Expires: expire};

var s3 = new AWS.S3({credentials:creds});

var createBucketS3 = function(){
    s3.createBucket(paramsForCreate, function(err, data) {
        if (err) {console.log(err, err.stbucketAPIack); }
        else {console.log(data); }
    });
};

//createBucketS3();


var signedURLS3 = function(){
    var url = s3.getSignedUrl('getObject', paramsForUrl);
    console.log('The URL is', url);
};

signedURLS3();

var deleteBucketS3 = function(){
    s3.deleteBucket(paramsForDelete, function(err, data) {
        if (err) { console.log(err, err.stack);}
        else  {  console.log(data);}
    });
};

//deleteBucketS3();
