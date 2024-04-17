import CampaignOption from '@/services/CampaignOption'
import CampaignOptions from '@/services/CampaignOptions'
import { State } from '@/store/state'

/**
 * Get all configured campaign options matching for the current mission.
 * @param cards Cards
 * @returns Campaign options
 */
export default function getCampaignOptions(mission: number, state: State) : CampaignOption[] {
  return state.setup.campaignOptions.map(name => CampaignOptions.get(name))
    .filter(option => option.mission == mission || !option.mission)
}
