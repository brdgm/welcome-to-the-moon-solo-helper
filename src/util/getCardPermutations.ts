import Card from "@/services/Card"

/**
 * Gets all permutations (possible order combinations) of the given cards.
 * @param cards Cards
 * @returns Permutations
 */
export default function getCardPermutations(cards : Card[]) : Card[][] {
  if (cards.length == 1) {
    return [cards]
  }
  const permutations : Card[][] = []
  for (let i = 0; i < cards.length; i++) {
    const first = cards[i]
    const rest = cards.slice(0,i).concat(cards.slice(i+1))
    const restPermutations = getCardPermutations(rest)
    for (const restPermutation of restPermutations) {
      permutations.push([first].concat(restPermutation))
    }
  }
  return permutations
}
