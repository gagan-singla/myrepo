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
         
      </div>
      <div class="row">
        <div class="col-md-12 m-top-20">
          <form method="POST" enctype="multipart/form-data" class="admin_form" data-parsley-validate name="add-product" id="add-product" action="/admincp/cquestions/save">   
            <input type="hidden" value="{$cid}" name="cid" />  
            <input type="hidden" value="{$id}" name="id" /> 
            <div class="form-group">
              <label>Category Name</label>
              {$ctitle}
            </div>
             <div class="form-group">
              <label>Question Name</label>
              <input name="name" data-parsley-group="block1" data-parsley-required  value="{$questions.name}"  type="text" class="form-control">
            </div>
             <div class="form-group">
              <label>Question Type</label>
              <select name="type" data-parsley-group="block1" data-parsley-required  class="form-control">
                <option value="int" {if $questions.type == 'int'} selected {/if}>Int</option>
                <option value="float" {if $questions.type == 'float'} selected {/if}>Float</option>
                <option value="input" {if $questions.type == 'input'} selected {/if}>Input</option>
                <option value="textarea" {if $questions.type == 'textarea'} selected {/if}>Textarea</option>
                <option value="dropdown" {if $questions.type == 'dropdown'} selected {/if}>Dropdown</option>
                <option value="checkbox" {if $questions.type == 'checkbox'} selected {/if}>Checkbox</option>
                <option value="radio" {if $questions.type == 'radio'} selected {/if}>Radio</option>
              </select>
            </div>
            <div class="form-group">
              <label>Multiple Values(use | to seperate multiple values (eg : cake|icecream|fruits))</label>
              <input name="value" data-parsley-group="block1" value="{$questions.value}"  type="text" class="form-control">
            </div>
            <div class="form-group">
              <label>Default Value</label>
              <input name="default" data-parsley-group="block1" value="{$questions.default}"  type="text" class="form-control">
            </div>
             <div class="form-group">
              <label>Required</label>
              <input name="required" data-parsley-group="block1" value="1"  type="radio" {if $questions.required == 1} checked {/if}> Yes
              <input name="required" data-parsley-group="block1" value="0"  type="radio" {if $questions.required != 1} checked {/if}> No
            </div>
           <input name="submit_user_profile" class="btn btn-warning" value="Reset" title="Reset" class="fl" type="reset">
           <input name="admin_product_add" class="btn btn-success" value="Save" title="Add" class="fl" type="submit">
         </form>
        </div>  
      </div>  

    </div>
    
  </div>
 </div> 

{include file="/admincp/footer.tpl" nocache} 