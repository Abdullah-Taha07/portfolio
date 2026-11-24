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
    context=browser.new_context(viewport={'width':width,'height':height},java_script_enabled=enabled,reduced_motion='reduce',locale='ar-SA')
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
            script={'/':'js/portfolio-fsd.js','/mishwar-case-study.html':'js/mishwar-case-study.js','/demo/mishwar-tour.html':'demo/tour.js','/en/':'js/portfolio-nav-en.js'}.get(route)
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

def assert_mobile_photo_layout(page, width, locale):
    issues=page.evaluate('''() => {
      const names=['#about','.about-layout','.profile-card','.profile-image-wrap',
                   '.profile-card-foot','.about-copy','.featured-architecture',
                   '.hero-visual','.system-window'];
      return names.map(name=>{
        const el=document.querySelector(name);if(!el)return null;
        const r=el.getBoundingClientRect();
        return {name,left:r.left,right:r.right,width:r.width,viewport:innerWidth};
      }).filter(x=>x && (x.left < -1 || x.right > innerWidth+1));
    }''')
    assert not issues, f'{locale} mobile visual/text escapes viewport at {width}px: {issues}'
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path=os.environ.get('PORTFOLIO_BROWSER_PATH') or None,args=['--no-sandbox','--disable-dev-shm-usage'])
  for width in [320,360,390,768,1024,1366]:
   print('CHECK',width,flush=True)
   page,context,data=pagecheck(browser,'/',width,axe=True)
   assert page.locator('#project-grid .project-card').count()==15, 'Arabic dynamic gallery not 15'
   if width <= 390:assert_mobile_photo_layout(page,width,'ar')
   page.locator('#project-search').fill('مشوار')
   assert page.locator('#project-grid .project-card').count()==1,'Arabic Mishwar search broken'
   page.locator('#project-search').fill('')
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
   page.wait_for_url('**/en/*')
   assert page.locator('html').get_attribute('lang')=='en','English page navigation broken'
   assert 'شاهد الفكرة بدون حسابات حقيقية' not in page.locator('body').inner_text(),'Arabic-only content remains on English page'
   page.goto(base+'/?lang=ar',wait_until='domcontentloaded',timeout=12000)
   assert page.locator('html').get_attribute('lang')=='ar','Return to explicit Arabic failed'
   page.evaluate("window.location.hash = '#contact'")
   page.wait_for_timeout(180)
   up=page.locator('#back-to-top')
   assert up.is_visible(), 'Floating back to top should appear after scrolling'
   up.click()
   page.wait_for_timeout(140)
   assert page.evaluate('window.scrollY')<12,'Floating Back to top did not reach document start'
   if page.evaluate("/^https?:$/.test(location.protocol)"):
    assert page.evaluate('window.location.hash')=='','Floating Back to top left stale anchor'
   page.locator('.site-footer a[href="#top"]').click()
   page.wait_for_timeout(140)
   assert page.evaluate('window.scrollY')<12,'Arabic footer Back to top did not reach document start'
   context.close()
  # Static no-JS contract is checked by node --test; Chromium no-JS causes a sandbox navigation stall in this container.
  # Device locale and saved choice are checked in a real browser, not only in source tests.
  for device_locale, expected in [('ar-SA','ar'),('en-US','en'),('fr-FR','en')]:
   language_ctx=browser.new_context(locale=device_locale,viewport={'width':390,'height':840})
   language_ctx.route('**/*',lambda r: r.continue_() if r.request.url.startswith(base) else r.abort())
   language_page=language_ctx.new_page()
   language_page.goto(base+'/',wait_until='domcontentloaded',timeout=12000)
   assert language_page.locator('html').get_attribute('lang')==expected,(device_locale,'default language')
   assert language_page.locator('html').get_attribute('data-theme')=='dark',(device_locale,'default theme')
   language_ctx.close()
  pref_ctx=browser.new_context(locale='en-US',viewport={'width':390,'height':840})
  pref_ctx.route('**/*',lambda r: r.continue_() if r.request.url.startswith(base) else r.abort())
  pref_ctx.add_init_script("if(location.protocol.startsWith('http')){localStorage.setItem('at-portfolio-lang','ar');localStorage.setItem('at-portfolio-theme','light');}")
  pref_page=pref_ctx.new_page()
  pref_page.goto(base+'/',wait_until='domcontentloaded',timeout=12000)
  assert pref_page.locator('html').get_attribute('lang')=='ar','Manual locale preference ignored'
  assert pref_page.locator('html').get_attribute('data-theme')=='light','Manual light theme ignored'
  pref_ctx.close()
  print('CHECK EN',flush=True)
  page,ctx,data=pagecheck(browser,'/en/',390,axe=True)
  assert page.locator('.project-card').count()>=15,'English gallery incomplete'
  assert page.locator('html').get_attribute('data-theme')=='dark','English page did not default to dark'
  theme_button=page.locator('#theme-toggle-en')
  theme_button.click()
  assert page.locator('html').get_attribute('data-theme')=='light','English light theme toggle failed'
  theme_button.click()
  assert page.locator('html').get_attribute('data-theme')=='dark','English dark theme toggle failed'
  assert_mobile_photo_layout(page,390,'en')
  toggle=page.locator('#menu-toggle')
  assert toggle.is_visible(), 'English mobile navigation toggle missing'
  toggle.click()
  assert toggle.get_attribute('aria-expanded')=='true','English menu did not open'
  toggle.click()
  assert toggle.get_attribute('aria-expanded')=='false','English menu did not close'
  toggle.click()
  page.keyboard.press('Escape')
  assert toggle.get_attribute('aria-expanded')=='false','English menu did not close on Escape'
  toggle.click()
  page.locator('#primary-nav a[href="#about"]').click()
  assert toggle.get_attribute('aria-expanded')=='false','English menu did not close after navigating'
  page.locator('.site-footer a[href="#top"]').click()
  page.wait_for_timeout(140)
  assert page.evaluate('window.scrollY')<12,'English Back to top did not reach document start'
  ctx.close()
  # English no-JS fallback is verified by source tests; sandbox no-JS Chromium navigation can stall.
  for en_width in [320,360,768,1024]:
   page,ctx,_=pagecheck(browser,'/en/',en_width,axe=True)
   assert_mobile_photo_layout(page,en_width,'en')
   ctx.close()
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
