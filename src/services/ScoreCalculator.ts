import Card from './Card'
import Level from './Level'
import Mission from './Mission'
import Action from './enum/Action'

export default class ScoreCalculator {

  public readonly actionScores: ActionScore[]
  public readonly fixedPoints: number
  public readonly level: number
  public readonly levelMultiplier: number
  public readonly levelPoints: number
  public readonly totalPoints: number
  public readonly mission1Dots: boolean[]

  public constructor(mission : Mission, level : Level, botCards : readonly Card[]) {
    this.actionScores = SCORE_ACTIONS.map(action => {
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
    if (mission.mission == 1) {
      this.mission1Dots = buildMission1Dots(level, botCards)
      this.totalPoints = calculateMission1TotalPoints(this.mission1Dots)
    }
    else {
      this.mission1Dots = []
      this.totalPoints = this.actionScores.reduce((total, item) => total + item.total, 0)
          + this.fixedPoints
          + this.levelPoints
    }
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

const SCORE_ACTIONS = [
  Action.ROBOT,
  Action.ENERGY,
  Action.PLANT,
  Action.WATER,
  Action.ASTRONAUT,
  Action.PLANNING
]

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

/* --- Special Mission 1 handling --- */
const MISSION1_LEVEL_OFFSET : number[] = [
  0, /* level 1 ... */
  3,
  2,
  2,
  2,
  2,
  2,
  2  /* ... level 8 */
]

function buildMission1Dots(level: Level, botCards : readonly Card[]) : boolean[] {
  const dots = new Array<boolean>(15*5 + 6)
  // mark off initial dots based on level
  let initialDots = 0
  for (let i = level.level; i < MISSION1_LEVEL_OFFSET.length; i++) {
    initialDots += MISSION1_LEVEL_OFFSET[i]
  }
  markDots(dots, initialDots)
  const cardPoints = SCORE_ACTIONS.reduce((total, action) => total
     + (getActionPoints(level, action) * getActionCards(botCards, action)), 0)
  markDots(dots, cardPoints)
  console.log(initialDots + ' + ' + cardPoints + ' = ' + (initialDots+cardPoints))
  return dots
}

function markDots(dots: boolean[], count: number) : void {
  for (let i = 0; i < count; i++) {
    const nextIndex = dots.findIndex(item => !item)
    if (nextIndex >= 0) {
      dots[nextIndex] = true
    }
  }
}

function calculateMission1TotalPoints(dots: boolean[]) : number {
  const dotCount = dots.filter(item => item).length - 11
  if (dotCount <= 0) {
    return 10
  }
  const points = (Math.floor(dotCount / 5) + 1) * 10
  if (points > 140) {
    return 150
  }
  return points
}
