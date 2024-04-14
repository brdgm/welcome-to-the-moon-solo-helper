import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import CampaignOption from './CampaignOption'
import CampaignOptionType from './enum/CampaignOptionType'
import Action from './enum/Action'

/**
 * Campaign Options.
 */
const CampaignOptions : CampaignOption[] = [

  // ### EVENT CAMPAIGN OPTIONS ###
  {
    name: 'mission-3-event-161',
    index: 4,
    type: CampaignOptionType.EVENT_CARD,
    mission: 3,
    deckCards: [161]
  },
  {
    name: 'mission-5-event-158-159',
    index: 5,
    type: CampaignOptionType.EVENT_CARD,
    mission: 5,
    deckCards: [158],
    deckBottomCards: [159]
  },
  {
    name: 'mission-5-event-160',
    index: 10,
    type: CampaignOptionType.EVENT_CARD,
    mission: 5,
    deckCards: [160]
  },
  {
    name: 'mission-7-event-163-164-165',
    index: 14,
    type: CampaignOptionType.EVENT_CARD,
    mission: 7,
    deckCards: [163,164],
    deckBottomCards: [165]
  },
  {
    name: 'mission-4-event-167',
    index: 16,
    type: CampaignOptionType.EVENT_CARD,
    mission: 4,
    deckCards: [167]
  },
  {
    name: 'mission-8-event-168',
    index: 28,
    type: CampaignOptionType.EVENT_CARD,
    mission: 8,
    deckCards: [168]
  },
  {
    name: 'mission-6-event-167',
    index: 53,
    type: CampaignOptionType.EVENT_CARD,
    mission: 6,
    deckCards: [167]
  },
  {
    name: 'mission-3-event-165',
    index: 69,
    type: CampaignOptionType.EVENT_CARD,
    mission: 3,
    deckCards: [165]
  },
  {
    name: 'mission-2-event-159',
    index: 79,
    type: CampaignOptionType.EVENT_CARD,
    mission: 2,
    deckCards: [159]
  },
  {
    name: 'mission-6-event-164',
    index: 86,
    type: CampaignOptionType.EVENT_CARD,
    mission: 6,
    deckCards: [164]
  },
  {
    name: 'mission-5-event-163',
    index: 91,
    type: CampaignOptionType.EVENT_CARD,
    mission: 5,
    deckCards: [163]
  },
  {
    name: 'mission-3-event-166',
    index: 108,
    type: CampaignOptionType.EVENT_CARD,
    mission: 3,
    deckCards: [166]
  },
  {
    name: 'mission-2-event-163-164',
    index: 113,
    type: CampaignOptionType.EVENT_CARD,
    mission: 2,
    deckCards: [163],
    deckBottomCards: [164]
  },
  {
    name: 'mission-7-event-160-161',
    index: 115,
    type: CampaignOptionType.EVENT_CARD,
    mission: 7,
    deckCards: [160],
    deckBottomCards: [161]
  },
  {
    name: 'mission-2-event-158',
    index: 119,
    type: CampaignOptionType.EVENT_CARD,
    mission: 2,
    deckCards: [158]
  },
  {
    name: 'mission-4-event-162',
    index: 139,
    type: CampaignOptionType.EVENT_CARD,
    mission: 4,
    deckCards: [162]
  },
  {
    name: 'mission-4-event-168',
    index: 144,
    type: CampaignOptionType.EVENT_CARD,
    mission: 4,
    deckCards: [168]
  },
  {
    name: 'mission-7-event-158-159',
    index: 162,
    type: CampaignOptionType.EVENT_CARD,
    mission: 7,
    deckCards: [158,159]
  },
  {
    name: 'mission-1-event-162',
    index: 176,
    type: CampaignOptionType.EVENT_CARD,
    mission: 1,
    deckCards: [162]
  },
  {
    name: 'mission-2-event-160',
    index: 177,
    type: CampaignOptionType.EVENT_CARD,
    mission: 2,
    deckCards: [160]
  },
  {
    name: 'mission-6-event-165-166',
    index: 180,
    type: CampaignOptionType.EVENT_CARD,
    mission: 6,
    deckCards: [165,166]
  },
  {
    name: 'mission-7-event-162',
    index: 181,
    type: CampaignOptionType.EVENT_CARD,
    mission: 7,
    deckCards: [162]
  },

  // ### BLOCK CARDS CAMPAIGN OPTIONS ###
  {
    name: 'remove-robot-energy',
    index: 25,
    type: CampaignOptionType.BLOCK_CARDS,
    removeCardsAction: [Action.ROBOT,Action.ROBOT,Action.ROBOT,Action.ENERGY,Action.ENERGY,Action.ENERGY]
  },
  {
    name: 'remove-1-14-15',
    index: 41,
    type: CampaignOptionType.BLOCK_CARDS,
    removeCardsValue: [1,14,15]
  },
  {
    name: 'remove-7',
    index: 77,
    type: CampaignOptionType.BLOCK_CARDS,
    removeCardsValue: [7]
  },
  {
    name: 'remove-plant-water',
    index: 97,
    type: CampaignOptionType.BLOCK_CARDS,
    removeCardsAction: [Action.PLANT,Action.PLANT,Action.PLANT,Action.PLANT,Action.WATER,Action.WATER]
  },

  // ### STARSHIP CARDS CAMPAIGN OPTIONS ###
  {
    name: 'starship-152-153-154',
    index: 44,
    type: CampaignOptionType.STARSHIP_CARD,
    starshipCards: [152,153,154]
  },
  {
    name: 'starship-149-150-151',
    index: 73,
    type: CampaignOptionType.STARSHIP_CARD,
    starshipCards: [149,150,151]
  },
  {
    name: 'starship-155-156-157',
    index: 123,
    type: CampaignOptionType.STARSHIP_CARD,
    starshipCards: [155,156,157]
  },

]

const CampaignOptionsMap = new Map<string,CampaignOption>()
CampaignOptions.forEach(CampaignOption => CampaignOptionsMap.set(CampaignOption.name, CampaignOption))

export default {

  /**
   * Get CampaignOption by ID
   * @param name CampaignOption name
   * @returns CampaignOption
   */
  get(name: string) : CampaignOption {
    return findMandatory(CampaignOptionsMap, name)
  },

  /**
   * Get CampaignOptions
   * @returns CampaignOptions
   */
  getAll() : CampaignOption[] {
    return CampaignOptions
  }

}