import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import Mission from './Mission'

/**
 * Missions
 */
const missions : Mission[] = [

  {
    mission: 1,
    fixedPoints: 0,
    levelMultiplier: 0
  },
  {
    mission: 2,
    fixedPoints: 5,
    levelMultiplier: 1
  },
  {
    mission: 3,
    fixedPoints: 10,
    levelMultiplier: 3
  },
  {
    mission: 4,
    fixedPoints: 5,
    levelMultiplier: 2
  },
  {
    mission: 5,
    fixedPoints: 10,
    levelMultiplier: 2
  },
  {
    mission: 6,
    fixedPoints: 5,
    levelMultiplier: 4
  },
  {
    mission: 7,
    fixedPoints: 15,
    levelMultiplier: 1
  },
  {
    mission: 8,
    fixedPoints: 20,
    levelMultiplier: 3
  }

]

const missionsMap = new Map<number,Mission>()
missions.forEach(mission => missionsMap.set(mission.mission, mission))

export default {

  /**
   * Get Mission by ID
   * @param id Mission number
   * @returns Mission
   */
  get(id: number) : Mission {
    return findMandatory(missionsMap, id)
  },

  /**
   * Get Missions by type
   * @returns Missions
   */
  getAll() : Mission[] {
    return missions
  }

}
