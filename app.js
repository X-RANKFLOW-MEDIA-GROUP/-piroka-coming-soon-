const key='piroka-waitlist-joined';
const legacyKey='piroka-waitlist-id';
const form=document.getElementById('waitlist-form');
const wrap=document.getElementById('form-wrap');
const email=document.getElementById('email');
const button=document.getElementById('submit-btn');
const message=document.getElementById('form-message');
const valid=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)&&v.length<=254;
function joined(){wrap.innerHTML='<div class="joined-card" role="status"><span class="joined-check">✓</span><div><strong>You’re on the list.</strong><span>Early access updates are on the way.</span></div></div>'}
if(localStorage.getItem(key)==='1'||localStorage.getItem(legacyKey)){
  localStorage.removeItem(legacyKey);
  localStorage.setItem(key,'1');
  joined();
}
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const v=email.value.trim().toLowerCase();
  message.textContent='';
  if(!valid(v)){message.textContent='Enter a valid email address.';return}
  button.disabled=true;
  button.textContent='JOINING…';
  try{
    const r=await fetch('/api/waitlist',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({email:v})
    });
    const d=await r.json();
    if(!r.ok||d.joined!==true)throw new Error();
    localStorage.setItem(key,'1');
    joined();
  }catch{
    message.textContent='Something went wrong. Please try again.';
    button.disabled=false;
    button.textContent='GET EARLY ACCESS';
  }
});
