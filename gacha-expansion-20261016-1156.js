/* 品川・天王洲: 公式確認済みスポット9件と3件構成6ルート / 2026-10-16 11:56 JST */
(function(){'use strict';
if(typeof routes==='undefined'||typeof venues==='undefined'||typeof labels==='undefined')return;
if(!venues["dc1156_aqua"])venues["dc1156_aqua"]={"name": "マクセル アクアパーク品川", "url": "https://www.aqua-park.jp/", "desc": "品川駅高輪口側の水族館。入場料・当日の営業時間・ショーの開催時間を公式確認。"};
if(!venues["dc1156_season"])venues["dc1156_season"]={"name": "品川シーズンテラス", "url": "https://shinagawa-st.jp/about/", "desc": "緑のオープンスペースとショップ・レストラン。店舗ごとの営業・イベント開催を公式確認。"};
if(!venues["dc1156_whatmuseum"])venues["dc1156_whatmuseum"]={"name": "WHAT MUSEUM", "url": "https://warehouseofart.org/facilities/", "desc": "現代アートと建築のミュージアム。展示替え・入館可能日・料金・最終入場を公式確認。"};
if(!venues["dc1156_whatcafe"])venues["dc1156_whatcafe"]={"name": "WHAT CAFE", "url": "https://cafe.warehouseofart.org/", "desc": "アート作品の展示とカフェを楽しむ。展示・貸切による営業変更や飲食料金を公式確認。"};
if(!venues["dc1156_pigment"])venues["dc1156_pigment"]={"name": "PIGMENT TOKYO", "url": "https://pigment.tokyo/", "desc": "多彩な顔料・画材に触れられるショップ。ワークショップの開催と予約条件は公式確認。"};
if(!venues["dc1156_tac"])venues["dc1156_tac"]={"name": "TERRADA ART COMPLEX", "url": "https://www.terrada-art-complex.com/", "desc": "複数のギャラリーが集まるアート施設。各ギャラリーの展示日程・入場条件は個別に確認。"};
if(!venues["dc1156_higashipark"])venues["dc1156_higashipark"]={"name": "東品川海上公園", "url": "https://shinagawa-kanko.or.jp/spot/higasishinagawakaijoukouen/", "desc": "運河沿いのボードウォークや花壇のある公園。雨・強風・夜間の足元に注意。"};
if(!venues["dc1156_boardwalk"])venues["dc1156_boardwalk"]={"name": "天王洲アイル・ボードウォーク", "url": "https://www.e-tennoz.com/", "desc": "天王洲の運河沿いを歩ける遊歩道。暗い時間帯や雨・強風では無理せず屋内へ。"};
if(!venues["dc1156_tyharbor"])venues["dc1156_tyharbor"]={"name": "T.Y.HARBOR", "url": "https://www.tysons.jp/tyharbor/", "desc": "運河沿いのブルワリーレストラン。飲食代・営業日・予約可否は公式サイトで確認。"};
const incoming=[{"id":"dc1156_tennozu_art","area":"shinagawa-tennozu","weather":"sun","mood":"relax","title":"天王洲｜美術館・画材・運河の散歩","intro":"倉庫街のアートと運河の景色を楽しむ日中コース。","steps":[["11:00","dc1156_whatmuseum"],["13:30","dc1156_pigment"],["15:00","dc1156_boardwalk"]],"tip":"WHAT MUSEUMの展示・入場条件とPIGMENTの営業日を公式確認。運河沿いは屋外で、悪天候時は中止。","fixed":0,"feesUnpriced":true,"evening":false},{"id":"dc1156_tennozu_galleries","area":"shinagawa-tennozu","weather":"sun","mood":"active","title":"天王洲｜ギャラリーを巡るアート散策","intro":"現代アートと画材の世界に触れながら倉庫街を歩く。","steps":[["11:00","dc1156_tac"],["13:30","dc1156_whatmuseum"],["16:00","dc1156_higashipark"]],"tip":"TERRADA ART COMPLEXの各ギャラリーは展示会期・休廊日が異なる。公園への移動時間を見込む。","fixed":0,"feesUnpriced":true,"evening":false},{"id":"dc1156_shinagawa_aqua","area":"shinagawa-tennozu","weather":"sun","mood":"romantic","title":"品川｜水族館から天王洲の水辺へ","intro":"品川駅前の水族館と緑の広場を経て運河沿いへ。","steps":[["10:30","dc1156_aqua"],["13:30","dc1156_season"],["16:00","dc1156_boardwalk"]],"tip":"品川駅周辺から天王洲への鉄道・バス等の移動が必要。水族館のチケット・ショー時間は公式確認。","fixed":0,"feesUnpriced":true,"evening":false},{"id":"dc1156_tennozu_rain","area":"shinagawa-tennozu","weather":"rain","mood":"relax","title":"天王洲｜雨の日のアート3か所","intro":"屋内施設を中心に、展示と画材・カフェを楽しむ。","steps":[["11:30","dc1156_whatmuseum"],["14:00","dc1156_pigment"],["16:00","dc1156_whatcafe"]],"tip":"3施設間は屋外移動。WHAT CAFEは展示替え・貸切などで利用できない場合あり。開館・料金を事前確認。","fixed":0,"feesUnpriced":true,"evening":false},{"id":"dc1156_tennozu_evening","area":"shinagawa-tennozu","weather":"sun","mood":"romantic","title":"天王洲｜16時から画材・運河・食事","intro":"夕方の画材店から水辺の景色、食事へ。","steps":[["16:00","dc1156_pigment"],["17:30","dc1156_boardwalk"],["19:00","dc1156_tyharbor"]],"tip":"PIGMENTの営業日・閉店時刻とレストランの営業・予約可否を公式確認。暗くなったら運河沿いの滞在を短めに。","fixed":0,"feesUnpriced":true,"evening":true},{"id":"dc1156_tennozu_evening2","area":"shinagawa-tennozu","weather":"sun","mood":"relax","title":"天王洲｜16時からアート・公園・ディナー","intro":"アートに触れ、運河沿いの景色を見て食事へ。","steps":[["16:00","dc1156_whatcafe"],["17:30","dc1156_higashipark"],["19:00","dc1156_tyharbor"]],"tip":"WHAT CAFEの展示・貸切・閉店時間を確認。公園は日没後に暗くなるため、安全を優先して短時間で移動。","fixed":0,"feesUnpriced":true,"evening":true}];
for(const r of incoming)if(!routes.some(x=>x.id===r.id))routes.push(r);
labels['shinagawa-tennozu']='品川・天王洲（東京）';
const sel=document.getElementById('area');if(sel&&!sel.querySelector('option[value="shinagawa-tennozu"]')){const o=document.createElement('option');o.value='shinagawa-tennozu';o.textContent=labels['shinagawa-tennozu'];sel.append(o);}
const params=new URLSearchParams(location.search);if(sel&&params.get('area')==='shinagawa-tennozu')sel.value='shinagawa-tennozu';
// 新エリアでは「気分が完全一致した1本」への固定化を避け、直前のコースを除外する。
const previousChoose=choose;
choose=function(){
 const v=selected();
 if(v.area!=='shinagawa-tennozu')return previousChoose();
 let pool=routes.filter(r=>r.area==='shinagawa-tennozu'&&r.weather===v.weather&&r.fixed<=Number(v.budget)&&(v.startTime==='16:00'?r.evening===true:r.evening!==true));
 if(!pool.length)return previousChoose(); // 雨+16時は既存の夜コースへ切替（表示側で案内）
 const alternatives=pool.filter(r=>r.id!==lastId);
 if(alternatives.length)pool=alternatives;
 const weights=pool.map(r=>1+(r.mood===v.mood?2:0)+(v.partnerMood!=='any'&&r.mood===v.partnerMood?1:0));
 let roll=Math.random()*weights.reduce((a,b)=>a+b,0);
 for(let i=0;i<pool.length;i++){roll-=weights[i];if(roll<=0)return pool[i];}
 return pool[pool.length-1];
};
const previousRender=render;render=function(r){previousRender(r);if(r.id.startsWith('dc1156_')){const link=document.getElementById('detailLink');if(link){link.href='shinagawa-tennozu-date.html';link.textContent='品川・天王洲の6コースと公式情報を見る';}const tip=document.getElementById('resultTip');if(tip)tip.textContent+=' 入場・体験・飲食の料金は未算入。各スポットの予算欄に確認した金額を入力してください。';}};
const linked=routes.find(r=>r.id===params.get('route'));if(linked&&linked.id.startsWith('dc1156_')){if(sel)sel.value='shinagawa-tennozu';const w=document.getElementById('weather');if(w)w.value=linked.weather;const st=document.getElementById('startTime');if(st&&linked.evening)st.value='16:00';render(linked);}
})();
