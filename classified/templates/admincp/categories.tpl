{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Categories <i class="fa fa-hand-o-right"></i> <i class="fa fa-list"></i> List </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
    <div class="col-lg-12"> <a name="admin_product_add" href="{$config.url}/admincp/categories/add" class="btn btn-success btn-right" value="Add New Category" title="Add">Add New Category</a> <br /><br /></div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Categories</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {$categoriescount = 0}
          {foreach $categories as $key => $val}
          {$categoriescount = 1}
          <tr>
            <td>{if $val.parent_id > 0} -- {/if}{$val.name}</td>
            <td>{$val.description}</td>
            <td><a href="{$config.url}/admincp/cquestions/{$val.id}">Questions</a><br /><a href="{$config.url}/admincp/categories/edit/{$val.id}">Edit</a><br /><a href="javascript:void(0);" onclick="PopupBox('{$config.url}/admincp/categoriesdelete/{$val.id}','Are you sure you want to delete this?.It will delete subcategories  and close the projects belong to this category')">Delete</a></td>
          </tr>
          {/foreach}
          {if $categoriescount == 0}
         <tr>
             <td colspan="3">
                 No categories found !!!
             </td>
         </tr>
         {/if}
            </tbody>
          
        </table>
        {$pagination_html} </div>
    </div>
  </div>
  
  <!-- /.row --> 
</div>
{include file="/admincp/footer.tpl" nocache} 