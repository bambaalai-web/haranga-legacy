(async function(){
const parts=location.pathname.replace(/\/+$/,'').split('/');
const edition=parts[parts.length-1].match(/^\d{4}$/)?parts[parts.length-1]:null;
const elEdition=document.querySelector('[data-edition]');
const elOwner=document.querySelector('[data-owner]');
const elClaim=document.querySelector('[data-claim]');
const elForm=document.querySelector('#claim-form');
const elName=document.querySelector('#owner-name');
const elStatus=document.querySelector('#status');
if(elEdition)elEdition.textContent=edition??'—';
async function refresh(){
 const r=await fetch(`/api/edition/${edition}`,{headers:{'accept':'application/json'}});
 const data=await r.json();
 if(data.owner){elOwner.textContent=data.owner;elClaim.hidden=true;elStatus.innerHTML=`<span class="lock">Locked</span> · Claimed at ${new Date(data.claimed_at).toLocaleString()}`;}
 else{elOwner.textContent='(unclaimed)';elClaim.hidden=false;elStatus.textContent='First claim will lock this edition.';}
}
if(elForm){elForm.addEventListener('submit',async e=>{
 e.preventDefault();
 const name=(elName.value||'').trim();
 if(!name){alert('Нэрээ оруулна уу');return;}
 elForm.querySelector('button').disabled=true;
 const r=await fetch(`/api/edition/${edition}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name})});
 if(r.ok){await refresh();}else{const j=await r.json().catch(()=>({}));alert(j.error==='already_claimed'?'Энэ дугаар аль хэдийн эзэмшигчтэй.':'Алдаа.');}
 elForm.querySelector('button').disabled=false;
});}
await refresh();
})();