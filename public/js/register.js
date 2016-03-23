function signUp()
{
  /*console.log($('#agree').is(":checked"));
 if(!$('#agree').is(":checked"))
     {
      alert('Please accept terms and conditions!');
      return false;
     }*/
	if(true === $('#registerform').parsley().validate('block1') )
	 {
    
	   checkSignup();
	 }
	 return false;
}
function checkTerms()
{
   if($('.check_opt input[type="checkbox"]').is(':checked'))
     {
         if(true === $('#registerform').parsley().validate()) {
             return true;
         }
       //checkSignup();
     } 
     else
     {
      alert('Please accept terms and conditions');
     } 
     return false;
}
function checkSignup()
{
	params = $('#registerform').serialize();;
  console.log(params);
  $.ajax({
  type: "POST",
  url: "register/save",
  data: params,
  
  success: function(data){
     if(data.error)
     {
       alert(data.reason);
     }
     else
     {
      lreload('/');
     } 
   }
  });
}