/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ExternalLink, Menu, Sparkles, X } from 'lucide-react';

type Page = 'home' | 'over-mij' | 'mijn-ai-app' | 'research-story-ai-blog' | 'ai-onderzoek' | 'supabase-blog' | 'bewijs';
type EvidenceStory = {
  sprint: number;
  learningOutcomes: number[];
  title: string;
  description: string;
  evidenceTitle: string;
  evidenceDescription: string;
  actionLabel: string;
  page: Page;
};

const navigation: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'over-mij', label: 'Over mij' },
  { id: 'bewijs', label: 'Mijn bewijs' },
];

const evidenceStories: EvidenceStory[] = [
  {
    sprint: 1,
    learningOutcomes: [2, 4],
    title: 'Mijn AI-app: van Learning Story naar werkende applicatie',
    description: 'Praktisch AI-onderzoek en ontwikkeling van een werkende applicatie.',
    evidenceTitle: 'Mijn AI-app',
    evidenceDescription: 'Van Learning Story naar werkende applicatie met Google AI Studio en Gemini API.',
    actionLabel: 'Bekijk verhaal',
    page: 'mijn-ai-app',
  },
  {
    sprint: 1,
    learningOutcomes: [1, 3],
    title: 'AI verandert de marketingwereld',
    description: 'Research Story over de impact van AI op het werkveld van een B2C online marketeer.',
    evidenceTitle: 'AI-blog: AI verandert de marketingwereld',
    evidenceDescription: 'Mijn AI-blog als bewijs voor deze Research Story.',
    actionLabel: 'Bekijk Research Story',
    page: 'research-story-ai-blog',
  },
  {
    sprint: 1,
    learningOutcomes: [1, 3],
    title: 'AI-onderzoek: leren onderzoeken met AI',
    description: 'Mijn aanpak om AI als startpunt voor onderzoek te gebruiken en informatie in oorspronkelijke bronnen te controleren.',
    evidenceTitle: 'Mijn onderzoeksaanpak',
    evidenceDescription: 'Gestructureerde prompts, bronverificatie en APA-documentatie voor onderzoek naar AI in B2C marketing.',
    actionLabel: 'Bekijk Learning Story',
    page: 'ai-onderzoek',
  },
  {
    sprint: 2,
    learningOutcomes: [1, 2, 3, 4, 5],
    title: 'Mijn portfolio koppelen aan Supabase',
    description: 'Een blog over het dynamisch tonen van portfolio-projecten en bewijsstukken met Supabase.',
    evidenceTitle: 'Supabase-blog',
    evidenceDescription: 'Mijn leerproces rond databasekoppeling, dynamische portfolio-inhoud en bewijs per leeruitkomst.',
    actionLabel: 'Lees blog',
    page: 'supabase-blog',
  },
];

