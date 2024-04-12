<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <ul class="debug">
      <li>pile: {{getCardsInfo(navigationState.cardDeck.pile)}}</li>
      <li>current: {{getCardsInfo(navigationState.cardDeck.currentCards)}}, {{getCardsInfo(navigationState.cardDeck.currentEffects)}}</li>
      <li>bot: {{getCardsInfo(navigationState.cardDeck.bot)}}</li>
      <li>discard: {{getCardsInfo(navigationState.cardDeck.discard)}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Card from '@/services/Card'

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
