import findMandatory from 'brdgm-commons/src/util/map/findMandatory'
import Card from './Card'

/**
 * Starship cards.
 */
const cards : Card[] = [
  {
    id: 1
  }
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  }

}
