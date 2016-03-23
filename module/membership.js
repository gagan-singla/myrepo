var common = require('./common');
var dateFormat = require('dateformat');
var mysqli = require('./mysqli');


var membership = module.exports = {};
membership.selectplanbyrole = function(req,mysql,q)
{
        $mysqli =  {};
        
        var escape_data =  [req.body.id];
        msq = 710;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
       query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.selectplanbypermission = function(req,mysql,q)
{
        $mysqli =  {};
        
        var escape_data =  [req.body.id];
        msq = 711;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.deletePlans = function(req,mysql,q)
{
        $mysqli =  {};
        
        var escape_data =  [req.body.id];
        msq = 703;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
       query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.deletemenbershipusers = function(req,mysql,q)
{
        $mysqli =  {};
        
        var escape_data =  [req.body.id];
        msq = 709;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.deleteRole = function(req,mysql,q)
{
        $mysqli =  {};
        
        var escape_data =  [req.body.id];
        msq = 705;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
       query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.deleteplanbyrole = function(req,mysql,q)
{
        $mysqli =  {};
        var escape_data =  [req.body.id];
        msq = 704;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.deletePermission = function(req,mysql,q)
{
        $mysqli =  {};
        
        var escape_data =  [req.body.id];
        msq = 708;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.deleteplanbypermission = function(req,mysql,q)
{
        $mysqli =  {};
        var escape_data =  [req.body.id];
        msq = 706;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.selectPackageDetail= function(req,mysql,q)
{
    $mysqli =  {};
    var escape_data =  [req.session.userid];
    msq = 211;

    strQuery = mysqli.mysqli($mysqli,msq);
    var defered = q.defer();

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
query.on('error',function(err)
        {
          throw err; 
        });
    return defered.promise;
}
membership.getUserRole = function(req,mysql,q)
{
        $mysqli =  {};
        var escape_data =  [req.session.userid];
        msq = 202;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.selectRoles  = function(req,mysql,q)
{
        $mysqli =  {};
        var escape_data =  [];
        msq = 184;
        	
		strQuery = mysqli.mysqli($mysqli,msq);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
		{
		  throw err; 
		});
		return defered.promise;
}
membership.selectPlan  = function(req,mysql,q)
{
        $mysqli =  {};
        var escape_data =  [];
        msq = 185;
        	
		strQuery = mysqli.mysqli($mysqli,msq);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
		{
		  throw err; 
		});
		return defered.promise;
}
membership.selectPermission  = function(req,mysql,q)
{
        $mysqli =  {};
        var escape_data =  [];
        msq = 186;
        	
		strQuery = mysqli.mysqli($mysqli,msq);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.saveRoles  = function(req,mysql,q)
{
        $mysqli =  {};
        if(req.body.id == 0)
        {
        	var escape_data =  [req.body.name,req.body.description];
            msq = 189;
        }	
        else
        {
        	var escape_data =  [req.body.name,req.body.description,req.body.id];
            msq = 190;
        }
        	
		strQuery = mysqli.mysqli($mysqli,msq);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.savePermission = function(req,mysql,q)
{
        $mysqli =  {};
        if(req.body.id == 0)
        {
            var escape_data =  [req.body.name,req.body.description];
            msq = 193;
        }   
        else
        {
            var escape_data =  [req.body.name,req.body.description,req.body.id];
            msq = 194;
        }
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.updateUserRole = function(req,mysql,q,data,update)
{
        $mysqli =  {};
        if(update == 0)
        {
            var escape_data =  [data.id,req.session.userid,data.status,data.paid_date,data.paid,data.date_added,data.renewal_period,data.recurring,data.subscribe];
            msq = 203;
        }   
        else
        {
            var escape_data =  [data.id,data.status,data.paid_date,data.paid,data.date_added,data.renewal_period,data.recurring,data.subscribe,req.session.userid];
            msq = 204;
        }

        strQuery = mysqli.mysqli($mysqli,msq);   
        //console.log(escape_data);
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.savePlans  = function(req,mysql,q)
{
        $mysqli =  {};
        if(req.body.id == 0)
        {
        	var escape_data =  [req.body.name,req.body.description,req.body.amount,req.body.length,req.body.type,req.body.plan,req.body.permission];
            msq = 191;
        }	
        else
        {
        	var escape_data =  [req.body.name,req.body.description,req.body.amount,req.body.length,req.body.type,req.body.plan,req.body.permission,req.body.id];
            msq = 192;
        }
       // console.log(escape_data);
		strQuery = mysqli.mysqli($mysqli,msq);	    
	    var defered = q.defer();
	    
		query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.showPermissionData = function(req,mysql,q)
{
        $mysqli =  {};
        
        var escape_data =  [];
        msq = 194;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
        query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.showPermissionGrabData = function(req,mysql,q)
{
        $mysqli =  {};
        
        var escape_data =  [req.body.id];
        msq = 195;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
       query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.savePermissionData = function(req,mysql,q,update,id,val)
{
        $mysqli =  {};
        if(update)
        {
             var escape_data =  [val,req.body.id,id];
             msq = 197;
        }    
        else
        {
            var escape_data =  [val,id,req.body.id];
             msq = 196;
        }    
       
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
       query.on('error',function(err)
        {
          throw err; 
        });
        return defered.promise;
}
membership.getUserMembership = function(req,mysql,q,id)
{
    $mysqli =  {};
        
        var escape_data =  [id];
        msq = 199;
            
        strQuery = mysqli.mysqli($mysqli,msq);      
        var defered = q.defer();
        
        query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
		query.on("error",function(err)
		{
			throw err;
		});
        return defered.promise;
}

membership.getUserPlan = function(req,mysql,q)
{
    $mysqli =  {};
    var escape_data =  [req.session.userid];
    msq = 210;

    strQuery = mysqli.mysqli($mysqli,msq);
    var defered = q.defer();

    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());

    query.on('error',function(err)
        {
          throw err; 
        });
    return defered.promise;
}

membership.getUserRolelogin = function(req,mysql,q,userid)
{
    $mysqli =  {};
    var escape_data =  userid;
    msq = 202;

    strQuery = mysqli.mysqli($mysqli,msq);
    var defered = q.defer();
 //console.log(userid);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());


    query.on('error',function(err)
        {
          throw err; 
        });
    return defered.promise;
}
membership.getuserdetails = function(req,mysql,q,userid)
{
    $mysqli =  {};
    var escape_data =  userid;
    msq = 844;

    strQuery = mysqli.mysqli($mysqli,msq);
    var defered = q.defer();
// console.log(userid);
    query =  mysql.query(strQuery,escape_data,defered.makeNodeResolver());
query.on('error',function(err)
        {
          throw err; 
        });
    return defered.promise;
}