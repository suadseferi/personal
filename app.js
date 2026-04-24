/* ============================================================
   Suad Seferi — Portfolio (vanilla JS, no build)
   ============================================================ */

/* ---------- Data ---------- */
const SERVICES = [
  ['01', 'Assessment', 'Readiness & Security', 'Conducting AI readiness and cybersecurity assessments to evaluate organizational capacity, security posture, and identify skill gaps.'],
  ['02', 'Strategy', 'Implementation Roadmaps', 'Designing AI implementation roadmaps tailored to business processes, security needs, and regulatory obligations.'],
  ['03', 'Integration', 'Secure Integration', 'Integrating AI solutions into existing systems while ensuring data privacy, cybersecurity, compliance, and secure‑by‑design architectures.'],
  ['04', 'Education', 'Training & Coaching', 'Providing training and coaching to teams on AI adoption, secure AI use, digital safety, and cyber hygiene.'],
  ['05', 'Oversight', 'Project Monitoring', 'Monitoring AI projects to ensure measurable impact, security, and continuous improvement.'],
  ['06', 'Ecosystems', 'Microsoft 365 & Copilot', 'Supporting organizations in implementing and governing AI capabilities within Microsoft 365 (Copilot, Teams, SharePoint, Power Platform) in alignment with security, governance, and compliance.'],
];

const MARQUEE_ITEMS = [
  'Council of Europe', 'Konrad Adenauer Foundation', 'University of Novi Pazar',
  'International Balkan University', 'Association of Journalists (ZNM)',
  'MCEC Macedonia', 'AINOW Society', 'Western Balkans Info Hub'
];

const BOOKS = [
  {
    year: '2024',
    title: 'THE AI JOURNEY',
    cover: 'assets/aijourney.jpg',
    aura: 'var(--aura-purple)',
    hover: 'var(--hover-purple)',
    body: 'Published in 2024, <em>The AI Journey</em> explores the practical implementation of AI in organizations, focusing on AI strategy, adoption, and digital transformation. Features case studies, best practices, and tools for leaders and teams integrating AI into business operations responsibly and efficiently.',
    links: [
      ['Amazon UK ↗', 'https://www.amazon.co.uk/AI-Journey-Mr-Suad-Seferi/dp/B0D6RX8GVN'],
      ['Kniga.mk ↗', 'https://kniga.mk/m/767/suad-seferi'],
      ['Klub Matica ↗', 'https://matica.com.mk/product/the-ai-journey-a-simple-guide/']
    ]
  },
  {
    year: '2025',
    title: 'THE SPELL OF AI',
    subtitle: 'A World Without a Pause',
    cover: 'assets/spellofai.jpg',
    aura: 'var(--aura-yellow)',
    hover: 'var(--hover-yellow)',
    body: 'Published in 2025, <em>The Spell of AI</em> examines the societal, ethical, and educational aspects of artificial intelligence — AI literacy, ethics, and responsible innovation. A guide for educators, policymakers, and business leaders preparing for AI‑driven transformation.',
    links: [
      ['Amazon UK ↗', 'https://www.amazon.co.uk/Spell-AI-World-Without-Pause-ebook/dp/B0FCYFGCYT'],
      ['Google Books ↗', 'https://www.google.mk/books/edition/The_Spell_of_AI/Ixdt0QEACAAJ'],
      ['Waterstones ↗', 'https://www.waterstones.com/book/the-spell-of-ai/suad-seferi/9798288566073'],
      ['Saxo DK ↗', 'https://www.saxo.com/dk/the-spell-of-ai-a-world-without-a-pause_bog_9798288566073']
    ]
  },
  {
    year: '2026',
    title: 'MACEDONIAN AI DATA 2026',
    subtitle: 'A Strategy for Digital Sovereignty',
    cover: 'assets/cover-macedonian-ai.svg',
    aura: 'var(--aura-green)',
    hover: 'var(--hover-green)',
    stage: 'Research Stage',
    body: 'A strategy paper on digital sovereignty and AI data governance in North Macedonia — infrastructure, policy, and national strategy. Currently at research stage.',
    links: [
      ['ResearchGate ↗', 'https://www.researchgate.net/publication/400796236_Macedonian_AI_Data_2026_A_Strategy_for_Digital_Sovereignty'],
      ['AINOW Society ↗', 'https://www.ainow.mk/']
    ]
  },
  {
    year: '2026',
    title: 'WESTERN BALKANS 2026',
    subtitle: 'Fintech & AI Investment Case',
    cover: 'assets/cover-western-balkans.svg',
    aura: 'var(--aura-purple)',
    hover: 'var(--hover-purple)',
    stage: 'Research Stage',
    body: 'An investment case for fintech and AI across the Western Balkans — market conditions, regional opportunities, and a forward-looking strategy for 2026.',
    links: [
      ['ResearchGate ↗', 'https://www.researchgate.net/publication/403672056_Western_Balkans_2026_Fintech_AI_Investment_Case']
    ]
  }
];

