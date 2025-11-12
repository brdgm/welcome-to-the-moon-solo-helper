import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { MissionCardPersistence } from '@/store/state'
import MissionCardType from './enum/MissionCardType'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { ref } from 'vue'

export default class MissionCards {

  private readonly _cards
  private readonly _flipped

  public constructor(cards: Card[], flipped: boolean[]) {
    this._cards = ref(cards)
    this._flipped = ref(flipped)
  }

  public get cards() : readonly Card[] {
    return this._cards.value
  }

  public isFlipped(card: Card) : boolean {
    const index = this._cards.value.indexOf(card)
    return this._flipped.value[index] ?? false
  }

  public flip(card: Card) : void {
    const index = this._cards.value.indexOf(card)
    if (index>=0) {
      this._flipped.value[index] = true
    }
  }

  /**
   * Gets persistence view of mission cards.
   */
  public toPersistence() : MissionCardPersistence[] {
    const result : MissionCardPersistence[] = []
    for (const [index, card] of this._cards.value.entries()) {
      result.push({
        card: card.id,
        flipped: this._flipped.value[index] ?? false
      })
    }
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
    for (const item of persistence) {
      cards.push(Cards.get(item.card))
      flipped.push(item.flipped)
    }
    return new MissionCards(cards, flipped)
  }

}
