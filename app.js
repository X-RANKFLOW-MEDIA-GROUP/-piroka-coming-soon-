const key='piroka-waitlist-id';
const form=document.getElementById('waitlist-form');
const wrap=document.getElementById('form-wrap');
const email=document.getElementById('email');
const button=document.getElementById('submit-btn');
const message=document.getElementById('form-message');
const valid=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function joined(value){wrap.innerHTML=`<div class="joined-card" role="status"><span class="joined-check">✓</span><div><strong>You’re on the list.</strong><span>${value?`Early access updates will go to ${value}.`:'Early access updates are on the way.'}</span></div></div>`}
const saved=localStorage.getItem(key);
if(saved){fetch(`/api/waitlist/${encodeURIComponent(saved)}`).then(r=>r.ok?r.json():Promise.reject()).then(d=>{if(d&&d.joined)joined(d.email||'')}).catch(()=>localStorage.removeItem(key))}
form.addEventListener('submit',async e=>{e.preventDefault();const v=email.value.trim().toLowerCase();message.textContent='';if(!valid(v)){message.textContent='Enter a valid email address.';return}button.disabled=true;button.textContent='JOINING…';try{const r=await fetch('/api/waitlist',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:v})});const d=await r.json();if(!r.ok||!d.id)throw new Error();localStorage.setItem(key,String(d.id));joined(v)}catch{message.textContent='Something went wrong. Please try again.';button.disabled=false;button.textContent='GET EARLY ACCESS'}});