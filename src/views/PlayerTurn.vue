<template>
  <h1>{{t('turn.title', {turn})}}</h1>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" :endGameButtonType="turn > 1 ? 'endGame' : 'abortGame'"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'PlayerTurn',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const turn = navigationState.turn
    return { t, state, turn }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.turn > 1) {
        return `/turn/${this.turn-1}`
      }
      else {
        return undefined
      }
    }
  },
  methods: {
    next() : void {
      this.$router.push(`/turn/${this.turn+1}`)
    }
  }
})
</script>
