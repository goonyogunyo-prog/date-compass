/* Date Compass | spot atlas contextual booking panel | 2026-10-17
 * General comparison links only; never asserts that an individual facility is bookable.
 */
(()=>{'use strict';
 const A8={kkday:'https://px.a8.net/svt/ejp?a8mat=4BEH56+3XP8AQ+52F8+60OXE',agoda:'https://px.a8.net/svt/ejp?a8mat=4BEH56+3VBHVM+4X1W+TS3OI'};
 const CATEGORY=/(水族館|動物園|美術|博物|科学館|プラネタリウム|展望|体験|映画|遊園地|演芸|工芸|施設見学)/;
 const CLOSED=/(現在全館休館中|休館中は訪問先に選ばず|訪問先として選ばないでください)/;
 const css=`
 .dc-spot-ticket-btn{display:block;margin-top:10px;border:1px solid #126653;background:#eef8f4;color:#17594d;border-radius:10px;min-height:44px;padding:9px 12px;font-weight:750;cursor:pointer;line-height:1.5;max-width:100%}
 .dc-spot-ticket-btn:hover,.dc-spot-ticket-btn:focus-visible{background:#dff4e9;outline-offset:3px}
 .dc-spot-ticket-panel{background:#f3fbf7;border:1px solid #b7d8ca;border-radius:14px;padding:14px;margin:12px 0 4px;max-width:100%;overflow-wrap:anywhere;color:#19483f}
 .dc-spot-ticket-panel[hidden]{display:none!important}.dc-spot-ticket-panel h4{margin:0 0 6px;font-size:1.04rem;line-height:1.5}
 .dc-spot-ticket-panel p{margin:6px 0;font-size:.85rem;line-height:1.65}.dc-spot-ticket-panel .dc-spot-ticket-pr{font-weight:800;color:#35685d;letter-spacing:.05em;font-size:.76rem}
 .dc-spot-ticket-panel .dc-spot-ticket-links{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:8px;margin:11px 0}
 .dc-spot-ticket-panel .dc-spot-ticket-links a{display:flex;align-items:center;justify-content:center;text-align:center;padding:10px 12px;min-height:46px;border-radius:10px;background:#126653;color:#fff!important;text-decoration:none!important;font-weight:750;font-size:.88rem;line-height:1.4}
 .dc-spot-ticket-panel .dc-spot-ticket-links a.dc-official{background:#fff;color:#17594d!important;border:1px solid #b5d9ca}
 .dc-spot-ticket-panel .dc-spot-ticket-close{background:transparent;border:0;text-decoration:underline;cursor:pointer;color:#17594d;padding:7px 4px;min-height:40px}
 @media(max-width:440px){.dc-spot-ticket-panel .dc-spot-ticket-links{grid-template-columns:1fr}.dc-spot-ticket-panel{padding:12px}}
 `;
 const style=document.createElement('style');style.id='dc-spot-ticket-style';style.textContent=css;document.head.append(style);
 const cards=[...document.querySelectorAll('#spotGrid .spot-card')];if(!cards.length)return;
 let selected=null;
 const panel=document.createElement('section');panel.id='dc-spot-ticket-panel';panel.className='dc-spot-ticket-panel';panel.hidden=true;panel.setAttribute('role','region');panel.setAttribute('aria-live','polite');panel.setAttribute('aria-label','体験予約サービスと公式情報の比較');
 const eyebrow=document.createElement('p');eyebrow.className='dc-spot-ticket-pr';eyebrow.textContent='PR / TICKET COMPARISON';
 const heading=document.createElement('h4');heading.id='dc-spot-ticket-title';
 const desc=document.createElement('p');desc.textContent='公式情報を確認してから、外部の体験予約サービスでも候補を比較できます。';
 const links=document.createElement('div');links.className='dc-spot-ticket-links';
 const caution=document.createElement('p');caution.textContent='※KKday・Agodaは一般的な体験予約サービスへの広告リンクです。この施設の掲載・空席・予約可否・料金を保証しません。施設名で検索し、公式情報・対象日・2名条件・キャンセル規定を確認してください。';
 const close=document.createElement('button');close.type='button';close.className='dc-spot-ticket-close';close.textContent='比較パネルを閉じる';
 panel.append(eyebrow,heading,desc,links,caution,close);
 function makeLink(label,href,channel,paid){const a=document.createElement('a');a.textContent=label;a.href=href;a.target='_blank';a.rel=paid?'nofollow sponsored noopener noreferrer':'noopener noreferrer';a.dataset.dcCta=channel;a.dataset.dcPlacement='spot-atlas-card';if(!paid)a.className='dc-official';a.addEventListener('click',()=>{try{window.dispatchEvent(new CustomEvent('datecompass:cta-click',{detail:{placement:'spot-atlas-card',channel}}));if(typeof window.gtag==='function')window.gtag('event','dc_outbound_click',{cta_channel:channel,cta_placement:'spot-atlas-card'});}catch(_){}});return a;}
 function hide(restoreFocus){if(!selected)return;const btn=selected.querySelector('.dc-spot-ticket-btn');if(btn){btn.setAttribute('aria-expanded','false');if(restoreFocus)btn.focus();}panel.hidden=true;selected=null;}
 close.addEventListener('click',()=>hide(true));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&selected&&!panel.hidden)hide(true)});
 let count=0;
 cards.forEach(card=>{const category=card.dataset.category||'';const title=card.querySelector('h3')?.textContent?.trim()||'';const info=card.querySelector('.spot-desc')?.textContent||'';
  if(!CATEGORY.test(category)||CLOSED.test(info))return;
  const actions=card.querySelector('.spot-actions');const official=actions?.querySelector('a[href]');if(!actions||!official)return;
  const button=document.createElement('button');button.type='button';button.className='dc-spot-ticket-btn';button.textContent='🎟 チケット・体験の探し方（PRあり）';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',panel.id);
  button.addEventListener('click',()=>{if(selected===card){hide(false);return;}hide(false);selected=card;button.setAttribute('aria-expanded','true');heading.textContent=title+'｜公式と体験サービスを比較';links.replaceChildren(makeLink('施設の公式案内を確認 ↗',official.href,'spot-official',false),makeLink('KKdayで体験を探す（PR） ↗',A8.kkday,'kkday',true),makeLink('Agodaで体験を探す（PR） ↗',A8.agoda,'agoda',true));actions.after(panel);panel.hidden=false;});
  actions.append(button);count++;
 });
 document.documentElement.dataset.dcSpotTicketEligible=String(count);
})();
