/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ExternalLink, Menu, Sparkles, X } from 'lucide-react';
import BigDaanBackupStoryPage from './components/BigDaanBackupStoryPage';
import BigDaan20StoryPage from './components/BigDaan20StoryPage';
import PortfolioMaintenanceStoryPage from './components/PortfolioMaintenanceStoryPage';

type Page = 'home' | 'over-mij' | 'mijn-ai-app' | 'research-story-ai-blog' | 'ai-onderzoek' | 'supabase-blog' | 'portfolio-story' | 'bigdaan-story' | 'bigdaan-security-story' | 'bigdaan-backup-story' | 'bigdaan-20-story' | 'portfolio-maintenance-story' | 'ai-it-regisseur' | 'bewijs';
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
  {
    sprint: 2,
    learningOutcomes: [4],
    title: 'Mijn portfolio verbeteren: van losse bewijsstukken naar een professioneel overzicht',
    description: 'Learning Story over het presenteren en organiseren van mijn portfolio tijdens Sprint 2.',
    evidenceTitle: 'Portfolio verbeteren',
    evidenceDescription: 'Mijn aanpak voor een overzichtelijke, responsive portfolio-website met bewijs per leeruitkomst.',
    actionLabel: 'Bekijk Learning Story',
    page: 'portfolio-story',
  },
  {
    sprint: 2,
    learningOutcomes: [2, 3, 4, 5],
    title: 'BigDaan: van mijn eigen sportapp naar een app voor iedereen',
    description: 'Learning Story over mijn persoonlijke sportapp, AI-ondersteunde ontwikkeling en de uitbreiding na peerfeedback.',
    evidenceTitle: 'Sportapp BigDaan',
    evidenceDescription: 'Van een persoonlijk idee voor workouts en progressie naar een publiek toegankelijke applicatie.',
    actionLabel: 'Bekijk Learning Story',
    page: 'bigdaan-story',
  },
  {
    sprint: 3,
    learningOutcomes: [1, 3],
    title: 'AI verandert IT-beroepen: van programmeur naar AI-regisseur',
    description: 'Research Story over hoe generatieve AI het werk van IT-professionals verandert.',
    evidenceTitle: 'AI-blog: van programmeur naar AI-regisseur',
    evidenceDescription: 'Onderzoek naar de kansen, risico’s en blijvende menselijke verantwoordelijkheid bij AI in IT.',
    actionLabel: 'Bekijk Research Story',
    page: 'ai-it-regisseur',
  },
  {
    sprint: 3,
    learningOutcomes: [3, 4, 5],
    title: 'BigDaan beveiligen: van kwetsbare code naar betere bescherming van gebruikersgegevens',
    description: 'Learning Story over cybersecurityfeedback, geheimenbeheer en het beveiligen van gebruikersgegevens met Supabase.',
    evidenceTitle: 'Beveiliging van BigDaan',
    evidenceDescription: 'Mijn leerproces rond veiligere code, databasebeveiliging en verantwoord omgaan met gebruikersgegevens.',
    actionLabel: 'Bekijk Learning Story',
    page: 'bigdaan-security-story',
  },
  {
    sprint: 4,
    learningOutcomes: [3, 4, 5],
    title: 'BigDaan: veilig doorontwikkelen met een back-upstrategie',
    description: 'Learning Story over risico’s bij grotere updates, het beschermen van applicatie- en databasegegevens en de noodzaak van een hersteltest.',
    evidenceTitle: 'Back-upstrategie BigDaan',
    evidenceDescription: 'Mijn leerproces rond lokale back-ups, Supabase-onderdelen en verantwoord verder ontwikkelen.',
    actionLabel: 'Bekijk Learning Story',
    page: 'bigdaan-backup-story',
  },
  {
    sprint: 5,
    learningOutcomes: [2, 3, 4, 5],
    title: 'BigDaan 2.0: gebruikersfeedback omzetten naar een betere sportapp',
    description: 'Learning Story over vijf verbeteringen voor de sportapp BigDaan, met aandacht voor gebruikersgegevens, back-ups, testen en verantwoord gebruik van AI.',
    evidenceTitle: 'Sportapp BigDaan 2.0',
    evidenceDescription: 'Van een nieuwe oefeningspagina tot verbeterde grafieken, oefenvolgorde en automatisch ingevulde sets.',
    actionLabel: 'Bekijk Learning Story',
    page: 'bigdaan-20-story',
  },
  {
    sprint: 5,
    learningOutcomes: [4, 5],
    title: 'Mijn AI-portfolio bijwerken: van achterstand naar een compleet overzicht',
    description: 'Learning Story over het wegwerken van mijn documentatieachterstand, het gebruik van ChatGPT en Visual Studio Code en het verantwoord publiceren van mijn portfolio.',
    evidenceTitle: 'Mijn portfolio bijwerken',
    evidenceDescription: 'Stories uit Sprint 2, 3, 4 en 5 aanvullen, leeruitkomsten koppelen en bewijsmateriaal overzichtelijk organiseren.',
    actionLabel: 'Bekijk Learning Story',
    page: 'portfolio-maintenance-story',
  },
];

