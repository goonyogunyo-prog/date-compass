/* デートコンパス｜16時以降と条件フォールバックの透明化（2026-10-17）
 * No live opening hours, availability or admission prices are inferred.
 * This module loads after the original gacha and expansion scripts.
 */
(()=>{'use strict';
  if(typeof choose!=='function'||typeof render!=='function'||typeof selected!=='function'||!Array.isArray(routes))return;
  const oldChoose=choose,oldRender=render;
  const unique=r=>r&&Array.isArray(r.steps)&&r.steps.length===3&&new Set(r.steps.map(s=>s&&s[1])).size===3;
  const night=r=>r?.evening===true||/16時専用|雨の16時/.test(r?.title||'')||(/^(1[6-9]|2[0-3]):\d\d$/.test(r?.steps?.[0]?.[0]||''));
  const valid=()=>routes.filter(unique);
  const score=(r,v)=>Number(r.mood===v.mood)*3+Number(v.partnerMood!=='any'&&r.mood===v.partnerMood)*2+Number(v.relation==='anniversary'&&r.mood==='romantic')*2+Number(v.relation==='before'&&r.before)*2;
  function selectBest(pool,v){
    if(!pool.length)return null;
    const highest=Math.max(...pool.map(r=>score(r,v)));
    let best=pool.filter(r=>score(r,v)===highest);
    if(best.length>1&&typeof lastId!=='undefined'){
      const notLast=best.filter(r=>r.id!==lastId);if(notLast.length)best=notLast;
    }
    return best[Math.floor(Math.random()*best.length)];
  }
  choose=function(){
    const v=selected(),all=valid(),budget=Number(v.budget),wantedNight=v.startTime==='16:00';
    const areaMatch=r=>v.area==='any'||r.area===v.area;
    if(wantedNight){
      const evening=all.filter(night);
      const tiers=[
        evening.filter(r=>r.weather===v.weather&&areaMatch(r)&&r.fixed<=budget),
        evening.filter(r=>r.weather===v.weather&&r.fixed<=budget),
        evening.filter(r=>areaMatch(r)&&r.fixed<=budget),
        evening.filter(r=>r.fixed<=budget),
        evening.filter(r=>r.weather===v.weather),
        evening
      ];
      for(const tier of tiers)if(tier.length)return selectBest(tier,v);
      // No verified evening plan exists: the fallback must be explicitly disclosed.
      const fallback=oldChoose();return unique(fallback)?fallback:selectBest(all,v);
    }
    const chosen=oldChoose();
    if(unique(chosen)&&!night(chosen))return chosen;
    const daytime=all.filter(r=>!night(r));
    const tiers=[
      daytime.filter(r=>r.weather===v.weather&&areaMatch(r)&&r.fixed<=budget),
      daytime.filter(r=>r.weather===v.weather&&r.fixed<=budget),
      daytime.filter(r=>r.fixed<=budget),
      daytime
    ];
    for(const tier of tiers)if(tier.length)return selectBest(tier,v);
    return unique(chosen)?chosen:selectBest(all,v);
  };
  render=function(r){
    if(!unique(r)){
      const status=document.getElementById('gachaConditionNotice');
      if(status){status.hidden=false;status.textContent='異なる3スポットを含むコースが見つかりません。条件を変えてお試しください。';}
      return;
    }
    oldRender(r);
    const v=selected();
    let note=document.getElementById('gachaConditionNotice');
    if(!note){
      note=document.createElement('p');note.id='gachaConditionNotice';note.setAttribute('role','status');
      note.style.cssText='padding:13px 16px;border-radius:12px;background:#fff1d9;color:#674318;line-height:1.7;border:1px solid #efd5a2';
      const meta=document.getElementById('resultMeta');if(meta)meta.after(note);
    }
    const warnings=[];
    if(v.area!=='any'&&r.area!==v.area)warnings.push('指定エリアに合う候補がなかったため、別エリアのプランを表示しています。');
    if(r.weather!==v.weather)warnings.push('指定した天気の候補が足りないため、'+(r.weather==='rain'?'雨向け':'晴れ向け')+'プランを代わりに表示しています。');
    if(v.startTime==='16:00'&&!night(r))warnings.push('16時以降に適した専用ルートが見つからず、昼間向けの参考コースを表示しています。夜間営業は確認できていません。');
    if(v.startTime!=='16:00'&&night(r))warnings.push('昼間向け候補が不足し、夕方・夜の参考コースを表示しています。');
    if(Number(r.fixed)>Number(v.budget))warnings.push('施設代の目安だけで設定予算を超える可能性があります。');
    if(v.startTime==='16:00')warnings.push('表示時刻はモデル例です。各施設の夜間営業・最終入場・移動時間は公式案内で確認してください。');
    note.hidden=warnings.length===0;
    note.textContent=warnings.map(x=>'⚠ '+x).join(' ');
  };
})();
