{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Stores <i class="fa fa-hand-o-right"></i> <i class="fa fa-list"></i> List </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
   
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class="row">
      {if $error != ''}<div class="alert alert-success">{$error}</div>{/if}
                   <form enctype="multipart/form-data" class="admin_form" data-parsley-validate method="get" enctype="multipart/form-data" action="{$config.url}/admincp/stores/">
                        
                         <div class="col-lg-4">
                            <div class="form-group">
                                <label>Enable Store</label>
                                <input  type="radio" {if $enabled == 'yes'} checked {/if} name="enable" value="yes">  Yes
                                
                                <input type="radio" {if $enabled == 'no'} checked {/if} name="enable" value="no">  No                                      
                            </div> 
                            <div class="form-group">
                                <label>Title</label>
                                <input class="form-control" name="title" value="{$search.title}">                               
                            </div>
                            <div class="form-group">
                                <label>Location</label>
                                <input class="form-control"  value="{$search.location}" name="location">
                            </div>
                          </div>  

                          <div class="col-lg-4">  
                          <div class="form-group">&nbsp;</div> 
                            <div class="form-group">
                                <label>Status</label>
                                 <select class="form-control" name="status">
                                    <option value="" {if $search.status == ''} selected {/if}>All</option>
                                    <option value="active"  {if $search.status == 'open'} selected {/if}>Active</option>
                                    <option value="inactive"  {if $search.status == 'closed'} selected {/if}>Inactive</option>
                                    
                                </select>
                            </div>
                             
                            <div class="form-group">
                                <br />
                              <button type="submit" class="btn btn-success"> <i class="fa fa-search"></i> Save/Search</button>
                           </div>
                          </div>   
                          
                           

                             
                        </form>
                 
                </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Store</th>
              <th>Location</th>
              <th>Products</th>
              <th>Sold</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {$referralcount = 0}
          {foreach $stores as $key => $val}
          {$referralcount = 1}
          <tr>
    
            <td>{$val.name}</td>
            <td>{$val.location}</td>
            <td>{$val.products}</td>
            <td>{if $val.saled == $nuller}0{else if $val.saled != $nuller}{$val.saled}{/if}</td>
            <td>{$val.status}</td>
            <td colspan="3"><a href="{$config.url}/admincp/stores/edit/{$val.id}">Edit</a>
            <a href="javascript:void(0);" onclick="PopupBox2('{$config.url}/admincp/stores/delete/{$val.id}');">Delete</a>
            <a href="{$config.url}/stores/view/{$val.id}" target="_blank">View</a></td>
          </tr>
          {/foreach}
          {if $referralcount ==0}
         <tr>
             <td colspan="9">
                 No stores are added!
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
  
  <!-- /.row --> 
</div>
{include file="/admincp/footer.tpl" nocache} 