import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import SpecialValue from '@/services/enum/SpecialValue'

/**
 * Sort permutations of cards by a) action and b) card value.
 * @param permutations Permutations
 * @returns Sorted permutations
 */
export default function sortCardPermutations(permutations : Card[][]) : Card[][] {
  return permutations.toSorted((cards, cards2) => {
    if (cards.length == 3 && cards2.length == 3) {
      const action1 = toSingleAction(cards[0].action)
      const action2 = toSingleAction(cards2[0].action)
      if (action1 != action2) {
        return actionToNumber(action1) - actionToNumber(action2)
      }
      const value1 = cards[1].value
      const value2 = cards2[1].value
      if (value1 != value2) {
        return valueToNumber(value1) - valueToNumber(value2)
      }
    }
    return 0
  })
}

function toSingleAction(action : Action|Action[]) : Action {
  if (action instanceof Array) {
    return action[0]
  }
  return action
}

function actionToNumber(action : Action) : number {
  return Object.values(Action).indexOf(action)
}

function valueToNumber(value : number|SpecialValue) : number {
  if (typeof(value) == 'number') {
    return value
  }
  switch (value) {
    case SpecialValue.N6_OR_9:
      return 6
    case SpecialValue.N8_5:
      return 8.5
    default:
      return 99
  }
}
