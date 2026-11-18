import { ExternalLink } from 'lucide-react';

const learningOutcomes = [
  {
    code: 'LU3',
    title: 'Ethiek en verantwoordelijk AI-gebruik beoordelen',
    officialDescription: 'Je kunt ethische vraagstukken en uitdagingen van AI in je vakgebied identificeren en aanbevelingen formuleren voor verantwoord AI-gebruik, rekening houdend met privacy, bias en transparantie.',
    connection: 'Een back-upstrategie raakt aan de verantwoordelijkheid om gegevens van gebruikers zorgvuldig te behandelen en de gevolgen van verlies te beperken. Deze story benoemt dat belang, maar bevat nog geen aantoonbare back-up of volledige ethische analyse.',
  },
  {
    code: 'LU4',
    title: 'AI-tools en technieken gebruiken',
    officialDescription: 'Je kunt zelfstandig verschillende AI-tools en platforms toepassen, zoals machine-learningtechnieken, chatbots, agents en prompts, om taken binnen je vakgebied op te lossen.',
    connection: 'ChatGPT Codex wees mij op risico’s die ik bij een grotere wijziging nog niet had meegewogen. Dat advies vormde de aanleiding om over back-ups na te denken. Een screenshot of prompt als bewijs van dit gesprek is nog niet toegevoegd.',
  },
  {
    code: 'LU5',
    title: 'Zelfstandig en zelfsturend werken',
    officialDescription: 'Je kunt een eigen leerroute vaststellen en uitvoeren, zelfstandig leervragen stellen, bronnen en tools selecteren, je voortgang monitoren en kritisch reflecteren op je leerproces en ontwikkeling.',
    connection: 'Ik formuleerde een doel voor het veiligstellen van BigDaan en reflecteerde op de risico’s van grotere updates. Een uitgewerkt proces, terugkerende planning en hersteltest zijn nog niet met bestanden of screenshots onderbouwd.',
  },
];

const acceptanceCriteria = [
  {
    title: 'Acceptatiecriterium 1',
    description: 'Ik heb op mijn eigen computer lokaal een back-up staan.',
    status: 'Behaald',
    verification: 'De screenshot toont mijn lokale back-upmap met onder andere data.sql, migration_history.sql, roles.sql en schema.sql. De inhoud van de bestanden is niet zichtbaar op de afbeelding.',
  },
  {
    title: 'Acceptatiecriterium 2',
    description: 'De back-up bevat de benodigde databaseonderdelen, waaronder de relevante structuur en gegevens.',
    status: 'Behaald',
    verification: 'Volgens mijn controle met ChatGPT Codex zijn de benodigde databaseonderdelen aanwezig.',
  },
  {
    title: 'Acceptatiecriterium 3',
    description: 'Ik kan de applicatie opnieuw opstarten en de opgeslagen gegevens herstellen met behulp van mijn back-up.',
    status: 'Behaald',
    verification: 'Volgens mijn controle met ChatGPT Codex kan ik de applicatie en opgeslagen gegevens met de back-up herstellen.',
  },
];

const qualityCriteria = [
  {
    description: 'Als ik grote veranderingen doorvoer en er gaat iets mis, kan ik gemakkelijk met behulp van mijn back-up opnieuw beginnen.',
    verification: 'Door mij gecontroleerd met ChatGPT Codex.',
  },
  {
    description: 'Ik kan eenvoudig nieuwe gegevens of een nieuwe versie aan mijn back-up toevoegen.',
    verification: 'Door mij gecontroleerd met ChatGPT Codex.',
  },
  {
    description: 'Ik kan iedere twee weken een nieuwe back-up downloaden.',
    verification: 'Door mij gecontroleerd met ChatGPT Codex.',
  },
];

