import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import CardType from './enum/CardType'
import CampaignOption from './CampaignOption'
import CampaignOptionType from './enum/CampaignOptionType'

export default class CardDeck {

  private _pile : Card[]
  private _current : Card[]
  private _discard : Card[]
  private _bot : Card[]
  private _removed : Card[]
  private _exhaustCount : number
  private _shuffleBackInPileOnce: number[]

  public constructor(pile: Card[], current: Card[], discard: Card[], bot: Card[], removed: Card[], exhaustCount: number, shuffleBackInPileOnce: number[]) {
    this._pile = pile
    this._current = current
    this._discard = discard
    this._bot = bot
    this._removed = removed
    this._exhaustCount = exhaustCount
    this._shuffleBackInPileOnce = shuffleBackInPileOnce
  }

  public get pile() : readonly Card[] {
    return this._pile
  }

  public get currentCards() : readonly Card[] {
    return this._current.filter(isStarship)
  }

  public get currentEffects() : readonly Card[] {
    return this._current.filter(isEffectEvent)
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
    let turns = this._pile.filter(isStarship).length / 3
    if (this._exhaustCount == 0) {
      turns += (((this._pile.filter(isStarship).length / 3) * 2)
           + ((this._current.filter(isStarship).length / 3) * 2)
           + this._discard.filter(isStarship).length) / 3
    }
    return Math.floor(turns)
  }

  /**
   * The deck is reshuffled once, but if then the deck is empty again no further card can be drawn and the game ends.
   * @returns true if cards can be drawn
   */
  public get canDraw() : boolean {
    return this._pile.filter(isStarship).length >= 3 || this._exhaustCount == 0
  }

  /**
   * Draws next three card (or more if some effect cards were drawn).
   * Shuffles discard pile into pile if pile is empty.
   */
  public draw() : undefined {
    if (this._current.length > 0) {
      this.discardCurrent()
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
    this._current = this._current.filter(item => item.id != card.id)
    this._bot.push(card)
    this.discardCurrent()
  }

  /**
   * Removed one of the current cards from the game, and puts the rest into discard pile.
   * @param card Selected card
   */
  public removeCardFromGame(card : Card) {
    this._current = this._current.filter(item => item.id != card.id)
    this._removed.push(card)
    this.discardCurrent()
  }

  /**
   * Discard all current cards. Special handling for event cards: remove them from game,
   * except some of them that are marked te be reshuffled back into the pile once.
   */
  private discardCurrent() {    
    // separate event cards
    const eventCards = this._current.filter(isEvent)
    eventCards.forEach(card => {
      if (this._shuffleBackInPileOnce.includes(card.id)) {
        this._discard.push(card)
        this._shuffleBackInPileOnce = this._shuffleBackInPileOnce.filter(id => id != card.id)
      }
      else {
        this._removed.push(card)
      }    
    })
    // discard all other cards
    this._discard.push(...this._current.filter(card => !isEvent(card)))
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
      exhaustCount: this._exhaustCount,
      shuffleBackInPileOnce: [...this._shuffleBackInPileOnce]
    }
  }

  /**
   * Creates a shuffled new card deck.
   * @param campaignOptions Campaign options to be applied
   */
  public static new(campaignOptions: CampaignOption[]) : CardDeck {
    // get all starship cards
    let pile = shuffle(Cards.getByType(CardType.STARSHIP))
    // remove blocked cards
    pile = removeBlockedStarshipCards(pile, campaignOptions)
    // add additional campaign cards
    pile = addCampaignStarshipCards(pile, campaignOptions)
    pile = shuffle(pile)
    // split into three parts
    const third = pile.length / 3
    const part1 = pile.slice(0, third)
    const part2 = pile.slice(third, third * 2)
    let part3 = pile.slice(third * 2, third * 3)
    // put astra effect cards into 3rd pile
    part3.push(...Cards.getByType(CardType.ASTRA_EFFECT))
    // put campaign parts into 3rd pile
    part3 = addCampaignEventCards(part3, campaignOptions)
    // shuffle 3rd pile
    part3 = shuffle(part3)
    // put campaign cards on bottom of 3rd pile
    part3 = addCampaignEventCardsBottom(part3, campaignOptions)
    // create new deck from all three parts
    pile = [...part1, ...part2, ...part3]
    return new CardDeck(pile, [], [], [], [], 0, getCampaignEventCardsShuffleBackInPileOnce(campaignOptions))
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
      persistence.exhaustCount,
      [...persistence.shuffleBackInPileOnce]
    )
  }

}

function isEffectEvent(card: Card) : boolean {
  return isEffect(card) || isEvent(card)
}

function isEffect(card: Card) : boolean {
  return card.cardType == CardType.ASTRA_EFFECT
}

function isEvent(card: Card) : boolean {
  return card.cardType == CardType.CAMPAIGN_EVENT
}

function isStarship(card: Card) : boolean {
  return card.cardType == CardType.STARSHIP || card.cardType == CardType.STARSHIP_CAMPAIGN
}

/**
 * Removes cards blocked either by value or action.
 */
function removeBlockedStarshipCards(pile: Card[], campaignOptions: CampaignOption[]) : Card[] {
  let result = pile
  const blockOption = campaignOptions.find(option => option.type == CampaignOptionType.BLOCK_CARDS)
  if (blockOption) {
    if (blockOption.blockCardsValue) {
      result = result.filter(card => (typeof card.value == 'number') && !blockOption.blockCardsValue?.includes(card.value))
    }
    if (blockOption.blockCardsAction) {
      const removeCards : number[] = []
      for (const blockAction of blockOption.blockCardsAction) {
        for (let i=0; i<blockAction.count; i++) {
          result.filter(card => card.action == blockAction.action && !removeCards.includes(card.id))
            .forEach(card => removeCards.push(card.id))
        }
      }
      result = result.filter(card => !removeCards.includes(card.id))
    }
  }
  return result
}

/**
 * Adds additional campaign starship cards.
 */
function addCampaignStarshipCards(pile: Card[], campaignOptions: CampaignOption[]) : Card[] {
  const result = pile
  const addOption = campaignOptions.find(option => option.type == CampaignOptionType.STARSHIP_CARD)
  if (addOption) {
    addOption.starshipCards?.forEach(id => result.push(Cards.get(id)))
  }
  return result
}

/**
 * Adds campaign event cards.
 */
function addCampaignEventCards(pile: Card[], campaignOptions: CampaignOption[]) : Card[] {
  const result = pile
  const eventOption = campaignOptions.find(option => option.type == CampaignOptionType.EVENT_CARD)
  if (eventOption) {
    result.push(...eventOption.deckCards?.map(id => Cards.get(id)) || [])
  }
  return result
}

/**
 * Adds campaign event cards at bottom of the pile.
 */
function addCampaignEventCardsBottom(pile: Card[], campaignOptions: CampaignOption[]) : Card[] {
  const result = pile
  const eventOption = campaignOptions.find(option => option.type == CampaignOptionType.EVENT_CARD)
  if (eventOption) {
    result.push(...eventOption.deckBottomCards?.map(id => Cards.get(id)) || [])
  }
  return result
}

/**
 * Get event cards that should be shuffled back into the draw pile once when drawn.
 */
function getCampaignEventCardsShuffleBackInPileOnce(campaignOptions: CampaignOption[]) : number[] {
  const eventOption = campaignOptions.find(option => option.type == CampaignOptionType.EVENT_CARD)
  if (eventOption) {
    return eventOption.deckCardsShuffleBackInPileOnce || []
  }
  return []
}
