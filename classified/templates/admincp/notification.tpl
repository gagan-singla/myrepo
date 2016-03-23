{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-sitemap"></i> Notification Management </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  <div class="row">
 
 <div class="col-md-12">
 <div class="col-md-4 col-sm-4">
 <div class="par3">Master email address</div>
 <div><input type="text" class="form-control" /></div>
 </div>
 <div class="col-md-4 col-sm-4"></div>
 <div class="col-md-3 col-sm-3">
 <div class="par3">Send test email?</div>
 <div><select class="form-control">
  <option>Select auction</option>
   <option >Yes</option>
  <option selected>No</option>
  
</select> </div>
 </div>
 </div>
 
 <div class="col-md-12 par2"><div class="col-md-12">Please whitelist the following email in your email application: support@auctionsoftware.com</div>
 </div>
 
<div class="col-md-12">
<div class="col-md-2 col-sm-2" style="padding-left:0;"><button class="btn btn-black" style=" font-size:14px;">Save</button></div>
 <div class="col-md-7 col-sm-7"></div>
  </div>
  
  <div class="col-md-12">
   <div class="col-md-12">
  <div class="col-md-12 search_tbar">
  <div class="col-md-7 sbar_lbl">
    Notifications
      </div>
      </div>
  <!--div class="col-md-1 sbar_lbl">
  Filter By
  </div>
  <div class="col-md-4">
    <select class="form-control" id="orderby">
      <option value="1">1 Weak</option>
      <option value="2">1 Month</option>
      
    </select>
  </div-->
  </div>
  <div class="col-md-12 par1">The marketplace sends email based on a wide variety of events that may occur as seen below. Some notifications such as Payment information will be sent regardless of your email preference setting.</div>
  <div class="col-md-12 par1" >
  <div>Show specific user type</div>
  <div>
  <label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked="checked"> All Type
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> Buyer
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> Seller
</label>
</div>
  </div>
  
  <div class="col-md-12 table-responsive">
  <table class="table stab">
  <tr>
  <th>Notification Title</th>
  <th style="text-align:center">Buyer</th>
  <th style="text-align:center">Seller</th>
  <th style="text-align:center">General</th>
  <th  style="text-align:center;">Email</th>
  </tr>
  
  <tr>
  <td>
  <div class="stab2"><img src="http://auctionsoftwaremarketplace.com:2001/images/mailbox.jpg" class="img-responsive" alt=""> Admin Changed user status</div>
  </td>
  <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td class="em"><input type="checkbox" name="" /></td>
  </tr>
  
   <tr>
  <td>
  <div class="stab2"><img src="http://auctionsoftwaremarketplace.com:2001/images/mailbox.jpg" class="img-responsive" alt=""> Bid retraction other user</div>
  </td>
 <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td class="em"><input type="checkbox" name="" /></td>
  </tr>
  
   <tr>
  <td>
  <div class="stab2"><img src="http://auctionsoftwaremarketplace.com:2001/images/mailbox.jpg" class="img-responsive" alt=""> Buy now escrow item payment funds secured</div>
  </td>
  <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td class="em"><input type="checkbox" name="" /></td>
  </tr>
  
  <tr>
  <td>
  <div class="stab2"><img src="http://auctionsoftwaremarketplace.com:2001/images/mailbox.jpg" class="img-responsive" alt=""> Buy now escrow purchase cancelled payment refund completed </div>
  </td>
 <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td class="em"><input type="checkbox" name="" /></td>
  </tr>
   <tr>
  <td>
  <div class="stab2"><img src="http://auctionsoftwaremarketplace.com:2001/images/mailbox.jpg" class="img-responsive" alt=""> Buy now escrow purchase cancelled payment refunded to buyer </div>
  </td>
  <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td align="center"><input type="checkbox" /></td>
  <td class="em"><input type="checkbox" name="" /></td>
  </tr>
  
  </table>
  
  
  <div class="col-md-12 padlef">
 <ul class="pagination" total="24"><li class="active paginator-page-first"><a href="javascript:paginationSearch(1)">1</a></li><li class="paginator-page paginator-page-last"><a href="javascript:paginationSearch(2)">2</a></li><li><a class="ptrans" href="javascript:paginationSearch(2)">Next</a></li><li><a class="ptrans" href="javascript:paginationSearch(2)"><span aria-hidden="true">»</span></a></li></ul>
  </div>
</div>
</div>
<div style="clear:both;"></div>
</div> 
   
   
 </div> 
</div> 

{include file="/admincp/footer.tpl" nocache} 


