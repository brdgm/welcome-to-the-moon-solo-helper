import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { MissionCardPersistence } from '@/store/state'
import MissionCardType from './enum/MissionCardType'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default class MissionCards {

  private _cards : Card[]
  private _flipped : boolean[]

  public constructor(cards: Card[], flipped: boolean[]) {
    this._cards = cards
    this._flipped = flipped
  }

  public get cards() : readonly Card[] {
    return this._cards
  }

  public isFlipped(card: Card) : boolean {
    const index = this._cards.indexOf(card)
    return this._flipped[index] ?? false
  }

  public flip(card: Card) : void {
    const index = this._cards.indexOf(card)
    if (index>=0) {
      this._flipped[index] = true
    }
  }

  /**
   * Gets persistence view of mission cards.
   */
  public toPersistence() : MissionCardPersistence[] {
    const result : MissionCardPersistence[] = []
    this._cards.forEach((card, index) => {
      result.push({
        card: card.id,
        flipped: this._flipped[index] ?? false
      })
    })
    return result
  }

  /**
   * Creates a new set of mission cards.
   * @param mission Mission number.
   */
  public static new(mission: number) : MissionCards {
    const cards = getAllEnumValues(MissionCardType)
      .map(type => shuffle(Cards.getMissionCards(mission, type)))
      .map(cardArray => cardArray[0]) // take first from each type
    return new MissionCards(cards, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : MissionCardPersistence[]) : MissionCards {
    const cards : Card[] = []
    const flipped : boolean[] = []
    persistence.forEach(item => {
      cards.push(Cards.get(item.card))
      flipped.push(item.flipped)
    })
    return new MissionCards(cards, flipped)
  }

}
