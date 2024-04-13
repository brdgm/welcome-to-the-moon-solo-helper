<template>
  <div>
    <div class="permutation" v-for="(cards,index) of permutations" :key="index" @click="pickCard(cards[2])">
      <div class="selection">
        <CardDisplay class="card" :card="cards[0]" back/>
        <CardDisplay class="card" :card="cards[1]" front/>
        <button class="btn btn-primary pickButton" @click="pickCard(cards[2])">
          {{t('turn.select')}}
        </button>
      </div>
      <div class="bot">
        <CardDisplay class="card" :card="cards[2]" back/>
        <svg class="cross-out" version="1.1" viewBox="0 0 449.998 449.998">
          <polygon style="fill:#a00;" points="449.974,34.855 415.191,0 225.007,190.184 34.839,0 0.024,34.839 190.192,224.999 
            0.024,415.159 34.839,449.998 225.007,259.797 415.191,449.998 449.974,415.143 259.83,224.999"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/services/Card'
import getCardPermutations from '@/util/getCardPermutations'
import CardDisplay from '../structure/CardDisplay.vue'

export default defineComponent({
  name: 'CardSelection',
  components: {
    CardDisplay
  },
  emits: {
    botCardSelected: (_card: Card) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    currentCards: {
      type: Array as PropType<Card[]>,
      required: true
    }
  },
  computed: {
    permutations() : Card[][] {
      return getCardPermutations(this.currentCards)
    }
  },
  methods: {
    pickCard(card: Card) {
      this.$emit('botCardSelected', card)
    }
  }
})
</script>

<style lang="scss" scoped>
.permutation {
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 15px;
  @media (max-width: 600px) {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .card {
    width: 100px;
    margin-right:3px;
    @media (max-width: 600px) {
      width: 50px;
    }
  }
  .selection {
    display: inline-block;
    position: relative;
    margin-right: 20px;
    @media (max-width: 600px) {
      margin-right: 10px;
    }
    .pickButton {
      position: absolute;
      z-index: 100;
      top: 110px;
      left: 50%;
      transform: translate(-50%, 0);
      @media (max-width: 600px) {
        top: 45px;
        font-size: 12px;
        padding: 6px;
      }
    }
  }
  .bot {
    display: inline-block;
    position: relative;
    .cross-out {
      position: absolute;
      z-index: 100;
      left: 10px;
      top: 40px;
      width: 80px;
      @media (max-width: 600px) {
        left: 5px;
        top: 20px;
        width: 40px;
      }
    }
  }
}
</style>
