var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');

exports.getCategory = function(req,mysql,q,ques_type)
{
    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 950);
    var defered = q.defer();
    var escape_data = [ques_type];
    console.log(escape_data)
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;
}

exports.add_question = function(req,mysql,q,image){
	$mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 951);
    var title = req.body.title;
    var board = req.body.board_options;
    var description = req.body.detail_question;
    var image_name = image;
    datge = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var defered = q.defer();
    var escape_data = [board,req.session.userid,title,description,image_name,datge];
    console.log(escape_data)
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;
}

exports.getQuestion = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 952);
    var defered = q.defer();
    var escape_data = [id];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.getAnswer = function(req,mysql,q,id,count){

    $mysqli = {};
    
    var defered = q.defer();
    
    if (count == 1) {
        
        strQuery = mysqli.mysqli($mysqli, 953);
        var page = (req.body.page - 1) * 5;
        var escape_data = [id,page];
    }
    else {
        strQuery = mysqli.mysqli($mysqli, 980);
        var escape_data = [id];
    }
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.add_answer = function(req,mysql,q,image){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 954);
    var title = req.body.answer_title;
    var ques_id = req.body.qid;
    var description = req.body.detail_answer;
    var image_name = image;
    datge = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var defered = q.defer();
    var escape_data = [req.session.userid,ques_id,title,image_name,description,datge];
    console.log(escape_data)
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;
}
exports.addkudos_q = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 955);
    var defered = q.defer();
     datge = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var escape_data = [req.session.userid,req.body.quests,0,datge];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.getKudos = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 956);
     var defered = q.defer();
    var escape_data = [id,req.session.userid];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.countKudos = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 957);
    var defered = q.defer();
    var escape_data = [id];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.addkudos_a = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 955);
    var defered = q.defer();
     datge = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var escape_data = [req.session.userid,req.body.quests,req.body.ansid,datge];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.getAnsKudos = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 958);
     var defered = q.defer();
    var escape_data = [id,req.session.userid];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.solved_q = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 959);
     var defered = q.defer();
    var escape_data = [req.body.quests];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.solved_a = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 960);
     var defered = q.defer();
    var escape_data = [req.body.ansid];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.getAllcats = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 961);
     var defered = q.defer();
    var escape_data = [];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;



}
exports.cat_questions = function(req,mysql,q,id,cnt){

    $mysqli = {};
    
   
    if(cnt == 1)
    {
        strQuery = mysqli.mysqli($mysqli,962); 
        var escape_data =  [id];  
    }
    else
    {
        strQuery = mysqli.mysqli($mysqli,973); 
        page = (req.body.page - 1) * req.body.perlimit;
        var escape_data =  [id,page];  
    }
    var defered = q.defer();
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;
}

exports.notsol_q = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 963);
     var defered = q.defer();
    var escape_data = [req.body.quests];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.notsol_a = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 964);
     var defered = q.defer();
    var escape_data = [req.body.ansid];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}

exports.removekudos_q = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 965);
    var defered = q.defer();
   
    var escape_data = [req.session.userid,req.body.quests];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.removekudos_a = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 966);
    var defered = q.defer();
    var escape_data = [req.session.userid,req.body.ansid];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;
}

exports.getIdcats = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 967);
    var defered = q.defer();
    var escape_data = [id];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;



}

exports.updateforumcats = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 968);
    var defered = q.defer();
    var escape_data = [req.body.cat_name,req.body.id];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;


}

exports.addforumcats = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 969);
    var defered = q.defer();
    datge = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    var escape_data = [req.body.cat_name,datge];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;


}

exports.deleteforumcats = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 970);
    var defered = q.defer();
    var escape_data = [id];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}

exports.searched = function(req,mysql,q,searched){

    var where = "";


    for(var i =0; i < string.length; i++){

        if(i == 0) {
            where += "where title like '%"+string[i]+"%'";
        }
        else{

             where += " OR title LIKE '%"+string[i]+"%'";

        }
    
    
    }
    console.log(where);

    $mysqli = {where:where};
    strQuery = mysqli.mysqli($mysqli, 971);
    var defered = q.defer();
    var escape_data = [];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    console.log( query.sql );
    return defered.promise;

}

exports.all_questions = function(req,mysql,q,cnt){

    $mysqli = {};
    
   
    if(cnt == 1)
    {
        strQuery = mysqli.mysqli($mysqli,974); 
        var escape_data =  [];  
    }
    else
    {
        strQuery = mysqli.mysqli($mysqli,975); 
        page = (req.body.page - 1) * 10;
        var escape_data =  [page];  
    }
    var defered = q.defer();
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;
}

exports.deleteqs = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 976);
    var defered = q.defer();
    var escape_data = [id];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.deleteans = function(req,mysql,q,id){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 977);
    var defered = q.defer();
    var escape_data = [id];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.update_quest = function(req,mysql,q,image,id){

    $mysqli = {};
    
    var escape_data = [id];
    var title = req.body.title;
    var board = req.body.board_options;
    var description = req.body.detail_question;
    var image_name = image;
    
    
    if(image == 'no_updates'){

        strQuery = mysqli.mysqli($mysqli, 978);
        var escape_data = [board,title,description,id];
    }
    else{

        strQuery = mysqli.mysqli($mysqli, 979);
        var escape_data = [board,title,description,image_name,id];

    }

    var defered = q.defer();
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
exports.checkit = function(req,mysql,q){

    $mysqli = {};
    strQuery = mysqli.mysqli($mysqli, 981);
    var defered = q.defer();
    var escape_data = [req.body.quest];
    console.log( escape_data );
    query = mysql.query(strQuery, escape_data, defered.makeNodeResolver());
    return defered.promise;

}
