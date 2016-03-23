<div class="table-responsive">
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
         {$usercount = 0}
         {foreach $users as $key => $val}	
         {$usercount = 1}
            <tr>
                <td>{$val.first_name} {$val.last_name}</td>
                <td>{$val.email}</td>
                <td>${$val.balance}</td>
                <td>{$val.status}</td>
                <td><a  title='Edit'href="{$config.url}/admincp/users/edit/{$val.id}"><i class="fa fa-edit fa-green"></i> <img src="{$config.url}/images/edit.png"/></a>
                  {if $val.status == 'active'}
<a  title='Delete' onclick="return confirm('Are you sure ?')" href="{$config.url}/admincp/users/delete/{$val.id}"> <img src="{$config.url}/images/delet.png"/></a>
 {/if}
                </td>
            </tr>
         {/foreach}
         {if $usercount == 0}
             <tr>
                 <td colspan="5">
                 No {$userstatus} Users found !
                 </td>
             </tr>
         {/if}
        </tbody>
    </table>
    {$pagination_html}
</div>