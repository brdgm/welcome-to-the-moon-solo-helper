import Action from './enum/Action'
import CardType from './enum/CardType'
import MissionType from './enum/MissionType'
import SpecialValue from './enum/SpecialValue'

export default interface Card {
  id: number
  cardType: CardType
  action: Action|Action[]
  value: number|SpecialValue
  sprite: string
  spriteIndex: number
  eventIndex?: EventIndex[]
  mission?: number
  missionType?: MissionType
}

export interface EventIndex {
  mission: number
  index: number
}