const databaseParts = [
  ['Databasegegevens en tabelinhoud', 'Volgens mijn controle met ChatGPT Codex zijn de benodigde gegevens opgenomen in de back-up. De back-upbestanden zelf zijn nog niet aan deze portfolio toegevoegd.'],
  ['Databaseschema, relaties en SQL-migraties', 'Volgens mijn controle met ChatGPT Codex bevat de back-up de relevante databaseonderdelen. Een aparte set SQL-migratiebestanden is hier niet als bewijs toegevoegd.'],
  ['RLS-policies en toegangsinstellingen', 'Niet aangetoond dat policies en andere toegangsinstellingen onderdeel zijn van een herstelbare back-up.'],
  ['Supabase Storage-bestanden', 'Niet vastgesteld of BigDaan Storage-bestanden gebruikt; er is geen export aangetoond.'],
  ['Authenticatiegegevens en configuratie', 'Niet aangetoond dat deze zijn veiliggesteld. Geheime sleutels en wachtwoorden horen niet in screenshots of openbare bestanden.'],
];

const evidenceItems = [
  {
    title: '1. Advies van ChatGPT Codex',
    description: 'Een screenshot van het advies is nog niet toegevoegd. In mijn verhaal beschrijf ik hoe de waarschuwing voor risico’s bij grotere updates de aanleiding werd om eerst over een back-up na te denken.',
  },
  {
    title: '2. Lokale back-up',
    description: 'De screenshot bij acceptatiecriterium 1 toont de lokale BigDaan-back-upmap. De zichtbare map- en bestandsnamen geven de structuur weer, niet de inhoud van elk bestand.',
  },
  {
    title: '3. Databaseback-up',
    description: 'Er is geen SQL-dump, export of back-upbestand van Supabase toegevoegd. De bestaande schema- en SQL-editorafbeeldingen zijn geen bewijs dat databasegegevens zijn geëxporteerd.',
  },
  {
    title: '4. Back-upproces',
    description: 'Een screenshot van een werkwijze, commando of script ontbreekt. Ook is nog niet aangetoond dat ik volgens een vaste, bijvoorbeeld tweewekelijkse, routine een back-up maak.',
  },
  {
    title: '5. Hersteltest',
    description: 'Ik heb geen hersteltest aangetoond. Het terugzetten van de bestanden en database en het controleren van de herstelde app blijft een vervolgstap.',
  },
];

const timeline = [
  ['1. Feedback ontvangen', 'Ik wilde BigDaan uitbreiden met nieuwe functies, waaronder de mogelijkheid voor gebruikers om zelf oefeningen toe te voegen.'],
  ['2. Risico ontdekt', 'ChatGPT Codex wees mij erop dat een grotere wijziging gevolgen kan hebben voor bestaande functies en opgeslagen gegevens.'],
  ['3. Back-up maken', 'Ik heb BigDaan lokaal veiliggesteld. De screenshot toont de back-upmap en een aantal aanwezige bestanden.'],
  ['4. Verantwoord verder ontwikkelen', 'Ik leerde dat ik vóór een grote update ook moet nadenken over herstel. Ik heb de herstelmogelijkheid met ChatGPT Codex gecontroleerd.'],
];

