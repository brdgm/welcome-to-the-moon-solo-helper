<template>
  <h3 class="mt-4 mb-3">{{t('setup.missionCardSetup.title')}}</h3>
  <div class="cards">
    <CardDisplay v-for="card of missionCards.cards" :key="card.id" :card="card" front class="card"/>
  </div>
  <button class="btn btn-outline-secondary btn-sm mt-2" @click="randomizeCards">{{t('setup.missionCardSetup.randomize')}}</button>
  <button class="btn btn-outline-secondary btn-sm mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#missionCardHandPickModal" @click="openHandPick">{{t('setup.missionCardSetup.choose')}}</button>

  <ModalDialog id="missionCardHandPickModal" :title="t('setup.missionCardSetup.choose')" sizeXl scrollable>
    <template #body>
      <div v-for="type of missionTypes" :key="type" class="mb-4">
        <div class="cards">
          <h5>{{type}}</h5>
          <div v-for="card of availableCards(type)" :key="card.id"
              class="cardOption" :class="{selected: handPickSelection[type] === card.id}"
              role="button" tabindex="0"
              @click="handPickSelection[type] = card.id"
              @keydown.enter.prevent="handPickSelection[type] = card.id"
              @keydown.space.prevent="handPickSelection[type] = card.id">
            <div class="cardId">
              <span>#{{card.id}}</span>
            </div>
            <CardDisplay :card="card" front class="card"/>
            <div class="cardId">
              <span v-if="card.campaign" class="campaign">{{t('setup.missionCardSetup.campaign')}}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-primary" :disabled="!handPickComplete" data-bs-dismiss="modal" @click="applyHandPick">{{t('action.ok')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore, MissionCardPersistence } from '@/store/state'
import CardDisplay from '../structure/CardDisplay.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import MissionCards from '@/services/MissionCards'
import Cards from '@/services/Cards'
import Card from '@/services/Card'
import SpecialValue from '@/services/enum/SpecialValue'
import MissionCardStatus from '@/services/enum/MissionCardStatus'

export default defineComponent({
  name: 'MissionCardSetup',
  components: {
    CardDisplay,
    ModalDialog
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
  data() {
    return {
      missionTypes: [SpecialValue.A, SpecialValue.B, SpecialValue.C],
      handPickSelection: {} as Partial<Record<SpecialValue, number>>
    }
  },
  computed: {
    missionCards() : MissionCards {
      if (this.state.setup.missionCards) {
        return MissionCards.fromPersistence(this.state.setup.missionCards)
      }
      else {
        return MissionCards.new(this.state.setup.mission)
      }
    },
    handPickComplete() : boolean {
      return this.missionTypes.every(type => this.handPickSelection[type] !== undefined)
    }
  },
  methods: {
    availableCards(type: SpecialValue) : Card[] {
      return [
        ...Cards.getMissionCards(this.state.setup.mission, type),
        ...Cards.getCampaignMissionCards(this.state.setup.mission, type)
      ]
    },
    randomizeCards() {
      this.state.setup.missionCards = MissionCards.new(this.state.setup.mission).toPersistence()
    },
    openHandPick() {
      const selection : Partial<Record<SpecialValue, number>> = {}
      for (const card of this.missionCards.cards) {
        selection[card.value as SpecialValue] = card.id
      }
      this.handPickSelection = selection
    },
    applyHandPick() {
      const missionCards : MissionCardPersistence[] = []
      for (const type of this.missionTypes) {
        const cardId = this.handPickSelection[type]
        if (cardId !== undefined) {
          missionCards.push({ card: cardId, status: MissionCardStatus.OPEN })
        }
      }
      this.state.setup.missionCards = missionCards
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
  h5 {
    margin-top: 1.75rem;
  }
}
.card {
  width: 100px;
  @media (max-width: 600px) {
    width: 75px;
  }
}
.cardOption {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 0.35rem;
  padding: 0.2rem;
  &.selected {
    border-color: var(--bs-primary);
    background-color: rgba(var(--bs-primary-rgb), 0.1);
  }
  .cardId {
    font-weight: bold;
    text-align: center;
    .campaign {
      display: block;
      font-size: 0.7rem;
      font-weight: normal;
      text-transform: uppercase;
      color: var(--bs-secondary);
    }
  }
}
</style>
