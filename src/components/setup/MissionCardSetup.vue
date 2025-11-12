<template>
  <h3 class="mt-4 mb-3">{{t('setup.missionCardSetup.title')}}</h3>
  <div class="cards">
    <CardDisplay v-for="card of missionCards.cards" :key="card.id" :card="card" front class="card"/>
  </div>
  <button class="btn btn-outline-secondary btn-sm mt-2" @click="randomizeCards">{{t('setup.missionCardSetup.randomize')}}</button>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CardDisplay from '../structure/CardDisplay.vue'
import MissionCards from '@/services/MissionCards'

export default defineComponent({
  name: 'MissionCardSetup',
  components: {
    CardDisplay
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    watch(
      () => state.setup.mission,
      () => {
        state.setup.missionCards = MissionCards.new(state.setup.mission).toPersistence()
      }
    )

    return { t, state }
  },
  computed: {
    missionCards() : MissionCards {
      if (this.state.setup.missionCards) {
        return MissionCards.fromPersistence(this.state.setup.missionCards)
      }
      else {
        return MissionCards.new(this.state.setup.mission)
      }
    }
  },
  methods: {
    randomizeCards() {
      this.state.setup.missionCards = MissionCards.new(this.state.setup.mission).toPersistence()
    }
  },
  mounted() {
    this.state.setup.missionCards = MissionCards.new(this.state.setup.mission).toPersistence()
  },
})
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.card {
  width: 100px;
}
</style>
