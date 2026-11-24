/* Abdalla Taha portfolio — GitHub Pages, no tracking or external API keys. */
(() => {
  'use strict';
  const items = [
    {id:'Mishwar_App',title:'Mishwar / RDY',kind:'fullstack',icon:'◇',year:'2026',tags:['JavaScript','Node.js','D1','R2'],ar:'منظومة نقل ركاب تجريبية: واجهات الراكب والكابتن والإدارة، وخدمات REST API وقواعد بيانات Cloudflare D1 وتخزين R2.',en:'Pilot ride-hailing system with rider, captain and admin web apps, REST APIs, Cloudflare D1 and R2 storage.',live:'https://mishwar-rider.vercel.app/'},
    {id:'coffee-company',title:'Coffee Company',kind:'training',icon:'☕',year:'2025',tags:['JavaScript','Sass','Webpack','Bootstrap'],ar:'مشروع تدريبي نهائي لموقع شركة قهوة متعدد الصفحات، يتضمن منتجات وموزعين وتواصلًا وتصميمًا متجاوبًا.',en:'Capstone training project: a responsive, multi-page coffee brand website with products, distributors and contact sections.',live:'https://abdullah-taha07.github.io/coffee-company/index.html'},
    {id:'E-commerce',title:'E-commerce Storefront',kind:'frontend',icon:'▣',year:'2025',tags:['HTML','CSS','JavaScript'],ar:'نموذج متجر إلكتروني يضم صفحات المنتجات والبحث والسلة وواجهات إتمام الطلب؛ نسخة تجريبية منشورة للعرض وليست متجرًا تجاريًا فعليًا.',en:'Front-end storefront prototype with product, search, checkout and payment-interface pages; an online demo, not a real merchant system.',live:'https://abdullah-taha07.github.io/E-commerce/'},
    {id:'portfolio',title:'Personal Portfolio',kind:'frontend',icon:'◈',year:'2025–26',tags:['HTML','CSS','JavaScript','RTL'],ar:'موقعي الشخصي، ومعرض أعمال يضم المشروعات والمهارات والتواصل؛ تعمل عليه الآن هذه النسخة المطورة.',en:'My personal website presenting projects, skills and contact details, now upgraded to a full-stack portfolio.',live:'https://abdullah-taha07.github.io/portfolio/'},
    {id:'Fani-Mkifat',title:'Fani Mkifat',kind:'training',icon:'⚙',year:'2025',tags:['HTML','CSS','JavaScript'],ar:'نموذج موقع خدمي لفني تكييف يركز على سهولة التواصل، القوائم المتجاوبة والتأثيرات البصرية.',en:'Service-site concept for an AC technician, focused on contact actions, responsive navigation and visual effects.'},
    {id:'Dashboard',title:'Responsive Dashboard',kind:'training',icon:'▦',year:'2025',tags:['HTML','CSS','Dashboard'],ar:'تطبيق تدريبي لتخطيط لوحة تحكم متجاوبة وتنظيم المكونات والبيانات بصريًا.',en:'Training exercise for responsive dashboard layouts and visual information organization.'},
    {id:'youtuby',title:'Youtuby',kind:'training',icon:'▶',year:'2025',tags:['HTML','CSS','Bootstrap','jQuery'],ar:'واجهة تدريبية مستوحاة من يوتيوب تعرض الفيديوهات والصفحات المرتبطة بالقنوات والتخطيطات الشبكية.',en:'YouTube-inspired front-end practice with video layouts, channel pages and responsive grids.',live:'https://abdullah-taha07.github.io/youtuby/'},
    {id:'Restaurant-landing-page-for-MobileApp',title:'Restaurant App Landing',kind:'training',icon:'◉',year:'2025',tags:['HTML','CSS','Landing Page'],ar:'صفحة هبوط تسويقية لتطبيق مطعم على الجوال، مع مراعاة استجابة العناصر للأجهزة المختلفة.',en:'Marketing landing page for a restaurant mobile app, designed for different screen sizes.',live:'https://abdullah-taha07.github.io/Restaurant-landing-page-for-MobileApp/'},
    {id:'Company-page',title:'Company / Agency Page',kind:'training',icon:'▤',year:'2025',tags:['HTML','CSS','Bootstrap'],ar:'نموذج صفحة تعريفية لشركة أو وكالة يركز على هيكل المحتوى والأقسام البصرية.',en:'Company or agency landing-page concept focused on visual sections and content hierarchy.',live:'https://abdullah-taha07.github.io/Company-page/'},
    {id:'Product-page',title:'Product Landing Page',kind:'training',icon:'◆',year:'2025',tags:['HTML','CSS','Landing Page'],ar:'صفحة هبوط لمنتج مع تنظيم المزايا والصور والدعوة لاتخاذ إجراء.',en:'Product landing-page concept emphasizing features, visuals and a clear call to action.',live:'https://abdullah-taha07.github.io/Product-page/'},
    {id:'Training',title:'Web Training Exercises',kind:'training',icon:'⌁',year:'2025',tags:['HTML','CSS','JavaScript'],ar:'تمارين واجهات تشمل صورًا ومعرضًا وتأثيرات بسيطة لتطوير المهارات الأساسية.',en:'Frontend practice including a gallery, slider and small JavaScript interactions.'},
    {id:'launching-page-coming-soon',title:'Coming Soon Page',kind:'training',icon:'✧',year:'2025',tags:['HTML','CSS'],ar:'صفحة إعلان عن منتج قادم ضمن تدريبات تصميم صفحات الهبوط.',en:'Coming-soon announcement page created as landing-page practice.',live:'https://abdullah-taha07.github.io/launching-page-coming-soon/'},
    {id:'Avatar-Page',title:'Avatar Page',kind:'training',icon:'☺',year:'2025',tags:['HTML','CSS'],ar:'تجربة صغيرة في تنسيق عناصر واجهة مستوحاة من صفحات الشخصيات.',en:'Small HTML/CSS styling exercise for an avatar-inspired web page.',live:'https://abdullah-taha07.github.io/Avatar-Page/'},
    {id:'ResponsivePage',title:'Responsive Layout',kind:'training',icon:'↔',year:'2025',tags:['HTML','CSS'],ar:'تدريب بسيط على توزيع عناصر الصفحة وتجاوبها مع أحجام الشاشات.',en:'Small practice project exploring responsive page layouts.'},
    {id:'TailwindCss-site',title:'Tailwind CSS Experiment',kind:'training',icon:'≋',year:'2025',tags:['HTML','Tailwind CSS'],ar:'تجربة أولية صغيرة لاكتشاف أسلوب تنسيق الواجهات باستخدام Tailwind CSS.',en:'Early small experiment exploring utility-first styling with Tailwind CSS.'}
  ];
  const translations = {
    ar: {
      skip:'تجاوز إلى المحتوى',downloadResume:'تحميل السيرة الذاتية:',navAbout:'عني',navSkills:'التقنيات',navProjects:'المشاريع',navJourney:'الرحلة',navContact:'تواصل',
      eyebrow:'من الرياض · متاح لفرص البرمجة عن بُعد وفي المملكة',heroStart:'أصمّم تجارب رقمية،',heroHighlight:'وأربطها بأنظمة تعمل.',heroDesc:'أطوّر واجهات ويب وتجارب جوال قابلة للتثبيت (PWA)، وأتابع تكاملها مع الخادم وقواعد البيانات. مشوار نموذج عملي يجمع الراكب والكابتن والإدارة، ومعه غلاف Android تجريبي مبني بجافا.',
      seeWork:'استعرض أعمالي',contactMe:'تواصل معي',openMishwarSites:'فتح تطبيقات مشوار',whatsappMe:'واتساب',whatsappAction:'راسلني على واتساب',metricRepos:'مستودع مشروع عام',metricApps:'تطبيقات مشوار مترابطة',metricYear:'أحدث مشروع Full-Stack',systemHeading:'من ثلاث تجارب مستخدم إلى خادم مشترك',pilotNote:'المشروع في مرحلة التطوير والاختبارات، وليس إطلاقًا تجاريًا معتمدًا.',
      sectionAboutSmall:'نبذة',aboutTitle:'أفكر في المنتج كاملًا، وليس الشاشة فقط.',aboutLead:'من تجربة الاستخدام إلى التكامل مع الخادم، أبحث عن حلول عملية قابلة للاختبار والتحسين.',name:'عبدالله طه محمد',location:'الرياض، المملكة العربية السعودية',aboutP1:'أنا مطور Full-Stack أعمل على تطبيقات ويب وجوال قابلة للتثبيت عبر PWA ومشروعات تدريبية. بدأت بـ HTML وCSS وJavaScript، وتوسعت في مشوار إلى Node.js وREST والخدمات السحابية وقواعد البيانات، مع متابعة غلاف Android Java التجريبي.',aboutP2:'في مشوار أعمل على تحويل المتطلبات إلى وظائف قابلة للتجربة، وتنظيم مهام التطوير، ومراجعة التعديلات البرمجية والتحقق من جودة الكود، وتحليل الأخطاء، والتحقق من الاختبارات والتكامل قبل اعتماد التغييرات. لا أقدّم النموذج التجريبي على أنه منتج أُطلق تجاريًا.',aboutPoint1Title:'منظور شامل',aboutPoint1:'واجهة + API + قاعدة بيانات + نشر',aboutPoint2Title:'تحليل الأعطال',aboutPoint2:'تشخيص المشكلات ومراجعة نتائج الاختبارات',aboutPoint3Title:'تعلم وتطوير مستمر',aboutPoint3:'من مشاريع تدريبية إلى منظومة أكثر تعقيدًا',
      sectionSkillsSmall:'التقنيات',skillsTitle:'المهارات التي أستخدمها في التطوير.',skillsLead:'تقنيات مثبتة بمشاريعي، مصنفة حسب وظيفتها؛ دون ادعاء استخدام أدوات غير موجودة في أعمالي.',skillsFrontDesc:'تصميم وتطوير واجهات متجاوبة، ديناميكية، عربية وإنجليزية.',skillsBackDesc:'ربط الخدمات والتحقق من الهوية والطلبات والعمليات الحساسة.',skillsDataDesc:'العمل مع البيانات العلائقية والتخزين السحابي والترحيلات.',skillsCloudDesc:'إعداد وربط ونشر تطبيقات ويب على بنية سحابية.',skillsQualityDesc:'إدارة الإصدارات واكتشاف الأخطاء واختبار السلوك.',skillsAiDesc:'تحليل المتطلبات وتوجيه أدوات البرمجة المساعدة ومراجعة النتائج.',
      sectionProjectsSmall:'أعمالي',projectsTitle:'مشروعات حقيقية للتعلّم وحل المشكلات.',projectsLead:'المشروع الأبرز «مشوار» كنموذج Full-Stack، ومعه جميع مستودعاتي العامة، بما فيها المشروعات التدريبية.',flagshipLabel:'المشروع الرئيسي · نسخة تجريبية',flagshipDesc:'منظومة نقل ركاب تجريبية تتكون من ثلاث تجارب مترابطة: الراكب والكابتن والإدارة. تشمل حسابات وصلاحيات، وإدارة الرحلات، وتكامل خرائط وموقع، ولوحة إدارة، وواجهة خادم قائمة على Cloudflare Workers مع D1 وR2.',mishwarFeaturesTitle:'نطاق الخصائص التي تعاملت معها في مشوار',mishwarFeaturesIntro:'الخصائص التالية جزء من التطوير أو الاختبارات التجريبية، وليست تأكيدًا على تفعيلها جميعًا للمستخدمين الحقيقيين.',feature1:'تطبيقات الراكب والكابتن والإدارة',feature2:'إدارة الحسابات والجلسات والصلاحيات',feature3:'توثيق الهوية واستعادة الحساب',feature4:'إسناد الرحلات والعروض',feature5:'GPS والموقع والخرائط والمسارات',feature6:'لوحة العمليات ومستندات الكباتن',feature7:'المحافظ والسجل المالي — تجريبي',feature8:'قنوات SMS والبريد — مراحل تكامل',feature9:'واجهة PWA متجاوبة ودعم RTL',feature10:'الترحيلات والاختبارات وعمليات النشر',riderApp:'تطبيق الراكب',captainApp:'تطبيق السائق',adminApp:'لوحة الإدارة',flagshipNote:'روابط تجربة ويب وقد تتطلب تسجيل الدخول؛ ليست تطبيقات تجارية معتمدة أو ملفات APK جاهزة للتوزيع.',
      caseStudyTitle:'من داخل المشروع: ما الذي أعمل عليه؟',case1Title:'الربط بين التطبيقات',case1Desc:'خادم مركزي وREST APIs تربط الراكب والكابتن والإدارة، مع متابعة التنسيق بين الواجهات والبيانات.',case2Title:'قواعد البيانات والتخزين',case2Desc:'Cloudflare D1 المبنية على SQLite، وترحيلات SQL، وR2 للملفات والمستندات.',case3Title:'الرحلات والخرائط',case3Desc:'تدفقات طلب الرحلة والإسناد، والتحقق من الموقع، وتكامل الخرائط والمسارات بما فيها اختبارات TomTom.',case4Title:'الأمن والاختبارات',case4Desc:'الجلسات والصلاحيات، فحص أخطاء HTTP وCORS، اختبارات Node.js ومراجعة التعديلات قبل الدمج والنشر.',skillsMobileDesc:'تطوير واجهات جوال قابلة للتثبيت عبر PWA وغلاف Android تجريبي باستخدام Java وCustom Tabs وGradle، مع توضيح حدود النشر.',mobileLearnMore:'شاهد كيف استخدمتها في مشوار ↗',caseStudyCtaTitle:'ملف هندسي مستقل لمشوار',caseStudyCtaDesc:'البنية التقنية، تطبيقات الجوال، الاختبارات، القرارات والحدود الحالية.',caseStudyCtaButton:'استعراض دراسة الحالة ↗',trainingGroupTitle:'مشاريع تدريبية منجزة بدون موقع منشور',trainingGroupDesc:'نفذتها خلال رحلة التعلم، وهي جزء من خبرتي العملية في تصميم وتطوير الواجهات.',archiveTitle:'معرض المشاريع الكامل',archiveDesc:'المواقع المنشورة أولًا، ثم المشاريع التدريبية المنجزة التي لا تملك رابط معاينة متاحًا.',repoCountLabel:'مشروعًا',filterAll:'الكل',filterTraining:'التدريبية',searchLabel:'بحث في المشاريع',searchPlaceholder:'ابحث باسم المشروع أو التقنية',noProjects:'لم أجد مشاريع مطابقة. جرّب بحثًا آخر.',browseGitHub:'استعرض جميع مستودعات GitHub',demo:'فتح الموقع',siteUnavailable:'مشروع تدريبي أنجزته · لا توجد معاينة مباشرة',siteUnavailableHint:'أحد مشاريعي التدريبية — لا يوجد رابط عرض عام متاح حاليًا',kFull:'منظومة Full-Stack',kFront:'واجهة ويب',kTraining:'مشروع تدريبي',
      sectionJourneySmall:'الرحلة',journeyTitle:'رحلة تعلّم تتحول إلى منتجات.',journeyLead:'أركز على التطور العملي: أفهم، أبني، أختبر، ثم أوثّق ما تعلمته.',timeline1Title:'مشوار · مشروع Full-Stack تطبيقي',timeline1Desc:'تنسيق تطوير منظومة الراكب والكابتن والإدارة، وربط APIs وقواعد البيانات، وإدارة الفروع، وتحليل الأخطاء ومراجعة الاختبارات بمساعدة أدوات الذكاء الاصطناعي.',timeline2Title:'مشروعات واجهات ومشروع شركة القهوة',timeline2Desc:'تطبيق HTML وCSS وJavaScript وSass وBootstrap وjQuery وWebpack عبر متجر إلكتروني ونماذج صفحات ولوحة تحكم وموقع شركة قهوة كمشروع تدريبي نهائي.',timeline3Title:'تعليم ذاتي وورش تطوير ويب',timeline3Desc:'دراسة تطوير الواجهات عبر أكاديمية حسوب وورش طويق في HTML وCSS وDOM وBootstrap وGit وJavaScript.',timeline4Title:'بكالوريوس التجارة · جامعة القاهرة',timeline4Desc:'خلفية جامعية في التحليل والتنظيم، تلتها رحلة تعلم تخصصية في البرمجة والتطوير.',
      sectionStrengthsSmall:'طريقة العمل',strengthsTitle:'كيف أتعامل مع التحديات التقنية؟',strength1Title:'تحليل المشكلة',strength1Desc:'تحديد السبب الجذري بدل إخفاء الأعراض.',strength2Title:'تنظيم الأولويات',strength2Desc:'تقسيم المطلوب إلى تغييرات قابلة للتحقق.',strength3Title:'اختبار الحل',strength3Desc:'التحقق من السلوك والانحدارات قبل النشر.',strength4Title:'توثيق وتعاون',strength4Desc:'توضيح القرارات والتواصل ومراجعة المخرجات.',
      sectionContactSmall:'تواصل',contactTitle:'عندك فرصة عمل أو مشروع يناسب خبرتي؟',contactDesc:'يسعدني مناقشة وظائف Full-Stack وJavaScript وفرق تطوير المنتجات في الرياض أو عن بُعد في السعودية.',emailMe:'راسلني عبر البريد',backToTop:'العودة للأعلى'
    },
    en: {
      skip:'Skip to content',downloadResume:'Download resume:',navAbout:'About',navSkills:'Tech stack',navProjects:'Projects',navJourney:'Journey',navContact:'Contact',
      eyebrow:'Based in Riyadh · Open to Saudi remote & on-site developer roles',heroStart:'I build digital experiences,',heroHighlight:'and connect the systems behind them.',heroDesc:'I build responsive web and installable mobile PWA experiences, connecting them to APIs, backend services and databases. Mishwar is a three-app pilot with an experimental Android Java wrapper; I coordinate and validate development.',
      seeWork:'Explore my work',contactMe:'Get in touch',openMishwarSites:'Choose Mishwar app',whatsappMe:'WhatsApp',whatsappAction:'Chat on WhatsApp',metricRepos:'public repositories',metricApps:'Mishwar web apps',metricYear:'latest full-stack project',systemHeading:'Three experiences. One shared backend.',pilotNote:'This project is a development pilot, not an approved commercial launch.',
      sectionAboutSmall:'About',aboutTitle:'I look beyond the screen to the full product.',aboutLead:'From user experience to backend integration, I focus on practical, testable improvements.',name:'Abdalla Taha Mohamed',location:'Riyadh, Saudi Arabia',aboutP1:'I work on web and installable mobile PWA experiences and training projects. Starting with HTML, CSS and JavaScript, I expanded in Mishwar to Node.js, REST APIs, cloud services, databases and an experimental Java Android wrapper.',aboutP2:'On Mishwar, I translate requirements into testable functionality, prioritize development tasks, review code changes and validate their quality, investigate bugs, and validate integration and tests before acceptance. I do not present this pilot as a commercially launched product.',aboutPoint1Title:'End-to-end thinking',aboutPoint1:'Frontend + API + database + deployment',aboutPoint2Title:'Troubleshooting',aboutPoint2:'Investigating root causes and regression results',aboutPoint3Title:'Continuous growth',aboutPoint3:'From training projects to multi-app systems',
      sectionSkillsSmall:'Tech stack',skillsTitle:'Tools and technologies I use.',skillsLead:'Technologies evidenced by projects, grouped by function — without claiming unsupported experience.',skillsFrontDesc:'Responsive, dynamic interfaces in both Arabic and English.',skillsBackDesc:'Service integration, user identities, requests, and permissions.',skillsDataDesc:'Relational data, cloud object storage, and migrations.',skillsCloudDesc:'Deploying and connecting web applications on cloud platforms.',skillsQualityDesc:'Versioning, troubleshooting, testing and release checks.',skillsAiDesc:'Requirements analysis, guiding coding assistants and reviewing outputs.',
      sectionProjectsSmall:'Portfolio',projectsTitle:'Projects built to learn and solve real problems.',projectsLead:'Mishwar is my flagship full-stack pilot, alongside every public repository — including clearly labeled training projects.',flagshipLabel:'Flagship project · pilot',flagshipDesc:'Ride-hailing pilot connecting three web experiences: rider, captain and admin. Features include user accounts and roles, trip workflows, location and map integration, an admin portal, and a Cloudflare Workers API with D1 and R2.',mishwarFeaturesTitle:'Mishwar features I have worked around',mishwarFeaturesIntro:'These are development and test-stage capabilities, not claims that every feature is live for real customers.',feature1:'Rider / Captain / Admin apps',feature2:'Accounts, sessions and roles',feature3:'Identity verification and account recovery',feature4:'Trip dispatch and offers',feature5:'GPS, maps and routing',feature6:'Operations and captain documents',feature7:'Wallet and ledger — pilot',feature8:'SMS and email — integration stages',feature9:'Responsive PWA and RTL support',feature10:'Migrations, testing and deployments',riderApp:'Rider app',captainApp:'Driver app',adminApp:'Admin portal',flagshipNote:'Web app demos may require login; these are not approved commercial apps or distribution-ready APKs.',
      caseStudyTitle:'Inside the project: what do I work on?',case1Title:'App-to-backend integration',case1Desc:'One shared backend and REST APIs connecting rider, captain and admin workflows across interfaces and data.',case2Title:'Database and storage',case2Desc:'Cloudflare D1 on SQLite, SQL migrations, and R2 for file and document storage.',case3Title:'Trips and maps',case3Desc:'Trip requests and dispatch flows, location validation, maps and routing integrations including TomTom tests.',case4Title:'Security and testing',case4Desc:'Sessions, permissions, HTTP/CORS debugging, Node.js tests and validating changes before merges or deployments.',skillsMobileDesc:'Installable mobile-first PWAs and an experimental Android Java/Custom Tabs wrapper with Gradle, not native iOS or Flutter apps.',mobileLearnMore:'Explore mobile development in Mishwar ↗',caseStudyCtaTitle:'Mishwar engineering case study',caseStudyCtaDesc:'Architecture, mobile delivery, test evidence, trade-offs and current limitations.',caseStudyCtaButton:'Read the case study ↗',trainingGroupTitle:'Completed training projects without live demos',trainingGroupDesc:'Hands-on practice projects I built while developing my frontend skills.',archiveTitle:'Full project directory',archiveDesc:'Published websites first, followed by completed training projects without live demos.',repoCountLabel:'projects',filterAll:'All',filterTraining:'Training',searchLabel:'Search projects',searchPlaceholder:'Search by project or technology',noProjects:'No matching projects. Try another search.',browseGitHub:'Browse all GitHub repositories',demo:'Open website',siteUnavailable:'Completed training project · no live preview',siteUnavailableHint:'A hands-on training project without a currently available live demo',kFull:'Full-stack pilot',kFront:'Web interface',kTraining:'Training project',
      sectionJourneySmall:'Journey',journeyTitle:'Learning that grows into working software.',journeyLead:'I keep a practical cycle: understand, build, test, and document.',timeline1Title:'Mishwar · hands-on full-stack pilot',timeline1Desc:'Coordinating rider, captain and admin development, API and database integration, branching, bug analysis and AI-assisted test review.',timeline2Title:'Frontend projects and Coffee Company',timeline2Desc:'Applying HTML, CSS, JavaScript, Sass, Bootstrap, jQuery and Webpack in a storefront, dashboards, landing pages and a coffee-company training capstone.',timeline3Title:'Self-study and web development workshops',timeline3Desc:'Frontend learning through Hsoub Academy and Tuwaiq workshops covering HTML, CSS, DOM, Bootstrap, Git and JavaScript.',timeline4Title:'Bachelor of Commerce · Cairo University',timeline4Desc:'An academic background in analysis and organization, followed by a focused transition into web development.',
      sectionStrengthsSmall:'Working style',strengthsTitle:'How I approach technical challenges.',strength1Title:'Root-cause analysis',strength1Desc:'Understand what failed rather than hiding symptoms.',strength2Title:'Prioritization',strength2Desc:'Break requests into testable, ordered changes.',strength3Title:'Validation',strength3Desc:'Check behavior and regressions before release.',strength4Title:'Documentation & teamwork',strength4Desc:'Communicate decisions and review deliverables.',
      sectionContactSmall:'Contact',contactTitle:'Have a role or project that fits my skills?',contactDesc:'I am happy to discuss Full-Stack, JavaScript and product engineering opportunities in Riyadh or remotely across Saudi Arabia.',emailMe:'Email me',backToTop:'Back to top'
    }
  };
  const root = document.documentElement;
  const getStored = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const setStored = (key, val) => { try { localStorage.setItem(key, val); } catch {} };
  let lang = getStored('at-portfolio-lang') === 'en' ? 'en' : 'ar';
  let theme = getStored('at-portfolio-theme') === 'light' ? 'light' : 'dark';
  let category = 'all';
  const byId = id => document.getElementById(id);
  const langToggle = byId('lang-toggle');
  const themeToggle = byId('theme-toggle');
  const searchInput = byId('project-search');
  const projectGrid = byId('project-grid');
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const el = (tag, className, content) => { const node = document.createElement(tag); if(className) node.className = className; if(content !== undefined) node.textContent = content; return node; };
  const external = (url, text) => { const link = el('a', '', text); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; return link; };

  function renderProjects(){
    const q = searchInput.value.trim().toLocaleLowerCase();
    const matches = items.filter(p => (category === 'all' || (category === 'training' ? (!p.live || p.kind === 'training') : p.kind === category && Boolean(p.live))) && (!q || [p.title,p.id,p.ar,p.en,...p.tags].join(' ').toLocaleLowerCase().includes(q)));
    const frag = document.createDocumentFragment();
    // Published project demos first; non-published work is visibly grouped as completed training.
    const ordered = [...matches].sort((a,b) => Number(Boolean(b.live))-Number(Boolean(a.live)));
    let trainingGroupIntroduced = false;
    for(const p of ordered){
      if(!p.live && !trainingGroupIntroduced){
        const heading = el('div','project-group-heading');
        heading.append(el('h4','',translations[lang].trainingGroupTitle), el('p','',translations[lang].trainingGroupDesc));
        frag.append(heading);
        trainingGroupIntroduced = true;
      }
      const card = el('article','project-card');
      const top = el('div','project-card-top');
      const kindText = !p.live ? translations[lang].kTraining : p.kind === 'fullstack' ? translations[lang].kFull : p.kind === 'frontend' ? translations[lang].kFront : translations[lang].kTraining;
      top.append(el('span','project-type',kindText),el('span','project-icon',p.icon));
      card.append(top,el('h4','',p.title),el('p','',p[lang]));
      const chips = el('div','project-card-tags');
      for(const t of p.tags) chips.append(el('span','',t));
      const links = el('div','project-card-links');
      if(p.id === 'Mishwar_App'){
        const chooser = el('details','mishwar-chooser mishwar-chooser-card');
        const trigger = el('summary','', translations[lang].openMishwarSites);
        const options = el('div','mishwar-site-options');
        for(const [url, label] of [
          ['https://mishwar-rider.vercel.app/', translations[lang].riderApp],
          ['https://mishwar-captain.vercel.app/', translations[lang].captainApp],
          ['https://mishwar-admin-gamma.vercel.app/', translations[lang].adminApp]
        ]){
          const site = external(url, label + ' ↗');
          site.setAttribute('aria-label',label+' — Mishwar');
          options.append(site);
        }
        chooser.append(trigger,options);
        links.append(chooser);
      }else if(p.live){
        const siteLink=external(p.live,translations[lang].demo+' ↗');
        siteLink.className='site-link';
        siteLink.setAttribute('aria-label',translations[lang].demo+' — '+p.title);
        links.append(siteLink);
      }else{
        const unavailable=el('span','site-unavailable',translations[lang].siteUnavailable);
        unavailable.setAttribute('title',translations[lang].siteUnavailableHint);
        links.append(unavailable);
      }
      card.append(chips,links);
      frag.append(card);
    }
    projectGrid.replaceChildren(frag);
    byId('repo-count').textContent = String(matches.length);
    byId('no-projects').hidden = matches.length !== 0;
  }
  function applyLanguage(){
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(node=>{ const k=node.getAttribute('data-i18n'); if(translations[lang][k] != null) node.textContent=translations[lang][k]; });
    document.querySelectorAll('[data-placeholder]').forEach(node=>{const k=node.getAttribute('data-placeholder');if(translations[lang][k])node.placeholder=translations[lang][k];});
    langToggle.textContent=lang === 'ar' ? 'EN' : 'عربي';
    langToggle.setAttribute('aria-label',lang==='ar'?'Switch to English':'التبديل إلى العربية');
    byId('menu-toggle').setAttribute('aria-label',lang==='ar'?'فتح القائمة':'Open menu');
    backToTop.setAttribute('aria-label', translations[lang].backToTop);
    backToTop.title = translations[lang].backToTop;
    renderProjects();
  }
  function applyTheme(){
    root.dataset.theme=theme;
    byId('theme-icon').textContent=theme === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label',lang==='ar'?'تغيير لون الموقع':'Switch color theme');
    document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#0b1220':'#f7f9fc';
  }
  filterButtons.forEach(button=>button.addEventListener('click',()=>{
    category=button.dataset.filter;
    for(const b of filterButtons){const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
    renderProjects();
  }));
  searchInput.addEventListener('input',renderProjects);
  langToggle.addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';setStored('at-portfolio-lang',lang);applyLanguage();applyTheme();});
  themeToggle.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';setStored('at-portfolio-theme',theme);applyTheme();});
  const menuToggle = byId('menu-toggle');
  const nav = byId('primary-nav');
  const closeMenu=()=>{nav.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');};
  menuToggle.addEventListener('click',()=>{let open=nav.classList.toggle('is-open');menuToggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  const contactPicker = byId('hero-contact-picker');
  const contactToggle = byId('hero-contact-toggle');
  const contactOptions = byId('hero-contact-options');
  const closeContact = () => { contactOptions.hidden = true; contactToggle.setAttribute('aria-expanded','false'); };
  contactToggle.addEventListener('click', () => {
    const shouldOpen = contactOptions.hidden;
    contactOptions.hidden = !shouldOpen;
    contactToggle.setAttribute('aria-expanded',String(shouldOpen));
  });
  contactOptions.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeContact));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeContact();}});
  document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menuToggle.contains(e.target))closeMenu();if(!contactPicker.contains(e.target))closeContact();});
  const photo=byId('profile-photo');
  if(photo){photo.addEventListener('error',()=>{photo.hidden=true;});if(photo.complete && photo.naturalWidth===0)photo.hidden=true;}
  const backToTop = byId('back-to-top');
  const updateBackToTop = () => { backToTop.hidden = window.scrollY < 400; };
  window.addEventListener('scroll', updateBackToTop, {passive: true});
  backToTop.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top: 0, behavior: reduceMotion ? 'auto' : 'smooth'});
  });
  byId('current-year').textContent=String(new Date().getFullYear());
  applyLanguage();applyTheme();
  updateBackToTop();
})();
