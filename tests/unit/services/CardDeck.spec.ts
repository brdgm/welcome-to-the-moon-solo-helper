import CampaignOptions from '@/services/CampaignOptions'
import CardDeck from '@/services/CardDeck'
import CardType from '@/services/enum/CardType'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new([])

    expect(deck.pile.length, 'pile size').to.eq(66)
    expect(deck.currentCards.length, 'current cards size').to.eq(0)
    expect(deck.currentEffects.length, 'current effects size').to.eq(0)
    expect(deck.discard.length, 'discard size').to.eq(0)
    expect(deck.bot.length, 'bot size').to.eq(0)
    expect(deck.remainingTurns, 'remaining turns').to.eq(35)

    expect(deck.pile.findIndex(item => item.cardType==CardType.ASTRA_EFFECT),
        '1st effect card in last third of pile').to.greaterThanOrEqual(42)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(66)
    expect(persistence.current.length, 'current size').to.eq(0)
    expect(persistence.discard.length, 'discard size').to.eq(0)
    expect(persistence.bot.length, 'bot size').to.eq(0)
  })

  it('new-event-mission-7-event-163-164-165', () => {
    const deck = CardDeck.new([
      CampaignOptions.get('mission-7-event-163-164-165'),
      CampaignOptions.get('starship-152-153-154'),
      CampaignOptions.get('remove-7')
    ])
    const pile = deck.pile

    expect(pile.length).to.eq(66)
    expect(deck.remainingTurns, 'remaining turns').to.eq(33)

    // event
    expect(pile[pile.length-1].id).to.eq(165) // event bottom card
    expect(pile.findIndex(card => card.id==163)).to.greaterThanOrEqual(40)
    expect(pile.findIndex(card => card.id==164)).to.greaterThanOrEqual(40)
    // additional starship cards
    expect(pile.find(card => card.id==152)).to.not.undefined
    expect(pile.find(card => card.id==153)).to.not.undefined
    expect(pile.find(card => card.id==154)).to.not.undefined
    // all 7er cards removed
    expect(pile.find(card => card.value==7)).to.undefined
  })

  it('draw-giveToBot', () => {
    const deck = CardDeck.fromPersistence({
      pile: [1,2,3,4,112,5,113,6,7,8,9],
      current: [],
      discard: [],
      bot: [],
      removed: [],
      exhaustCount: 0,
      shuffleBackInPileOnce: []
    }, [])

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

  it('drawEventCardsShuffleSomeBackInPile', () => {
    const deck = CardDeck.fromPersistence({
      pile: [1,163,2,3,4,164,112,5,113,6,7,8,9],
      current: [],
      discard: [],
      bot: [],
      removed: [],
      exhaustCount: 0,
      shuffleBackInPileOnce: [163]
    }, [])

    // draw all cards and count how many times each event card was drawn
    const drawn = new Map<number, number>()
    while (deck.canDraw) {
      deck.draw()
      deck.currentEffects
        .filter(card => card.cardType==CardType.CAMPAIGN_EVENT)
        .forEach(card => drawn.set(card.id, (drawn.get(card.id) ?? 0) + 1))
    }

    expect(drawn.get(163) == 2
      || (drawn.get(163) == 1 && deck.pile.find(card => card.id==163) != undefined)).to.true
    expect(drawn.get(164)).to.eq(1)
  })

  it('mission-4-event-162', () => {
    const deck = CardDeck.fromPersistence({
      pile: [1,2,3,4,162,5,6,7,8,9],
      current: [],
      discard: [],
      bot: [],
      removed: [],
      exhaustCount: 0,
      shuffleBackInPileOnce: [163]
    }, [CampaignOptions.get('mission-4-event-162')])

    deck.draw()
    expect(deck.currentEffects.length).to.eq(0)
    expect(deck.currentCards.length).to.eq(3)
    expect(deck.remainingTurns).to.eq(4)

    // once event 162 is drawn, only draw 2 cards onwards
    deck.draw()
    expect(deck.currentEffects.length).to.eq(1)
    expect(deck.currentCards.length).to.eq(2)
    expect(deck.remainingTurns).to.eq(5)

    deck.draw()
    expect(deck.currentEffects.length).to.eq(0)
    expect(deck.currentCards.length).to.eq(2)
    expect(deck.remainingTurns).to.eq(4)
  })
})
