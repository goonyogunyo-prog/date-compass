/* 浅草・かっぱ橋追加と16時専用ルート選択改善 / 2026-10-16 10:53 JST */
(function(){'use strict';
if(typeof routes==='undefined'||typeof venues==='undefined'||typeof labels==='undefined'||typeof choose!=='function'||typeof render!=='function')return;
if(!venues["dc1053_sensoji"])venues["dc1053_sensoji"]={"name": "浅草寺", "url": "https://www.senso-ji.jp/", "desc": "雷門から本堂へ続く参道を散策。10月の本堂は17時閉堂。境内は混雑しやすい。"};
if(!venues["dc1053_asakusajinja"])venues["dc1053_asakusajinja"]={"name": "浅草神社", "url": "https://asakusajinja.jp/", "desc": "浅草寺の隣にある神社。参拝と境内散策を楽しめる。社務所の受付時間は公式で確認。"};
if(!venues["dc1053_nakamise"])venues["dc1053_nakamise"]={"name": "浅草仲見世商店街", "url": "https://t-navi.city.taito.lg.jp/spot/1002", "desc": "雷門から宝蔵門へ続く参道商店街。夕方以降は店が閉まり、シャッター絵を見られることも。"};
if(!venues["dc1053_shinnaka"])venues["dc1053_shinnaka"]={"name": "浅草新仲見世商店街", "url": "https://www.asakusa-shinnaka.com/", "desc": "アーケードのある商店街。店舗ごとに営業時間・定休日が異なるため雨天時も要確認。"};
if(!venues["dc1053_tourismcenter"])venues["dc1053_tourismcenter"]={"name": "浅草文化観光センター", "url": "https://t-navi.city.taito.lg.jp/about/informationcenter", "desc": "雷門前の観光案内施設。展望テラスから街並みを眺められる。悪天候時のテラス利用に注意。"};
if(!venues["dc1053_crafts"])venues["dc1053_crafts"]={"name": "江戸たいとう伝統工芸館", "url": "https://craft.city.taito.lg.jp/kogeikan/", "desc": "伝統工芸品の展示を見学。第2・第4火曜など休館日があるので事前確認。"};
if(!venues["dc1053_hanayashiki"])venues["dc1053_hanayashiki"]={"name": "浅草花やしき", "url": "https://www.hanayashiki.net/", "desc": "レトロな遊園地。営業時間は季節や天候で変動し、チケット・アトラクションは別途確認。"};
if(!venues["dc1053_engei"])venues["dc1053_engei"]={"name": "浅草演芸ホール", "url": "https://www.asakusaengei.com/", "desc": "落語や漫才などの寄席。昼夜の番組・入場条件・特別興行の時間は公式で確認。"};
if(!venues["dc1053_sumidapark"])venues["dc1053_sumidapark"]={"name": "墨田区立隅田公園", "url": "https://sumidapark.jp/", "desc": "隅田川沿いの公園。すみだリバーウォークで浅草側からアクセスできる。雨・強風時は無理をしない。"};
if(!venues["dc1053_kappabashi"])venues["dc1053_kappabashi"]={"name": "かっぱ橋道具街", "url": "https://www.kappabashi.or.jp/", "desc": "食器・調理器具・食品サンプルなどの店が並ぶ道具街。店別の営業日・時間を事前確認。"};
const incoming=[{"id":"dc1053_asakusa_classic","area":"asakusa","weather":"sun","mood":"relax","fixed":0,"title":"浅草｜仲見世・お寺・レトロ遊園地","intro":"商店街を歩き、浅草寺で参拝してから遊園地へ。","steps":[["10:30","dc1053_nakamise"],["11:30","dc1053_sensoji"],["14:00","dc1053_hanayashiki"]],"tip":"仲見世の混雑に注意。花やしきはチケット・営業時間・最終入園を公式確認。","feesUnpriced":true,"evening":false},{"id":"dc1053_asakusa_crafts","area":"asakusa","weather":"sun","mood":"active","fixed":0,"title":"浅草｜道具街と江戸の工芸を楽しむ","intro":"食器や雑貨を眺めながら、下町のものづくりに触れる。","steps":[["10:00","dc1053_kappabashi"],["12:00","dc1053_shinnaka"],["14:30","dc1053_crafts"]],"tip":"かっぱ橋は日曜休業の店舗もある。工芸館は第2・第4火曜など休館に注意。","feesUnpriced":true,"evening":false},{"id":"dc1053_asakusa_rain","area":"asakusa","weather":"rain","mood":"relax","fixed":0,"title":"浅草｜雨の日は寄席・工芸・展望案内","intro":"雨でも屋内の楽しみを多めにした浅草の文化コース。","steps":[["11:40","dc1053_engei"],["15:00","dc1053_crafts"],["17:00","dc1053_tourismcenter"]],"tip":"施設間は屋外移動。寄席は途中退場や再入場などの規定を公式確認。観光センター展望テラスは天候次第。","feesUnpriced":true,"evening":false},{"id":"dc1053_asakusa_evening1","area":"asakusa","weather":"sun","mood":"romantic","fixed":0,"title":"浅草｜16時から寄席と夜の街並み","intro":"夜の部の寄席を楽しみ、浅草の眺望と参道の夜景へ。","steps":[["16:40","dc1053_engei"],["19:00","dc1053_tourismcenter"],["20:00","dc1053_nakamise"]],"tip":"寄席の夜の部は演目・特別興行により時間が変わる。仲見世は夜に閉店している店が多く、シャッター壁画を楽しむ想定。","feesUnpriced":true,"evening":true},{"id":"dc1053_asakusa_evening2","area":"asakusa","weather":"sun","mood":"active","fixed":0,"title":"浅草｜16時からアーケード・眺望・寄席","intro":"商店街を歩き、夕景を眺め、夜の演芸へ。","steps":[["16:00","dc1053_shinnaka"],["17:30","dc1053_tourismcenter"],["19:00","dc1053_engei"]],"tip":"寄席は夜の部の途中入場になる可能性がある。入場可否・演目・最終入場を公式で確認。商店街は店別に閉店時刻が異なる。","feesUnpriced":true,"evening":true}];
for(const r of incoming)if(!routes.some(x=>x.id===r.id))routes.push(r);
labels.asakusa='浅草・かっぱ橋（東京）';
const area=document.getElementById('area');if(area&&!area.querySelector('option[value="asakusa"]')){const o=document.createElement('option');o.value='asakusa';o.textContent=labels.asakusa;area.append(o);}
const params=new URLSearchParams(location.search);if(area&&params.get('area')==='asakusa')area.value='asakusa';
// 16時開始は夜専用コースを優先。天気/エリアが合わない場合は勝手に日中コースを夜にずらさない。
const beforeChoose=choose;let lateFallback=false;
choose=function(){
 const v=selected();lateFallback=false;
 if(v.startTime!=='16:00')return beforeChoose();
 const evening=routes.filter(r=>r.evening===true&&r.weather===v.weather&&r.fixed<=Number(v.budget));
 const local=evening.filter(r=>v.area==='any'||r.area===v.area);
 let pool=local.length?local:evening;
 if(!pool.length){lateFallback=true;return beforeChoose();}
 const moodPool=pool.filter(r=>r.mood===v.mood||v.partnerMood!=='any'&&r.mood===v.partnerMood);if(moodPool.length)pool=moodPool;
 const alternatives=pool.filter(r=>r.id!==lastId);if(alternatives.length)pool=alternatives;
 return pool[Math.floor(Math.random()*pool.length)];
};
const beforePlanClock=planClock;
planClock=function(original,first,requested){if(requested==='16:00'&&current&&current.evening)return original;return beforePlanClock(original,first,requested);};
const beforeRender=render;
render=function(r){
 beforeRender(r);
 const v=selected(),tip=document.getElementById('resultTip'),meta=document.getElementById('resultMeta');
 if(r.id.startsWith('dc1053_')){
  const link=document.getElementById('detailLink');if(link){link.href='asakusa-date.html';link.textContent='浅草・かっぱ橋の5コースと公式情報を見る';}
  if(tip)tip.textContent+=' 施設料金・交通費・飲食費は未算入です。3件分の予算欄へ手入力してください。';
  document.querySelectorAll('#budgetStops .spot-extra').forEach(input=>{input.placeholder='未算入';});
 }
 if(v.startTime==='16:00'){
  if(!r.evening){if(tip)tip.textContent+=' ※この条件の16時開始専用コースは未整備です。表示時刻は参考扱いとし、施設の閉館・最終入場を必ず確認してください。';}
  else if(meta)meta.textContent+='｜16時台からの夜専用コース（施設ごとの入場条件は要確認）';
  if(v.area!=='any'&&r.area!==v.area&&tip)tip.textContent+=' ※指定エリアに条件が合う夜プランがないため、別エリアの夜プランに切り替えています。';
 }
};
const target=routes.find(r=>r.id===params.get('route'));if(target&&target.id.startsWith('dc1053_')){
 if(area)area.value='asakusa';const w=document.getElementById('weather');if(w)w.value=target.weather;
 const start=document.getElementById('startTime');if(start&&target.evening)start.value='16:00';render(target);
}
})();
