import { ExternalLink } from 'lucide-react';

const learningOutcomes = [
	{
		code: 'LU2',
		title: 'Praktijkgerichte AI-oplossing ontwerpen en realiseren',
		officialDescription:
			'Je kunt in een praktijkgerichte context een AI-oplossing ontwerpen, realiseren en presenteren die een specifieke professionele praktijk verandert.',
		connection:
			'Ik verwerkte verbeteringen in BigDaan: een oefeningspagina, beschermde workoutgeschiedenis, betere grafieken, verplaatsbare oefeningen en automatisch ingevulde sets. Daarmee heb ik een bestaande digitale toepassing concreet uitgebreid voor gebruikers.',
	},
	{
		code: 'LU3',
		title: 'Ethiek en verantwoordelijk AI-gebruik beoordelen',
		officialDescription:
			'Je kunt ethische vraagstukken en uitdagingen van AI in je vakgebied identificeren en aanbevelingen formuleren voor verantwoord AI-gebruik, rekening houdend met privacy, bias en transparantie.',
		connection:
			'Bij persoonlijke oefeningen, eerdere trainingsgegevens en accountwisselingen heb ik eigenaarschap, gegevensisolatie, invoervalidatie en back-ups meegenomen. Ik maakte geen gevoelige gegevens openbaar in deze story.',
	},
	{
		code: 'LU4',
		title: 'AI-tools en technieken gebruiken',
		officialDescription:
			'Je kunt zelfstandig verschillende AI-tools en platforms toepassen, zoals machine-learningtechnieken, chatbots, agents en prompts, om taken binnen je vakgebied op te lossen.',
		connection:
			'Ik gebruikte ChatGPT Codex als ontwikkelhulpmiddel en controleerde in Sprint 5 concrete resultaten op werking, beveiliging en regressies. De gebruikte AI-output bleef onder mijn eigen controle: ik beoordeelde, testte en paste de wijzigingen toe.',
	},
	{
		code: 'LU5',
		title: 'Zelfstandig en zelfsturend werken',
		officialDescription:
			'Je kunt een eigen leerroute vaststellen en uitvoeren, zelfstandig leervragen stellen, bronnen en tools selecteren, je voortgang monitoren en kritisch reflecteren op je leerproces en ontwikkeling.',
		connection:
			'Ik zette zelf het doel van minimaal drie verbeteringen, werkte dit uit in vijf updates, maakte gebruik van de voorbereiding uit Sprint 4 en controleerde het resultaat met tests, technische controles en reflectie.',
	},
];

const updates = [
	[
		'01',
		'Nieuwe oefeningspagina',
		'Gebruikers kunnen 220 standaardoefeningen zoeken, persoonlijke oefeningen beheren en hun top 5 beste sets bekijken.',
	],
	[
		'02',
		'Bestaande workouts beschermen',
		'Historische namen, beschrijvingen en spiergroepen blijven behouden wanneer oefeningen later worden aangepast.',
	],
	[
		'03',
		'Betere progressiegrafieken',
		'Datumlabels, kilogrammen, chronologische meetpunten en toegankelijke bediening maken voortgang overzichtelijker.',
	],
	[
		'04',
		'Oefeningen verplaatsen',
		'Oefeningen kunnen met pijltjes van volgorde veranderen, waarbij ingevulde sets en de opgeslagen volgorde worden behouden.',
	],
	[
		'05',
		'Vorige sets invullen',
		'Gewichten, herhalingen en setvolgorde worden overgenomen uit de laatste relevante afgeronde workout van hetzelfde account.',
	],
];

const acceptanceCriteria = [
	[
		'Minimaal drie nieuwe updates zijn doorgevoerd.',
		'Behaald',
		'Vijf functionele verbeteringen zijn doorgevoerd naast aanvullende beveiligingsmaatregelen.',
	],
	[
		'De updates zijn online beschikbaar voor iedere gebruiker.',
		'Behaald',
		'Het projectoverzicht vermeldt publicatie op de online BigDaan-applicatie.',
	],
	[
		'Alle updates werken naar wens.',
		'Behaald',
		'De aangeleverde testresultaten noemen 82 geslaagde tests, geslaagde TypeScript- en lintcontroles, een succesvolle productiebuild en geslaagde lokale SQL-beveiligingstests.',
	],
];

