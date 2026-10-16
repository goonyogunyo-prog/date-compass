/* Date Compass 2026-10-17 03:00 JST
 * Restore shared links for routes loaded by expansion scripts; export the current
 * three-stop itinerary and itemized budget without inventing missing prices.
 * Does not send data to any server or change affiliate links.
 */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const allRoutes=()=>typeof routes!=='undefined'&&Array.isArray(routes)?routes:[];
const active=()=>typeof current!=='undefined'?current:null;
function init(){
  const result=$('result'),share=$('share'),status=$('shareMessage');
  if(!result||!share||!status)return;
  // The inline script reads ?route before external expansion scripts execute.
  // At DOMContentLoaded all classic and defer scripts have finished loading.
  const requested=new URLSearchParams(location.search).get('route');
  if(requested){
    const match=allRoutes().find(r=>r.id===requested);
    if(match&&active()?.id!==match.id&&typeof render==='function'){
      const area=$('area'),weather=$('weather');
      if(area&&[...area.options].some(o=>o.value===match.area))area.value=match.area;
      if(weather&&[...weather.options].some(o=>o.value===match.weather))weather.value=match.weather;
      render(match);
    }else if(!match){
      const note=document.createElement('p');note.setAttribute('role','status');
      note.style.cssText='padding:12px;border-radius:12px;background:#fff4df;color:#684116';
      note.textContent='共有リンクのプランが見つかりません。条件を選んでガチャを回してください。';
      $('gachaForm')?.after(note);
    }
  }
  const buttons=share.parentElement;
  if(!buttons||$('copyItinerary'))return;
  const copy=document.createElement('button');copy.type='button';copy.id='copyItinerary';
  copy.className='btn';copy.textContent='📋 3スポットの行程をコピー';
  const save=document.createElement('button');save.type='button';save.id='saveItinerary';
  save.className='btn';save.textContent='⬇ 行程メモを保存';
  buttons.insertBefore(copy,share.nextSibling);copy.after(save);
  function itinerary(){
    const r=active();if(!r||result.hidden)return null;
    const lines=['【デートコンパス｜デートプラン】',r.title,r.intro||'',''];
    const li=[...document.querySelectorAll('#resultSteps li')];
    const costInputs=[...document.querySelectorAll('#budgetStops .budget-stop input')];
    if(li.length!==3||new Set(r.steps.map(s=>s[1])).size!==3){
      lines.push('⚠ 3つの異なるスポットを確認できません。条件を変えて引き直してください。','');
    }
    li.forEach((row,i)=>{
      const time=row.querySelector('.time')?.textContent?.trim()||r.steps[i]?.[0]||'時刻未設定';
      const name=row.querySelector('strong')?.textContent?.trim()||'スポット名未確認';
      const link=row.querySelector('a.source-link')?.href||'';
      const input=costInputs[i];
      const val=input?.value?.trim();
      const fee=val!==undefined&&val!==''&&Number.isFinite(Number(val))&&Number(val)>=0?
        `${Number(val).toLocaleString('ja-JP')}円／人（入力値・要確認）`:'未算入（料金を公式サイトで確認）';
      lines.push(`${i+1}件目｜${time}｜${name}`,`施設・体験料：${fee}`);
      if(link)lines.push(`公式案内：${link}`);
      const caution=row.querySelector('p')?.textContent?.trim();
      if(caution)lines.push(`メモ：${caution}`);
      lines.push('');
    });
    const expenses=[['foodCost','食事・カフェ代'],['travelCost','交通費'],['extraCost','その他費用']];
    lines.push('【予算】');
    for(const [id,label] of expenses){
      const v=$(id)?.value?.trim();
      lines.push(`${label}：${v!==undefined&&v!==''&&Number.isFinite(Number(v))&&Number(v)>=0?Number(v).toLocaleString('ja-JP')+'円／人（入力値）':'未算入'}`);
    }
    const summary=$('budgetStatus')?.textContent?.trim();if(summary)lines.push(summary);
    if(r.tip)lines.push('注意点：'+r.tip);
    lines.push('※営業時間・料金・空き状況・移動時間は当日公式案内で確認してください。');
    const link=new URL(location.href);
    for(const [k,v] of Object.entries(typeof selected==='function'?selected():{}))link.searchParams.set(k,v);
    link.searchParams.set('route',r.id);
    lines.push('プランの共有リンク：'+link.toString());
    return lines.join('\n');
  }
  copy.addEventListener('click',async()=>{
    const text=itinerary();if(!text){status.textContent='先にガチャを回してください。';return;}
    try{await navigator.clipboard.writeText(text);status.textContent='3スポット・費用・未算入項目をコピーしました。';}
    catch{status.textContent='コピーできませんでした。「行程メモを保存」を使ってください。';}
  });
  save.addEventListener('click',()=>{
    const text=itinerary();if(!text){status.textContent='先にガチャを回してください。';return;}
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='date-compass-itinerary.txt';
    document.body.append(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    status.textContent='行程メモの保存を開始しました。';
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
