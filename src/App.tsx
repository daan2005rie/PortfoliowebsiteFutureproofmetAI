/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ExternalLink, Menu, Sparkles, X } from 'lucide-react';

type Page = 'home' | 'over-mij' | 'mijn-ai-app' | 'research-story-ai-blog' | 'bewijs';

const navigation: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'over-mij', label: 'Over mij' },
  { id: 'bewijs', label: 'Mijn bewijs' },
];

const evidenceGroups = [
  {
    title: '[VOEG HIER EEN LEERUITKOMST TOE]',
    description: '[KORTE UITLEG VAN DEZE LEERUITKOMST]',
    evidence: [
      { title: '[TITEL VAN MIJN BEWIJS]', description: '[KORTE BESCHRIJVING VAN MIJN BEWIJS]', url: 'https://voorbeeld.nl/vervang-dit-met-jouw-link' },
      { title: '[NOG EEN BEWIJS]', description: '[KORTE BESCHRIJVING VAN MIJN BEWIJS]', url: 'https://voorbeeld.nl/vervang-dit-met-jouw-link' },
    ],
  },
  {
    title: '[VOEG HIER EEN TWEEDE LEERUITKOMST TOE]',
    description: '[KORTE UITLEG VAN DEZE LEERUITKOMST]',
    evidence: [{ title: '[TITEL VAN MIJN BEWIJS]', description: '[KORTE BESCHRIJVING VAN MIJN BEWIJS]', url: 'https://voorbeeld.nl/vervang-dit-met-jouw-link' }],
  },
];