const qualityCriteria = [
	[
		'Via Supabase beveiligd',
		'Persoonlijke oefeningen zijn aan gebruikersaccounts gekoppeld. RLS-toegangsregels beperken toegang tot eigen gegevens en regels voor oefenvolgorde zijn ook op databaseniveau afgedwongen met een SQL-migratie.',
	],
	[
		'Meerdere keren getest',
		'Volgens de aangeleverde ontwikkelresultaten zijn 82 tests geslaagd. Daarnaast zijn TypeScript-controle, lintcontrole, productiebuild en lokale SQL-beveiligingstests uitgevoerd.',
	],
	[
		'Opgenomen in de back-up',
		'In Sprint 4 legde ik al een back-upwerkwijze vast. Tijdens Sprint 5 gebruikte ik die werkwijze verder. De nieuwste back-up is van 18 november 2026 en de eerdere back-up van 11 november 2026 is behouden.',
	],
];

const evidenceItems = [
	[
		'1. Nieuwe oefeningspagina',
		'Screenshot van de pagina met 220 standaardoefeningen.',
		'/assets/aistudio/BigDaan%20Workout%20overzicht.png',
		'Werkende oefeningsoverzicht',
	],
	[
		'2. Persoonlijke oefeningen toevoegen',
		'Screenshot van het formulier voor het aanmaken van een eigen oefening.',
		null,
		null,
	],
	[
		'3. Verbeterde progressiegrafieken',
		'Screenshot van een grafiek met datumlabels, gewichten en meetpunten.',
		'/assets/aistudio/BigDaan%20Progressie%20overzicht.png',
		'Bestaande progressieweergave; een nieuwe Sprint 5-versie kan later worden toegevoegd',
	],
	[
		'4. Oefeningen verplaatsen',
		'Screenshot van de pijltjes waarmee oefeningen van volgorde veranderen.',
		null,
		null,
	],
	[
		'5. Vorige sets automatisch invullen',
		'Screenshot waarop eerdere gewichten en herhalingen automatisch zijn ingevuld.',
		null,
		null,
	],
	[
		'6. Supabase-beveiliging',
		'Screenshot van relevante RLS-policies of een veilige SQL-controle.',
		'/assets/aistudio/SQL%20Editor%20Overzicht.png',
		'Overzicht van de SQL-omgeving; gevoelige inhoud is niet opgenomen',
	],
	[
		'7. Testresultaten',
		'Screenshot van de 82 geslaagde tests en technische controles.',
		null,
		null,
	],
	[
		'8. Back-ups',
		'Screenshot van de lokale back-ups van 11 en 18 november 2026.',
		'/assets/aistudio/Backup%20BigDaan%20Afbeelding.png',
		'Beschikbare back-upmap; geen privégegevens of configuraties toegevoegd',
	],
];

