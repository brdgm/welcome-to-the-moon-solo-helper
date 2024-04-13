import Card from './Card'
import Level from './Level'
import Mission from './Mission'
import Action from './enum/Action'

export default class ScoreCalculator {

  private readonly SCORE_ACTIONS = [
    Action.ROBOT,
    Action.ENERGY,
    Action.PLANT,
    Action.WATER,
    Action.ASTRONAUT,
    Action.PLANNING
  ]

  private readonly MISSION1_LEVEL_OFFSET : number[] = [
    0, /* level 1 ... */
    3,
    2,
    2,
    2,
    2,
    2,
    2  /* ... level 8 */
  ]

  public readonly actionScores: ActionScore[]
  public readonly fixedPoints: number
  public readonly level: number
  public readonly levelMultiplier: number
  public readonly levelPoints: number
  public readonly totalPoints: number

  public constructor(mission : Mission, level : Level, botCards : readonly Card[]) {
    this.actionScores = this.SCORE_ACTIONS.map(action => {
      const points = getActionPoints(level, action)
      const count = getActionCards(botCards, action)
      const total = points * count
      return {
        action: action,
        points: points,
        count: count,
        total: total,
        lowest: isLowest(level, action),
        highest: isHighest(level, action)
      }
    })
    this.fixedPoints = mission.fixedPoints
    this.level = level.level
    this.levelMultiplier = mission.levelMultiplier
    this.levelPoints = this.level * this.levelMultiplier
    this.totalPoints = this.actionScores.reduce((total, item) => total + item.total, 0)
        + this.fixedPoints
        + this.levelPoints
  }

}

export interface ActionScore {
  action: Action
  points: number
  count: number
  total: number
  lowest: boolean
  highest: boolean
}

function getActionPoints(level: Level, action: Action) : number {
  return level.actions.find(item => item.action == action)?.points ?? 0
}

function getActionCards(cards: readonly Card[], action: Action) : number {
  return cards.filter(item => item.action == action || item.action.includes(action)).length
}

function isLowest(level: Level, action: Action) : boolean {
  const points = getActionPoints(level, action)
  return level.actions.filter(item => item.points < points).length == 0
      && level.actions.filter(item => item.points == points).length <= 3
}

function isHighest(level: Level, action: Action) : boolean {
  const points = getActionPoints(level, action)
  return level.actions.filter(item => item.points > points).length == 0      
      && level.actions.filter(item => item.points == points).length <= 3
}
