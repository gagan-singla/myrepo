
</div>
</div>
<style type="text/css">
.m-top-10
{
	margin-top:10px;
}
.wid100
{
	width:100%;
}
</style>
<footer>
	<div class="container">
	 <div class="row">
		<div class="col-xs-12 col-sm-12 col-md-5">
			    <div class="footer_logo"><a href="{$config.url}">
            	  <img src="{$config.url}/images/logoc.png" class="img-responsive" alt="" /></a>
                </div>
				<div class="copy_right">
                	<p class="footer_txt">Auctionsoftware.com&nbsp;<i class="fa fa-copyright"></i>&nbsp;2015.</p>
                    <div class="social_icons">
                        <span style="display: inline-block;float: left;">| Follow Us</span>                        
                        <div><a href="https://www.facebook.com/pages/Auctionsoftwarecom/1497910160481548?fref=nf" target="_blank"><i class="fa fa-facebook"></i></a></div>
                        <div><a href="https://twitter.com/" target="_blank"><i class="fa fa-twitter"></i></a></div>
                    </div>
                </div>
			</div>
		<div class="col-md-offset-1 col-xs-12 col-sm-12 col-md-6">
			 {if $mode neq 'yes'}
			<div class="footer_right">
			        <div><a href="{$config.url}/">Home</a></div>
					<div><a href="{$config.url}/about">About Us</a></div>
					<div> <a href="{$config.url}/about/buyers" >Buyers</a></div>
					<div><a href="{$config.url}/sellers">Sellers</a></div>
					<div><a href="{$config.url}/how_it">How It Works</a></div>
					<div><a href="{$config.url}/about/contacts">Contact Us</a></div>
					<div><a href="{$config.url}/privacy">Privacy Policy</a></div>
					<div> <a href="{$config.url}/terms">Terms & Condition</a></div>
					 <!--  {if $loged.userid > 0}
					<div> <a href="{$config.url}/reviews">Review</a></div>
					 {else}
                      <div> <a href="{$config.url}/login">Review</a></div>
					 {/if}-->
				<div> <a href="{$config.url}/reviews">Review</a></div>
			</div>
			{/if}
		</div>
		</div>
	</div>
    <div  style="clear:both"></div>
</footer>

 {if $mode neq 'yes'}
{if $loged.userid <= 0}
 <div class="modal confirmbid  fade" id="registration" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog trans_bck">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		  </div>
		  <div class="modal-body">
			<h2>Registration</h2>
			
		  <div class="text-danger">{$register_error}</div>
          <form action="/register/save" method="POST" data-parsley-validate  id="registerform" enctype="multipart/form-data" onsubmit="return checkTerms();">
      	  <input type="hidden" name="r_id" value="{$r_id}" />
          <input type="hidden" name="do" id="do" value="quickregister_popup" />
          <input type="hidden" name="email_exist" id="email_exist" value="0" />
          <input type="hidden" name="user_exist" id="user_exist" value="0" />
          <span id="form_proces_res" class="error_popup"></span>
            <div class="form-group">
				<label>First Name</label>
				<input class="form-control" type="text" name="first_name" placeholder="First Name" class="form-control" data-required="true"  data-parsley-group="block1" data-parsley-required value="{$registerdata.first_name}" />
			</div>
			<div class="form-group">
				<label>Last Name</label>
				<input class="form-control" type="text" name="last_name" Placeholder="Last Name" class="form-control" data-required="true"  data-parsley-group="block1" data-parsley-required value="{$registerdata.last_name}" />
			</div>
			<div class="form-group">
				<label>Email</label>
				<input class="form-control" type="email" name="email"  placeholder="Email Id" class="form-control" id="email_search" data-required="true" onkeyup=" check_userlist()" data-parsley-group="block1" data-parsley-required value="{$registerdata.email}"  />
			</div>
			<div class="form-group">
				<label>Password</label>
				<input class="form-control" type="password" name="password" id="passwordp" class="gui-input" placeholder="Password" data-parsley-minlength="6"  data-parsley-group="block1" data-parsley-required value="{$registerdata.password}" />
			</div>
			<div class="form-group">
				<label>Confirm Password</label>
				<input class="form-control" type="password" name="repassword" id="qpasswordp2" class="gui-input"  placeholder="Confirm Password"  data-parsley-group="block1" data-parsley-equalto="#passwordp" data-parsley-minlength="6" data-parsley-required value="{$registerdata.password}" />
			</div>
                        
                        <div class="form-group">
                            
                        {$captchahtml}
                        <p style="color:red;width:100%;float:left;clear:both;"></p>
                     
                        </div>
                        
			<div class="agree_terms register-toggle check_opt">
				<input type="checkbox" class="pull-left" name="agree"  value="1" id="agree" />&nbsp;
				<label for="agree" class="pull-left" style="padding-left: 10px;">I agree to the <a href="{$config.url}/termcondition" target="_blank">Terms and Service</a></label>
			</div>
			<button class="btn lg_bbtn">JOIN US</button>
			<div class="spacer-b30">
                <div class="tagline"><span>Or</span></div><!-- .tagline -->
           </div>
           </form>
			<a href="{$config.url}/facebook/auth/facebook"><button  class="field prepend-icon btn btn-primary fb_btn"><label for="lastname" class="field-icon"><i class="fa fa-facebook"></i></label>&nbsp;&nbsp;Login with facebook</button></a>
			
		  </div>
		</div>
	  </div>
