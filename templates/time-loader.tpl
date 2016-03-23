<script>   
timeProject['{$val.id}'] = new Date('{$datenow}');   
clearvar['{$val.id}'] = setInterval(function(){});
clock['{$val.id}'] = document.getElementById('my{$val.id}')
,targetDate['{$val.id}'] = new Date('{$val.closed}'); 
 
  clock['{$val.id}'].innerHTML = countdown(targetDate['{$val.id}']).toString();
  setIntreval('{$val.id}','{$val.market_status}');

  var pid = '{$val.id}';

      var dt = '{$val.closed}';
     // console.log(dt);
       var resultss = {
            id: pid,
            date: dt,
            price:'{$val.wprice}',
      pric_l : $('.pric_l').html(),
      bid_history :  $('.bid_history').html()    
        }
    //console.log(resultss);
    socket.on('bidAddtime', function(msg){
        var checkval = '#price'+msg.id;

    // meee(msg.id,msg.date);
       
    
 if(typeof(msg.price)!='undefined'&&msg.price>0 && '#price{$val.id}' == checkval)
 {

         $('#price{$val.id}').html(msg.price);
         // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");

 }


    meee(msg.id,msg.date,msg.price);
    });

   // socket.emit('bidAddtime', resultss);
    


  </script> 