import CardDeck from '@/services/CardDeck'
import CardType from '@/services/enum/CardType'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new()

    expect(deck.pile.length, 'pile size').to.eq(66)
    expect(deck.currentCards.length, 'current cards size').to.eq(0)
    expect(deck.currentEffects.length, 'current effects size').to.eq(0)
    expect(deck.discard.length, 'discard size').to.eq(0)
    expect(deck.bot.length, 'bot size').to.eq(0)

    expect(deck.pile.findIndex(item => item.cardType==CardType.ASTRA_EFFECT),
        '1st effect card in last third of pile').to.greaterThanOrEqual(42)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(66)
    expect(persistence.current.length, 'current size').to.eq(0)
    expect(persistence.discard.length, 'discard size').to.eq(0)
    expect(persistence.bot.length, 'bot size').to.eq(0)
  })

  it('draw-giveToBot', () => {
    const deck = CardDeck.fromPersistence({
      pile: [1,2,3,4,112,5,113,6,7,8,9],
      current: [],
      discard: [],
      bot: [],
      removed: [],
      exhaustCount: 0
    })

    expect(deck.canDraw).to.true
    expect(deck.remainingTurns).to.eq(5)
    deck.draw()
    expect(deck.currentCards.map(item => item.id)).to.eql([1,2,3])
    expect(deck.currentEffects.map(item => item.id)).to.eql([])
    deck.giveToBot(deck.currentCards[1])
    expect(deck.exhaustCount).to.eq(0)

    expect(deck.canDraw).to.true
    expect(deck.remainingTurns).to.eq(4)
    deck.draw()
    expect(deck.currentCards.map(item => item.id)).to.eql([4,5,6])
    expect(deck.currentEffects.map(item => item.id)).to.eql([112,113])
    deck.removeCardFromGame(deck.currentCards[0])
    expect(deck.removed.map(item => item.id)).to.eql([4])

    expect(deck.canDraw).to.true
    expect(deck.remainingTurns).to.eq(3)
    deck.draw()
    expect(deck.currentCards.map(item => item.id)).to.eql([7,8,9])
    expect(deck.currentEffects.map(item => item.id)).to.eql([])
    deck.giveToBot(deck.currentCards[2])
    expect(deck.bot.map(item => item.id)).to.eql([2,9])

    expect(deck.canDraw).to.true
    expect(deck.remainingTurns).to.eq(2)
    deck.draw()
    expect(deck.currentCards.length).to.eql(3)
    deck.giveToBot(deck.currentCards[0])
    expect(deck.exhaustCount).to.eq(1)

    expect(deck.canDraw).to.true
    expect(deck.remainingTurns).to.eq(1)
    deck.draw()
    expect(deck.currentCards.length).to.eql(3)
    deck.giveToBot(deck.currentCards[0])

    expect(deck.canDraw).to.false
    expect(deck.remainingTurns).to.eq(0)
  })
})