</div>
<div class="modal confirmbid  fade" id="Login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog trans_bck">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		  </div>
		  <div class="modal-body">
			<h2>Login</h2>
			<div class="text-danger">{$login_error}</div>
					 
		   <span id="form_proces_res_1" class="error_popup"></span>	
            <form action="{$config['url']}/login/save" method="post" data-parsley-validate enctype="multipart/form-data" id="loginform"  >
			<div class="form-group">
				<label>Email</label>
				<input class="form-control" class="form-control gui-input email" type="email" name="username" id="u_name"  size="30" value="{$cookieemail}" autocomplete="off" required data-trigger="change" placeholder="Email Address" />
			</div>
			<div class="form-group">
				<label>Password</label>
				<input type="password" name="password" value="{$cookiepassword}" class="form-control"  id="u_pass" size="30"  autocomplete="off"  required data-trigger="change" class="gui-input" placeholder="Password" />
			</div>
			
			<div class="agree_terms">
				  <div class="login_check wid100">
          <input type="checkbox" name="remember" id="rememberme" value="1" checked="checked">
          <p class="remeber"><label for="rememberme">Remember me</label></p>
          <label><a href="{$config['url']}/login/forgot_password" title="Forgot password">Forgot password?</a></label>
        </div>
			</div>
			<button class="btn lg_bbtn" onclick="$('#loginform').submit();">Member Login</button>
			<div class="spacer-b30">
                <div class="tagline"><span>Or</span></div><!-- .tagline -->
           </div>
           </form>
			<a href="{$config.url}/facebook/auth/facebook"><button  class="field prepend-icon btn btn-primary fb_btn"><label for="lastname" class="field-icon"><i class="fa fa-facebook"></i></label>&nbsp;&nbsp;Login with facebook</button></a>
			
		  </div>
		</div>
	  </div>
</div>
{/if}
</div>

