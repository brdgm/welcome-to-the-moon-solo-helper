import Action from "./enum/Action"
import CampaignOptionType from "./enum/CampaignOptionType"

export default interface CampaignOption {
  name: string
  index: number
  type: CampaignOptionType
  mission?: number
  starshipCards?: number[]
  deckCards?: number[]
  deckBottomCards?: number[]
  removeCardsValue?: number[]
  removeCardsAction?: Action[]
}
