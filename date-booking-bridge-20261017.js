/* Date Compass conversion bridge | 2026-10-17 | editorial links verified 2026-10-17 */
(()=>{'use strict';
 const ROOT='https://goonyogunyo-prog.github.io/gourmet-guide/';
 const LINKS={anniversary:ROOT+'tokyo-anniversary-dinner-2026.html',lunch:ROOT+'tokyo-hotel-lunch-2026.html',tea:ROOT+'tokyo-autumn-afternoon-tea-2026.html'};
 const A8={kkday:'https://px.a8.net/svt/ejp?a8mat=4BEH56+3XP8AQ+52F8+60OXE',agoda:'https://px.a8.net/svt/ejp?a8mat=4BEH56+3VBHVM+4X1W+TS3OI'};
 const ANNIVERSARY='https://goonyogunyo-prog.github.io/date-compass/anniversary-booking-guide-2026.html';
 const STAY='https://goonyogunyo-prog.github.io/stay-select/guides/anniversary.html';
 const RAIN='https://goonyogunyo-prog.github.io/date-compass/rain-ticket-booking-guide-2026.html';
 const BIRTHDAY='https://goonyogunyo-prog.github.io/date-compass/birthday-date-booking-planner-2026.html';
 const TICKET=/(水族館|展望|ミュージアム|美術館|博物館|映画|プラネタリウム|遊園地|体験|アート|観覧車|劇場|科学館|シアター|テーマパーク|スカイツリー|タワー|チケット)/;
 const STYLE='\n.dc-convert{border:1px solid #c9e2d8;background:linear-gradient(145deg,#f4fbf8,#fff);border-radius:18px;padding:18px;margin:18px 0;color:#163e38;max-width:100%;overflow-wrap:anywhere}.dc-convert h3{margin:5px 0 9px;font-size:1.15rem}.dc-convert p{font-size:.91rem;line-height:1.7;margin:7px 0}.dc-convert .dc-eyebrow{font-size:.72rem;font-weight:800;letter-spacing:.08em;color:#357b69}.dc-convert .dc-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:10px;margin:12px 0}.dc-convert .dc-link{display:flex;align-items:center;justify-content:center;min-height:46px;padding:12px;border-radius:12px;border:1px solid #b6d7c9;text-align:center;text-decoration:none!important;font-size:.91rem;font-weight:750;background:#fff;color:#17584c!important}.dc-convert .dc-link.primary{background:#126653;color:#fff!important;border-color:#126653}.dc-convert .dc-disclaimer{font-size:.75rem;color:#5a6c66}.dc-convert .dc-dining-picker{display:block;width:100%;max-width:360px;min-height:44px;border:1px solid #b6d7c9;border-radius:10px;background:#fff;color:#163e38;padding:9px;margin:8px 0}.dc-convert .dc-next-action{margin:14px 0;padding:14px;border:1px solid #b6d7c9;border-radius:14px;background:#eaf6f1}.dc-convert .dc-next-action[hidden]{display:none!important}.dc-convert .dc-next-action label{display:block;font-weight:750;margin-bottom:8px}.dc-convert .dc-next-action select{width:100%;max-width:420px;min-height:44px;border-radius:10px;border:1px solid #b6d7c9;background:#fff;color:#163e38;padding:9px}.dc-convert .dc-next-action .dc-link{margin-top:10px;max-width:460px}.dc-convert .dc-paid{border-top:1px solid #dcebe5;margin-top:14px;padding-top:13px}.dc-convert[hidden],.dc-convert .dc-paid[hidden],.dc-convert .dc-food[hidden]{display:none!important}@media(max-width:440px){.dc-convert{padding:14px}.dc-convert .dc-links{grid-template-columns:1fr}}';
 if(!document.getElementById('dc-conversion-style')){const st=document.createElement('style');st.id='dc-conversion-style';st.textContent=STYLE;document.head.append(st)}
 const a=(label,url,paid,placement,channel)=>{const el=document.createElement('a');el.className='dc-link'+(paid?' primary':'');el.href=url;el.target='_blank';el.rel=paid?'nofollow sponsored noopener noreferrer':'noopener noreferrer';el.textContent=label;el.dataset.dcCta=channel;el.dataset.dcPlacement=placement;el.addEventListener('click',()=>{try{window.dispatchEvent(new CustomEvent('datecompass:cta-click',{detail:{placement,channel}}));if(typeof window.gtag==='function')window.gtag('event','dc_outbound_click',{cta_channel:channel,cta_placement:placement});}catch(_){/* do not interrupt navigation */}});return el};
 const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt)x.textContent=txt;return x};
 function panel(placement){const box=el('section','dc-convert');box.id='dc-conversion-'+placement;box.setAttribute('aria-label','デートの食事と体験の比較');box.hidden=true;
  box.append(el('span','dc-eyebrow','NEXT STEP / PLAN → COMPARE'),el('h3','','行程が決まったら、食事と体験を比較'));
  const intro=el('p','dc-context','');box.append(intro);
  const food=el('div','dc-food');food.append(el('p','','🍽 食事を決める：行程の最後に近い場所で、公開済みの比較記事を確認。'));
  const pickerLabel=el('label','','食事の希望を選ぶ（無料）');pickerLabel.htmlFor='dc-dining-picker-'+placement;
  const foodPick=el('select','dc-dining-picker');foodPick.id=pickerLabel.htmlFor;foodPick.setAttribute('aria-label','食事の希望');
  [['auto','おすすめを表示'],['lunch','ホテルランチ'],['tea','カフェ・アフタヌーンティー'],['anniversary','記念日ディナー']].forEach(([value,label])=>foodPick.add(new Option(label,value)));
  const foodHint=el('p','dc-disclaimer','');const foodlinks=el('div','dc-links');food.append(pickerLabel,foodPick,foodlinks,foodHint);box.append(food);
  const occasion=el('div','dc-occasion');occasion.append(el('p','','🎂 記念日・特別な夜なら、食事や宿泊の予約条件も確認。'));const occasionlinks=el('div','dc-links');occasion.append(occasionlinks);box.append(occasion);
  const rain=el('div','dc-rain');rain.append(el('p','','☔ 雨の日は、屋内施設の公式チケット条件を先に確認。'));const rainlinks=el('div','dc-links');rainlinks.append(a('東京・雨の日のチケット比較ガイド →',RAIN,false,placement,'rain-ticket-guide'));rain.append(rainlinks);box.append(rain);
  // A single intent-matched next step; never display unrelated Tokyo guides or duplicate affiliate ads.
  const next=el('div','dc-next-action');next.hidden=true;
  const nextLabel=el('label','','次に確認したい予約を選ぶ');nextLabel.htmlFor='dc-next-select-'+placement;
  const nextSelect=el('select','dc-next-select');nextSelect.id=nextLabel.htmlFor;
  const nextHint=el('p','dc-disclaimer','');const nextLinks=el('div','dc-links');
  next.append(el('p','dc-eyebrow','BOOKING PRIORITY'),nextLabel,nextSelect,nextLinks,nextHint);box.append(next);
  const paid=el('div','dc-paid');paid.append(el('p','','PR｜追加の体験・チケットを探す'));const paidlinks=el('div','dc-links');paidlinks.append(a('KKdayで周辺の体験を探す（PR）',A8.kkday,true,placement,'kkday'),a('Agodaで体験を探す（PR）',A8.agoda,true,placement,'agoda'));paid.append(paidlinks,el('p','dc-disclaimer','※一般的な体験予約サービスへの広告リンクです。選んだ施設の取扱い・空席・価格を保証しません。リンク先で施設名、料金、キャンセル条件を確認してください。'));box.append(paid);
  box.append(el('p','dc-disclaimer','※「おいしい時間。」へのリンクは編集記事への案内です。記事内には対応店舗のみ食べログPR予約リンクがあります。2名利用可否や予約可能なプランは各予約画面で確認してください。'));
  return {box,intro,food,foodlinks,foodPick,foodHint,paid,occasion,occasionlinks,rain,next,nextSelect,nextLinks,nextHint};
 }
 function update(view,names,areas,anniversary,night,complete,rainy=false){const finalArea=String(areas.at(-1)||'');const hasTokyo=/東京|新宿|池袋|渋谷|恵比寿|目黒|品川|上野|押上|浅草|丸の内|豊洲|六本木|銀座|新橋|お台場|原宿|表参道/.test(finalArea);const hasTicket=names.some(n=>TICKET.test(n));view.box.hidden=!complete;if(!complete)return;
  const foodKind=view.foodPick.value==='auto'?(anniversary||night?'anniversary':'lunch'):view.foodPick.value;
  view.food.hidden=!hasTokyo;view.foodlinks.replaceChildren();
  const dining={anniversary:['東京の記念日ディナー7店を比較 →','記念日プランは2人の総額・特典・予約期限を確認。'],lunch:['東京のホテルランチ32プランを比較 →','32プランの比較記事です。エリアと予算で絞り込めます。'],tea:['東京の秋アフタヌーンティー7ホテルを比較 →','季節限定の2026年10〜11月プランです。希望日が提供期間内か必ず確認してください。']}[foodKind];
  if(hasTokyo)view.foodlinks.append(a(dining[0],LINKS[foodKind],false,view.box.id,'gourmet-'+foodKind));
  view.foodHint.textContent=hasTokyo?dining[1]+' 記事の掲載店舗が最終スポット付近にあるとは限りません。記事内でエリア・2名条件・空席・最終料金を確認してください。':'最終スポットが東京以外のため、東京の飲食記事は表示しません。';
  const special=hasTokyo&&(anniversary||(night&&names.some(n=>/(夜景|タワー|展望|ホテル|SKY|スカイ)/i.test(n))));
  view.occasion.hidden=!special;view.occasionlinks.replaceChildren();
  if(special){if(anniversary)view.occasionlinks.append(a('誕生日デートの予約順と予算を計算 →',BIRTHDAY,false,view.box.id,'birthday-guide'));view.occasionlinks.append(a('記念日デートの予約ガイド →',ANNIVERSARY,false,view.box.id,'anniversary-guide'));view.occasionlinks.append(a('記念日に泊まれる宿を比較 →',STAY,false,view.box.id,'stay-anniversary'));}
  view.rain.hidden=!(rainy&&hasTokyo&&hasTicket);
  // Only show intent choices backed by a contextually relevant published comparison or guide.
  const choices=[];
  if(hasTokyo)choices.push(['food','🍽 食事の比較を先に進める',LINKS[foodKind],'東京の比較記事です。エリア・2名条件・料金・空席は各予約画面で確認。']);
  if(hasTicket)choices.push(['ticket','🎟 体験チケットの確認方法を見る',rainy&&hasTokyo?RAIN:'https://goonyogunyo-prog.github.io/date-compass/date-admission-guide.html','施設の直接予約ではありません。公式案内で取扱い・日時指定・キャンセル条件を確認。']);
  if(special)choices.push(['stay','🏨 記念日の宿泊も比較する',STAY,'全国の宿泊候補を含みます。希望地域・空室・料金・特典を必ず絞り込んで確認。']);
  const selected=view.nextSelect.value;
  view.nextSelect.replaceChildren();
  choices.forEach(([key,label])=>view.nextSelect.add(new Option(label,key)));
  if(choices.some(c=>c[0]===selected))view.nextSelect.value=selected;
  const chosen=choices.find(c=>c[0]===view.nextSelect.value);
  view.next.hidden=!chosen;view.nextLinks.replaceChildren();
  if(chosen){view.nextLinks.append(a('選んだ予約の比較・確認へ進む →',chosen[2],false,view.box.id,'priority-'+chosen[0]));view.nextHint.textContent=chosen[3]+' ※リンク先の掲載情報・提供期間を確認してください。';}
  view.rain.hidden=!(rainy&&hasTokyo&&hasTicket);
  view.paid.hidden=!hasTicket;
  view.intro.textContent=(hasTokyo?'最終スポットが東京のため、食事比較を案内。':'最終スポットのエリアに対応する食事特集はまだありません。')+(hasTicket?' チケットが必要そうな施設を含むため、体験サービスの検索先も表示します。':' 今回は街歩き等の候補が中心のため、体験広告は表示しません。');
 }
 function gacha(){const root=document.getElementById('result'),steps=document.getElementById('resultSteps');if(!root||!steps)return;const view=panel('gacha');const old=[...root.querySelectorAll('.note')].find(x=>x.textContent.includes('PR｜プランが決まったら体験を探す'));
  if(old)old.before(view.box);else root.append(view.box);
  const refresh=()=>{const names=[...steps.querySelectorAll('li strong')].map(x=>x.textContent.trim());const area=document.getElementById('resultMeta')?.textContent||'';const relation=document.getElementById('relation')?.value;const rainy=document.getElementById('weather')?.value==='rain';const time=document.getElementById('startTime')?.value||'';const night=/16|17|18|night/.test(time);update(view,names,[area],relation==='anniversary',night,names.length===3,rainy);
    // The page already contains the approved A8 links: keep only this original pair, never duplicate it.
    if(old){old.hidden=names.length!==3||!names.some(n=>TICKET.test(n));const strong=old.querySelector('strong');if(strong)strong.textContent='PR｜このプランに追加する体験を比較';}
    view.paid.remove(); // approved paid links remain in the original gacha PR box only
  };
  const ob=new MutationObserver(refresh);ob.observe(steps,{childList:true,subtree:true});for(const id of ['relation','startTime','weather'])document.getElementById(id)?.addEventListener('change',refresh);view.foodPick.addEventListener('change',refresh);view.nextSelect.addEventListener('change',refresh);refresh();
 }
 function planner(){const picked=document.getElementById('picked'),total=document.getElementById('total');if(!picked||!total)return;const view=panel('planner');total.after(view.box);
  const refresh=()=>{const lis=[...picked.querySelectorAll('li')];const names=lis.map(li=>li.querySelector('strong')?.textContent||'').filter(Boolean);const areas=lis.map(li=>li.querySelector('small')?.textContent||'');const night=document.getElementById('start')?.value==='16';update(view,names,areas,false,night,names.length===3)};
  const ob=new MutationObserver(refresh);ob.observe(picked,{childList:true,subtree:true});document.getElementById('start')?.addEventListener('change',refresh);view.foodPick.addEventListener('change',refresh);view.nextSelect.addEventListener('change',refresh);refresh();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{gacha();planner()},{once:true});else{gacha();planner()}
})();
