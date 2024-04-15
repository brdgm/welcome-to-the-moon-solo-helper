<template>
  <SideBar :navigationState="navigationState"/>  

  <template v-if="cardDeck.currentCards.length == 0">
    <h1>{{t(`mission.${navigationState.mission.mission}`)}} - {{t('turn.gameOver.title')}}</h1>
    <p class="mt-4 mb-5" v-html="t('turn.gameOver.info')"></p>
  </template>
  <template v-else>
    <h1 class="mb-3">{{t(`mission.${navigationState.mission.mission}`)}} - {{t('turn.title', {turn})}}</h1>
    <h3 v-if="mission8LeftRightSheet" class="mb-3">{{t(`turn.mission8Sheet.${mission8LeftRightSheet}`)}}</h3>
    <template v-if="cardDeck.currentEffects.length > 0">
      <CardEffects :currentEffects="[...cardDeck.currentEffects]" :exhaustCount="navigationState.exhaustCount" :mission="navigationState.mission.mission"/>
      <hr/>
    </template>
    <CardSelection :currentCards="[...cardDeck.currentCards]" @botCardSelected="botCardSelected"/>
  </template>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" :endGameButtonType="turn > 1 ? 'endGame' : 'abortGame'"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { Turn, useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import CardSelection from '@/components/turn/CardSelection.vue'
import DebugInfo from '@/components/turn/DebugInfo.vue'
import Card from '@/services/Card'
import CardDeck from '@/services/CardDeck'
import CardEffects from '@/components/turn/CardEffects.vue'
import SideBar from '@/components/turn/SideBar.vue'

export default defineComponent({
  name: 'PlayerTurn',
  components: {
    FooterButtons,
    CardSelection,
    CardEffects,
    SideBar,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const turn = navigationState.turn
    return { t, state, navigationState, turn }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.turn > 1) {
        return `/turn/${this.turn-1}`
      }
      else {
        return undefined
      }
    },
    mission() : number {
      return this.navigationState.mission.mission
    },
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    },
    mission8LeftRightSheet() : string|undefined {
      if (this.mission == 8) {
        return (this.turn % 2 == 0) ? 'right' : 'left'
      }
      return undefined
    }
  },
  methods: {
    botCardSelected(card : Card, remove: boolean) : void {
      if (remove) {
        this.cardDeck.removeCardFromGame(card)
      }
      else {
        this.cardDeck.giveToBot(card)
      }
      this.next()
    },
    next() : void {
      const turn : Turn = {
        turn: this.turn,
        cardDeck: this.cardDeck.toPersistence()
      }
      this.state.storeTurn(turn)
      this.$router.push(`/turn/${this.turn+1}`)
    }
  }
})
</script>
