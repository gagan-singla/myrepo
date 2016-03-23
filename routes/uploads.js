

var express = require('express');

var upload  = require('jquery-file-upload-middleware');
var app = express();

var resizeConf = require('../config').resizeVersion;
var dirs = require('../config').directors;

var fs = require('fs');
//default setters

var q = require('q');
var attach = require('../module/attach');

app.delete('/upload/delete/:avatar/:pid/:id', function(req, res){

    files = {};
    if(typeof(req.session.deleteid) === 'undefined')
    {
        req.session.deleteid = {};
    }

    if(typeof(req.session.deleteid[req.param('pid')]) !== 'undefined')
    {
        req.session.deleteid[req.param('pid')].push(req.param('avatar'));
    }
    else
    {

        req.session.deleteid[req.param('pid')] = {};
        req.session.deleteid[req.param('pid')] = [req.param('avatar')];
    }

    fs.unlink(global.path+"/public/uploads/product/"+req.param('avatar'), function (err) {
        if (!err)
            console.log('successfully deleted '+req.param('avatar'));
    });
    attach.deleteProductAttachment(req.param('id'),config.mysql,q);

    //req.session.deleteid
    res.send(JSON.stringify(files));
    res.end();
    return false;
});
app.delete('/upload/:action/:id/:pid/:avatar', function(req, res){
    files = {};
    files['files'] = [];
    if(typeof(req.session.aid) !== 'undefined')
    {
        //req.session.aid = {};


        if(typeof(req.session.aid[req.param('pid')]) !== 'undefined')
        {

            var photo_id = -1;

            for(i in req.session.aid[req.param('pid')])
            {

                if(req.session.aid[req.param('pid')][i] === null)
                {

                }
                else
                {
                    if(req.param('avatar') == req.session.aid[req.param('pid')][i]['name'])
                    {

                        photo_id = i;
                    }
                }

            }
            if(photo_id >= 0)
            {

                delete req.session.aid[req.param('pid')][photo_id];
            }
            if(req.session.aid[req.param('pid')].length == 0)
            {

                delete req.session.aid[req.param('pid')];
            }
        }
    }
    fs.unlink(global.path+"/public/uploads/product/"+req.param('avatar'), function (err) {
        if (!err)
            console.log('successfully deleted '+req.param('avatar'));
    });

    attach.deleteProductAttachment(req.param('pid'),config.mysql,q);
    res.send(JSON.stringify(files));
    res.end();
    return false;
});
app.post('/upload/:action/:id/:pid', function(req, res, next){

    if(typeof(req.session.aid) === 'undefined')
    {
        req.session.aid = [];
    }

    if(typeof(req.session.aid[req.param('pid')]) === 'undefined')
    {
        req.session.aid[req.param('pid')] = [];
    }

    upload.fileHandler({
        uploadDir: function () {
            return $arr.config.path + '/public/uploads/'+req.param('action')
        },
        uploadUrl: function () {
            return '/uploads/'+req.param('action')
        }

    })(req, res, next);

    upload.on('begin', function (fileInfo, req, res) {
        var shortid = require('shortid');
        var ext = fileInfo.name.substr(fileInfo.name.lastIndexOf('.') + 1);
        var shortid = shortid.generate();
        fileInfo.name = shortid + '.' + ext;
    });
    upload.on('end', function (fileInfo, req, res) {

    });
    upload.on('delete', function (fileInfo, req, res) {
        if(typeof(req.session.pid) !== 'undefined')
        {

            if(typeof(req.session.pid[req.param('pid')]) !== 'undefined')
            {
                var photo_id = -1;
                for(i in req.session.pid[req.param('pid')])
                {
                    if(req.session.aid[req.param('pid')][i] === null)
                    {

                    }
                    else
                    {
                        if(fileInfo['name'] == req.session.aid[req.param('pid')][i]['name'])
                        {
                            photo_id = i;

                        }

                    }
                }
                if(photo_id >= 0)
                {
                    delete req.session.aid[req.param('pid')][photo_id];
                }

            }
        }
    });



});
app.get('/upload/:action/:id/:pid', function (req, res) {


    var q = require('q');
    //var attach = require('attach');
    attach = require('../module/attach');
    if(req.param('id') == 0)
    {
        files = {};
        files['files'] = [];

        res.send(JSON.stringify(files));
        res.end();
        return false;
    }
    ;
    q.all([attach.showProducts(req,config.mysql,q)]).then(function(results)
    {

        files = {};
        files['files'] = [];
        var sm = results[0][0];

        var m = sm.length;
        if(m == 0)
        {
            res.send(JSON.stringify(files));
            res.end();
            return false;
        }
        for(i in sm)
        {
            files['files'][i] =  {name: sm[i]['image'],
                originalName:  sm[i]['originalname'],
                size: sm[i]['image_size'],
                type: sm[i]['imagetype'],
                deleteType: 'DELETE',
                //url: $arr['config']['url']+'/uploads/upload/delete/'+sm[i]['avatar']+'/'+sm[i]['project_id'],
                url: $arr['config']['url']+'/uploads/product/'+sm[i]['avatar'],
                deleteUrl: $arr['config']['url']+'/uploads/upload/delete/'+sm[i]['avatar']+'/'+sm[i]['project_id']+'/'+sm[i]['id']};
            if(i == m-1)
            {

                res.send(JSON.stringify(files));
                res.end();
                return false;
            }

        }



    }).fail(function(err){
        console.log(err.stack);
        throw err;
    })

});

app.get('/uploader/:action/:id', function(req, res){

    $arr['pid'] = req.param('pid')
    $arr.action = req.param('action');
    $arr.id = req.param('id');
    common.tplFile('fileupload.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);
});

app.get('/uploader/:action/:id/:pid', function(req, res){

    $arr['pid'] = req.param('pid')
    $arr.action = req.param('action');
    $arr.id = req.param('id');
    common.tplFile('fileupload.tpl');
    common.headerSet(1);
    common.loadTemplateHeader(req,res,$arr);
});







module.exports = app;