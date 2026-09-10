import SpecialValue from '@/services/enum/SpecialValue'

export default function valueToNumber(value : number|SpecialValue) : number {
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
