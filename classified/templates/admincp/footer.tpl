 </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->

    <script src="{$config.dpath}js/jquery.js"></script>
<script type="text/javascript">

var formFunction = '';
function closeAll()
{
  $.ajax({
        type: "GET",
        url: "{$config.url}/product/closeall",
        data: '',        
        success: function(data){
          console.log(2);
          console.log(data);
            
           
         }
        });
       
}
$(function() {
  console.log(2);
  closeAll();
  if(typeof(startDate) !== 'undefined')
  $("#date_added").datepicker({ minDate: startDate });

});
function intializeForm(form)
{
  formFunction = form;
}
function checkStateCity(form,id)
    {
      console.log(id);
      console.log("http://maps.googleapis.com/maps/api/geocode/json?address="+$('#'+form+' #zipcode').val());
      var params = {};
      if (window.XDomainRequest) {
            if (window.XDomainRequest) {
                var xdr = new XDomainRequest();
                var query = "http://maps.googleapis.com/maps/api/geocode/json?address="+$('#'+form+' #zipcode').val();
                if (xdr) {
                    xdr.onload = function () {
                      console.log(JSON.parse(xdr.responseText));
                        sZipcode(JSON.parse(xdr.responseText),form,id);
                     }
                    xdr.onerror = function () { /* error handling here */ }
                    xdr.open('GET', query);
                    xdr.send();
                }
            }
        }
        else {
       $.ajax({
        type: "GET",
        url: "http://maps.googleapis.com/maps/api/geocode/json?address="+$('#'+form+' #zipcode').val(),
        data: params,
        
        success: function(data){
          sZipcode(data,form,id);
            
           
         }
        });
       }
    }   
    function sZipcode(data,form,id)
    {
      console.log(data);
      if(data['results'].length > 0)
          {
            var m = data['results'][0]['address_components'].length;
           
           $('#'+form+' #city').val(data['results'][0]['address_components'][m-3]['long_name']);
           $('#'+form+' #state').val(data['results'][0]['address_components'][m-2]['long_name']);
           $('#'+form+' #country').val(data['results'][0]['address_components'][m-1]['long_name']);
           $('#'+form+' .addresscity').html($('#city').val()+','+$('#state').val()+','+$('#country').val());
           if(id == 1)
           {
             $('#'+form).submit();
           }  
           if(id == 2)
           {
             formFunction();
           }
          }
          else
          {
            alert('Invalid Zipcode');
            //$('#'+form+' #zipcode').focus();
            $('#'+form+' .addresscity').html('Invalid Zipcode');
            return false;
          }
    }
</script>
{foreach $external2js as $key => $val}
 <script src="{$config['externaljs']}{$val}.js"  type="text/javascript"></script>
{/foreach}
    <!-- Bootstrap Core JavaScript -->
    <script src="{$config.dpath}js/bootstrap.min.js"></script>
    <script src="{$config.dpath}js/common.js"></script>

   

</body>

</html>
