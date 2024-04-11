import { defineStore } from 'pinia'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        mission: 1,
        level: 1
      },
      turns: []
    } as State
  },
  actions: {
    resetGame() {
      this.turns = []
    },
    storeTurn(turn : Turn) {
      this.turns = this.turns.filter(item => item.turn < turn.turn)
      this.turns.push(turn)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  turns: Turn[]
}
export interface Setup {
  mission: number
  level: number
  debugMode?: boolean
}

export interface Turn {
  turn: number
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  pile: number[]
  current: number[]
  discard: number[]
  bot: number[]
}
