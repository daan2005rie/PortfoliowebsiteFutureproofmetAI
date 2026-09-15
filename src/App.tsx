/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ExternalLink, Menu, Sparkles, X } from 'lucide-react';

type Page = 'home' | 'over-mij' | 'bewijs';

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
  return navigation.some((item) => item.id === path) ? (path as Page) : 'home';
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
        {page === 'bewijs' && <EvidencePage />}
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

function EvidencePage() {
  return <PageIntro eyebrow="Mijn bewijs" title="Leren door te doen, delen en onderbouwen." intro="Op deze pagina verzamel ik de bewijzen waarmee ik mijn behaalde leeruitkomsten aantoon. Grote bestanden staan extern en worden hier gelinkt.">
    <div className="evidence-notice"><strong>Praktische afspraak</strong><span>Gebruik bijvoorbeeld OneDrive voor documenten en YouTube voor video’s. Zo blijven grote bestanden buiten GitHub en Vercel.</span></div>
    <div className="evidence-list">{evidenceGroups.map((group) => <section className="evidence-group" key={group.title}><div className="group-heading"><span className="number">LU</span><div><h2>{group.title}</h2><p>{group.description}</p></div></div><div className="evidence-cards">{group.evidence.map((item) => <article className="evidence-card" key={item.title}><div><h3>{item.title}</h3><p>{item.description}</p></div><a className="evidence-link" href={item.url} target="_blank" rel="noreferrer">Bekijk bewijs <ExternalLink size={15} /></a></article>)}</div></section>)}</div>
  </PageIntro>;
}

function PageIntro({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <><section className="page-intro reveal"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}</h1><p className="intro">{intro}</p></section><div className="page-body reveal delay-one">{children}</div></>;
}

export default App;
