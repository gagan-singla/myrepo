{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Email / SMS Management </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="col-lg-12 padt2"> 
 
 <div class="col-md-12 reports2 sear">Email / SMS Management</div>
  
 
  </div>
  <div class="col-lg-12">
  
  <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Options</th>
                                        <th>Api User</th>
                                        <th>Api Key</th>
                                        <th>Type</th>
                                        <th colspan="2" style="text-align:center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   
                              <tr>
                                                       
                                <td>{$local_id}</td>
                                <td>{$local_user}</td>
                                <td>{$local_pwd}</td>
                                <td>{$local_type}</td>
                                <td><a href="{$config.url}/admincp/settings/localmail">Edit</a>   |
                                {if $local_status == 'no'}
                                <a href="javascript:void(0)" onclick="activate('{$local_id}','{$local_type}')">Activate</a>  
                                {/if}
                                
                                {if $local_status == 'yes'}
                                <a href="javascript:void(0)" onclick="deactivate('{$local_id}','{$local_type}')">Deactivate</a> 
                                {/if}

                               <!-- <a href="javascript:void(0);" onclick="PopupBox2('{$config.url}/admincp/addmailer/delete/{$val.id}');">Delete</a>-->
                               </td>
                               
                               </tr>


                            <tr>
                                                       
                                <td>{$customerio_id}</td>
                                <td>{$customerio_api}</td>
                                <td>{$customerio_key}</td>
                                <td>{$customerio_type}</td>
                                <td><a href="{$config.url}/admincp/settings/customeriomail">Edit</a>   |
                                {if $customerio_status == 'no'}
                                <a href="javascript:void(0)" onclick="activate('{$customerio_id}','{$customerio_type}')">Activate</a>  
                                {/if}
                                
                                {if $customerio_status == 'yes'}
                                <a href="javascript:void(0)" onclick="deactivate('{$customerio_id}','{$customerio_type}')">Deactivate</a> 
                                {/if}

                               <!-- <a href="javascript:void(0);" onclick="PopupBox2('{$config.url}/admincp/addmailer/delete/{$val.id}');">Delete</a>-->
                               </td>

                            </tr>


                            <tr>
                                                       
                                <td>{$smstwo_id}</td>
                                <td>{$smstwo_sid}</td>
                                <td>{$smstwo_token}</td>
                                <td>{$smstwo_type}</td>
                                <td><a href="{$config.url}/admincp/settings/twilliosms">Edit</a>   |
                                {if $smstwo_status == 'no'}
                                <a href="javascript:void(0)" onclick="activate('{$smstwo_id}','{$smstwo_type}')">Activate</a>  
                                {/if}
                                
                                {if $smstwo_status == 'yes'}
                                <a href="javascript:void(0)" onclick="deactivate('{$smstwo_id}','{$smstwo_type}')">Deactivate</a> 
                                {/if}

                               <!-- <a href="javascript:void(0);" onclick="PopupBox2('{$config.url}/admincp/addmailer/delete/{$val.id}');">Delete</a>-->
                               </td>

                            </tr>
                            
                            
                               
                                </tbody>
                            </table>
                            
                            
                            <div class="pull-right">
                            
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