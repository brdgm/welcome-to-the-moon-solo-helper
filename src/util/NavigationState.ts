import { RouteLocation } from 'vue-router'
import getIntRouteParam from 'brdgm-commons/src/util/router/getIntRouteParam'
import { State } from '@/store/state'
import Mission from '@/services/Mission'
import Level from '@/services/Level'
import Missions from '@/services/Missions'
import Levels from '@/services/Levels'
import CardDeck from '@/services/CardDeck'

export default class NavigationState {

  readonly mission : Mission
  readonly level: Level
  readonly turn : number
  readonly cardDeck : CardDeck

  public constructor(route : RouteLocation, state : State) {
    this.mission = Missions.get(state.setup.mission)
    this.level = Levels.get(state.setup.level)
    this.turn = getIntRouteParam(route, 'turn')
    this.cardDeck = getCardDeck(this.turn - 1, state)
    // draw cards
    if (this.cardDeck.canDraw) {
      this.cardDeck.draw()
    }
  }

}

function getCardDeck(turn : number, state : State) : CardDeck {
  if (turn > 0) {
    const turnData = state.turns.find(item => item.turn == turn)
    if (turnData) {
      return CardDeck.fromPersistence(turnData.cardDeck)
    }
    return getCardDeck(turn - 1, state)
  }
  if (state.setup.initialCardDeck) {
    return CardDeck.fromPersistence(state.setup.initialCardDeck)
  }
  // should never happen
  return CardDeck.new()
}
