{if $deleted_project}
<div class="alert alert-success"> <strong>Deleted!</strong> </div>
{/if}
{if $undeleted_project}
<div class="alert alert-danger"> <strong>You can't delete this.Users already bidded!</strong> </div>
{/if}
<div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Image</th>                                        
                                        <th>Date Added</th>
                                        <th>Date Closed</th>                                        
                                        <th>Posted By</th>
                                        <th>Won Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {$item = 0}
                                 {foreach $projects as $key => $val}	
                                 {$item = 1}
                                    <tr>
                                        <td><a href="{$config.url}/product/view/{$val.id}">{$val.title}</a></td>
                                        <td>{$val.status}</td>
                                        <td><a href="#" title="{$val.title}"> <img src="{if $val.avatar == ''} {$config['imgpath']}no_img.png {else if $val.avatar != ''}{$config['imgpath']}product/{$val.avatar}{/if}" width="50" height="50" alt="1"></a></td>
                                        <td>{$val.stime}</td>
                                        <td>{$val.ctime}</td>
                                        <td>{$val.email}</td>
                                        <td>${$val.wprice}</td>
                                        <td>{if $val.sold == 0 and $val.sprice == $val.wprice and ($val.market_status == 'open' or $val.market_status == 'moderate')}<a href="{$config.url}/admincp/projects/edit/{$val.id}">Edit</a>{/if}
                                            {if $val.status != 'deleted'}

                                          <a  onclick="return confirm('Are you sure ?')" href="{$config.url}/admincp/projects/delete/{$val.id}">Delete</a>
                                          {/if}
                                               {if $val.status == 'deleted'}      deleted   {/if}
                                          {if $val.market_status == 'moderate'}<br />     

                                           <a href="{$config.url}/admincp/projects/approve/{$val.id}">Approve</a>
                                            


                                        {/if}
                                   		{if $val.market_status == 'open' and  $val.feature == 0}<br />                                            
                                           <a href="{$config.url}/admincp/projects/feature/{$val.id}">Mark As Feature</a>
                                        {/if}
                                         {if $val.market_status == 'open' and  $val.feature == 1}<br />                                            
                                           <a href="{$config.url}/admincp/projects/unfeature/{$val.id}">Remove from feature</a>
                                        {/if}

                                    </td>
                                    </tr>
                                 {/foreach}
                                 {if $item == 0}
                                  	 <tr>
                                         <td colspan="8">
                                         No {$projectsstatus} Products found !!!
                                         </td>
                                     </tr>
                                 {/if}
                                </tbody>
                            </table>
                            {$pagination_html}
                        </div>