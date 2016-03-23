{include file="/admincp/header.tpl" nocache}
<div class="container-fluid">

                <!-- Page Heading -->
                
                <div class="row">
                    <div class="col-lg-12" style="margin-top:2%;">
                        
                        <ol class="breadcrumb">
                            <li class="active">
                                <i class="fa fa-user"></i> Users <i class="fa fa-hand-o-right"></i> <i class="fa fa-edit"></i> reviews
                            </li>
                        </ol>
                    </div>
                </div>
                <!-- /.row -->

                <div class="row">
                  
                 
                </div>    
                
               <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Date Added</th>
                                        <th>Rating</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {$reviewcount = 0}
                                {foreach $review as $key => $val}   
                                {$reviewcount = 1}
                                    <tr>
                                        <td>{$val.first_name} {$val.last_name}</td>
                                        <td>{$val.subject}</td>
                                        <td>{$val.message}</td>
                                        <td>{$val.date_add}</td>
                                        <td>{$val.rating}</td>
                                         <td><a href="javascript:void(0);" onclick="PopupBox2('{$config.url}/admincp/reviews/delete/{$val.id}');">Delete</a></td>
                                    </tr>
                                 {/foreach}
                                 {if $reviewcount ==0}
                                  	 <tr>
                                         <td colspan="5">
                                        	 No reviews found !!!
                                         </td>
                                     </tr>
                                 {/if}
                                </tbody>
                            </table>
                            {$pagination_html}
                        </div>

               
                <!-- /.row -->
</div>
           
{include file="/admincp/footer.tpl" nocache}
