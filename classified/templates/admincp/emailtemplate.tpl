{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Email Templates Management </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="col-lg-12 padt2"> 
  <form name="emailtemp" action="" class="form-horizontal">
 
   <div class="col-md-8 reports2 padlef sear">Search Email Templates</div>
   
   <div class="clear"></div>
   
   <div class="form-group">
        <label class="col-sm-2 control-label">Subject</label>
        <div class="col-sm-6">
        <input type="text" placeholder="" class="form-control"></ul>
        </div>
        </div>
   
   <div class="form-group">
        <label class="col-sm-2 control-label">User type</label>
        <div class="col-sm-8">
        <label class="radio-inline">
  		<input type="radio"  checked="checked" name="usert" > Search all 
		</label>
		<label class="radio-inline">
  		<input type="radio" name="usert"> Buyers only
		</label>
        <label class="radio-inline">
  		<input type="radio" name="usert"> Sellers only
		</label>
        <label class="radio-inline">
  		<input type="radio" name="usert"> Admin only
		</label>
        <label class="radio-inline">
  		<input type="radio" name="usert"> General only
		</label>
        </div>
        </div>
   
   <div class="form-group">
        <label class="col-sm-2 control-label">Product</label>
        <div class="col-sm-4">
         <select class="form-control" >
          <option value="ilance">Auctionsoftware</option>
          <option value="lancekb">Knowledge Base</option>
          <option value="ioffer">IOffer</option>
          <option value="lanceads">IAdvertiser</option>
          <option value="stores">Stores</option>
        </select>
        </div>
      </div>
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Type</label>
        <div class="col-sm-4">
         <select class="form-control" >
         <option value="">All</option>
         <option value="global">Global</option>
         <option value="product" selected="selected">Product</option>
         <option value="service">Service</option>
        </select>
        
         </div>
      </div>
      
      <div class="col-md-12 form-group">
      <label class="col-sm-2 control-label"></label>
      <div class="col-sm-4">
       <button name="submit" class="btn btn-success">Search</button> 
       </div>
      </div>
   </form>
 <div class="col-md-12 reports2 sear">Email Templates</div>
  
  <div class="pull-left">
  <a href="#" class="btn btn-success"> Add New Email Template</a>
  </div>
 
  <div class="pull-right padt1">
  <a href="#" class="btn btn-success"> Export</a>
  </div>
 
   <div class="pull-right padt1">
   
   <div class="fileUpload btn btn-success">
    <span>Import</span>
    <input type="file" class="upload">
	</div>

  </div>
  </div>
  <div class="col-lg-12">
  
  <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                       <th>Select</th>
                                        <th>Event</th>
                                        <th>Subject</th>
                                        <th>Buyer</th>
                                         <th>Seller</th>
                                          <th>Admin</th>
                                           <th>General</th>
                                        <th>Product</th>
                                        <th>Type</th>
                                        <th colspan="2" style="text-align:center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                
                                                                <tr>
                                                                <td align="center"><input type="checkbox" /></td>
                                    <td>verification</td>
                                    <td>{{event.user}}, Please Verify Your {{event.sitename}} Account</td>
                                    <td align="center"><input type="checkbox" checked="checked"/></td>
                                    <td align="center"><input type="checkbox" /></td>
                                    <td align="center"><input type="checkbox" checked="checked"/></td>
                                    <td align="center"><input type="checkbox" /></td>
                                    <td>Auctionsoftware</td>
                                    <td>Global</td>
                                    <td><a href="#">Edit</a></td>
                                    <td><a href="#">Delete</a></td>
                                </tr>
                                                                <tr>
                                                                <td align="center"><input type="checkbox" /></td>
                                    <td>Signed Up</td>
                                    <td>Welcome to {{event.sitename}}!</td>
                                 	<td align="center"><input type="checkbox" /></td>
                                    <td align="center"><input type="checkbox"checked="checked" /></td>
                                    <td align="center"><input type="checkbox" /></td>
                                    <td align="center"><input type="checkbox" /></td>
                                    <td>Auctionsoftware</td>
                                    <td>Global</td>
                                     <td><a href="#">Edit</a></td>
                                    <td><a href="#">Delete</a></td>
                                </tr>
                                                                <tr>
                                                                <td align="center"><input type="checkbox" /></td>
                                    <td>bid_submitted</td>
                                    <td>Your Bid Submitted Successfully!</td>
                                	 <td align="center"><input type="checkbox" /></td>
                                    <td align="center"><input type="checkbox" /></td>
                                    <td align="center"><input type="checkbox" checked="checked"/></td>
                                    <td align="center"><input type="checkbox" /></td>
                                     <td>Auctionsoftware</td>
                                    <td>Service</td>
                                     <td><a href="#">Edit</a></td>
                                    <td><a href="#">Delete</a></td>
                                </tr>
                                                                <tr>
                                                                <td align="center"><input type="checkbox" /></td>
                                    <td>watchlist_added</td>
                                    <td>Item Successfully Added to your Watchlist</td>
                                    <td align="center"><input type="checkbox" /></td>
                                    <td align="center"><input type="checkbox" /></td>
                                    <td align="center"><input type="checkbox" /></td>
                                    <td align="center"><input type="checkbox" checked="checked"/></td>
                                     <td>Auctionsoftware</td>
                                    <td>Global</td>
                                     <td><a href="#">Edit</a></td>
                                    <td><a href="#">Delete</a></td>
                                </tr>
                                 
                                
                                

                                </tbody>
                            </table>
                            
                            
                            <ul class="pagination" total="24"><li class="active paginator-page-first"><a href="javascript:paginationSearch(1)">1</a></li><li class="paginator-page paginator-page-last"><a href="javascript:paginationSearch(2)">2</a></li><li><a class="ptrans" href="javascript:paginationSearch(2)">Next</a></li><li><a class="ptrans" href="javascript:paginationSearch(2)"><span aria-hidden="true">»</span></a></li></ul>
                            
                        </div>
  
  </div> 
   
   
 </div> 
</div> 

{include file="/admincp/footer.tpl" nocache} 


<style type="text/css">

.form-horizontal .control-label {

  text-align: left;
}

</style>