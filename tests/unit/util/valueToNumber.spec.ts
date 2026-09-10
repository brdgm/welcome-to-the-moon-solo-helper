import SpecialValue from '@/services/enum/SpecialValue'
import valueToNumber from '@/util/valueToNumber'
import { expect } from 'chai'

describe('util/valueToNumber', () => {
  it('number value', () => {
    expect(valueToNumber(5)).to.eq(5)
  })

  it('SpecialValue.N6_OR_9', () => {
    expect(valueToNumber(SpecialValue.N6_OR_9)).to.eq(6)
  })

  it('SpecialValue.N8_5', () => {
    expect(valueToNumber(SpecialValue.N8_5)).to.eq(8.5)
  })

  it('other special value', () => {
    expect(valueToNumber(SpecialValue.A)).to.eq(99)
  })
})
