/* 2026-10-16 13:00 JST | 大宮・浦和: 12施設 / 10コース / 未確認料金は未算入 */
(function(){'use strict';
if(typeof routes==='undefined'||typeof venues==='undefined'||typeof labels==='undefined'||typeof choose!=='function'||typeof render!=='function')return;
if(!venues["dc1300_omiyazoo"])venues["dc1300_omiyazoo"]={"name": "大宮公園小動物園", "url": "https://www.parks.or.jp/omiyazoo/guide/000/000582.html", "desc": "大宮公園内の小動物園。公式案内では入園無料。開園時間・休園日を訪問前に確認。"};
if(!venues["dc1300_citymuseum"])venues["dc1300_citymuseum"]={"name": "さいたま市立博物館", "url": "https://www.city.saitama.lg.jp/004/005/004/005/008/002/p032625.html", "desc": "氷川参道近くの郷土博物館。市公式では入館無料。臨時休館・展示内容を確認。"};
if(!venues["dc1300_space"])venues["dc1300_space"]={"name": "さいたま市宇宙劇場", "url": "https://www.ucyugekijo.jp/", "desc": "大宮駅近くのプラネタリウム。投映時刻・整理券・料金・休館日を公式確認。"};
if(!venues["dc1300_bonsaihouse"])venues["dc1300_bonsaihouse"]={"name": "盆栽四季の家", "url": "https://saitama-culture.jp/bonsaihouse/", "desc": "盆栽村散策中の休憩に使える施設。休憩室と貸室は利用条件が異なる。"};
if(!venues["dc1300_secondpark"])venues["dc1300_secondpark"]={"name": "大宮第二公園", "url": "https://www.parks.or.jp/oomiya2-3/guide/001/001047.html", "desc": "梅林や池の周囲など四季の景色を楽しむ公園。悪天候や日没後は散策を短縮。"};
if(!venues["dc1300_thirdpark"])venues["dc1300_thirdpark"]={"name": "大宮第三公園", "url": "https://visitsaitamacity.jp/spots/196", "desc": "見沼田んぼの景観を活かした緑地。屋外のため雨・暗い時間帯は無理をしない。"};
if(!venues["dc1300_rekimin"])venues["dc1300_rekimin"]={"name": "埼玉県立歴史と民俗の博物館", "url": "https://www.pref.saitama.lg.jp/shisetsu/hakubutsukan/003.html", "desc": "大宮公園内で埼玉の歴史と文化を学べる。企画展の料金・休館日を公式確認。"};
if(!venues["dc1300_momas"])venues["dc1300_momas"]={"name": "埼玉県立近代美術館", "url": "https://www.pref.saitama.lg.jp/shisetsu/hakubutsukan/006.html", "desc": "北浦和公園内の美術館。企画展・常設展の料金、展示替え、休館日を公式確認。"};
if(!venues["dc1300_kitaurawapark"])venues["dc1300_kitaurawapark"]={"name": "北浦和公園", "url": "https://www.pref.saitama.lg.jp/shisetsu/koen/005.html", "desc": "駅から近い公園。屋外彫刻や噴水のある緑地で休憩。雨天時は美術館へ。"};
if(!venues["dc1300_urawaart"])venues["dc1300_urawaart"]={"name": "うらわ美術館", "url": "https://www.city.saitama.lg.jp/urawa-art-museum/about/index.html", "desc": "浦和駅近くの美術館。展覧会ごとに会期・入場料・開館時間が異なる。"};
if(!venues["dc1300_youthspace"])venues["dc1300_youthspace"]={"name": "さいたま市青少年宇宙科学館", "url": "https://www.city.saitama.lg.jp/kagakukan/index.html", "desc": "科学展示とプラネタリウムの施設。プラネタリウムは有料、投映時刻は公式確認。"};
if(!venues["dc1300_urawaparco"])venues["dc1300_urawaparco"]={"name": "浦和PARCO", "url": "https://urawa.parco.jp/info/", "desc": "浦和駅東口側の商業施設。ショップ・飲食店ごとに営業時間が異なる。"};
const incoming=[{"id":"dc1300_omiya_zoo","area":"omiya","weather":"sun","mood":"relax","fixed":0,"title":"大宮｜小動物園・博物館・盆栽の街","intro":"公園の動物たちを見てから、埼玉の文化を楽しむ。","steps":[["10:30","dc1300_omiyazoo"],["12:30","dc1300_rekimin"],["15:00","dc1300_bonsaihouse"]],"tip":"動物園は月曜など休園あり。博物館は入館締切に注意。盆栽四季の家の休憩室利用条件を確認。","feesUnpriced":true,"evening":false},{"id":"dc1300_omiya_history","area":"omiya","weather":"sun","mood":"active","fixed":0,"title":"大宮｜参道・郷土史・動物園","intro":"参道の文化に触れながら、午後は動物園へ。","steps":[["10:30","dc1300_citymuseum"],["12:30","omiyahikawa"],["14:30","dc1300_omiyazoo"]],"tip":"氷川神社の授与所・境内利用時間、動物園の16時閉園に注意。徒歩移動あり。","feesUnpriced":true,"evening":false},{"id":"dc1300_omiya_bonsai","area":"omiya","weather":"sun","mood":"relax","fixed":0,"title":"大宮｜盆栽・休憩・歴史博物館","intro":"盆栽文化と静かな博物館を組み合わせる。","steps":[["10:30","omiya_bonsai_museum"],["12:30","dc1300_bonsaihouse"],["14:30","dc1300_rekimin"]],"tip":"盆栽美術館は月曜など休館。展示替えと入場料金は公式確認。徒歩移動を見込む。","feesUnpriced":true,"evening":false},{"id":"dc1300_omiya_green","area":"omiya","weather":"sun","mood":"active","fixed":0,"title":"大宮｜第二公園・第三公園・本園","intro":"緑の多い公園を巡る屋外散策。","steps":[["10:30","dc1300_secondpark"],["12:30","dc1300_thirdpark"],["15:00","omiya_park"]],"tip":"公園間の移動距離が長め。悪天候・暑さ・日没前後は中止または短縮。","feesUnpriced":true,"evening":false},{"id":"dc1300_omiya_rain1","area":"omiya","weather":"rain","mood":"relax","fixed":0,"title":"大宮｜雨の日の郷土史・宇宙","intro":"屋内の歴史と星空を組み合わせる。","steps":[["10:00","dc1300_citymuseum"],["12:30","dc1300_rekimin"],["15:00","dc1300_space"]],"tip":"施設間は屋外移動と交通機関利用が必要。プラネタリウムは投映回を先に確認。","feesUnpriced":true,"evening":false},{"id":"dc1300_omiya_rain2","area":"omiya","weather":"rain","mood":"active","fixed":0,"title":"大宮｜雨の日の盆栽・歴史・星空","intro":"展示を中心に文化と科学を巡る。","steps":[["10:00","omiya_bonsai_museum"],["12:30","dc1300_rekimin"],["15:00","dc1300_space"]],"tip":"盆栽美術館・歴史博物館の休館日、宇宙劇場の投映時間を確認。移動には余裕を。","feesUnpriced":true,"evening":false},{"id":"dc1300_urawa_art","area":"urawa","weather":"sun","mood":"relax","fixed":0,"title":"浦和｜北浦和の美術と公園、街歩き","intro":"美術館のあと緑の公園で休み、浦和駅方面へ。","steps":[["10:30","dc1300_momas"],["12:30","dc1300_kitaurawapark"],["15:00","dc1300_urawaart"]],"tip":"北浦和から浦和へ鉄道移動が必要。2館の展示替え・休館日・最終入館に注意。","feesUnpriced":true,"evening":false},{"id":"dc1300_urawa_city","area":"urawa","weather":"sun","mood":"active","fixed":0,"title":"浦和｜科学館・アート・ショッピング","intro":"宇宙科学を体験し、アートと買い物を楽しむ。","steps":[["10:30","dc1300_youthspace"],["13:30","dc1300_urawaart"],["16:00","dc1300_urawaparco"]],"tip":"科学館から浦和駅周辺への移動はバス等が必要。美術館の展示日・入館時間を確認。","feesUnpriced":true,"evening":false},{"id":"dc1300_urawa_rain1","area":"urawa","weather":"rain","mood":"relax","fixed":0,"title":"浦和｜雨の日の科学館・美術館・商業施設","intro":"屋内の展示を見てから買い物・食事へ。","steps":[["10:00","dc1300_youthspace"],["13:00","dc1300_urawaart"],["15:30","dc1300_urawaparco"]],"tip":"科学館から駅周辺は屋外・バス移動。各施設の休館日・営業を確認。","feesUnpriced":true,"evening":false},{"id":"dc1300_urawa_rain2","area":"urawa","weather":"rain","mood":"active","fixed":0,"title":"浦和｜雨の日のアート2館と街のショップ","intro":"美術館を巡り、駅近くの商業施設へ。","steps":[["10:30","dc1300_momas"],["13:30","dc1300_urawaart"],["16:00","dc1300_urawaparco"]],"tip":"北浦和と浦和の駅間移動が必要。美術館の展示替え・閉館時間に注意。","feesUnpriced":true,"evening":false}];
for(const r of incoming)if(!routes.some(x=>x.id===r.id))routes.push(r);
labels.omiya='大宮（埼玉）';labels.urawa='浦和・北浦和（埼玉）';
const area=document.getElementById('area');if(area&&!area.querySelector('option[value="urawa"]')){const o=document.createElement('option');o.value='urawa';o.textContent=labels.urawa;area.append(o);}
const params=new URLSearchParams(location.search);if(area&&['omiya','urawa'].includes(params.get('area')))area.value=params.get('area');
const previousChoose=choose;
choose=function(){
 const v=selected();if(!['omiya','urawa'].includes(v.area))return previousChoose();
 const budget=Number(v.budget);
 let pool;
 if(v.startTime==='16:00'){
   // 新エリアには16時開始専用の3施設ルートがない。昼ルートの時刻をずらさず、他エリアの夜ルートに切替。
   pool=routes.filter(r=>r.evening===true&&r.weather===v.weather&&r.fixed<=budget&&r.area!==v.area);
 }else{
   pool=routes.filter(r=>r.area===v.area&&r.weather===v.weather&&r.evening!==true&&r.fixed<=budget);
 }
 if(!pool.length)return previousChoose();
 const others=pool.filter(r=>r.id!==lastId);if(others.length)pool=others;
 const weights=pool.map(r=>1+(r.mood===v.mood?3:0)+(v.partnerMood!=='any'&&r.mood===v.partnerMood?1:0));
 let n=Math.random()*weights.reduce((a,b)=>a+b,0);for(let i=0;i<pool.length;i++){n-=weights[i];if(n<=0)return pool[i];}return pool[pool.length-1];
};
const previousRender=render;
render=function(r){
 previousRender(r);
 const v=selected();
 if(r.id.startsWith('dc1300_')){
   const link=document.getElementById('detailLink');if(link){link.href='omiya-urawa-date.html';link.textContent='大宮・浦和の10コースと公式情報を見る';}
   const meta=document.getElementById('resultMeta');if(meta){meta.textContent=meta.textContent.replace(/入場料の目安：0円以内／人（[^）]*）/,'施設・体験料金：未算入（手入力してください）');}
   const tip=document.getElementById('resultTip');if(tip)tip.textContent+=' 施設代・体験代・交通費は未算入です。3スポットそれぞれの予算欄に公式確認後の金額を入力してください。';
 }
 if(['omiya','urawa'].includes(v.area)&&v.startTime==='16:00'&&r.area!==v.area){
   const tip=document.getElementById('resultTip');if(tip)tip.textContent+=' 選択した大宮・浦和では16時開始専用ルートを未提供のため、別エリアの夜専用ルートに切り替えました。';
 }
};
const linked=routes.find(r=>r.id===params.get('route'));
if(linked&&linked.id.startsWith('dc1300_')){if(area)area.value=linked.area;const weather=document.getElementById('weather');if(weather)weather.value=linked.weather;const st=document.getElementById('startTime');if(st)st.value='default';render(linked);}
})();
