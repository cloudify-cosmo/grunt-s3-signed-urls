'use strict';

var path = require('path');
var _  = require('lodash');
var meConf = path.resolve(process.env.ME_CONF_JSON ||path.join(__dirname,'conf/dev/config.json')) ;
var prodConf = path.resolve(path.join(__dirname,'conf/prod.json') );

_.merge(module.exports, require(prodConf), require(meConf));