{if $loged.phonevalid == ''  and $phonecheckup == 1}
<div class="modal fade" id="phoneinfo" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content phone-content">
		  <div class="modal-header">
				Forward Auction Demo
				<span class="text-danger font-10">Either we will call or SMS right away and give a 5 digit code. </span>
			</div><div class="modal-body">
		  	<form action="javascript:void(0);" id="phone_popup_form" method="POST" data-parsley-validate  enctype="multipart/form-data">
			<div class="err_phne_label"></div>
			
			<div class="row">
				<div class="col-md-12 m-top-10">Email</div>
				<div class="col-md-12 m-top-10"><input class="form-control" data-parsley-required name="email" placeholder="Enter your Email" /></div>
			</div>
			<div class="row">
				<div class="col-md-12 m-top-10">First Name</div>
				<div class="col-md-12 m-top-10"><input class="form-control" data-parsley-required name="first_name" placeholder="Enter your first name" /></div>
			</div>
			<div class="row">
				<div class="col-md-12 m-top-10">Last Name</div>
				<div class="col-md-12 m-top-10"><input class="form-control" data-parsley-required name="last_name" placeholder="Enter your last name" /></div>
			</div>
			<div class="row">
				<div class="col-md-12 m-top-10">Phone Number (please enter with country code eg:+5555555555)</div>
				<div class="col-md-12 m-top-10"><input class="form-control" data-parsley-required name="address" placeholder="Enter your phone number" /></div>
			</div>
			<div class="row">
				<div class="col-md-12 m-top-10">Country</div>
				<div class="col-md-12 m-top-10"><select name="country_code" id="country_code" class="form-control" data-parsley-required><option value="">—</option><option value="+93 Afghanistan">+93 Afghanistan</option><option value="+355 Albania">+355 Albania</option><option value="+213 Algeria">+213 Algeria</option><option value="+1 684 American Samoa">+1 684 American Samoa</option><option value="+376 Andorra">+376 Andorra</option><option value="+244 Angola">+244 Angola</option><option value="+1 264 Anguilla">+1 264 Anguilla</option><option value="+672 Antarctica">+672 Antarctica</option><option value="+1 268 Antigua and Barbuda">+1 268 Antigua and Barbuda</option><option value="+54 Argentina">+54 Argentina</option><option value="+374 Armenia">+374 Armenia</option><option value="+297 Aruba">+297 Aruba</option><option value="+61 Australia">+61 Australia</option><option value="+43 Austria">+43 Austria	</option><option value="+994 Azerbaijan">+994 Azerbaijan</option><option value="+1 242 Bahamas">+1 242 Bahamas</option><option value="+973 Bahrain">+973 Bahrain</option><option value="+880 Bangladesh">+880 Bangladesh</option><option value="+1 246 Barbados">+1 246 Barbados</option><option value="+375 Belarus">+375 Belarus</option><option value="+32 Belgium">+32 Belgium</option><option value="+501 Belize">+501 Belize</option><option value="+229 Benin">+229 Benin</option><option value="+1 441 Bermuda">+1 441 Bermuda</option><option value="+975 Bhutan">+975 Bhutan</option><option value="+591 Bolivia">+591 Bolivia</option><option value="+387 Bosnia and Herzegovina">+387 Bosnia and Herzegovina</option><option value="+267 Botswana">+267 Botswana</option><option value="+55 Brazil">+55 Brazil</option><option value="+1 284 British Virgin Islands">+1 284 British Virgin Islands</option><option value="+673 Brunei">+673 Brunei</option><option value="+359 Bulgaria">+359 Bulgaria</option><option value="+226 Burkina Faso">+226 Burkina Faso</option><option value="+95 Burma (Myanmar)">+95 Burma (Myanmar)</option><option value="+257 Burundi">+257 Burundi</option><option value="+855 Cambodia">+855 Cambodia</option><option value="+237 Cameroon">+237 Cameroon</option><option value="+1 Canada">+1 Canada</option><option value="+238 Cape Verde">+238 Cape Verde</option><option value="+1 345 Cayman Islands">+1 345 Cayman Islands</option><option value="+236 Central African Republic">+236 Central African Republic</option><option value="+235 Chad">+235 Chad</option><option value="+56 Chile">+56 Chile</option><option value="+86 China">+86 China</option><option value="+61 Christmas Island">+61 Christmas Island</option><option value="+61 Cocos (Keeling) Islands">+61 Cocos (Keeling) Islands</option><option value="+57 Colombia">+57 Colombia</option><option value="+269 Comoros">+269 Comoros</option><option value="+682 Cook Islands">+682 Cook Islands</option><option value="+506 Costa Rica">+506 Costa Rica</option><option value="+93 Croatia">+93 Croatia</option><option value="+53 Cuba">+53 Cuba</option><option value="+357 Cyprus">+357 Cyprus</option><option value="+420 Czech Republic">+420 Czech Republic</option><option value="+243 Democratic Republic of the Congo">+243 Democratic Republic of the Congo</option><option value="+45 Denmark">+45 Denmark</option><option value="+253 Djibouti">+253 Djibouti</option><option value="+1 767 Dominica">+1 767 Dominica</option><option value="+1 809 Dominican Republic">+1 809 Dominican Republic</option><option value="+593 Ecuador">+593 Ecuador</option><option value="+20 Egypt">+20 Egypt</option><option value="+503 El Salvador">+503 El Salvador</option><option value="+240 Equatorial Guinea">+240 Equatorial Guinea</option><option value="+291 Eritrea">+291 Eritrea</option><option value="+372 Estonia">+372 Estonia</option><option value="+251 Ethiopia">+251 Ethiopia</option><option value="+500 Falkland Islands">+500 Falkland Islands</option><option value="+298 Faroe Islands">+298 Faroe Islands</option><option value="+679 Fiji">+679 Fiji</option><option value="+358 Finland">+358 Finland</option><option value="+33 France">+33 France</option><option value="+689 French Polynesia">+689 French Polynesia</option><option value="+241 Gabon">+241 Gabon</option><option value="+220 Gambia">+220 Gambia</option><option value="+970 Gaza Strip">+970 Gaza Strip</option><option value="+995 Georgia">+995 Georgia</option><option value="+49 Germany">+49 Germany</option><option value="+233 Ghana">+233 Ghana</option><option value="+350 Gibraltar">+350 Gibraltar</option><option value="+30 Greece">+30 Greece</option><option value="+299 Greenland">+299 Greenland</option><option value="+1 473 Grenada">+1 473 Grenada</option><option value="+1 671 Guam">+1 671 Guam</option><option value="+502 Guatemala">+502 Guatemala</option><option value="+224 Guinea">+224 Guinea</option><option value="+245 Guinea-Bissau">+245 Guinea-Bissau</option><option value="+592 Guyana">+592 Guyana</option><option value="+509 Haiti">+509 Haiti</option><option value="+39 Holy See (Vatican City)">+39 Holy See (Vatican City)</option><option value="+852 Hong Kong">+852 Hong Kong</option><option value="+36 Hungary">+36 Hungary</option><option value="+354 Iceland">+354 Iceland</option><option value="+91 India">+91 India</option><option value="+62 Indonesia">+62 Indonesia</option><option value="+98 Iran">+98 Iran</option><option value="+964 Iraq">+964 Iraq</option><option value="+353 Ireland">+353 Ireland</option><option value="+44 Isle of Man">+44 Isle of Man</option><option value="+972 Israel">+972 Israel</option><option value="+39 Italy">+39 Italy</option><option value="+225 Ivory Coast">+225 Ivory Coast</option><option value="+1 876 Jamaica">+1 876 Jamaica</option><option value="+81 Japan">+81 Japan</option><option value="+962 Jordan">+962 Jordan</option><option value="+7 Kazakhstan">+7 Kazakhstan</option><option value="+254 Kenya">+254 Kenya</option><option value="+686 Kiribati">+686 Kiribati</option><option value="+381 Kosovo">+381 Kosovo</option><option value="+965 Kuwait">+965 Kuwait</option><option value="+996 Kyrgyzstan">+996 Kyrgyzstan</option><option value="+856 Laos">+856 Laos</option><option value="+371 Latvia">+371 Latvia</option><option value="+961 Lebanon">+961 Lebanon</option><option value="+266 Lesotho">+266 Lesotho</option><option value="+231 Liberia">+231 Liberia</option><option value="+218 Libya">+218 Libya</option><option value="+423 Liechtenstein">+423 Liechtenstein</option><option value="+370 Lithuania">+370 Lithuania</option><option value="+352 Luxembourg">+352 Luxembourg</option><option value="+853 Macau">+853 Macau</option><option value="+389 Macedonia">+389 Macedonia</option><option value="+261 Madagascar">+261 Madagascar</option><option value="+265 Malawi">+265 Malawi</option><option value="+60 Malaysia">+60 Malaysia</option><option value="+960 Maldives">+960 Maldives</option><option value="+223 Mali">+223 Mali</option><option value="+356 Malta">+356 Malta</option><option value="+692 Marshall Islands">+692 Marshall Islands</option><option value="+222 Mauritania">+222 Mauritania</option><option value="+230 Mauritius">+230 Mauritius</option><option value="+262 Mayotte">+262 Mayotte</option><option value="+52 Mexico">+52 Mexico</option><option value="+691 Micronesia">+691 Micronesia</option><option value="+373 Moldova">+373 Moldova</option><option value="+377 Monaco">+377 Monaco</option><option value="+976 Mongolia">+976 Mongolia</option><option value="+382 Montenegro">+382 Montenegro</option><option value="+1 664 Montserrat">+1 664 Montserrat</option><option value="+212 Morocco">+212 Morocco</option><option value="+258 Mozambique">+258 Mozambique</option><option value="+264 Namibia">+264 Namibia</option><option value="+674 Nauru">+674 Nauru</option><option value="+977 Nepal">+977 Nepal</option><option value="+31 Netherlands">+31 Netherlands</option><option value="+599 Netherlands Antilles">+599 Netherlands Antilles</option><option value="+687 New Caledonia">+687 New Caledonia</option><option value="+64 New Zealand">+64 New Zealand</option><option value="+505 Nicaragua">+505 Nicaragua</option><option value="+227 Niger">+227 Niger</option><option value="+234 Nigeria">+234 Nigeria</option><option value="+683 Niue">+683 Niue</option><option value="+672 Norfolk Island">+672 Norfolk Island</option><option value="+850 North Korea">+850 North Korea</option><option value="+1 670 Northern Mariana Islands">+1 670 Northern Mariana Islands</option><option value="+47 Norway">+47 Norway</option><option value="+968 Oman">+968 Oman</option><option value="+92 Pakistan">+92 Pakistan</option><option value="+680 Palau">+680 Palau</option><option value="+507 Panama">+507 Panama</option><option value="+675 Papua New Guinea">+675 Papua New Guinea</option><option value="+595 Paraguay">+595 Paraguay</option><option value="+51 Peru">+51 Peru</option><option value="+63 Philippines">+63 Philippines</option><option value="+870 Pitcairn Islands">+870 Pitcairn Islands</option><option value="+48 Poland">+48 Poland</option><option value="+351 Portugal">+351 Portugal</option><option value="+1 Puerto Rico">+1 Puerto Rico</option><option value="+974 Qatar">+974 Qatar</option><option value="+242 Republic of the Congo">+242 Republic of the Congo</option><option value="+40 Romania">+40 Romania</option><option value="+7 Russia">+7 Russia</option><option value="+250 Rwanda">+250 Rwanda</option><option value="+590 Saint Barthelemy">+590 Saint Barthelemy</option><option value="+290 Saint Helena">+290 Saint Helena</option><option value="+1 869 Saint Kitts and Nevis">+1 869 Saint Kitts and Nevis</option><option value="+1 758 Saint Lucia">+1 758 Saint Lucia</option><option value="+1 599 Saint Martin">+1 599 Saint Martin</option><option value="+508 Saint Pierre and Miquelon">+508 Saint Pierre and Miquelon</option><option value="+1 784 Saint Vincent and the Grenadines">+1 784 Saint Vincent and the Grenadines</option><option value="+685 Samoa">+685 Samoa</option><option value="+378 San Marino">+378 San Marino</option><option value="+239 Sao Tome and Principe">+239 Sao Tome and Principe</option><option value="+966 Saudi Arabia">+966 Saudi Arabia</option><option value="+221 Senegal">+221 Senegal</option><option value="+381 Serbia">+381 Serbia</option><option value="+248 Seychelles">+248 Seychelles</option><option value="+232 Sierra Leone">+232 Sierra Leone</option><option value="+65 Singapore">+65 Singapore</option><option value="+421 Slovakia">+421 Slovakia</option><option value="+386 Slovenia">+386 Slovenia</option><option value="+677 Solomon Islands">+677 Solomon Islands</option><option value="+252 Somalia">+252 Somalia</option><option value="+27 South Africa">+27 South Africa</option><option value="+82 South Korea">+82 South Korea</option><option value="+34 Spain">+34 Spain</option><option value="+94 Sri Lanka">+94 Sri Lanka</option><option value="+249 Sudan">+249 Sudan</option><option value="+597 Suriname">+597 Suriname</option><option value="+268 Swaziland">+268 Swaziland</option><option value="+46 Sweden">+46 Sweden</option><option value="+41 Switzerland">+41 Switzerland</option><option value="+963 Syria">+963 Syria</option><option value="+886 Taiwan">+886 Taiwan</option><option value="+992 Tajikistan">+992 Tajikistan</option><option value="+255 Tanzania">+255 Tanzania</option><option value="+66 Thailand">+66 Thailand</option><option value="+670 Timor-Leste">+670 Timor-Leste</option><option value="+228 Togo">+228 Togo</option><option value="+690 Tokelau">+690 Tokelau</option><option value="+676 Tonga">+676 Tonga</option><option value="+1 868 Trinidad and Tobago">+1 868 Trinidad and Tobago</option><option value="+216 Tunisia">+216 Tunisia</option><option value="+90 Turkey">+90 Turkey</option><option value="+993 Turkmenistan">+993 Turkmenistan</option><option value="+1 649 Turks and Caicos Islands">+1 649 Turks and Caicos Islands</option><option value="+688 Tuvalu">+688 Tuvalu</option><option value="+256 Uganda">+256 Uganda</option><option value="+380 Ukraine">+380 Ukraine</option><option value="+971 United Arab Emirates">+971 United Arab Emirates</option><option value="+44 United Kingdom">+44 United Kingdom</option><option value="+1 United States">+1 United States</option><option value="+598 Uruguay">+598 Uruguay</option><option value="+1 340 US Virgin Islands">+1 340 US Virgin Islands</option><option value="+998 Uzbekistan">+998 Uzbekistan</option><option value="+678 Vanuatu">+678 Vanuatu</option><option value="+58 Venezuela">+58 Venezuela</option><option value="+84 Vietnam">+84 Vietnam</option><option value="+681 Wallis and Futuna">+681 Wallis and Futuna</option><option value="+970 West Bank">+970 West Bank</option><option value="+967 Yemen">+967 Yemen</option><option value="+260 Zambia">+260 Zambia</option><option value="+263 Zimbabwe">+263 Zimbabwe</option></select></div>
			</div>
							 
			</div>
			
			<div class="row">
				<div class="col-md-offset-5 col-md-3"><div type="submit" class="btn btn-danger"  value="Save" onclick="checkValidPhone('phone_popup_form',1)" >Save</div></div>
			</div>
		 </form>	
	  </div>
    
    <div class="modal-content code-content hide">
		  <div class="modal-header">
				Enter Your Code
			</div><div class="modal-body">
		  	<form action="javascript:void(0);" id="code_popup_form" method="POST" data-parsley-validate  enctype="multipart/form-data">
			<div class="err_phne_label"></div>
			
			<div class="row">
				<div class="col-md-12"><input class="form-control" data-parsley-required name="key" placeholder="Enter your code" /></div>
			</div>
							 
			</div>
			
			<div class="row">
				<div class="col-md-offset-5 col-md-3"><div type="submit" class="btn btn-danger"  value="Save" onclick="checkValidCode('code_popup_form',1)" >Save</div></div>
			</div>
		 </form>	
		 </div>
	  </div>
    </div>
  </div>
  
