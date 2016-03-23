{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Shipping API</li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  
  <div class="col-md-12">
  
  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
         
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-down"></span>  Shipping Settings</div>
        </a>
      
      </h4>
      <div class="clear"></div>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
    
     <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                        <tr>
                                        <td>
                                       <div style="font-weight:bold">Would you like to enable the Shipping API?</div>

                                        </td>
                                        <td>
                                        <label class="radio-inline">
  										<input type="radio" checked="checked" name="usert"> Yes
										</label>
										<label class="radio-inline">
  										<input type="radio" name="usert"> No
										</label></td>
                                        <td><input type="text"  class="form-control sortb1" value="90"></td>
                                        </tr>
                                       
                                        </table>
                                       
                                        </div> 
                                        
                                        <div class="col-md-12 form-group"> 
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
      									</form>
     								  	</div>
    
    
      </div>
    </div>
  </div>
 
  
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-up"></span> FedEx Shipping API</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
       
            <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                        <tr>
                                        <td>FedEx Account Number</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="10"></td>
                                        </tr>
                                        <tr>
                                        <td>FedEx Meter Number</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="20"></td>
                                        </tr>
                                        <tr>
                                        <td>FedEx Password</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="30"></td>
                                        </tr>
                                        <tr>
                                        <td>FedEx Developer Key</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="40"></td>
                                        </tr>
                                       
                                        </table>
                                        
                                        </div> 
                                        
                                        <div class="col-md-12 form-group"> 
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
     									</form>
     								  	</div>
       
      </div>
    </div>
  </div>

<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFour">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-up"></span> UPS Shipping API</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body">
        
        
            <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                       <tr>
                                        <td>UPS Access ID</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="10"></td>
                                        </tr>
                                        <tr>
                                        <td>UPS Username</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="20"></td>
                                        </tr>
                                        <tr>
                                        <td>UPS Password</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="30"></td>
                                        </tr>
                                        <tr>
                                        <td>UPS Server</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="40"></td>
                                        </tr>
                                        </table>
                                        
                                        </div> 
                                        
                                        <div class="col-md-12 form-group"> 
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
     									</form>
     								  	</div>
        
      </div>
    </div>
  </div> 
  
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFive">
      <h4 class="panel-title">
        <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
         
<div class="col-sm-8 privacy4"><span class="glyphicon glyphicon-chevron-up"></span> USPS Shipping API</div>
        </a>
      </h4>
        <div class="clear"></div>
    </div>
    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
      <div class="panel-body">
       
       
           <div class="table-responsive"> 
     <form>
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                     
                                        <th>Description</th>
                                        <th>Value</th>
                                        <th>Sort</th>
                                        </tr>
                                        </thead>
                                       <tr>
                                        <td>USPS Login</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="10"></td>
                                        </tr>
                                        <tr>
                                        <td>USPS Password</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="20"></td>
                                        </tr>
                                        <tr>
                                        <td>USPS Server URL</td>
                                        <td><input type="text"  class="form-control" value=""></td>
                                        <td><input type="text"  class="form-control sortb1" value="30"></td>
                                        </tr>
                                        
                                        </table>
                                        
                                        </div>   
                                        
                                        <div class="col-md-12 form-group">  
      
       								 	<button name="submit" class="btn btn-success">Save</button> 
     									</form>
     								  	</div>
       
      </div>
    </div>
  </div>  
  
  
  
  </div> 
  
  <div class="col-md-12 reports2 sear">Shipping Services API</div>
  <div class="col-lg-12 reports1">  
    
    Below you can manage shipping partners which sellers can chose from when posting product auctions
  
   </div>
   <div class="pull-left">
  <a href="#" class="btn btn-success"> Add New Shipping Service</a>
  </div>
  <div class="clear"></div>
  <div class="table-responsive">
                            <table class="table  table-hover ship">
                                <thead>
                                    <tr>
                                       <th>Title / Tracking URL</th>
                                        <th>Carrier</th>
                                        <th>Carrier code</th>
                                        <th>Domestic</th>
                                         <th>Intl</th>
                                          <th>Action</th>
                                           <th>Sort</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>

                                
                                        <tr>
                                      <td><div class="marb"><input type="text" class="form-control" value="Express Saver"></div>
                                      <div><input type="text" class="form-control trac" value="http://www.fedex.com/Tracking?action=track&tracknumbers="></div></td>
                                    <td><input type="text" class="form-control" value="fedex"></td>
                                    <td><input type="text" class="form-control" value="FEDEX_EXPRESS_SAVER"></td>
                                    <td align="center"><input type="checkbox" checked="checked"></td>
                                    <td align="center"><input type="checkbox"></td>
                                    <td align="center"><input type="checkbox" checked="checked"></td>
                                    <td ><input type="text" class="form-control sortb1"></td>
                                   </tr>
                                     <tr>
                                      <td><div class="marb"><input type="text" class="form-control" value="Ground"></div>
                                      <div><input type="text" class="form-control trac" value="http://www.fedex.com/Tracking?action=track&tracknumbers="></div></td>
                                      <td><input type="text" class="form-control" value="fedex"></td>
                                    <td><input type="text" class="form-control" value="FEDEX_EXPRESS_SAVER"></td>
                                    <td align="center"><input type="checkbox" checked="checked"></td>
                                    <td align="center"><input type="checkbox"></td>
                                    <td align="center"><input type="checkbox" checked="checked"></td>
                                    <td ><input type="text" class="form-control sortb1"></td>
                                   </tr>
                                        <tr>
                                      <td><div class="marb"><input type="text" class="form-control" value="Ground"></div>
                                      <div><input type="text" class="form-control trac" value="http://www.fedex.com/Tracking?action=track&tracknumbers="></div></td>
                                      <td><input type="text" class="form-control" value="fedex"></td>
                                    <td><input type="text" class="form-control" value="FEDEX_EXPRESS_SAVER"></td>
                                    <td align="center"><input type="checkbox" checked="checked"></td>
                                    <td align="center"><input type="checkbox"></td>
                                    <td align="center"><input type="checkbox" checked="checked"></td>
                                    <td ><input type="text" class="form-control sortb1"></td>
                                   </tr>
                                                                
                                 
                                
                                

                                </tbody>
                            </table>
                            
                            
                            <ul class="pagination" total="24"><li class="active paginator-page-first"><a href="javascript:paginationSearch(1)">1</a></li><li class="paginator-page paginator-page-last"><a href="javascript:paginationSearch(2)">2</a></li><li><a class="ptrans" href="javascript:paginationSearch(2)">Next</a></li><li><a class="ptrans" href="javascript:paginationSearch(2)"><span aria-hidden="true">»</span></a></li></ul>
                            
                        </div>
  
  </div>   
  
</div> 



{include file="/admincp/footer.tpl" nocache} 


<script>

$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});

</script>



<style type="text/css">

td {
	border-top:none !important;
}
</style>