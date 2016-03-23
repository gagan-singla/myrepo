{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> SMS Templates Management </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="col-lg-12 padt2"> 
  <form name="emailtemp" method="get" action="{$config.url}/admincp/smstemplate/search" class="form-horizontal">
 
   <div class="col-md-8 reports2 padlef sear">Search SMS Templates</div>
   
   <div class="clear"></div>
   
   <div class="form-group">
        <label class="col-sm-2 control-label">Subject</label>
        <div class="col-sm-6">
        <input type="text" name="subjects" value="{$search.subjects}" placeholder="" class="form-control">
        </div>
        </div>
   
   <div class="form-group">
        <label class="col-sm-2 control-label">User type</label>
        <div class="col-sm-8">
        <label class="radio-inline">
  		<input type="radio" checked name="users" value=""> Search all 
		</label>
		<label class="radio-inline">
  		<input type="radio" name="users" value="buyer" {if $search.users == 'buyer'}checked{/if}> Buyers only
		</label>
        <label class="radio-inline">
  		<input type="radio" name="users" value="seller" {if $search.users == 'seller'}checked{/if}> Sellers only
		</label>
        <label class="radio-inline"> 
  		<input type="radio" name="users" value="admin" {if $search.users == 'admin'}checked{/if}> Admin only
		</label>
        <label class="radio-inline">
  		<input type="radio" name="users" value="general" {if $search.users == 'general'}checked{/if}> General only
		</label>
        </div>
        </div>
   
   <!-- <div class="form-group">
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
      </div> -->
      
      <div class="form-group">
        <label class="col-sm-2 control-label">Type</label>
        <div class="col-sm-4">
         <select class="form-control" name="types">
         <option value="">All</option>
         <option value="global" {if $search.types == 'global'}selected{/if}>Global</option>
         <option value="product" {if $search.types == 'product'}selected{/if}>Product</option>
         <option value="service" {if $search.types == 'service'}selected{/if}>Service</option>
        </select>
        
         </div>
      </div>
      
      <div class="col-md-12 form-group">
      <label class="col-sm-2 control-label"></label>
      <div class="col-sm-4">
       <button type="submit" class="btn btn-success">Search</button> 
       </div>
      </div>
   </form>
 <div class="col-md-12 reports2 sear">SMS Templates</div>
  
  <div class="pull-left">
  <a href="{$config.url}/admincp/addsmstemplate" class="btn btn-success"> Add New SMS Template</a>
  </div>
 
  <div class="pull-right padt1">
   <a href="{$config.url}/admincp/templateexport" style="margin-bottom:10px" class="btn btn-success pull-right">Export</a>

  </div>
 
   <div class="pull-right padt1">
   
  
   <a href="{$config.url}/admincp/templateimport?temptype=sms" style="margin-bottom:10px" class="btn btn-success pull-right">Import</a>


  </div>

  </div>
  <div class="col-lg-12">
  
  <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                       
                                        <th>Event</th>
                                        <th>Subject</th>
                                        <th>Buyer</th>
                                         <th>Seller</th>
                                          <th>Admin</th>
                                           <th>General</th>
                                        <th>Type</th>
                                        <th colspan="2" style="text-align:center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {$reviewcount = 0}
                                 {foreach $templates as $key => $val}   
                                {$reviewcount = 1}
                                                            <tr>
                                                           
                                <td>{$val.title}</td>
                                <td>{$val.subject}</td>
                                <td align="center"><input type="checkbox" {if $val.buyer == 1}checked="checked"{/if} disabled readonly /></td>
                                <td align="center"><input type="checkbox" {if $val.seller == 1}checked="checked"{/if} disabled readonly/></td>
                                <td align="center"><input type="checkbox" {if $val.admin == 1}checked="checked"{/if} disabled readonly/></td>
                                <td align="center"><input type="checkbox" {if $val.general == 1}checked="checked"{/if} disabled readonly/></td>
                                <td>{$val.type}</td>
                                <td><a href="{$config.url}/admincp/stemps/edit/{$val.id}">Edit</a></td>
                                <td><a href="javascript:void(0);" onclick="PopupBox2('{$config.url}/admincp/stemps/delete/{$val.id}');">Delete</a></td>
                            </tr>
                             {/foreach}
                             {if $reviewcount ==0}
                                 <tr>
                                     <td colspan="9">
                                       No Email Templates found !!!
                                     </td>
                                 </tr>
                             {/if}
                                </tbody>
                            </table>
                            
                            
                            <div class="pull-right">
                              {$pagination_html}
                            </div>
                            
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