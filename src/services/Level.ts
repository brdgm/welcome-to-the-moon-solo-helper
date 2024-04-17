import Action from "./enum/Action"

export default interface Level {
  level: number
  name: string
  actions: LevelAction[]
}
export interface LevelAction {
  action: Action
  points: number
}
