/*============================================================================*\
|| ########################################################################## ||
|| # Auction Software Marketplace[*]version[*] Build [*]build[*]
|| # ---------------------------------------------------------------------- # ||
|| # Customer License # [*]license[*]
|| # ---------------------------------------------------------------------- # ||
|| # Copyright Â©2014â€“[*]year[*] Develop Scripts LLC. All Rights Reserved    # ||
|| # This file may not be redistributed in whole or significant part.       # ||
|| # ------------- AUCTION SOFTWARE IS NOT FREE SOFTWARE ------------------ # ||
|| # http://www.auctionsoftwaremarketplace.com|support@auctionsoftware.com  # ||
|| # ---------------------------------------------------------------------- # ||
|| ########################################################################## ||
\*============================================================================*/

// #### load required Modules ##################################################



var  util    = require('util');
var express  = require('express');
var reload   = require('reload');
var q 		 = require('q');
var sprintf  = require('sprintf').sprintf;
var async = require('async');
var forums = require('../module/forums');

var common   = require('../module/common');
var app = express.Router();

/*app.use(function (req, res, next) {
    common.checkLogin(req, res, 0);
    classified = require('../module/classified');
    //req.session.userid = 1;
    next();

});*/

app.use(function(req,res,next)
{
  //req.session.userid = 1;	
  common.checkLogin(req, res, 0);
  
    //req.session.userid = 1;
    next();
});


