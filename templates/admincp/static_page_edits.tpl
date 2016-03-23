{include file="/admincp/header.tpl" nocache} 
<script src="http://ckeditor.com/latest/ckeditor.js"></script>
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  
  <div class="row">
    <div class="col-lg-12">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-laptop"></i> Static Pages <i class="fa fa-hand-o-right"></i> <i class="fa fa-search"></i> {$content.name} </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  
  <div class="row">
    <div class="col-lg-12"> <a href="javascript: history.go(-1)" style="margin-bottom:10px" class="btn btn-success pull-right">&lt;&lt; Back</a> </div>
  </div>
  {if $success}
  <div class="alert alert-success"> <strong>{$error}!</strong> </div>
  {/if}
  {if $failure}
  <div class="alert alert-danger"> <strong>{$error}!</strong> </div>
  {/if}
  <form action="{$config.url}/admincp/static/pages" method="post" id="pay_chk">
    <input type="hidden"  value="{$content.id}" name="id" />
    <div class="table-responsive">
      <textarea name="editor1">{$content.content}</textarea>
    </div>
    <input type="submit" class="btn btn-success" value="Save" />
  </form>
  
  <!-- /.row --> 
</div>

<script language="javascript" type="text/javascript">

var editor = CKEDITOR.replace( 'editor1', {
    allowedContent: true
});

editor.on( 'instanceReady', function() {
    console.log( editor.filter.allowedContent );
});

</script> 

{include file="/admincp/footer.tpl" nocache} 