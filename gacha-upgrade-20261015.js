/* Date Compass gacha upgrade 2026-10-15: progressive enhancement for the current inline gacha.
   Load AFTER the existing inline script in date-gacha.html, just before </body>. */
(function(){
'use strict';
if(window.__dcUpgrade20261015) return;
window.__dcUpgrade20261015=true;
if(typeof choose!=='function'||typeof render!=='function'||typeof selected!=='function'||typeof routes==='undefined'||typeof venues==='undefined') return;
const budgetBox=document.querySelector('.budget-planner');
const foodInput=document.getElementById('foodCost');
const travelInput=document.getElementById('travelCost');
const extraInput=document.getElementById('extraCost');
const result=document.getElementById('result');
if(!budgetBox||!foodInput||!travelInput||!extraInput||!result) return;
const style=document.createElement('style');
style.textContent='.dc-stop-grid{display:grid;gap:10px;margin:14px 0}.dc-stop{display:grid;grid-template-columns:minmax(0,1fr) minmax(130px,.55fr);gap:12px;align-items:center;padding:12px;border:1px solid #eadfdb;border-radius:12px;background:#fffafc}.dc-stop label{display:block;font-size:.87rem;font-weight:700}.dc-stop input{width:100%;min-height:42px}.dc-note{font-size:.87rem;color:#69585d}@media(max-width:600px){.dc-stop{grid-template-columns:1fr}}';
document.head.appendChild(style);
const box=document.createElement('div');box.id='dcStops';box.className='dc-stop-grid';
const heading=document.createElement('h4');heading.textContent='立ち寄り先ごとの飲食・買い物予算';
const note=document.createElement('p');note.className='dc-note';note.textContent='各場所で使う予定額を入力。施設の入場料は元の目安に含まれるため、ここでは重複して入力しないでください。金額は自分で決める予算で、店の実際の価格ではありません。';
budgetBox.insertBefore(heading,budgetBox.querySelector('.gacha-grid'));
heading.after(note,box);
const foodWrapper=foodInput.closest('div');
if(foodWrapper) foodWrapper.hidden=true;
foodInput.value='0';
function updateSpotBudget(){
 const sum=[...box.querySelectorAll('input[data-spot-cost]')].reduce((s,x)=>s+Math.max(0,Number(x.value)||0),0);
 foodInput.value=String(sum);
 updateBudget();
}
function drawStops(r){
 box.replaceChildren();
 if(!r||!Array.isArray(r.steps))return;
 const v=selected();
 r.steps.forEach(([time,id],index)=>{
  const p=venues[id],row=document.createElement('div'),label=document.createElement('label'),input=document.createElement('input'),wrap=document.createElement('div'),title=document.createElement('strong'),small=document.createElement('div');
  row.className='dc-stop';title.textContent=(index+1)+'件目｜'+(p?p.name:'立ち寄り先');
  small.className='dc-note';small.textContent='モデル時刻 '+planClock(time,r.steps[0][0],v.startTime);
  wrap.append(title,small);label.htmlFor='dcSpot'+index;label.textContent='飲食・買い物の予定額（円）';
  input.id='dcSpot'+index;input.type='number';input.min='0';input.step='100';input.inputMode='numeric';input.value='0';input.dataset.spotCost=String(index);
  input.addEventListener('input',updateSpotBudget);const field=document.createElement('div');field.append(label,input);row.append(wrap,field);box.append(row);
 });
 updateSpotBudget();
}
const oldRender=render;
render=function(r){oldRender(r);drawStops(r);};
const recent=[];
choose=function(){
 const v=selected(),budget=Number(v.budget);
 let pool=routes.filter(r=>(v.area==='any'||r.area===v.area)&&r.weather===v.weather&&r.fixed<=budget-2000);
 if(!pool.length)pool=routes.filter(r=>(v.area==='any'||r.area===v.area)&&r.weather===v.weather&&r.fixed<=budget);
 if(!pool.length)pool=routes.filter(r=>r.weather===v.weather&&r.fixed<=budget);
 if(!pool.length)pool=routes.filter(r=>r.weather===v.weather);
 if(!pool.length)return routes[0];
 const score=r=>(r.mood===v.mood?5:0)+(v.partnerMood!=='any'&&r.mood===v.partnerMood?3:0)+(v.relation==='anniversary'&&r.mood==='romantic'?2:0)+(v.relation==='before'&&r.before?4:0)+(budget===3000&&r.fixed===0?1:0);
 const max=Math.max(...pool.map(score));
 let candidates=pool.filter(r=>score(r)>=max-3);
 const fresh=candidates.filter(r=>!recent.includes(r.id));
 if(fresh.length)candidates=fresh;
 const weights=candidates.map(r=>Math.max(1,score(r)-(max-5)));
 let roll=Math.random()*weights.reduce((a,b)=>a+b,0),pick=candidates[candidates.length-1];
 for(let i=0;i<candidates.length;i++){roll-=weights[i];if(roll<=0){pick=candidates[i];break;}}
 recent.push(pick.id);if(recent.length>3)recent.shift();return pick;
};
/* The original travel/extra input listeners use the original function reference.
   Keep foodCost synced to the stop total so those listeners calculate correctly. */
if(!result.hidden && typeof current!=='undefined' && current) drawStops(current);
})();