{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Category Questions of {$ctitle} </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
    <div class="col-lg-12"> {if $error == 'saved'}
      <div class="alert alert-success"> <strong>Saved!</strong> {$categories.name} categories was successfully changed. </div>
      {elseif $error != ''}
      <div class="alert alert-danger"> <strong>{$error}</strong> </div>
      {/if}</div>
      <div class="row">
          <div class="col-lg-12">
            <a href="{$config.url}/admincp/cquestionadd/{$id}" class="btn btn-success">Add Questions</a>
          </div>
      </div><br>
      <div class="row">
        <div class="col-md-12 m-top-20">
          
           <table class="table table-bordered table-hover">
              <thead><td>Name</td><td>Value</td><td>Type</td><td>Default</td><td>Required</td><td>Edit</td></thead>
              {foreach $questions as $key=>$val}
                <tr><td>{$val.name}</td><td>{$val.value}</td><td>{$val.type}</td><td>{$val.default}</td><td>{if $val.required == 1}Yes {else if $val.required == 0} No {/if}</td><td><a href="{$config.url}/admincp/cquestionedit/{$val.cid}/{$val.id}">Edit</a></td></tr>
              {/foreach}
           </table>
        </div>  
      </div>  

    </div>
    
  </div>
 </div> 

{include file="/admincp/footer.tpl" nocache} 