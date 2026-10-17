/* デートコンパス：ガチャ結果 → 前日チェックリスト。料金や営業情報はリアルタイム取得しない。 */
(()=>{'use strict';
  const KEY='datecompass-preflight-import-v1';
  const actions=document.querySelector('#result .gacha-actions');
  const result=document.getElementById('result');
  if(!actions||!result)return;
  const button=document.createElement('button');
  button.type='button';button.className='btn';
  button.textContent='✓ この3スポットで前日チェック';
  button.setAttribute('aria-label','表示中の3スポットを前日チェックリストに引き継ぐ');
  actions.append(button);
  const status=document.createElement('p');status.className='small';status.setAttribute('role','status');
  status.setAttribute('aria-live','polite');actions.after(status);
  button.addEventListener('click',()=>{
    const steps=[...document.querySelectorAll('#resultSteps > li')].map(x=>x.innerText||x.textContent||'').map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
    if(result.hidden||steps.length!==3){status.textContent='3スポットの結果が表示されてから利用してください。';return;}
    const title=(document.getElementById('resultTitle')?.textContent||'デートプラン').trim();
    const intro=(document.getElementById('resultIntro')?.textContent||'').trim();
    const budget=(document.getElementById('budgetStatus')?.textContent||'').trim();
    const tip=(document.getElementById('resultTip')?.textContent||'').replace(/\s+/g,' ').trim();
    const payload={version:1,title:title.slice(0,160),intro:intro.slice(0,350),steps:steps.map(x=>x.slice(0,500)),budget:budget.slice(0,500),tip:tip.slice(0,400),savedAt:new Date().toISOString()};
    try{localStorage.setItem(KEY,JSON.stringify(payload));window.location.assign('date-preflight-checklist.html?from=gacha');}
    catch(e){status.textContent='このブラウザでは引き継ぎ保存ができません。結果のコピー機能をご利用ください。';}
  });
})();
