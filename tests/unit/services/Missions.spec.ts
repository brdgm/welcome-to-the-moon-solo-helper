import Missions from '@/services/Missions'
import { expect } from 'chai'

describe('services/Missions', () => {
  it('get', () => {
    const mission = Missions.get(1)

    expect(mission).not.undefined
    expect(mission?.mission).to.eq(1)
  })

  it('getAll', () => {
    const missions = Missions.getAll()
    expect(missions.length).eq(8);
  })
})