const EVENTS = [
  { org: 'AINOW Society', tag: 'Featured · 2026',
    title: 'AI Without Filters — Startup Club Skopje',
    body: 'A hands-on public event: how to build your own AI assistant in a single day. Held at Startup Club Skopje with broad regional media coverage.',
    href: 'https://inovativnost.mk/2026/04/02/ai-bez-vlakno-na-jazik-kako-za-eden-den-da-kreirash-sopstvenai-asistent-i-da-bidesh-chekor-pred-site/',
    featured: true },
  { org: 'Council of Europe', tag: 'Cited Research',
    title: 'AI in the Media of North Macedonia',
    body: 'CoE publication cites Suad as author of the "Ethics and Bias in AI" report — used as a reference for policy and regulatory analysis.',
    href: 'https://www.coe.int/en/web/freedom-expression/-/artificial-intelligence-in-the-media-toward-smarter-regulation-in-north-macedonia' },
  { org: 'Konrad Adenauer Foundation', tag: 'Workshop · Kruševo',
    title: 'AI in Newsrooms — Challenges & Opportunities',
    body: 'Workshop on responsible AI use in Balkan media and newsrooms.',
    href: 'https://www.kas.de/en/web/nordmazedonien/veranstaltungsberichte/detail/-/content/artificial-intelligence-in-newsrooms-challenges-and-opportunities-1' },
  { org: 'University of Novi Pazar', tag: 'Guest Lecture',
    title: 'Promotion of The AI Journey',
    body: 'Accessible AI lecture followed by workshops for finance, computer science, arts, and philology students. Interactive discussions addressing AI opportunities and challenges.',
    href: 'https://uninp.edu.rs/eng/na-univerzitetu-u-novom-pazaru-uspjesno-odrzan-dogadjaj-posvecen-vjestackoj-inteligenciji/' },
  { org: 'ZNM — Academy T-AJM', tag: 'Training',
    title: 'New Technologies & Digital Security',
    body: 'Training for journalists and media workers on new technologies and digital security, organised by the Association of Journalists of Macedonia.',
    href: 'https://znm.org.mk/en/successfully-held-training-on-new-technologies-and-digital-security/' },
  { org: 'Hibrid.info', tag: 'Research Panel',
    title: 'The Chatbot Version of Truth',
    body: 'Interviewed for the ADS / hibrid.info research report; expert panelist on LLMs and information integrity.',
    href: 'https://www.facebook.com/hibridinfo/posts/pfbid029fcdgHy8kpewfhhGoRZjLX9Sngc6Qt7UwDEiEFXXeSvrfvp8t5BsEbDzM2CV1V5Ml' },
  { org: 'AINOW × Саем на книгата 2025', tag: 'Panel',
    title: 'Who is the Author in the Age of AI?',
    body: 'Co-organized panel in Skopje on ethical and legal aspects of AI-generated content — authorship, intellectual property, and generative AI challenges for creators and publishers.',
    href: 'https://www.ainow.mk/blog/ai-now-blog-1/ai-now-%D0%BD%D0%B0-%D1%81%D0%B0%D0%B5%D0%BC%D0%BE%D1%82-%D0%BD%D0%B0-%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0%D1%82%D0%B0-%D0%B2%D0%BE-%D1%81%D0%BA%D0%BE%D0%BF%D1%98%D0%B5-20' },
  { org: 'International Balkan University', tag: 'Guest Lecture',
    title: 'AI & Book Promotion',
    body: 'Guest lecture and promotion of The AI Journey at International Balkan University.',
    href: '#' },
  { org: 'MCEC Macedonia', tag: 'Workshop',
    title: 'AI & Cybersecurity Workshop',
    body: 'Interactive session for high school educators and professionals on AI\'s impact in education, productivity, and teaching methods — practical ways to integrate AI responsibly into classrooms.',
    href: '#' },
];

