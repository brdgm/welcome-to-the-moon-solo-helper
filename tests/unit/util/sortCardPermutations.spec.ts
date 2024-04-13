import Cards from '@/services/Cards'
import getCardPermutations from '@/util/getCardPermutations'
import sortCardPermutations from '@/util/sortCardPermutations'
import { expect } from 'chai'

describe('util/sortCardPermutations.spec', () => {
  it('permutation', () => {
    const result = sortCardPermutations(getCardPermutations([
      Cards.get(12),  // ROBOT/5
      Cards.get(47),  // PLANNING/10
      Cards.get(60)   // ROBOT/14
    ]))

    expect(result.length).to.eq(6)
    expect(result[0].map(item => item.id)).to.eql([60,12,47])  // robot 5
    expect(result[1].map(item => item.id)).to.eql([12,47,60])  // robot 10
    expect(result[2].map(item => item.id)).to.eql([60,47,12])  // robot 10
    expect(result[3].map(item => item.id)).to.eql([12,60,47])  // robot 14
    expect(result[4].map(item => item.id)).to.eql([47,12,60])  // planning 5
    expect(result[5].map(item => item.id)).to.eql([47,60,12])  // planning 14
  })
})