function getPageFromPath(): Page {
  const path = window.location.pathname.replace(/^\//, '');
  const validPages: Page[] = [...navigation.map((item) => item.id), 'mijn-ai-app', 'research-story-ai-blog'];
  return validPages.includes(path as Page) ? (path as Page) : 'home';
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromPath);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => setPage(getPageFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (nextPage: Page) => {
    window.history.pushState({}, '', nextPage === 'home' ? '/' : `/${nextPage}`);
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <button className="brand" onClick={() => navigate('home')} aria-label="Ga naar Home">
            <span className="brand-mark"><Sparkles size={17} /></span>
            <span><strong>Daan Rietveld</strong><small>Futureproof met AI!</small></span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu openen">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Hoofdnavigatie">
            {navigation.map((item) => (
              <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => navigate(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container page-content">
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'over-mij' && <AboutPage />}
        {page === 'mijn-ai-app' && <AIAppPage navigate={navigate} />}
        {page === 'research-story-ai-blog' && <ResearchStoryPage navigate={navigate} />}
        {page === 'bewijs' && <EvidencePage navigate={navigate} />}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>Portfolio van Daan Rietveld</span>
          <span>Minor Futureproof met AI!</span>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <section className="hero section-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Persoonlijk portfolio</p>
          <h1>Mijn route naar een <em>futureproof</em> toekomst.</h1>
          <p className="intro">Ik ben Daan Rietveld, HBO-student en deelnemer aan de minor <strong>Futureproof met AI!</strong> In dit portfolio verzamel ik mijn werk, onderzoeken en leerproces.</p>
          <div className="button-row">
            <button className="button button-primary" onClick={() => navigate('bewijs')}>Bekijk mijn bewijs <ArrowRight size={17} /></button>
            <button className="text-button" onClick={() => navigate('over-mij')}>Meer over mij <ArrowRight size={16} /></button>
          </div>
        </div>
        <div className="photo-placeholder reveal delay-one">
          <img src="/assets/aistudio/IMG_1770.JPG" alt="Portret van Daan Rietveld" className="profile-photo" />
        </div>
      </section>
      <section className="home-strip">
        <div><span className="number">01</span><h2>Wie ik ben</h2><p>Een korte introductie over mij als student en persoon.</p></div>
        <div><span className="number">02</span><h2>Mijn verhaal</h2><p>Mijn ervaringen, talenten, passies en ambities.</p></div>
        <div><span className="number">03</span><h2>Mijn bewijs</h2><p>Een overzichtelijke plek voor mijn bewijzen per leeruitkomst.</p></div>
      </section>
    </>
  );
}

function AboutPage() {
  const sections = [
    ['Wie ben ik?', 'Ik ben een enthousiaste en nieuwsgierige student Commerciële Economie met een sterke interesse in marketing en e-commerce. Ik ben gemotiveerd om mezelf te ontwikkelen en ben benieuwd naar wat de praktijk van het bedrijfsleven mij kan leren. Ik werk graag samen met anderen en vind het leuk om met gemotiveerde mensen nieuwe ideeën uit te wisselen en van elkaar te leren. Ik ben sociaal ingesteld en sta altijd klaar om nieuwe uitdagingen aan te gaan.'],
    ['Mijn opleiding', 'In 2024 ben ik gestart met de opleiding Commerciële Economie. Tijdens mijn studie merkte ik al snel dat mijn interesses vooral liggen bij marketing en e-commerce. Ik vind het interessant om na te denken over de behoeften van consumenten en creatieve oplossingen te bedenken voor verschillende vraagstukken. In mijn eerste studiejaar heb ik mijn propedeuse behaald en inmiddels heb ik ook mijn tweede jaar afgerond.'],
    ['Mijn minor', 'Sinds september 2026 volg ik de minor Futureproof met AI. Deze minor sprak mij direct aan, omdat ik verwacht dat AI een steeds grotere rol gaat spelen binnen mijn toekomstige werkveld. Ik wil daarom niet alleen begrijpen wat AI kan betekenen voor marketing, maar vooral leren hoe ik AI op een slimme, verantwoordelijke en praktische manier kan toepassen.'],
    ['Mijn ontwikkeling', 'Met deze minor wil ik mezelf verder ontwikkelen en de AI-vaardigheden opbouwen die ik in mijn toekomstige carrière nodig heb. Ik ben benieuwd waar deze ontwikkeling mij brengt en welke nieuwe mogelijkheden AI mij in de toekomst kan bieden.'],
  ];
  return <PageIntro eyebrow="Over mij" title="De persoon achter dit portfolio." intro="Dit is mijn persoonlijke ruimte. Hier vertel ik wie ik ben, wat mij drijft en waar ik naartoe wil." >
    <div className="about-layout">
      <div className="about-photo photo-placeholder">
        <img src="/assets/aistudio/IMG_1770.JPG" alt="Portret van Daan Rietveld" className="profile-photo" />
      </div>
      <div className="about-sections">{sections.map(([title, text]) => <section className="content-block" key={title}><p className="block-label">{title}</p><p>{text}</p></section>)}</div>
    </div>
  </PageIntro>;
}

const aiAppFeatures = [
  {
    title: 'Stories',
    description: 'Ik kan verschillende Stories in de app plaatsen en per Story mijn voortgang bijhouden.',
  },
  {
    title: 'Acceptatiecriteria',
    description: 'Bij een Story kan ik de bijbehorende acceptatiecriteria bijhouden en zien welke onderdelen al zijn behaald.',
  },
  {
    title: 'Kwaliteitscriteria',
    description: 'Ik kan reflecteren op de kwaliteit van mijn werk en controleren of ik aan de bijbehorende criteria voldoe.',
  },
  {
    title: 'Dagelijkse vragen',
    description: 'De app stelt mij dagelijks vijf vragen over mijn Story om mijn voortgang en mijn doel te evalueren.',
  },
  {
    title: 'Spreuk van de dag',
    description: 'De app genereert een dagelijkse spreuk met Google Gemini en ik kan een nieuwe spreuk laten genereren.',
  },
];

const aiTechStack = [
  'Google AI Studio',
  'Gemini API',
  '[VOEG EVENTUELE ANDERE TECHNOLOGIEËN TOE DIE IK HEB GEBRUIKT]',
];

function AIAppPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <PageIntro
      eyebrow="Mijn AI-app"
      title="Mijn AI-app – van Learning Story naar werkende applicatie"
      intro="Deze pagina laat zien hoe ik vanuit mijn Learning Story een praktische AI-app heb gebouwd. Het gaat om een digitaal notitieblok voor mijn Stories, waarin ik mijn voortgang, criteria en reflectie bij kan houden."
    >
      <section className="ai-app-section">
        <div className="ai-app-hero-grid">
          <div className="story-box">
            <p className="section-kicker">Mijn Learning Story</p>
            <p>Als toekomstig AI-specialist,</p>
            <p>wil ik leren hoe ik AI-apps kan bouwen met Google AI Studio en de Gemini API,</p>
            <p>zodat ik praktische AI-toepassingen (zoals een Story generator) kan ontwikkelen (LU 2 &amp; LU 4).</p>
          </div>

          <div className="image-panel">
            <img src="/assets/aistudio/Schermafbeelding AI App.png" alt="Schermafbeelding van mijn AI-app" className="app-screenshot" />
          </div>
        </div>
      </section>

      <section className="ai-app-section">
        <div className="section-heading-block">
          <p className="section-kicker">Het product</p>
          <h2>Wat heb ik gebouwd?</h2>
        </div>
        <p className="lead-copy">
          Ik heb met Google AI Studio een AI-app gebouwd die als een digitaal notitieblok en dagboek werkt. De app is bedoeld om mijn verschillende Stories overzichtelijk bij te houden en mijn voortgang daarin te volgen.
        </p>
        <div className="feature-grid">
          {aiAppFeatures.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <p className="feature-label">{feature.title}</p>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-app-section">
        <div className="section-heading-block">
          <p className="section-kicker">Gebruikte technologie</p>
          <h2>Google AI Studio en Gemini API</h2>
        </div>
        <ul className="tech-list">
          {aiTechStack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="ai-app-section">
        <div className="section-heading-block">
          <p className="section-kicker">Mijn leerproces</p>
          <h2>Wat heb ik geleerd?</h2>
        </div>
        <p className="lead-copy">
          Tijdens het bouwen ontdekte ik hoe belangrijk het is om een duidelijke gebruikersflow te ontwerpen en een AI-functie op een nuttige manier in te bouwen. Ik heb geleerd hoe Google AI Studio en de Gemini API kunnen helpen om een app slimmer en persoonlijker te maken.
        </p>
        <div className="note-box">
          <p>[BESCHRIJF HIER WAT IK HEB GELEERD]</p>
        </div>
      </section>

      <section className="ai-app-section">
        <div className="section-heading-block">
          <p className="section-kicker">Reflectie</p>
          <h2>Wat ging goed, wat vond ik lastig en wat zou ik anders doen?</h2>
        </div>
        <div className="reflection-grid">
          <article className="reflection-card">
            <h3>Wat ging goed?</h3>
            <p>[MIJN REFLECTIE]</p>
          </article>
          <article className="reflection-card">
            <h3>Wat vond ik lastig?</h3>
            <p>[BESCHRIJF HIER WAT IK LASTIG VOND]</p>
          </article>
          <article className="reflection-card">
            <h3>Wat zou ik de volgende keer anders doen?</h3>
            <p>[VOEG HIER MIJN REFLECTIE TOE]</p>
          </article>
        </div>
      </section>

      <section className="ai-app-section">
        <div className="section-heading-block">
          <p className="section-kicker">Bewijs</p>
          <h2>Mijn echte bewijs</h2>
        </div>
        <div className="proof-links">
          <a href="https://voorbeeld.nl/vervang-dit-met-jouw-link" target="_blank" rel="noreferrer">
            Bekijk de AI-app <ExternalLink size={15} />
          </a>
          <a href="https://github.com/daan2005rie" target="_blank" rel="noreferrer">
            Bekijk de code <ExternalLink size={15} />
          </a>
          <a href="https://voorbeeld.nl/vervang-dit-met-jouw-link" target="_blank" rel="noreferrer">
            Bekijk aanvullende documentatie <ExternalLink size={15} />
          </a>
        </div>
      </section>

      <div className="back-link-row">
        <button className="text-button" onClick={() => navigate('bewijs')}>← Terug naar mijn bewijs</button>
      </div>
    </PageIntro>
  );
}

const researchStoryText = 'Als B2C online marketeer, wil ik de impact (kansen, bedreigingen en ethische aspecten) van AI op mijn werkveld analyseren en de benodigde skills in kaart brengen, zodat ik een onderbouwde basis heb om te bepalen welke AI-toepassingen waarde toevoegen en welke vaardigheden ik moet ontwikkelen. (LU 1 & LU 3).';

const aiBlogSections = [
  {
    paragraphs: [
      'Generatieve AI is in korte tijd uitgegroeid tot een belangrijk hulpmiddel voor marketeers. Met programma’s zoals ChatGPT, beeldgeneratoren en AI-tools voor video kunnen organisaties sneller teksten, afbeeldingen, advertenties en campagnes maken. Toch betekent dit niet dat de Social Media Marketeer overbodig wordt. Het beroep verandert vooral: minder tijd gaat naar uitvoerend productiewerk en meer naar strategie, controle, creativiteit en contact met doelgroepen.',
      'Een van de duidelijkste veranderingen is de manier waarop marketingcontent wordt gemaakt. Waar een marketeer vroeger vanaf nul een bericht, blog of advertentie schreef, kan AI in enkele seconden een eerste versie produceren. De marketeer geeft bijvoorbeeld een onderwerp, doelgroep, tone of voice en marketingdoel op. De AI kan vervolgens verschillende captions, advertentieteksten of ideeën voor een video maken. Ook afbeeldingen en video’s kunnen met AI worden gegenereerd of bewerkt. Daardoor kunnen campagnes gemakkelijker worden aangepast voor verschillende doelgroepen, talen en sociale-mediaplatforms.',
      'Onderzoek van Gastmann en Bastos naar generatieve AI in social media marketing laat zien dat ChatGPT kan helpen bij het ontwikkelen van marketingstrategieën. AI kan volgens dit onderzoek bijdragen aan productiviteit en strategische flexibiliteit. Tegelijkertijd blijven privacy, auteursrecht en ethiek belangrijke aandachtspunten.',
    ],
    links: [{ label: 'Onderzoek van Gastmann en Bastos', url: 'https://openaccess.city.ac.uk/id/eprint/35385/' }],
  },
  {
    paragraphs: [
      'AI verandert vooral taken die repetitief en voorspelbaar zijn. Het systeem kan helpen bij het schrijven van eerste teksten, het bedenken van contentideeën, het vertalen van berichten en het maken van verschillende versies van een advertentie. Ook kan AI reacties van klanten samenvatten, sentiment herkennen en gegevens over bereik, interactie en conversies analyseren. Hierdoor hoeft een Social Media Marketeer minder tijd te besteden aan handmatig schrijf-, analyse- en opmaakwerk.',
      'Ook klantenservice en communitymanagement veranderen. AI kan veelgestelde vragen herkennen en een eerste antwoord voorstellen. Het kan bovendien analyseren of reacties positief, neutraal of negatief zijn. Bij ingewikkelde klachten, gevoelige onderwerpen en crisissituaties blijft menselijke beoordeling noodzakelijk. Het UWV beschrijft dat AI taken gedeeltelijk kan overnemen, maar ook nieuwe eisen stelt aan werknemers. Vooral digitale vaardigheden, kritisch denken, communicatie en ethisch bewustzijn worden belangrijker.',
    ],
    links: [{ label: 'UWV: AI biedt kansen en bedreigingen voor de arbeidsmarkt', url: 'https://www.uwv.nl/nl/arbeidsmarktinformatie/trends-ontwikkelingen/ai-biedt-kansen-en-bedreigingen-voor-de-arbeidsmarkt' }],
  },
  {
    paragraphs: [
      'De marketeer blijft verantwoordelijk voor de uiteindelijke content. AI kan namelijk fouten maken, informatie verzinnen of een tekst schrijven die niet bij een merk past. Een bericht kan grammaticaal correct zijn, maar toch ongevoelig, oppervlakkig of misleidend overkomen. Daarom moet de marketeer AI-uitvoer controleren op juistheid, toon, doelgroep, merkidentiteit en wettelijke regels. Onderzoek naar de toekomst van marketing benadrukt dat menselijke controle belangrijk blijft, vooral bij communicatie met grote reputatierisico’s.',
      'Marketing wordt door AI bovendien steeds meer een continu proces. AI kan verschillende teksten, beelden en doelgroepen met elkaar vergelijken en aangeven welke variant het beste presteert. Campagnes kunnen daardoor sneller worden aangepast. Dit betekent dat Social Media Marketeers niet alleen creatief moeten zijn, maar ook data moeten kunnen begrijpen. Zij moeten kunnen beoordelen waarom een bericht succesvol is en hoe een campagne verbeterd kan worden.',
    ],
    links: [{ label: 'Onderzoek naar de toekomst van marketing', url: 'https://link.springer.com/article/10.1007/s11747-024-01064-3' }],
  },
  {
    paragraphs: [
      'De voordelen van AI zijn groot. Marketingteams kunnen sneller werken, meer contentvarianten maken en campagnes beter personaliseren. Ook kleinere organisaties krijgen toegang tot professionele hulpmiddelen. Toch bestaan er risico’s. Wanneer iedereen dezelfde AI-tools gebruikt, kan online content steeds meer op elkaar lijken. Daarnaast zijn er zorgen over nepbeelden, auteursrecht, privacy en het verlies van authenticiteit. Als consumenten het gevoel krijgen dat alle berichten automatisch en onpersoonlijk zijn gemaakt, kan hun vertrouwen afnemen.',
      'Daarom worden transparantie en regelgeving belangrijker. Binnen de Europese Unie gelden vanaf 2 augustus 2026 transparantieverplichtingen uit de AI Act voor bepaalde AI-systemen en AI-gegenereerde content. Marketeers moeten dus niet alleen creatief en technisch vaardig zijn, maar ook weten hoe zij verantwoord met AI omgaan.',
      'Ethisch omgaan met AI betekent voor mij dat snelheid nooit belangrijker mag worden dan betrouwbaarheid en menselijke aandacht. Een marketeer moet duidelijk blijven over het gebruik van AI, zorgvuldig omgaan met persoonsgegevens en controleren of content eerlijk, inclusief en passend is voor de doelgroep. Ook moet iemand verantwoordelijkheid nemen wanneer een AI-uitkomst schade veroorzaakt of misleidend blijkt. Transparantie helpt consumenten om berichten kritisch te beoordelen, terwijl menselijke controle nodig blijft bij gevoelige onderwerpen. Daarom zie ik AI als hulpmiddel, niet als vervanging van professioneel oordeel, creativiteit en verantwoordelijkheid binnen marketing en communicatie, voor mens en maatschappij op de lange termijn.',
      'AI zal de marketingwereld waarschijnlijk niet volledig zonder mensen maken. Vooral uitvoerende taken worden geautomatiseerd of versneld. De menselijke rol verschuift naar strategie, creativiteit, controle en het opbouwen van vertrouwen. De Social Media Marketeer van de toekomst is daarom geen concurrent van AI, maar een professional die AI goed kan aansturen. De belangrijkste vraag wordt niet of AI content kan maken, maar of die content relevant, betrouwbaar, menselijk en passend is voor de doelgroep.',
    ],
    links: [{ label: 'Europese Commissie: AI Act en transparantie', url: 'https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content' }],
  },
];

const aiSkills = [
  ['AI-geletterdheid', 'Een marketeer moet begrijpen hoe generatieve AI werkt, welke tools geschikt zijn voor tekst, beeld, video en analyse, en welke beperkingen deze tools hebben. Het gaat niet om programmeren, maar om AI verstandig en doelgericht gebruiken.'],
  ['Kritisch beoordelen en controleren', 'AI kan fouten, verzonnen informatie en vooroordelen produceren. Daarom moet een marketeer AI-output controleren op feiten, volledigheid, betrouwbaarheid, merkidentiteit en mogelijke risico’s.'],
  ['Analytisch en datagedreven denken', 'Marketeers moeten data kunnen interpreteren en begrijpen waarom bepaalde content goed of slecht presteert. Analytisch denken blijft volgens het World Economic Forum een van de belangrijkste vaardigheden voor werkgevers.'],
  ['Creatief en strategisch denken', 'AI kan snel veel ideeën en contentvarianten produceren, maar de marketeer moet bepalen welke boodschap origineel, relevant en passend is voor de doelgroep. Creatief denken blijft daarom belangrijk, juist omdat veel automatisch gemaakte content op elkaar kan lijken.'],
  ['Communicatie, samenwerking en aanpassingsvermogen', 'Een marketeer moet goed kunnen samenwerken met collega’s én met AI-systemen. Ook moet hij of zij kunnen omgaan met snel veranderende tools, platformen en algoritmes. Communicatieve vaardigheden, flexibiliteit en leervermogen worden daardoor steeds belangrijker.'],
];

const aiBlogSources = [
  ['Europese Commissie. (2026).', 'Code of practice on transparency of AI-generated content.', 'https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content'],
  ['Frankwatching. (2025).', 'Social media in 2025: 12 belangrijke trends.', 'https://www.frankwatching.com/archive/2024/12/03/social-media-2025-12-trends/'],
  ['Gastmann, J., & Bastos, M. (2025).', 'Strategising with generative AI: Productivity gains in social media marketing. Journal of Marketing Communications.', 'https://doi.org/10.1080/13527266.2025.2525913'],
  ['Grewal, D., Satornino, C. B., Davenport, T., & Guha, A. (2025).', 'How generative AI is shaping the future of marketing. Journal of the Academy of Marketing Science, 53(3), 702–722.', 'https://doi.org/10.1007/s11747-024-01064-3'],
  ['HubSpot. (2024).', 'The State of Marketing 2024. HubSpot.', 'https://www.hubspot.com/hubfs/2024%20State%20of%20Marketing%20Report/2024-State-of-Marketing-HubSpot-CXDstudio-FINAL.pdf'],
  ['McKinsey & Company. (2023).', 'The economic potential of generative AI: The next productivity frontier.', 'https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/the%20economic%20potential%20of%20generative%20ai%20the%20next%20productivity%20frontier/the-economic-potential-of-generative-ai-the-next-productivity-frontier.pdf'],
  ['Pokhrel, S., & Somasiri, N. (2026).', 'Generative AI and customer engagement in digital marketing: A systematic review and evidence map of affective vs. behavioral outcomes, disclosure effects, and human-in-the-loop moderation. Emerging Media.', 'https://doi.org/10.1177/27523543261461786'],
  ['UWV. (2025).', 'Op weg naar AI die werkt voor iedereen.', 'https://www.uwv.nl/assets/files/2189148b-b975-475a-987f-e307bfeeae54/Op_weg_naar_AI_die_werkt_voor_iedereen_DEF.pdf'],
  ['World Economic Forum. (2025).', 'The Future of Jobs Report 2025.', 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/'],
  ['Frankwatching. (2025).', 'Instagram- en TikTok-trends 2026: Social search, AI-labeling & meer.', 'https://www.frankwatching.com/archive/2025/11/07/trends-instagram-tiktok-social-search-ai/'],
];

function ResearchStoryPage({ navigate }: { navigate: (page: Page) => void }) {
  return <PageIntro eyebrow="Research Story" title="AI verandert de marketingwereld" intro="Voor deze Research Story heb ik een AI-blog geschreven over de impact van AI op het werkveld van een B2C online marketeer.">
    <section className="research-section research-story-quote">
      <div className="research-section-heading"><p className="section-kicker">Research Story</p><span className="learning-outcome-badge">LU 1 &amp; LU 3</span></div>
      <p>{researchStoryText}</p>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Mijn bewijs</p><h2>AI-blog</h2></div>
      <p className="lead-copy">Voor deze Research Story heb ik een AI-blog geschreven waarin ik onderzoek doe naar de impact van AI op het werkveld van een B2C online marketeer.</p>
      <div className="blog-content">
        {aiBlogSections.map((section, index) => <div className="blog-section" key={index}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="source-links">{section.links.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label} <ExternalLink size={14} /></a>)}</div></div>)}
      </div>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Top 5 AI-skills</p><h2>Belangrijkste AI-skills</h2></div>
      <div className="skills-list">{aiSkills.map(([title, description]) => <article className="skill-row" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="research-section reflection-section">
      <div className="section-heading-block"><p className="section-kicker">Reflectie</p><h2>Wat neem ik mee?</h2></div>
      <div className="reflection-list">
        <article><h3>Wat heb ik onderzocht?</h3><p>[BESCHRIJF HIER KORT WAT IK HEB ONDERZOCHT]</p></article>
        <article><h3>Wat heb ik geleerd?</h3><p>[BESCHRIJF HIER WAT IK HEB GELEERD]</p></article>
        <article><h3>Wat betekent dit voor mij als toekomstig B2C online marketeer?</h3><p>[BESCHRIJF HIER WAT DIT VOOR MIJ BETEKENT]</p></article>
        <article><h3>Reflectie op mijn Research Story</h3><p>[VOEG HIER MIJN PERSOONLIJKE REFLECTIE TOE]</p></article>
      </div>
    </section>

    <section className="research-section sources-section">
      <div className="section-heading-block"><p className="section-kicker">Bronnen</p><h2>Bronnenlijst volgens APA 7</h2></div>
      <ol className="sources-list">{aiBlogSources.map(([author, title, url]) => <li key={url}><span>{author} <em>{title}</em> </span><a href={url} target="_blank" rel="noreferrer">{url}</a></li>)}</ol>
    </section>

    <div className="back-link-row"><button className="text-button" onClick={() => navigate('bewijs')}>← Terug naar mijn bewijs</button></div>
  </PageIntro>;
}

function EvidencePage({ navigate }: { navigate: (page: Page) => void }) {
  const compactAiAppCard = {
    title: 'Mijn AI-app',
    description: 'Van Learning Story naar werkende applicatie met Google AI Studio en Gemini API.',
    detailPage: true,
  };

  return <PageIntro eyebrow="Mijn bewijs" title="Leren door te doen, delen en onderbouwen." intro="Op deze pagina verzamel ik de bewijzen waarmee ik mijn behaalde leeruitkomsten aantoon. Grote bestanden staan extern en worden hier gelinkt.">
    <div className="evidence-notice"><strong>Praktische afspraak</strong><span>Gebruik bijvoorbeeld OneDrive voor documenten en YouTube voor video’s. Zo blijven grote bestanden buiten GitHub en Vercel.</span></div>
    <div className="evidence-list">
      <section className="evidence-group">
        <div className="group-heading">
          <span className="number">LU</span>
          <div>
            <h2>LU 2 &amp; LU 4</h2>
            <p>Praktisch AI-onderzoek en ontwikkeling van een werkende applicatie.</p>
          </div>
        </div>

        <div className="evidence-cards compact-evidence-cards">
          <article className="evidence-card evidence-card-compact">
            <div>
              <h3>{compactAiAppCard.title}</h3>
              <p>{compactAiAppCard.description}</p>
            </div>
            <button className="evidence-link evidence-button" onClick={() => navigate('mijn-ai-app')}>
              Bekijk verhaal <ExternalLink size={15} />
            </button>
          </article>
        </div>
      </section>

      <section className="evidence-group">
        <div className="group-heading">
          <span className="number">LU</span>
          <div>
            <h2>LU 1 &amp; LU 3</h2>
            <p>Research Story over de impact van AI op het werkveld van een B2C online marketeer.</p>
          </div>
        </div>
        <div className="evidence-cards compact-evidence-cards">
          <article className="evidence-card evidence-card-compact">
            <div>
              <h3>AI-blog: AI verandert de marketingwereld</h3>
              <p>Mijn AI-blog als bewijs voor deze Research Story.</p>
            </div>
            <button className="evidence-link evidence-button" onClick={() => navigate('research-story-ai-blog')}>
              Bekijk Research Story <ExternalLink size={15} />
            </button>
          </article>
        </div>
      </section>

      {evidenceGroups.map((group) => <section className="evidence-group" key={group.title}><div className="group-heading"><span className="number">LU</span><div><h2>{group.title}</h2><p>{group.description}</p></div></div><div className="evidence-cards">{group.evidence.map((item) => <article className="evidence-card" key={item.title}><div><h3>{item.title}</h3><p>{item.description}</p></div><a className="evidence-link" href={item.url} target="_blank" rel="noreferrer">Bekijk bewijs <ExternalLink size={15} /></a></article>)}</div></section>)}
    </div>
  </PageIntro>;
}

function PageIntro({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <><section className="page-intro reveal"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}</h1><p className="intro">{intro}</p></section><div className="page-body reveal delay-one">{children}</div></>;
}

export default App;