const MEDIA_GROUPS = [
  {
    title: 'Platform Launch',
    tag: 'AINOW · AI Literacy Platform · April 2026',
    items: [
      ['Inovativnost.mk', 'AINOW launches the first AI literacy platform for teachers & schools in the region.', 'https://inovativnost.mk/2026/04/22/ainow-ja-lansira-prvata-platforma-za-vi-pismenost-za-nastavniczi-i-uchilishta-vo-severna-makedonija-i-regionot/'],
      ['Grid.mk', 'AINOW launches the first AI literacy platform for educators in Macedonia and the region.', 'https://grid.mk/c/iPfZtJ0BbUVBhRAF3OQ8/2026-04-22/ainow-ja-lansira-prvata-platforma-za-vi-pismenost-za-nastavnici-i-uchilishta-vo-makedonija-i-regionot'],
      ['TRN.mk', 'AINOW launches the first AI literacy platform for educators in Macedonia and the region.', 'https://trn.mk/ainow-ja-lansira-prvata-platforma-za-vi-pismenost-za-nastavniczi-i-uchilishta-vo-makedonija-i-regionot/'],
      ['Emagazin.mk', 'AINOW launches the first AI literacy platform for teachers and schools.', 'https://emagazin.mk/ainow-ja-lansira-prvata-platforma-za-vi-pismenost-za-nastavnici-i-uchilishta/'],
      ['Time.mk', 'Aggregator — AINOW launches the first AI literacy platform in the region.', 'https://time.mk/c/013686b8df/ainow-ja-lansira-prvata-platforma-za-vi-pismenost-za-nastavnici-i-ucilista.html'],
    ]
  },
  {
    title: 'Event Coverage',
    tag: 'AI Without Filters · Startup Club Skopje',
    items: [
      ['Inovativnost.mk', 'AI Without Filters — Startup Club Skopje.', 'https://inovativnost.mk/2026/04/02/ai-bez-vlakno-na-jazik-kako-za-eden-den-da-kreirash-sopstvenai-asistent-i-da-bidesh-chekor-pred-site/'],
      ['Racin.mk', 'How to get your own AI assistant in one day.', 'https://racin.mk/vesti/ai-bez-vlakno-na-jazik-vo-skopje-kako-do-svoj-ai-asistent-za-eden-den/'],
      ['Time.mk', 'Coverage aggregator of the Startup Club Skopje event.', 'https://time.mk/c/c97b4b9b89/ai-bez-vlakno-na-jazik-kako-za-eden-den-da-kreiras-sopstven-ai-asistent-i-da-bides-cekor-pred-site.html'],
    ]
  },
  {
    title: 'TV & Video',
    tag: 'Broadcasts · Podcasts · Reels',
    items: [
      ['Telma — DIGI PLUS', 'On AI, digital transformation and technology.', 'https://youtu.be/BreZvh7jRSc?t=248'],
      ['Ora 24 TV', 'Inteligjenca artificiale, frikë apo mundësi?', 'https://www.facebook.com/reel/642365718645317'],
      ['Телевизија 24 Вести', 'Discussion about AI with Sead Rizvanović.', 'https://www.facebook.com/reel/735087302420406'],
      ['NewBiz Podcast', 'Public talk on artificial intelligence.', 'https://www.youtube.com/watch?v=_TAtJsEsnPE'],
      ['Sandžak TV', 'UNP opened its doors to AI — book promotion and workshops.', 'https://sandzak.tv/unp-otvorio-vrata-vjestackoj-inteligenciji-promocija-knjige-i-radionice-u-fokusu-savremenih-tehnologija/'],
      ['Priкazna Magazin', 'Digital Detox — talk on responsible technology use.', 'https://youtu.be/qnKGPpoixJw?t=708'],
    ]
  },
  {
    title: 'Web & Print',
    tag: 'Interviews · Op-Eds · News',
    items: [
      ['Marketing365', 'Interview with the author of the first book about AI in the Balkans.', 'https://marketing365.mk/intervju-so-suad-seferi-avtor-na-prvata-kniga-za-veshtacka-inteligencija-na-balkanot/'],
      ['IT Logs', 'Coverage of work on AI adoption and digital transformation.', 'https://itlogs.mk/'],
      ['Inovativnost.mk', 'AI is not a threat to people — but the way it is applied.', 'https://inovativnost.mk/2025/06/21/suad-seferi-veshtachkata-inteligenczija-ne-e-zakana-za-chovekot-tuku-toa-e-nachinot-na-nejzinata-primena'],
      ['Radio MOF', 'Launch of "ВИ Сега" — Platform for AI Education and Ethical Use.', 'https://www.radiomof.mk/vi-sega-lansirana-nova-platforma-za-edukacija-i-etichka-primena-na-veshtachkata-inteligencija/'],
      ['IT.mk', 'AINOW Society — new platform to educate and raise awareness.', 'https://it.mk/vi-sega-nova-platforma-za-edukatsija-i-etichka-primena-na-veshtachkata-inteligentsija/'],
      ['Republika Portal', 'AINOW will put North Macedonia on the AI map.', 'https://republika.mk/zhivot/tehnologija/vi-sega-ke-ja-postavi-makedonija-na-mapata-na-zemji-koi-aktivno-rabotat-na-integraczija-na-veshtachkata-inteligenczija-vo-svoeto-opshtestvo-i-ekonomija/'],
      ['Fokus.mk', 'Digital Identity — Vision or Distant Reality for Macedonia?', 'https://fokus.mk/arhiva-digitalniot-identitet-vizija-ili-dalechna-realnost-za-makedonija/'],
      ['Okno.mk', 'Кој е авторот во доба на вештачка интелигенција?', 'https://okno.mk/node/104785'],
      ['SSNM', 'AI and the Future of the Journalist Profession.', 'https://ssnm.org.mk/komentari/veshtachkata-inteligencija-i-idninata-na-novinarskata-profesija'],
      ['BIRC', 'North Macedonia and the legalization of cryptocurrencies.', 'https://b-irc.org/maqedonia-e-veriut-do-te-legalizoje-kriptovalutat/'],
      ['TRN.mk', 'Creativity vs. Algorithm — panel on responsible AI use.', 'https://trn.mk/kreativnost-vs-algoritam-panel-diskusi%D1%98a-za-odgovornosta-pri-koriste%D1%9Ae-veshtachka-inteligenczi%D1%98a'],
    ]
  }
];