</div>
{/if}
{if $loged.userid > 0 and $loged.zipcode == ''}
<div class="modal fade" id="userinfo" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
		  <div class="modal-header">
				User Information
			</div>
		  <div class="modal-body">
		  	<form action="/profile_settings/address" id="address_popup_form" method="POST" data-parsley-validate  enctype="multipart/form-data">
			<div class="update_lbl">Please Update your information.Thank you for choosing</div>
			<div class="usr_inf_img">
			<img src="{$config.url}/images/logoc.png" class="img-responsives"/>
			</div>
			<div class="row">
				<div class="col-md-3 usr_info_lbl">Address1</div>
				<div class="col-md-6"><input class="form-control" data-parsley-required name="address" placeholder="Enter your address" /></div>
			</div>
			<div class="row">
				<div class="col-md-3 usr_info_lbl">Address2</div>
				<div class="col-md-6"><input class="form-control"  name="address2" placeholder="Optional" /></div>
			</div>
			<div class="row">
				<div class="col-md-3 usr_info_lbl">Zip Code</div>
				<div class="col-md-6">
				<div><input class="form-control" data-parsley-required name="zipcode" placeholder="Enter Zip Code" id="zipcode" onblur="checkStateCity('address_popup_form',0)" /></div>
				<input type="hidden" name="state" id="state" value="{$user.state}" />
                 <input type="hidden" name="country" id="country" value="{$user.country}" />
                 <input type="hidden" name="city" id="city" value="{$user.city}" />
                 <br />
                 <div class="form-group addresscity font-14" >
                  
                 </div> 
               </div>				 
			</div>
			
			<div class="row">
				<div class="col-md-offset-5 col-md-3"><div type="submit" class="btn btn-danger"  value="Save" onclick="checkStateCity('address_popup_form',1)" >Save</div></div>
			</div>
		 </form>	
	  </div>
    </div>
  </div>
  
