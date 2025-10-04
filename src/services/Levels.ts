import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Level from './Level'
import Action from './enum/Action'

/**
 * ASTRA Levels.
 */
const levels : Level[] = [

  {
    level: 1,
    name: 'Katherine',
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
    name: 'Alexei',
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
    name: 'Margaret',
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
    name: 'Franklin',
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
    name: 'Sergei',
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
    name: 'Stephanie',
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
    name: 'Thomas',
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
    name: 'Peggy',
    actions: [
      { action: Action.ROBOT,     points: 5 },
      { action: Action.ENERGY,    points: 3 },
      { action: Action.PLANT,     points: 6 },
      { action: Action.WATER,     points: 3 },
      { action: Action.ASTRONAUT, points: 6 },
      { action: Action.PLANNING,  points: 6 }
    ]
  },
  {
    level: 9,
    name: 'Welcome Team',
    actions: [
      { action: Action.ROBOT,     points: 5 },
      { action: Action.ENERGY,    points: 4 },
      { action: Action.PLANT,     points: 6 },
      { action: Action.WATER,     points: 6 },
      { action: Action.ASTRONAUT, points: 6 },
      { action: Action.PLANNING,  points: 3 }
    ]
  }

]

const levelsMap = new Map<number,Level>()
for (const level of levels) {
  levelsMap.set(level.level, level)
}

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
