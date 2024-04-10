import Cards from '@/services/Cards'
import CardType from '@/services/enum/CardType'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getByType', () => {
    expect(Cards.getByType(CardType.STARSHIP).length).eq(63)
    expect(Cards.getByType(CardType.STARSHIP_CAMPAIGN).length).eq(9)
    expect(Cards.getByType(CardType.ASTRA_EFFECT).length).eq(3)
  })
})
