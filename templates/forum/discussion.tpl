{include file="common/header-1.tpl" nocache}
{include file="/forum/header.tpl" nocache}
<!-- <div class="col-md-12 mjusza1">
<img src="{$config.url}/images/forum/forma1.png" /> Discussion Boards
</div> -->
<style>
.main_wrapper {
    margin:0 !important;
}
</style>

<div class="col-md-8 mjusza4">Community</div>
<div class="col-md-2"><a href="{$config.url}/forum/questions"><button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">New Question</button></a></div>
</div>

<div class="col-md-12">
	<div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                       
                                        <th>Question</th>
                                        <th>Replies</th>
                                        <th>Kudos</th>
                                       

                                    </tr>
                                </thead>
                              	<tbody>

                                {$cats = 0}
                                {foreach $questions as $key => $val}   
                                {$cats = 1}
	                                <tr>
	                                                           
	                                <td><a href="{$config.url}/forum/questionpage/{$val.id}">{$val.title}</a>
	                                	<p>by {$val.first_name} {$val.last_name} </p>
	                                </td>
	                                <td>{$val.replies}</td>
	                                <td>{$val.kudos}</td>
	                               

	                                </tr>
                              
                               	{/foreach}

                             	{if $cats == 0}
                                    <tr>
	                                     <td colspan="3">
	                                       No Questions found !!!
	                                     </td>
                                	 </tr>
                             	{/if}
                                </tbody>
                          
                            </table>

           {$pagination_html}
    </div>
</div>                        

{include file="/forum/footer.tpl" nocache} 
  {include file="common/footer-1.tpl" nocache}
