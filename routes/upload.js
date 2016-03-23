
var upload  = require('jquery-file-upload-middleware');
var express = require('express');
var reload = require('reload');
var q = require('q');
var sprintf = require('sprintf').sprintf;

var common = require('../module/common');
var products = require('../module/products');

var app = express.Router();
var resizeConf = require('../config').resizeVersion;
var dirs = require('../config').directors;
console.log("In upload.js")
app.get('/uploader/:action/:id', function(req, res){
    console.log("In upload.js 111")
     $arr.action = req.param('action');
     $arr.id = req.param('id');
     common.tplFile('fileupload.tpl');
     common.headerSet(1);
     common.loadTemplateHeader(req,res,$arr);
});



app.get('/upload', function( req, res ){
    console.log("In upload.js 22")
    res.redirect('/');
});

app.put('/upload', function( req, res ){
    console.log("In upload.js 33")
    res.redirect('/');
});

app.delete('/upload', function( req, res ){
    console.log("In upload.js 444")
    res.redirect('/');
});
app.get('/:action/:id', function (req, res) {
    console.log("In upload.js 555")
    upload.fileHandler({
        tmpDir: dirs.temp,
        uploadDir:$arr.config.path+dirs.default+'/'+req.param('action')+'/',
        uploadUrl: dirs.default_url+'/'+req.param('action')+'/',
        imageVersions: resizeConf.default
    });
});
app.post('/:action/:id', function (req, res) {
    console.log("In upload.js 777")
    upload.configure({
        uploadDir: $arr.config.path + 'public/uploads',
        uploadUrl: '/uploads',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });
    upload.fileHandler();
    res.sendStatus(200);
    res.end();

});
module.exports = app;