function getPageFromPath(): Page {
  const path = window.location.pathname.replace(/^\//, '');
  const validPages: Page[] = [...navigation.map((item) => item.id), 'mijn-ai-app', 'research-story-ai-blog', 'ai-onderzoek', 'supabase-blog'];
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
        {page === 'ai-onderzoek' && <AIResearchStoryPage navigate={navigate} />}
        {page === 'supabase-blog' && <SupabasePortfolioStoryPage navigate={navigate} />}
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
      </section>

      <section className="ai-app-section">
        <div className="section-heading-block">
          <p className="section-kicker">Bewijs</p>
          <h2>Bekijk mijn code</h2>
        </div>
        <div className="proof-links">
          <a href="https://github.com/daan2005rie" target="_blank" rel="noreferrer">
            GitHub <ExternalLink size={15} />
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
      'Generatieve AI is in korte tijd uitgegroeid tot een krachtig hulpmiddel voor marketeers. Met tools zoals ChatGPT, beeldgeneratoren en AI-software voor video kunnen teams sneller teksten, beelden, advertenties en campagnes maken. Maar dat betekent niet dat de Social Media Marketeer overbodig wordt. De rol verschuift juist: minder tijd gaat naar routineus productiewerk en meer naar strategie, creativiteit, controle en menselijke contact met de doelgroep.',
      'Een van de duidelijkste veranderingen is de manier waarop content wordt gemaakt. Waar een marketeer vroeger vanuit nul een bericht, blog of advertentie schreef, kan AI nu in een paar seconden een eerste versie genereren. De marketeer geeft daarbij een onderwerp, doelgroep, toon en doelstelling op. De AI produceert vervolgens verschillende captions, advertentieteksten of video-ideeën. Daardoor kun je sneller experimenteren met meerdere varianten en doelgroepen, zonder steeds opnieuw vanaf nul te beginnen.',
      'Onderzoek van Gastmann en Bastos naar generatieve AI in social media marketing laat zien dat ChatGPT kan helpen bij het ontwikkelen van marketingstrategieën. AI kan bijdragen aan productiviteit en strategische flexibiliteit, maar privacy, auteursrecht en ethiek blijven daarbij belangrijke aandachtspunten.',
    ],
    links: [{ label: 'Onderzoek van Gastmann en Bastos', url: 'https://openaccess.city.ac.uk/id/eprint/35385/' }],
  },
  {
    paragraphs: [
      'AI verandert vooral taken die repetitief en voorspelbaar zijn. Het systeem kan helpen bij het schrijven van eerste concepten, het bedenken van contentideeën, het vertalen van berichten en het maken van verschillende versies van een advertentie. Ook kan AI reacties van klanten samenvatten, sentiment herkennen en data over bereik, interactie en conversie analyseren. Daardoor hoeft een Social Media Marketeer minder tijd te steken in handmatig schrijf-, analyse- en opmaakwerk.',
      'Ook klantenservice en communitymanagement veranderen. AI kan veelgestelde vragen herkennen en een eerste antwoord voorstellen. Daarnaast kan het analyseren of reacties positief, neutraal of negatief zijn. Bij ingewikkelde klachten, gevoelige onderwerpen en crisissituaties blijft menselijke beoordeling nodig. Het UWV beschrijft dat AI taken deels kan overnemen, maar ook nieuwe eisen stelt aan werknemers. Vooral digitale vaardigheden, kritisch denken, communicatie en ethisch bewustzijn worden belangrijker.',
    ],
    links: [{ label: 'UWV: AI biedt kansen en bedreigingen voor de arbeidsmarkt', url: 'https://www.uwv.nl/nl/arbeidsmarktinformatie/trends-ontwikkelingen/ai-biedt-kansen-en-bedreigingen-voor-de-arbeidsmarkt' }],
  },
  {
    paragraphs: [
      'De marketeer blijft verantwoordelijk voor de uiteindelijke content. AI kan fouten maken, informatie verzinnen of teksten schrijven die niet passen bij een merk of doelgroep. Een bericht kan grammaticaal correct zijn, maar toch ongevoelig, oppervlakkig of misleidend overkomen. Daarom moet de marketeer AI-output zorgvuldig controleren op juistheid, toon, doelgroep, merkidentiteit en wettelijke regels. Onderzoek naar de toekomst van marketing benadrukt dat menselijke controle belangrijk blijft, vooral bij communicatie met grote reputatierisico’s.',
      'Marketing wordt door AI bovendien steeds meer een continu proces. AI kan meerdere varianten van teksten, beelden en doelgroepbenaderingen vergelijken en aangeven welke optie het beste presteert. Campagnes kunnen daardoor sneller worden aangepast. Dat betekent dat Social Media Marketeers niet alleen creatief moeten zijn, maar ook analytisch denken en data kunnen interpreteren. Zij moeten kunnen beoordelen waarom een bericht werkt en hoe een campagne kan verbeteren.',
    ],
    links: [{ label: 'Onderzoek naar de toekomst van marketing', url: 'https://link.springer.com/article/10.1007/s11747-024-01064-3' }],
  },
  {
    paragraphs: [
      'De voordelen van AI zijn groot. Marketingteams kunnen sneller werken, meer contentvarianten maken en campagnes beter personaliseren. Ook kleinere organisaties krijgen toegang tot geavanceerde hulpmiddelen die voorheen alleen grotere teams hadden. Toch bestaan er ook risico’s. Wanneer iedereen dezelfde AI-tools gebruikt, kan online content steeds meer op elkaar gaan lijken. Daarnaast zijn er zorgen over nepbeelden, auteursrecht, privacy en het verlies van authenticiteit. Als consumenten het gevoel krijgen dat berichten automatisch en onpersoonlijk zijn gemaakt, kan hun vertrouwen afnemen.',
      'Daarom worden transparantie en regelgeving steeds belangrijker. Binnen de Europese Unie gelden vanaf 2 augustus 2026 transparantieverplichtingen uit de AI Act voor bepaalde AI-systemen en AI-gegenereerde content. Marketeers moeten dus niet alleen creatief en technisch vaardig zijn, maar ook weten hoe zij verantwoord met AI omgaan.',
      'Ethisch omgaan met AI betekent voor mij dat snelheid nooit belangrijker mag worden dan betrouwbaarheid en menselijke aandacht. Een marketeer moet duidelijk blijven over het gebruik van AI, zorgvuldig omgaan met persoonsgegevens en controleren of content eerlijk, inclusief en passend is voor de doelgroep. Ook moet iemand verantwoordelijkheid dragen wanneer een AI-uitkomst schade veroorzaakt of misleidend blijkt. Transparantie helpt consumenten om berichten kritisch te beoordelen, terwijl menselijke controle nodig blijft bij gevoelige onderwerpen. Daarom zie ik AI als hulpmiddel, niet als vervanging van professioneel oordeel, creativiteit en verantwoordelijkheid binnen marketing en communicatie.',
      'AI zal de marketingwereld waarschijnlijk niet volledig zonder mensen maken. Vooral uitvoerende taken worden geautomatiseerd of versneld. De menselijke rol verschuift naar strategie, creativiteit, controle en het opbouwen van vertrouwen. De Social Media Marketeer van de toekomst is daarom geen concurrent van AI, maar een professional die AI slim en bewust kan inzetten. De belangrijkste vraag wordt niet of AI content kan maken, maar of die content relevant, betrouwbaar, menselijk en passend is voor de doelgroep.',
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
      <p className="lead-copy">In deze blog onderzoek ik hoe AI het werkveld van een B2C online marketeer verandert: welke kansen het biedt, welke risico’s erbij komen kijken en welke vaardigheden ik als toekomstige marketeer nodig heb.</p>
      <div className="blog-layout">
        <div className="blog-content">
          {aiBlogSections.map((section, index) => <div className="blog-section" key={index}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="source-links">{section.links.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label} <ExternalLink size={14} /></a>)}</div></div>)}
        </div>

        <aside className="infographic-panel">
          <div className="infographic-main-card">
            <img src="/assets/aistudio/Infographic%20AI%20onderzoek.jpeg" alt="Infographic over AI-onderzoek voor de AI blog" />
          </div>
          <a className="download-button" href="/assets/aistudio/Infographic%20AI%20onderzoek.jpeg" download="Infographic AI onderzoek.jpeg">
            Download infografie
          </a>
          <div className="infographic-extra-card">
            <img className="infographic-extra-image" src="/assets/aistudio/AIonderzoek%20extra%20afbeelding.jpeg" alt="Extra realistische AI-onderzoek afbeelding" />
          </div>
        </aside>
      </div>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Top 5 AI-skills</p><h2>Belangrijkste AI-skills</h2></div>
      <div className="skills-list">{aiSkills.map(([title, description]) => <article className="skill-row" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="research-section sources-section">
      <div className="section-heading-block"><p className="section-kicker">Bronnen</p><h2>Bronnenlijst volgens APA 7</h2></div>
      <ol className="sources-list">{aiBlogSources.map(([author, title, url]) => <li key={url}><span>{author} <em>{title}</em> </span><a href={url} target="_blank" rel="noreferrer">{url}</a></li>)}</ol>
    </section>

    <div className="back-link-row"><button className="text-button" onClick={() => navigate('bewijs')}>← Terug naar mijn bewijs</button></div>
  </PageIntro>;
}

const aiResearchStoryParagraphs = [
  'Voor mijn Research Story heb ik geleerd hoe ik AI kan gebruiken als hulpmiddel bij het uitvoeren van onderzoek. Mijn doel was om te leren hoe ik op een goede en verantwoorde manier AI-researchtools kan inzetten om relevante en betrouwbare informatie te vinden. Hierbij heb ik onderzocht hoe AI mij kan helpen bij het verzamelen van informatie, zonder dat ik de antwoorden van AI zomaar als waarheid aanneem.',
  'Mijn onderzoek ging over de invloed van AI op het werkveld van een B2C online marketeer. Ik wilde onder andere onderzoeken welke kansen en bedreigingen AI biedt en welke vaardigheden in de toekomst belangrijk worden voor een marketeer. Om hiervoor betrouwbare informatie te vinden, heb ik AI gebruikt als startpunt voor mijn onderzoek.',
  'Een belangrijk onderdeel dat ik heb geleerd, is dat een AI-tool niet automatisch een betrouwbare bron is. AI kan bijvoorbeeld een onderzoek noemen dat interessant lijkt, maar de informatie kan verkeerd zijn, verouderd zijn of zelfs niet bestaan. Daarom heb ik geleerd om AI vooral te gebruiken om mogelijke bronnen en onderwerpen te vinden. Vervolgens ben ik zelf naar de oorspronkelijke bron gegaan om te controleren of de informatie daadwerkelijk in het onderzoek stond.',
  'Ik heb hierbij gebruikgemaakt van gestructureerde prompts. In plaats van alleen te vragen om informatie over AI en marketing, heb ik mijn opdrachten specifieker gemaakt. Ik gaf bijvoorbeeld aan dat ik betrouwbare en wetenschappelijke bronnen wilde gebruiken en dat de bronnen binnen een bepaalde periode gepubliceerd moesten zijn. Hierdoor kreeg ik resultaten die beter aansloten bij mijn onderzoek.',
  'Ook heb ik een overzicht bijgehouden van de prompts die ik heb gebruikt. Hierdoor kan ik terugzien hoe ik mijn onderzoek heb uitgevoerd en welke vragen ik aan AI heb gesteld. Dit helpt mij om mijn onderzoek beter te onderbouwen en maakt mijn werkwijze beter herhaalbaar.',
  'Een andere belangrijke stap was het controleren van AI-antwoorden. Wanneer AI een bewering of onderzoek noemde, heb ik dit gecontroleerd in de oorspronkelijke bron. Ik keek daarbij niet alleen of de bron bestond, maar ook of de bron daadwerkelijk ondersteunde wat AI beweerde. Hierdoor merkte ik dat AI soms informatie vereenvoudigt of een conclusie anders formuleert dan in het oorspronkelijke onderzoek.',
  'Daarnaast heb ik geleerd om mijn bronnen volgens de APA-regels te documenteren. Hierdoor zijn mijn bronnen beter terug te vinden en is duidelijk waar mijn informatie vandaan komt. Dit is belangrijk wanneer ik onderzoek gebruik voor een studieopdracht of professionele toepassing.',
  'Door dit onderzoek heb ik geleerd dat AI vooral een hulpmiddel is binnen het onderzoeksproces. Het kan mij helpen om sneller ideeën, zoekrichtingen en relevante bronnen te vinden, maar de verantwoordelijkheid voor de betrouwbaarheid van mijn onderzoek blijft bij mijzelf. Ik moet daarom kritisch blijven kijken naar de informatie die AI geeft en belangrijke informatie altijd controleren.',
  'Deze manier van werken neem ik mee in mijn verdere opleiding en toekomstige werk als online marketeer. Ik weet nu beter hoe ik AI kan gebruiken om efficiënter onderzoek te doen, terwijl ik tegelijkertijd kritisch blijf op de kwaliteit en betrouwbaarheid van de informatie.',
];

function AIResearchStoryPage({ navigate }: { navigate: (page: Page) => void }) {
  return <PageIntro eyebrow="Learning Story" title="AI-onderzoek: leren onderzoeken met AI" intro="Mijn aanpak om AI-researchtools verantwoord te gebruiken en onderzoeksinformatie kritisch te controleren.">
    <section className="research-section">
      <div className="research-section-heading">
        <p className="section-kicker">Mijn leerproces</p>
        <span className="learning-outcome-badge">LU 1 &amp; LU 3</span>
      </div>
      <div className="blog-content">
        <div className="blog-section">
          {aiResearchStoryParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
    <div className="back-link-row"><button className="text-button" onClick={() => navigate('bewijs')}>← Terug naar mijn bewijs</button></div>
  </PageIntro>;
}

const supabasePortfolioParagraphs = [
  'Voor mijn leerproces binnen de minor Futureproof met AI heb ik geleerd hoe ik een Supabase-database kan koppelen aan mijn portfolio-website. Mijn doel hierbij was om mijn projecten en bewijsstukken niet alleen handmatig in de website te zetten, maar deze op een dynamische manier vanuit een database te kunnen tonen. Hiermee heb ik een nieuwe techniek geleerd die ik ook bij andere websites en applicaties kan gebruiken.',
  'Voordat ik hiermee begon, stond de informatie op mijn portfolio voornamelijk rechtstreeks in de code van de website. Dit betekent dat ik voor iedere aanpassing de code moest wijzigen. Ik wilde onderzoeken hoe ik dit slimmer kon aanpakken. Daarom ben ik aan de slag gegaan met Supabase. Supabase is een platform waarmee je onder andere databases kunt maken en deze kunt koppelen aan websites en applicaties.',
  'De eerste stap was het aanmaken van een database in Supabase. Hierin heb ik gegevens kunnen opslaan die betrekking hebben op mijn projecten en bewijsstukken. Vervolgens heb ik geleerd hoe ik vanuit mijn website verbinding kan maken met deze database. Dit was voor mij een belangrijk onderdeel van het leerproces, omdat ik hierdoor beter begrijp hoe een website informatie uit een externe database kan ophalen.',
  'Na het maken van de koppeling heb ik ervoor gezorgd dat de informatie vanuit de database op mijn portfolio-website wordt ingeladen. Hierdoor is de inhoud van mijn website niet meer volledig afhankelijk van vaste teksten in de code. Wanneer er nieuwe informatie aan de database wordt toegevoegd of bestaande informatie wordt aangepast, kan deze informatie dynamisch op de website worden weergegeven.',
  'Een ander onderdeel van mijn opdracht was het mogelijk maken om bewijsstukken per leeruitkomst te bekijken. Hiervoor heb ik gewerkt met de leeruitkomsten LU 1 tot en met LU 5. Bezoekers kunnen hierdoor gerichter bekijken welke bewijsstukken bij een bepaalde leeruitkomst horen. Dit maakt mijn portfolio overzichtelijker en zorgt ervoor dat mijn bewijsstukken beter te vinden zijn.',
  'Tijdens het bouwen heb ik gemerkt dat een database koppelen meer inhoudt dan alleen het maken van een tabel. Ik moest ook begrijpen hoe mijn website gegevens opvraagt, hoe deze gegevens worden verwerkt en hoe ze vervolgens op de juiste plek op de website worden weergegeven. Hierdoor heb ik meer inzicht gekregen in hoe verschillende onderdelen van een webapplicatie met elkaar samenwerken.',
  'Ik heb daarnaast geleerd dat het belangrijk is om goed na te denken over welke informatie je in een database opslaat en hoe je deze informatie beschikbaar maakt op een website. Omdat mijn portfolio online staat, is het ook belangrijk om rekening te houden met veiligheid en de manier waarop de database wordt benaderd.',
  'Het koppelen van Supabase aan mijn portfolio heeft mij laten zien dat ik steeds meer onderdelen van een website zelfstandig kan bouwen en met elkaar kan verbinden. Waar ik eerst vooral bezig was met de zichtbare kant van mijn website, heb ik nu ook ervaring opgedaan met het werken met een database en het dynamisch ophalen van informatie.',
  'Met deze opdracht heb ik geleerd hoe ik Supabase kan gebruiken als onderdeel van een website. De kennis die ik hiermee heb opgedaan kan ik ook toepassen in toekomstige projecten, bijvoorbeeld bij mijn sportapp. Hierdoor zie ik dat wat ik tijdens het bouwen van mijn portfolio leer, ook direct bruikbaar is voor andere AI- en webprojecten.',
];

function SupabasePortfolioStoryPage({ navigate }: { navigate: (page: Page) => void }) {
  return <PageIntro eyebrow="Sprint 2 · Blog" title="Mijn portfolio koppelen aan Supabase" intro="Mijn leerproces rond het koppelen van een Supabase-database aan mijn portfolio-website.">
    <section className="research-section">
      <div className="research-section-heading">
        <p className="section-kicker">Nieuwe blog</p>
        <span className="learning-outcome-badge">LU 1 t/m LU 5</span>
      </div>
      <div className="blog-content">
        <div className="blog-section">
          {supabasePortfolioParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
      <div className="supabase-image-gallery">
        <figure className="supabase-image-figure">
          <img src="/assets/aistudio/Database%20website%20gekoppeld.png" alt="Database en website gekoppeld aan Supabase" />
          <figcaption>Database website gekoppeld</figcaption>
        </figure>
        <figure className="supabase-image-figure">
          <img src="/assets/aistudio/Screenshot%20database%20gekoppeld.png" alt="Screenshot van de gekoppelde database" />
          <figcaption>Screenshot database gekoppeld</figcaption>
        </figure>
      </div>
    </section>
    <div className="back-link-row"><button className="text-button" onClick={() => navigate('bewijs')}>← Terug naar mijn bewijs</button></div>
  </PageIntro>;
}

function EvidencePage({ navigate }: { navigate: (page: Page) => void }) {
  const [selectedOutcomes, setSelectedOutcomes] = useState<number[]>([]);
  const learningOutcomes = [...new Set(evidenceStories.flatMap((story) => story.learningOutcomes))].sort((first, second) => first - second);
  const visibleStories = evidenceStories.filter((story) => (
    selectedOutcomes.length === 0 || story.learningOutcomes.some((outcome) => selectedOutcomes.includes(outcome))
  ));
  const sprintNumbers = [...new Set([1, 2, ...evidenceStories.map((story) => story.sprint)])].sort((first, second) => first - second);

  return <PageIntro eyebrow="Mijn bewijs" title="Leren door te doen, delen en onderbouwen." intro="Op deze pagina verzamel ik de bewijzen waarmee ik mijn behaalde leeruitkomsten aantoon. Grote bestanden staan extern en worden hier gelinkt.">
    <fieldset className="evidence-filters">
      <legend>Filter op leeruitkomsten</legend>
      <div className="evidence-filter-controls">
        <div className="evidence-filter-options">
          {learningOutcomes.map((outcome) => (
            <label className="evidence-filter-option" key={outcome}>
              <input
                type="checkbox"
                checked={selectedOutcomes.includes(outcome)}
                onChange={() => setSelectedOutcomes((current) => (
                  current.includes(outcome)
                    ? current.filter((selected) => selected !== outcome)
                    : [...current, outcome]
                ))}
              />
              <span>LU {outcome}</span>
            </label>
          ))}
        </div>
        {selectedOutcomes.length > 0 && (
          <button className="text-button" type="button" onClick={() => setSelectedOutcomes([])}>
            Wis filters
          </button>
        )}
      </div>
    </fieldset>
    <div className="evidence-list">
      {visibleStories.length === 0 && <p className="evidence-empty-state">Geen bewijs gevonden voor deze selectie.</p>}
      {sprintNumbers.map((sprint) => (
        <section className="evidence-sprint" aria-labelledby={`sprint-${sprint}-heading`} key={sprint}>
          <header className="evidence-sprint-heading">
            <h2 id={`sprint-${sprint}-heading`}>Sprint {sprint}</h2>
          </header>
          {visibleStories.filter((story) => story.sprint === sprint).map((story) => (
            <section className="evidence-group" key={story.title}>
              <div className="group-heading">
                <span className="learning-outcome-badge">LU {story.learningOutcomes.join(' & LU ')}</span>
                <div>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
              </div>
              <div className="evidence-cards compact-evidence-cards">
                <article className="evidence-card evidence-card-compact">
                  <div>
                    <h3>{story.evidenceTitle}</h3>
                    <p>{story.evidenceDescription}</p>
                  </div>
                  <button className="evidence-link evidence-button" onClick={() => navigate(story.page)}>
                    {story.actionLabel} <ExternalLink size={15} />
                  </button>
                </article>
              </div>
            </section>
          ))}
        </section>
      ))}
    </div>
  </PageIntro>;
}

function PageIntro({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <><section className="page-intro reveal"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}</h1><p className="intro">{intro}</p></section><div className="page-body reveal delay-one">{children}</div></>;
}

export default App;
