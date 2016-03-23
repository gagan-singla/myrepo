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
  <div class="container">
<div class="row">
  <div class="col-md-9 col-sm-9">

    {foreach $blog as $key => $val}
    <article id="post-1888" class="post-1888 post type-post status-publish format-standard hentry category-uncategorized fancy-gallery-content-unit">
    <h3 class="post-title entry-title"><a href="{$config.url}/blog/{$val.id}" rel="bookmark">
  {$val.title}  </a></h3>
    <div class="post-meta clearfix"> <span class="post-format-icon"><a href="#"><i class="icon-note"></i></a></span>
    <div class="post-meta-content">
      <span class="post-date updated"><time class="entry-date" datetime="{$val.date_add}">{$val.date_add}</time></span>posted by <span class="author vcard margin-less">{$val.first_name} {$val.last_name}      </span>
          </div>
  </div>
      <div class="post-summary">
    <p>{$val.description_short}..</p>
  </div>
   <a class="mybtn" href="{$config.url}/blog/{$val.id}">Read More</a>
      <div class="post-author">
      </div>
    <div class="post-footer"></div>
  </article>
     {/foreach}
      <div class="col-md-6 text-right">{$pagination_html}</div>
  </div>

  <div class="col-md-3 col-sm-3">
    <div class="sidebar">
      <div class="col-md-12" style="margin-bottom:30px; padding-left:0">
        <form class="search" id="blogsearch" method="get" action="{$config.url}/blog/">
          <fieldset>
            <div class="input-group">
              <input class="form-control" placeholder="Type &amp; Enter" type="text" name="search">
              <span class="input-group-addon" onclick="$('#blogsearch').submit();"><i class="fa fa-search"></i></span> </div>
          </fieldset>
        </form>
      </div>
      <div id="recent-posts-2" class="widget widget_recent_entries">
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
</div></div></section>
{include file="/common/footer-1.tpl" nocache}
<script type="text/javascript">
$(function(){
    $('.main_container').addClass('review');
})
</script>