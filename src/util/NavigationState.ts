import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { State } from '@/store/state'
import Mission from '@/services/Mission'
import Level from '@/services/Level'
import Missions from '@/services/Missions'
import Levels from '@/services/Levels'
import CardDeck from '@/services/CardDeck'
import CampaignOption from '@/services/CampaignOption'
import getCampaignOptions from './getCampaignOptions'

export default class NavigationState {

  readonly mission : Mission
  readonly level: Level
  readonly campaignOptions : CampaignOption[]
  readonly turn : number
  readonly cardDeck : CardDeck
  readonly exhaustCount : number

  public constructor(route: RouteLocation, state: State) {
    this.mission = Missions.get(state.setup.mission)
    this.level = Levels.get(state.setup.level)
    this.turn = getIntRouteParam(route, 'turn')
    this.campaignOptions = getCampaignOptions(this.mission.mission, state)
    this.cardDeck = getCardDeck(this.turn - 1, state, this.campaignOptions)
    // store exhaust count before drawing cards, in case only effect cards are left in pile
    this.exhaustCount = this.cardDeck.exhaustCount
    // draw cards
    if (this.cardDeck.canDraw) {
      this.cardDeck.draw()
    }
  }

}

function getCardDeck(turn: number, state: State, campaignOptions: CampaignOption[]) : CardDeck {
  if (turn > 0) {
    const turnData = state.turns.find(item => item.turn == turn)
    if (turnData) {
      return CardDeck.fromPersistence(turnData.cardDeck, campaignOptions)
    }
    return getCardDeck(turn - 1, state, campaignOptions)
  }
  if (state.setup.initialCardDeck) {
    return CardDeck.fromPersistence(state.setup.initialCardDeck, campaignOptions)
  }
  // should never happen
  return CardDeck.new(campaignOptions)
}
