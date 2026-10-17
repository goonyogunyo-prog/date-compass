/* Date Compass | ticket shortlist: compare up to 3 candidates, 2026-10-17.
 * No personal data, prices, availability, or visit dates are collected or inferred.
 * The list stays in this browser tab; affiliate links are general search entry points.
 * Optional Tokyo anniversary overnight link is editorial, never a hotel booking guarantee.
 */
(()=>{'use strict';
 const A8={kkday:'https://px.a8.net/svt/ejp?a8mat=4BEH56+3XP8AQ+52F8+60OXE',agoda:'https://px.a8.net/svt/ejp?a8mat=4BEH56+3VBHVM+4X1W+TS3OI'};
 const cards=[...document.querySelectorAll('#spotGrid .spot-card')].filter(card=>card.querySelector('.dc-spot-ticket-btn'));
 const resultHead=document.querySelector('.result-head');
 if(!cards.length||!resultHead||document.getElementById('dc-ticket-shortlist'))return;
 const selected=[];
 // Editorial food comparisons are shown only after 2+ Tokyo ticket candidates are selected.
 // This is not a claim that a listed restaurant is near the selected facilities.
 const STAY_GUIDE='https://goonyogunyo-prog.github.io/stay-select/guides/anniversary.html';
 const DINING={
  lunch:{label:'東京のホテルランチ比較を見る ↗',url:'https://goonyogunyo-prog.github.io/gourmet-guide/tokyo-hotel-lunch-2026.html'},
  tea:{label:'東京のアフタヌーンティー比較を見る ↗',url:'https://goonyogunyo-prog.github.io/gourmet-guide/tokyo-autumn-afternoon-tea-2026.html'},
  dinner:{label:'東京の記念日ディナー比較を見る ↗',url:'https://goonyogunyo-prog.github.io/gourmet-guide/tokyo-anniversary-dinner-2026.html'}
 };
 const style=document.createElement('style');style.id='dc-ticket-shortlist-css';style.textContent=`
 .dc-shortlist{margin:18px 0 22px;padding:18px;border:1px solid #c6dfd6;border-radius:16px;background:#f4fbf8;color:#17483e;max-width:100%;overflow-wrap:anywhere}
 .dc-shortlist h2{margin:0 0 7px;font-size:1.2rem}.dc-shortlist p{font-size:.87rem;line-height:1.65;margin:6px 0}
 .dc-shortlist ul{padding:0;list-style:none;margin:12px 0;display:grid;gap:9px}
 .dc-shortlist li{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:10px;background:white;border-radius:10px;border:1px solid #d5e8df}
 .dc-shortlist li strong{flex:1 1 190px;font-size:.92rem}.dc-shortlist a{color:#126653;font-weight:750;min-height:42px;display:inline-flex;align-items:center}
 .dc-shortlist button,.dc-shortlist-add{border:1px solid #17745d;border-radius:9px;background:#fff;color:#126653;font-weight:750;cursor:pointer;padding:9px 12px;min-height:44px}
 .dc-shortlist-add{display:block;margin-top:8px}.dc-shortlist-add[aria-pressed="true"]{background:#126653;color:#fff}
 .dc-shortlist-add:disabled{opacity:.65;cursor:not-allowed}.dc-shortlist button:focus-visible,.dc-shortlist-add:focus-visible,.dc-shortlist a:focus-visible{outline:3px solid #a9c5fa;outline-offset:2px}
 .dc-shortlist .dc-shortlist-dining{margin-top:14px;padding:12px;background:#fff;border:1px solid #cce5db;border-radius:12px}
 .dc-shortlist .dc-shortlist-dining[hidden]{display:none!important}.dc-shortlist .dc-shortlist-dining label{font-weight:750;display:block;margin:6px 0}
 .dc-shortlist .dc-shortlist-dining select{width:100%;max-width:320px;min-height:44px;border:1px solid #b6d7c9;border-radius:9px;background:white;padding:8px;color:#17483e}
 .dc-shortlist .dc-shortlist-dining a{display:inline-flex;padding:10px 12px;min-height:44px;border-radius:9px;background:#126653;color:white!important;text-decoration:none;margin-top:9px}
 .dc-shortlist .dc-shortlist-stay{margin-top:12px;padding:12px;background:#fff;border:1px solid #cce5db;border-radius:12px}
 .dc-shortlist .dc-shortlist-stay[hidden]{display:none!important}.dc-shortlist .dc-shortlist-stay label{display:flex;align-items:center;gap:10px;font-weight:750;line-height:1.6;cursor:pointer}
 .dc-shortlist .dc-shortlist-stay input{width:20px;height:20px;flex:none;accent-color:#126653}
 .dc-shortlist .dc-shortlist-stay a{display:inline-flex;padding:10px 12px;min-height:44px;border-radius:9px;background:#126653;color:white!important;text-decoration:none;margin-top:9px}
 .dc-shortlist .dc-shortlist-stay .dc-shortlist-stay-result[hidden]{display:none!important}
 .dc-shortlist .dc-shortlist-budget{margin-top:14px;padding:13px;background:#fff;border:1px solid #cce5db;border-radius:12px}
 .dc-shortlist .dc-shortlist-budget[hidden]{display:none!important}
 .dc-shortlist .dc-shortlist-budget h3{margin:0 0 8px;font-size:1rem}
 .dc-shortlist .dc-budget-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
 .dc-shortlist .dc-budget-fields label{font-weight:700;font-size:.84rem;line-height:1.5}
 .dc-shortlist .dc-budget-fields input{display:block;width:100%;min-width:0;min-height:44px;padding:8px;border:1px solid #b6d7c9;border-radius:9px;background:#fff;color:#17483e;font-size:1rem}
 .dc-shortlist .dc-budget-result{padding:9px 12px;border-radius:9px;background:#edf7f1;font-weight:750;overflow-wrap:anywhere}
 .dc-shortlist .dc-budget-cta{display:inline-flex;align-items:center;margin-top:8px;padding:10px 12px;background:#126653;color:#fff;border-radius:9px;text-decoration:none;min-height:44px}
 .dc-shortlist .dc-budget-cta[hidden]{display:none!important}
 @media(max-width:480px){.dc-shortlist .dc-budget-fields{grid-template-columns:1fr}}

 .dc-shortlist .dc-provider-compare{margin-top:14px;padding:13px;background:#fff;border:1px solid #cce5db;border-radius:12px}
 .dc-shortlist .dc-provider-compare[hidden],.dc-shortlist .dc-provider-go[hidden]{display:none!important}
 .dc-shortlist .dc-provider-compare h3{font-size:1rem;margin:0 0 8px}
 .dc-shortlist .dc-provider-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
 .dc-shortlist .dc-provider-spot-label{display:block;font-weight:750;margin:10px 0 8px;font-size:.9rem}
 .dc-shortlist .dc-provider-grid label{font-size:.82rem;font-weight:750;line-height:1.5}
 .dc-shortlist .dc-provider-grid input,.dc-shortlist .dc-provider-select{display:block;width:100%;min-width:0;min-height:44px;border:1px solid #b6d7c9;border-radius:9px;background:#fff;color:#17483e;padding:8px;font-size:1rem}
 .dc-shortlist .dc-provider-output{margin:10px 0;padding:10px;border-radius:9px;background:#edf7f1;font-weight:750;overflow-wrap:anywhere}
 .dc-shortlist .dc-provider-go{margin-top:10px;min-height:44px;background:#126653!important;color:#fff!important;padding:10px 12px}
 @media(max-width:590px){.dc-shortlist .dc-provider-grid{grid-template-columns:1fr}}
 .dc-shortlist .dc-shortlist-ads[hidden]{display:none!important}
 .dc-shortlist .dc-shortlist-ads{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:10px;margin-top:12px}
 .dc-shortlist .dc-shortlist-ads a{justify-content:center;text-align:center;background:#126653;color:#fff!important;text-decoration:none;padding:10px 12px;border-radius:10px;min-height:48px}
 @media(max-width:480px){.dc-shortlist{padding:13px}.dc-shortlist li{align-items:flex-start}}
 `;document.head.append(style);
 const section=document.createElement('section');section.id='dc-ticket-shortlist';section.className='dc-shortlist';section.setAttribute('aria-label','チケット比較候補');
 const heading=document.createElement('h2');heading.textContent='🎟 気になるチケット候補を3件まで比較';
 const summary=document.createElement('p');summary.id='dc-shortlist-count';summary.setAttribute('role','status');summary.setAttribute('aria-live','polite');
 const list=document.createElement('ul');list.id='dc-shortlist-items';
 const note=document.createElement('p');note.textContent='候補の公式案内を横並びで確認できます。選択内容はこのタブ内だけで保持し、外部送信しません。料金・営業日・予約可否は公式情報を優先してください。';
 const ads=document.createElement('div');ads.className='dc-shortlist-ads';ads.hidden=true;
 const disclaimer=document.createElement('p');disclaimer.hidden=true;disclaimer.textContent='PR：以下は一般の体験検索サービスへの広告リンクです。上の施設の取扱い・空席・料金・直接予約を保証しません。検索して対象日・人数・キャンセル条件を確認してください。';
 const clear=document.createElement('button');clear.type='button';clear.textContent='候補をすべて外す';clear.hidden=true;
 const dining=document.createElement('div');dining.className='dc-shortlist-dining';dining.id='dc-shortlist-dining';dining.hidden=true;
 const diningTitle=document.createElement('h3');diningTitle.textContent='🍽 チケット比較の次に、食事も比較';
 const diningNote=document.createElement('p');diningNote.textContent='東京の施設候補を2件以上選んだ方向けの編集記事です。候補施設と掲載店舗が近いとは限りません。記事内のエリア・2名条件・最新料金・空席を確認してください。記事内にPRリンクが含まれます。';
 const diningLabel=document.createElement('label');diningLabel.htmlFor='dc-shortlist-dining-choice';diningLabel.textContent='食事の希望';
 const diningChoice=document.createElement('select');diningChoice.id=diningLabel.htmlFor;
 [['lunch','ホテルランチ'],['tea','アフタヌーンティー'],['dinner','記念日ディナー']].forEach(([value,label])=>diningChoice.add(new Option(label,value)));
 const diningLink=document.createElement('a');diningLink.target='_blank';diningLink.rel='noopener noreferrer';diningLink.dataset.dcCta='gourmet-lunch';diningLink.dataset.dcPlacement='spot-shortlist-dining';
 diningLink.addEventListener('click',()=>tracking('gourmet-'+diningChoice.value,'spot-shortlist-dining'));
 dining.append(diningTitle,diningNote,diningLabel,diningChoice,diningLink);
 const stay=document.createElement('div');stay.className='dc-shortlist-stay';stay.id='dc-shortlist-stay';stay.hidden=true;
 const stayLabel=document.createElement('label');stayLabel.htmlFor='dc-shortlist-stay-choice';
 const stayChoice=document.createElement('input');stayChoice.type='checkbox';stayChoice.id=stayLabel.htmlFor;
 stayLabel.append(stayChoice,document.createTextNode('記念日・誕生日で、宿泊も検討する'));
 const stayResult=document.createElement('div');stayResult.className='dc-shortlist-stay-result';stayResult.hidden=true;
 const stayNote=document.createElement('p');stayNote.textContent='宿泊も考える場合は、STAY SELECTの記念日向け宿12候補を比較できます。全国の候補を含むため、東京都の宿を絞り込んでください。選んだ施設との距離、2名の空室・料金・特典・直接予約を保証しません。';
 const stayLink=document.createElement('a');stayLink.href=STAY_GUIDE;stayLink.target='_blank';stayLink.rel='noopener noreferrer';stayLink.dataset.dcCta='stay-anniversary';stayLink.dataset.dcPlacement='spot-shortlist-stay';stayLink.textContent='記念日・誕生日向け宿を比較する ↗';
 stayLink.addEventListener('click',()=>tracking('stay-anniversary','spot-shortlist-stay'));
 stayResult.append(stayNote,stayLink);stay.append(stayLabel,stayResult);
 // A local-only two-person cost estimate creates a relevant path to the existing booking comparisons.
 // All amounts are user-entered, never treated as published prices, never sent to analytics.
 const budget=document.createElement('div');budget.id='dc-shortlist-budget';budget.className='dc-shortlist-budget';budget.hidden=true;
 const budgetTitle=document.createElement('h3');budgetTitle.textContent='💴 2人分の予約予算を確認';
 const budgetNote=document.createElement('p');budgetNote.textContent='選んだ候補のチケット代・食事・交通費を2人分の見積額で入力。公式料金・大学生区分・手数料・キャンセル条件を確認してください。金額は保存・送信しません。';
 const budgetFields=document.createElement('div');budgetFields.className='dc-budget-fields';
 const inputs={};
 [['ticket','チケット代（2人合計・円）'],['food','食事代（2人合計・円）'],['transport','交通費（2人合計・円）'],['limit','予算上限（2人合計・円）']].forEach(([key,label])=>{
  const wrap=document.createElement('label');wrap.textContent=label;
  const input=document.createElement('input');input.type='number';input.min='0';input.step='1';input.inputMode='numeric';input.placeholder='未入力';input.id='dc-budget-'+key;input.dataset.dcBudgetField=key;
  input.setAttribute('aria-label',label);wrap.append(input);budgetFields.append(wrap);inputs[key]=input;
 });
 const budgetResult=document.createElement('p');budgetResult.id='dc-budget-result';budgetResult.className='dc-budget-result';budgetResult.setAttribute('role','status');budgetResult.setAttribute('aria-live','polite');
 const budgetCta=document.createElement('a');budgetCta.href='#dc-ticket-shortlist';budgetCta.className='dc-budget-cta';budgetCta.textContent='チケットの予約候補を比較する ↓';budgetCta.hidden=true;
 budgetCta.addEventListener('click',event=>{event.preventDefault();ads.scrollIntoView({behavior:'smooth',block:'center'});ads.querySelector('a')?.focus({preventScroll:true});});
 budget.append(budgetTitle,budgetNote,budgetFields,budgetResult,budgetCta);
 // Booking-site quote comparison: values are entered by visitors, not sourced or verified by this site.
 // We never append values to URLs, analytics events, or storage.
 const providers=document.createElement('div');providers.className='dc-provider-compare';providers.id='dc-provider-compare';providers.hidden=true;
 const providersTitle=document.createElement('h3');providersTitle.textContent='🔎 予約先別・2人分の見積額を比べる';
 const providersNote=document.createElement('p');providersNote.textContent='公式・KKday・Agodaでご自身が確認した「同じ施設・同じ日・2人分」の税込支払総額を入力してください。学生料金・手数料・取消条件・予約可否は別途確認が必要です。入力額はサイトの公表価格ではありません。';
 // Conversion improvement: scope price comparison to one selected facility, not three different facilities.
 const providerSpotLabel=document.createElement('label');providerSpotLabel.className='dc-provider-spot-label';providerSpotLabel.htmlFor='dc-provider-spot';providerSpotLabel.textContent='見積もりを比較する施設（比較候補から選択）';
 const providerSpotSelect=document.createElement('select');providerSpotSelect.className='dc-provider-select';providerSpotSelect.id='dc-provider-spot';
 const providersGrid=document.createElement('div');providersGrid.className='dc-provider-grid';
 const quoteInputs={};
 [['official','公式で確認した2人分の合計'],['kkday','KKdayで確認した2人分の合計（PR）'],['agoda','Agodaで確認した2人分の合計（PR）']].forEach(([key,label])=>{
  const wrap=document.createElement('label');wrap.textContent=label;
  const field=document.createElement('input');field.type='number';field.min='0';field.step='1';field.inputMode='numeric';field.placeholder='未確認';field.id='dc-provider-'+key;field.dataset.dcProviderPrice=key;field.setAttribute('aria-label',label);
  wrap.append(field);providersGrid.append(wrap);quoteInputs[key]=field;
 });
 const providerOutput=document.createElement('p');providerOutput.className='dc-provider-output';providerOutput.id='dc-provider-result';providerOutput.setAttribute('role','status');providerOutput.setAttribute('aria-live','polite');
 const providerLabel=document.createElement('label');providerLabel.textContent='確認したい予約先を選ぶ';providerLabel.htmlFor='dc-provider-choice';
 const providerSelect=document.createElement('select');providerSelect.className='dc-provider-select';providerSelect.id='dc-provider-choice';
 [['','選択してください'],['official','施設の公式案内'],['kkday','KKdayの体験検索（PR）'],['agoda','Agodaの体験検索（PR）']].forEach(([value,label])=>providerSelect.add(new Option(label,value)));
 const providerGo=document.createElement('button');providerGo.type='button';providerGo.className='dc-provider-go';providerGo.textContent='選んだ予約先を開く ↗';providerGo.hidden=true;providerGo.setAttribute('aria-label','選択した予約先の案内を新しいタブで開く');
 const providerCaution=document.createElement('p');providerCaution.textContent='PR：見積もりは選択した1施設について入力してください。別の施設に切り替えると入力額は消去されます。KKday・Agodaは一般の体験検索広告で、選択施設を取り扱うとは限りません。最小見積額はユーザー入力額のみの比較で、同条件・空席・料金・キャンセル規定を保証しません。入力額は保存・送信しません。';
 providers.append(providersTitle,providersNote,providerSpotLabel,providerSpotSelect,providersGrid,providerOutput,providerLabel,providerSelect,providerGo,providerCaution);
 section.append(heading,summary,list,note,dining,stay,budget,providers,disclaimer,ads,clear);resultHead.after(section);
 function amount(input){const v=input.value.trim();if(v==='')return null;const n=Number(v);return Number.isSafeInteger(n)&&n>=0&&n<=100000000?n:null;}
 const yen=n=>new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(n);
 function updateBudget(){
  const has=selected.length>0;budget.hidden=!has;budgetCta.hidden=!has;
  if(!has){budgetResult.textContent='';return;}
  const values=['ticket','food','transport'].map(k=>amount(inputs[k]));const known=values.filter(v=>v!==null);const total=known.reduce((a,b)=>a+b,0);const missing=3-known.length;
  let msg=known.length?'入力済み小計：'+yen(total):'金額を入力すると小計を表示します。';
  if(missing)msg+='／未入力'+missing+'項目は小計に含みません。';
  const limit=amount(inputs.limit);
  if(limit!==null&&known.length){msg+=total>limit?'／入力済み小計が予算を'+yen(total-limit)+'超過しています。':'／入力済み小計の予算残額：'+yen(limit-total);}
  if(limit!==null&&!known.length)msg+='／予算上限：'+yen(limit);
  budgetResult.textContent=msg;
 }
 Object.values(inputs).forEach(input=>input.addEventListener('input',updateBudget));
 function updateProviders(){
  providers.hidden=selected.length===0;
  if(!selected.length){providerOutput.textContent='';providerGo.hidden=true;return;}
  const spot=selected.find(card=>card.dataset.dcShortlistKey===providerSpotSelect.value);
  if(!spot){providerOutput.textContent='比較する施設を選んでください。';providerGo.hidden=true;return;}
  const labels={official:'公式',kkday:'KKday（PR）',agoda:'Agoda（PR）'};
  const quotes=Object.entries(quoteInputs).map(([key,field])=>({key,price:amount(field)})).filter(item=>item.price!==null);
  if(quotes.length===0)providerOutput.textContent='未入力：各予約先の見積額を確認してから入力してください。';
  else if(quotes.length===1)providerOutput.textContent=labels[quotes[0].key]+'：'+yen(quotes[0].price)+'。他の予約先も入力すると差額を比較できます。';
  else {const ordered=[...quotes].sort((a,b)=>a.price-b.price);const tied=ordered.filter(item=>item.price===ordered[0].price).map(item=>labels[item.key]);
   providerOutput.textContent='入力済み'+quotes.length+'社のうち最小見積額：'+tied.join('・')+' '+yen(ordered[0].price)+'。最大見積額との差：'+yen(ordered[ordered.length-1].price-ordered[0].price)+'。条件が同じか必ず確認してください。';}
  providerGo.hidden=!providerSelect.value||!spot;
  const ctaLabels={official:'この施設の公式案内を開く ↗',kkday:'KKdayで体験を探す（PR） ↗',agoda:'Agodaで体験を探す（PR） ↗'};
  providerGo.textContent=ctaLabels[providerSelect.value]||'予約先を選択してください';
  providerGo.setAttribute('aria-label',providerGo.textContent+'（新しいタブ）');
 }
 Object.values(quoteInputs).forEach(field=>field.addEventListener('input',updateProviders));
 providerSpotSelect.addEventListener('change',()=>{Object.values(quoteInputs).forEach(field=>{field.value='';});providerSelect.value='';updateProviders();});
 providerSelect.addEventListener('change',updateProviders);
 providerGo.addEventListener('click',()=>{
  const chosen=selected.find(card=>card.dataset.dcShortlistKey===providerSpotSelect.value);
  if(!chosen)return;
  const target=providerSelect.value==='official'?Array.from(list.querySelectorAll('li')).find(li=>li.dataset.dcShortlistKey===providerSpotSelect.value)?.querySelector('a[href]'):providerSelect.value==='kkday'?ads.querySelector('a[data-dc-cta="kkday"]'):providerSelect.value==='agoda'?ads.querySelector('a[data-dc-cta="agoda"]'):null;
  if(!target)return;
  // One-step conversion: activate the EXISTING vetted anchor instead of adding another ad link.
  // The existing anchor carries PR/rel and fires its own anonymous click event exactly once.
  target.click();
 });

 function tracking(channel,placement='spot-shortlist'){try{window.dispatchEvent(new CustomEvent('datecompass:cta-click',{detail:{placement,channel}}));if(typeof window.gtag==='function')window.gtag('event','dc_outbound_click',{cta_channel:channel,cta_placement:placement});}catch(_){}}
 function ad(label,url,channel){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='nofollow sponsored noopener noreferrer';a.textContent=label;a.dataset.dcCta=channel;a.dataset.dcPlacement='spot-shortlist';a.addEventListener('click',()=>tracking(channel));return a;}
 ads.append(ad('KKdayで体験を探す（PR） ↗',A8.kkday,'kkday'),ad('Agodaで体験を探す（PR） ↗',A8.agoda,'agoda'));
 function updateDining(){
  const show=selected.length>=2&&selected.every(card=>card.dataset.pref==='東京');
  dining.hidden=!show;
  stay.hidden=!show;stayResult.hidden=!show||!stayChoice.checked;
  if(!show)return;
  const chosen=DINING[diningChoice.value];diningLink.href=chosen.url;diningLink.textContent=chosen.label;diningLink.dataset.dcCta='gourmet-'+diningChoice.value;
 }
 diningChoice.addEventListener('change',updateDining);
 stayChoice.addEventListener('change',updateDining);
 const buttons=new Map();
 function render(){summary.textContent=selected.length+' / 3件を比較候補に選択中'+(selected.length===3?'（上限）':'');list.replaceChildren();
  selected.forEach(card=>{const li=document.createElement('li');li.dataset.dcShortlistKey=card.dataset.dcShortlistKey;const name=document.createElement('strong');name.textContent=card.querySelector('h3')?.textContent?.trim()||'候補';
   const official=card.querySelector('.spot-actions > a[href]');if(official){const link=document.createElement('a');link.href=official.href;link.textContent='公式案内 ↗';link.target='_blank';link.rel='noopener noreferrer';link.addEventListener('click',()=>tracking('spot-official'));li.append(name,link);}else li.append(name);
   const remove=document.createElement('button');remove.type='button';remove.textContent='外す';remove.setAttribute('aria-label',name.textContent+'を比較候補から外す');remove.addEventListener('click',()=>toggle(card));li.append(remove);list.append(li);});
  for(const [card,button] of buttons){const picked=selected.includes(card);button.setAttribute('aria-pressed',String(picked));button.textContent=picked?'✓ 比較候補に追加済み（外す）':'＋ チケット比較候補に追加';button.disabled=!picked&&selected.length>=3;}
  // Keep the selected facility stable as other candidates are added. Reset quotes when it disappears.
  const oldSpot=providerSpotSelect.value;
  providerSpotSelect.replaceChildren();
  selected.forEach(card=>{const opt=new Option(card.querySelector('h3')?.textContent?.trim()||'候補',card.dataset.dcShortlistKey);providerSpotSelect.add(opt);});
  if(selected.some(card=>card.dataset.dcShortlistKey===oldSpot))providerSpotSelect.value=oldSpot;
  else {Object.values(quoteInputs).forEach(input=>{input.value='';});providerSelect.value='';}
  const has=selected.length>0;ads.hidden=!has;disclaimer.hidden=!has;clear.hidden=!has;if(!has){Object.values(inputs).forEach(input=>{input.value='';});Object.values(quoteInputs).forEach(input=>{input.value='';});providerSelect.value='';}updateDining();updateBudget();updateProviders();
 }
 function toggle(card){const idx=selected.indexOf(card);if(idx>=0)selected.splice(idx,1);else if(selected.length<3)selected.push(card);render();}
 for(const [index,card] of cards.entries()){card.dataset.dcShortlistKey='ticket-'+index;const actions=card.querySelector('.spot-actions');if(!actions)continue;const button=document.createElement('button');button.type='button';button.className='dc-shortlist-add';button.addEventListener('click',()=>toggle(card));actions.append(button);buttons.set(card,button);}
 clear.addEventListener('click',()=>{selected.length=0;Object.values(inputs).forEach(input=>{input.value='';});render();});render();
 document.documentElement.dataset.dcTicketShortlistEligible=String(buttons.size);
})();
