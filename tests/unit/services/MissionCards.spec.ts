import MissionCardStatus from '@/services/enum/MissionCardStatus'
import SpecialValue from '@/services/enum/SpecialValue'
import MissionCards from '@/services/MissionCards'
import { expect } from 'chai'

describe('services/MissionCards', () => {
  it('new', () => {
    const missionCards = MissionCards.new(1)
    expect(missionCards.cards.length).to.eq(3)
    expect(missionCards.cards.map(card => card.value)).to.eql([SpecialValue.A,SpecialValue.B,SpecialValue.C])
    expect(missionCards.cards.map(card => card.mission)).to.eql([1,1,1])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([false,false,false])

    const persistence = missionCards.toPersistence()
    expect(persistence.length).to.eq(3)
    expect(persistence.map(item => item.status)).to.eql([MissionCardStatus.OPEN, MissionCardStatus.OPEN, MissionCardStatus.OPEN])
  })

  it('status', () => {
    const missionCards = MissionCards.fromPersistence([
      { card: 64, status: MissionCardStatus.OPEN },
      { card: 66, status: MissionCardStatus.OPEN },
      { card: 68, status: MissionCardStatus.FLIPPED }
    ])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([false,false,true])
    expect(missionCards.cards.map(card => missionCards.isAccomplished(card))).to.eql([false,false,false])

    missionCards.flip(missionCards.cards[1])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([false,true,true])
    expect(missionCards.cards.map(card => missionCards.isAccomplished(card))).to.eql([false,false,false])

    missionCards.accomplish(missionCards.cards[1])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([false,false,true])
    expect(missionCards.cards.map(card => missionCards.isAccomplished(card))).to.eql([false,true,false])

    missionCards.flip(missionCards.cards[0])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([true,false,true])
    expect(missionCards.cards.map(card => missionCards.isAccomplished(card))).to.eql([false,true,false])

    missionCards.reset(missionCards.cards[2])
    expect(missionCards.cards.map(card => missionCards.isFlipped(card))).to.eql([true,false,false])
    expect(missionCards.cards.map(card => missionCards.isAccomplished(card))).to.eql([false,true,false])

    const persistence = missionCards.toPersistence()
    expect(persistence.map(item => item.status)).to.eql([MissionCardStatus.FLIPPED, MissionCardStatus.ACCOMPLISHED, MissionCardStatus.OPEN])
  })
})
