{include file="/common/header-1.tpl" nocache}
<section id="page-header" class="clearfix">
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <h1 class="page-title"> Blog Post </h1>
      </div>
      <div class="col-md-5 col-sm-5 col-xs-12">
                        <ul class="breadcrumbs">
          <!-- Breadcrumb NavXT 5.2.0 -->
<li class="home"><span><a href="http://www.auctionsoftware.com/" class="home">{$config.common.title}</a></span></li>
<li>/</li>
<li class="current_item"><span><span>Blog</span></span></li>
        </ul>
              </div>
    </div>
  </div>
</section>

<section id="content-main" class="clearfix">
  <div class="container"><div class="row">
            <div class="col-md-9">
                
                <article id="post-1888" class="post-1888 post type-post status-publish format-standard hentry category-uncategorized fancy-gallery-content-unit">
    <h3 class="post-title entry-title">{$blog.title}</h3></article>
                  <div class="post-meta-content">
      <span class="post-date updated"><time class="entry-date" datetime="{$val.date_add}">{$blog.date_add}</time></span>posted by <span class="author vcard margin-less">{$blog.first_name} {$blog.last_name}      </span>
          </div>
                    {if $blog.image != ''}<div class="blog_img" style="margin-top:5px; margin-bottom:5px;"><img src="{$config.url}/uploads/blog/{$blog.avatar}" style="width: 200px;height: 180px;" /> </div>{/if} 
                                           
                                            


                                            <p>{$blog.description}</p>
                        </div>
                        <div class="col-md-3">
    <div class="sidebar" >
      <div id="search-2" class="widget widget_search" >
        <form class="search" id="blogsearch" method="get" action="{$config.url}/blog/">
          <fieldset>
            <div class="input-group">
              <input class="form-control" placeholder="Type &amp; Enter" type="text" name="search">
              <span class="input-group-addon" onclick="$('#blogsearch').submit();"><i class="fa fa-search"></i></span> </div>
          </fieldset>
        </form>
      </div>
      <div id="recent-posts-2" class="widget widget_recent_entries" style="margin-top:30px;float:left;">
        <h4 class="widget-title">Recent Posts</h4>
        <ul>
          {foreach $rblog as $key => $val}
          
          <li> <a href="{$config.url}/blog/{$val.id}">{$val.title}</a> </li>
   
          {/foreach}
         </ul>
      </div>
      <!--<div id="recent-comments-2" class="widget widget_recent_comments">
        <h4 class="widget-title">Recent Comments</h4>
        <ul id="recentcomments">
        </ul>
      </div>
      <div id="archives-2" class="widget widget_archive"><h4 class="widget-title">Archives</h4>       <ul>
    <li><a>November 2014</a></li>
    <li><a>October 2014</a></li>
    <li><a>September 2014</a></li>
        </ul>
</div>--> 
      
    </div>
 </div>
  </div>
 </section>
   
           
{include file="/common/footer-1.tpl" nocache}
<script type="text/javascript">
$(function(){
    $('.main_container').addClass('review');
})
</script>
