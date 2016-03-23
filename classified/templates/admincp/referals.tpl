{include file="/admincp/header.tpl" nocache}
<div class="container-fluid"> 
  
  <!-- Page Heading -->
  
  <div class="row">
    <div class="col-lg-12" style="margin-top:2%;">
      <ol class="breadcrumb">
        <li class="active"> <i class="fa fa-user"></i> Users <i class="fa fa-hand-o-right"></i> <i class="fa fa-edit"></i> referral </li>
      </ol>
    </div>
  </div>
  <!-- /.row -->
  
  <div class="row"> </div>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name / Email</th>
          <th>Referrer Name / Email</th>
          <th>Joined</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {$referralcount = 0}
      {foreach $referral as $refer}
      {$referralcount = 1}
      <tr>
        <td><a href=""><img width="50" height="50" src="{if $refer.avatar == ''} {$config['imgpath']}no_img.png {else if $refer.avatar != ''}{$config['url']}/uploads/profile/{$refer.avatar}{/if}" title="" alt="" align="center"></a></td>
        <td>{$refer.first_name} {$refer.last_name} / {$refer.email}</td>
        <td>{$refer.refererFname} {$refer.refererLname} / {$refer.refererEmail}</td>
        <td>{$refer.added}</td>
        <td>{if $refer.status == 1} 
             Approved
             {elseif $refer.status == 0}
              <a href="{$config.url}/admincp/referral?rid={$refer.id}&ruid={$refer.from_id}" > Approve </a>
             {/if}
        </td>
      </tr>
      {/foreach}
      {if $referralcount ==0}
         <tr>
             <td colspan="5">
                 No referrals found !!!
             </td>
         </tr>
      {/if}
        </tbody>
      
    </table>
    {$pagination_html} </div>
  
  <!-- /.row --> 
</div>
{include file="/admincp/footer.tpl" nocache} 