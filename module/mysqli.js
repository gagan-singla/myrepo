//
var mysqli = [];
exports.mysqli = function(data,row)
{
     k = mysqli[row];

     for(var i in data)
     {

         k = k.replace(new RegExp('{{'+i+'}}', 'g'), data[i]);


     }
     if(row == 13)
     console.log(k);
     return k;
}
exports.seoURL= function(isenable)
{
     delete mysqli.seourl;
     if(isenable == 1)
         m =  'REPLACE(REPLACE(p.title, "/", "") , " ", "_") as ptitleurl, ';
     else
         m =  '"" as ptitleurl,';


     console.log(isenable+' enable');
      return m;
}

console.log('seoenable');
console.log(global.seo.enable);
console.log(mysqli.seourl);

exports.loadMysqli = function() {
     mysqli.seourl = this.seoURL(global.seo.enable);
     mysqli['cntbid'] = ',(select count(distinct bid.user_id) as bid from bids as bid where bid.project_id = p.id and bid.declined = 0) as bids';
     mysqli[0] = 'select email,id,password_salt,password_hash,first_name,last_name,admin,status,zip,country,phone,used_image_space from users where email = "{{username}}" Limit 1';
     mysqli[1] = 'select ' + mysqli.seourl + ' p.*' + mysqli['cntbid'] + ' from projects as p inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt   and date_added <= "{{datge}}" and date_closed >= "{{datge}}" and market_status = "open" group by p.id order by p.id desc';
     mysqli[2] = 'select ' + mysqli.seourl + ' p.*' + mysqli['cntbid'] + ' from projects as p inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt   and date_added <= "{{datge}}" and date_closed >= "{{datge}}" and market_status = "open" and p.feature = 1 group by p.id order by p.id desc';

     mysqli[3] = 'select *' + mysqli['cntbid'] + ' from projects  where date_added >= "{{datge}}" and feature = 1 and market_status = "open"  order by id desc LIMIT 10';
     mysqli[4] = 'select *' + mysqli['cntbid'] + ' from projects  where date_closed <= "{{datge}}" and market_status != "removed" order by id desc limit 10';
     mysqli[5] = 'select c.id,c.name,c.parent_id,c.lft,c.rgt, (COUNT(parent.id) - 1) AS depth from categories as c, categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt  group by c.id   order by c.lft asc';
     mysqli[6] = 'select ' + mysqli.seourl + 'p.*' + mysqli['cntbid'] + ',c.name from projects AS p  where date_added <= "{{datge}}" and date_closed >= "{{datge}}" and buynow = 1 and market_status = "open"';
     mysqli[7] = 'select ' + mysqli.seourl + 'SUBSTRING(CONCAT(u.first_name," ",SUBSTRING(u.last_name,1,1)),1,20) AS uname,CASE WHEN p.auction =0 THEN p.bprice ELSE p.wprice END AS sea_price,p.*' + mysqli['cntbid'] + ',c.name from projects AS p inner join users as u on u.id = p.user_id inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt and date_added <= "{{datge}}" and market_status = "open" and date_closed >= "{{datge}}"   {{cid}}  {{search}} {{where}} group by p.id order by p.id desc {{limit}}';
     mysqli[8] = 'select ' + mysqli.seourl + 'p.*' + mysqli['cntbid'] + ',c.name from projects AS p inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt and date_added >= "{{datge}}" and market_status = "open"  {{cid}}  {{search}} group by p.id order by p.id desc';
     mysqli[9] = 'select ' + mysqli.seourl + 'p.*' + mysqli['cntbid'] + ',c.name from projects AS p inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt  and date_closed <= "{{datge}}" and market_status != "removed"  {{cid}}  {{search}} group by p.id order by p.id desc ';
     mysqli[10] = 'select ' + mysqli.seourl + ' p.*' + mysqli['cntbid'] + ',c.name from projects AS p inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt  and date_added <= "{{datge}}" and market_status = "open" and date_closed >= "{{datge}}" {{cid}}    {{search}} and buynow = 1';
     mysqli[11] = 'insert into users (email,role,first_name,last_name,password_hash,password_salt,created_at,balance,status,country,state) values ("{{email}}","{{role}}",?,?,"{{password_hash}}","{{password_salt}}","{{created_at}}",0,"unverified","{{country}}","{{state}}")';
     mysqli[12] = 'select id,email,first_name,last_name from users  where email = "{{email}}" order by id desc';
     mysqli['cid'] = ' and p.category_id IN (select c.id from categories as s WHERE c.lft between s.lft and s.rgt and s.id IN ({{cid}}))';
     mysqli['search'] = ' and (p.title like "%{{search}}%" or p.description like "%{{search}}%"  or p.tags like "%{{search}}%") ';
     mysqli['title'] = ' and p.title like "%{{search}}%"';
     mysqli['avatar'] = ' and avatar IS NOT NULL';
     mysqli['noshipping'] = ' and shipping_price = 0 ';
     mysqli['pid'] = ' and p.id = {{pid}}';
     mysqli[13] = 'select ' + mysqli.seourl + 'SUBSTRING(CONCAT(u.first_name," ",SUBSTRING(u.last_name,1,1)),1,20) AS uname,CASE WHEN p.auction =0 THEN p.bprice ELSE p.wprice END AS sea_price,p.*' + mysqli['cntbid'] + ' from projects AS p inner join users as u on u.id = p.user_id  inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt and p.id > 0 {{cid}}  {{search}} {{where}} group by p.id order by {{order}}';
     mysqli[14] = 'insert into projects  (title,description,avatar,image,category_id,tags,user_id,shipping_price,shipping_description,created_at,updated_at,buynow,feature,sprice,rprice,date_added,date_closed,status,bprice,mprice,iprice,wprice,auction,is_same_location,document,work_loc,qty,paypal_address,duration,duration_type,`time`,time_level,future,market_status,country,state,city,sell_location) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
     mysqli[15] = 'select ' + mysqli.seourl + 'p.*,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0 AND b.declined = 0) as bids from projects AS p where p.user_id = ? and p.market_status !="removed" {{where}} order by updated_at desc limit ?,?';
     mysqli[16] = 'select *' + mysqli['cntbid'] + ' from projects where date_added <= "{{datge}}" and date_closed >= "{{datge}}" and market_status = "open" order by id desc';
     mysqli[17] = 'select *' + mysqli['cntbid'] + ' from projects  where date_added >= "{{datge}}"  order by id desc';
     mysqli[18] = 'select user_id from projects where user_id = ?  {{where}} order by id desc';
     mysqli[19] = 'select ' + mysqli.seourl + ' p.*,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id and b.declined = 0) as bids,date_format(p.date_added,"%m/%d/%Y") as date_add,date_format(p.date_closed,"%m/%d/%Y") as date_close,u.first_name,u.email,u.phone,u.last_name,c.name,u.review,u.avatar as uimage from projects as p left join categories as c on c.id = p.category_id left join users as u on u.id = p.user_id where p.id = ? limit 1';
     mysqli[20] = 'insert into bids  (project_id,user_id,created_at,proposed_amount) values (?,?,?,?)';
     mysqli[20] = 'insert into bids  (project_id,user_id,created_at,proposed_amount) values (?,?,?,?)';
     mysqli[21] = 'update projects set wprice = ? where id =  ? limit 1';
     mysqli[22] = 'select user_id,proposed_amount from bids where project_id =  ? and user_id = ? and declined = 0 ORDER BY proposed_amount DESC limit 1';
     mysqli[23] = 'update bids set proposed_amount = ? where project_id =  ? and user_id = ? limit 1';
     mysqli[24] = 'select b.user_id,CONCAT(u.first_name," ",u.last_name) AS name,b.proposed_amount,u.state,date_format(b.created_at,"%m/%d/%Y %H:%i:%s %p") as date_add from bids AS b inner join users as u on u.id = b.user_id where b.project_id =  ? and b.declined = 0 order by proposed_amount desc limit 100';
     mysqli[25] = 'select ?? from users where id = ? Limit 1';
     mysqli[26] = 'select * from packages';
     mysqli[27] = 'update users set customerid = ?, paymentid = ?, paymethod = ? where id =  ? limit 1';
     mysqli[28] = 'update users set balance = balance+? where id =  ? limit 1';
     mysqli[29] = 'select * from packages where id =  ? limit 1';
     mysqli[30] = 'update users set balance = balance-? where id =  ? limit 1';
     mysqli[31] = 'INSERT INTO invoices (id, transactionid, gateway, date_added, user_id, primary_id, type, description, amount,status,istatus) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
     mysqli[32] = 'select b.id,b.proposed_amount,b.user_id,u.first_name,u.email,u.phone,u.last_name,b.project_id from bids as b inner join users as u on u.id = b.user_id where b.project_id = ? and b.declined = 0 order by b.proposed_amount desc limit 1';
     mysqli[34] = 'update projects set market_status = ? where id =  ? and market_status = "open" limit 1';
     mysqli[33] = 'select count(distinct b.user_id) as bid from bids AS b inner join users as u on u.id = b.user_id where b.project_id =  ? and b.declined = 0 order by proposed_amount desc';
     mysqli[35] = 'update bids set awarded = 1,awarded_date = ? where id =  ? and awarded = 0 and declined = 0 limit 1';
     mysqli[36] = 'select ' + mysqli.seourl + ' p.*,b.user_id,SUBSTRING(CONCAT(u.first_name," ",u.last_name),1,20) AS name,u.state,u.country,u.avatar AS uavatar,b.proposed_amount from bids AS b inner join users as u on u.id = b.user_id and b.awarded = 1 inner join projects as p on p.id = b.project_id order by p.date_closed desc';
     mysqli[37] = 'select ' + mysqli.seourl + 'p.title,p.description,b.user_id,b.proposed_amount,date_format(b.awarded_date,"%m/%d/%Y") as adate,b.awarded,p.status,p.avatar,p.date_closed,p.id,(select count(bp.id) as id from bids AS bp where bp.user_id = b.user_id and bp.project_id = p.id) as bids from bids AS b inner join projects as p on p.id = b.project_id and b.user_id = ? {{where}}  group by p.id order by b.id desc {{limit}}';
     mysqli[38] = 'select p.id  from bids AS b inner join projects as p on p.id = b.project_id and b.user_id = ?  {{where}} group by p.id order by b.id desc';
     mysqli[39] = 'select ' + mysqli.seourl + 'p.title,p.id,b.user_id,b.proposed_amount,p.status,p.avatar,p.date_closed,(select count(bp.id) as id from bids AS bp where bp.user_id = b.user_id and bp.project_id = p.id) as bids,b.id as b_id from bids AS b inner join projects as p on p.id = b.project_id and b.user_id = ? and b.awarded = 1 order by b.id desc limit ?, 10';
     mysqli[40] = 'select p.id  from bids AS b inner join projects as p on p.id = b.project_id and b.user_id = ? and b.awarded = 1 order by b.id desc';
     mysqli[41] = 'select * from invoices where user_id = ? order by id desc limit ?, 10';
     mysqli[42] = 'select id from invoices where user_id = ? order by id desc';
     mysqli[43] = 'select id from invoices where id = ? order by id desc';
     mysqli[44] = 'update users set reserve_amount = reserve_amount+? where id = ? limit 1';
     mysqli[47] = 'update users set reserve_amount = reserve_amount-? where id = ? limit 1';
     mysqli[45] = 'insert into bids  (project_id,user_id,created_at,proposed_amount,reserved,reserved_date) values (?,?,?,?,1,?)';
     mysqli[46] = 'select user_id,proposed_amount AS amt,id from bids where project_id =  ? order by proposed_amount desc limit 1';
     mysqli[48] = 'update users set reserve_amount = reserve_amount-?,balance=balance-? where id = ? limit 1';
     mysqli[49] = 'select id from watchlists where user_id = ? and project_id = ? limit 1';
     mysqli[50] = 'INSERT INTO watchlists (id,project_id,user_id,date_added) VALUES (NULL, ?, ?, ?)';
     mysqli[51] = 'select ' + mysqli.seourl + 'p.title,b.user_id,p.status,p.avatar,p.date_closed,p.id from watchlists AS b inner join projects as p on p.id = b.project_id and b.user_id = ? order by b.id desc limit ?, 10';
     mysqli[52] = 'select p.id  from watchlists AS b inner join projects as p on p.id = b.project_id and b.user_id = ? order by b.id desc';
     mysqli[53] = 'delete from watchlists where project_id = ? and user_id = ? limit 1';
     mysqli[54] = 'update users set email = ?, first_name = ?, last_name = ?,aboutme = ?,avatar = ?,  image = ?, address1 = ?, address2 = ?, country    = ?, state = ?, city = ?, zip = ?, phone = ?,profile_url =?,paypal_address = ?,status = ?  where id =  ? limit 1';
     mysqli['newphone'] = 'update users set email = ?, first_name = ?, last_name = ?,aboutme = ?,avatar = ?,  image = ?, address1 = ?, address2 = ?, country    = ?, state = ?, city = ?, zip = ?, phone = ?,profile_url =?,paypal_address = ?,verifyphone = 0  where id =  ? limit 1';
     mysqli[55] = 'select ?? from projects where id = ? Limit 1';
     mysqli[56] = 'update projects set market_status = "removed", status = 0 where id =  ?  limit 1';
     mysqli[57] = 'update users set password_hash = ?, password_salt = ? where email = ?  limit 1';
     mysqli[58] = 'select transactionid from invoices where transactionid = ? limit 1';
     mysqli[59] = 'select sum(if(date_added <= ? and  date_closed >= ? and market_status = "open",1,0)) as open, sum(if(date_added <= ? and date_closed <= ? and market_status = "closed",1,0)) as closed, sum(if(date_added >= ? and  date_closed >= ?,1,0)) as future, sum(if(market_status = "sold",1,0)) as sold  from projects';
     mysqli[60] = 'select sum(if(status = "active",1,0)) as active, sum(if(status = "unverified",1,0)) as unverified, sum(if(status = "moderate",1,0)) as moderate, sum(if(status = "deactivate" or status = "unsubscribe",1,0)) as cancel  from users';
     mysqli[61] = 'select sum(if(type = "package",1,0)) as package,sum(if(type = "winner",1,0)) as winner,sum(if(type = "bid",1,0)) as bid,sum(if(type = "sold",1,0)) as sold from invoices';
     mysqli[62] = 'select email,first_name,last_name,balance,status,date_format(created_at,"%d %M, %Y") as cdate,id from users where status = ? order by id DESC limit ?, 10 ';
     mysqli[63] = 'select email,first_name,last_name,balance,status,date_format(created_at,"%d %M, %Y") as cdate,id from users where (status = ? or status = ?) order by id DESC limit ?, 10';
     mysqli[64] = 'select email,first_name,last_name,balance,status,date_format(created_at,"%d %M, %Y") as cdate,id from users order by id DESC limit ?, 10';
     mysqli[65] = 'select id from users where status = ?';
     mysqli[66] = 'select id from users where (status = ? or status = ?)';
     mysqli[67] = 'select id from users';
     mysqli[68] = 'update bids set reserve = 0  where id = ? limit 1';

     mysqli[69] = 'update users set status = ?  where id = ? limit 1';
     mysqli[70] = 'select email,first_name,last_name,balance,status,date_format(created_at,"%d %M, %Y") as cdate,id from users where email like "%{{email}}%" and last_name like "%{{last_name}}%" and status like "%{{status}}%" and first_name like "%{{first_name}}%" order by id DESC limit ?, 10';
     mysqli[71] = 'select email,first_name,last_name,balance,status,date_format(created_at,"%d %M, %Y") as cdate,id from users where email like "%{{email}}%" and last_name like "%{{last_name}}%" and status like "%{{status}}%" and first_name like "%{{first_name}}%" order by id DESC';
     mysqli[72] = 'update projects  set title = ?,description = ?,avatar = ?,image = ?,category_id = ?,tags = ?,shipping_price = ?,shipping_description = ?,buynow = ?,feature = ?,sprice = ?,rprice = ?,bprice = ?,mprice = ?,auction = ?,is_same_location = ?,document = ?,work_loc = ?,qty = ?+sold,paypal_address = ?,market_status = ?  where id = ? limit 1';

     mysqli[73] = 'select ' + mysqli.seourl + 'p.*,date_format(p.date_added,"%m/%d/%Y") as date_add,date_format(p.date_closed,"%m/%d/%Y") as date_close,u.first_name,u.email,u.last_name from projects as p left join users as u on u.id = p.user_id where p.id > 0 {{where}}  order by p.id desc  limit ?, 10';
     mysqli[74] = 'select p.id from projects as p left join users as u on u.id = p.user_id where p.id > 0 {{where}} ';
     mysqli[75] = 'select c.*, (COUNT(parent.id) - 1) AS depth from categories as c, categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt group by c.id order by c.lft asc limit ?,10';
     mysqli[76] = 'select c.*, (COUNT(parent.id) - 1) AS depth from categories as c, categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt group by c.id order by c.lft asc';
     mysqli[77] = 'select c.* from categories as c where c.id = ?';
     mysqli[78] = 'insert into categories (name,description,created_at,updated_at,type,lft,rgt,parent_id) values(?,?,?,?,"product",?,?,?)';
     mysqli[79] = 'update categories set  name = ?,description = ?,updated_at = ? where id = ?';
     mysqli[80] = 'select i.*,date_format(i.date_added,"%m/%d/%Y") as date_add,u.first_name,u.email,u.last_name,p.title,p.id as pid from invoices as i left join projects as p on ((p.id = i.primary_id and i.type in ("sold","winner","holded","declined","Feature Listing Fee","Home Page Listing Fee","Feature & Home Page Listing Fee","Membership Fee","commission")) or (i.type = "bid" and p.id in (select b.project_id from bids as b where b.id = i.primary_id))) left join users as u on u.id = i.user_id where i.id > 0 {{where}} order by i.id desc  limit ?, 10';
     mysqli[81] = 'select count(i.id) AS id,sum(i.amount) AS paid from invoices as i left join projects as p on ((p.id = i.primary_id and i.type in ("sold","winner","holded","declined","Feature Listing Fee","Home Page Listing Fee","Feature & Home Page Listing Fee","Membership Fee","commission")) or (i.type = "bid" and p.id in (select b.project_id from bids as b where b.id = i.primary_id))) left join users as u on u.id = i.user_id where i.id > 0 {{where}}';
     mysqli[82] = 'select i.*,date_format(i.date_added,"%m/%d/%Y") as date_add,u.first_name,u.email,u.last_name,p.title,p.id as pid from invoices as i left join projects as p on ((p.id = i.primary_id and i.type in ("sold","winner","holded","declined","Feature Listing Fee","Home Page Listing Fee","Feature & Home Page Listing Fee","Membership Fee","commission")) or (i.type = "bid" and p.id in (select b.project_id from bids as b where b.id = i.primary_id))) left join users as u on u.id = i.user_id where i.id > 0 {{where}} order by i.id desc ';
     mysqli[83] = 'insert into buynow (project_id,user_id,amount,date_added) values(?,?,?,?)';
     mysqli[84] = 'update users set balance=balance-? where id = ? limit 1';
     mysqli[85] = 'select p.title,b.release,b.r_date,b.feedback,p.id,b.user_id,b.id as b_id,b.amount,b.amount as proposed_amount,b.qty,p.status,p.avatar,date_format(b.date_added,"%d %M, %Y") AS adate,1 as awarded,1 as buynow  from buynow AS b inner join projects as p on p.id = b.project_id and b.user_id = ?  order by b.id desc limit ?, 10';
     mysqli[86] = 'select p.id from buynow AS b inner join projects as p on p.id = b.project_id and b.user_id = ? and win = 0';
     mysqli[87] = 'update users set fb_id = ?, fb_json = ? where id =  ? limit 1';
     mysqli[88] = 'select * from users where fb_id =  ? limit 1';
     mysqli[89] = 'update users set li_id = ?, li_json = ? where id =  ? limit 1';
     mysqli[90] = 'select * from users where li_id =  ? limit 1';
     mysqli[91] = 'insert into reviews (user_id,date_added,subject,message,rating,dispute) values(?,?,?,?,?,?)';
     mysqli[92] = 'select ' + mysqli.seourl + 'p.*,date_format(p.date_added,"%m/%d/%Y") as date_add,u.first_name,u.email,u.last_name from reviews as p left join users as u on u.id = p.user_id where p.id > 0 and p.dispute = 0   order by p.id desc  limit ?, 10';
     mysqli[93] = 'select u.last_name from reviews as p left join users as u on u.id = p.user_id where p.id > 0  and p.dispute = 0  order by p.id desc';
     mysqli[94] = 'select ' + mysqli.seourl + 'p.*,date_format(p.date_added,"%m/%d/%Y") as date_add,u.first_name,u.email,u.last_name,SUBSTR(p.description,1,50) as description_short from blogs as p left join users as u on u.id = p.user_id where p.id > 0   order by p.id desc  limit ?, 10';
     mysqli[95] = 'select u.last_name from blogs as p left join users as u on u.id = p.user_id where p.id > 0   order by p.id desc';
     mysqli[96] = 'insert into blogs (title,description,date_added,user_id,status) values (?,?,?,?,?)';
     mysqli[97] = 'select ' + mysqli.seourl + 'p.*,u.first_name,SUBSTR(p.description,1,50) as description_short,date_format(p.date_added,"%m/%d/%Y") as date_add from blogs as p left join users as u on u.id = p.user_id   where p.id = ?';
     mysqli[98] = 'update blogs set title = ? ,description = ? where id = ?';
     mysqli[99] = 'update blogs set image = ? ,avatar = ? where id = ?';
     mysqli[100] = 'update blogs set status = ?  where id = ?';

     mysqli[101] = 'insert into user_addresses  (name,address1,address2,country,state,city,zipcode,phone,user_id,type) values (?,?,?,?,?,?,?,?,?,?)';
     mysqli[102] = 'select * from user_addresses where user_id = ? and  type = ?  order by id asc limit 1';
     mysqli[103] = 'update user_addresses set name = ?,address1 = ?,address2 = ?,country = ?,state = ?,city = ?,zipcode=?,phone=? where user_id = ? and  type = ?  order by id asc limit 1';
     mysqli[104] = 'insert into referral (from_id,to_id,date_added,source,points,status) values (?,?,?,?,?,?)';
     mysqli[105] = 'select u.email,u.first_name,u.last_name,u.avatar,date_format(r.date_added,"%d %M, %Y") as added,r.id,r.status from referral as r left join users as u on r.to_id = u.id  where r.from_id = ?   order by id asc';
     mysqli[106] = 'select p.id,p.title from projects p where p.date_added <= "{{datge}}" and p.date_closed >= "{{datge}}" and p.market_status not in ("sold","closed") and p.id not in(select a.project_id from projects_autobid a where a.project_id = p.id and user_id =  ?) ';
     mysqli[107] = 'insert into projects_autobid  (user_id,project_id,start_amount,amount,balance,date_added) values (?,?,?,?,?,?)';
     mysqli[108] = 'update projects_autobid  set balance=balance-? ,bids = bids +1,date_updated = ? where user_id = ? and  project_id = ? ';
     mysqli[109] = 'select id from projects_autobid where user_id = ? and  project_id = ?   order by id asc';
     mysqli[110] = 'select p.id,p.title,p.avatar,date_format(p.date_closed,"%d %M, %Y") as closedon ,a.balance from projects_autobid a inner join projects p on p.id = a.project_id where a.user_id = ? and  p.market_status = "open" and p.status = 1   order by id asc';
     mysqli[111] = 'select user_id,amount,balance from projects_autobid where project_id = ? and balance >= ?+0.01 and status !="closed"   order by balance desc limit 1';
     mysqli[112] = 'select user_id,amount,balance from projects_autobid where project_id = ? and balance >= ?+0.01  and status !="closed"  order by balance desc limit 1,1';
     mysqli[113] = 'update projects_autobid  set status="closed" , date_updated = ?   where  project_id = ? and user_id not in(?) and status!="closed"';

    mysqli[151] = 'select p.*,SUBSTR(p.description,1,100) as description_short,date_format(p.date_added,"%m/%d/%Y") as date_add,u.first_name,u.email,u.last_name from blogs as p left join users as u on u.id = p.user_id where p.id > 0  and p.status = "open"  and (p.title like "{{search}}%" or p.description like "{{search}}%") order by p.id desc  limit ?, 10';

	mysqli['blogcnt'] = 'select p.id from blogs as p left join users as u on u.id = p.user_id where p.id > 0  and p.status = "open"  and (p.title like "{{search}}%" or p.description like "{{search}}%") order by p.id desc';
	mysqli[152] = 'select p.*,SUBSTR(p.message,1,50) as message_short,date_format(p.date_sent,"%m/%d/%Y") as date_add,concat(f.first_name," ",f.last_name) as fname,concat(t.first_name," ",t.last_name) as tname,f.avatar as favatar,t.avatar as tavatar from pmb as p inner join users as f on f.id = p.from_id inner join users as t on t.id = p.to_id and p.id = (select m.id from pmb as m where m.r_id = p.r_id {{where1}} order by m.id desc limit 1) where (p.from_id = ? or p.to_id = ?) {{where}} group by p.r_id  order by p.id desc  limit ?, 5';
	mysqli[153] = 'select p.id from pmb as p inner join users as f on f.id = p.from_id inner join users as t on t.id = p.to_id where (p.from_id = ?  or p.to_id = ?) {{where}} group by p.r_id order by p.id desc ';
	mysqli['msgunread'] = 'select p.id from pmb as p inner join users as f on f.id = p.from_id inner join users as t on t.id = p.to_id where `read` = 0 AND (p.from_id = ?  or p.to_id = ?) {{where}} group by p.r_id order by p.id desc ';
	mysqli[154] = 'select p.*,SUBSTR(p.message,1,50) as message_short,date_format(p.date_sent,"%m/%d/%Y") as date_add,concat(f.first_name," ",f.last_name) as fname,concat(t.first_name," ",t.last_name) as tname from pmb as p inner join users as f on f.id = p.from_id inner join users as t on t.id = p.to_id where (p.from_id = ?  or p.to_id = ?) {{where}} order by p.id asc ';
     mysqli['notify_msg_counter'] = "select count(id) as msgs from pmb where visible = 0 and to_id = ?";
     mysqli['notified_msgs'] = "update pmb set visible = 1 where to_id = ?";


     mysqli['view_msg_by_id'] = 'select p.id from pmb as p inner join users as f on f.id = p.from_id inner join users as t on t.id = p.to_id where (p.from_id = ?  or p.to_id = ?) {{where}} order by p.id asc';
     mysqli[155] = 'update pmb set `read` = 1,date_read = ? where r_id = ? and to_id = ? ';
     mysqli[156] = 'insert into pmb (from_id,to_id,`read`,subject,message,date_sent,date_read,r_id,from_status,to_status,project_id) values (?,?,0,?,?,?,"0000-00-00 00:00:00",?,?,?,?)';
     mysqli[157] = 'update pmb set to_status = ? where r_id = ? and to_id = ? ';
     mysqli[158] = 'update pmb set from_status = ? where r_id = ? and from_id = ? ';
     mysqli[159] = 'select id,email,first_name,last_name,admin from users ORDER BY first_name ASC';
     mysqli[160] = 'select id from bids where user_id = ? and project_id = ? and awarded = 1';
     mysqli[161] = 'select id from buynow where user_id = ? and project_id = ? ';
     mysqli[162] = 'select ' + mysqli.seourl + 'p.*,date_format(p.date_added,"%m/%d/%Y") as date_add,date_format(p.date_closed,"%m/%d/%Y") as date_close,u.first_name,u.email,u.last_name from projects as p left join users as u on u.id = p.user_id where p.market_status = "open" and p.date_closed < ? group by id order by id desc';
     mysqli[163] = 'insert into product_images (avatar,image,date_added,project_id) values (?,?,?,?) ';
     mysqli[164] = 'select * from  product_images where project_id = ?  and type = "image"';
     mysqli[165] = 'delete from  product_images where  id NOT IN ({{delete}}) and project_id = ? and type = "image"';
     mysqli[166] = 'select ?? from users where  admin = 1 limit 1';
     mysqli[167] = 'select ' + mysqli.seourl + 'p.*,u.first_name,SUBSTR(p.description,1,50) as description_short,date_format(p.date_added,"%m/%d/%Y") as date_add from blogs as p left join users as u on u.id = p.user_id WHERE p.status = "open" order by p.id desc limit 5';
     mysqli[168] = 'select ' + mysqli.seourl + 'p.*,date_format(p.date_added,"%m/%d/%Y") as date_add,u.first_name,u.email,u.last_name from reviews as p left join users as u on u.id = p.user_id where p.id > 0 and p.dispute = 1   order by p.id desc  limit ?, 10';
     mysqli[169] = 'select u.last_name from reviews as p left join users as u on u.id = p.user_id where p.id > 0  and p.dispute = 1  order by p.id desc';
     mysqli[170] = 'select * from withdrawals where user_id = ?';
     mysqli[171] = 'insert into withdrawals (user_id,amount,date_added,details,method,paid) values(?,?,?,?,?,0) ';
     mysqli[172] = 'select w.*,CONCAT(u.first_name," ",u.last_name) AS name from withdrawals as w inner join users as u on u.id = w.user_id order by w.id desc limit ?,10';
     mysqli[173] = 'update  withdrawals set paid = 1,paid_date = ? where id = ? and paid = 0 limit 1';
     mysqli[174] = 'select id from withdrawals order by id desc';
     mysqli[175] = 'select c.*, (COUNT(parent.id) - 1) AS depth from categories as c, categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt  group by c.id order by c.lft asc';
     mysqli[176] = 'select max(rgt) as mrgt from categories ';
     mysqli[177] = 'update categories set rgt = rgt + 2 where rgt > ?';
     mysqli[178] = 'update categories set lft = lft + 2 where lft > ?';
     mysqli[179] = 'select max(lft) as mrgt from categories where id = ?';
     mysqli[180] = 'select lft,rgt, (rgt - lft + 1) as myw FROM categories where id = ?';
     mysqli[181] = 'delete FROM categories where lft between ? AND ?';
     mysqli[182] = 'update categories set rgt = rgt - ? where rgt > ?';
     mysqli[183] = 'update categories set lft = lft - ? where lft > ?';


     mysqli[184] = 'select * from  membership ';
     mysqli[185] = 'select * from  membership_plan';
     mysqli[186] = 'select * from  membership_permission';
     mysqli[187] = 'select mp.*,m.name as rolename,mpe.name as permissionname from  membership_plan as mp left join membership as m on mp.membership_id = m.id  left join membership_permission As mpe on mp.permission_id = mpe.id';
     mysqli[188] = 'select * from  membership_permission';
     mysqli[189] = 'insert into  membership values ("",?,?)';
     mysqli[190] = 'update  membership set name = ?, description = ? where id = ?';
     mysqli[191] = 'insert into  membership_plan (name,description,amount,length,format,membership_id,permission_id) values (?,?,?,?,?,?,?)';
     mysqli[192] = 'update  membership_plan set name = ?, description = ?,amount = ?,length = ?,format = ?,membership_id = ?,permission_id = ? where id = ?';
     mysqli[193] = 'insert into  membership_permission values ("",?,?)';
     mysqli[194] = 'select * from membership_permission_default';
     mysqli[195] = 'select * from membership_permission_detail where plan_id = ?';
     mysqli[196] = 'insert into membership_permission_detail values ("",?,?,?)';
     mysqli[197] = 'update membership_permission_detail set value = ? where plan_id = ? and permission_id = ?';
     mysqli[199] = 'select mpd.*,mpde.varname from  membership_permission_detail as mpd inner join membership_permission_default as mpde on mpde.id = mpd.permission_id inner join membership_permission as mp on mp.id = mpd.plan_id inner join membership_plan as mpl on mpl.permission_id = mp.id inner join membership_user as mu on mu.plan_id = mpl.id where mu.status ="active" and mu.user_id = ?';
     mysqli[200] = 'select id,parentid,lft,rgt from categories where parent_id = ? order by id asc';
     mysqli[201] = 'update categories set rgt = rgt + ?,lft = lft + ? where cid = ?';
     mysqli[202] = 'select * from membership_user where user_id = ?';
     mysqli[203] = 'insert into membership_user (plan_id,user_id,status,date_paid,paid,added_date,renewal_date,recurring,tran_id) values (?,?,?,?,?,?,?,?,?)';
	 mysqli[204] = 'update membership_user set plan_id = ?,status = ?,date_paid = ?,paid = ?,added_date = ?,renewal_date = ?,recurring = ?,tran_id = ? where user_id = ?';
     mysqli[205] = 'select * from membership_user where user_id = ?';
     mysqli[206] = 'select sum(if(year(p.created_at) = ? and p.created_at>mu.added_date  and p.user_id = ?,1,0)) as ycnt,sum(if(month(p.created_at) = ? and year(p.created_at) = ? and  p.created_at>mu.added_date and p.user_id = ?,1,0)) as mcnt,sum(if(year(p.created_at) = ? and p.date_added>mu.added_date  and p.user_id = ?,p.used_image_space,0)) as used_image_space from projects as p left join membership_user as mu on mu.user_id=p.user_id';
     mysqli[207] = 'select sum(if(year(b.created_at) = ?  and b.created_at > mu.added_date and b.user_id = ?,1,0)) as ycnt,sum(if(month(b.created_at) = ? and year(b.created_at) = ? and b.created_at > mu.added_date  and b.user_id = ?,1,0)) as mcnt from bids as b left join membership_user as mu on mu.user_id = b.user_id';

     mysqli["total_buy_now"] = 'select sum(if(year(p.date_added) = ? and p.date_added>mu.added_date  and p.user_id = ?,1,0)) as ycnt,sum(if(month(p.date_added) = ? and year(p.date_added) = ? and  p.date_added>mu.added_date and p.user_id = ?,1,0)) as mcnt from buynow as p left join membership_user as mu on mu.user_id=p.user_id';

     mysqli[208] = 'update invoices set status = "paid",paid_date = ?,transactionid = ?,gateway = ? where primary_id = ? AND type="winner" ';
     mysqli[209] = 'select id from invoices where type = "sold" and primary_id = ?  order by id desc';
     mysqli[210] = 'select mp.* from membership_user as mu inner join membership_plan as mp on mp.id = mu.plan_id where mu.user_id = ?';
     mysqli[211] = 'select mpd.*,mp.name,mp.type from membership_permission_detail as mpd inner join membership_permission_default as mp on mp.id = mpd.permission_id order by mp.name asc';
     mysqli[212] = 'update membership_user set status = ?,plan_id=?,added_date=?,date_paid = ?,paid = ?,renewal_date = ? where user_id = ?';
     mysqli['cnx210'] = 'select * from checkout where user_id = ? order by id desc limit 1';
     mysqli['cnx211'] = 'insert into checkout (date_added,first_name,last_name,email,phone,address,country,state,city,zipcode,user_id,paid_date,paid,trans_id,amount) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
     mysqli['cnx212'] = 'insert into buynow (project_id,user_id,amount,date_added,ordered,cart_id,qty,refund,win,paid,paid_date,`release`,r_date,`escrow`,commission,local_pick,active) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
     mysqli['cnx213'] = 'select * from projects where id IN ({{where}})';
     mysqli['cnx214'] = 'update projects set sold = sold + ? where id = ?';
     mysqli['cnx215'] = 'update projects set market_status = "sold" where id = ?';
     mysqli['cnx216'] = 'INSERT INTO invoices (id, transactionid, gateway, date_added, user_id, primary_id, type, description, amount,status,istatus,paid_date,qty,cart_id) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)';
     mysqli['cnx217'] = 'update checkout set refund = ?,r_trans_id = ? where id = ?';
     mysqli['cnx218'] = 'select * from checkout where id = ?';
     mysqli['cnx219'] = 'select b.*,p.title,p.avatar,p.image from buynow as b inner join projects as p on p.id = b.project_id where b.cart_id = ?';
     mysqli['cnx220'] = 'select * from buynow where id = ?';
     mysqli['cnx221'] = 'select * from bids where id = ?';
     mysqli['cnx222'] = 'update buynow set `release` = 1,r_date = ? where id = ? and user_id = ? limit 1';
     mysqli['cnx223'] = 'update buynow set `release` = 2,r_date = ? where id = ? and user_id = ? limit 1';
     mysqli['cnx224'] = 'select b.*,p.id as p_id,b.id as b_id,p.title,p.image,p.avatar from buynow as b inner join projects as p on b.project_id = p.id where p.user_id = ? and b.qty > 0 order by b.id desc';
     mysqli['cnx225'] = 'select ' + mysqli.seourl + 'b.*,p.id as p_id,b.id as b_id,p.title,p.image,p.avatar,p.shipping_description from buynow as b inner join projects as p on b.project_id = p.id where p.user_id = ? and b.qty > 0 and b.active = 0 order by b.id desc {{limit}}';
     mysqli['cnx226'] = 'select * from buynow where user_id = ? and win = 0 and qty > 0';
     mysqli['cnx227'] = 'select ' + mysqli.seourl + 'p.id as id,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,1 as buynow,d.id AS dispute_id,d.subject,d.message  from buynow as b inner join projects as p on b.project_id = p.id LEFT JOIN disputes d ON d.project_id = b.project_id where b.user_id = ? and b.win = 0  and b.qty > 0 order by b.id desc {{limit}}';
     mysqli['cnx228'] = 'select * from buynow where user_id = ? and win = 1';
     mysqli['cnx229'] = 'select b.*,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,d.id AS dispute_id,d.subject,d.message from buynow as b inner join projects as p on p.id = b.project_id LEFT JOIN disputes d ON d.project_id = b.id where b.user_id = ? and b.win = 1 and b.active = 0 order by b.id desc {{limit}}';
     mysqli['cnx230'] = 'update buynow set `paid` = 1,cart_id = ?,`paid_date` = ?,`release` = ?,r_date = ?,escrow = ? where id = ? limit 1';
     mysqli['cnx231'] = 'update buynow set `shipping_info` = ?,tracking_number = ?, tracking_service = ? where id = ? limit 1';
     mysqli['cnx232'] = 'select concat(u.first_name," ",u.last_name) as name,b.id as buynow_id,p.image,p.avatar,p.title from buynow as b  inner join projects as p on p.id = b.project_id inner join users as u on u.id = p.user_id where b.id = ?';
     mysqli['cnx233'] = 'insert into feedback (title,content,date_added,buynow_id) values(?,?,?,?)';
     mysqli['cnx234'] = 'insert into feedback_detail (id,f_id,point,type_id) values(NULL,?,?,?)';
     mysqli['cnx235'] = 'update buynow set feedback = 1 where id = ? limit 1';
     mysqli['cnx236'] = 'update feedback set average = ? where id = ? limit 1';
     mysqli['cnx237'] = 'update users set review = (review+?)/2 where id = ? limit 1';
     mysqli['cnx238'] = 'select f.*,fd.type_id,fd.point,ff.field_name from feedback as f inner join feedback_detail as fd inner join feedback_fields as ff  on fd.f_id = f.id and ff.id = fd.type_id where f.buynow_id = ? order by ff.position asc';
     mysqli['cnx239'] = 'select b.local_pick,c.trans_id,concat(u.first_name," ",u.last_name) as name,u.email,u.address1 as uaddress,u.country as seller_country,u.state as seller_state,u.city as seller_city,u.zip as seller_zip,u.phone as seller_phone ,c.*,b.id as buynow_id,p.title,b.amount as amt,b.refund as refundamt, date_format(b.paid_date,"%M %d %Y %h:%i:%s %p") as pay_date,date_format(b.date_added,"%M %d %Y %h:%i:%s %p") as create_date,concat(us.first_name," ",us.last_name) as uname from buynow as b inner join projects as p on p.id = b.project_id inner join users as us on us.id = b.user_id inner join users as u on u.id = p.user_id inner join checkout as c on c.id = b.cart_id  where b.id  = ?';
     mysqli['cnx240'] = 'select concat(u.first_name," ",u.last_name) as name,p.title,u.address1 as uaddress,c.*,b.id as buynow_id,b.commission,p.paypal_address,p.qty,b.admin,b.paid,b.release,p.title,b.project_id,p.avatar,date_format(b.date_added,"%M %d %Y %h:%i:%s %p") as create_date,date_format(b.paid_date,"%M %d %Y %h:%i:%s %p") as pay_date,date_format(b.r_date,"%M %d %Y %h:%i:%s %p") as r_date,b.admin,p.image,b.amount as amt,date_format(b.paid_date,"%M %d %Y %h:%i:%s %p") as pay_date,concat(us.first_name," ",us.last_name) as uname from buynow as b inner join projects as p on p.id = b.project_id inner join users as us on us.id = b.user_id inner join users as u on u.id = p.user_id inner join checkout as c on c.id = b.cart_id order by b.id desc limit ?,10';
     mysqli['cnx241'] = 'select id from buynow';
     mysqli['cnx242'] = 'select concat(u.first_name," ",u.last_name) as name,c.trans_id,p.title,u.address1 as uaddress,c.*,b.id as buynow_id,p.qty,b.admin,b.paid,b.release,p.title,b.project_id,p.paypal_address,p.avatar,date_format(b.date_added,"%M %d %m,%Y %h:%i:%s %p") as create_date,date_format(b.paid_date,"%M %d %m,%Y %h:%i:%s %p") as pay_date,date_format(b.r_date,"%M %d %m,%Y %h:%i:%s %p") as r_date,b.admin,p.image,b.amount as amt,date_format(b.paid_date,"%M %d %m,%Y %h:%i:%s %p") as pay_date,concat(us.first_name," ",us.last_name) as uname from buynow as b inner join projects as p on p.id = b.project_id inner join users as us on us.id = b.user_id inner join users as u on u.id = p.user_id inner join checkout as c on c.id = b.cart_id where b.id = ? order by b.id desc limit 1';
     mysqli['cnx243'] = 'update buynow set admin=? where id=?';
     mysqli['cnx244'] = 'select i.*,b.id as buyid from invoices as i left join buynow as b on b.project_id = i.primary_id and b.win = 1 and b.active = 0 inner join projects as p on p.id = i.primary_id inner join users as us on us.id  = p.user_id inner join users as u on u.id = i.user_id where i.active = 0 and i.user_id = ? or p.user_id = ?';
     mysqli['cnx245'] = 'select i.*,b.id as buyid from invoices as i left join buynow as b on b.project_id = i.primary_id and b.win = 1 and b.active = 0 inner join projects as p on p.id = i.primary_id inner join users as us on us.id  = p.user_id inner join users as u on u.id = i.user_id where i.active = 0 and i.user_id = ? or p.user_id = ? order by i.id desc limit ?,10';
     mysqli['cnx246'] = 'select * from shipping where user_id = ?';
     mysqli['cnx247'] = 'insert into shipping (first_name,last_name,email,phone,address,country,state,city,zipcode,user_id) values (?,?,?,?,?,?,?,?,?,?)';
     mysqli['cnx248'] = 'update shipping set first_name = ?,last_name = ?,email = ?,phone = ?,address = ?,country = ?,state = ?,city = ?,zipcode = ? where user_id = ?';
     mysqli['cnx249'] = 'update projects  set title = ?,description = ?,avatar = ?,image = ?,category_id = ?,tags = ?,shipping_price = ?,shipping_description = ?,buynow = ?,feature = ?,home_page_listing_fee = ?, sprice = ?,rprice = ?,bprice = ?,mprice = ?,auction = ?,is_same_location = ?,document = ?,work_loc = ?,qty = ?+sold,paypal_address = ?,duration=?,duration_type=?, `time` = ?, time_level = ?,future = ?, date_added = ?, date_closed = ?, market_status = ?,country = ?,state = ?,city = ?,sell_location = ?,updated_at = ?  where id = ? limit 1';
     mysqli['cnx250'] = 'update projects  set {{feature}} {{home_page}} where id = ?';
     mysqli['cnx251'] = 'update invoices  set buynow_id = ? where cart_id = ? and primary_id = ?';
     mysqli['cnx252'] = 'select i.*,b.id as buyid,date_format(i.paid_date,"%Y-%M-%d") as date_paid,date_format(i.date_added,"%Y-%M-%d") as date_add from invoices as i left join buynow as b on b.project_id = i.primary_id and b.win = 1  inner join projects as p on p.id = i.primary_id inner join users as us on us.id  = p.user_id inner join users as u on u.id = i.user_id where i.user_id = ? or p.user_id = ? order by i.id desc';

     mysqli['cnx253'] = 'update buynow set admin=1 where id in (?)';
     mysqli['cnx254'] = 'select ' + mysqli.seourl + ' p.*' + mysqli['cntbid'] + ' from projects as p inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt   and date_added <= "{{datge}}" and date_closed >= "{{datge}}" and p.market_status = "open" and p.category_id = ? and p.id != ? group by p.id order by p.id desc';
     mysqli['cnx255'] = 'update users set zip = ?,state = ?,city =?,country =?,address1 =?,address2 =?  where id = ?';
//timer cart
     mysqli['timer1'] = 'insert into cart_temp (cart_id,project_id,date_added,r_id,qty,paid,revert,user_id) values (NULL,?,?,?,?,?,?,?)';
     mysqli['timer2'] = 'update projects set booked = booked + ? where id = ?';
     mysqli['timer3'] = 'update projects set booked = booked - ? where id = ?';
     mysqli['timer4'] = 'delete from cart_temp  where r_id = ? and project_id = ? and user_id = ?';
     mysqli['timer4'] = 'delete from cart_temp  where r_id = ? and project_id = ? and user_id = ?';
     mysqli['timer5'] = 'select * from projects where id in (?)';
     mysqli['timer6'] = 'update cart_temp set qty = ?  where r_id = ? and project_id = ? and user_id = ?';
     mysqli['timer7'] = 'select a.qty,a.cart_id as id,a.project_id,b.date_added from cart_temp as a inner join cart_temp as b on a.r_id = b.r_id and b.cart_id = (select c.cart_id from cart_temp as c where c.r_id = b.r_id order by c.cart_id asc limit 1) where DATE_SUB(?,INTERVAL ? SECOND) > b.date_added';
     mysqli['timer8'] = 'delete from cart_temp  where r_id = ?';
     mysqli['timer9'] = 'delete from cart_temp  where cart_id = ?';
     mysqli['timer10'] = 'delete from cart_temp  where project_id = ? and r_id = ?';
     mysqli['timer11'] = 'update projects set booked = 0 where booked < 0';
     mysqli['timer12'] = 'select * from cart_temp  where project_id = ? and user_id = ?';

     mysqli[114] = 'select cid from profile_categories where user_id = ? and cid = ?  limit 1';
     mysqli[115] = 'delete from profile_categories where user_id = ? and cid not in ( ? ) ';
     mysqli[116] = 'insert into profile_categories (user_id,cid) values (?,?)';
     mysqli[117] = 'SELECT GROUP_CONCAT( cid ) as mcat FROM  profile_categories WHERE  user_id = ? ';
     mysqli[118] = 'select u.email,u.first_name,u.last_name,u1.first_name as refererFname,u1.last_name as refererLname,u1.email as refererEmail,u.avatar,date_format(r.date_added,"%d %M, %Y") as added,r.id,r.status,r.from_id from referral as r inner join users as u on r.to_id = u.id inner join users as u1 on r.from_id = u1.id  where r.from_id > 0   order by id asc   limit ?, 10';
     mysqli[119] = 'update referral set status = 1 where id =  ? limit 1';
     mysqli[120] = 'select u.email,u.first_name,u.last_name,u1.first_name as refererFname,u1.last_name as refererLname,u1.email as refererEmail,u.avatar,date_format(r.date_added,"%d %M, %Y") as added,r.id,r.status from referral as r inner join users as u on r.to_id = u.id inner join users as u1 on r.from_id = u1.id  where r.from_id > 0   order by id asc';
     mysqli[121] = 'delete from user_addresses where user_id = ? and  type = ?  order by id asc limit 1';
//mysqli[122]= 'select * from bids where project_id = ?';


     mysqli[252] = 'select * from  categories_questions where cid = ?';
     mysqli[253] = 'select * from  categories where id = ?';
     mysqli[254] = 'insert into categories_questions (id,cid,name,value,type,`default`,required) values(NULL,?,?,?,?,?,?)';
     mysqli[255] = 'select * from  categories_questions where id = ?';
     mysqli[256] = 'update categories_questions set name = ?,value = ?,type = ?,`default` = ?,required  = ? where id = ?';
     mysqli[257] = 'select * from  categories_questions where cid in (select p.id from categories as p where p.lft <= (select c.lft from categories as c where id = ?) and p.rgt >=  (select c.rgt from categories as c where id = ?) )';
     mysqli[258] = 'insert into project_answers (id,project_id,question_id,value) values(NULL,?,?,?)';
     mysqli[259] = 'select c.*,q.name from project_answers as c inner join categories_questions as q on q.id = c.question_id where c.project_id = ?';
     mysqli[260] = 'delete  from project_answers where project_id = ?';
     mysqli[261] = 'update categories set parent_id = ?, name = ?, description = ?,updated_at = ? where id = ?';
     mysqli[262] = 'update categories set parent_id = ? where parent_id = ?';
     mysqli[263] = 'select * from categories where parent_id = ?';
     mysqli[264] = 'update categories set lft = ?,rgt = ? where id = ?';
     mysqli[265] = 'delete from categories  where id = ? or parent_id = ?';
     mysqli[266] = 'update projects  set status = "closed" where category_id = ?';
     mysqli[267] = 'select * from location where location_type = ? order by name asc';
     mysqli[268] = 'select * from location where  parent_id = ?';
     mysqli[269] = 'update users set status = "active" where id = ?';
     mysqli[270] = 'insert into creditcards(card_name,card_type,support_customer_id,token_id,encrypt_card,date_added,status,support,expiration_month,expiration_year,user_id,id) values (?,?,?,?,?,?,?,?,?,?,?,NULL)';
     mysqli[271] = 'update projects set market_status = "open"  where market_status = "moderate" and id = ?';
     mysqli[272] = 'update categories set rgt = ? where id = ?';
     mysqli[273] = 'update categories set lft = ? where id = ?';
     mysqli[274] = 'select * from categories  order by name asc';
     mysqli['category_queries_1'] = 'select c.*, (COUNT(parent.id) - 1) AS depth from categories as c, categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt and c.parent_id = ? group by c.id order by c.name asc';
     mysqli['category_queries_2'] = 'select c.*, (COUNT(parent.id) - 1) AS depth from categories as c inner join categories AS parent on c.lft BETWEEN parent.lft AND parent.rgt where c.lft <= ? and c.rgt >= ? group by parent.id  order by parent_id ASC';
     mysqli['category_queries_3'] = 'select * from categories where id = ?';
     mysqli[283] = 'select * from users as u   left join    profile_categories as pc on pc.user_id = u.id WHERE   pc.cid = ?';
     mysqli[291] = 'select ' + mysqli.seourl + 'p.* from projects as p where p.market_status = "open" and p.auction ="0" and p.date_added <= ? and p.date_closed >= ? order by p.date_closed ASC limit 20';

     mysqli[292] = 'select ' + mysqli.seourl + 'p.* from projects as p where p.market_status = "open" and p.sold > 0 and p.date_added <= ? and p.date_closed >= ? order by p.sold desc limit 20';

     mysqli['homePageListing'] = 'select ' + mysqli.seourl + 'p.* from projects as p where p.market_status = "open" AND home_page_listing_fee = 1 and p.date_added <= ? and p.date_closed >= ? order by p.id desc limit 20';
     /*mysqli[292] = 'select p.* from projects as p inner join users as u on u.id = p.user_id where p.market_status = "open" and p.date_added <= ? and p.date_closed >= ? group by u.id order by u.review desc limit 20';*/
     mysqli[293] = 'select ' + mysqli.seourl + 'p.* from projects as p inner join users as u  on u.id = p.user_id inner join categories AS c on c.id = p.category_id,  categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt AND p.market_status = "open" and p.date_added <= ? and p.date_closed >= ? and parent.id = ? order by p.id desc limit 50';
     mysqli[294] = 'select * from creditcards where user_id = ?';
     mysqli[295] = 'select * from creditcards where id = ?';
     mysqli[296] = 'update projects  set feature = 0 where id = ?';
     mysqli[297] = 'insert into demo_form (first_name,last_name,email,phone,country_code,date_added) values (?,?,?,?,?,?)';

     mysqli[299] = 'select * from saved_search where id=?';
     mysqli[298] = 'select p.avatar,f.* from feedback as f inner join buynow as b inner join projects as p on b.id= f.buynow_id and p.id= b.project_id where f.buynow_id  IN (SELECT id FROM buynow WHERE user_id = ?) order by f.id desc {{limit}}';
     mysqli[299] = "SELECT u.email,u.first_name,u.last_name, u.id, bd.awarded,bd.project_id,bd.created_at, i.description, i.amount, i.status,p.user_id FROM users u INNER JOIN bids bd ON u.id = bd.user_id INNER JOIN projects p ON p.id = bd.project_id INNER JOIN invoices i ON bd.user_id = i.user_id WHERE bd.awarded =1 AND i.status =  'unpaid' AND DATEDIFF( NOW( ) , bd.created_at ) < ?";

     mysqli[308] = 'insert into userdel (fname,lname,sub,msg) values (?,?,?,?)';

     mysqli[309] = 'select * from userdel';
     mysqli[340] = 'SELECT sold.*,bid.*,buynow.*,winner.* FROM (SELECT COUNT( id ) as sold FROM  invoices WHERE type IN ("sold",  "winner") and status="paid") as sold,(SELECT COUNT( id ) as bid FROM invoices WHERE type IN ("winner") ) as bid,(SELECT COUNT( id ) as winner FROM invoices WHERE type IN ("winner") and status = "paid" ) as winner ,(SELECT COUNT( id ) as buynow FROM invoices WHERE type IN ("sold") ) as buynow';
     mysqli[341] = 'insert into product_images (avatar,image,date_added,project_id,`type`) values (?,?,?,?,"digital") ';
     mysqli[342] = 'select * from  product_images where project_id = ?  and type = "digital"';
     mysqli[343] = 'delete from  product_images where  id NOT IN ({{delete}}) and project_id = ? and type = "digital"';
     mysqli[799] = "SELECT brs.first_name, brs.last_name, slr.first_name AS sfirst,pro.id as pid, slr.last_name AS slast,fd.id,fd.average,fd.date_added FROM feedback fd INNER JOIN buynow bn ON fd.buynow_id = bn.id INNER JOIN projects pro ON pro.id = bn.project_id  INNER JOIN users slr ON slr.id = pro.user_id INNER JOIN users brs ON brs.id = bn.user_id ORDER BY fd.date_added DESC";
     mysqli[800] = "SELECT brs.first_name, brs.last_name, slr.first_name AS sfirst,pro.id as pid, slr.last_name AS slast,fd.id,fd.average,fd.date_added FROM feedback fd INNER JOIN buynow bn ON fd.buynow_id = bn.id INNER JOIN projects pro ON pro.id = bn.project_id  INNER JOIN users slr ON slr.id = pro.user_id INNER JOIN users brs ON brs.id = bn.user_id ORDER BY fd.date_added DESC limit ?,?";
     mysqli[801] = 'delete from feedback where id = ?';
     mysqli[802] = 'SELECT * FROM feedback_fields ORDER BY position ASC';
     mysqli[803] = 'insert into feedback_fields (field_name,position) values(?,?)';
     mysqli[804] = 'delete from feedback_fields where id = ?';
     mysqli[805] = 'SELECT * from feedback_fields where id = ?';
     mysqli[806] = 'update feedback_fields set field_name = ?, position = ? where id = ?';
     mysqli[807] = "SELECT brs.first_name, brs.last_name, slr.first_name AS sfirst,pro.id, slr.last_name AS slast,fd.id,fd.average,fd.date_added FROM feedback fd INNER JOIN buynow bn ON fd.buynow_id = bn.id INNER JOIN projects pro ON pro.id = bn.project_id  INNER JOIN users slr ON slr.id = pro.user_id INNER JOIN users brs ON brs.id = bn.user_id WHERE DATE(fd.date_added) = ? ORDER BY fd.date_added ASC";
     mysqli[808] = 'select ' + mysqli.seourl + 'p.*,date_format(p.date_added,"%m/%d/%Y") as date_add,u.first_name,u.email,u.last_name from reviews as p left join users as u on u.id = p.user_id where p.id > 0  and p.dispute = 0 order by p.id desc limit ?, 10';
     mysqli[809] = 'select u.last_name from reviews as p left join users as u on u.id = p.user_id where p.id > 0 and u.id != ? and p.dispute = 0  order by p.id desc';
     mysqli[810] = 'select f.id,f.buynow_id,ff.field_name,fd.point from feedback as f inner join feedback_detail as fd inner join feedback_fields as ff inner join buynow as bd on f.id= fd.f_id and fd.type_id= ff.id and f.buynow_id = bd.id where bd.user_id = ? order by f.id desc';
     mysqli[811] = 'update feedback_fields set position = (position+1) where position >= ? and position < ?';
     mysqli[812] = 'update feedback_fields set position = (position-1) where position <= ? and position > ?';
     mysqli[813] = 'update feedback_fields set position = (position+1) where position >= ?';
     mysqli[814] = 'update feedback_fields set position = (position-1) where position > ?';
     mysqli[815] = 'SELECT b.id,b.project_id,b.user_id,p.title,u.first_name, u.last_name,u.email,u.phone FROM bids b INNER JOIN projects p ON p.id = b.project_id INNER JOIN users u ON u.id = b.user_id WHERE project_id =? AND b.user_id != ? and b.declined = 0 GROUP BY b.user_id';
     mysqli[816] = 'SELECT b.id,b.project_id,b.user_id,p.title,u.first_name, u.last_name,u.email,u.phone FROM buynow b INNER JOIN projects p ON p.id = b.project_id INNER JOIN users u ON u.id = b.user_id WHERE b.id=? limit 1';

     mysqli[819] = 'SELECT * FROM templates ORDER BY id ASC';
     mysqli[820] = 'insert into templates (title,subject,type,method,template,date_added,buyer,seller,admin,general,status) values (?,?,?,?,?,?,?,?,?,?,?)';
     mysqli[821] = 'SELECT * FROM templates where method=? ORDER BY id ASC {{limit}}';
     mysqli[822] = 'SELECT * from templates where id = ?';
     mysqli[823] = 'update templates set title = ?, subject = ?, type = ?, template = ?,buyer = ?,seller = ?,admin = ?,general = ? where id = ?';
     mysqli[824] = 'delete from templates where id = ?';
     mysqli[825] = 'SELECT * FROM templates where method=? {{where}} ORDER BY id ASC {{limit}}';

     mysqli[827] = 'insert into templates (title, subject, type, method, template, date_added, buyer, seller, admin, general, status) values(?,?,?,?,?,?,?,?,?,?,?)';
     mysqli[828] = 'insert into templates (title,subject,type,method,template,date_added,buyer,seller,admin,general,status) values (?,?,?,?,?,?,?,?,?,?,?)';
     mysqli[829] = 'update templates set title = ?, subject = ?, type = ?, template = ?,buyer = ?,seller = ?,admin = ?,general = ? where id = ?';
     mysqli[830] = 'insert into mailer_management (name,user,pass,type,status) values(?,?,?,?,?)';
     mysqli[831] = 'update mailer_management set name = ?, user = ?, pass = ?, type = ? where id= ?';
     mysqli[832] = 'SELECT * FROM mailer_management ORDER BY id DESC {{limit}}';
     mysqli[833] = 'SELECT * FROM mailer_management where id = ? limit 1';
     mysqli[834] = 'delete from mailer_management where id = ?';
     mysqli[835] = 'update mailer_management set status = 0 where id= ?';
     mysqli[836] = 'SELECT count(id) as sum FROM mailer_management where type=? and status = 1';
     mysqli[837] = 'update mailer_management set status = 1 where id= ?';
     mysqli[838] = 'delete from reviews where id = ?';

     mysqli[840] = 'SELECT * FROM templates where title=? and method = "email"';
     mysqli[841] = 'SELECT * FROM mailer_management where type = "email" and status = 1 limit 1';
     mysqli[842] = 'SELECT * FROM mailer_management where id = 2';
     mysqli[843] = 'SELECT * FROM templates where title=? and method = "sms"';
     mysqli[844] = 'select mu.*,mp.name as plan_name,m.name as rolename from membership_user as mu inner join membership_plan as mp on mp.id=mu.plan_id inner join membership as m on m.id=mp.membership_id inner join membership_permission as mpe on mpe.id=mp.permission_id where mu.user_id=? ';

     mysqli[847] = 'delete from referral where id = ?';
     mysqli[848] = 'SELECT SUM(points) as points FROM referral r INNER JOIN users u ON u.id = r.to_id  WHERE r.from_id = ? and r.status = 1 and u.status="active"';
     mysqli[849] = 'SELECT u.first_name,u.last_name,u.avatar,u.email,u.image,r.source,r.date_added FROM referral r INNER JOIN users u ON u.id = r.to_id  WHERE r.from_id = ? and r.status = 1 and u.status="active" order by r.id asc limit ?, 10';
     mysqli[850] = 'SELECT u.first_name,u.last_name,u.avatar,u.email,u.image,r.source,r.date_added FROM referral r INNER JOIN users u ON u.id = r.to_id  WHERE r.from_id = ? and r.status = 1 and u.status="active" order by r.id asc';
     mysqli[851] = 'SELECT u.first_name,u.last_name,u.email,u.phone,p.user_id,p.id FROM projects p INNER JOIN users u ON u.id = p.user_id  WHERE p.user_id = ? and p.id = ?';
     mysqli[852] = 'SELECT * FROM templates where title=? and method = "email"';
     mysqli[853] = 'SELECT * FROM categories where parent_id= 0';
     mysqli[854] = 'SELECT * FROM `categories` where parent_id != 0';

     mysqli[855] = "SELECT title FROM projects";
     /*Remianders*/
     mysqli[899] = 'SELECT b.project_id,b.user_id,p.title, u.first_name, u.last_name, u.email, u.phone, b.proposed_amount,p.shipping_price, i.status, i.date_added FROM bids b INNER JOIN invoices i ON i.primary_id = b.project_id INNER JOIN users u ON u.id = b.user_id INNER JOIN projects p ON p.id = b.project_id WHERE i.status = "unpaid" AND b.awarded =1  AND i.date_added >= DATE_SUB( SYSDATE( ) , INTERVAL ? DAY ) AND b.user_id = ? AND b.project_id = ? limit 1';
     mysqli[900] = 'SELECT b.project_id,b.user_id,p.title, u.first_name, u.last_name, u.email, u.phone, b.proposed_amount,p.shipping_price, i.status, i.date_added FROM bids b INNER JOIN invoices i ON i.primary_id = b.project_id INNER JOIN users u ON u.id = b.user_id INNER JOIN projects p ON p.id = b.project_id WHERE i.status = "unpaid" AND b.awarded =1  AND i.date_added >= DATE_SUB( SYSDATE( ) , INTERVAL ? DAY )';
     mysqli[901] = 'SELECT b.id,b.project_id,b.user_id,p.title, u.first_name, u.last_name, u.email, u.phone, b.proposed_amount,p.shipping_price, i.status, i.date_added FROM bids b INNER JOIN invoices i ON i.primary_id = b.project_id INNER JOIN users u ON u.id = b.user_id INNER JOIN projects p ON p.id = b.project_id WHERE i.status = "unpaid" AND b.awarded =1  AND b.declined = 0 AND i.date_added <= DATE_SUB( SYSDATE( ) , INTERVAL ? DAY )';
     mysqli[902] = 'SELECT b.id,b.user_id,b.project_id,p.title, u.first_name, u.last_name, u.email, u.phone, b.proposed_amount,p.shipping_price, i.status, i.date_added FROM bids b INNER JOIN invoices i ON i.primary_id = b.project_id INNER JOIN users u ON u.id = b.user_id INNER JOIN projects p ON p.id = b.project_id WHERE i.status = "unpaid" AND b.awarded =1  AND b.declined = 0 AND i.date_added <= DATE_SUB( SYSDATE( ) , INTERVAL ? DAY ) AND i.date_added >= DATE_SUB( SYSDATE( ) , INTERVAL ? DAY )';
     mysqli[903] = 'update projects set date_closed = ?,market_status="open" where id= ?';
     mysqli[904] = 'update bids set awarded = 0,declined = 1 where project_id = ?';
     mysqli[905] = 'update buynow set active = 1 where user_id = ? and project_id = ?';
     mysqli[906] = 'update invoices set active = 1 where user_id = ? and primary_id = ?';
     mysqli[907] = 'update proxybid set status = 0 where project_id = ?';
     /*Remianders*/
     /*Forums*/
     mysqli[950] = 'SELECT * FROM `forum_categories` where type = ?';
     mysqli[951] = 'INSERT INTO forum_questions (cid,uid,title,description,image,date_added) VALUES ( ?, ?, ?, ?, ?,? )';
     mysqli[952] = 'SELECT f.*,fc.catname,fc.id as catid,u.first_name,u.last_name,u.created_at,u.avatar,(select count(id)from forum_questions where uid =f.uid) as post_count  from  forum_questions f inner join users u on u.id = f.uid inner join forum_categories fc on fc.id = f.cid  where f.id = ?';
     mysqli[953] = 'SELECT f.*,u.first_name,u.last_name,u.created_at,u.avatar,(select count(id)from forum_questions where uid =f.uid) as post_count , (SELECT count(fqk.id) FROM `forum_question_kudos` as fqk where fqk.ansid= f.id) as kudos from  forum_answers f inner join users u on u.id = f.uid where f.qid = ? order by kudos desc limit ?,5';
     mysqli[954] = 'INSERT INTO forum_answers (uid,qid,title,image,description,date_added) VALUES ( ?, ?, ?, ?, ?, ?)';
     mysqli[955] = 'INSERT INTO forum_question_kudos (uid,qid,ansid,date_added) VALUES ( ?, ?, ?, ?)';
     mysqli[956] = 'SELECT * FROM forum_question_kudos where qid = ? and ansid = 0 and uid = ?'
     mysqli[957] = 'SELECT count(id) as kudos from forum_question_kudos where qid = ? and ansid = 0';
     mysqli[958] = 'SELECT * FROM forum_question_kudos where qid = ? and ansid != 0 and uid = ? group by ansid';
     mysqli[959] = 'update forum_questions set solution = 1 where id = ?';
     mysqli[960] = 'update forum_answers set solution = 1 where id = ?';
     mysqli[961] = 'SELECT *,(SELECT count(id) FROM forum_questions where cid  = fc.id and status = 1) as total_post FROM forum_categories fc';
     mysqli[962] = 'SELECT fq.*,(select count(id) from forum_answers where qid = fq.id) as replies,(select count(id) from forum_question_kudos where qid = fq.id and ansid = 0) as kudos,u.first_name,u.last_name FROM forum_questions fq inner join users u on u.id = fq.uid where fq.cid = ? order by fq.date_added DESC';
     mysqli[963] = 'update forum_questions set solution = 0 where id = ?';
     mysqli[964] = 'update forum_answers set solution = 0 where id = ?';
     mysqli[965] = 'DELETE FROM forum_question_kudos where uid = ? and qid = ? and ansid = 0';
     mysqli[966] = 'DELETE FROM forum_question_kudos where uid = ? and ansid = ?';
     mysqli[967] = 'SELECT * FROM `forum_categories` where id = ? limit 1';
     mysqli[968] = 'update forum_categories set catname = ? where id = ?';
     mysqli[969] = 'INSERT INTO forum_categories (catname,date_added) VALUES ( ?, ?)';
     mysqli[970] = 'DELETE FROM forum_categories where id = ?';
     mysqli[971] = 'SELECT * FROM forum_questions {{where}} limit 5';
     mysqli[973] = 'SELECT fq.*,(select count(id) from forum_answers where qid = fq.id) as replies,(select count(id) from forum_question_kudos where qid = fq.id and ansid = 0) as kudos,u.first_name,u.last_name FROM forum_questions fq inner join users u on u.id = fq.uid where fq.cid = ? order by fq.date_added DESC limit ?, 10';
     mysqli[974] = 'SELECT f.*,fc.catname,fc.id as catid,u.first_name,u.last_name,u.created_at,u.avatar,(select count(id)from forum_questions where uid =f.uid) as post_count  from  forum_questions f inner join users u on u.id = f.uid inner join forum_categories fc on fc.id = f.cid order by f.id DESC';
     mysqli[975] = 'SELECT f.*,fc.catname,fc.id as catid,u.first_name,u.last_name,u.created_at,u.avatar,(select count(id)from forum_questions where uid =f.uid) as post_count  from  forum_questions f inner join users u on u.id = f.uid inner join forum_categories fc on fc.id = f.cid order by f.id DESC limit ?, 10';
     mysqli[976] = 'DELETE FROM forum_questions where id = ?';
     mysqli[977] = 'DELETE FROM forum_answers where id = ?';
     mysqli[978] = 'update forum_questions set cid = ?,title = ?,description = ? where id = ?';
     mysqli[979] = 'update forum_questions set cid = ?,title = ?,description = ?,image = ? where id = ?';
     mysqli[980] = 'SELECT f.*,u.first_name,u.last_name,u.created_at,u.avatar,(select count(id)from forum_questions where uid =f.uid) as post_count , (SELECT count(fqk.id) FROM `forum_question_kudos` as fqk where fqk.ansid= f.id) as kudos from  forum_answers f inner join users u on u.id = f.uid where f.qid = ? order by kudos desc';
     mysqli[981] = 'SELECT * FROM `forum_questions` where title = ? limit 1';

     /*Forums*/
     mysqli[700] = 'select * from notification_types';
     mysqli[701] = 'update users set status = "deactivate"  where id = ?';
     mysqli[702] = 'select * from location WHERE parent_id= 0 ORDER BY name ASC';
     mysqli[703] = 'delete from membership_plan where id = ?';
     mysqli[704] = 'delete from membership_plan where membership_id = ?';
     mysqli[705] = 'delete from membership where id = ?';
     mysqli[706] = 'delete from membership_plan where permission_id = ?';
     mysqli[708] = 'delete from membership_permission where id = ?';
     mysqli[709] = 'delete from membership_user where plan_id = ?';
     mysqli[710] = 'select id from membership_plan where membership_id = ?';
     mysqli[711] = 'select id from membership_plan where permission_id = ?';
     mysqli[712] = 'SELECT * FROM shippers  ORDER BY shipperid ASC {{limit}}';
     mysqli[713] = 'INSERT INTO shippers (title,shipcode, domestic,international,carrier,trackurl,sort) VALUES ( ?, ?, ?, ?, ?, ?,? )';
     mysqli[714] = 'DELETE FROM shippers  WHERE shipperid = ?';
     mysqli['cat1'] = 'SELECT * FROM categories WHERE parent_id = ? ORDER BY name ASC';
     mysqli['cat1'] = 'SELECT * FROM categories WHERE parent_id = ? ORDER BY name ASC';
     mysqli['static1'] = 'select * from static_pages';
     mysqli['static2'] = 'select * from static_pages where id = ?';
     mysqli['static3'] = 'update static_pages set content = ? where id = ?';
     mysqli['savesearch'] = 'insert into saved_search (title,url,uid,date_added,searchtext) values (?,?,?,?,?)';
     mysqli['savedsearch'] = 'select s.*,date_format(s.date_added,"%a, %M %d %Y %h:%i %p") as added from saved_search as s where s.uid=? order by s.id DESC limit ?,10';
     mysqli['savedsearch1'] = 'select s.*,date_format(s.date_added,"%a, %M %d %Y %h:%i %p") as added from saved_search as s where s.uid=? order by s.id ';
     mysqli['deletesearch'] = 'delete from saved_search where id = ? and uid = ? limit 1';

     mysqli['inboxDelete'] = 'update pmb set to_status = ? where id IN ({{del_id}})';

     mysqli['sentboxDelete'] = 'update pmb set from_status = ? where id IN ({{del_id}})';

     mysqli['delete_credit_card'] = 'delete FROM creditcards WHERE token_id = ? AND user_id = ?'


     mysqli['stores_1'] = 'insert into stores (name,location,description,website,user_id,date_added,status,logo,date_started,banner) values(?,?,?,?,?,?,?,?,?,?)';
     mysqli['stores_2'] = 'select *,DATE_FORMAT(date_started,"%Y/%m/%d %H:%i") as dated_started,DATE_FORMAT(date_started,"%d %M, %Y at %H:%i") as date_starts from stores where id = ?';
     mysqli['stores_3'] = 'SELECT p2.*,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 0,1) as img1,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 1,1) as img2,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 2,1) as img3  FROM projects  as p2 where p2.id IN (select si.project_id from store_items as si where si.store_id = ? and si.visible = 1) {{where}}';
     mysqli['stores_4'] = 'select c.id,c.name,c.parent_id,(select count(p.id) from projects as p where p.category_id IN (select cc.id from categories as cc where cc.lft between c.lft and c.rgt)  and p.id IN (select si.project_id from store_items as si where si.store_id = ?  and si.visible = 1)) as cnt,(COUNT(parent.id) - 1) AS depth from categories as c, categories AS parent where c.lft BETWEEN parent.lft AND parent.rgt  group by c.id   order by c.lft asc';
     mysqli['stores_5'] = 'SELECT p2.*,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 0,1) as img1,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 1,1) as img2,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 2,1) as img3  FROM projects  as p2 where  p2.id IN (select si.project_id from store_items as si where si.store_id = ?  and si.visible = 1)  and p2.feature = 1';
     mysqli['stores_6'] = 'SELECT p2.*,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 0,1) as img1,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 1,1) as img2,(SELECT pi.avatar from product_images as pi where pi.project_id = p2.id and pi.type = "image" order by pi.id asc limit 2,1) as img3  FROM projects  as p2 where  p2.id NOT IN (select si.project_id from store_items as si where si.store_id = ?  and si.visible = 1) and p2.auction = 0 and p2.user_id = ? order by p2.id desc';
     mysqli['stores_7'] = 'update projects set storeid = ? where id = ? and user_id = ?';
     mysqli['stores_8'] = 'insert into store_items (project_id,store_id,date_added) values(?,?,?)';
     mysqli['stores_9'] = 'update stores set name=?,location=?,description=?,website=?,logo=?,date_started=?,banner = ? where id = ? and user_id =?';
     mysqli['stores_10'] = 'select s.*,(select count(si.project_id) as cnt from store_items as si where si.store_id = s.id) as products,(select sum(p.sold) as cnt from projects  as  p where p.id in (select si.project_id from store_items as si where si.store_id = s.id  and si.visible = 1)) as saled from stores as s where 1=1 {{where}}';
     mysqli['stores_11'] = ' update stores set name=?,location=?,description=?,website=?,logo=?,date_started=? where id = ?';
     mysqli['stores_12'] = ' update stores set status = "inactive" where id = ?';
     mysqli['stores_13'] = 'select *,DATE_FORMAT(date_started,"%Y/%m/%d %H:%i") as dated_started,DATE_FORMAT(date_started,"%d %M, %Y at %H:%i") as date_starts from stores where user_id = ?';
     mysqli['stores_14'] = 'select s.*,u.email,u.first_name,u.last_name from stores as s inner join users as u on u.id = s.user_id where s.id = ?';
     mysqli['stores_15'] = 'update store_items set visible = 0 where project_id = ? and store_id = ? and visible = 1 limit 1';
     mysqli['country_list'] = 'SELECT * FROM locations WHERE visible = 1';
     mysqli['stores_16'] = 'select s.*,(select count(si.project_id) as cnt from store_items as si where si.store_id = s.id) as products,(select sum(p.sold) as cnt from projects  as  p where p.id in (select si.project_id from store_items as si where si.store_id = s.id  and si.visible = 1)) as saled from stores as s where 1=1 {{where}} order by s.id desc limit ?, 10';

     mysqli['state_list'] = 'SELECT * FROM locations_states WHERE visible = 1 AND locationid = (SELECT locationid from locations WHERE location_eng = ?)';

     mysqli['update_local_pickup_cart'] = 'update buynow set `paid` = 2,local_pick = 1,cart_id = ?,`paid_date` = ?,`release` = ?,r_date = ?,escrow = ? where id = ? limit 1';

     mysqli['delete_buybow'] = 'delete from checkout where buynowid = ? limit 1';

     mysqli['update_attach_limit'] = 'update projects SET used_image_space = used_image_space + ? WHERE id = ?';

     /*Reports*/
     mysqli[600] = 'select i.*,b.id as buyid,us.first_name,us.last_name from invoices as i left join buynow as b on b.project_id = i.primary_id and b.win = 1 and b.active = 0 inner join projects as p on p.id = i.primary_id inner join users as us on us.id  = p.user_id inner join users as u on u.id = i.user_id where  i.active = 0 and i.status = ? and DATE( i.date_added ) = DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 DAY ) ) {{order}} {{limit}}';
     mysqli[601] = 'select i.*,b.id as buyid,us.first_name,us.last_name from invoices as i left join buynow as b on b.project_id = i.primary_id and b.win = 1 and b.active = 0 inner join projects as p on p.id = i.primary_id inner join users as us on us.id  = p.user_id inner join users as u on u.id = i.user_id where  i.active = 0 and i.status = ? and DATE( i.date_added ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 WEEK ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[602] = 'select i.*,b.id as buyid,us.first_name,us.last_name from invoices as i left join buynow as b on b.project_id = i.primary_id and b.win = 1 and b.active = 0 inner join projects as p on p.id = i.primary_id inner join users as us on us.id  = p.user_id inner join users as u on u.id = i.user_id where  i.active = 0 and i.status = ? and DATE( i.date_added ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 MONTH ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[603] = 'select i.*,b.id as buyid,us.first_name,us.last_name from invoices as i left join buynow as b on b.project_id = i.primary_id and b.win = 1 and b.active = 0 inner join projects as p on p.id = i.primary_id inner join users as us on us.id  = p.user_id inner join users as u on u.id = i.user_id where  i.active = 0 and i.status = ? and DATE( i.date_added ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 YEAR ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[604] = 'select i.*,b.id as buyid,us.first_name,us.last_name from invoices as i left join buynow as b on b.project_id = i.primary_id and b.win = 1 and b.active = 0 inner join projects as p on p.id = i.primary_id inner join users as us on us.id  = p.user_id inner join users as u on u.id = i.user_id where  i.active = 0 and i.status = ? and DATE( i.date_added ) BETWEEN DATE( ? ) AND DATE( ? ) {{order}} {{limit}}';

     mysqli[605] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE(date_closed) >= SYSDATE() and (market_status = "open" ) and DATE( date_added ) = DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 DAY ) ) {{order}} {{limit}}';
     mysqli[606] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE(date_closed) >= SYSDATE() and (market_status = "open" ) and DATE( date_added ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 WEEK ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[607] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE(date_closed) >= SYSDATE() and (market_status = "open" ) and DATE( date_added ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 MONTH ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[608] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE(date_closed) >= SYSDATE() and (market_status = "open" ) and DATE( date_added ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 YEAR ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[609] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE(date_closed) >= SYSDATE() and (market_status = "open" ) and DATE( date_added ) BETWEEN DATE( ? ) AND DATE( ? ) {{order}} {{limit}}';

     mysqli[610] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and market_status NOT IN ("draft","sold") and ((market_status = "closed") or date_closed < SYSDATE( ) ) and DATE( date_closed ) = DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 DAY ) ) {{order}} {{limit}}';
     mysqli[611] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and market_status NOT IN ("draft","sold") and ((market_status = "closed") or date_closed < SYSDATE( ) ) and DATE( date_closed ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 WEEK ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[612] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and market_status NOT IN ("draft","sold") and ((market_status = "closed") or date_closed < SYSDATE( ) ) and DATE( date_closed ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 MONTH ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[613] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and market_status NOT IN ("draft","sold") and ((market_status = "closed") or date_closed < SYSDATE( ) ) and DATE( date_closed ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 YEAR ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[614] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and market_status NOT IN ("draft","sold") and ((market_status = "closed") or date_closed < SYSDATE( ) ) and DATE( date_closed ) BETWEEN DATE( ? ) AND DATE( ? ) {{order}} {{limit}}';

     mysqli[615] = 'select ' + mysqli.seourl + ' p.*,b.id as b_id,u.first_name,u.last_name,b.paid_date from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id = b.user_id where b.qty > 0 and DATE( b.paid_date ) = DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 DAY ) ) {{order}} {{limit}}';
     mysqli[616] = 'select ' + mysqli.seourl + ' p.*,b.id as b_id,u.first_name,u.last_name,b.paid_date from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id = b.user_id where b.qty > 0 and DATE( b.paid_date ) > DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 WEEK ) ) {{order}} {{limit}}';
     mysqli[617] = 'select ' + mysqli.seourl + ' p.*,b.id as b_id,u.first_name,u.last_name,b.paid_date from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id = b.user_id where b.qty > 0 and DATE( b.paid_date ) > DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 MONTH ) ) {{order}} {{limit}}';
     mysqli[618] = 'select ' + mysqli.seourl + ' p.*,b.id as b_id,u.first_name,u.last_name,b.paid_date from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id = b.user_id where b.qty > 0 and DATE( b.paid_date ) > DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 YEAR ) ) {{order}} {{limit}}';
     mysqli[619] = 'select ' + mysqli.seourl + ' p.*,b.id as b_id,u.first_name,u.last_name,b.paid_date from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id = b.user_id where b.qty > 0  and DATE( b.paid_date ) BETWEEN DATE( ? ) AND DATE( ? ) {{order}} {{limit}}';

     mysqli[620] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE( date_closed ) = DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 DAY ) )  {{order}} {{limit}}';
     mysqli[621] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE( date_closed ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 WEEK ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[622] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE( date_closed ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 MONTH ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[623] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE( date_closed ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 YEAR ) ) AND DATE( SYSDATE( ) )  {{order}} {{limit}}';
     mysqli[624] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.last_name,(select count(distinct b.user_id) as bid from bids as b  where p.id = b.project_id AND b.user_id > 0) as bids from projects AS p inner join users u on u.id= p.user_id where p.market_status !="removed" and DATE( date_closed ) BETWEEN DATE( ? ) AND DATE( ? ) {{order}} {{limit}}';

     mysqli[625] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 0  and b.qty > 0 and DATE( r_date ) = DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 DAY ) ) {{order}} {{limit}}'
     mysqli[626] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 0  and b.qty > 0 and DATE( r_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 WEEK ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}'
     mysqli[627] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 0  and b.qty > 0 and DATE( r_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 MONTH ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}'
     mysqli[628] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 0  and b.qty > 0 and DATE( r_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 YEAR ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}'
     mysqli[629] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 0  and b.qty > 0 and DATE( r_date ) BETWEEN DATE( ? ) AND DATE( ? ) {{order}} {{limit}}'

     mysqli[630] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 1 and b.paid= 1 and b.qty > 0 and DATE( r_date ) = DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 DAY ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}';
     mysqli[631] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 1 and b.paid= 1 and b.qty > 0 and DATE( r_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 WEEK ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}';
     mysqli[632] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 1 and b.paid= 1 and b.qty > 0 and DATE( r_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 MONTH ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}';
     mysqli[633] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 1 and b.paid= 1 and b.qty > 0 and DATE( r_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 YEAR ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}';
     mysqli[634] = 'select p.id as id,p.user_id as sid,u.first_name,u.last_name,us.first_name as sell_first,us.last_name as sell_last,b.date_added,b.project_id,b.user_id,b.amount,b.ordered,b.cart_id,b.qty,b.refund,b.release,b.r_date,b.feedback,b.paid,b.tracking_number,b.tracking_service,b.win,b.shipping_info,b.escrow,b.commission,b.id as b_id,p.title,p.avatar,p.image,date_format(b.date_added,"%M %D,%Y") as date_add,b.amount as proposed_amount,b.refund as refund_amount,p.buynow  from buynow as b inner join projects as p on b.project_id = p.id left join users u on u.id= b.user_id left join users us on us.id = p.user_id where b.win = 1 and b.paid= 1 and b.qty > 0 and DATE( r_date ) BETWEEN DATE( ? ) AND DATE( ? ) {{order}} {{limit}}';

     mysqli[635] = 'SELECT CONCAT( u.first_name,  " ", u.last_name ) AS name,u.id as sid, p.title, c . * , b.id AS buynow_id, b.commission,  b.paid, b.release, p.title, b.project_id, DATE_FORMAT( b.date_added,  "%M %d %Y %h:%i:%s %p" ) AS create_date, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date, DATE_FORMAT( b.r_date,"%M %d %Y %h:%i:%s %p" ) AS r_date, b.admin, b.amount AS amt, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date FROM buynow AS b INNER JOIN projects AS p ON p.id = b.project_id INNER JOIN users AS us ON us.id = b.user_id INNER JOIN users AS u ON u.id = p.user_id  INNER JOIN checkout AS c ON c.id = b.cart_id and DATE( b.paid_date ) = DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 DAY ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}';
     mysqli[636] = 'SELECT CONCAT( u.first_name,  " ", u.last_name ) AS name,u.id as sid, p.title, c . * , b.id AS buynow_id, b.commission,  b.paid, b.release, p.title, b.project_id, DATE_FORMAT( b.date_added,  "%M %d %Y %h:%i:%s %p" ) AS create_date, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date, DATE_FORMAT( b.r_date,"%M %d %Y %h:%i:%s %p" ) AS r_date, b.admin, b.amount AS amt, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date FROM buynow AS b INNER JOIN projects AS p ON p.id = b.project_id INNER JOIN users AS us ON us.id = b.user_id INNER JOIN users AS u ON u.id = p.user_id  INNER JOIN checkout AS c ON c.id = b.cart_id and DATE( b.paid_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 WEEK ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}';
     mysqli[637] = 'SELECT CONCAT( u.first_name,  " ", u.last_name ) AS name,u.id as sid, p.title, c . * , b.id AS buynow_id, b.commission,  b.paid, b.release, p.title, b.project_id, DATE_FORMAT( b.date_added,  "%M %d %Y %h:%i:%s %p" ) AS create_date, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date, DATE_FORMAT( b.r_date,"%M %d %Y %h:%i:%s %p" ) AS r_date, b.admin, b.amount AS amt, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date FROM buynow AS b INNER JOIN projects AS p ON p.id = b.project_id INNER JOIN users AS us ON us.id = b.user_id INNER JOIN users AS u ON u.id = p.user_id  INNER JOIN checkout AS c ON c.id = b.cart_id and DATE( b.paid_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 MONTH ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}';
     mysqli[638] = 'SELECT CONCAT( u.first_name,  " ", u.last_name ) AS name,u.id as sid, p.title, c . * , b.id AS buynow_id, b.commission,  b.paid, b.release, p.title, b.project_id, DATE_FORMAT( b.date_added,  "%M %d %Y %h:%i:%s %p" ) AS create_date, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date, DATE_FORMAT( b.r_date,"%M %d %Y %h:%i:%s %p" ) AS r_date, b.admin, b.amount AS amt, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date FROM buynow AS b INNER JOIN projects AS p ON p.id = b.project_id INNER JOIN users AS us ON us.id = b.user_id INNER JOIN users AS u ON u.id = p.user_id  INNER JOIN checkout AS c ON c.id = b.cart_id and DATE( b.paid_date ) BETWEEN DATE( DATE_SUB( SYSDATE( ) , INTERVAL 1 YEAR ) ) AND DATE( SYSDATE( ) ) {{order}} {{limit}}';
     mysqli[639] = 'SELECT CONCAT( u.first_name,  " ", u.last_name ) AS name,u.id as sid, p.title, c . * , b.id AS buynow_id, b.commission,  b.paid, b.release, p.title, b.project_id, DATE_FORMAT( b.date_added,  "%M %d %Y %h:%i:%s %p" ) AS create_date, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date, DATE_FORMAT( b.r_date,"%M %d %Y %h:%i:%s %p" ) AS r_date, b.admin, b.amount AS amt, DATE_FORMAT( b.paid_date,  "%M %d %Y %h:%i:%s %p" ) AS pay_date FROM buynow AS b INNER JOIN projects AS p ON p.id = b.project_id INNER JOIN users AS us ON us.id = b.user_id INNER JOIN users AS u ON u.id = p.user_id  INNER JOIN checkout AS c ON c.id = b.cart_id and DATE( b.paid_date ) BETWEEN DATE( ? ) AND DATE( ? ) {{order}} {{limit}}';

     /*Reports Ends*/

     /*Notication Starts */


     mysqli[650] = 'SELECT * from notification_titles where status = 1';
     mysqli[651] = 'SELECT * from notification_titles where buyer = 1 and status = 1';
     mysqli[652] = 'SELECT * from notification_titles where seller = 1 and status = 1';
     mysqli[653] = 'insert into user_notification (user_id,email,sms) values(?,?,?)';
     mysqli[654] = 'SELECT * from user_notification where user_id = ? limit 1';
     mysqli[655] = 'update user_notification set user_id=?,email=?,sms=? where id = ?';
     mysqli[656] = 'update users set phone=?,verifyphone = 1 where id = ?';
     mysqli[657] = 'select verifyphone,phone from users where id = ?';

     mysqli[660] = 'SELECT * from user_notification where user_id = ? and FIND_IN_SET (?, email)';
     mysqli[661] = 'SELECT * from user_notification where user_id = ? and FIND_IN_SET (?, sms)';
     mysqli[662] = 'update users set balance_amount = balance_amount+?,balance = balance+? where id  = ?';
     mysqli[663] = 'update users set balance_amount = balance_amount-? where id  = ?';
     mysqli[664] = 'select * from withdrawals where id = ?';
     /*Notification Ends */


     mysqli[278] = 'insert into banner(title,subtitle,image,o_image,cid,enable,date_added,offer_price) values(?,?,?,?,?,?,?,?)';
     mysqli[279] = 'update banner set title = ?,subtitle = ?,image = ?,o_image=?,cid = ?,enable = ?,offer_price = ? where id = ?';
     mysqli[280] = 'select * from banner where id = ?';
     mysqli[275] = 'select b.*,c.name as ctitle from banner as b left join categories as c on b.cid = c.id order by b.id asc limit ?,10';
     mysqli[276] = 'select b.id from banner as b left join categories as c on b.cid = c.id';

     mysqli['insert_adwords'] = 'INSERT INTO adwords (ad_name,ad_title,ad_content,ad_url,banner,show_continue,days_week,target_sec_id,keywords,budget_per_click,budget_per_day,user_id,created_at,end_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

     mysqli['get_adwords_details'] = 'SELECT * from adwords WHERE status != "remove" AND user_id = ? {{limit}}';

     mysqli['get_all_adwords_details'] = 'SELECT * from adwords WHERE status != "remove" {{limit}}';

     mysqli['adwords_delete_pause'] = 'UPDATE adwords SET status = ? WHERE id =? AND user_id = ?';

     mysqli['get_adwords_by_id'] = 'SELECT * FROM adwords WHERE id = ?';

     mysqli['update_deposit'] = 'UPDATE users set deposit_amount = deposit_amount + ? WHERE id = ?';

     mysqli['update_adwords'] = 'UPDATE adwords set ad_name = ?,ad_title = ?,ad_content = ?,ad_url = ?,banner =?,show_continue =?,days_week = ?,target_sec_id = ?,keywords = ?,budget_per_click = ?,budget_per_day = ?,user_id =?,updated_at = ?,end_date = ? WHERE id = ?';

     mysqli['show_ads'] = 'SELECT a.* FROM adwords a JOIN users u ON u.id = a.user_id AND u.deposit_amount > 0 WHERE if(a.days_week != "" ,FIND_IN_SET(DAYNAME(curdate()),a.days_week),true) AND if(a.target_sec_id != "",FIND_IN_SET(?,a.target_sec_id),true) AND if(a.end_date !="0000-00-00",a.end_date = CURDATE(),true) AND a.status = "active" AND budget_per_day DIV budget_per_click > no_of_clicks LIMIT 0,5';

     mysqli['reduce_deposit'] = 'UPDATE users set deposit_amount = deposit_amount - ? WHERE id = ?';

     mysqli['update_ads_clicks'] = 'UPDATE adwords SET no_of_clicks = no_of_clicks + 1 WHERE id = ?';

     mysqli['user_in_proxybid'] = 'SELECT * FROM proxybid WHERE project_id = ? AND user_id = ? and status = 1';

     mysqli['update_proxybid'] = 'UPDATE proxybid SET maxamount = ?,date_added = ?  WHERE project_id = ? AND user_id = ? and status = 1';

     mysqli['insert_proxybid'] = 'INSERT INTO proxybid (project_id,user_id,maxamount,date_added,status) VALUES (?,?,?,?,1)';

     mysqli['get_proxy_details'] = 'SELECT * FROM proxybid {{where}}';

     mysqli['get_last_bidamount'] = 'SELECT * FROM bids WHERE project_id = ? and status = 1 ORDER BY proposed_amount desc LIMIT 1';

     mysqli['insert_bid_as_proxy'] = 'INSERT INTO bids (project_id,user_id,proposed_amount,created_at,proposal) VALUES (?,?,?,?,?)';

     mysqli['proxy_bid_award'] = 'select b.id,b.maxamount as proposed_amount,b.user_id,u.first_name,u.email,u.phone,u.last_name,b.project_id from proxybid as b inner join users as u on u.id = b.user_id where b.status = 1 and b.project_id = ? order by b.maxamount desc limit 1';

     mysqli['get_all_adwords_details'] = 'SELECT a.* FROM adwords a JOIN users u ON u.id = a.user_id AND u.deposit_amount > 0 WHERE if(a.days_week != "" ,FIND_IN_SET(DAYNAME(curdate()),a.days_week),true) AND if(a.target_sec_id != "",FIND_IN_SET(?,a.target_sec_id),true) AND if(a.end_date !="0000-00-00",a.end_date = CURDATE(),true) AND a.status = "active" AND budget_per_day DIV budget_per_click > no_of_clicks {{limit}}';

     mysqli['classified1'] = 'INSERT INTO classified_projects (user_id,want,title,cid,description,price,`condition`,utype,name,email,city,state,country,zip,phone,status,date_added,date_closed) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
     mysqli['classified2'] = 'insert into product_images (avatar,image,date_added,classified_id) values (?,?,?,?) ';
     mysqli['classified3'] = 'select ' + mysqli.seourl + ' p.*,c.name as ctitle,pc.name as pctitle,date_format(p.date_closed,"%m/%d/%Y") as date_close,u.first_name,u.email,u.phone,u.last_name,c.name,u.review,u.avatar as uimage from classified_projects as p left join categories as c on c.id = p.cid left join categories as pc on c.parent_id = pc.id left join users as u on u.id = p.user_id where p.id = ? limit 1';
     mysqli['classified4'] = 'select * from product_images where classified_id = ?';
     mysqli['classified5'] = 'select ' + mysqli.seourl + ' p.*,(select pi.avatar from product_images as pi where pi.classified_id = p.id order by pi.id asc limit 1) as avatar  from classified_projects as p where p.status ="active" and p.id != ?';
     mysqli['classified6'] = 'select ' + mysqli.seourl + ' p.*,(select pi.avatar from product_images as pi where pi.classified_id = p.id order by pi.id asc limit 1) as avatar  from classified_projects as p inner join categories as c on p.cid = c.id where p.status ="active" {{where}}';
     mysqli['classified8'] = 'select ' + mysqli.seourl + ' p.*,(select pi.avatar from product_images as pi where pi.classified_id = p.id order by pi.id asc limit 1) as avatar  from classified_projects as p inner join categories as c on p.cid = c.id  where p.status ="active" {{where}}';
     mysqli['classified7'] = 'select ' + mysqli.seourl + ' p.*,(select pi.avatar from product_images as pi where pi.classified_id = p.id order by pi.id asc limit 1) as avatar  from classified_projects as p inner join categories as c on p.cid = c.id  where p.id > 0 {{where}}';
     mysqli['classified9'] = 'select ' + mysqli.seourl + ' p.*,u.first_name,u.email,u.phone,u.last_name,c.name,u.review,u.avatar as uimage from classified_projects as p left join categories as c on c.id = p.cid left join users as u on u.id = p.user_id where p.id = ? limit 1';
     mysqli['classified10'] = 'select id from watchlists where user_id = ? and classified_id = ? limit 1';
     mysqli['classified11'] = 'INSERT INTO watchlists (id,classified_id,user_id,date_added) VALUES (NULL, ?, ?, ?)';

     mysqli['insert_img'] = 'insert into product_images (id,image,avatar,date_added,random_id) values(NULL,?,?,?,?)';

     mysqli['reset_no_of_clicks'] = 'UPDATE adwords SET no_of_clicks = 0 WHERE status = "active" ';

     mysqli['update_projectid_in_imgtable'] = 'update product_images set project_id = ? where random_id = ?';

     mysqli['delete_images'] = 'delete from product_images where id = ?';

     mysqli['yab6'] = 'update checkout set  cart_temp_details = ? where id = ? limit 1';


     mysqli['yab2'] = 'insert into checkout (date_added,first_name,last_name,phone,email,address,country,state,city,zipcode,user_id,buynowid,amount) values (?,?,?,?,?,?,?,?,?,?,?,?,?)';
     mysqli['yab3'] = 'delete from checkout where buynowid = ? limit 1';
     mysqli['update_cart_details'] = 'update checkout set  `paid` = 1, `paid_date` = ?,trans_id = ?  where id = ? limit 1';
     mysqli['yab5'] = 'select * from checkout where buynowid = ? limit 1';
     mysqli['yab6'] = 'update checkout set  cart_temp_details = ? where id = ? limit 1';
     mysqli['yab13'] = 'update invoices  set `status` = "paid",  buynow_id = ?, cart_id = ? where primary_id = ?';
     mysqli['yab14'] = 'insert into product_images (avatar,image,date_added,project_id) values (?,?,?,?) ';
     mysqli['yab15'] = 'delete from product_images where id = ? limit 1';
     mysqli['yab16'] = 'update product_images set  project_id = ? where id = ? limit 1';
     mysqli['yab17'] = 'select * from product_images where id = ? limit 1';
     mysqli['yab18'] = 'update projects set  avatar = ?, image = ?  where id = ? limit 1';
     mysqli['yab19'] = 'select u.first_name,u.last_name,u.email,p.shipping_price, p.bprice,p.id,p.user_id,p.title,u.phone,p.qty,p.booked,p.sold  from projects AS p inner join users as u on p.user_id = u.id where p.id = ? group by p.id limit 1';
     mysqli['yab20'] = 'select u.first_name,u.last_name,u.email,u.id,u.phone from users as u where u.id = ? group by u.id limit 1';
     mysqli['yab21'] = 'delete from cart_temp where user_id = ?';
     mysqli['yab22'] = 'insert into buynow (project_id,user_id,amount,date_added,ordered,cart_id,qty,refund,win,paid,paid_date,`release`,r_date,`escrow`,commission,local_pick,admin) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)';

     mysqli['add_dispute'] = 'insert into disputes (user_id,date_added,subject,message,project_id) values(?,?,?,?,?)';

     mysqli['view_dispute'] = 'SELECT d.*,u.email,p.title FROM `disputes` d JOIN users u ON u.id = d.user_id JOIN projects p ON d.project_id = p.id  WHERE d.status = "active"';

     mysqli['delete_disputes'] = 'UPDATE disputes SET status = "removed" WHERE id = ?';

     mysqli['unsub_user'] = 'UPDATE user_notification SET email = "" AND sms = "" WHERE user_id = ?';

     /* Block Users */

	mysqli[500] = 'SELECT bu.email,bu.id as blockid,u.id,u.first_name,u.last_name FROM block_users bu inner join users u on u.email = bu.email  where bu.sid = ?';
	mysqli[501] = 'insert into block_users (email,sid,date_added) values(?,?,?)';
	mysqli[502] = 'delete from block_users where id = ?';
	mysqli[503] = 'SELECT bu.email,bu.id as blockid,u.id as userid,u.first_name,u.last_name FROM block_users bu inner join users u on u.email = bu.email  where bu.sid = ? limit ?,15';
	mysqli[504] = "select * from block_users where email= ? and sid = ?";
	mysqli[505] = "select * from users where email= ?";
	mysqli[506] = "SELECT * FROM block_users where sid=(select user_id from projects where id= ?) and email=(select email from users where id= ?)";
	mysqli[507] = "UPDATE bids SET declined = 1 where user_id = (SELECT id FROM users where email = ?) and project_id IN (select id from projects where user_id = ?)";
	mysqli[508] = "UPDATE buynow SET active = 1 where user_id = (SELECT id FROM users where email = ?) and project_id IN (select id from projects where user_id = ?)";
	mysqli[510] = 'select * from users where email like "{{search}}%"';


    /*Payment gateway Authorize.net */

     mysqli['auth_insert'] = 'insert into authorize_details (uid,pro_id,pay_id,card_no) values(?,?,?,?)';
     mysqli['auth_details'] = "select * from authorize_details where card_no = ? and uid= ? limit 1";
     mysqli['auth_proid'] = "select * from authorize_details where uid= ? limit 1";

    /*Transfer Ownership*/

	mysqli[550] = "UPDATE projects SET user_id = (SELECT u.id FROM users u where u.email = ?) where id = ?";
	mysqli[551] = "SELECT id,first_name,last_name FROM users where email = ?";
	mysqli[552] = "SELECT title FROM projects where id = ?";

}
this.loadMysqli();