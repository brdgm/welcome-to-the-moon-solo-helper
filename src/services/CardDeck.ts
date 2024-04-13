import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import CardType from './enum/CardType'

export default class CardDeck {

  private _pile : Card[]
  private _current : Card[]
  private _discard : Card[]
  private _bot : Card[]
  private _removed : Card[]
  private _exhaustCount : number

  public constructor(pile: Card[], current: Card[], discard: Card[], bot: Card[], removed: Card[], exhaustCount: number) {
    this._pile = pile
    this._current = current
    this._discard = discard
    this._bot = bot
    this._removed = removed
    this._exhaustCount = exhaustCount
  }

  public get pile() : readonly Card[] {
    return this._pile
  }

  public get currentCards() : readonly Card[] {
    return this._current.filter(card => card.cardType != CardType.ASTRA_EFFECT)
  }

  public get currentEffects() : readonly Card[] {
    return this._current.filter(card => card.cardType == CardType.ASTRA_EFFECT)
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  public get bot() : readonly Card[] {
    return this._bot
  }

  public get removed() : readonly Card[] {
    return this._removed
  }

  public get exhaustCount() : number {
    return this._exhaustCount
  }

  public get remainingTurns() : number {
    let turns = this._pile.filter(card => card.cardType != CardType.ASTRA_EFFECT).length / 3
    if (this._exhaustCount == 0) {
      turns += (((this._pile.filter(card => card.cardType != CardType.ASTRA_EFFECT).length / 3) * 2)
           + ((this._current.filter(card => card.cardType != CardType.ASTRA_EFFECT).length / 3) * 2)
           + this._discard.filter(card => card.cardType != CardType.ASTRA_EFFECT).length) / 3
    }
    return turns
  }

  /**
   * The deck is reshuffled once, but if then the deck is empty again no further card can be drawn and the game ends.
   * @returns true if cards can be drawn
   */
  public get canDraw() : boolean {
    return this._pile.filter(card => card.cardType != CardType.ASTRA_EFFECT).length > 0 || this._exhaustCount == 0
  }

  /**
   * Draws next three card (or more if some effect cards were drawn).
   * Shuffles discard pile into pile if pile is empty.
   */
  public draw() : undefined {
    if (this._current.length > 0) {
      this._discard.push(...this._current)
      this._current = []
    }
    while (this.currentCards.length < 3) {
      this.drawSingleCard()
    }
  }

  private drawSingleCard() : undefined {
    if (this._pile.length == 0) {
      if (!this.canDraw) {
        throw new Error('No more cards to draw')
      }
      this._pile = shuffle(this._discard)
      this._discard = []
      this._exhaustCount++
    }
    const card = this._pile.shift()
    if (card) {
      this._current.push(card)
    }
  }

  /**
   * Gives one of the current cards to the but, and puts the rest into discard pile.
   * @param card Selected card
   */
  public giveToBot(card : Card) {
    const otherCards = this._current.filter(item => item.id != card.id)
    this._bot.push(card)
    this._discard.push(...otherCards)
    this._current = []
  }

  /**
   * Removed one of the current cards from the game, and puts the rest into discard pile.
   * @param card Selected card
   */
  public removeCardFromGame(card : Card) {
    const otherCards = this._current.filter(item => item.id != card.id)
    this._removed.push(card)
    this._discard.push(...otherCards)
    this._current = []
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.map(card => card.id),
      current: this._current.map(card => card.id),
      discard: this._discard.map(card => card.id),
      bot: this._bot.map(card => card.id),
      removed: this._removed.map(card => card.id),
      exhaustCount: this._exhaustCount
    }
  }

  /**
   * Creates a shuffled new card deck.
   * @param modules Modules
   */
  public static new() : CardDeck {
    // get all starship cards
    let pile = shuffle(Cards.getByType(CardType.STARSHIP))
    // split into three parts
    const part1 = pile.slice(0, 21)
    const part2 = pile.slice(21, 42)
    let part3 = pile.slice(42, 63)
    // put astra effect cards into 3rd pile
    part3.push(...Cards.getByType(CardType.ASTRA_EFFECT))
    part3 = shuffle(part3)
    // create new deck from all three parts
    pile = [...part1, ...part2, ...part3]
    return new CardDeck(pile, [], [], [], [], 0)
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.current.map(Cards.get),
      persistence.discard.map(Cards.get),
      persistence.bot.map(Cards.get),
      persistence.removed.map(Cards.get),
      persistence.exhaustCount
    )
  }

}
