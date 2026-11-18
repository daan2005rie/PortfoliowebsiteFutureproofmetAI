import { ExternalLink } from 'lucide-react';

const learningOutcomes = [
  {
    code: 'LU4',
    title: 'AI-tools en technieken toepassen',
    officialDescription: 'Je kunt AI-tools en technieken onafhankelijk gebruiken (bijvoorbeeld ML, chatbots, agents en prompts) om taken binnen je vakgebied op te lossen.',
    connection: 'Ik gebruikte ChatGPT om mijn User Stories, criteria en eigen ervaringen te structureren tot uitgebreide Learning Stories. Daarna gebruikte ik AI-ondersteund programmeren in Visual Studio Code om de teksten en navigatie in mijn bestaande portfolio te verwerken.',
  },
  {
    code: 'LU5',
    title: 'Regie voeren over mijn eigen leerproces',
    officialDescription: 'Je kunt zelfstandig en zelfsturend werken: een eigen leerroute bepalen en uitvoeren, leervragen stellen, bronnen en tools kiezen, je voortgang volgen en kritisch reflecteren.',
    connection: 'Ik ontdekte zelf dat mijn portfolio achterliep, nam verantwoordelijkheid voor het wegwerken van de achterstand en organiseerde de ontbrekende verhalen per sprint, leeruitkomst en criterium. Ik reflecteerde ook op de informatiegrenzen rond werkzaamheden bij PLTFRM.',
  },
];

const timeline = [
  ['1', 'Achterstand ontdekt', 'Ik realiseerde mij dat er op dat moment ongeveer vijf stories online stonden, terwijl ik al meer User Stories had uitgevoerd.'],
  ['2', 'Stories verzamelen', 'Ik bracht mijn ervaringen, acceptatiecriteria, kwaliteitscriteria en de opdrachten uit Sprint 2, 3, 4 en 5 in kaart.'],
  ['3', 'AI gebruiken', 'Met ChatGPT werkte ik mijn informatie uit tot gestructureerde teksten en prompts voor de portfolio-implementatie.'],
  ['4', 'Website bijwerken', 'Ik werkte de verhalen uit in Visual Studio Code, voegde ze toe aan de juiste sprint en koppelde ze aan leeruitkomsten.'],
  ['5', 'Portfolio onderhouden', 'Ik wil mijn Learning Stories voortaan eerder vastleggen en informatie over PLTFRM pas publiceren na toestemming en afstemming.'],
];

const acceptanceCriteria = [
  {
    title: 'Alle stories behalve PLTFRM staan online',
    status: 'Behaald voor de bekende niet-PLTFRM stories',
    result: 'In de projectregistratie zijn 11 niet-PLTFRM-evidence cards opgenomen over Sprint 1 tot en met Sprint 5. Tijdens dit Sprint 5-werk werden de ontbrekende en nieuwe verhalen toegevoegd. Er zijn geen PLTFRM-verhalen toegevoegd; deze blijven buiten publicatie tot mijn begeleider aangeeft welke informatie gedeeld mag worden.',
  },
  {
    title: 'Alle stories zijn gekoppeld aan juiste leeruitkomsten',
    status: 'Gedeeltelijk controleerbaar',
    result: 'De huidige evidenceStories-registratie koppelt iedere geregistreerde story aan leeruitkomsten. Voor oudere of toekomstige stories moet de inhoud nog steeds individueel worden vergeleken met de officiële leeruitkomstomschrijving. Dit verificatiebewijs is niet voor iedere story in één overzicht beschikbaar.',
  },
  {
    title: 'Per story zijn criteria en aantoonbare resultaten benoemd',
    status: 'Gedeeltelijk behaald',
    result: 'Een deel van de bestaande Learning Stories benoemt acceptatiecriteria, kwaliteitscriteria en de grenzen van het bewijs. Niet iedere bestaande story bevat een volledig aantoonbaar controlerapport. Daar waar bewijs ontbreekt, wordt dit in de stories niet als definitief resultaat gepresenteerd.',
  },
];

const qualityCriteria = [
  {
    title: 'Mobiele gebruikerservaring',
    status: 'Nog niet geverifieerd',
    result: 'De website gebruikt bestaande responsive CSS en componenten. Zonder vastgelegde mobiele testresultaten wordt geen uitspraak gedaan dat iedere pagina op elk mobiel apparaat is goedgekeurd.',
  },
  {
    title: 'GitHub en Vercel',
    status: 'Nog niet geverifieerd',
    result: 'Er is niet automatisch een GitHub-push of Vercel-deployment uitgevoerd. Een screenshot van de repository, commit en deployment kan als apart bewijs worden toegevoegd.',
  },
  {
    title: 'Afbeeldingen op de productieversie',
    status: 'Gedeeltelijk controleerbaar',
    result: 'Afbeeldingen gebruiken lokale publieke bestanden. De code bouwt lokaal correct, maar een eindcontrole van alle losse afbeeldingen op de live Vercel-versie is nog niet als screenshot of rapport aangeleverd.',
  },
];

