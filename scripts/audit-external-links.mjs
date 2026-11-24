#!/usr/bin/env node
/** OPT-IN only. Probe public external links from portfolio pages (no credentials). */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pages=['index.html','en/index.html','mishwar-case-study.html','demo/mishwar-tour.html'];
const urls=new Set();
for(const page of pages){
  const html=readFileSync(resolve(root,page),'utf8');
  for(const m of html.matchAll(/<a\b[^>]*?href\s*=\s*(["'])(.*?)\1/gi)){
    if(/^https?:\/\//i.test(m[2])) urls.add(m[2].replaceAll('&amp;','&'));
  }
}
for (const u of [
 'https://abdullah-taha07.github.io/portfolio/',
 'https://abdullah-taha07.github.io/portfolio/en/',
 'https://www.linkedin.com/in/abdalla-mohamed07/'
]) urls.add(u);
const targets=[...urls].sort();
const results=[];
let next=0;
async function check(){
  while(next<targets.length){
    const url=targets[next++];
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),9000);
    try {
      // GET is more compatible than HEAD. Read headers only and immediately stop the body.
      const res=await fetch(url,{redirect:'follow',signal:controller.signal,headers:{'User-Agent':'Mozilla/5.0 PortfolioHiringLinkCheck/1.0'}});
      const status=res.status;
      await res.body?.cancel().catch(()=>{});
      const state=status>=200&&status<400?'RESPONDED':(status===401||status===403||status===429)?'RESTRICTED_OR_BLOCKED':status===404?'CHECK_404':'CHECK_HTTP_ERROR';
      results.push({state,status,url,finalUrl:res.url});
    } catch(e) { results.push({state:'NOT_VERIFIED',status:null,url,error:String(e.message).slice(0,130)}); }
    finally {clearTimeout(timer);}
  }
}
await Promise.all(Array.from({length:Math.min(4,targets.length)},check));
for(const r of results.sort((a,b)=>a.url.localeCompare(b.url)))console.log(`${r.state.padEnd(23)} ${String(r.status??'---').padEnd(3)} ${r.url}${r.finalUrl&&r.finalUrl!==r.url?' -> '+r.finalUrl:''}${r.error?' | '+r.error:''}`);
console.log(`EXTERNAL_LINK_REVIEW ${results.length} URLs probed. 403, 429, login redirects or network errors do not prove a link is broken. Test logged-in flows manually.`);
// Diagnostic only: outbound sites and anti-bot rules vary. Never gate a release on this probe.
