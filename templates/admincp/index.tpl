{include file="/admincp/header.tpl" nocache}
<div class="container-fluid">

                <!-- Page Heading -->
                <div class="row">
                    <div class="col-lg-12" style="margin-top:2%;">
                        
                        <ol class="breadcrumb">
                            <li class="active">
                                <i class="fa fa-laptop"></i> Products
                            </li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->

                

                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $project.open > 0}{$project.open}{else} 0 {/if}</div>
                                        <div>Open Products</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/projects/open">
                                <div class="panel-footer">
                                    <span class="pull-left" onclick="">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $project.closed > 0}{$project.closed}{else} 0 {/if}</div>
                                        <div>Closed Products</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/projects/closed"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right" ><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-yellow">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-shopping-cart fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge"> {if $project.sold > 0}{$project.sold}{else} 0 {/if}</div>
                                        <div>Won Products</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/projects/sold"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-support fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $project.future > 0}{$project.future}{else} 0 {/if}</div>
                                        <div>Future Products</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/projects/future"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                
                 <div class="row">
                    <div class="col-lg-12">
                        
                        <ol class="breadcrumb">
                            <li class="active">
                                <i class="fa fa-money"></i> Transactions
                            </li>
                        </ol>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $trans.bid > 0}{$trans.bid}{else} 0 {/if}</div>
                                        <div >Bid Transactions</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/transaction/bid"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right" ><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $trans.buynow > 0}{$trans.buynow}{else} 0 {/if}</div>
                                        <div>Buy Now Transactions</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/transaction/buynow"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-yellow">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-shopping-cart fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge"> {if $trans.winner > 0}{$trans.winner}{else} 0 {/if}</div>
                                        <div>Total Winners</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/transaction/winner"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-support fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $trans.sold > 0}{$trans.sold}{else} 0 {/if}</div>
                                        <div>Sold Transaction</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/transaction/sold"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- /.row -->
                 
                 <div class="row">
                    <div class="col-lg-12">
                        
                        <ol class="breadcrumb">
                            <li class="active">
                                <i class="fa fa-user"></i> Users
                            </li>
                        </ol>
                    </div>
                </div> 
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $users.active > 0}{$users.active}{else} 0 {/if}</div>
                                        <div>Active Users</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/users/active"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-tasks fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $users.moderate > 0}{$users.moderate}{else} 0 {/if}</div>
                                        <div>Moderate Users</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/users/moderate"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-yellow">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-shopping-cart fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $users.unverified > 0}{$users.unverified}{else} 0 {/if}</div>
                                        <div>Unverified Users</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/users/unverified"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-3">
                                        <i class="fa fa-support fa-5x"></i>
                                    </div>
                                    <div class="col-xs-9 text-right">
                                        <div class="huge">{if $users.cancel > 0}{$users.cancel}{else} 0 {/if}</div>
                                        <div>Cancelled Users</div>
                                    </div>
                                </div>
                            </div>
                            <a href="{$config.url}/admincp/users/cancel"><div class="panel-footer">
                                    <span class="pull-left">View Details</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- /.row -->

            </div>
           
{include file="/admincp/footer.tpl" nocache}
