import Cards from '@/services/Cards'
import Levels from '@/services/Levels'
import Missions from '@/services/Missions'
import ScoreCalculator from '@/services/ScoreCalculator'
import Action from '@/services/enum/Action'
import { expect } from 'chai'

describe('services/ScoreCalculator', () => {
  it('mission2-level3', () => {
    const score = new ScoreCalculator(Missions.get(2), Levels.get(3),
      // ENERGY, ROBOT, PLANT, ROBOT
      [1,2,3,4].map(item => Cards.get(item)))

    const actionScores = score.actionScores
    expect(actionScores).to.have.lengthOf(6)
    expect(actionScores[0]).to.eql({ action: Action.ROBOT, points: 5, count: 2, total: 10, lowest: false, highest: true })
    expect(actionScores[1]).to.eql({ action: Action.ENERGY, points: 4, count: 1, total: 4, lowest: false, highest: false })
    expect(actionScores[2]).to.eql({ action: Action.PLANT, points: 2, count: 1, total: 2, lowest: true, highest: false })
    expect(actionScores[3]).to.eql({ action: Action.WATER, points: 2, count: 0, total: 0, lowest: true, highest: false })
    expect(actionScores[4]).to.eql({ action: Action.ASTRONAUT, points: 2, count: 0, total: 0, lowest: true, highest: false })
    expect(actionScores[5]).to.eql({ action: Action.PLANNING, points: 3, count: 0, total: 0, lowest: false, highest: false })

    expect(score.fixedPoints).to.eq(5)
    expect(score.level).to.eq(3)
    expect(score.levelMultiplier).to.eq(1)
    expect(score.levelPoints).to.eq(3)
    expect(score.totalPoints).to.eq(24)
  })

  it('mission1-level7', () => {
    const score = new ScoreCalculator(Missions.get(1), Levels.get(7),
      // ENERGY, ROBOT, PLANT, ROBOT, ASTRONAUT, WATER, PLANNING, ASTRONAUT
      [1,2,3,4,5,6,7,8].map(item => Cards.get(item)))

    expect(score.totalPoints).to.eq(60)
  })
})
