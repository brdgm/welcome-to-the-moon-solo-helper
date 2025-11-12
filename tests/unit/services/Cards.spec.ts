import Cards from '@/services/Cards'
import Action from '@/services/enum/Action'
import CardType from '@/services/enum/CardType'
import MissionCardType from '@/services/enum/MissionCardType'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('starship-cards', () => {
    const cards = Cards.getByType(CardType.STARSHIP)
    expect(cards.length, 'total').eq(63)

    // actions
    for (const action of [Action.ROBOT,Action.ENERGY,Action.PLANT]) {
      expect(cards.filter(card => card.action==action).length, `action: ${action}`).eq(14)
    }
    for (const action of [Action.WATER,Action.ASTRONAUT,Action.PLANNING]) {
      expect(cards.filter(card => card.action==action).length, `action: ${action}`).eq(7)
    }

    // numbers
    for (const value of [1,2,14,15]) {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(2)
    }
    for (const value of [3,13]) {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(3)
    }
    for (const value of [4,12]) {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(4)
    }
    for (const value of [5,11]) {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(5)
    }
    for (const value of [6,7,9,10]) {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(6)
    }
    for (const value of [8]) {
      expect(cards.filter(card => card.value==value).length, `number: ${value}`).eq(7)
    }
  })

  it('starship-campaign-cards', () => {
    expect(Cards.getByType(CardType.STARSHIP_CAMPAIGN).length).eq(9)
  })

  it('astra-effect-cards', () => {
    expect(Cards.getByType(CardType.ASTRA_EFFECT).length).eq(3)
  })

  it('mission-cards', () => {
    for (let mission=1; mission<=8; mission++) {
      expect(Cards.getMissionCards(mission, MissionCardType.A).length).eq(2)
      expect(Cards.getMissionCards(mission, MissionCardType.B).length).eq(2)
      expect(Cards.getMissionCards(mission, MissionCardType.C).length).eq(2)
    }
  })

  it('spriteIndex', () => {
    // ensure all cards have a unique sprite index
    const indexes = new Set<string>()
    for (const cardType of Object.values(CardType)) {
      for (const card of Cards.getByType(cardType)) {
        indexes.add(`${card.sprite}-${card.spriteIndex}`)
      }
    }
    expect(indexes.size).eq(63+9+3+11+48)
  })
})