</div>
{/if}
<script src="{$config['externaljs']}owl.carousel.js"></script>

<script src="{$config['externaljs']}common.js"  type="text/javascript"></script>
<script type="text/javascript"  language="javascript" src="{$config['externaljs']}bootstrap.js"></script>
<script type="text/javascript"  language="javascript" src="{$config['externaljs']}register.js"></script>
{if $loged.phonevalid == '' and $phonecheckup == 1}
<script type="text/javascript">
 $(function(){
  $('#phoneinfo').modal('show')
 });
function checkValidCode(id,r)
{
	var params = $('#'+id).serialize();
    $.ajax({
        type: "POST",
        url: "/phone_setup_code?cmd=3",
        data: params,
        dataType : 'json',        
        success: function(data){
        	if(data.error)
        	{
               alert('Not Valid Code');
        	}
        	else
        	{
               window.location.href = '{$config.url}'
        	}           
         }
        });
}
function checkValidPhone(id,r)
{
 	var params = $('#'+id).serialize();
 	console.log(params);
    $.ajax({
        type: "POST",
        url: "/phone_setup?cmd=2",
        data: params,
        dataType : 'json',        
        success: function(data){
        	if(data.error)
        	{
               alert(data.message);
        	}
        	else
        	{
               $('.phone-content').addClass('hide');
               $('.code-content').removeClass('hide');
        	}           
         }
        });
       
 }
