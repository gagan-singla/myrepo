{include file="common/header-1.tpl" nocache} 
{include file="time-common-loader.tpl" nocache}

<div class="row">
 
  {assign var="proj" value=$projects.open_project}

  {include file="projects-home.tpl" nocache} 

  </div>

</div>
<script type="text/javascript"> 



  
  function timermee(id,dateee)
  {  

   clearInterval(clearvar[id]);
    clock[id] = document.getElementById('my'+id)
    , targetDate[id] = new Date(dateee); // Jan 1, 2050;
 
  clock[id].innerHTML = countdown(targetDate[id],'hours').toHTML();
  clearvar[id] =  setInterval(function(){
  
  if(targetDate[id]>new Date())
    clock[id].innerHTML = countdown(targetDate[id],'hours').toHTML();
  else
  clock[id].innerHTML = 'Closed';  
    }, 1000);
    
  }
     
     socket.on('bidAddtime', function(msg){   
     meee(msg.id,msg.date,msg.price);

     });

</script> 
{include file="common/footer-1.tpl" nocache}