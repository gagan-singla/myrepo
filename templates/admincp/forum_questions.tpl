{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <!-- <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Email Templates Management </li>
      </ol> -->
    </div>
  </div>
  <!-- /.row -->
  <div class="col-lg-12 padt2"> 
  
 <div class="col-md-12 reports2 sear">Forum Questions</div>
  
  <!-- <div class="pull-left">
  <a href="{$config.url}/admincp/forum_cats/" class="btn btn-success">Add New Category</a>
  </div> -->
 
  
 
   

  </div>
  <div class="col-lg-12">
  
  <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Category Name</th>
                                        <th>Category</th>
                                        <th>Asked by</th>
                                        
                                        <th style="text-align:center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {$reviewcount = 0}
                                  {foreach $questions as $key => $val}   
                                {$reviewcount = 1}
                                                            <tr>
                                                           
                                <td><a href="{$config.url}/admincp/forumans/{$val.id}">{$val.title}</a></td>
                                <td>{$val.catname}</td>
                                <td>{$val.first_name} {$val.last_name}</td>
                                
                                <td><a href="javascript:void(0);" onclick="PopupBox2('{$config.url}/admincp/deletefq/{$val.id}');">Delete</a></td>
                            </tr>
                             {/foreach}
                             {if $reviewcount ==0}
                                 <tr>
                                     <td colspan="4">
                                       No Question available !!!
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