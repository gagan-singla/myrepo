<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Admin</title>

    <!-- Bootstrap Core CSS -->
    <link href="{$config.dpath}css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="{$config.dpath}css/sb-admin.css" rel="stylesheet">


    <link rel="stylesheet" type="text/css" href="{$config['externalcss']}intlTelInput.css">

    <link href="https://cdn.datatables.net/1.10.9/css/dataTables.bootstrap.min.css" rel="stylesheet" >
    {foreach $external2css as $key => $val}
 <link rel="stylesheet" href="{$config['externalcss']}{$val}.css" type="text/css" />
{/foreach}
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="{$config['externaljs']}country.js"  type="text/javascript"></script>
    <script src="{$config['externaljs']}ckeditor/ckeditor.js"></script>

</head>
<script type="text/javascript">
    var ILBASE = ASBASE = '{$config.url}';
    function CKupdate(){
        for ( instance in CKEDITOR.instances )
            CKEDITOR.instances[instance].updateElement();
    }
</script>

<body>

    <div id="wrapper">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/admincp">Admin</a>
            </div>

            <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
            {if $loged.admin}
                <ul class="nav navbar-nav side-nav">
                    <li  class="{$menu.dashboardmenu}">
                        <a href="{$config.url}/admincp/dashboard/"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
                    </li>
                    <li class="{$menu.usersmenu}">
                        <a href="javascript:;" data-toggle="collapse" data-target="#users"  aria-expanded="false"><i class="fa fa-fw fa-user"></i> Users</a>
                        <ul id="users" class="collapse {if $menu.usersmenu} in {/if}" aria-expanded="false">
                            <li class="{$menu.addusersmenu}">
                                <a href="{$config.url}/admincp/users/add" {$auser}>Add Users</a>
                            </li>
                            <li class="{$menu.allusersmenu}">
                                <a href="{$config.url}/admincp/users/">All Users</a>
                            </li>
                            <li class="{$menu.activeusersmenu}">
                                <a href="{$config.url}/admincp/users/active">Active Users</a>
                            </li>
                            <li class="{$menu.moderateusersmenu}">
                                <a href="{$config.url}/admincp/users/moderate">Moderate Users</a>
                            </li>
                            <li class="{$menu.unverifiedusersmenu}">
                                <a href="{$config.url}/admincp/users/unverified">Unverified Users</a>
                            </li>
                             <li class="{$menu.cancelusersmenu}">
                                <a href="{$config.url}/admincp/users/cancel">Cancelled Users</a>
                            </li>
                            <li class="{$menu.searchusersmenu}">
                                <a href="{$config.url}/admincp/users/search">Search Users</a>
                            </li>
                        </ul>
                    </li>
                    <li  class="{$menu.projectsmenu}">
                        <a href="javascript:;" data-toggle="collapse" data-target="#projects" ><i class="fa fa-fw fa-laptop"></i> Products</a>

                        <ul id="projects" class="collapse {if $menu.projectsmenu} in {/if}"  aria-expanded="true" >
                            <li class="{$menu.projectsnewmenu}">
                                <a href="{$config.url}/admincp/projects/new">New Product</a>
                            </li>
                            <li class="{$menu.projectsearchmenu}">
                                <a href="{$config.url}/admincp/projects/list">All Products</a>
                            </li>

                            <li class="{$menu.dealshmenu}">
                                <a href="{$config.url}/admincp/projects/homepage">Deals of the day</a>
                            </li>



                        </ul>
                    </li>
                    <li class="{$menu.bannermenu}">
                        <a href="{$config.url}/admincp/banner/list"><i class="fa fa-fw fa-file"></i>Banner </a>
                    </li>

                    <li class="{$menu.disputes}">
                        <a href="{$config.url}/admincp/view_disputes"><i class="fa fa-fw fa-file"></i>Disputes </a>
                    </li>

                    <li class="{$menu.membershipmenu}">
                         <a href="javascript:;" data-toggle="collapse" data-target="#membership" ><i class="fa fa-fw fa-laptop"></i> Membership</a>
                         <ul id="membership" class="collapse {if $menu.membershipmenu} in {/if}"  aria-expanded="true" >
                          <li class="{$menu.plannewmenu}"><a href="{$config.url}/admincp/membership/plans/" > <i class="fa fa-fw fa-sitemap"></i> Plans</a></li>
                          <li class="{$menu.rolenewmenu}"><a href="{$config.url}/admincp/membership/roles/" > <i class="fa fa-fw fa-sitemap"></i> Roles</a></li>
                          <li class="{$menu.permissionewmenu}"><a href="{$config.url}/admincp/membership/permission/" > <i class="fa fa-fw fa-sitemap"></i> Permission</a></li>
                         </ul>

                    </li>
                    <li class="{$menu.categoriesmenu}">
                        <a href="{$config.url}/admincp/categories/list/" > <i class="fa fa-fw fa-sitemap"></i> Categories</a>
                    </li>
                    <li class="{$menu.messagesmenu}">
                        <a href="{$config.url}/admincp/messages/" > <i class="fa fa-fw fa-inbox"></i> Messages</a>
                    </li>
                    <li class="{$menu.reviewsmenu}">
                        <a href="{$config.url}/admincp/reviews/" > <i class="fa fa-fw fa-edit"></i> Reviews</a>
                    </li>

                  <li class="{$menu.paymentmenu}">
                        <a href="javascript:;" data-toggle="collapse" data-target="#payment"> <i class="fa fa-fw fa-edit"></i>  Payment</a>

                        <ul id="payment" class="collapse {if $menu.paymentmenu} in {/if}"  aria-expanded="true" style="  font-size: 12px;">
                         <li class="{$menu.paymentmodulesmenu}"><a href="{$config.url}/admincp/paymentmodules/" > <i class="fa fa-fw fa-edit"></i> Payment Modules</a> </li>
                           <li class="{$menu['withdrawalmenu']}"><a href="{$config.url}/admincp/withdrawal/" ><i class="fa fa-fw fa-money"></i> Withdrawal</a> </li>
                           </ul>

                    </li>
                  <li class="{$menu.shippingmenu}">
                        <a href="{$config.url}/admincp/shipping/" > <i class="fa fa-fw fa-file"></i> Shipping API</a>
                    </li>

                    <li class="{$menu.managementmenu}">
                        <a href="javascript:;" data-toggle="collapse" data-target="#management"> <i class="fa fa-fw fa-edit"></i>  Management</a>

                        <ul id="management" class="collapse {if $menu.managementmenu} in {/if}"  aria-expanded="true" style="  font-size: 12px;">
                         <li class="{$menu.reportsmenu}"><a href="{$config.url}/admincp/reports/" > <i class="fa fa-fw fa-edit"></i> Report Management</a> </li>
                         <!--  <li class="{$menu.notificationmenu}"><a href="{$config.url}/admincp/notification/" > <i class="fa fa-fw fa-edit"></i> Notification Management</a> </li> -->
                          <li class="{$menu.emailmgtmenu}"><a href="{$config.url}/admincp/mailers/" > <i class="fa fa-fw fa-edit"></i> Email/SMS Management</a> </li>
                          <li class="{$menu.emailtemplatemenu}"><a href="{$config.url}/admincp/emailtemplate/" > <i class="fa fa-fw fa-edit"></i> Email Template Management</a> </li>
                           <li class="{$menu.smstemplatemenu}"><a href="{$config.url}/admincp/smstemplate/" > <i class="fa fa-fw fa-edit"></i> Sms Template Management</a> </li>
                          <li class="{$menu.feedbackmenu}"><a href="{$config.url}/admincp/feedbacknew/" > <i class="fa fa-fw fa-edit"></i> Feedback Management</a></li>
                         </ul>

                    </li>

                    <!--
                    <li class="{$menu.disputemenu}">
                        <a href="{$config.url}/admincp/dispute/" > <i class="fa fa-fw fa-file"></i> Dispute</a>
                    </li>
                -->
                    <li class="{$menu.referralmenu}">
                        <a href="{$config.url}/admincp/referral/" > <i class="fa fa-fw fa-money"></i> Referrals</a>
                    </li>

                    <li class="{$menu['transactionmenu']}">
                        <a href="{$config.url}/admincp/transaction/list/" ><i class="fa fa-fw fa-money"></i> Transactions</a>
                    </li>

                    <li class="{$menu['blogmenu']}">
                        <a href="{$config.url}/admincp/blog/" ><i class="fa fa-fw fa-money"></i> Blog</a>
                    </li>
                    <li class="{$menu.forums}">
                        <a href="javascript:;" data-toggle="collapse"  data-target="#forums"  aria-expanded="true"><i class="fa fa-fw fa-money"></i> Forum</a>
                        <ul id="forums" class="collapse {if $menu.forums} in {/if}" aria-expanded="false" >
                            <li class="{$menu.forumsquestions}">
                                <a href="{$config.url}/admincp/forumquests/" ><i class="fa fa-fw fa-money"></i> Forum Questions</a>
                            </li>
                            <li class="{$menu.forumscats}">
                                <a href="{$config.url}/admincp/forumcats/" ><i class="fa fa-fw fa-money"></i> Forum Categories</a>
                            </li>
                        </ul>
                    </li>
                    <li class="{$menu['storemenu']}">
                        <a href="{$config.url}/admincp/stores/" ><i class="fa fa-fw fa-money"></i> Stores</a>
                    </li>
                    <li class="{$menu.settingsmenu}">
                        <a href="javascript:;" data-toggle="collapse"  data-target="#settings"  aria-expanded="true">
                        <i class="fa fa-fw fa-wrench"></i> Server Settings</a>
                        <ul id="settings" class="collapse {if $menu.settingsmenu} in {/if}" aria-expanded="false" >
                            <li class="{$menu.commonsettingsmenu}">
                                <a href="{$config.url}/admincp/settings/common">System</a>
                            </li>
                            <li class="{$menu.generalsettingsmenu}">
                                <a href="{$config.url}/admincp/settings/general">General</a>
                            </li>

                            <li class="{$menu.modesettingsmenu}">
                                <a href="{$config.url}/admincp/settings/mode">Maintenance Mode </a>
                            </li>
                            <li class="{$menu.paypalsettingsmenu}">
                                <a href="{$config.url}/admincp/settings/paypal">Paypal</a>
                            </li>


                             <li class="{$menu.databasesettingsmenu}">
                                <a href="{$config.url}/admincp/settings/database">Database</a>
                            </li>
                            <li class="{$menu.cardsettingsmenu}">
                                <a href="{$config.url}/admincp/settings/card">Credit Card</a>
                            </li>

                            <!-- <li class="{$menu.customeriosettingsmenu}">
                                <a href="{$config.url}/admincp/settings/customerio">CustomerIO</a>
                            </li> -->
                            <li class="{$menu.facebooksettingsmenu}">
                                <a href="{$config.url}/admincp/settings/facebook">Facebook</a>
                            </li>

                             <li class="{$menu.linkedinsettingsmenu}">
                                <a href="{$config.url}/admincp/settings/linkedin">LinkedIn</a>
                            </li>

                        </ul>
                    </li>
                      <li class="{$menu.languagemenu}">
                        <a href="javascript:;" data-toggle="collapse"  data-target="#language"  aria-expanded="true">
                        <i class="fa fa-fw fa-language"></i>Language Settings</a>
                        <ul id="language" class="collapse {if $menu.languagemenu} in {/if}" aria-expanded="false" >
                            <li class="{$menu.phraselanguagemenu}">
                                <a href="{$config.url}/admincp/language/phrase">Phrases</a>
                            </li>
                            <li class="{$menu.newphraselanguagemenu}">
                                <a href="{$config.url}/admincp/language/newphrase">New Phrase</a>
                            </li>
                            <!--<li class="{$menu.membershipmenu}">
                                <a href="{$config.url}/admincp/membership">MemberShip</a>
                            </li> -->
                             <li class="{$menu.languagelanguagemenu}">
                                <a href="{$config.url}/admincp/language/language">Select Language</a>
                            </li>
                            <li class="{$menu.importlanguagemenu}">
                                <a href="{$config.url}/admincp/language/import">Import</a>
                            </li>
                            <li class="{$menu.exportlanguagemenu}">
                                <a href="{$config.url}/admincp/language/export">Export</a>
                            </li>
                        </ul>
                    </li>
                    <!--<li class="{$menu.templatemenu}">
                        <a href="{$config.url}/admincp/template/"><i class="fa fa-fw fa-file"></i>Template</a>
                    </li>-->
                    <li class="{$menu.escrowmenu}">
                        <a href="{$config.url}/admincp/escrow/"><i class="fa fa-fw fa-file"></i>Escrow Payments</a>
                    </li>
                    <li class="{$menu.pagesmenu}">
                        <a href="{$config.url}/admincp/static/pages"><i class="fa fa-fw fa-file"></i>Pages</a>
                    </li>

                    <li>
                        <a href="{$config.url}/login/logout"><i class="fa fa-fw fa-power-off"></i> LogOut</a>
                    </li>


                </ul>
            </div>
            {/if}
            <!-- /.navbar-collapse -->
        </nav>

        <div id="page-wrapper">