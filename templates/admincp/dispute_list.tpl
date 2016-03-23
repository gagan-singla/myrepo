{include file="/admincp/header.tpl" nocache}
<div class="container-fluid">

    <!-- Page Heading -->

    <div class="row">
        <div class="col-lg-12" style="margin-top:2%;">

            <ol class="breadcrumb">
                <li class="active">
                    <i class="fa fa-laptop"></i> Dispute <i class="fa fa-hand-o-right"></i> <i class="fa fa-search"></i> List
                </li>
            </ol>
        </div>
    </div>
    <!-- /.row -->

    <div class="row">


    </div>

    {if $success}
        <div class="alert alert-success">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            {$success}
        </div>
    {/if}
    {if $failure}
    <div class="alert alert-danger"> <strong>{$error}!</strong> </div>
    {/if}
    <form action="" method="post" id="pay_chk">
        <div class="">
            <table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%" >
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>User</th>
                    <th>Subject </th>
                    <th>Message</th>
                    <th>Date Added</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {foreach $disputes as $key => $val}

                <tr>
                    <td>{$val.title}</td>

                    <td>{$val.email}</td>
                    <td>{$val.subject}</td>
                    <td>{$val.message}</td>
                    <td>{dateFormat($val.date_added, 'dd mmmm yyyy')}</td>
                    <td><a href="{$config.url}/admincp/del_disputes/{$val.id}"  onclick="return confirmation()"> Delete </a></td>
                </tr>
                {/foreach}



                </tbody>
            </table>



        </div>
    </form>
    <!--<input type="submit" class="btn btn-success" value="Create New Banner" onclick="window.location.href = '{$config.url}/admincp/banner/new'"  style="margin-bottom:2%; margin-top:2%;"/>-->


    <!-- /.row -->
</div>

<script>
    function confirmation() {
        var confirmed =  confirm("Are you sure, you want to delete ?");
        return confirmed;
    }
</script>

{include file="/admincp/footer.tpl" nocache}

