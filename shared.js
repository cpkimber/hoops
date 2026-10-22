(function(){
const P=new URLSearchParams(location.search),MK=/^[*-]\s+/;
const DEF={game:'hoops',balls:2,energy:100,moveCost:1,swapCost:3};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const parse=t=>(t||'').split(/\n\s*\n/).map(b=>{const L=b.trim().split('\n').map(s=>s.trim()).filter(Boolean);return{q:L.filter(l=>!MK.test(l)).join(' '),ans:L.filter(l=>MK.test(l)).map(l=>({t:l.replace(MK,''),ok:l[0]==='*'}))}}).filter(o=>o.q&&o.ans.length>=2&&o.ans.filter(a=>a.ok).length===1);
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e};
const st=document.createElement('style');
st.textContent=`.qz-ov{position:absolute;inset:0;background:rgba(12,12,20,.93);border-radius:12px;display:flex;align-items:center;justify-content:center;padding:14px;overflow:auto;z-index:5}
.qz-box{width:100%;max-width:520px;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.qz-h{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#ffb27a;margin-bottom:6px}
.qz-box h3{margin:0 0 12px;font-size:19px;line-height:1.3}
.qz-opts{display:grid;gap:8px}
.qz-box button{width:100%;max-width:none;flex:none;font:600 16px system-ui,sans-serif;text-align:left;padding:12px 14px;background:#2c2c36;color:#fff;border:0;border-radius:10px;cursor:pointer}
.qz-box button.ok{background:#16a34a}.qz-box button.no{background:#dc2626}
.qz-box button.qz-x{margin-top:10px;background:transparent;text-align:center;color:#aaa;text-decoration:underline}
.qz-fb{margin-top:10px;font-weight:600;min-height:1.4em}`;
document.head.append(st);
let QS=[],deck=[];
const QZ={P,parse,DEF,list:[],cfg:null,
async load(){
  let list=[];
  try{const r=await fetch('classes/index.json',{cache:'no-cache'});if(r.ok)list=await r.json()}catch(e){}
  QZ.list=list;
  const id=P.get('class');
  let c=list.find(x=>x.id===id)||(!id&&list.length===1?list[0]:null),text=null;
  if(P.has('preview')&&id){try{const d=JSON.parse(localStorage.getItem('qzDraft:'+id));if(d){c=Object.assign({id},c||{},d.cfg);text=d.text}}catch(e){}}
  if(!c)return null;
  if(text===null){try{const r=await fetch('classes/'+encodeURIComponent(c.id)+'.txt',{cache:'no-cache'});if(r.ok)text=await r.text()}catch(e){}}
  QS=parse(text);deck=[];
  const cfg=Object.assign({},DEF,c);
  ['balls','energy','moveCost','swapCost'].forEach(k=>cfg[k]=+cfg[k]);
  if(cfg.game!=='panels')cfg.game='hoops';
  return QZ.cfg=cfg;
},
ask(host,o){
  if(!QS.length){o.onCorrect();return}
  if(!deck.length)deck=shuf(QS.map((_,i)=>i));
  const q=QS[deck.pop()],sh=shuf(q.ans);
  const ov=el('div','qz-ov'),box=el('div','qz-box'),opts=el('div','qz-opts'),fb=el('div','qz-fb');
  box.append(el('div','qz-h',o.head||''),el('h3','',q.q),opts,fb);
  let done=false;
  function close(){document.removeEventListener('keydown',key,true);ov.remove()}
  function cancel(){if(done)return;done=true;close();if(o.onCancel)o.onCancel()}
  function key(e){
    const n=+e.key;if(n>=1&&n<=sh.length)opts.children[n-1].click();
    if(e.code==='Escape'&&o.cancelable)cancel();
    if(e.code==='Space'||e.code.startsWith('Arrow'))e.preventDefault();
    e.stopPropagation();
  }
  sh.forEach((a,i)=>{const b=el('button','',(i+1)+'.  '+a.t);b.onclick=()=>{
    if(done)return;done=true;
    [...opts.children].forEach((x,j)=>{if(sh[j].ok)x.classList.add('ok');else if(x===b)x.classList.add('no')});
    if(a.ok){fb.textContent='Correct!';setTimeout(()=>{close();o.onCorrect()},900)}
    else{fb.textContent='Not quite. The right answer is highlighted.';setTimeout(()=>{close();QZ.ask(host,o)},1800)}
  };opts.append(b)});
  if(o.cancelable){const x=el('button','qz-x','Not now');x.onclick=cancel;box.append(x)}
  ov.append(box);host.append(ov);document.addEventListener('keydown',key,true);
}};
window.QZ=QZ;
})();