const PROJECTS = [
  {
    kind: 'Platform',
    status: 'Live',
    title: 'AINOW — AI Literacy Platform',
    repo: 'AINOW-Society/edu',
    href: 'https://github.com/AINOW-Society/edu',
    body: 'The first AI literacy platform for teachers and schools across North Macedonia and the region. Structured curriculum, classroom-ready lessons, and practical tools for integrating AI responsibly into education.',
    tags: ['Education', 'Curriculum', 'Open Source', 'Regional'],
    mono: 'monospace-education',
    accent: '#D97757',
  },
  {
    kind: 'Research',
    status: 'In Development',
    title: 'MK-LLM — Macedonian Language Model',
    repo: 'AINOW-Society/MK-LLM',
    href: 'https://github.com/AINOW-Society/MK-LLM',
    body: 'A Macedonian-language LLM trained on curated, pre-processed data — building language-model infrastructure for a community that most frontier models under-serve.',
    tags: ['LLM', 'Macedonian', 'NLP', 'Research'],
    mono: 'monospace-ai-research',
    accent: '#7c9fd9',
  },
];

const PILLARS = [
  ['Strategic Alignment', 'Clarity of AI goals relative to business objectives.'],
  ['Data Maturity', 'Data quality, accessibility, and governance structures.'],
  ['Infrastructure', 'Cloud readiness, compute power, and scalable architecture.'],
  ['Talent & Culture', 'Internal skills, adaptability, and leadership buy-in.'],
  ['Governance & Ethics', 'Risk frameworks, policy, and compliance measures.'],
  ['Budget & Resources', 'Dedicated funding and resource allocation.'],
];

