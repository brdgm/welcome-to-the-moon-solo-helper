import CampaignOptions from '@/services/CampaignOptions'
import { expect } from 'chai'

describe('services/Levels', () => {
  it('get', () => {
    const option = CampaignOptions.get('remove-7')

    expect(option).not.undefined
    expect(option?.name).to.eq('remove-7')
  })

  it('getAll', () => {
    const options = CampaignOptions.getAll()
    expect(options.length).eq(29);
  })
})