app.get(['/'],function(req,res){

	$arr['user_details'] = req.session;
	q.all([forums.getAllcats(req,config.mysql,q)]).then(function(results){
		console.log('asdasdasd');
		$arr['categories'] = results[0][0];
		console.log($arr['categories'])
		common.tplFile('forum/community.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);

	});
});

app.get(['/category/:id'],function(req,res){

	var bids = require('../module/bid');
    var data = bids.SearchPageNo(req, config.mysql, q);

    req.body.page = data.dspage;
    req.body.perlimit = 10;

	$arr['user_details'] = req.session;
	$arr['cid'] = req.body.id = req.param('id');
	q.all([forums.cat_questions(req,config.mysql,q,req.body.id,0),forums.cat_questions(req,config.mysql,q,req.body.id,1)]).then(function(results){

		$arr['questions'] = results[0][0];
		$arr['pagination'] = results[1][0].length;
		var pagination = require('pagination');
        fquery = '';
        if (typeof(req.param('cmd')) !== 'undefined') {
            fquery = '?cmd=' + req.param('cmd');
        }
        var paginator = new pagination.SearchPaginator({
            prelink: '/forum/category/'+req.body.id+ fquery,
            current: req.body.page,
            rowsPerPage: req.body.perlimit,
            totalResult: $arr['pagination']
        });
        $arr['pagination_html'] = paginator.render();

        common.tplFile('forum/discussion.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);

	});
});

app.get(['/questions'],function(req,res){

	common.checkLogin(req,res,0);
	
	$arr['user_details'] = req.session;
	$arr['passed'] = (typeof(req.param('qst')) !== 'undefined') ? req.param('qst') : '';
	var url = require('url');
	res.set('Location', url.parse(req.url));
	q.all([forums.getAllcats(req,config.mysql,q)]).then(function(results){

		$arr['categories'] = results[0][0];
		common.tplFile('forum/questions.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
	});


});

app.post(['/getcategories'],function(req,res){
	
	var ques_type  = req.body.quest_type;

	q.all([forums.getCategory(req,config.mysql,q,ques_type)]).then(function(results){

		
		var result_length = results[0][0].length;
		var options = ' <option value="">Choose a Board</option>';
		for( var i=0; i< result_length; i++ ) {

			options += "<option value="+results[0][0][i].id+">"+results[0][0][i].catname+"</option>";
		}
		
		res.send( options );

	});



});

app.post(['/newquestion'],function(req,res){

	
	var image_name = '';
	if(typeof(req.files.forum_images) !== 'undefined') image_name =  req.files.forum_images.name;
	console.log( image_name );
	q.all([forums.add_question(req,config.mysql,q,image_name)]).then(function (results) {
		res.writeHead(302, {
	                    'Location': '/forum/questionpage/' + results[0][0].insertId
	                });
	    res.end();
		return false;
	});


});

app.get(['/questionpage/:id'],function(req,res){
	$arr['user_details'] = req.session;
	var pagination = require('pagination');
	$arr['qid'] = req.body.id = req.param('id');
	$arr['uid'] = req.session.userid;
	req.body.page = (typeof(req.param('page')) !== 'undefined') ? req.param('page') : 1;
	q.all([forums.getQuestion(req, config.mysql, q,req.body.id),forums.getAnswer(req, config.mysql, q,req.body.id,1),forums.getKudos(req, config.mysql, q,req.body.id),forums.countKudos(req, config.mysql, q,req.body.id),forums.getAnsKudos(req, config.mysql, q,req.body.id),forums.getAnswer(req, config.mysql, q,req.body.id,0)]).then(function (results) {

		$arr['questions'] = results[0][0][0];
		$arr['answers'] = results[1][0];
		$arr['allkudos'] = results[2][0];
		$arr['kudo_count'] = results[3][0][0].kudos;
		$arr['ans_kudo'] = results[4][0];
		$arr['answers_length'] = results[5][0].length;
		 var paginator = new pagination.SearchPaginator({
            prelink: '/forum/questionpage/'+req.body.id,
            current: req.body.page,
            rowsPerPage: 5,
            totalResult: $arr['answers_length']
        });

        $arr['pagination_html'] = paginator.render();

		console.log( $arr['ans_kudo'] );
		common.tplFile('forum/questionpage.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);

	});
});

app.get(['/answers/:id'],function(req,res){

	common.checkLogin(req,res,0);
	$arr['user_details'] = req.session;
	$arr['qid'] = req.body.id = req.param('id');
	q.all([forums.getQuestion(req, config.mysql, q,req.body.id),forums.getAnswer(req, config.mysql, q,req.body.id)]).then(function (results) {

		$arr['questions'] = results[0][0][0];
		$arr['answers'] = results[1][0];

		common.tplFile('forum/answers.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);
	});
});

app.post(['/newanswer'],function(req,res){

	
	var image_name = '';
	if(typeof(req.files.answer_upload) !== 'undefined') image_name =  req.files.answer_upload.name;
	
	forums.add_answer(req,config.mysql,q,image_name);
	res.writeHead(302, {
                    'Location': '/forum/questionpage/' + req.body.qid
                });
    res.end();
	return false;



});

app.post('/kudos_to_question',function(req,res){
	console.log('ist working');
	var logged = req.session.userid;
	if(logged){
		
		forums.addkudos_q(req,config.mysql,q);
		res.send(req.body.quests);
	}
	else{
		console.log('2st working');
		res.send('failed');

	}
});

app.post('/no_kudos_question',function(req,res){
	console.log('ist working');
	var logged = req.session.userid;
	if(logged){
		
		forums.removekudos_q(req,config.mysql,q);
		res.send(req.body.quests);
	}
	else{
		console.log('2st working');
		res.send('failed');

	}
});

app.post('/kudos_to_answer',function(req,res){
	
	console.log('ist working');
	var logged = req.session.userid;
	if(logged){
		
		forums.addkudos_a(req,config.mysql,q);
		res.send(req.body.quests);
	}
	else{
		console.log('2st working');
		res.send('failed');

	}
});

app.post('/no_kudos_answer',function(req,res){
	
	console.log('ist working');
	var logged = req.session.userid;
	if(logged){
		
		q.all([forums.removekudos_a(req,config.mysql,q)]).then(function (results) {
			res.send(req.body.quests);
		});
	}
	else{
		console.log('2st working');
		res.send('failed');

	}
});


app.post('/accept_solution',function(req,res){
	
	console.log('ist working');
	var logged = req.session.userid;
	if(logged){
		q.all([forums.solved_q(req,config.mysql,q), forums.solved_a(req,config.mysql,q)]).then(function (results) {
				
		res.send(req.body.quests);

		});
	}
	else{
		console.log('2st working');
		res.send('failed');

	}
});

app.post('/reject_solution',function(req,res){
	
	console.log('ist working');
	var logged = req.session.userid;
	if(logged){
		q.all([forums.notsol_q(req,config.mysql,q), forums.notsol_a(req,config.mysql,q)]).then(function (results) {
				
		res.send(req.body.quests);

		});
	}
	else{
		console.log('2st working');
		res.send('failed');

	}
});
app.post('/search_questions',function(req,res){
	
	var searches = req.body.queries;
	string = searches.split(" ");
	var total_length = string.length;
	
	/*var stringArray = new Array();
	for(var i =0; i < string.length; i++){
   	 stringArray.push(string[i]);
   	}*/

   	q.all([forums.searched(req,config.mysql,q,string)]).then(function (results) {
		var items_matched = "";
		total_results = results[0][0].length;
		for(var i =0; i < total_results; i++){		
			items_matched += "<li><a href='"+config.url+"/forum/questionpage/"+results[0][0][i].id+"'>"+results[0][0][i].title+"</a></li>"

		}
		res.send(items_matched);

	});

	
	
	
});

app.get(['/equestions/:id'],function(req,res){
	common.checkLogin(req,res,0);
	$arr['user_details'] = req.session;
	$arr['qid'] = req.body.id = req.param('id');
	$arr['uid'] = req.session.userid;
	q.all([forums.getQuestion(req, config.mysql, q,req.body.id),forums.getAllcats(req,config.mysql,q)]).then(function (results) {

		$arr['questions'] = results[0][0][0];
		$arr['categories'] = results[1][0];
		console.log($arr['categories']);
		common.tplFile('forum/equestions.tpl');
		common.headerSet(1);
		common.loadTemplateHeader(req,res,$arr);

	});
});

app.post(['/update_question'],function(req,res){

	var image_name = '';
	if(typeof(req.files.forum_images) !== 'undefined') image_name =  req.files.forum_images.name;
	else image_name = 'no_updates';
	forums.update_quest(req,config.mysql,q,image_name,req.body.qid);

	res.writeHead(302, {
                    'Location': '/forum/questionpage/' + req.body.qid
                });
    res.end();
	return false;


});

app.post('/checkquestion',function(req,res){
	
	console.log('ist working');
	
	
		
	q.all([forums.checkit(req,config.mysql,q)]).then(function (results) {
		if(results[0][0].length > 0){
			res.send('failed');
			
		}
		else{
			res.send('success');	
			
		}
	});
	
		
		

});

module.exports = app;