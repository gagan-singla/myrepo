{include file="/admincp/header.tpl" nocache} 
<script src="http://ckeditor.com/latest/ckeditor.js"></script>
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  
  <div class="row">
    <div class="col-lg-12">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-laptop"></i> Add SMS Templates <i class="fa fa-hand-o-right"></i> <i class="fa fa-search"></i> </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  
  <div class="row">
    <div class="col-lg-12"> <a href="javascript: history.go(-1)" style="margin-bottom:10px" class="btn btn-success pull-right">&lt;&lt; Back</a> </div>
  </div>
 
   <form action="{$config.url}/admincp/addstemps" method="post" id="pay_chk">
    <input type="hidden"  value="{$temp_details.id}" name="id" />
    <div class="form-group">
        <label>Event title</label>
        <input name="sms_name" data-parsley-group="block1" required id="sms_name" value="{$temp_details.title}" maxlength="99" value="" onKeyUp="return limitlength(this,99,'info_label')" type="text" class="form-control" {if $temp_details.title != ''}readonly{/if}>
    </div>
    <div class="form-group">
        <label>Subject</label>
        <input name="sms_suject" data-parsley-group="block1" required id="sms_suject" value="{$temp_details.subject}" maxlength="99" value="" onKeyUp="return limitlength(this,99,'info_label')" type="text" class="form-control">
    </div>

    <div class="form-group">
        <label>Type</label>
        <select class="form-control" name="sms_type">
            <option value="global" {if $temp_details.type == 'global'} selected {/if}>Global</option>
            <option value="product" {if $temp_details.type == 'product'} selected {/if}>Product</option>
            <option value="service" {if $temp_details.type == 'service'} selected {/if}>Service</option>
          </select>
    </div>
      <div>&nbsp;</div>
    <div class="form-group">
    <div class="table-responsive">
    <label>Template</label><br/>
      <textarea style="width:500px;height:150px;" name="editor1" required>{$temp_details.template}</textarea>
    </div>
    </div>
     <label>Users of Template</label>
    <div class="checkbox chk12 newadmclr">

    <label class="newadmclr">
      <input type="checkbox" name="buyer" data-parsley-multiple="mymultiplelink" class="auction" data-parsley-mincheck="1" {if $temp_details.buyer} checked {/if}>
      Buyer </label>
    </div>
    <div class="checkbox chk12 newadmclr">
    <label class="newadmclr">
      <input type="checkbox" name="seller" data-parsley-multiple="mymultiplelink" class="auction"  data-parsley-mincheck="1" {if $temp_details.seller} checked {/if}>
      Seller </label>
    </div>
    <div class="checkbox chk12 newadmclr">
    <label class="newadmclr">
      <input type="checkbox" name="admin" data-parsley-multiple="mymultiplelink" class="auction"  data-parsley-mincheck="1" {if $temp_details.admin} checked {/if}>
      Admin </label>
    </div>
    <div class="checkbox chk12 newadmclr">
    <label class="newadmclr">
      <input type="checkbox" name="general" data-parsley-multiple="mymultiplelink" class="auction" data-parsley-mincheck="1" {if $temp_details.general} checked {/if}>
      General </label>
    </div>

    <div class="form-group">
      <input type="submit" class="btn btn-success" value="Save" />
    </div>
  </form>
  
  <!-- /.row --> 
</div>


{include file="/admincp/footer.tpl" nocache} 