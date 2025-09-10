// Cloudflare Pages Function — Edition owner claim (LOCK on first claim)
// KV binding name: OWNERS

export async function onRequestGet(context){
  const {params,env}=context; const id=params.id;
  if(!/^\d{4}$/.test(id)) return new Response(JSON.stringify({error:'invalid id'}),{status:400,headers:cors()});
  const key=`edition:${id}`; const val=await env.OWNERS.get(key,{type:'json'});
  return json({id, owner: val?.owner ?? null, claimed_at: val?.claimed_at ?? null});
}
export async function onRequestPost(context){
  const {request,params,env}=context; const id=params.id;
  if(!/^\d{4}$/.test(id)) return new Response(JSON.stringify({error:'invalid id'}),{status:400,headers:cors()});
  const key=`edition:${id}`; const existing=await env.OWNERS.get(key,{type:'json'});
  if(existing?.owner) return json({ok:false,error:'already_claimed',owner:existing.owner,claimed_at:existing.claimed_at},409);
  const body=await request.json().catch(()=>({})); const name=(body?.name||'').toString().trim();
  if(!name) return json({ok:false,error:'missing_name'},400);
  const record={owner:name, claimed_at:new Date().toISOString()};
  await env.OWNERS.put(key, JSON.stringify(record));
  return json({ok:true, id, ...record});
}
function cors(){return {'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*','access-control-allow-methods':'GET,POST,OPTIONS'};}
function json(obj,status=200){return new Response(JSON.stringify(obj),{status,headers:cors()});}
export function onRequestOptions(){return new Response(null,{status:204,headers:cors()});}