</script>
{/if}
<script type="text/javascript">

var formFunction = '';
function closeAll()
{
	$.ajax({
        type: "GET",
        url: "{$config.url}/product/closeall",
        data: '',        
        success: function(data){
        	console.log(2);
        	console.log(data);
            
           
         }
        });
       
}
$(function() {
	console.log(2);
  closeAll();
  if(typeof(startDate) !== 'undefined')
  $("#date_added").datepicker({ minDate: startDate });

});
function intializeForm(form)
{
  formFunction = form;
}
function checkStateCity(form,id)
    {
    	console.log(id);
    	console.log("http://maps.googleapis.com/maps/api/geocode/json?address="+$('#'+form+' #zipcode').val());
    	var params = {};
    	if (window.XDomainRequest) {
            if (window.XDomainRequest) {
                var xdr = new XDomainRequest();
                var query = "http://maps.googleapis.com/maps/api/geocode/json?address="+$('#'+form+' #zipcode').val();
                if (xdr) {
                    xdr.onload = function () {
                    	console.log(JSON.parse(xdr.responseText));
                        sZipcode(JSON.parse(xdr.responseText),form,id);
                     }
                    xdr.onerror = function () { /* error handling here */ }
                    xdr.open('GET', query);
                    xdr.send();
                }
            }
        }
        else {
       $.ajax({
        type: "GET",
        url: "http://maps.googleapis.com/maps/api/geocode/json?address="+$('#'+form+' #zipcode').val(),
        data: params,
        
        success: function(data){
        	sZipcode(data,form,id);
            
           
         }
        });
       }
    }   
    function sZipcode(data,form,id)
    {
    	console.log(data);
    	if(data['results'].length > 0)
          {
            var m = data['results'][0]['address_components'].length;
           if(typeof(data['results'][0]['address_components'][m-3]) === 'undefined')
           {
             alert('Invalid Zipcode');
            //$('#'+form+' #zipcode').focus();
            $('#'+form+' .addresscity').html('Invalid Zipcode');
            return false;
           } 
           $('#'+form+' #city').val(data['results'][0]['address_components'][m-3]['long_name']);
           $('#'+form+' #state').val(data['results'][0]['address_components'][m-2]['long_name']);
           $('#'+form+' #country').val(data['results'][0]['address_components'][m-1]['long_name']);
           $('#'+form+' .addresscity').html($('#city').val()+','+$('#state').val()+','+$('#country').val());
           if(id == 1)
           {
           	 $('#'+form).submit();
           }	
           if(id == 2)
           {
           	 formFunction();
           }
          }
          else
          {
            alert('Invalid Zipcode');
            //$('#'+form+' #zipcode').focus();
            $('#'+form+' .addresscity').html('Invalid Zipcode');
            return false;
          }
    }
    
