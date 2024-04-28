import Levels from '@/services/Levels'
import { expect } from 'chai'

describe('services/Levels', () => {
  it('get', () => {
    const level = Levels.get(1)

    expect(level).not.undefined
    expect(level?.level).to.eq(1)
  })

  it('getAll', () => {
    const levels = Levels.getAll()
    expect(levels.length).eq(9)
  })
})
