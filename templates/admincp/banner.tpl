{include file="/admincp/header.tpl" nocache}
<div class="container-fluid">

                <!-- Page Heading -->
                
                <div class="row">
                    <div class="col-lg-12" style="margin-top:2%;">
                        
                        <ol class="breadcrumb">
                            <li class="active">
                                <i class="fa fa-laptop"></i> Banner <i class="fa fa-hand-o-right"></i> <i class="fa fa-search"></i> List
                            </li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->

                <div class="row">
                   
                 
                </div>    
                
{if $success}
<div class="alert alert-success"> <strong>{$error}!</strong> </div>
{/if}
{if $failure}
<div class="alert alert-danger"> <strong>{$error}!</strong> </div>
{/if}
<form action="" method="post" id="pay_chk">
<div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Enable</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {if $banner > 0}
                                 {foreach $banner as $key => $val} 
                                 
                                    <tr>
                                        <td>{$val.title}</td>
                                        
                                        <td><a href="#" title="{$val.image}"> <img src="{if $val.image == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}banner/{$val.image}{/if}" width="50" height="50" alt="1"></a></td>
                                        <td>{if $val.enable == 1}Enabled{/if}{if $val.enable == 0}Disabled{/if}</td>
                                        <td><a href="{$config.url}/admincp/banner/edit?id={$val.id}" title="{$val.image}">Edit</a><br /><!--<a href="{$config.url}/admincp/banner/delete?id={$val.id}" class="deletealert"onclick="return confirm('Are you sure ?') "  title="{$val.image}">Delete</a>--></td>
                                       </tr>
                                 {/foreach}
                                 {/if}
                                 {if $banner == 0}
                                 <tr>
                                     <td colspan="10">
                                         No banners found !!!
                                     </td>
                                 </tr>
                                 {/if}
                                </tbody>
                            </table>
                           

                            {$pagination_html}
                        </div>
                        </form> 
                        <!--<input type="submit" class="btn btn-success" value="Create New Banner" onclick="window.location.href = '{$config.url}/admincp/banner/new'"  style="margin-bottom:2%; margin-top:2%;"/>-->

               
                <!-- /.row -->
</div>



{include file="/admincp/footer.tpl" nocache}

