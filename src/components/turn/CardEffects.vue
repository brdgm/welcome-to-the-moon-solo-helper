<template>
  <div v-for="card of currentEffects" :key="card.id" class="mt-2 d-sm-flex">
    <CardDisplay class="card" :card="card" front/>
    <ul class="mt-3">
      <template v-if="isEvent(card)">
        <li v-html="t('turn.applyEvent', {mission,index:getEventIndex(card)})"></li>
      </template>
      <template v-else>
        <li v-html="t('turn.applyEffect', {value:card.value})"></li>
        <li v-if="exhaustCount > 0" v-html="t('turn.accomplishMission', {value:card.value})"></li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/services/Card'
import CardDisplay from '../structure/CardDisplay.vue'
import CardType from '@/services/enum/CardType'

export default defineComponent({
  name: 'CardEffects',
  components: {
    CardDisplay
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    currentEffects: {
      type: Array as PropType<Card[]>,
      required: true
    },
    exhaustCount: {
      type: Number,
      required: true
    },
    mission: {
      type: Number,
      required: true
    }
  },
  methods: {
    isEvent(card: Card) : boolean {
      return card.cardType == CardType.CAMPAIGN_EVENT
    },
    getEventIndex(card: Card) : number|undefined {
      return card.eventIndex?.find(item => item.mission == this.mission)?.index
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  width: 100px;
  margin-right:3px;
  @media (max-width: 600px) {
    width: 50px;
  }
}
ul {
  @media (max-width: 600px) {
    font-size: small;
  }
}
</style>
