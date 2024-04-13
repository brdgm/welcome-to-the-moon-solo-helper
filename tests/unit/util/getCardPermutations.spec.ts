import Cards from '@/services/Cards'
import getCardPermutations from '@/util/getCardPermutations'
import { expect } from 'chai'

describe('util/getCardPermutations', () => {
  it('permutation', () => {
    const result = getCardPermutations([
      Cards.get(1),
      Cards.get(2),
      Cards.get(3)
    ])

    expect(result.length).to.eq(6)
    expect(result[0].map(item => item.id)).to.eql([1,2,3])
    expect(result[1].map(item => item.id)).to.eql([1,3,2])
    expect(result[2].map(item => item.id)).to.eql([2,1,3])
    expect(result[3].map(item => item.id)).to.eql([2,3,1])
    expect(result[4].map(item => item.id)).to.eql([3,1,2])
    expect(result[5].map(item => item.id)).to.eql([3,2,1])
  })
})
