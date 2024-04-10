import Cards from '@/services/Cards'
import Action from '@/services/enum/Action'
import CardType from '@/services/enum/CardType'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('starship-cards', () => {
    const cards = Cards.getByType(CardType.STARSHIP)
    expect(cards.length, 'total').eq(63);

    // actions
    [Action.ROBOT,Action.ENERGY,Action.PLANT].forEach(action => {
      expect(cards.filter(card => card.action==action).length, `action: ${action}`).eq(14)
    });
    [Action.WATER,Action.ASTRONAUT,Action.PLANNING].forEach(action => {
      expect(cards.filter(card => card.action==action).length, `action: ${action}`).eq(7)
    });

    // numbers
    [1,2,14,15].forEach(value => {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(2)
    });
    [3,13].forEach(value => {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(3)
    });
    [4,12].forEach(value => {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(4)
    });
    [5,11].forEach(value => {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(5)
    });
    [6,7,9,10].forEach(value => {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(6)
    });
    [8].forEach(value => {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(7)
    });
  })

  it('starship-campaign-cards', () => {
    expect(Cards.getByType(CardType.STARSHIP_CAMPAIGN).length).eq(9)
  })

  it('astra-effect-cards', () => {
    expect(Cards.getByType(CardType.ASTRA_EFFECT).length).eq(3)
  })
})
