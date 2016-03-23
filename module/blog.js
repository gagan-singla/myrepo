var  util    = require('util');
     
var q = require('q');
var products = require('./products');
var common = require('./common');
var mysqli = require('./mysqli');
var url = require('url');
exports.blog = function(req,mysql,q,cnt)
{

     req.body.search = (typeof(req.param('search')) !== 'undefined') ? req.param('search') : '';
     $mysqli =  {'search':req.body.search};
    if(cnt == 0){
        strQuery = mysqli.mysqli($mysqli,151);
        var page = (req.body.page-1)*10;
        var escape_data =  [page];

    }else{
        strQuery = mysqli.mysqli($mysqli,'blogcnt');
        var escape_data =  [];
    }

     //page = 0;
    

    
     var defered = q.defer();
      
      
          
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
   
    query.on("error",function(err){
        console.log(err);
    });

    return defered.promise;
}
exports.recentblog = function(req,mysql)
{


     $mysqli =  {};
     strQuery = mysqli.mysqli($mysqli,167);
     page = 0
     var escape_data =  []; 
     
     var defered = q.defer();
      
      
          
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    
    return defered.promise;
}
exports.showblog = function(req,mysql)
{
  

     $mysqli =  {};
     strQuery = mysqli.mysqli($mysqli,97);
     
     var escape_data =  [req.body.id]; 
     
     var defered = q.defer();
      
      
          
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
    return defered.promise;
}