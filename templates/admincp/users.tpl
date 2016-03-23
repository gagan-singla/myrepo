{include file="/admincp/header.tpl" nocache}
<div class="container-fluid">

                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-12" style="margin-top:2%;">
                        
                        <ol class="breadcrumb">
                            <li class="active" style=" text-transform: capitalize;">
                                <i class="fa fa-user"></i>{$action} Users
                            </li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->
                
                {include file="/admincp/user-list.tpl" nocache}

               
                <!-- /.row -->
</div>
           
{include file="/admincp/footer.tpl" nocache}
