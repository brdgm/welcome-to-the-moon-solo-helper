<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <ul class="debug">
      <li>pile: {{getCardsInfo(cardDeck.pile)}}</li>
      <li>current: {{getCardsInfo(cardDeck.currentCards)}}, {{getCardsInfo(cardDeck.currentEffects)}}</li>
      <li>bot: {{getCardsInfo(cardDeck.bot)}}</li>
      <li>discard: {{getCardsInfo(cardDeck.discard)}}</li>
      <li>removed: {{getCardsInfo(cardDeck.removed)}}</li>
      <li>exhaustCount: {{cardDeck.exhaustCount}}, remainingTurns: {{cardDeck.remainingTurns}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Card from '@/services/Card'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    }
  },
  methods: {
    getCardsInfo(cards: readonly Card[]) : string {
      return '[' + cards.map(card => `${card.action}/${card.value}`).join(', ') + ']'
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
