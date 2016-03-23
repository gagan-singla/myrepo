{include file="/admincp/header.tpl" nocache} 
<script src="http://ckeditor.com/latest/ckeditor.js"></script>
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  
  <div class="row">
    <div class="col-lg-12">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-laptop"></i> Upload CSV <i class="fa fa-hand-o-right"></i> <i class="fa fa-search"></i> </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  
  <div class="row">
    <div class="col-lg-12"> <a href="javascript: history.go(-1)" style="margin-bottom:10px" class="btn btn-success pull-right">&lt;&lt; Back</a> </div>
  </div>
 
   <form action="{$config.url}/admincp/etemps/import?method={$type.temptype}" enctype="multipart/form-data" method="post" id="pay_chk">
   
    <div class="form-group">
        <label>Upload the CSV File</label>
        <input name="csvs" data-parsley-group="block1" required id="csvs" accept=".csv" maxlength="99" type="file" class="form-control">
    </div>
     <div>&nbsp;</div>
   
    <div class="form-group">
      <input type="submit" class="btn btn-success" value="Save" />
    </div>
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