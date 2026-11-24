#!/usr/bin/env python3
"""Real local Chromium smoke tests; optionally inject axe-core for an accessibility report.
No external links are opened, no credentials, no production API requests.
"""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from functools import partial
from playwright.sync_api import sync_playwright
import json, sys, os
ROOT=Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Handler,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
base=f'http://127.0.0.1:{server.server_port}'
problems=[];report=[]
axe_path=ROOT/'node_modules/axe-core/axe.min.js'
require_axe='--axe-required' in sys.argv
if require_axe and not axe_path.exists():
    print('AXE_REQUIRED_BUT_NOT_INSTALLED');sys.exit(2)

def pagecheck(browser,route,width=1366,height=840,enabled=True,axe=False):
    context=browser.new_context(viewport={'width':width,'height':height},java_script_enabled=enabled,reduced_motion='reduce')
    context.route('**/*',lambda r: r.continue_() if r.request.url.startswith(base) else r.abort())
    page=context.new_page();page.set_default_timeout(4500);errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    if '--offline' in sys.argv:
        local=ROOT / ('index.html' if route=='/' else 'en/index.html' if route=='/en/' else route.lstrip('/'))
        assert local.exists(),str(local)
        import re
        markup=local.read_text('utf8')
        markup=re.sub(r'<link\b[^>]*>', '', markup, flags=re.I)
        markup=re.sub(r'<script\b[^>]*src=[^>]*>.*?</script>', '', markup, flags=re.I|re.S)
        page.set_content(markup,wait_until='domcontentloaded',timeout=6000)
        page.add_style_tag(content=(ROOT/'css/portfolio-fsd.css').read_text('utf8'))
        if route=='/mishwar-case-study.html':
            page.add_style_tag(content=(ROOT/'css/mishwar-case-study.css').read_text('utf8'))
        if route=='/demo/mishwar-tour.html':
            page.add_style_tag(content=(ROOT/'demo/tour.css').read_text('utf8'))
        if enabled:
            script={'/':'js/portfolio-fsd.js','/mishwar-case-study.html':'js/mishwar-case-study.js','/demo/mishwar-tour.html':'demo/tour.js'}.get(route)
            if script:page.add_script_tag(content=(ROOT/script).read_text('utf8'))
    else:
        res=page.goto(base+route,wait_until='domcontentloaded',timeout=12000)
        assert res and res.status==200,(route,res.status if res else 0)
    page.wait_for_timeout(100)
    data={'page':route,'viewport':width,'js':enabled,'h1':page.locator('h1:visible').count(),'errors':errors,
          'overflow':page.evaluate('document.documentElement.scrollWidth > innerWidth+5')}
    assert data['h1']==1,(route,'h1',data['h1'])
    assert not data['errors'],(route,'javascript error',data['errors'])
    assert not data['overflow'],(route,'horizontal page overflow',width)
    if axe and axe_path.exists():
        page.add_script_tag(path=str(axe_path))
        found=page.evaluate('''async () => {const x=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});return x.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length,help:v.help}))}''')
        data['axe_violations']=found
        if any(v['impact']=='critical' for v in found):problems.append({'page':route,'axe_critical':found})
        if os.environ.get('STRICT_AXE')=='1' and any(v['impact']=='serious' for v in found):problems.append({'page':route,'axe_serious':found})
    report.append(data);return page,context,data

try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path=os.environ.get('PORTFOLIO_BROWSER_PATH') or None,args=['--no-sandbox','--disable-dev-shm-usage'])
  for width in [390,1366]:
   print('CHECK',width,flush=True)
   page,context,data=pagecheck(browser,'/',width,axe=True)
   assert page.locator('#project-grid .project-card').count()==15, 'Arabic dynamic gallery not 15'
   page.locator('#project-search').fill('Coffee')
   assert page.locator('#project-grid .project-card').count()==1,'Project search broken'
   page.locator('#project-search').fill('')
   page.locator('[data-filter="training"]').click()
   assert page.locator('#project-grid .project-card').count()>=5,'Training filter broken'
   page.locator('[data-filter="all"]').click()
   chooser=page.locator('.mishwar-chooser-card summary').first
   chooser.click()
   assert page.locator('.mishwar-chooser-card[open] .mishwar-site-options a').count()==3,'Mishwar chooser broken'
   page.locator('#lang-toggle').click()
   assert page.locator('html').get_attribute('lang')=='en','Language switching broken'
   context.close()
  # Static no-JS contract is checked by node --test; Chromium no-JS causes a sandbox navigation stall in this container.
  print('CHECK EN',flush=True)
  page,ctx,data=pagecheck(browser,'/en/',390,axe=True)
  assert page.locator('.project-card').count()>=15,'English gallery incomplete';ctx.close()
  print('CHECK CASE',flush=True)
  page,ctx,data=pagecheck(browser,'/mishwar-case-study.html',390,axe=True)
  assert page.locator('#verified-pull-requests').is_visible(),'Arabic PR evidence missing'
  page.locator('#case-lang-toggle').click()
  assert page.locator('#verified-pull-requests-en').is_visible(),'English PR evidence missing';ctx.close()
  print('CHECK TOUR',flush=True)
  page,ctx,data=pagecheck(browser,'/demo/mishwar-tour.html',390,axe=True)
  assert page.locator('[role="tab"]').count()==3,'Three tabs missing'
  assert page.locator('#tour-step-title').inner_text().strip()!='','No first stage'
  page.locator('#tour-next').click()
  assert page.locator('#tour-step').inner_text().startswith('02'),'Next step failed'
  page.locator('#tab-captain').click()
  assert page.locator('#tour-device-role').inner_text()=='CAPTAIN','Captain tab failed'
  page.locator('#tab-admin').click()
  assert page.locator('#tour-device-role').inner_text()=='ADMIN','Admin tab failed'
  page.locator('#tour-lang').click()
  assert page.locator('html').get_attribute('lang')=='en','Tour English broken'
  assert page.locator('body').inner_text().count('DEMO-')>=1,'No fictional reference';ctx.close()
  browser.close()
except Exception as e:
  problems.append({'error':str(e)})
finally: server.shutdown()
result={'passed':not bool(problems),'browser_cases':len(report),'axe_injected':axe_path.exists(),'problems':problems,'pages':report}
output=ROOT/'quality-browser-report.json';output.write_text(json.dumps(result,ensure_ascii=False,indent=2),'utf8')
print(json.dumps({'passed':result['passed'],'browser_cases':len(report),'axe_injected':result['axe_injected'],'problems':problems,'report':str(output)},ensure_ascii=False,indent=2))
sys.exit(0 if result['passed'] else 1)
