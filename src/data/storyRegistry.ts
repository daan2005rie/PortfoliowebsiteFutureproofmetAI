import { TypeStory } from '../types';

/**
 * Modulair Type Story Register.
 * Op dit moment is uitsluitend de gevraagde RS (Research Story) opgenomen.
 * De architectuur is zodanig opgezet dat in de toekomst eenvoudig extra
 * Type Stories kunnen worden toegevoegd aan deze array.
 */
export const TYPE_STORIES: TypeStory[] = [
  {
    code: 'RS',
    name: 'Research Story',
    tag: '🏷️ RS – Research Story',
    definition: {
      role: 'Als B2C online marketeer,',
      want: 'wil ik de impact (kansen, bedreigingen en ethische aspecten) van AI op mijn werkveld analyseren en de benodigde skills in kaart brengen,',
      benefit: 'zodat ik een onderbouwde basis heb om te bepalen welke AI-toepassingen waarde toevoegen en welke vaardigheden ik moet ontwikkelen (gekoppeld aan LU 1 & LU 3).'
    },
    acceptanceCriteria: [
      {
        id: 'ac-1',
        type: 'acceptance',
        description: 'Er is een overzichtelijk verslag of presentatie opgesteld over de kansen en bedreigingen van AI binnen B2C marketing.',
        doWeText: 'Doen we de juiste dingen?'
      },
      {
        id: 'ac-2',
        type: 'acceptance',
        description: 'Het onderzoek bevat een concreet overzicht van de top 5 AI-skills die noodzakelijk zijn voor een B2C marketeer.',
        doWeText: 'Doen we de juiste dingen?'
      },
      {
        id: 'ac-3',
        type: 'acceptance',
        description: 'Er is een ethische paragraaf opgenomen over verantwoord AI-gebruik (zoals AVG, dataprivacy en auteursrecht bij AI-content).',
        doWeText: 'Doen we de juiste dingen?'
      },
      {
        id: 'ac-4',
        type: 'acceptance',
        description: 'De resultaten zijn gepresenteerd of ingebracht tijdens een feedbackmoment.',
        doWeText: 'Doen we de juiste dingen?'
      }
    ],
    qualityCriteria: [
      {
        id: 'qc-1',
        type: 'quality',
        title: 'Triangulatie & Bronkwaliteit',
        description: 'Er zijn minimaal 10 betrouwbare bronnen gebruikt (vakliteratuur, onderzoeken en meerdere LLM\'s) die elkaars bevindingen verifiëren.',
        doWeText: 'Doen we de dingen juist?'
      },
      {
        id: 'qc-2',
        type: 'quality',
        title: 'Promptstructuur',
        description: 'Onderzoeksvragen die aan LLM\'s zijn gesteld, zijn opgebouwd via gestructureerde prompting (rol, context, taak, outputformaat).',
        doWeText: 'Doen we de dingen juist?'
      },
      {
        id: 'qc-3',
        type: 'quality',
        title: 'Wetenschappelijke herleidbaarheid',
        description: 'Gebruikte LLM\'s verwijzen naar controleerbare en inhoudelijk relevante bronnen.',
        doWeText: 'Doen we de dingen juist?'
      },
      {
        id: 'qc-4',
        type: 'quality',
        title: 'B2C-Focus',
        description: 'De analyse is specifiek gericht op B2C marketing (bijv. personalisatie, contentcreatie, consumentengedrag) en niet op algemene AI-trends.',
        doWeText: 'Doen we de dingen juist?'
      }
    ],
    reflectionQuestions: [
      {
        id: 'rq-1',
        question: 'Heb je een overzichtelijk verslag of presentatie opgesteld over de kansen en bedreigingen van AI binnen B2C marketing?',
        relatedCriterionId: 'ac-1',
        explanationHint: 'Toelichting op de analyse van kansen en bedreigingen binnen B2C marketing...'
      },
      {
        id: 'rq-2',
        question: 'Bevat je onderzoek een concreet overzicht van de top 5 AI-skills die noodzakelijk zijn voor een B2C marketeer?',
        relatedCriterionId: 'ac-2',
        explanationHint: 'Toelichting op de vastgestelde top 5 AI-vaardigheden...'
      },
      {
        id: 'rq-3',
        question: 'Is er een ethische paragraaf opgenomen over verantwoord AI-gebruik (zoals AVG, dataprivacy en auteursrecht bij AI-content)?',
        relatedCriterionId: 'ac-3',
        explanationHint: 'Toelichting op AVG, privacy, auteursrecht en verantwoord gebruik...'
      },
      {
        id: 'rq-4',
        question: 'Zijn de resultaten gepresenteerd of ingebracht tijdens een feedbackmoment?',
        relatedCriterionId: 'ac-4',
        explanationHint: 'Toelichting op de presentatie of ontvangen feedback...'
      },
      {
        id: 'rq-5',
        question: 'Voldoet je onderzoek aan de vier kwaliteitscriteria: triangulatie (min. 10 bronnen), gestructureerde prompting, wetenschappelijke herleidbaarheid en B2C-focus?',
        relatedCriterionId: 'qc-all',
        explanationHint: 'Toelichting op bronverificatie, promptstructuur en B2C marketingfocus...'
      }
    ]
  }
];

/**
 * Haalt het huidige actieve storytype op (standaard 'RS').
 */
export function getCurrentStory(code = 'RS'): TypeStory {
  const found = TYPE_STORIES.find((s) => s.code === code);
  return found || TYPE_STORIES[0];
}