function getPageFromPath(): Page {
  const path = window.location.pathname.replace(/^\//, '');
  const validPages: Page[] = [...navigation.map((item) => item.id), 'mijn-ai-app', 'research-story-ai-blog', 'ai-onderzoek', 'supabase-blog', 'portfolio-story', 'bigdaan-story', 'bigdaan-security-story', 'bigdaan-backup-story', 'bigdaan-20-story', 'portfolio-maintenance-story', 'ai-it-regisseur'];
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
        {page === 'portfolio-story' && <PortfolioLearningStoryPage navigate={navigate} />}
        {page === 'bigdaan-story' && <BigDaanStoryPage navigate={navigate} />}
        {page === 'bigdaan-security-story' && <BigDaanSecurityStoryPage navigate={navigate} />}
        {page === 'bigdaan-backup-story' && <BigDaanBackupStoryPage navigate={() => navigate('bewijs')} />}
        {page === 'bigdaan-20-story' && <BigDaan20StoryPage navigate={() => navigate('bewijs')} />}
        {page === 'portfolio-maintenance-story' && <PortfolioMaintenanceStoryPage navigate={() => navigate('bewijs')} />}
        {page === 'ai-it-regisseur' && <AITRegisseurStoryPage navigate={navigate} />}
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

function PortfolioLearningStoryPage({ navigate }: { navigate: (page: Page) => void }) {
  return <PageIntro
    eyebrow="Sprint 2 · Learning Story"
    title="Mijn portfolio verbeteren: van losse bewijsstukken naar een professioneel overzicht"
    intro="Als student Futureproof met AI wilde ik mijn portfolio vormgeven met een rustig blauw-wit thema en de bewijsstukken van Sprint 1 overzichtelijk presenteren."
  >
    <section className="research-section">
      <div className="research-section-heading">
        <p className="section-kicker">Leeruitkomst</p>
        <span className="learning-outcome-badge">LU 4</span>
      </div>
      <div className="blog-content">
        <div className="blog-section">
          <h2>Aanleiding</h2>
          <p>Tijdens Sprint 2 wilde ik mijn portfolio-website verder verbeteren. Mijn doel was een overzichtelijke en professioneel ogende website te maken waarop mijn leerproces tijdens de minor Futureproof met AI duidelijk zichtbaar werd.</p>
          <p>Ik had verschillende opdrachten en stories uit Sprint 1 afgerond. Ik wilde deze op één centrale plek verzamelen, zodat mijn docenten eenvoudig konden zien wat ik had gedaan en welke leeruitkomsten daarbij hoorden.</p>
        </div>
        <div className="blog-section">
          <h2>Wat wilde ik bereiken?</h2>
          <p>Ik wilde alle vier de stories en bijbehorende bewijsstukken uit Sprint 1 overzichtelijk aan mijn portfolio toevoegen. Ook wilde ik een rustig, consistent blauw-wit thema en een duidelijke indeling per sprint maken, met een filter waarmee bezoekers bewijsstukken op leeruitkomst konden vinden.</p>
          <p>Daarnaast vond ik het belangrijk dat de website prettig werkte op zowel mobiele apparaten als desktops en dat teksten en lay-out zorgvuldig op consistentie en spelling werden gecontroleerd.</p>
        </div>
        <div className="blog-section">
          <h2>Hoe heb ik dit aangepakt?</h2>
          <p>Tijdens Sprint 2 heb ik mijn bestaande portfolio verder ontwikkeld en geoptimaliseerd. Ik heb de vier stories uit Sprint 1 met hun bijbehorende bewijsstukken op één plek gepresenteerd.</p>
          <p>Vervolgens heb ik de vormgeving verbeterd met een rustig blauw-wit kleurenschema. Daardoor kreeg de website een consistentere en professionelere uitstraling.</p>
          <p>Ook heb ik de structuur van de bewijspagina aangepast. Ik maakte onderscheid tussen Sprint 1 en Sprint 2, zodat bezoekers konden zien welke werkzaamheden bij welke periode hoorden.</p>
          <p>Een belangrijke toevoeging was de mogelijkheid om bewijsstukken op leeruitkomst te filteren. Zo konden docenten bijvoorbeeld specifiek bewijs voor LU4 selecteren, zonder alle stories afzonderlijk te openen.</p>
          <p>Tot slot heb ik de leesbaarheid en de weergave op verschillende schermformaten gecontroleerd. Ook heb ik teksten en lay-out op consistentie en spelling nagekeken en links naar extern bewijsmateriaal toegevoegd. De werking van de links naar OneDrive en YouTube heb ik nog niet getest.</p>
        </div>
        <div className="blog-section">
          <h2>Wat was het resultaat?</h2>
          <p>Het resultaat was een verbeterde portfolio-website waarop mijn vier stories en bewijsstukken uit Sprint 1 overzichtelijk werden gepresenteerd. De website heeft een consistent blauw-wit thema, een duidelijke indeling per sprint en een filterfunctie voor de leeruitkomsten. Ik heb de weergave op mobiel en desktop en de teksten en lay-out op consistentie en spelling gecontroleerd. Daardoor werd het eenvoudiger om mijn ontwikkeling te volgen en het juiste bewijsmateriaal terug te vinden.</p>
          <p>Mijn website was online beschikbaar via Vercel: <a href="https://portfoliowebsite-futureproofmet-ai.vercel.app/" target="_blank" rel="noreferrer">Bekijk mijn portfolio <ExternalLink size={14} /></a></p>
        </div>
        <div className="blog-section">
          <h2>Wat heb ik geleerd?</h2>
          <p>Ik heb geleerd dat een goede website meer vraagt dan zorgen dat alles technisch werkt. Ik ontdekte hoe belangrijk de gebruikerservaring is: informatie moet niet alleen aanwezig zijn, maar ook duidelijk en toegankelijk worden gepresenteerd.</p>
          <p>Daarnaast heb ik geleerd mijn werkzaamheden en bewijsstukken logisch te organiseren. Vooral het filteren op leeruitkomsten was een waardevolle verbetering. Het maakte mijn portfolio overzichtelijker en praktischer voor de beoordeling van mijn ontwikkeling.</p>
        </div>
        <div className="blog-section">
          <h2>Reflectie</h2>
          <p>Ik ben tevreden met hoe mijn portfolio zich tijdens Sprint 2 heeft ontwikkeld. Waar de website eerst vooral bedoeld was om opdrachten te verzamelen, werd het steeds meer een professionele plek om mijn leerproces te presenteren.</p>
          <p>Ik merkte dat kleine verbeteringen in vormgeving en navigatie een groot verschil kunnen maken voor de gebruiker. Deze opdracht heeft mij geholpen bewuster na te denken over hoe ik digitale producten ontwerp en verbeter.</p>
        </div>
      </div>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Bewijsmateriaal</p><h2>Portfolio en bewijs</h2></div>
      <div className="reflection-list">
        <article className="reflection-card"><h3>Blauw-wit portfolio-ontwerp</h3><p>Screenshot nog niet toegevoegd.</p></article>
        <article className="reflection-card"><h3>Indeling van Sprint 1 en Sprint 2</h3><p>Screenshot nog niet toegevoegd.</p></article>
        <article className="reflection-card"><h3>Filterfunctie voor leeruitkomsten</h3><img className="portfolio-evidence-image" src="/assets/aistudio/FilterLeeruitkomsten.png" alt="Screenshot van de filteropties voor leeruitkomsten LU 1 tot en met LU 5" /></article>
        <article className="reflection-card"><h3>Live portfolio</h3><p>De gepubliceerde website:</p><a href="https://portfoliowebsite-futureproofmet-ai.vercel.app/" target="_blank" rel="noreferrer">Open portfolio op Vercel <ExternalLink size={14} /></a></article>
        <article className="reflection-card"><h3>Aanvullende bewijsstukken</h3><p>Nog niet toegevoegd.</p></article>
      </div>
    </section>
    <div className="back-link-row"><button className="text-button" onClick={() => navigate('bewijs')}>← Terug naar mijn bewijs</button></div>
  </PageIntro>;
}

const bigDaanLearningOutcomes = [
  {
    code: 'LU2',
    title: 'Praktijkgerichte AI-oplossing ontwerpen, realiseren en presenteren',
    officialDescription: 'Je kunt zelfstandig een AI-oplossing ontwerpen, realiseren en presenteren die een specifieke beroepspraktijk radicaal transformeert.',
    projectConnection: 'BigDaan laat mijn appidee en de beoogde realisatie zien. In de beschikbare informatie is niet aangetoond dat de sportapp zelf AI toepast of een beroepspraktijk radicaal verandert. Daarvoor is aanvullend bewijs nodig.',
  },
  {
    code: 'LU3',
    title: 'Ethiek en verantwoordelijk AI-gebruik beoordelen',
    officialDescription: 'Je kunt ethische vraagstukken en uitdagingen van AI in je vakgebied identificeren en aanbevelingen formuleren voor verantwoord AI-gebruik, rekening houdend met privacy, bias en transparantie.',
    projectConnection: 'Accounts en persoonlijke trainingsgegevens maken privacy en verantwoord gegevensgebruik relevante aandachtspunten. In de beschikbare story of projectbestanden staat geen uitgewerkte ethische analyse of aanbeveling; BigDaan toont LU3 daarom nog niet zelfstandig aan.',
  },
  {
    code: 'LU4',
    title: 'AI-tools en technieken gebruiken',
    officialDescription: 'Je kunt zelfstandig verschillende AI-tools en platforms toepassen, zoals machine-learningtechnieken, chatbots, agents en prompts, om taken binnen je vakgebied op te lossen.',
    projectConnection: 'Ik gebruikte vibe-coding en gestructureerde prompts om de app stap voor stap te ontwikkelen. Ik heb dit ontwikkelproces handmatig gecontroleerd; specifieke toolnamen noem ik niet omdat die niet in de beschikbare projectbestanden zijn vastgelegd.',
  },
  {
    code: 'LU5',
    title: 'Zelfstandig en zelfsturend werken',
    officialDescription: 'Je kunt een eigen leerroute vaststellen en uitvoeren, zelfstandig leervragen stellen, bronnen en tools selecteren, je voortgang monitoren en kritisch reflecteren op je leerproces en ontwikkeling.',
    projectConnection: 'De story beschrijft mijn eigen projectdoel, mijn leerproces en hoe ik feedback verwerkte. Een planning, voortgangslog of bewijs van de gekozen bronnen en tools is niet beschikbaar, waardoor dit een reflectieve koppeling is en geen volledig bewijs van de leeruitkomst.',
  },
];

function BigDaanStoryPage({ navigate }: { navigate: (page: Page) => void }) {
  return <PageIntro
    eyebrow="Sprint 2 · Learning Story"
    title="BigDaan: van mijn eigen sportapp naar een app voor iedereen"
    intro="Een sportapp die begon bij mijn eigen trainingen. In deze Learning Story beschrijf ik mijn oorspronkelijke plan, de feedback die het project een nieuwe richting gaf en wat ik daarvan leerde."
  >
    <section className="research-section">
      <div className="research-section-heading">
        <p className="section-kicker">Leeruitkomsten</p>
        <span className="learning-outcome-badge">LU2 · LU3 · LU4 · LU5</span>
      </div>
      <div className="note-box"><strong>Officiële leeruitkomsten en projectkoppeling</strong><p>De omschrijvingen hieronder komen uit de minorinformatie van Futureproof met AI. Per leeruitkomst beschrijf ik het raakvlak met BigDaan en de grenzen van het beschikbare bewijs; dit is geen beoordeling dat een leeruitkomst volledig is behaald.</p></div>
      <div className="reflection-list">
        {bigDaanLearningOutcomes.map((outcome) => <article key={outcome.code}>
          <h3>{outcome.code}: {outcome.title}</h3>
          <p><strong>Officiële omschrijving:</strong> {outcome.officialDescription}</p>
          <p><strong>Koppeling met BigDaan:</strong> {outcome.projectConnection}</p>
        </article>)}
      </div>
    </section>

    <section className="research-section">
      <div className="research-section-heading">
        <p className="section-kicker">Mijn user story</p>
        <span className="learning-outcome-badge">Sportapp BigDaan</span>
      </div>
      <blockquote className="research-story-quote"><p>Als sporter wil ik een interactieve sportapp maken waarin ik workouts en progressie kan bijhouden, zodat ik mijn prestaties inzichtelijk heb én kan aantonen hoe ik een AI-toepassing bouw.</p></blockquote>
    </section>

    <section className="research-section">
      <div className="blog-content">
        <div className="blog-section">
          <h2>Aanleiding: een sportapp voor mezelf</h2>
          <p>Tijdens Sprint 2 wilde ik een eigen applicatie ontwikkelen waarmee ik mijn sportprestaties kon bijhouden. Omdat ik zelf sport, leek het mij interessant om workouts samen te stellen en mijn progressie te volgen.</p>
          <p>Ik dacht aan het bijhouden van oefeningen, gewicht en herhalingen, zodat ik mijn trainingen over een langere periode kon terugzien. Het project was voor mij niet alleen een sportidee, maar ook een kans om te ontdekken hoe ik met AI zelf een applicatie kon ontwikkelen.</p>
        </div>
        <div className="blog-section">
          <h2>Mijn doel tijdens Sprint 2</h2>
          <p>Mijn eerste doel was een sportapp voor persoonlijk gebruik. Ik wilde workouts kunnen samenstellen, oefeningen toevoegen en per oefening gewicht en herhalingen registreren. Ook wilde ik prestaties over een gekozen periode kunnen bekijken en een duidelijke melding krijgen wanneer ik een persoonlijk record verbeterde.</p>
          <p>In deze fase lag mijn aandacht bij een bruikbare basis voor mezelf. De app voor meerdere gebruikers beschikbaar maken was toen nog niet mijn doel.</p>
        </div>
        <div className="blog-section">
          <h2>Hoe ik AI gebruikte tijdens het ontwikkelen</h2>
          <p>Ik gebruikte AI als hulpmiddel om mijn ideeën stap voor stap om te zetten naar een prototype. Ik merkte dat ik mijn wensen concreet moest beschrijven: welke functie ik wilde bouwen en wat de gebruiker ermee moest kunnen doen. Door mijn vragen op te delen, kon ik gerichter aan de verschillende onderdelen werken.</p>
          <p>Ik werkte met vibe-coding en gestructureerde prompts om mijn ideeën stapsgewijs om te zetten naar functies. AI hielp mij om sneller van een idee naar een werkende uitwerking te gaan, maar de keuzes bleven bij mij: ik bepaalde wat de app moest doen en controleerde of de resultaten aansloten op mijn doel. Ik noem geen specifieke AI-tool, omdat ik die niet met de beschikbare projectbestanden kan onderbouwen.</p>
        </div>
        <div className="blog-section">
          <h2>De functies die ik voor ogen had</h2>
          <p>Ik heb workouts kunnen samenstellen en oefeningen toevoegen. Per oefening kan ik gewicht en herhalingen registreren en mijn trainingsgeschiedenis en progressie over een gekozen periode bekijken. Bij een nieuw persoonlijk record toont de app een visuele melding. Ik heb deze oorspronkelijke functies handmatig gecontroleerd.</p>
          <p>Ook heb ik de invoer gecontroleerd: bij lege of onjuiste gegevens krijgt de gebruiker duidelijke feedback. Op mobiel werkt de interface vlot en intuïtief, zodat ik mijn workouts en voortgang ook onderweg kan bekijken.</p>
        </div>
        <div className="blog-section">
          <h2>Uitdagingen en feedback</h2>
          <p>Een belangrijke uitdaging was om een groot idee op te delen in kleinere functies waar ik stap voor stap aan kon werken. Ik leerde dat AI gerichter helpt wanneer ik duidelijk uitleg wat ik wil bereiken, en dat ik de uitkomst zelf moet blijven beoordelen. Door iedere functie afzonderlijk te controleren, kon ik ook foutmeldingen en de werking op mobiel meenemen in mijn kwaliteitscontrole.</p>
          <p>Na Sprint 2 kreeg ik feedback van Thom en Bjorn. Zij stelden voor om BigDaan niet alleen als lokale sportapp voor mezelf te zien, maar ook te onderzoeken of anderen de app konden gebruiken. Door die feedback ging ik anders naar de mogelijkheden kijken. Dit was het moment waarop het project een nieuwe richting kreeg.</p>
        </div>
        <div className="blog-section">
          <h2>Na Sprint 2: de app uitbreiden</h2>
          <p>Na Sprint 2 ben ik verder gegaan met het idee om BigDaan voor meer sporters beschikbaar te maken. Op basis van de feedback heb ik accounts en inloggen toegevoegd, zodat meerdere gebruikers de app kunnen gebruiken en hun eigen trainingsgegevens kunnen bijhouden. Ik heb de applicatie via Vercel gepubliceerd en aan Supabase gekoppeld voor gebruikers- en trainingsgegevens. Deze uitbreiding vond plaats na Sprint 2 en was geen onderdeel van mijn oorspronkelijke lokale app.</p>
          <p>Ik heb handmatig gecontroleerd dat gebruikers een account kunnen aanmaken en inloggen en dat de app de workoutgeschiedenis, oefeningen en voortgang in de ingelogde omgeving toont. De portfolio-workspace bevat niet de BigDaan-broncode of Supabase-configuratie; daarom beschrijf ik hier de geteste werking, maar doe ik geen aparte uitspraak over de technische inrichting van databasebeleid of toegangsbeveiliging.</p>
        </div>
        <div className="blog-section">
          <h2>Resultaat</h2>
          <p>BigDaan is ontstaan vanuit mijn eigen interesse in sporten. Tijdens Sprint 2 werkte ik aan het idee en de basis voor workouts, oefeningen en trainingsprogressie. Na feedback van Thom en Bjorn ben ik het project verder gaan ontwikkelen met het doel om het online en voor meerdere gebruikers beschikbaar te maken.</p>
          <p>De applicatie is gepubliceerd op Vercel. Ik heb de workoutopbouw, oefenregistratie met gewicht en herhalingen, progressieweergave, PR-meldingen, duidelijke foutfeedback, mobiele interface en accountfunctionaliteit handmatig gecontroleerd. De werking voldeed aan mijn acceptatie- en kwaliteitscriteria.</p>
          <a className="button button-primary" href="https://sportapp-big-daan.vercel.app/" target="_blank" rel="noreferrer">Bekijk BigDaan <ExternalLink size={16} /></a>
        </div>
        <div className="blog-section">
          <h2>Wat ik heb geleerd</h2>
          <p>Ik heb geleerd dat ik met AI ideeën kan verkennen en sneller een eerste uitwerking kan maken, maar dat ik zelf richting moet geven en resultaten kritisch moet beoordelen. Een groot idee opdelen in kleinere functies hielp mij om overzicht te houden.</p>
          <p>Ook heb ik ervaren hoe waardevol feedback kan zijn. Door Thom en Bjorn ben ik verder gaan denken dan mijn oorspronkelijke persoonlijke gebruik. Ik leerde daarnaast dat een online applicatie voor meerdere gebruikers meer vraagt dan alleen een publiek toegankelijke pagina: ook accounts, opslag en toegang tot persoonlijke gegevens moeten goed worden ingericht en getest.</p>
        </div>
        <div className="blog-section">
          <h2>Reflectie</h2>
          <p>Ik ben trots dat BigDaan begon met een idee uit mijn eigen leven en uitgroeide tot een project met meer mogelijkheden. Tijdens Sprint 2 wilde ik vooral ontdekken of ik met AI een sportapp kon ontwikkelen. De feedback daarna liet mij zien dat een project kan veranderen wanneer anderen er nieuwe kansen in zien.</p>
          <p>Ik heb ook geleerd om onderscheid te maken tussen een idee en een functie die in de praktijk werkt. Door mijn criteria handmatig na te lopen kon ik controleren of de app deed wat ik ervan verwachtte, zowel op desktop als mobiel.</p>
        </div>
      </div>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Bewijsmateriaal</p><h2>BigDaan in beeld</h2></div>
      <div className="reflection-list">
        <article><h3>1. De sportapp BigDaan</h3><p>Mobiele weergave van het BigDaan-dashboard.</p><img className="portfolio-evidence-image portfolio-evidence-image-mobile" src="/assets/aistudio/BigDaan%20Telefoon.PNG" alt="Screenshot van het BigDaan-dashboard op een mobiele telefoon" loading="lazy" /></article>
        <article><h3>2. Eigen workouts samenstellen</h3><p>Workout builder met oefeningen, sets, gewicht en herhalingen.</p><img className="portfolio-evidence-image" src="/assets/aistudio/BigDaan%20Progressie%20overzicht.png" alt="Screenshot van de BigDaan-progressiepagina met een grafiek per workout" loading="lazy" /></article>
        <article><h3>3. Progressie bijhouden</h3><p>Overzicht van de gewichtsontwikkeling per workout.</p><img className="portfolio-evidence-image" src="/assets/aistudio/BigDaan%20Workout%20overzicht.png" alt="Screenshot van de BigDaan workout builder met oefeningen en invoervelden voor gewicht en herhalingen" loading="lazy" /></article>
        <article><h3>4. Persoonlijk record</h3><p>De visuele PR-melding en de werking daarvan heb ik handmatig gecontroleerd. Een screenshotbestand ontbreekt nog.</p></article>
        <article><h3>5. Peerfeedback van Thom en Bjorn</h3><p>Feedbackdocument of screenshot ontbreekt. Volgens mijn projectverloop was deze feedback na Sprint 2 aanleiding om BigDaan verder uit te breiden.</p></article>
        <article><h3>6. Vercel en Supabase</h3><p>Ik heb gecontroleerd dat de applicatie online beschikbaar is en de gebruikers- en trainingsgegevens in de app gebruikt. Een screenshot van de deployment of Supabase-configuratie ontbreekt nog.</p></article>
        <article><h3>7. Werkende applicatie</h3><p>Open de openbare BigDaan-applicatie.</p><a className="evidence-link" href="https://sportapp-big-daan.vercel.app/" target="_blank" rel="noreferrer">Bekijk BigDaan <ExternalLink size={15} /></a></article>
      </div>
    </section>
    <div className="back-link-row"><button className="text-button" onClick={() => navigate('bewijs')}>← Terug naar mijn bewijs</button></div>
  </PageIntro>;
}

const bigDaanSecurityOutcomes = [
  {
    code: 'LU3',
    title: 'Ethiek en verantwoordelijk AI-gebruik beoordelen',
    officialDescription: 'Je kunt ethische vraagstukken en uitdagingen van AI in je vakgebied identificeren en aanbevelingen formuleren voor verantwoord AI-gebruik, rekening houdend met privacy, bias en transparantie.',
    projectConnection: 'Deze story gaat over zorgvuldig omgaan met persoonlijke trainingsgegevens en verantwoordelijkheid voor gebruikersprivacy. De exacte SQL-policies zijn niet openbaar in deze portfolio, maar de werking is wel getest en goedgekeurd door Chat Codex.',
  },
  {
    code: 'LU4',
    title: 'AI-tools en technieken gebruiken',
    officialDescription: 'Je kunt zelfstandig verschillende AI-tools en platforms toepassen, zoals machine-learningtechnieken, chatbots, agents en prompts, om taken binnen je vakgebied op te lossen.',
    projectConnection: 'Ik beschrijf hoe ik AI als hulpmiddel gebruikte om technische beveiligingsopties te begrijpen en wijzigingen voor te bereiden. Concrete prompts, gebruikte tools en code zijn niet beschikbaar als bewijs.',
  },
  {
    code: 'LU5',
    title: 'Zelfstandig en zelfsturend werken',
    officialDescription: 'Je kunt een eigen leerroute vaststellen en uitvoeren, zelfstandig leervragen stellen, bronnen en tools selecteren, je voortgang monitoren en kritisch reflecteren op je leerproces en ontwikkeling.',
    projectConnection: 'De story beschrijft hoe ik feedback vroeg, mijn aandacht verlegde naar gegevensbescherming en reflecteerde op mijn verantwoordelijkheid als ontwikkelaar. Een sprintlog of zelfevaluatie is hier niet beschikbaar.',
  },
];

const bigDaanSecurityAcceptanceCriteria = [
  {
    title: 'Gegevens gekoppeld aan het unieke gebruikers-ID',
    description: 'BigDaan gebruikt unieke gebruikers-ID’s per account. Daardoor kunnen oefeningen, workouts en persoonlijke voortgang aan het juiste account worden gekoppeld en blijven gescheiden.',
    status: 'Behaald',
  },
  {
    title: 'Gebruikers kunnen alleen eigen gegevens beheren',
    description: 'Met testaccounts heb ik gecontroleerd dat ieder account alleen de eigen workoutdata kon zien. Deze test bevestigde de afscherming van workoutgegevens tussen de geteste accounts.',
    status: 'Behaald',
  },
  {
    title: 'Geen toegang tot gegevens van andere accounts',
    description: 'De SQL-policies zorgen ervoor dat gebruikers geen toegang krijgen tot gegevens van andere accounts. Ik zet deze policycode niet openbaar op de portfolio, maar de werking is door Chat Codex gecontroleerd en goedgekeurd.',
    status: 'Behaald',
  },
];

const bigDaanSecurityQualityCriteria = [
  {
    title: 'RLS op alle relevante tabellen ingesteld en getest',
    description: 'Behaald. De RLS-oplossing is door Chat Codex getest en goedgekeurd. De exacte SQL-policies worden hier niet online gepubliceerd.',
    status: 'Behaald',
  },
  {
    title: 'Geheimen veilig beheerd',
    description: 'Behaald. In het project worden gevoelige gegevens veilig gehouden via .gitignore en Vercel Secrets, zodat ze niet in de repository of in open code terechtkomen.',
    status: 'Behaald',
  },
  {
    title: 'Onbevoegde verzoeken veilig afgehandeld',
    description: 'Nog niet geverifieerd. Er zijn geen openbare foutafhandeling, logs of tests van onbevoegde verzoeken beschikbaar die ik hier zonder risico kan tonen.',
    status: 'Nog niet geverifieerd',
  },
];

function BigDaanSecurityStoryPage({ navigate }: { navigate: (page: Page) => void }) {
  return <PageIntro
    eyebrow="Sprint 3 · Learning Story"
    title="BigDaan beveiligen: van kwetsbare code naar betere bescherming van gebruikersgegevens"
    intro="Toen mijn sportapp online kwam, ontdekte ik door feedback van iemand met cybersecuritykennis dat een applicatie die werkt niet automatisch veilig is. Die ervaring veranderde hoe ik naar mijn verantwoordelijkheid als ontwikkelaar kijk."
  >
    <section className="research-section">
      <div className="research-section-heading">
        <p className="section-kicker">Leeruitkomsten</p>
        <span className="learning-outcome-badge">LU3 · LU4 · LU5</span>
      </div>
      <div className="note-box"><strong>Officiële leeruitkomsten en projectkoppeling</strong><p>De officiële omschrijvingen komen uit de minorinformatie van Futureproof met AI. De koppelingen hieronder beschrijven wat deze story raakt; ze zijn geen beoordeling dat een leeruitkomst volledig is behaald.</p></div>
      <div className="reflection-list">
        {bigDaanSecurityOutcomes.map((outcome) => <article key={outcome.code}>
          <h3>{outcome.code}: {outcome.title}</h3>
          <p><strong>Officiële omschrijving:</strong> {outcome.officialDescription}</p>
          <p><strong>Koppeling met mijn project:</strong> {outcome.projectConnection}</p>
        </article>)}
      </div>
    </section>

    <section className="research-section">
      <div className="research-section-heading">
        <p className="section-kicker">Mijn user story</p>
        <span className="learning-outcome-badge">Sportapp BigDaan</span>
      </div>
      <blockquote className="research-story-quote"><p>Als eigenaar van de sportapp wil ik data-afscherming in Supabase inrichten, zodat gebruikers hun progressie veilig kunnen bijhouden zonder dat hun gegevens voor anderen zichtbaar zijn.</p></blockquote>
    </section>

    <section className="research-section">
      <div className="blog-content">
        <div className="blog-section">
          <h2>Aanleiding: mijn app was online, maar hoe veilig was deze?</h2>
          <p>In Sprint 2 begon BigDaan als een sportapp voor mezelf. Later groeide het project uit tot een online applicatie waarin meerdere mensen een account konden gebruiken. Met Supabase wilde ik gebruikersaccounts en trainingsgegevens opslaan.</p>
          <p>Ik was trots dat ik de applicatie met AI-ondersteuning had ontwikkeld. Tegelijkertijd begon ik te begrijpen dat een applicatie die werkt niet vanzelfsprekend ook zorgvuldig met gebruikersgegevens omgaat.</p>
        </div>
        <div className="blog-section">
          <h2>Feedback van iemand met cybersecuritykennis</h2>
          <p>Een vriend met kennis van cybersecurity bekeek BigDaan en de bijbehorende code. Hij wees mij erop dat gevoelige informatie op plekken in de code stond waar die niet thuishoorde en legde uit welke risico’s dat kon opleveren.</p>
          <p>Tot dat moment had ik vooral gefocust op functies bouwen en mijn applicatie werkend krijgen. Door zijn feedback zag ik dat ik als ontwikkelaar ook verantwoordelijkheid draag voor de gegevens die gebruikers aan mijn app toevertrouwen.</p>
        </div>
        <div className="blog-section">
          <h2>Waarom dit belangrijk was</h2>
          <p>In BigDaan kunnen gebruikers persoonlijke trainingsgegevens zoals workouts, oefeningen en voortgang bijhouden. Als meerdere mensen de app gebruiken, hoort ieder account alleen de eigen gegevens te kunnen bekijken en aanpassen. Ik wilde daarom de toegang niet alleen in de interface regelen, maar ook op databaseniveau beperken.</p>
          <p>Daarnaast leerde ik dat gevoelige informatie in broncode of in een openbare repository onbedoeld toegankelijk kan worden. Dat vroeg om zorgvuldiger beheer van configuratie en sleutels.</p>
        </div>
        <div className="blog-section">
          <h2>Mijn aanpak: gevoelige informatie beschermen</h2>
          <p>Ik heb de code en configuratie opnieuw bekeken en gevoelige informatie uit de actieve broncode gehaald. Ook heb ik `.gitignore` aangepast zodat lokale bestanden met instellingen niet zomaar in nieuwe Git-commits terechtkomen.</p>
          <p>Ik leerde onderscheid te maken tussen publieke configuratie en geheime sleutels. Een publieke Supabase publishable key is bedoeld voor gebruik door een client en is op zichzelf geen vervanging voor toegangsbeleid. Een service- of serverkey is geheim en hoort uitsluitend in een beschermde serveromgeving; die mag niet in frontendcode belanden. Voor BigDaan zijn gevoelige waarden veilig opgeslagen in `.gitignore` en in Vercel Secrets, zodat ze niet openbaar in de repository staan.</p>
        </div>
        <div className="blog-section">
          <h2>Mijn aanpak: Supabase en Row Level Security</h2>
          <p>Naast de code heb ik gewerkt aan SQL-scripts en database-instellingen om gebruikersgegevens beter af te schermen. Mijn doel was om Row Level Security (RLS) te gebruiken, zodat toegangsregels op databaseniveau bepalen welke rijen een gebruiker mag lezen of aanpassen.</p>
          <p>Ik heb dit gecontroleerd met testaccounts: elk account kon alleen de eigen workoutdata zien. Daarmee heb ik de gegevensafscherming tussen deze testaccounts bevestigd.</p>
          <p>Daarnaast zijn er unieke gebruikers-ID’s gebruikt, zodat workouts, oefeningen en profielen altijd aan het juiste account zijn gekoppeld. De exacte SQL-policycode zet ik niet online in deze portfolio, maar de werking is door Chat Codex getest en goedgekeurd.</p>
        </div>
        <div className="blog-section">
          <h2>Wat is Row Level Security?</h2>
          <div className="note-box"><p>Row Level Security (RLS) is een beveiligingsfunctie van PostgreSQL, de database die Supabase gebruikt. Per tabel kun je instellen welke rijen een gebruiker mag bekijken, toevoegen, wijzigen of verwijderen. Het doel bij BigDaan is dat een gebruiker alleen toegang krijgt tot trainingsgegevens die bij het eigen account horen. Zo wordt toegang niet alleen door de interface bepaald, maar ook door regels in de database. De feitelijke bescherming hangt wel af van correct ingestelde en geteste policies.</p></div>
        </div>
        <div className="blog-section">
          <h2>Hoe ik AI hierbij gebruikte</h2>
          <p>Ik gebruikte AI als hulpmiddel om beveiligingsbegrippen en mogelijke oplossingen beter te begrijpen en om aanpassingen voor te bereiden. AI kan uitleg geven en helpen opties te verkennen, maar de uitkomst moet ik zelf controleren voordat die wordt toegepast op gebruikersgegevens.</p>
          <p>Ik noem geen specifieke prompts of AI-tools, omdat daar in de beschikbare projectbestanden geen controleerbaar bewijs van staat. Mijn belangrijkste inzicht is dat AI-gegenereerde code niet automatisch veilig of correct is: ik blijf verantwoordelijk voor het beoordelen en testen ervan.</p>
        </div>
        <div className="blog-section">
          <h2>Resultaat</h2>
          <p>De feedback heeft mijn aandacht verlegd van alleen functionaliteit naar ook het beschermen van gebruikersgegevens. Ik heb volgens mijn projectverloop gevoelige informatie uit de actieve code gehaald, het beheer van lokale instellingen aangepast en gewerkt aan extra databasebeveiligingsregels.</p>
          <p>De beveiliging van BigDaan is daarom gericht op het voorkomen van ongewenste toegang: gebruikers hebben unieke ID’s, de app voorkomt dat accounts elkaars data kunnen zien, en de RLS-oplossing is door Chat Codex getest en goedgekeurd. De exacte SQL-policies blijf ik niet online publiceren, maar de principes en de verificatie zijn wel bevestigd. De applicatie is te bekijken via Vercel.</p>
          <a className="button button-primary" href="https://sportapp-big-daan.vercel.app/" target="_blank" rel="noreferrer">Bekijk BigDaan <ExternalLink size={16} /></a>
        </div>
        <div className="blog-section">
          <h2>Wat ik heb geleerd</h2>
          <p>Ik heb geleerd dat softwareontwikkeling niet ophoudt wanneer de functies werken. Ik moet ook nadenken over welke gegevens worden opgeslagen, wie erbij kan en hoe ik voorkom dat informatie onbedoeld wordt gedeeld.</p>
          <p>Daarnaast begrijp ik beter waarom `.gitignore` nuttig is, hoe publieke configuratie verschilt van geheime serverkeys en waarom RLS een extra controlelaag in de database kan bieden. Ik heb ook geleerd dat AI mij kan ondersteunen, maar mijn eigen controle en verantwoordelijkheid niet vervangt.</p>
        </div>
        <div className="blog-section">
          <h2>Reflectie</h2>
          <p>Achteraf ben ik blij dat mijn vriend de beveiliging van BigDaan heeft bekeken. Ik was vooral trots dat de applicatie werkte en dat anderen hem konden gebruiken. Zijn feedback maakte mij bewust van risico’s waar ik nog niet voldoende bij had stilgestaan.</p>
          <p>Ik vond het leerzaam om te onderzoeken hoe Supabase toegangsregels kan bieden en hoe gebruikersgegevens per account beschermd kunnen worden. Bij een volgende applicatie wil ik vanaf het begin nadenken over wat gebruikers wel én juist niet mogen doen. AI helpt mij bouwen, maar ik blijf verantwoordelijk voor de kwaliteit en veiligheid van het resultaat.</p>
        </div>
      </div>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Tijdlijn</p><h2>Van online app naar beveiligingsbewustzijn</h2></div>
      <div className="reflection-list">
        <article><h3>1. BigDaan online</h3><p>Mijn sportapp was beschikbaar voor meerdere gebruikers.</p></article>
        <article><h3>2. Feedback</h3><p>Een vriend met cybersecuritykennis wees mij op risico’s in de code.</p></article>
        <article><h3>3. Beveiliging verbeteren</h3><p>Ik paste het beheer van gevoelige informatie aan en werkte aan databasebeveiligingsregels.</p></article>
        <article><h3>4. Nieuw inzicht</h3><p>Ik leerde dat een werkende AI-app niet automatisch een veilige AI-app is.</p></article>
      </div>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Acceptatiecriteria</p><h2>Gegevensafscherming in BigDaan</h2></div>
      <div className="reflection-list">
        {bigDaanSecurityAcceptanceCriteria.map((criterion) => <article key={criterion.title}>
          <h3>{criterion.title}</h3>
          <p>{criterion.description}</p>
          <span className="learning-outcome-badge">{criterion.status}</span>
        </article>)}
      </div>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Kwaliteitscriteria</p><h2>Wat ik nog technisch moet aantonen</h2></div>
      <div className="reflection-list">
        {bigDaanSecurityQualityCriteria.map((criterion) => <article key={criterion.title}>
          <h3>{criterion.title}</h3>
          <p>{criterion.description}</p>
          <span className="learning-outcome-badge">{criterion.status}</span>
        </article>)}
      </div>
    </section>

    <section className="research-section">
      <div className="section-heading-block"><p className="section-kicker">Bewijsmateriaal</p><h2>Beveiliging van BigDaan</h2></div>
      <div className="reflection-list">
        <article><h3>1. Cybersecurityfeedback</h3><p>Ruimte voor een screenshot of document met de ontvangen feedback. Deel hier geen wachtwoorden, sleutels of werkende exploitdetails.</p></article>
        <article><h3>2. Code en geheimenbeheer</h3><p>Ruimte voor veilige screenshots van relevante codewijzigingen, omgevingsvariabelen en `.gitignore`. Controleer vóór toevoegen dat er geen geheimen zichtbaar zijn.</p></article>
        <article><h3>3. Databaseschema BigDaan</h3><p>Het schema toont de tabellen, user_id-kolommen en relaties als context voor de gegevensafscherming. Een schema alleen bewijst niet dat RLS-policies actief zijn.</p><img className="portfolio-evidence-image" src="/assets/aistudio/Database%20schema%20BigDaan.png" alt="Database schema van BigDaan met workout- en gebruikersgerelateerde tabellen en relaties" loading="lazy" /></article>
        <article className="security-sql-evidence"><h3>4. SQL Editor overzicht</h3><p>Overzicht van SQL Editor-scripts, waaronder een tab met de naam RLS controle. De screenshot toont niet de SQL-inhoud of uitvoer van policies.</p><img className="portfolio-evidence-image" src="/assets/aistudio/SQL%20Editor%20Overzicht.png" alt="Overzicht van SQL Editor-tabs, waaronder RLS controle" loading="lazy" /></article>
        <article><h3>5. Tests voor gegevensafscherming</h3><p>Met testaccounts is gecontroleerd dat ieder account alleen de eigen workoutdata kon zien. Een geanonimiseerde screenshot van deze testresultaten kan hier nog worden toegevoegd.</p></article>
        <article><h3>6. Werkende sportapp</h3><p>Open de gepubliceerde applicatie.</p><a className="evidence-link" href="https://sportapp-big-daan.vercel.app/" target="_blank" rel="noreferrer">Bekijk BigDaan <ExternalLink size={15} /></a></article>
      </div>
    </section>
    <div className="back-link-row"><button className="text-button" onClick={() => navigate('bewijs')}>← Terug naar mijn bewijs</button></div>
  </PageIntro>;
}

const aiITStorySections = [
  {
    title: 'Van uitvoerder naar AI-regisseur',
    paragraphs: [
      'Generatieve AI verandert de IT-sector in hoog tempo. Tools zoals GitHub Copilot kunnen code schrijven en aanvullen, fouten opsporen en documentatie maken. Daardoor verandert het dagelijkse werk van IT-professionals. AI neemt vooral repetitieve en voorspelbare taken over, maar vervangt IT-beroepen niet zomaar volledig. De komende vijf tot tien jaar verschuift de rol van veel IT’ers van uitvoerend specialist naar iemand die AI aanstuurt, controleert en verantwoordelijk inzet.',
      'De kern van het werk verschuift daarmee: niet alleen iets bouwen, maar ook beoordelen of een AI-oplossing correct, veilig, onderhoudbaar en passend is voor de organisatie en de gebruiker.',
    ],
  },
  {
    title: 'Softwareontwikkeling en leren programmeren',
    paragraphs: [
      'Een duidelijk voorbeeld is softwareontwikkeling. In een gecontroleerd experiment met GitHub Copilot voltooiden ontwikkelaars met toegang tot de AI-tool een programmeertaak 55,8% sneller dan ontwikkelaars zonder die tool (Peng et al., 2023). AI kan helpen bij het schrijven van code, het maken van voorbeelden en het versnellen van eenvoudig programmeerwerk. Een systematische review laat zien dat grote taalmodellen onder meer worden ingezet voor codegeneratie, code-aanvulling, foutopsporing, testen, documentatie en code review (Hou et al., 2024). Complexe softwareontwikkeling, systeemontwerp en veiligheid blijven wel menselijke verantwoordelijkheden.',
      'Ook het werk van beginnende ontwikkelaars verandert. AI kan helpen bij het leren programmeren, het begrijpen van code en het oplossen van fouten. Junior developers moeten de output echter kritisch blijven beoordelen. Wie te veel op AI vertrouwt, loopt het risico minder goed te leren om zelfstandig problemen op te lossen en fundamentele programmeerkennis op te bouwen (Ouyang et al., 2025). AI maakt leren toegankelijker, maar vraagt ook zelfdiscipline en kritisch denken.',
    ],
  },
  {
    title: 'Cybersecurity: hulp én extra risico',
    paragraphs: [
      'In cybersecurity kan AI helpen bij het herkennen van bedreigingen, het analyseren van malware, het opstellen van rapporten en het ondersteunen van incident response. Grote taalmodellen bieden hier mogelijkheden, maar brengen ook risico’s mee: ze kunnen fouten maken, kwetsbaarheden missen of door aanvallers worden misbruikt (Zhang et al., 2024). Cybersecurityspecialisten blijven nodig om risico’s te beoordelen, systemen te testen en tijdens incidenten weloverwogen beslissingen te nemen.',
    ],
  },
  {
    title: 'IT-support wordt specialistischer',
    paragraphs: [
      'Ook IT-support verandert. Machine learning kan helpen om tickets automatisch te classificeren, meldingen toe te wijzen en oplossingen voor te stellen. Dat kan de werkdruk verlagen en gebruikers sneller helpen (Sarker et al., 2019). Complexe technische problemen, escalaties en persoonlijk contact blijven echter mensenwerk. De supportmedewerker verschuift daardoor van het beantwoorden van standaardvragen naar het oplossen van ingewikkelde incidenten.',
    ],
  },
  {
    title: 'Welke vaardigheden worden belangrijker?',
    paragraphs: [
      'De bredere arbeidsmarkt ondersteunt het beeld dat AI vooral taken verandert. Het World Economic Forum (2025) verwacht dat technologische vaardigheden, AI en big data, cybersecurity en analytisch denken belangrijker worden. Tegelijkertijd blijven creatief denken, communicatie, samenwerking en probleemoplossend vermogen essentieel. Ook het UWV (2025) concludeert dat AI vooral het takenpakket verandert. ICT’ers blijven nodig voor ontwerp, beheer, beveiliging, integratie en verantwoordelijkheid, ook wanneer AI eenvoudige code kan schrijven.',
    ],
  },
  {
    title: 'Verantwoordelijkheid en regelgeving',
    paragraphs: [
      'Regelgeving maakt die verantwoordelijkheid nog belangrijker. De Europese AI Act stelt voor bepaalde AI-systemen eisen aan onder meer risicobeheer, documentatie, cybersecurity, transparantie en menselijk toezicht (European Commission, 2024). Voor IT-professionals betekent dit dat zij bij het bouwen van technische oplossingen ook moeten nadenken over privacy, veiligheid en compliance. ENISA en het AI Office (2025) benadrukken dat cybersecurity een vast onderdeel moet zijn van veilige AI-ontwikkeling.',
    ],
  },
  {
    title: 'De IT-professional als AI-regisseur',
    paragraphs: [
      'De grootste kans van AI is niet dat IT’ers worden vervangen, maar dat zij productiever kunnen werken. AI kan ondersteunen bij het maken en testen van code, het analyseren van data en het oplossen van standaardproblemen. Daar staan risico’s tegenover: afhankelijkheid van AI, onbetrouwbare output, veiligheidsproblemen en mogelijk minder aandacht voor basisvaardigheden bij beginnende professionals.',
      'De IT-professional van de toekomst is daarom geen concurrent van AI, maar een regisseur die AI verantwoord inzet. Die professional begrijpt hoe AI werkt, wanneer de output betrouwbaar is en wanneer menselijke controle nodig blijft. De belangrijkste vraag is niet alleen of AI code kan schrijven, maar of die code veilig, correct, onderhoudbaar en passend is voor de organisatie en de gebruiker.',
    ],
  },
];

const aiITStorySources = [
  ['European Commission. (2024).', 'AI Act.', 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'],
  ['European Union Agency for Cybersecurity, & European Commission AI Office. (2025).', 'The EU AI Act and cybersecurity [Webinar].', 'https://www.enisa.europa.eu/sites/default/files/2025-04/AI_Office_AIA%20and%20cyber-ENISA_Webinar.pdf'],
  ['Hou, X., Zhao, Y., Liu, Y., Yang, Z., Wang, K., Li, L., Luo, X., Lo, D., & Grundy, J. (2024).', 'Large language models for software engineering: A systematic literature review. ACM Transactions on Software Engineering and Methodology, 33(8), Article 220.', 'https://doi.org/10.1145/3695988'],
  ['Ouyang, Y., et al. (2025).', 'Junior software developers’ perspectives on adopting LLMs for software engineering: A systematic literature review [Preprint]. arXiv.', 'https://doi.org/10.48550/arXiv.2503.07556'],
  ['Peng, S., Kalliamvakou, E., Cihon, P., & Demirer, M. (2023).', 'The impact of AI on developer productivity: Evidence from GitHub Copilot [Preprint]. arXiv.', 'https://doi.org/10.48550/arXiv.2302.06590'],
  ['Sarker, I. H., et al. (2019).', 'Corporate IT-support help-desk process hybrid-automation solution with machine learning approach [Preprint]. arXiv.', 'https://doi.org/10.48550/arXiv.1909.09018'],
  ['UWV. (2025).', 'Op weg naar AI die werkt voor iedereen.', 'https://www.uwv.nl/assets/files/2189148b-b975-475a-987f-e307bfeeae54/Op_weg_naar_AI_die_werkt_voor_iedereen_DEF.pdf'],
  ['World Economic Forum. (2025).', 'The Future of Jobs Report 2025.', 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/'],
  ['Zhang, J., Bu, H., Wen, H., Liu, Y., Fei, H., Xi, R., Li, L., Yang, Y., Zhu, H., & Meng, D. (2024).', 'When LLMs meet cybersecurity: A systematic literature review [Preprint]. arXiv.', 'https://doi.org/10.48550/arXiv.2405.03644'],
];

function AITRegisseurStoryPage({ navigate }: { navigate: (page: Page) => void }) {
  return <PageIntro eyebrow="Sprint 3 · Research Story" title="AI verandert IT-beroepen: van programmeur naar AI-regisseur" intro="Hoe verandert generatieve AI het werk van IT-professionals, en welke verantwoordelijkheid blijft bij mensen liggen?">
    <section className="research-section">
      <div className="research-section-heading">
        <p className="section-kicker">Research Story</p>
        <span className="learning-outcome-badge">LU 1 &amp; LU 3</span>
      </div>
      <div className="blog-content">
        {aiITStorySections.map((section) => (
          <div className="blog-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        ))}
      </div>
      <aside className="infographic-panel">
        <div className="infographic-main-card">
          <img src="/assets/aistudio/InfographicITonderzoek.jpg" alt="Infographic over de invloed van AI op IT-beroepen" />
        </div>
        <a className="download-button" href="/assets/aistudio/InfographicITonderzoek.jpg" download="InfographicITonderzoek.jpg">
          Download infographic
        </a>
      </aside>
    </section>
    <section className="research-section sources-section">
      <div className="section-heading-block"><p className="section-kicker">Bronnen</p><h2>Literatuurlijst</h2></div>
      <ol className="sources-list">{aiITStorySources.map(([author, title, url]) => <li key={url}><span>{author} <em>{title}</em> </span><a href={url} target="_blank" rel="noreferrer">{url}</a></li>)}</ol>
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