/* ---------- DOM utils ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- Typewriter ---------- */
function typewrite(el, text, speed = 45) {
  el.textContent = '';
  let i = 0;
  const tick = () => {
    if (i >= text.length) return;
    el.textContent = text.slice(0, ++i);
    setTimeout(tick, speed);
  };
  tick();
}

/* ---------- Marquee ---------- */
function mountMarquee() {
  const track = $('#marqueeTrack');
  const parts = [];
  const makeSet = () => MARQUEE_ITEMS.forEach(item => {
    parts.push(`<span>${item}</span><span>•</span>`);
  });
  makeSet(); makeSet(); makeSet(); // triple for seamless scroll
  track.innerHTML = parts.join('');
}

/* ---------- Services ---------- */
function mountServices() {
  const host = $('#svcGrid');
  host.innerHTML = SERVICES.map(([num, tag, title, body]) => `
    <div class="svc-card">
      <span class="eyebrow">${num} / ${tag}</span>
      <h3>${title}</h3>
      <p>${body}</p>
    </div>
  `).join('');
}

/* ---------- Publications ---------- */
function mountBooks() {
  const host = $('#pubs');
  host.innerHTML = BOOKS.map(b => `
    <article class="pub" data-hover="${b.hover}">
      <div style="display:flex; justify-content:flex-start;">
        <div class="pub-cover-wrap">
          <div class="pub-aura" style="background:${b.aura};"></div>
          <div class="pub-cover">
            <div class="pub-face pub-front">
              <img src="${b.cover}" alt="${b.title} cover" loading="lazy"/>
            </div>
            <div class="pub-face pub-spine"></div>
            <div class="pub-pages"></div>
          </div>
        </div>
      </div>
      <div class="pub-body">
        <div class="pub-meta">
          <span class="pill">${b.stage ? 'Research' : 'Book'}</span>
          <span class="eyebrow">${b.year}${b.stage ? ' · ' + b.stage : ''}</span>
          ${b.subtitle ? `<span class="eyebrow" style="text-transform:none; letter-spacing:0; font-family:var(--font-sans); color:var(--fg-muted); font-size:13px;">${b.subtitle}</span>` : ''}
        </div>
        <h3>${b.title}</h3>
        <p>${b.body}</p>
        <div class="pub-links">
          ${b.links.map(([label, href]) => `<a class="ul-link" href="${href}" target="_blank" rel="noopener">${label}</a>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  // Per-book hover color
  $$('.pub').forEach(el => {
    const hover = el.dataset.hover;
    const title = el.querySelector('h3');
    el.addEventListener('mouseenter', () => { title.style.color = hover; });
    el.addEventListener('mouseleave', () => { title.style.color = ''; });
  });
}

/* ---------- Events — chronological CV list, all visible ---------- */
function mountEvents() {
  const host = $('#eventRows');
  // Stamp each event with an index for stagger animations if needed later
  host.innerHTML = EVENTS.map((e, i) => `
    <a class="event-row${e.featured ? ' event-featured' : ''}" href="${e.href}" target="_blank" rel="noopener">
      <div class="event-meta">
        <span class="event-tag">${e.tag}</span>
        <span class="event-org">${e.org}</span>
      </div>
      <div class="event-body">
        <h3>${e.title}<span class="event-arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></span></h3>
        <p>${e.body}</p>
      </div>
    </a>
  `).join('');
}

/* ---------- Media — logo-led outlet strip + tabs ---------- */
function mountMedia() {
  const host = $('#mediaGrid');
  host.innerHTML = `
    <div class="media-tabs" role="tablist">
      ${MEDIA_GROUPS.map((g, i) => `
        <button type="button" role="tab" class="media-tab${i === 0 ? ' active' : ''}" data-tab="${i}" aria-selected="${i === 0}">
          <span class="media-tab-n">0${i + 1}</span>
          <span class="media-tab-title">${g.title}</span>
          <span class="media-tab-count">${g.items.length}</span>
        </button>
      `).join('')}
    </div>
    <div class="media-panels">
      ${MEDIA_GROUPS.map((g, i) => `
        <div class="media-panel${i === 0 ? ' active' : ''}" data-panel="${i}">
          <div class="media-panel-eyebrow"><span class="eyebrow">${g.tag}</span></div>
          <ul class="media-list">
            ${g.items.map(([outlet, title, href]) => `
              <li>
                <a class="media-row" href="${href}" target="_blank" rel="noopener">
                  <span class="media-row-outlet">${outlet}</span>
                  <span class="media-row-title">${title}</span>
                  <span class="media-row-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
                  </span>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;

  const tabs = $$('.media-tab', host);
  const panels = $$('.media-panel', host);
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      const idx = t.dataset.tab;
      tabs.forEach(x => { x.classList.toggle('active', x === t); x.setAttribute('aria-selected', x === t); });
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel === idx));
    });
  });
}

/* ---------- Projects ---------- */
function mountProjects() {
  const host = $('#projects-grid');
  if (!host) return;
  host.innerHTML = PROJECTS.map(p => `
    <a class="project-card" href="${p.href}" target="_blank" rel="noopener" style="--project-accent: ${p.accent};">
      <div class="project-head">
        <div class="project-meta">
          <span class="project-kind">${p.kind}</span>
          <span class="project-status">
            <span class="project-status-dot"></span>
            ${p.status}
          </span>
        </div>
        <div class="project-repo">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          <span>${p.repo}</span>
        </div>
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-body">${p.body}</p>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <div class="project-foot">
        <span class="project-cta">View on GitHub</span>
        <svg class="project-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>
      </div>
    </a>
  `).join('');
}

/* ---------- Readiness radar ---------- */
function mountReadiness() {
  const host = $('#readinessSliders');
  host.innerHTML = PILLARS.map(([name, hint], i) => `
    <div class="slider-row" data-i="${i}">
      <div class="slider-row-label">
        <label>${name}</label>
        <span class="slider-row-value">50%</span>
      </div>
      <div class="slider-wrap">
        <div class="slider-track">
          <div class="slider-fill" style="width:50%;"></div>
          <div class="slider-thumb" style="left:50%;"></div>
        </div>
        <input type="range" min="0" max="100" value="50" aria-label="${name}"/>
      </div>
      <div class="slider-hint">${hint}</div>
    </div>
  `).join('');

  const sliders = $$('.slider-row');
  const vals = new Array(PILLARS.length).fill(50);

  const updateRow = (row, v) => {
    row.querySelector('.slider-row-value').textContent = v + '%';
    row.querySelector('.slider-fill').style.width = v + '%';
    row.querySelector('.slider-thumb').style.left = v + '%';
  };

  const tier = avg => {
    if (avg >= 70) return ['AI Leader', 'Ready for advanced innovation. Focus on ethical leadership and scale.', '#22c55e'];
    if (avg >= 40) return ['Emerging Adopter', 'Foundations in place but lack consistency. Prioritize governance.', '#eab308'];
    return ['Digital Observer', 'Early stage. Focus on education and strategy definition.', '#ef4444'];
  };

  const size = 320, cx = size / 2, cy = size / 2, r = size / 2 - 40;
  const axes = ['STRAT', 'DATA', 'INFRA', 'SKILLS', 'GOV', 'FUND'];
  const radar = $('#radar');

  const drawRadar = () => {
    const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    const [title, desc, color] = tier(avg);
    $('#tierTitle').textContent = title;
    $('#tierDesc').textContent = desc;
    const eyebrow = $('#tierEyebrow');
    eyebrow.textContent = `Assessment Result: ${avg}%`;
    eyebrow.style.color = color;

    const pts = vals.map((v, i) => {
      const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      const rr = (r * v) / 100;
      return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
    });
    const poly = pts.map(p => p.join(',')).join(' ');

    const rings = [1, 2, 3, 4].map(k => {
      const p = axes.map((_, i) => {
        const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        return [cx + Math.cos(a) * r * k / 4, cy + Math.sin(a) * r * k / 4].join(',');
      }).join(' ');
      return `<polygon fill="none" stroke="#27272a" points="${p}"/>`;
    }).join('');

    const axisLines = axes.map((lbl, i) => {
      const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      const x2 = cx + Math.cos(a) * r;
      const y2 = cy + Math.sin(a) * r;
      const tx = cx + Math.cos(a) * (r + 22);
      const ty = cy + Math.sin(a) * (r + 22);
      return `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#27272a"/>
              <text x="${tx}" y="${ty}" fill="#71717a" font-size="9" text-anchor="middle" dominant-baseline="middle" font-family="var(--font-mono)" letter-spacing="1">${lbl}</text>`;
    }).join('');

    const dots = pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#000" stroke="${color}" stroke-width="2"/>`).join('');

    radar.innerHTML = `
      ${rings}
      ${axisLines}
      <polygon points="${poly}" fill="${color}33" stroke="${color}" stroke-width="2"/>
      ${dots}
    `;
  };

  sliders.forEach((row, i) => {
    const input = row.querySelector('input');
    input.addEventListener('input', () => {
      vals[i] = +input.value;
      updateRow(row, vals[i]);
      drawRadar();
    });
  });

  $('#resetReadiness').addEventListener('click', () => {
    sliders.forEach((row, i) => {
      vals[i] = 50;
      row.querySelector('input').value = 50;
      updateRow(row, 50);
    });
    drawRadar();
  });

  drawRadar();
}

/* ---------- Header scroll state + scroll progress ---------- */
function mountScroll() {
  const header = $('#header');
  const bar = $('#scrollbar');
  const btt = $('#backToTop');
  const bttProgress = $('#bttProgress');
  const bttCirc = 131.95; // 2πr, r=21
  const contactEl = document.getElementById('contact');
  const ids = ['about','expertise','publications','speaking','media','ethics','readiness','contact'];
  const links = $$('.nav a, .nav-mobile a');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);

    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? y / h : 0;
    bar.style.width = (pct * 100) + '%';

    // Back-to-top visibility + progress ring
    if (btt) {
      btt.classList.toggle('visible', y > 600);
      // Hide when contact is fully above the fold (avoid clashing with footer)
      if (contactEl) {
        const cRect = contactEl.getBoundingClientRect();
        btt.classList.toggle('hidden-at-end', cRect.top < window.innerHeight * 0.5);
      }
      if (bttProgress) {
        bttProgress.style.strokeDashoffset = bttCirc * (1 - pct);
      }
    }

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.top <= 120 && r.bottom > 120) {
        links.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
        break;
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Back-to-top click
  if (btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onScroll();
}

/* ---------- Nav toggle ---------- */
function mountNavToggle() {
  const toggle = $('#navToggle');
  const mobile = $('#navMobile');
  toggle.addEventListener('click', () => mobile.classList.toggle('open'));
  $$('.nav-mobile a').forEach(a => a.addEventListener('click', () => mobile.classList.remove('open')));
}

/* ---------- Email copy ---------- */
function mountContact() {
  const btn = $('#emailCopy');
  const toast = $('#toast');
  const toastTitle = $('#toastTitle');
  const toastSub = $('#toastSub');

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('suad@ctrlab.net');
      btn.classList.add('copied');
      toastTitle.textContent = 'Email copied';
      toastSub.textContent = 'suad@ctrlab.net';
      toast.classList.add('show');
      setTimeout(() => { btn.classList.remove('copied'); toast.classList.remove('show'); }, 2200);
    } catch {
      window.location.href = 'mailto:suad@ctrlab.net';
    }
  });

  $('#bookBtn').addEventListener('click', () => {
    toastTitle.textContent = 'Opening calendar';
    toastSub.textContent = 'outlook.office365.com';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  typewrite($('#heroType'), 'Artificial Intelligence & Strategy');
  mountMarquee();
  mountServices();
  mountBooks();
  mountEvents();
  mountMedia();
  mountProjects();
  mountReadiness();
  mountScroll();
  mountNavToggle();
  mountContact();
});