export default function BigDaanBackupStoryPage({ navigate }: { navigate: () => void }) {
  return <>
    <section className="page-intro reveal">
      <p className="eyebrow"><span /> Sprint 4 · Learning Story</p>
      <h1>BigDaan: veilig doorontwikkelen met een back-upstrategie</h1>
      <p className="intro">Ik wilde mijn sportapp verder verbeteren. Het advies van Codex zette mij aan het denken over wat er met mijn applicatie en gebruikersgegevens gebeurt als een grotere update misgaat.</p>
    </section>

    <div className="page-body reveal delay-one">
      <section className="research-section">
        <div className="research-section-heading">
          <p className="section-kicker">Leeruitkomsten</p>
          <span className="learning-outcome-badge">LU3 · LU4 · LU5</span>
        </div>
        <div className="note-box"><strong>Relevantie is geen bewijs van volledige beheersing</strong><p>De officiële omschrijvingen komen uit de bestaande leeruitkomsten in mijn portfolio. De koppelingen hieronder laten zien wat deze story raakt; ze betekenen niet dat ik de leeruitkomsten volledig heb behaald.</p></div>
        <div className="reflection-list backup-outcomes">
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
          <span className="learning-outcome-badge">Sportapp BigDaan</span>
        </div>
        <blockquote className="research-story-quote"><p>Als eigenaar van BigDaan wil ik een veilige back-up hebben van mijn sportapp, zodat ik de applicatie en bijbehorende gegevens snel kan herstellen als er iets misgaat.</p></blockquote>
      </section>

      <section className="research-section">
        <div className="blog-content">
          <div className="blog-section">
            <h2>Aanleiding: BigDaan verder verbeteren</h2>
            <p>Tijdens Sprint 4 wilde ik mijn sportapp BigDaan verder ontwikkelen. De app was online en gebruikers konden hun workouts en sportprogressie bijhouden. Ik had ook feedback ontvangen over verbeteringen en nieuwe functies.</p>
            <p>Een van de ideeën was om gebruikers zelf oefeningen te laten toevoegen. Dat zou BigDaan flexibeler maken, maar het was een grotere wijziging die invloed kon hebben op bestaande functionaliteiten en gegevens. Ik beschrijf deze uitbreiding als aanleiding en doel, niet als een afgeronde functie.</p>
          </div>
          <div className="blog-section">
            <h2>Het advies van ChatGPT Codex</h2>
            <p>Toen ik met de uitbreiding aan de slag wilde, gebruikte ik ChatGPT Codex als hulpmiddel bij het ontwikkelen. Codex wees mij erop dat een grotere wijziging risico’s met zich mee kan brengen. Als er iets misgaat met code of database, kunnen bestaande functies of opgeslagen gegevens worden geraakt.</p>
            <p>Het advies was om eerst een back-up te maken. Tot dat moment dacht ik vooral na over functies toevoegen en verbeteren. Door dit advies keek ik ook naar de vraag hoe ik mijn bestaande werk en de trainingsgegevens van gebruikers zou kunnen herstellen. Een screenshot van het gesprek is nog niet als bewijs beschikbaar.</p>
          </div>
          <div className="blog-section">
            <h2>Wat wilde ik bereiken?</h2>
            <p>Mijn doel was een lokale back-up die ik zelf op mijn computer kon bewaren. Ik wilde niet alleen de broncode veiligstellen, maar ook weten welke databaseonderdelen en configuratie nodig zijn om BigDaan opnieuw op te bouwen. Daarnaast wilde ik een herhaalbare werkwijze en leren hoe ik een eerdere versie kon herstellen als een wijziging verkeerd uitpakt.</p>
            <p>Ik dacht aan ongeveer iedere twee weken een nieuwe back-up en ook een extra back-up vóór grote wijzigingen. Dat zijn doelen voor mijn werkwijze; de beschikbare bestanden tonen nog niet aan dat ik deze routine heb uitgevoerd.</p>
          </div>
          <div className="blog-section">
            <h2>Stap 1 – Onderzoeken wat ik moet bewaren</h2>
            <p>Ik moest onderscheid maken tussen de projectmap en de gegevens die in een database staan. Een kopie van broncode bevat niet automatisch de tabelinhoud van Supabase. Ook configuratie en instellingen kunnen nodig zijn om de applicatie opnieuw te laten werken, maar gevoelige waarden moeten daarbij beschermd blijven.</p>
            <p>De screenshot van mijn back-upmap toont onder andere de bestanden data.sql, migration_history.sql, roles.sql en schema.sql, plus de mappen cli en 2026-11-11-pre-oefeningen. De afbeelding laat de namen en mapstructuur zien, niet de inhoud van de bestanden.</p>
          </div>
          <div className="blog-section">
            <h2>Stap 2 – Een lokale back-up voorbereiden</h2>
            <p>Ik heb de back-up op mijn eigen computer bewaard, zodat ik niet alleen afhankelijk ben van de online omgeving. De screenshot van de lokale map is opgenomen bij acceptatiecriterium 1. De broncode en de inhoud van de getoonde SQL-bestanden zijn niet zichtbaar op de afbeelding.</p>
          </div>
          <div className="blog-section">
            <h2>Stap 3 – Supabase-gegevens veiligstellen</h2>
            <p>Omdat BigDaan Supabase gebruikt, moet ik naast broncode ook de database en bijbehorende instellingen meenemen. Daarbij zijn verschillende onderdelen van belang:</p>
            <ul className="backup-database-list">{databaseParts.map(([title, description]) => <li key={title}><strong>{title}:</strong> {description}</li>)}</ul>
            <p>Ik heb de aanwezigheid van de benodigde databaseonderdelen met ChatGPT Codex gecontroleerd. De bestanden in deze portfolio tonen de export zelf niet. De bestaande afbeelding van het schema is alleen achtergrondinformatie; ik claim niet dat policies, Storage-bestanden of authenticatieconfiguratie afzonderlijk zijn veiliggesteld.</p>
          </div>
          <div className="blog-section">
            <h2>Stap 4 – Regelmatig back-ups kunnen maken</h2>
            <p>Ik wilde een eenvoudige werkwijze ontwikkelen die ik ongeveer iedere twee weken kan herhalen en ook vóór een grote wijziging kan gebruiken. Ik heb de kwaliteitscriteria voor dit proces met ChatGPT Codex gecontroleerd. Het proces of script is nog niet als bewijs op deze pagina toegevoegd.</p>
          </div>
          <div className="blog-section">
            <h2>Stap 5 – De mogelijkheid om te herstellen</h2>
            <p>Een back-up is pas echt bruikbaar als ik weet dat ik deze kan terugzetten. Volgens mijn controle met ChatGPT Codex kan ik de applicatie en opgeslagen gegevens met behulp van de back-up herstellen. Een afzonderlijk bewijsstuk van die controle is nog niet aan deze pagina toegevoegd.</p>
          </div>
        </div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Waarom back-ups belangrijk zijn</p><h2>Voorbereid op onverwachte gevolgen</h2></div>
        <div className="note-box"><p>Updates kunnen onverwachte gevolgen hebben. Een codewijziging kan bestaande functies verstoren; een databasewijziging kan invloed hebben op gegevens of de manier waarop die worden opgeslagen. Een vooraf gemaakte back-up kan helpen de impact te beperken. Om te weten of een back-up betrouwbaar is, moet ook duidelijk zijn dat deze daadwerkelijk kan worden teruggezet.</p></div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Tijdlijn</p><h2>Van idee naar risicobewustzijn</h2></div>
        <ol className="backup-timeline">{timeline.map(([title, description]) => <li key={title}><span className="backup-timeline-marker" /><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Aantoonbare stand</p><h2>Wat is op dit moment wel en niet bewezen?</h2></div>
        <div className="note-box"><p>De screenshot van mijn lokale back-upmap is toegevoegd bij acceptatiecriterium 1. Ik heb de databaseonderdelen, herstelmogelijkheid en kwaliteitscriteria met ChatGPT Codex gecontroleerd; aanvullende screenshots van het proces en de herstelcontrole zijn nog niet toegevoegd. Ik wijzig met deze story niets aan de BigDaan-database.</p></div>
      </section>

      <section className="research-section">
        <div className="reflection-list backup-status-grid">{acceptanceCriteria.map((criterion) => <article key={criterion.title}>
          <h3>{criterion.title}</h3><p>{criterion.description}</p>{criterion.verification && <p>{criterion.verification}</p>}
          {criterion.title === 'Acceptatiecriterium 1' && <figure className="backup-evidence-figure">
            <img src="/assets/aistudio/Backup%20BigDaan%20Afbeelding.png" alt="Lokale back-upmap SportappBigDaan-Backup met onder andere data.sql, migration_history.sql, roles.sql en schema.sql" loading="lazy" />
            <figcaption>Screenshot van de lokale BigDaan-back-upmap.</figcaption>
          </figure>}
          <span className="backup-status">{criterion.status}</span>
        </article>)}</div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Kwaliteitscriteria</p><h2>Doelen voor mijn werkwijze</h2></div>
        <div className="reflection-list backup-status-grid">{qualityCriteria.map((criterion, index) => <article key={criterion.description}>
          <h3>Kwaliteitscriterium {index + 1}</h3><p>{criterion.description}</p><p>{criterion.verification}</p><span className="backup-status">Behaald</span>
        </article>)}</div>
      </section>

      <section className="research-section">
        <div className="section-heading-block"><p className="section-kicker">Bewijsmateriaal</p><h2>Back-upstrategie BigDaan</h2></div>
        <div className="reflection-list backup-evidence-grid">{evidenceItems.map((item) => <article key={item.title}>
          <h3>{item.title}</h3><p>{item.description}</p>{item.title === '2. Lokale back-up' ? <p className="backup-evidence-reference">Zie de screenshot bij acceptatiecriterium 1.</p> : <div className="backup-evidence-slot">Bewijs nog niet toegevoegd</div>}
        </article>)}</div>
        <div className="backup-live-link">
          <p>De applicatie waar deze story over gaat:</p>
          <a className="button button-primary" href="https://sportapp-big-daan.vercel.app/" target="_blank" rel="noreferrer">Bekijk BigDaan <ExternalLink size={16} /></a>
        </div>
      </section>

      <section className="research-section">
        <div className="blog-content">
          <div className="blog-section">
            <h2>Wat heb ik geleerd?</h2>
            <p>Ik heb geleerd dat softwareontwikkeling niet alleen draait om nieuwe functies bouwen. Het is ook belangrijk om bestaande functionaliteiten en gegevens te beschermen. Bij grotere wijzigingen wil ik voortaan vooraf nadenken over mogelijke risico’s en hoe ik kan herstellen als iets misgaat.</p>
            <p>Het advies van Codex hielp mij om mijn ontwikkelproces vanuit een ander perspectief te bekijken. Ik zag duidelijker dat broncode, databasegegevens en configuratie verschillende onderdelen zijn en elk passende back-upmaatregelen vragen. Een hersteltest hoort daarbij, zodat ik niet alleen aanneem dat een kopie bruikbaar is.</p>
          </div>
          <div className="blog-section">
            <h2>Reflectie</h2>
            <p>Ik ben blij dat ik tijdens Sprint 4 ook stilstond bij de risico’s van het verder ontwikkelen van BigDaan. Eerst dacht ik vooral aan nieuwe functies, zoals gebruikers zelf oefeningen laten toevoegen. Door het advies van Codex realiseerde ik me dat een grote update ook gevolgen kan hebben voor wat al werkt en voor gegevens die gebruikers hebben opgeslagen.</p>
            <p>Ik vind het een belangrijk leermoment dat AI mij niet alleen kan helpen met code, maar mij ook kan wijzen op risico’s waar ik nog niet aan dacht. Tegelijkertijd moet ik de adviezen omzetten in een werkende en controleerbare aanpak. De lokale back-up heb ik met deze map vastgelegd en de herstelmogelijkheid en kwaliteitscriteria heb ik met Codex gecontroleerd. Bij toekomstige wijzigingen wil ik die werkwijze blijven toepassen.</p>
          </div>
        </div>
      </section>

      <div className="back-link-row"><button className="text-button" onClick={navigate}>← Terug naar mijn bewijs</button></div>
    </div>
  </>;
}