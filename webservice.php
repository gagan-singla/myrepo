<?php
 header("Access-Control-Allow-Origin: *");
 error_reporting(0);
 $global = array();
 $global['lft'] = 0;
 $global['right'] = 0;
 $global['total'] = 0;
 $global['output'] = array();
  $global['i'] = 0;
 function traverse($cat,$start)
 {
   global $global;
  
   if(count($global['result'][$cat.'_'.$start]) > 0)
   {
   	   foreach ($global['result'][$cat.'_'.$start] as $key => $value) {
   	   	    $global['i']++;
   	   	    $global['right']++;
   	   	    $global['output'][$value]['lft'] = $global['right'];  
            traverse($cat,$value);
            $global['right']++;
            $global['output'][$value]['rht'] = $global['right'];
             //echo $value.'-';
   	   }
   }
   else
   {


		   if($global['i'] >=  $global['total'])
		   {
		             return true;
		   }
		   else
		   {
		   	    $global['i']++;
		   	    traverse($cat,intval($start)+1);
		   }	
	}	   

   

 }

 if(isset($_REQUEST['cmd']) && $_REQUEST['cmd'] == '_category_module')
 {
	 //var_dump($_REQUEST);
	$dump = json_decode($_REQUEST['data']);
	$result = array();
	foreach ($dump as $key => $value) {
		$global['total'] += count($value);
	    $result[$key] = $value;
	}
	$global['result'] = $result;
	//var_dump($global);
	traverse('cat',0);
    echo json_encode($global['output']);
    exit();
 }

 
?>