import { RouteLocation } from 'vue-router'
import getIntRouteParam from 'brdgm-commons/src/util/router/getIntRouteParam'
import { State } from '@/store/state'
import Mission from '@/services/Mission'
import Level from '@/services/Level'
import Missions from '@/services/Missions'
import Levels from '@/services/Levels'

export default class NavigationState {

  readonly mission : Mission
  readonly level: Level
  readonly turn : number

  public constructor(route : RouteLocation, state : State) {
    this.mission = Missions.get(state.setup.mission)
    this.level = Levels.get(state.setup.level)
    this.turn = getIntRouteParam(route, 'turn')
  }

}
