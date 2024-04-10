import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import Level from './Level'
import Action from './enum/Action'

/**
 * ASTRA Levels.
 */
const levels : Level[] = [

  {
    level: 1,
    actions: [
      { action: Action.ROBOT,     points: 2 },
      { action: Action.ENERGY,    points: 3 },
      { action: Action.PLANT,     points: 2 },
      { action: Action.WATER,     points: 3 },
      { action: Action.ASTRONAUT, points: 1 },
      { action: Action.PLANNING,  points: 4 }
    ]
  },
  {
    level: 2,
    actions: [
      { action: Action.ROBOT,     points: 2 },
      { action: Action.ENERGY,    points: 3 },
      { action: Action.PLANT,     points: 3 },
      { action: Action.WATER,     points: 2 },
      { action: Action.ASTRONAUT, points: 4 },
      { action: Action.PLANNING,  points: 3 }
    ]
  },
  {
    level: 3,
    actions: [
      { action: Action.ROBOT,     points: 5 },
      { action: Action.ENERGY,    points: 4 },
      { action: Action.PLANT,     points: 2 },
      { action: Action.WATER,     points: 2 },
      { action: Action.ASTRONAUT, points: 2 },
      { action: Action.PLANNING,  points: 3 }
    ]
  },
  {
    level: 4,
    actions: [
      { action: Action.ROBOT,     points: 2 },
      { action: Action.ENERGY,    points: 6 },
      { action: Action.PLANT,     points: 4 },
      { action: Action.WATER,     points: 3 },
      { action: Action.ASTRONAUT, points: 3 },
      { action: Action.PLANNING,  points: 2 }
    ]
  },
  {
    level: 5,
    actions: [
      { action: Action.ROBOT,     points: 4 },
      { action: Action.ENERGY,    points: 4 },
      { action: Action.PLANT,     points: 4 },
      { action: Action.WATER,     points: 4 },
      { action: Action.ASTRONAUT, points: 4 },
      { action: Action.PLANNING,  points: 3 }
    ]
  },
  {
    level: 6,
    actions: [
      { action: Action.ROBOT,     points: 6 },
      { action: Action.ENERGY,    points: 2 },
      { action: Action.PLANT,     points: 4 },
      { action: Action.WATER,     points: 5 },
      { action: Action.ASTRONAUT, points: 4 },
      { action: Action.PLANNING,  points: 4 }
    ]
  },
  {
    level: 7,
    actions: [
      { action: Action.ROBOT,     points: 5 },
      { action: Action.ENERGY,    points: 4 },
      { action: Action.PLANT,     points: 3 },
      { action: Action.WATER,     points: 6 },
      { action: Action.ASTRONAUT, points: 5 },
      { action: Action.PLANNING,  points: 4 }
    ]
  },
  {
    level: 8,
    actions: [
      { action: Action.ROBOT,     points: 5 },
      { action: Action.ENERGY,    points: 3 },
      { action: Action.PLANT,     points: 6 },
      { action: Action.WATER,     points: 3 },
      { action: Action.ASTRONAUT, points: 6 },
      { action: Action.PLANNING,  points: 6 }
    ]
  }

]

const levelsMap = new Map<number,Level>()
levels.forEach(level => levelsMap.set(level.level, level))

export default {

  /**
   * Get Level by ID
   * @param id Level number
   * @returns Level
   */
  get(id: number) : Level {
    return findMandatory(levelsMap, id)
  },

  /**
   * Get Levels
   * @returns Levels
   */
  getAll() : Level[] {
    return levels
  }

}
