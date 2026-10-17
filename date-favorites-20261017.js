(()=>{'use strict';
const KEY='datecompass-favorite-spots-v1',LIMIT=50;
const cards=[...document.querySelectorAll('.spot-card')],grid=document.getElementById('spotGrid'),search=document.getElementById('searchText');
if(!cards.length||!grid||!search)return;
const count=document.getElementById('resultCount'),head=document.querySelector('.result-head');
const toolbar=document.createElement('div');toolbar.className='dc-fav-toolbar';
const toggle=document.createElement('button');toggle.type='button';toggle.className='dc-fav-toggle';toggle.setAttribute('aria-pressed','false');
const note=document.createElement('span');note.className='dc-fav-note';note.setAttribute('aria-live','polite');
const planner=document.createElement('a');planner.href='date-three-spot-planner.html';planner.textContent='保存した候補で3スポットを組む →';planner.style.cssText='color:#234b65;font-weight:800;font-size:.85rem';
toolbar.append(toggle,note,planner);head.insertAdjacentElement('afterend',toolbar);
function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return new Set(Array.isArray(v)?v.filter(x=>typeof x==='string').slice(0,LIMIT):[])}catch(e){return new Set()}}
let favorites=read();window.dateCompassFavoriteIds=favorites;window.dateCompassFavoritesOnly=false;
function refresh(){toggle.textContent=`♥ お気に入りだけ表示（${favorites.size}件）`;note.textContent='お気に入りはこの端末に保存（最大50件）。';for(const card of cards){const btn=card.querySelector('.dc-fav-btn');if(!btn)continue;const saved=favorites.has(card.dataset.spotId);btn.setAttribute('aria-pressed',String(saved));btn.textContent=saved?'♥ 保存済み':'♡ 保存する';}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify([...favorites]));return true}catch(e){note.textContent='端末への保存ができません。ブラウザ設定をご確認ください。';return false}}
function rerender(){search.dispatchEvent(new Event('input',{bubbles:true}));}
fetch('spots-data.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(data=>{
 const byKey=new Map(data.map(s=>[`${s.name}|${s.prefecture}|${s.area}`,s]));
 for(const card of cards){const name=card.querySelector('h3')?.textContent?.trim(),key=`${name}|${card.dataset.pref}|${card.dataset.area}`,spot=byKey.get(key);if(!spot)continue;
 card.dataset.spotId=spot.id;const btn=document.createElement('button');btn.type='button';btn.className='dc-fav-btn';
 if(spot.admission?.type==='unavailable'){btn.disabled=true;btn.textContent='休館中';btn.title='休館中の施設はお気に入りに追加できません';}
 else btn.addEventListener('click',()=>{const before=new Set(favorites);if(favorites.has(spot.id))favorites.delete(spot.id);else if(favorites.size>=LIMIT){note.textContent='お気に入りは最大50件です。保存済みを外してから追加してください。';return;}else favorites.add(spot.id);if(!persist()){favorites=before;window.dateCompassFavoriteIds=favorites;return;}refresh();rerender()});
 card.querySelector('.spot-actions')?.append(btn);
 }
 const valid=new Set(data.filter(s=>s.admission?.type!=='unavailable').map(s=>s.id));favorites=new Set([...favorites].filter(id=>valid.has(id)));window.dateCompassFavoriteIds=favorites;
 toggle.addEventListener('click',()=>{window.dateCompassFavoritesOnly=!window.dateCompassFavoritesOnly;toggle.setAttribute('aria-pressed',String(window.dateCompassFavoritesOnly));refresh();rerender()});
 window.addEventListener('storage',e=>{if(e.key!==KEY)return;favorites=read();window.dateCompassFavoriteIds=favorites;refresh();rerender()});
 refresh();
 }).catch(()=>{note.textContent='お気に入り機能の読み込みに失敗しました。図鑑の通常検索は利用できます。';toggle.disabled=true;});
})();