<ul class="mtree transit">
                {$std = 0}
                {foreach $storeCategories as $key => $val}
                
                {if $val.parent_id == 0 and $std == 1} 
                {$std = 0}
              </ul>
              </li>
              {/if} 
              {if $val.parent_id == 0}
              {$std = 1} 
              <li class="cusdash1"><a href="javascript:void(0);" onclick="$('#page').val(1);restrictCategory('{$val.id}');" style="cursor: pointer;">{$val.name}<span class="stor7">({$val.cnt})</span></a>
                <ul >
                  {/if}
                  {if $val.parent_id > 0 and $val.depth <= 1}
                  {$std = 1}
                  <li><a href="javascript:void(0);" onclick="$('#page').val(1);restrictCategory('{$val.id}');">{$val.name}<span class="stor7">({$val.cnt})</span></a></li>
                  {/if}
                  
                  
                  {/foreach}
                  {if $std == 1}
                  </ul>
              </li>
                  {/if}
                </ul>