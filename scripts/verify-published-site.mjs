/* Read-only verification of public portfolio pages and its PDFs after deployment. */
const base = 'https://abdullah-taha07.github.io/portfolio/';
const routes = [
  ['', 'text/html', /portfolio|Full-Stack/i],
  ['en/', 'text/html', /Full-Stack/],
  ['mishwar-case-study.html', 'text/html', /Mishwar/],
  ['demo/mishwar-tour.html', 'text/html', /Mishwar|مشوار/],
  ['css/portfolio-fsd.css', 'text/css', /project-card/],
  ['js/portfolio-fsd.js', 'javascript', /renderProjects/],
  ['js/portfolio-search-en.js', 'javascript', /project-toolbar-en/],
  ['sitemap.xml', 'xml', /portfolio\/en\//],
  ['files/Abdalla_FSD_ar.pdf', 'pdf', /^%PDF-/],
  ['files/Abdalla_FSD_en.pdf', 'pdf', /^%PDF-/]
];
let problems = 0;
for (const [route,type,check] of routes) {
  const url = new URL(route,base).href;
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(),15000);
  try {
    const response = await fetch(url,{signal:controller.signal,headers:{'User-Agent':'PortfolioOwnerSmoke/1.0'},redirect:'follow',cache:'no-store'});
    const contentType = response.headers.get('content-type') || '';
    const content = await response.text();
    const ok = response.ok && contentType.toLowerCase().includes(type) && check.test(content);
    console.log(ok?'PASS':'FAIL',response.status,route||'/',contentType);
    if(!ok)problems++;
  }catch(error){console.log('NOT VERIFIED',route||'/',String(error));problems++;}
  finally{clearTimeout(timer);}
}
if(problems){console.error('Live site smoke failed:',problems);process.exitCode=1;}
else console.log('All portfolio-owned routes and PDF headers verified; external applications and browser UX are out of scope.');
