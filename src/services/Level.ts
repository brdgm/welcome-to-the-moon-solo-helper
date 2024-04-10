import Action from "./enum/Action"

export default interface Level {
  level: number
  actions: LevelAction[]
}
export interface LevelAction {
  action: Action
  points: number
}
