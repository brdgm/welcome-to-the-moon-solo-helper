import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import CardType from './enum/CardType'
import Action from './enum/Action'
import SpecialValue from './enum/SpecialValue'

/**
 * Starship and ASTRA effect cards.
 */
const cards : Card[] = [

  // ### STANDARD STARSHIP CARDS ###
  {
    id: 2,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 1,
    sprite: 'starship',
    spriteIndex: 0
  },
  {
    id: 1,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 1,
    sprite: 'starship',
    spriteIndex: 1
  },
  {
    id: 4,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 2,
    sprite: 'starship',
    spriteIndex: 2
  },
  {
    id: 3,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 2,
    sprite: 'starship',
    spriteIndex: 3
  },
  {
    id: 6,
    cardType: CardType.STARSHIP,
    action: Action.ASTRONAUT,
    value: 3,
    sprite: 'starship',
    spriteIndex: 4
  },
  {
    id: 5,
    cardType: CardType.STARSHIP,
    action: Action.WATER,
    value: 3,
    sprite: 'starship',
    spriteIndex: 5
  },
  {
    id: 7,
    cardType: CardType.STARSHIP,
    action: Action.PLANNING,
    value: 3,
    sprite: 'starship',
    spriteIndex: 6
  },
  {
    id: 10,
    cardType: CardType.STARSHIP,
    action: Action.ASTRONAUT,
    value: 4,
    sprite: 'starship',
    spriteIndex: 7
  },
  {
    id: 8,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 4,
    sprite: 'starship',
    spriteIndex: 8
  },
  {
    id: 9,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 4,
    sprite: 'starship',
    spriteIndex: 9
  },
  {
    id: 11,
    cardType: CardType.STARSHIP,
    action: Action.PLANNING,
    value: 4,
    sprite: 'starship',
    spriteIndex: 10
  },
  {
    id: 14,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 5,
    sprite: 'starship',
    spriteIndex: 11
  },
  {
    id: 15,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 5,
    sprite: 'starship',
    spriteIndex: 12
  },
  {
    id: 16,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 5,
    sprite: 'starship',
    spriteIndex: 13
  },
  {
    id: 12,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 5,
    sprite: 'starship',
    spriteIndex: 14
  },
  {
    id: 13,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 5,
    sprite: 'starship',
    spriteIndex: 15
  },
  {
    id: 21,
    cardType: CardType.STARSHIP,
    action: Action.ASTRONAUT,
    value: 6,
    sprite: 'starship',
    spriteIndex: 16
  },
  {
    id: 18,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 6,
    sprite: 'starship',
    spriteIndex: 17
  },
  {
    id: 19,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 6,
    sprite: 'starship',
    spriteIndex: 18
  },
  {
    id: 17,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 6,
    sprite: 'starship',
    spriteIndex: 19
  },
  {
    id: 20,
    cardType: CardType.STARSHIP,
    action: Action.WATER,
    value: 6,
    sprite: 'starship',
    spriteIndex: 20
  },
  {
    id: 22,
    cardType: CardType.STARSHIP,
    action: Action.PLANNING,
    value: 6,
    sprite: 'starship',
    spriteIndex: 21
  },
  {
    id: 24,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 7,
    sprite: 'starship',
    spriteIndex: 22
  },
  {
    id: 25,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 7,
    sprite: 'starship',
    spriteIndex: 23
  },
  {
    id: 26,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 7,
    sprite: 'starship',
    spriteIndex: 24
  },
  {
    id: 27,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 7,
    sprite: 'starship',
    spriteIndex: 25
  },
  {
    id: 23,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 7,
    sprite: 'starship',
    spriteIndex: 26
  },
  {
    id: 28,
    cardType: CardType.STARSHIP,
    action: Action.WATER,
    value: 7,
    sprite: 'starship',
    spriteIndex: 27
  },
  {
    id: 34,
    cardType: CardType.STARSHIP,
    action: Action.ASTRONAUT,
    value: 8,
    sprite: 'starship',
    spriteIndex: 28
  },
  {
    id: 31,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 8,
    sprite: 'starship',
    spriteIndex: 29
  },
  {
    id: 32,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 8,
    sprite: 'starship',
    spriteIndex: 30
  },
  {
    id: 29,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 8,
    sprite: 'starship',
    spriteIndex: 31
  },
  {
    id: 30,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 8,
    sprite: 'starship',
    spriteIndex: 32
  },
  {
    id: 33,
    cardType: CardType.STARSHIP,
    action: Action.WATER,
    value: 8,
    sprite: 'starship',
    spriteIndex: 33
  },
  {
    id: 35,
    cardType: CardType.STARSHIP,
    action: Action.PLANNING,
    value: 8,
    sprite: 'starship',
    spriteIndex: 34
  },
  {
    id: 37,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 9,
    sprite: 'starship',
    spriteIndex: 35
  },
  {
    id: 38,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 9,
    sprite: 'starship',
    spriteIndex: 36
  },
  {
    id: 39,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 9,
    sprite: 'starship',
    spriteIndex: 37
  },
  {
    id: 40,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 9,
    sprite: 'starship',
    spriteIndex: 38
  },
  {
    id: 36,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 9,
    sprite: 'starship',
    spriteIndex: 39
  },
  {
    id: 41,
    cardType: CardType.STARSHIP,
    action: Action.WATER,
    value: 9,
    sprite: 'starship',
    spriteIndex: 40
  },
  {
    id: 46,
    cardType: CardType.STARSHIP,
    action: Action.ASTRONAUT,
    value: 10,
    sprite: 'starship',
    spriteIndex: 41
  },
  {
    id: 43,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 10,
    sprite: 'starship',
    spriteIndex: 42
  },
  {
    id: 41,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 10,
    sprite: 'starship',
    spriteIndex: 43
  },
  {
    id: 42,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 10,
    sprite: 'starship',
    spriteIndex: 44
  },
  {
    id: 45,
    cardType: CardType.STARSHIP,
    action: Action.WATER,
    value: 10,
    sprite: 'starship',
    spriteIndex: 45
  },
  {
    id: 47,
    cardType: CardType.STARSHIP,
    action: Action.PLANNING,
    value: 10,
    sprite: 'starship',
    spriteIndex: 46
  },
  {
    id: 50,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 11,
    sprite: 'starship',
    spriteIndex: 47
  },
  {
    id: 51,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 11,
    sprite: 'starship',
    spriteIndex: 48
  },
  {
    id: 52,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 11,
    sprite: 'starship',
    spriteIndex: 49
  },
  {
    id: 48,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 11,
    sprite: 'starship',
    spriteIndex: 50
  },
  {
    id: 49,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 11,
    sprite: 'starship',
    spriteIndex: 51
  },
  {
    id: 55,
    cardType: CardType.STARSHIP,
    action: Action.ASTRONAUT,
    value: 12,
    sprite: 'starship',
    spriteIndex: 52
  },
  {
    id: 53,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 12,
    sprite: 'starship',
    spriteIndex: 53
  },
  {
    id: 54,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 12,
    sprite: 'starship',
    spriteIndex: 54
  },
  {
    id: 53,
    cardType: CardType.STARSHIP,
    action: Action.PLANNING,
    value: 12,
    sprite: 'starship',
    spriteIndex: 55
  },
  {
    id: 58,
    cardType: CardType.STARSHIP,
    action: Action.ASTRONAUT,
    value: 13,
    sprite: 'starship',
    spriteIndex: 56
  },
  {
    id: 57,
    cardType: CardType.STARSHIP,
    action: Action.WATER,
    value: 13,
    sprite: 'starship',
    spriteIndex: 57
  },
  {
    id: 59,
    cardType: CardType.STARSHIP,
    action: Action.PLANNING,
    value: 13,
    sprite: 'starship',
    spriteIndex: 58
  },
  {
    id: 61,
    cardType: CardType.STARSHIP,
    action: Action.PLANT,
    value: 14,
    sprite: 'starship',
    spriteIndex: 59
  },
  {
    id: 60,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 14,
    sprite: 'starship',
    spriteIndex: 60
  },
  {
    id: 63,
    cardType: CardType.STARSHIP,
    action: Action.ENERGY,
    value: 15,
    sprite: 'starship',
    spriteIndex: 61
  },
  {
    id: 62,
    cardType: CardType.STARSHIP,
    action: Action.ROBOT,
    value: 15,
    sprite: 'starship',
    spriteIndex: 62
  },

  // ### CAMPAIGN STARSHIP CARDS ###
  {
    id: 149,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: Action.ENERGY,
    value: SpecialValue.X,
    sprite: 'starship',
    spriteIndex: 63
  },
  {
    id: 150,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: Action.PLANT,
    value: SpecialValue.X,
    sprite: 'starship',
    spriteIndex: 64
  },
  {
    id: 151,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: Action.ROBOT,
    value: SpecialValue.X,
    sprite: 'starship',
    spriteIndex: 65
  },
  {
    id: 152,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: [Action.ENERGY,Action.WATER],
    value: 0,
    sprite: 'campaign',
    spriteIndex: 0
  },
  {
    id: 153,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: [Action.ASTRONAUT,Action.PLANT],
    value: SpecialValue.N8_5,
    sprite: 'campaign',
    spriteIndex: 1
  },
  {
    id: 154,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: [Action.ROBOT,Action.PLANNING],
    value: 42,
    sprite: 'campaign',
    spriteIndex: 2
  },
  {
    id: 155,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: Action.JOKER,
    value: 4,
    sprite: 'campaign',
    spriteIndex: 3
  },
  {
    id: 156,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: Action.JOKER,
    value: SpecialValue.N6_OR_9,
    sprite: 'campaign',
    spriteIndex: 4
  },
  {
    id: 157,
    cardType: CardType.STARSHIP_CAMPAIGN,
    action: Action.JOKER,
    value: 12,
    sprite: 'campaign',
    spriteIndex: 5
  },

  // ### ASTRA EFFECT CARDS ###
  {
    id: 112,
    cardType: CardType.ASTRA_EFFECT,
    action: Action.NONE,
    value: SpecialValue.A,
    sprite: 'starship',
    spriteIndex: 66
  },
  {
    id: 113,
    cardType: CardType.ASTRA_EFFECT,
    action: Action.NONE,
    value: SpecialValue.B,
    sprite: 'starship',
    spriteIndex: 67
  },
  {
    id: 114,
    cardType: CardType.ASTRA_EFFECT,
    action: Action.NONE,
    value: SpecialValue.C,
    sprite: 'starship',
    spriteIndex: 68
  },

  // ### CAMPAIGN EVENT CARDS ###
  {
    id: 158,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 6,
    eventIndex: [{mission:2,index:157}, {mission:5,index:66}, {mission:7,index:105}]
  },
  {
    id: 159,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 7,
    eventIndex: [{mission:2,index:106}, {mission:5,index:85}, {mission:7,index:105}]
  },
  {
    id: 160,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 8,
    eventIndex: [{mission:2,index:34}, {mission:5,index:26}, {mission:7,index:153}]
  },
  {
    id: 161,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 9,
    eventIndex: [{mission:3,index:84}, {mission:7,index:165}]
  },
  {
    id: 162,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 10,
    eventIndex: [{mission:1,index:65}, {mission:4,index:80}, {mission:7,index:5}]
  },
  {
    id: 163,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 11,
    eventIndex: [{mission:2,index:20}, {mission:5,index:17}, {mission:7,index:31}]
  },
  {
    id: 164,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 12,
    eventIndex: [{mission:2,index:183}, {mission:6,index:170}, {mission:7,index:137}]
  },
  {
    id: 165,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 13,
    eventIndex: [{mission:3,index:71}, {mission:6,index:90}, {mission:7,index:63}]
  },
  {
    id: 166,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 14,
    eventIndex: [{mission:3,index:11}, {mission:6,index:90}]
  },
  {
    id: 167,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 15,
    eventIndex: [{mission:4,index:101}, {mission:6,index:102}]
  },
  {
    id: 168,
    cardType: CardType.CAMPAIGN_EVENT,
    action: Action.NONE,
    value: -1,
    sprite: 'campaign',
    spriteIndex: 16,
    eventIndex: [{mission:4,index:51}, {mission:8,index:38}]
  },

]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get cards by type
   * @param cardType Card type
   * @returns cards
   */
  getByType(cardType : CardType) : Card[] {
    return cards.filter(card => card.cardType === cardType)
  }

}
