/* Date Compass -> おいしい時間。 2026-10-17
   All destinations were checked in the gourmet-guide GitHub main tree on 2026-10-17.
   Cross-site editorial navigation, not an affiliate tracking link.
   Does not modify existing gacha routing, fees, ads, or localStorage.
*/
(()=>{'use strict';
const ROOT='https://goonyogunyo-prog.github.io/gourmet-guide/';
const articles={
  anniversary:{path:'tokyo-anniversary-dinner-2026.html',title:'東京の記念日ディナー7店を比較',detail:'2人予算・記念日特典・予約条件をチェック'},
  lunch:{path:'tokyo-hotel-lunch-2026.html',title:'東京のホテルランチ23店を比較',detail:'税・サービス料込みの2人予算を確認'},
  tea:{path:'tokyo-autumn-afternoon-tea-2026.html',title:'東京の秋アフタヌーンティーを比較',detail:'提供期間・予約条件を確認（季節限定）'},
  shinjuku:{path:'shinjuku-student-nomihodai.html',title:'新宿の低予算・食べ飲み放題を比較',detail:'複数人向けコースも含むため2人利用条件を確認'},
  shinjukuGroup:{path:'shinjuku-nomihodai-course.html',title:'新宿の飲み放題コースを比較',detail:'宴会向けプラン中心。2人で使えるか要確認'},
  ikebukuro:{path:'ikebukuro-nomihodai-course-2026.html',title:'池袋の飲み放題コースを比較',detail:'宴会向けプラン中心。2人で使えるか要確認'},
  all:{path:'articles.html',title:'おいしい時間。のグルメ記事一覧',detail:'東京中心の公開済み記事から食事先を探す'}
};
const tokyoAreas=new Set(['shinjuku','ikebukuro','marunouchi','ueno','oshiage','toyosu','odaiba','asakusa','roppongi','shinagawa','tennozu','tachikawa','kichijoji','kashiwanoha-tokyo']);
function init(){
 const result=document.getElementById('result');
 const title=document.getElementById('resultTitle');
 if(!result||!title)return;
 const box=document.createElement('section');box.id='dc-gourmet-bridge';
 box.setAttribute('aria-label','食事プランの参考記事');
 box.style.cssText='margin:22px 0 4px;padding:18px;border:1px solid #e4c8c9;border-radius:16px;background:#fff;box-shadow:0 4px 18px #401d210b';
 const heading=document.createElement('h3');heading.textContent='🍽 食事も決める｜おいしい時間。';heading.style.margin='0 0 6px';
 const intro=document.createElement('p');intro.style.cssText='margin:6px 0 12px;color:#55484a';
 const links=document.createElement('div');links.style.cssText='display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:10px';
 const note=document.createElement('p');note.style.cssText='font-size:.84rem;color:#625759;margin:12px 0 0';
 const own=document.createElement('a');own.href='date-dining-guide.html';own.textContent='食事の決め方・エリア別の対応状況を見る →';own.style.cssText='display:inline-block;margin-top:12px;font-weight:700';
 box.append(heading,intro,links,note,own);result.append(box);
 function update(){
   if(result.hidden||!title.textContent.trim()){box.hidden=true;return;}
   box.hidden=false;
   const routeId=new URLSearchParams(location.search).get('route');
   const route=(typeof current!=='undefined'&&current)||((typeof routes!=='undefined'&&Array.isArray(routes))?routes.find(x=>x.id===routeId):null);
   const selectedArea=document.getElementById('area')?.value||'';
   // Use the actual generated route: the user's requested area may be 'any' or a fallback.
   const area=route?.area||selectedArea;
   const relation=document.getElementById('relation')?.value||'';
   const mood=document.getElementById('mood')?.value||'';
   const start=document.getElementById('startTime')?.value||'';
   const evening=start==='16:00'||(route?.steps?.[0]?.[0]||'')>='16:00';
   const tokyo=tokyoAreas.has(area);
   let keys=[];
   if(relation==='anniversary'||mood==='romantic')keys.push('anniversary');
   if(area==='shinjuku')keys.push('shinjuku','shinjukuGroup');
   else if(area==='ikebukuro')keys.push('ikebukuro');
   if(tokyo){if(!evening)keys.push('lunch','tea');else keys.push('anniversary');}
   keys.push('all');
   keys=[...new Set(keys)].slice(0,3);
   links.replaceChildren();
   for(const key of keys){const a=articles[key];const el=document.createElement('a');el.href=ROOT+a.path;el.target='_blank';el.rel='noopener noreferrer';el.style.cssText='display:block;padding:13px;border:1px solid #ecd6d7;border-radius:12px;background:#fff9fa;text-decoration:none;color:#693347';
     const strong=document.createElement('strong');strong.textContent=a.title+' ↗';strong.style.display='block';
     const small=document.createElement('small');small.textContent=a.detail;small.style.cssText='display:block;margin-top:5px;color:#5b5053;line-height:1.6';
     el.append(strong,small);links.append(el);}
   intro.textContent=area==='shinjuku'?'新宿の公開済みグルメ記事を優先表示。2人利用条件も確認しよう。':area==='ikebukuro'?'池袋の公開済み記事と東京都内の食事特集を案内。':tokyo?'このデートに合わせ、東京都内の記念日・ランチ・スイーツ特集を案内。':'このエリアに対応する飲食店特集はまだありません。以下は東京都内中心の参考記事です。';
   note.textContent='リンク先は姉妹サイトの編集記事です（このリンク自体は広告ではありません）。リンク先にはPR予約リンクを含む場合があります。飲食代はガチャの施設料金に含まれません。価格・予約条件・2人利用可否は店舗公式で確認してください。';
 }
 const observer=new MutationObserver(update);observer.observe(title,{childList:true,characterData:true,subtree:true});
 document.getElementById('gachaForm')?.addEventListener('submit',()=>setTimeout(update,0));
 for(const id of ['reroll','weatherFlip','duelCards','favoriteList'])document.getElementById(id)?.addEventListener('click',()=>setTimeout(update,0));
 update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