export default function BigDaan20StoryPage({ navigate }: { navigate: () => void }) {
	return (
		<>
			<section className="page-intro reveal">
				<p className="eyebrow">
					<span /> Sprint 5 · Learning Story
				</p>
				<h1>BigDaan 2.0: gebruikersfeedback omzetten naar een betere sportapp</h1>
				<p className="intro">
					Tijdens Sprint 5 heb ik mijn sportapp verder ontwikkeld op basis van verzamelde
					feedback en verbeteringen. Het doel was niet alleen om meer functies toe te voegen,
					maar ook om bestaande gegevens te beschermen en de app betrouwbaarder te maken.
				</p>
			</section>

			<div className="page-body reveal delay-one">
				<section className="research-section">
					<div className="research-section-heading">
						<p className="section-kicker">Leeruitkomsten</p>
						<span className="learning-outcome-badge">LU2 · LU3 · LU4 · LU5</span>
					</div>
					<div className="note-box">
						<strong>Relevantie is geen bewijs van volledige beheersing</strong>
						<p>
							Onderstaande koppelingen laten zien welk deel van mijn werk bij een leeruitkomst
							past. Dit betekent niet dat ik een leeruitkomst volledig heb behaald.
						</p>
					</div>
					<div className="reflection-list backup-outcomes">
						{learningOutcomes.map((outcome) => (
							<article key={outcome.code}>
								<h3>
									{outcome.code}: {outcome.title}
								</h3>
								<p>
									<strong>Officiële omschrijving:</strong> {outcome.officialDescription}
								</p>
								<p>
									<strong>Koppeling met mijn story:</strong> {outcome.connection}
								</p>
							</article>
						))}
					</div>
				</section>

				<section className="research-section">
					<div className="research-section-heading">
						<p className="section-kicker">Mijn user story</p>
						<span className="learning-outcome-badge">Sportapp BigDaan</span>
					</div>
					<blockquote className="research-story-quote">
						<p>
							Als eigenaar van BigDaan wil ik de feedback die ik heb ontvangen omzetten tot
							updates voor de sportapp, zodat gebruikers een betere ervaring hebben tijdens het
							gebruiken van BigDaan.
						</p>
					</blockquote>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Aanleiding</p>
						<h2>BigDaan verder verbeteren</h2>
					</div>
					<div className="blog-content">
						<div className="blog-section">
							<p>
								Tijdens Sprint 5 wilde ik BigDaan verder ontwikkelen aan de hand van feedback en
								verbeterpunten die ik had verzameld. De app was uitgegroeid van een persoonlijke
								sportapp naar een online toepassing waarin meerdere gebruikers workouts en
								progressie konden bijhouden.
							</p>
							<p>
								Ik zag mogelijkheden om de app gebruiksvriendelijker en uitgebreider te maken. Een
								relatief kleine aanpassing kon de dagelijkse werking verbeteren, terwijl andere
								wijzigingen invloed hadden op de database, bestaande workouts en persoonlijke
								gegevens.
							</p>
						</div>
						<div className="blog-section">
							<h2>De voorbereiding in Sprint 4</h2>
							<p>
								In Sprint 4 hield ik mij bezig met een back-upstrategie voor BigDaan. ChatGPT Codex
								had mij gewezen op de risico's van grotere wijzigingen. Daardoor besefte ik meer
								hoe belangrijk back-ups en herstelmogelijkheden zijn.
							</p>
							<p>
								Die voorbereiding kon ik in Sprint 5 gebruiken om met meer vertrouwen aan grotere
								functies te werken. Ik wilde niet alleen nieuwe mogelijkheden toevoegen, maar ook
								voorkomen dat bestaande workouts en trainingsgegevens verloren zouden gaan.
							</p>
						</div>
						<div className="blog-section">
							<h2>Mijn doel tijdens Sprint 5</h2>
							<p>
								Mijn belangrijkste doel was om minimaal drie verbeteringen door te voeren die de
								gebruikerservaring zouden versterken. De updates moesten online beschikbaar komen
								en goed samenwerken met de bestaande database.
							</p>
							<p>
								Daarnaast wilde ik controleren of de nieuwe functionaliteiten veilig werkten en
								bestaande onderdelen niet kapotmaakten. Uiteindelijk heb ik aan vijf grote
								verbeteringen gewerkt.
							</p>
						</div>
					</div>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Vijf verbeteringen</p>
						<h2>Van feedback naar nieuwe functies</h2>
					</div>
					<div className="bigdaan-update-grid">
						{updates.map(([number, title, description]) => (
							<article className="bigdaan-update-card" key={number}>
								<span>{number}</span>
								<h3>{title}</h3>
								<p>{description}</p>
							</article>
						))}
					</div>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Ontwikkeling</p>
						<h2>Wat ik per update heb gedaan</h2>
					</div>
					<div className="blog-content">
						<div className="blog-section">
							<h2>Update 1 – Een volledig nieuwe pagina 'Oefeningen'</h2>
							<p>
								Dit was de grootste uitbreiding. Gebruikers kunnen 220 standaardoefeningen zoeken
								en aanvullende informatie bekijken over beschrijvingen en spiergroepen.
							</p>
							<p>
								Ik heb ook persoonlijke oefeningen toegevoegd die gebruikers kunnen aanmaken,
								 Bewerken, archiveren en gebruiken in workouts, nieuwe presets of bestaande
								presets. Op de pagina kunnen zij bovendien hun persoonlijke top 5 beste sets per
								oefening bekijken.
							</p>
							<p>
								Omdat deze oefeningen persoonlijke gegevens kunnen bevatten, koppelde ik ze aan
								het juiste gebruikersaccount. In Supabase stelde ik toegangsregels in zodat
								gebruikers alleen hun eigen persoonlijke oefeningen kunnen bekijken en gebruiken.
								Deze uitbreiding bouwt voort op wat ik in Sprint 3 over databasebeveiliging heb
								geleerd.
							</p>
							<p>
								<strong>Wat ik hiervan leerde:</strong> een nieuwe functie is meer dan een extra
								knop of pagina. Ik moest rekening houden met interface, database, beveiliging en
								samenwerking met bestaande workouts.
							</p>
						</div>
						<div className="blog-section">
							<h2>Update 2 – Bestaande workoutgeschiedenis beschermen</h2>
							<p>
								Ik wilde voorkomen dat aanpassingen aan oefeningen invloed hadden op eerder
								opgeslagen workouts. Daarom verbeterde ik de verwerking van historische
								oefeningsgegevens.
							</p>
							<p>
								Bij het opnieuw opslaan blijven historische namen, beschrijvingen en spiergroepen
								behouden. Wanneer een persoonlijke oefening wordt aangepast, blijven eerdere
								workouts ongewijzigd. Gearchiveerde oefeningen blijven bruikbaar in bestaande
								workouts en presets, maar kunnen niet meer als nieuwe losse oefening worden
								geselecteerd. Ook verbeterde ik de ondersteuning voor workouts uit oudere versies
								von BigDaan.
							</p>
							<p>
								<strong>Wat ik hiervan leerde:</strong> een applicatie verder ontwikkelen vraagt
								rekening te houden met bestaande gegevens. Nieuwe functies mogen eerder opgeslagen
								trainingen niet onbedoeld wijzigen.
							</p>
						</div>
						<div className="blog-section">
							<h2>Update 3 – Verbeterde progressiegrafieken</h2>
							<p>
								Ik maakte de progressiegrafieken duidelijker door meetpunten in chronologische
								volgorde te verbinden, datumlabels te tonen en een gewichtsschaal in kilogrammen
								toe te voegen. Bij het bekijken van een meetpunt verschijnt de volledige datum en
								het geregistreerde gewicht.
							</p>
							<p>
								Ik besteedde aandacht aan muis, aanraking en toetsenbord, mobiel gebruik en
								situaties met één meetpunt. Voor progressie wordt het hoogste opgeslagen gewicht
								per workout gebruikt.
							</p>
							<p>
								<strong>Wat ik hiervan leerde:</strong> data opslaan is niet voldoende; data moet
								begrijpelijk worden gepresenteerd. Ik leerde meer over datavisualisatie,
								gebruiksvriendelijkheid en verschillende apparaten.
							</p>
						</div>
						<div className="blog-section">
							<h2>Update 4 – Oefeningen verplaatsen binnen workouts</h2>
							<p>
								Ik voegde pijltjes toe waarmee gebruikers oefeningen kunnen verplaatsen. Alle
								ingevulde sets gaan mee en de nieuwe volgorde wordt automatisch opgeslagen.
							</p>
							<p>
								Als een workout wordt afgerond, kunnen oefeningen niet meer worden verplaatst.
								Afgeronde workouts kunnen achteraf niet van volgorde veranderen. Deze regel
								bestaat niet alleen in de interface, maar wordt ook in Supabase afgedwongen met
								een SQL-migratie.
							</p>
							<p>
								<strong>Wat ik hiervan leerde:</strong> een gebruikersregel mag niet alleen in de
								interface staan. Kritieke beperkingen horen waar nodig ook op databaseniveau te
								worden afgedwongen.
							</p>
						</div>
						<div className="blog-section">
							<h2>Update 5 – Vorige sets automatisch invullen</h2>
							<p>
								Ik wilde een nieuwe workout gemakkelijker laten starten. Daarom ging BigDaan bij
								het toevoegen van een oefening of het starten vanuit een preset zoeken naar de
								laatste afgeronde workout met die oefening.
							</p>
							<p>
								Gewichten, herhalingen en setvolgorde worden automatisch ingevuld. Zonder eerdere
								gegevens blijven de velden leeg. Bestaande invoer wordt niet overschreven als een
								workout wordt hervat. Bij een laadprobleem kan de gebruiker opnieuw proberen of
								kiezen voor lege sets. De functie gebruikt alleen gegevens van het eigen
								gebruikersaccount.
							</p>
							<p>
								<strong>Wat ik hiervan leerde:</strong> bestaande gegevens opnieuw gebruiken kan
								de ervaring verbeteren, maar ik moest uitzonderingen meedenken, waaronder nieuwe
								gebruikers, hervatten van workouts en laadfouten.
							</p>
						</div>
					</div>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Veiligheid en back-ups</p>
						<h2>Verder ontwikkelen met zorg voor gegevens</h2>
					</div>
					<div className="feature-grid">
						<article className="feature-card">
							<p className="feature-label">Databasebeveiliging</p>
							<p>
								Ik hield rekening met eigenaarschap van gegevens. Persoonlijke oefeningen en
								eerdere trainingsgegevens mogen niet door een ander account worden opgehaald.
								Invoer werd gevalideerd en ik besteedde aandacht aan het wisselen van accounts.
							</p>
						</article>
						<article className="feature-card">
							<p className="feature-label">Onverwachte situaties</p>
							<p>
								Er kwamen extra controles voor dubbel klikken, vertraagde database-antwoorden,
								accountwisselingen, onverwachte invoer en fouten bij het laden van eerdere
								gegevens.
							</p>
						</article>
						<article className="feature-card">
							<p className="feature-label">Back-ups</p>
							<p>
								Ik gebruikte de voorbereiding uit Sprint 4 verder. De nieuwste back-up is van 18
								november 2026; de eerdere back-up van 11 november 2026 is ook behouden. Lokale
								back-ups zijn van elkaar gescheiden en privéconfiguratie wordt niet getoond.
							</p>
						</article>
						<article className="feature-card">
							<p className="feature-label">AI en Codex</p>
							<p>
								ChatGPT Codex ondersteunde mij bij het uitvoeren en controleren van grotere
								wijzigingen. Ik beschrijf geen concrete prompts of technische problemen die niet
								aantoonbaar in mijn informatie staan. De eigen beslissing, toetsing en kritiek
								bleven bij mij.
							</p>
						</article>
					</div>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Testen</p>
						<h2>Wat is gecontroleerd?</h2>
					</div>
					<div className="reflection-list">
						<article>
							<h3>82 geslaagde tests</h3>
							<p>
								Dit zijn de aangeleverde ontwikkelresultaten. Voor eindbewijs moeten logs of
								rapporten nog worden gekoppeld wanneer deze beschikbaar zijn.
							</p>
						</article>
						<article>
							<h3>TypeScript-controle geslaagd</h3>
							<p>De aangeleverde ontwikkelresultaten melden een geslaagde TypeScript-controle.</p>
						</article>
						<article>
							<h3>Lintcontrole geslaagd</h3>
							<p>De aangeleverde ontwikkelresultaten melden een geslaagde lintcontrole.</p>
						</article>
						<article>
							<h3>Productiebuild geslaagd</h3>
							<p>De aangeleverde ontwikkelresultaten melden een succesvolle productiebuild.</p>
						</article>
						<article>
							<h3>Lokale SQL-beveiligingstests geslaagd</h3>
							<p>De aangeleverde ontwikkelresultaten melden geslaagde lokale SQL-beveiligingstests.</p>
						</article>
						<article>
							<h3>Extra controles</h3>
							<p>
								Ik hield rekening met accountwisselingen, ongeldige invoer, dubbel klikken,
								vertraagde antwoorden en fouten tijdens het laden van gegevens.
							</p>
						</article>
					</div>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Acceptatiecriteria</p>
						<h2>Originele criteria</h2>
					</div>
					<div className="reflection-list backup-status-grid">
						{acceptanceCriteria.map(([title, status, result]) => (
							<article key={title}>
								<h3>{title}</h3>
								<p>
									<strong>Resultaat:</strong> {result}
								</p>
								<span className="backup-status">{status}</span>
							</article>
						))}
					</div>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Kwaliteitscriteria</p>
						<h2>Hoe ik deze criteria heb aangepakt</h2>
					</div>
					<div className="reflection-list backup-status-grid">
						{qualityCriteria.map(([title, description]) => (
							<article key={title}>
								<h3>{title}</h3>
								<p>{description}</p>
							</article>
						))}
					</div>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Bewijsmateriaal</p>
						<h2>BigDaan 2.0 in beeld</h2>
					</div>
					<div className="reflection-list bigdaan-evidence-grid">
						{evidenceItems.map(([title, description, image, caption]) => (
							<article key={title}>
								<h3>{title}</h3>
								<p>{description}</p>
								{image ? (
									<figure className="backup-evidence-figure">
										<img src={image} alt={title} loading="lazy" />
										<figcaption>{caption}</figcaption>
									</figure>
								) : (
									<div className="backup-evidence-slot">
										Screenshot kan hier later worden toegevoegd
									</div>
								)}
							</article>
						))}
						<article>
							<h3>9. Live BigDaan</h3>
							<p>Bekijk de gepubliceerde en vernieuwde sportapp.</p>
							<a
								className="button button-primary"
								href="https://sportapp-big-daan.vercel.app/"
								target="_blank"
								rel="noreferrer"
							>
								Bekijk de vernieuwde BigDaan-app{' '}
								<ExternalLink size={16} />
							</a>
						</article>
					</div>
				</section>

				<section className="research-section">
					<div className="section-heading-block">
						<p className="section-kicker">Resultaat en reflectie</p>
						<h2>Een completer en bewuster ontwikkeld digitaal product</h2>
					</div>
					<div className="blog-content">
						<div className="blog-section">
							<h2>Het resultaat</h2>
							<p>
								Wat begon als een sportapp waarin gebruikers workouts konden vastleggen, is
								uitgebreid met meer mogelijkheden om trainingen te personaliseren en voortgang te
								bekijken. Mijn belangrijkste verbetering vind ik de nieuwe oefeningspagina.
								Gebruikers kunnen nu eigen oefeningen toevoegen en gebruiken.
							</p>
							<p>
								Daarnaast zijn grafieken verbeterd, kunnen oefeningen worden verplaatst en worden
								eerdere sets automatisch ingevuld. Ook heb ik bestaande trainingsgegevens
								beschermd en aandacht besteed aan Supabase-beveiliging. De nieuwe functies zijn
								volgens het aangeleverde projectoverzicht gepubliceerd op de online versie van
								BigDaan.
							</p>
						</div>
						<div className="blog-section">
							<h2>Persoonlijke reflectie</h2>
							<p>
								Deze sprint liet mij zien hoeveel er mogelijk is wanneer je een applicatie blijft
								verbeteren op basis van feedback. BigDaan is groter geworden dan ik oorspronkelijk
								voor ogen had.
							</p>
							<p>
								Het toevoegen van nieuwe functionaliteiten bracht nieuwe uitdagingen mee. Vooral de
								mogelijkheid om eigen oefeningen toe te voegen vroeg om aandacht voor opslag,
								samenwerking met bestaande workouts en toegang tot persoonlijke gegevens.
							</p>
							<p>
								Door back-ups en databasebeveiliging uit eerdere sprints was ik mij bewuster van
								de risico's van grote updates. Ik ben trots op de omvang van de uitbreidingen en op
								het feit dat ik met behulp van AI steeds completere applicaties kan ontwikkelen.
							</p>
							<p>
								Ik heb tegelijk geleerd om de AI-uitkomst kritisch te controleren op werking,
								gebruiksvriendelijkheid en beveiliging. BigDaan laat voor mij zien hoe een
								persoonlijk idee door feedback, AI en doorontwikkeling uitgroeit tot een steeds
								completer digitaal product.
							</p>
						</div>
					</div>
				</section>

				<div className="backup-live-link">
					<p>Bekijk de gepubliceerde sportapp zelf.</p>
					<a
						className="button button-primary"
						href="https://sportapp-big-daan.vercel.app/"
						target="_blank"
						rel="noreferrer"
					>
						Bekijk de vernieuwde BigDaan-app{' '}
						<ExternalLink size={16} />
					</a>
				</div>
				<div className="back-link-row">
					<button className="text-button" onClick={navigate}>
						← Terug naar mijn bewijs
					</button>
				</div>
			</div>
		</>
	);
}