</script>
{foreach $external2js as $key => $val}
 <script src="{$config['externaljs']}{$val}.js"  type="text/javascript"></script>
{/foreach}
{if $register_fail == 1} <script type="text/javascript">
      $(function() { $('#registration').modal('show'); 
  });
	</script> {/if}
	{if $login_fail == 1} <script type="text/javascript">
      $(function() { $('#Login').modal('show'); 
  });
	</script> {/if}
	{if $timer > 0}
         <script type="text/javascript">
	      $(function() { 
	      	 runTimer();
	      });
		</script>
	{else}
	  	 <script type="text/javascript">
	      $(function() { 
	      	 removeAllItems();
	      });
		</script>	
	{/if}
	<script type="text/javascript">
      $(function() { 
      	$('.cart').on('click',function()
      	{	
             var k = parseInt($(this).html());
             if(k == 0)
             {
             	return false;
             }	
             else
             {
             	window.location = '{$config.url}/product/checkout/cart/'
             }	
      	});
     });
	</script> 	
	{if $loged.userid > 0 and $loged.zipcode == '' and $disable_zip_popup != 1}
	<script type="text/javascript">
 $(document).ready(function() {
 	//loadCity();
 	$(function()
	{
	 $('#country').on('change',function()
	  {
	    var m = $('#country option[value="'+$(this).val()+'"]').attr('attr');
	    
	    //$('#state').html('');
	    loadLocation('country',m,'','');
	    $('#states').parent().find('ul li.parsley-required').hide();
	    $('#cities').parent().find('ul li.parsley-required').hide();
	    
	    
	  });
	  $('#states').on('change',function()
	  {
	    var m = $('#states option[value="'+$(this).val()+'"]').attr('attr');
	    
	    //$('#state').html('');
	    loadLocation('state',m,'','');
	    $('#cities').parent().find('ul li.parsley-required').hide();
	    
	  });
	});
	   $('#userinfo').modal({
	    show: true,
	   })
 });
</script>
{/if}

{/if}

<div style="clear:both"></div>
  </body>
</html>