const evidenceItems = [
  ['Mijn portfolio vóór de update', 'Overzicht of screenshot waarmee aanvankelijk ongeveer vijf stories zichtbaar waren.', null],
  ['Mijn bijgewerkte portfolio', 'Screenshot van de bewijspagina met stories uit meerdere sprints.', '/assets/aistudio/Oude indeling mijn bewijs 2.png'],
  ['AI gebruiken voor Learning Stories', 'Gesprek met ChatGPT waarin ik mijn User Stories, ervaringen en criteria invoerde.', null],
  ['Implementatie in VS Code', 'Screenshot van de componenten en de toevoeging van een nieuwe Learning Story.', null],
  ['Leeruitkomstenfilter', 'Screenshot waarop bezoekers op LU4 of LU5 kunnen filteren.', '/assets/aistudio/FilterLeeruitkomsten.png'],
  ['Criteria en resultaten', 'Screenshot van een Learning Story met criteria, status en onderbouwing.', null],
  ['GitHub en Vercel', 'Placeholder voor repository, commit, deployment en live-status.', null],
  ['Mobiele versie', 'Screenshot van de portfolio-pagina op een mobiel scherm.', null],
];

export default function PortfolioMaintenanceStoryPage({ navigate }: { navigate: () => void }) {
  return <>
    <section className="page-intro reveal">
      <p className="eyebrow"><span /> Sprint 5 · Learning Story</p>
      <h1>Mijn AI-portfolio bijwerken: van achterstand naar een compleet overzicht</h1>
      <p className="intro">Tijdens Sprint 5 werkte ik mijn achterstand in documentatie weg. Ik beschreef de opdrachten die ik had uitgevoerd, koppelde ze aan leeruitkomsten en gebruikte AI om de inhoud gestructureerd te maken en in mijn portfolio te verwerken.</p>
    </section>

    <div className="page-body reveal delay-one">
      <section className="research-section">
        <div className="research-section-heading">
          <p className="section-kicker">Leeruitkomsten</p>
          <span className="learning-outcome-badge">LU4 · LU5</span>
        </div>
        <div className="reflection-list">
          {learningOutcomes.map((outcome) => <article key={outcome.code}>
            <h3>{outcome.code}: {outcome.title}</h3>
            <p><strong>Officiële omschrijving:</strong> {outcome.officialDescription}</p>
            <p><strong>Koppeling met mijn story:</strong> {outcome.connection}</p>
          </article>)}
        </div>
      </section>

      <section className="research-section">
        <div className="research-section-heading">
          <p className="section-kicker">Mijn user story</p>
          <span className="learning-outcome-badge">Portfolio-website</span>
        </div>
        <blockquote className="research-story-quote"><p>Als student Futureproof met AI wil ik dat mijn website up-to-date is qua User Stories, zodat ik dit niet allemaal aan het einde van de periode hoef bij te werken.</p></blockquote>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Aanleiding</p><h2>Mijn portfolio liep achter</h2></div>
        <div className="blog-content">
          <div className="blog-section">
            <p>Tijdens Sprint 5 realiseerde ik mij dat ik achterliep met het bijwerken van mijn portfolio. Ik had veel opdrachten uitgevoerd en meerdere User Stories afgerond, maar op dat moment stonden er volgens mijn eigen terugblik ongeveer vijf verhalen online. Daardoor gaf mijn website geen volledig beeld van wat ik had geleerd en ontwikkeld.</p>
            <p>Ik had vooral aandacht besteed aan het uitvoeren van opdrachten, waaronder het ontwikkelen en verbeteren van BigDaan. Het documenteren daarvan had ik regelmatig uitgesteld. Toen ik alle ontbrekende verhalen naast elkaar zag, besloot ik om mijn portfolio in een overzichtelijke stap weer bij te werken.</p>
          </div>
          <div className="blog-section">
            <h2>Mijn doel</h2>
            <p>Mijn doel was om alle uitgevoerde niet-PLTFRM User Stories overzichtelijk op mijn website te plaatsen. Daarbij wilde ik het oorspronkelijke doel, mijn aanpak, de resultaten, de acceptatie- en kwaliteitscriteria, de leeruitkomsten en mijn reflectie duidelijk maken.</p>
            <p>De verhalen moesten professioneel blijven werken op desktop en mobiel en zichtbaar worden in de bestaande sprintindeling. Ook wilde ik dat later een bijgewerkte versie via GitHub en Vercel beschikbaar kon komen, zonder dit onderdeel zelf automatisch te publiceren.</p>
          </div>
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Mijn aanpak</p><h2>Van overzicht naar verhaal</h2></div>
        <ol className="backup-timeline">
          {timeline.map(([number, title, description]) => <li key={number}><span className="backup-timeline-marker" /><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ol>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">AI ondersteunen</p><h2>ChatGPT en Visual Studio Code</h2></div>
        <div className="blog-content">
          <div className="blog-section">
            <h2>Stories uitwerken met ChatGPT</h2>
            <p>Ik gebruikte ChatGPT om mijn eigen informatie om te zetten in duidelijke Learning Stories. Per opdracht gaf ik onder andere de User Story, criteria, uitgevoerde werkzaamheden, uitdagingen en leerpunten aan. Het model hielp mij om die informatie te ordenen en uit te werken in een leesbare ik-vorm.</p>
            <p>Het voordeel was dat ik niet iedere story helemaal vanaf nul hoefde op te bouwen. Ik bleef zelf verantwoordelijk voor de inhoud. Daarom controleerde ik of teksten aansloten op mijn echte werkzaamheden en welke onderdelen nog als onbewezen of gedeeltelijk bewezen moesten worden beschreven.</p>
          </div>
          <div className="blog-section">
            <h2>Van prompt naar website</h2>
            <p>Na het uitwerken maakte ik prompts voor de implementatie in Visual Studio Code. Naast tekst bevatten deze opdrachten ook technische instructies, bijvoorbeeld over de sprintindeling, leeruitkomsten, bewijskaarten, vormgeving, navigatie, imports en het voorkomen van dubbele stories.</p>
            <p>Zo gebruikte ik AI niet alleen voor tekst, maar ook als ondersteuning bij het verwerken van mijn verhalen in de bestaande React-portfolio. De functie, bestaande content en gegevensbron bleven daarbij onder mijn controle; ik controleerde de projectstructuur en paste alleen de voor deze story benodigde onderdelen aan.</p>
          </div>
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Wat ik publiceerde</p><h2>De verhalen per sprint</h2></div>
        <div className="feature-grid">
          <article className="feature-card"><p className="feature-label">Sprint 2</p><p>Ik werkte onder andere mijn portfolioverbeteringen en de ontwikkeling van BigDaan uit. Daarbij beschreef ik de rustige vormgeving, het sprintoverzicht, de uitbreiding naar meerdere gebruikers na feedback van Thom en Bjorn en de koppeling met Supabase.</p></article>
          <article className="feature-card"><p className="feature-label">Sprint 3</p><p>Ik werkte mijn story over de beveiliging van BigDaan bij. De aanleiding was cyberveiligheidsfeedback over gevoelige informatie, databasebeveiliging en Row Level Security.</p></article>
          <article className="feature-card"><p className="feature-label">Sprint 4</p><p>Ik beschreef mijn back-upstrategie voor BigDaan. Het advies van ChatGPT Codex maakte mij bewuster van de risico's bij grotere updates en de noodzaak om herstelmogelijkheden te bedenken.</p></article>
          <article className="feature-card"><p className="feature-label">Sprint 5</p><p>Ik voegde onder andere de Learning Stories over de verdere ontwikkeling van BigDaan en het bijwerken van mijn portfolio toe. Mijn aandacht bij deze opdracht bleef gericht op documenteren, organiseren en kritisch reflecteren.</p></article>
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Criteria</p><h2>Leeruitkomsten en bewijsgerechtigheid</h2></div>
        <div className="blog-content">
          <div className="blog-section">
            <h2>De juiste leeruitkomsten koppelen</h2>
            <p>Ik koppelde de stories aan de leeruitkomsten die bij de werkzaamheden horen. Door de bestaande filterfunctie kunnen bezoekers in het bewijsoverzicht een combinatie van leeruitkomsten selecteren. Zo kan een docent gerichter bekijken waar een story relevant voor is.</p>
          </div>
          <div className="blog-section">
            <h2>Criteria inzichtelijk maken</h2>
            <p>Bij de stories benoemde ik acceptatiecriteria, kwaliteitscriteria en beschikbare resultaten. Ik maakte onderscheid tussen wat aantoonbaar is behaald, gedeeltelijk controleerbaar is of nog niet voldoende is onderbouwd. Hierdoor wordt een portfolio niet alleen een verzameling teksten, maar ook een verantwoorde bewijsplek.</p>
          </div>
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Publicatiegrens</p><h2>Waarom PLTFRM nog buiten publicatie blijft</h2></div>
        <div className="note-box"><p>Ik ben ook bezig met opdrachten bij het bedrijf PLTFRM, waaronder een marketingdashboard. Deze werkzaamheden wil ik eventueel als bewijs gebruiken. Ik heb de PLTFRM-stories en het bijbehorende materiaal nog niet gepubliceerd, omdat ik eerst met mijn begeleider wil afstemmen welke informatie openbaar mag worden gedeeld. Ik wil geen interne, bedrijfsgevoelige of nog niet goedgekeurde informatie op mijn publieke portfolio zetten.</p></div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Acceptatiecriteria</p><h2>Huidige status</h2></div>
        <div className="reflection-list backup-status-grid">
          {acceptanceCriteria.map((criterion) => <article key={criterion.title}><h3>{criterion.title}</h3><p>{criterion.result}</p><span className="backup-status">{criterion.status}</span></article>)}
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Kwaliteitscriteria</p><h2>Wat is aantoonbaar?</h2></div>
        <div className="reflection-list backup-status-grid">
          {qualityCriteria.map((criterion) => <article key={criterion.title}><h3>{criterion.title}</h3><p>{criterion.result}</p><span className="backup-status">{criterion.status}</span></article>)}
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Bewijsmateriaal</p><h2>Portfolio bijwerken in beeld</h2></div>
        <div className="reflection-list backup-evidence-grid">
          {evidenceItems.map(([title, description, image]) => <article key={title}>
            <h3>{title}</h3><p>{description}</p>
            {image ? <figure className="backup-evidence-figure"><img src={image} alt={title} loading="lazy" /></figure> : <div className="backup-evidence-slot">Screenshot of document kan hier later worden toegevoegd</div>}
          </article>)}
          <article><h3>Live portfolio</h3><p>Bekijk de huidige publieke portfolio-versie.</p><a className="button button-primary" href="https://portfoliowebsite-futureproofmet-ai.vercel.app/" target="_blank" rel="noreferrer">Bekijk mijn portfolio <ExternalLink size={16} /></a></article>
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Wat ik heb geleerd</p><h2>Van achterstand naar een betere werkwijze</h2></div>
        <div className="blog-content">
          <div className="blog-section"><p>Ik heb geleerd dat het regelmatig vastleggen van mijn leerproces belangrijk is. Wanneer ik meerdere weken aan opdrachten werk zonder mijn portfolio bij te houden, ontstaat snel een grote achterstand. Door in Sprint 5 terug te kijken, kreeg ik ook zelf beter overzicht van hoeveel ik tijdens de minor had gedaan.</p><p>Ik ontdekte hoe ChatGPT mijn eigen ervaringen kan structureren, maar ik leerde ook dat goede prompts en eigen controle nodig zijn. AI hielp mij met tekst en implementatie, maar ik moest zelf beoordelen of de inhoud, criteria en status aansloten op mijn werkelijke ervaringen.</p><p>Een ander belangrijk leerpunt was bewust omgaan met openbare bedrijfsinformatie. Bij PLTFRM wil ik geen interne gegevens of niet-goedgekeurde werkzaamheden publiceren. Ik moet daarom afstemmen met mijn begeleider voordat ik die stories toevoeg.</p></div>
          <div className="blog-section"><h2>Persoonlijke reflectie</h2><p>Achteraf ben ik blij dat ik tijdens Sprint 5 tijd heb genomen om mijn portfolio bij te werken. Ik was veel bezig geweest met het bouwen van applicaties en het uitvoeren van opdrachten en had het vastleggen daarvan minder goed gepland.</p><p>Door ChatGPT te gebruiken voor structuur en Visual Studio Code voor implementatie kon ik mijn achterstand aanpakken. Ik ben tevreden dat mijn portfolio beter laat zien wat ik tijdens de minor heb gedaan. Voor de rest van mijn minor wil ik verhalen eerder schrijven, zodat ik niet opnieuw een grote achterstand krijg.</p><p>Deze opdracht heeft mij laten zien dat zelfstandig leren niet alleen betekent dat ik nieuwe toepassingen maak, maar ook dat ik mijn werkzaamheden plan, documenteer, onderbouw en kritisch reflecteer.</p></div>
        </div>
      </section>

      <div className="back-link-row"><button className="text-button" onClick={navigate}>← Terug naar mijn bewijs</button></div>
    </div>
  </>;
}
