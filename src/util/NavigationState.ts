import { Setup, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from 'brdgm-commons/src/util/router/getIntRouteParam'

export default class NavigationState {

  readonly turn : number

  public constructor(route : RouteLocation, state : State) {
    this.turn = getIntRouteParam(route, 'turn')
  }

}
