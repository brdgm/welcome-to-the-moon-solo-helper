import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { MissionCardPersistence } from '@/store/state'
import { ref } from 'vue'
import SpecialValue from './enum/SpecialValue'
import MissionCardStatus from './enum/MissionCardStatus'

export default class MissionCards {

  private readonly _cards
  private readonly _status

  public constructor(cards: Card[], status: MissionCardStatus[]) {
    this._cards = ref(cards)
    this._status = ref(status)
  }

  public get cards() : readonly Card[] {
    return this._cards.value
  }

  public isFlipped(card: Card) : boolean {
    const index = this._cards.value.indexOf(card)
    return this._status.value[index] === MissionCardStatus.FLIPPED
  }

  public isAccomplished(card: Card) : boolean {
    const index = this._cards.value.indexOf(card)
    return this._status.value[index] === MissionCardStatus.ACCOMPLISHED
  }

  public flip(card: Card) : void {
    const index = this._cards.value.indexOf(card)
    if (index>=0 && this._status.value[index] == MissionCardStatus.OPEN) {
      this._status.value[index] = MissionCardStatus.FLIPPED
    }
  }

  public accomplish(card: Card) : void {
    const index = this._cards.value.indexOf(card)
    if (index>=0) {
      this._status.value[index] = MissionCardStatus.ACCOMPLISHED
    }
  }

  public reset(card: Card) : void {
    const index = this._cards.value.indexOf(card)
    if (index>=0) {
      this._status.value[index] = MissionCardStatus.OPEN
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
        status: this._status.value[index] ?? MissionCardStatus.OPEN
      })
    }
    return result
  }

  /**
   * Creates a new set of mission cards.
   * @param mission Mission number.
   */
  public static new(mission: number) : MissionCards {
    const cards = [SpecialValue.A, SpecialValue.B, SpecialValue.C]
      .map(type => shuffle(Cards.getMissionCards(mission, type)))
      .map(cardArray => cardArray[0]) // take first from each type
    return new MissionCards(cards, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : MissionCardPersistence[]) : MissionCards {
    const cards : Card[] = []
    const status : MissionCardStatus[] = []
    for (const item of persistence) {
      cards.push(Cards.get(item.card))
      status.push(item.status)
    }
    return new MissionCards(cards, status)
  }

}
