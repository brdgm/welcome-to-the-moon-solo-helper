import MissionCardType from '@/services/enum/MissionCardType'
import MissionCards from '@/services/MissionCards'
import { expect } from 'chai'

describe('services/MissionCards', () => {
  it('new', () => {
    const missionCards = MissionCards.new(1)
    expect(missionCards.cards.length).to.eq(3)
    expect(missionCards.cards.map(card => card.missionCardType)).to.eql([MissionCardType.A,MissionCardType.B,MissionCardType.C])
    expect(missionCards.cards.map(card => card.mission)).to.eql([1,1,1])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([false,false,false])

    const persistence = missionCards.toPersistence()
    expect(persistence.length).to.eq(3)
    expect(persistence.map(item => item.flipped)).to.eql([false,false,false])
  })

  it('flip', () => {
    const missionCards = MissionCards.fromPersistence([
      { card: 64, flipped: false },
      { card: 66, flipped: false },
      { card: 68, flipped: true }
    ])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([false,false,true])

    missionCards.flip(missionCards.cards[1])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([false,true,true])

    missionCards.flip(missionCards.cards[1])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([false,true,true])

    missionCards.flip(missionCards.cards[0])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([true,true,true])

    const persistence = missionCards.toPersistence()
    expect(persistence.map(item => item.flipped)).to.eql([true,true,true])
  })
})
