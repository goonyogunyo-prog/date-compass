/* デートコンパス デートガチャ予算欄・多様性改善パッチ / 2026-10-15
 * date-gacha.html の既存スクリプト実行後に読み込む。
 * 既存のルート・広告・Google認証には触れない。
 */
(function(){
'use strict';
if(typeof routes==='undefined'||typeof render!=='function'||typeof choose!=='function'||typeof selected!=='function')return;
const box=document.querySelector('.budget-planner');
if(!box||document.getElementById('budgetStops'))return;
const title=box.querySelector('h3'),desc=box.querySelector('p.small'),grid=box.querySelector('.gacha-grid');
if(!grid)return;
if(title)title.textContent='💰 1件目〜3件目の予算を確認';
if(desc)desc.textContent='このコースの立ち寄り先をすべて表示。各場所で追加で使う予定額を入力できます。施設・入場料の目安は別途計算に含まれます。最新料金は公式サイトで確認してください。';
const food=document.getElementById('foodCost');
if(food){food.value='0';const foodRow=food.closest('div');if(foodRow)foodRow.hidden=true;}
const extraLabel=document.querySelector('label[for="extraCost"]');if(extraLabel)extraLabel.textContent='コース外の食事・追加体験（円）';
const style=document.createElement('style');
style.textContent='.budget-stops{display:grid;gap:10px;margin:14px 0}.budget-stop{display:grid;grid-template-columns:minmax(0,1fr) minmax(150px,.55fr);gap:12px;align-items:end;padding:12px 14px;border:1px solid #eadfdb;border-radius:12px;background:#fffafc}.budget-stop strong{display:block}.budget-stop small{display:block;color:#75676d;margin-top:4px}.budget-stop label{font-size:.83rem;margin-bottom:4px}.budget-stop input{min-height:42px}.budget-stops .budget-warning{font-size:.87rem;color:#715763;margin:2px 0}@media(max-width:600px){.budget-stop{grid-template-columns:1fr}}';
document.head.appendChild(style);
const stops=document.createElement('div');stops.id='budgetStops';stops.className='budget-stops';grid.before(stops);
const n=document.createElement('p');n.className='small';n.textContent='※同じ施設が複数回出る場合は、同一施設内での別行動を想定したモデル例です。実際に異なる店舗が指定されているわけではありません。';stops.after(n);
function buildStops(r){
 stops.replaceChildren();
 const seen=new Set(),v=selected();
 r.steps.forEach(([time,id],i)=>{
   const place=venues[id],row=document.createElement('div'),info=document.createElement('div'),name=document.createElement('strong'),clock=document.createElement('small'),col=document.createElement('div'),label=document.createElement('label'),input=document.createElement('input');
   row.className='budget-stop';name.textContent=(i+1)+'件目｜'+place.name+(seen.has(id)?'（同一施設内）':'');seen.add(id);
   clock.textContent='モデル時刻 '+planClock(time,r.steps[0][0],v.startTime);
   label.textContent='この場所で追加で使う予定額（円）';label.htmlFor='spotCost'+i;
   input.id='spotCost'+i;input.type='number';input.min='0';input.step='100';input.inputMode='numeric';input.value='0';input.className='spot-extra';input.addEventListener('input',updateBudget);
   info.append(name,clock);col.append(label,input);row.append(info,col);stops.append(row);
 });
 if(r.steps.length<2){const p=document.createElement('p');p.className='budget-warning';p.textContent='このコースは現在1件目のみ登録されています。2件目・3件目の実在スポットを無理に補完せず、追加する場合は「コース外の追加体験」で見積もってください。';stops.append(p);}
}
updateBudget=function(){
 if(!current)return;
 const limit=Number(document.getElementById('budget').value);
 const spotTotal=[...document.querySelectorAll('#budgetStops .spot-extra')].reduce((a,x)=>a+Math.max(0,Number(x.value)||0),0);
 const travel=Math.max(0,Number(document.getElementById('travelCost').value)||0);
 const extra=Math.max(0,Number(document.getElementById('extraCost').value)||0);
 const total=current.fixed+spotTotal+travel+extra,diff=limit-total,el=document.getElementById('budgetStatus');
 el.className=diff>=0?'under':'over';
 el.textContent='施設・入場料の目安 '+current.fixed.toLocaleString('ja-JP')+'円 ＋ 各立ち寄り先で使う予定額 '+spotTotal.toLocaleString('ja-JP')+'円 ＋ 交通・その他 '+(travel+extra).toLocaleString('ja-JP')+'円 ＝ 合計 '+total.toLocaleString('ja-JP')+'円／人。'+(diff>=0?' 残り '+diff.toLocaleString('ja-JP')+'円':' 予算を '+(-diff).toLocaleString('ja-JP')+'円オーバー')+'。2人分の目安 '+(total*2).toLocaleString('ja-JP')+'円。※変動料金や個人の支出により実額は変わります。';
};
// 施設は変更せず、実際のルートに合う見出しに調整（カフェ固定の印象を軽減）。
const routeTitleMap={t1:'豊洲｜ショップと水辺でのんびり',t6:'豊洲｜雨でも館内でゆったり',s1:'新宿｜庭園と展望室でゆったり',s4:'新宿｜雨でも駅近と展望室',i6:'池袋｜ショップと館内散策',o1:'押上｜雨の日は水族館とソラマチ',m2:'丸の内｜付き合う前の街歩き',m6:'東京駅｜雨でも楽しめる館内デート'};
for(const r of routes){if(routeTitleMap[r.id])r.title=routeTitleMap[r.id];}
// 同条件で似たプランばかり選ばれないよう、上位候補から抽選する。
const originalChoose=choose;
choose=function(){
 const v=selected(),budget=Number(v.budget);
 let pool=routes.filter(r=>(v.area==='any'||r.area===v.area)&&r.weather===v.weather&&r.fixed<=budget-2000);
 if(!pool.length)pool=routes.filter(r=>(v.area==='any'||r.area===v.area)&&r.weather===v.weather&&r.fixed<=budget);
 if(!pool.length)pool=routes.filter(r=>r.weather===v.weather&&r.fixed<=budget);
 if(!pool.length)return originalChoose();
 const score=r=>(r.mood===v.mood?5:0)+(v.partnerMood!=='any'&&r.mood===v.partnerMood?3:0)+(v.relation==='anniversary'&&r.mood==='romantic'?3:0)+(v.relation==='before'&&r.before?5:0)+(budget===3000&&r.fixed===0?2:0)+Math.min(3,new Set(r.steps.map(x=>x[1])).size)-(/カフェ/.test(r.title)?2:0)-(v.startTime==='16:00'&&r.steps.some(([,id])=>['gyoen','zoo','kahaku','tnm'].includes(id))?8:0);
 const ranked=pool.map(r=>({r,score:score(r)})).sort((a,b)=>b.score-a.score),top=ranked[0].score;
 let candidates=ranked.filter(x=>x.score>=top-3).slice(0,5);
 if(candidates.length>1&&lastId){const last=routes.find(r=>r.id===lastId),sig=r=>r.steps.map(x=>x[1]).join('|');const distinct=candidates.filter(x=>x.r.id!==lastId&&(!last||sig(x.r)!==sig(last)));if(distinct.length)candidates=distinct;else candidates=candidates.filter(x=>x.r.id!==lastId);}
 const weights=candidates.map(x=>Math.max(1,x.score-(top-4))),sum=weights.reduce((a,b)=>a+b,0);let pick=Math.random()*sum;
 for(let i=0;i<candidates.length;i++){pick-=weights[i];if(pick<=0)return candidates[i].r;}
 return candidates[0].r;
};
const originalRender=render;
render=function(r){originalRender(r);buildStops(r);updateBudget();};
for(const id of ['travelCost','extraCost','budget'])document.getElementById(id)?.addEventListener('input',()=>updateBudget());
if(current){buildStops(current);updateBudget();}
// 夕方の待ち合わせ時間はモデル時刻の移動に過ぎないことを明示する。
const startSelect=document.getElementById('startTime');
if(startSelect){
 const timeNote=document.createElement('p');timeNote.id='gachaTimeCaution';timeNote.setAttribute('role','status');timeNote.setAttribute('aria-live','polite');timeNote.style.cssText='background:#fff4e9;border-left:4px solid #c36b50;border-radius:8px;padding:11px 14px;font-size:.86rem;line-height:1.65;margin:10px 0;display:none';
 const row=startSelect.closest('div');if(row)row.after(timeNote);
 function showTimeCaution(){
   const late=startSelect.value==='16:00',shifted=startSelect.value!=='default';
   if(!shifted){timeNote.style.display='none';timeNote.textContent='';return;}
   const daytime=current&&current.steps.some(([,id])=>['gyoen','zoo','kahaku','tnm'].includes(id));
   timeNote.style.display='block';
   timeNote.textContent='※表示時刻はモデルコースを機械的に移動した目安です。営業時間・最終入場・予約枠は反映されません。公式情報を確認してください。'+(late&&daytime?' このコースには夕方の入場が難しい可能性がある公園・博物館などが含まれます。別のコースも検討してください。':'');
 }
 startSelect.addEventListener('change',showTimeCaution);
 const beforeTimeRender=render;
 render=function(r){beforeTimeRender(r);showTimeCaution();};
 showTimeCaution();
}
})();
