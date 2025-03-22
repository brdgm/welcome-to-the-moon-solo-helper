<template>
  <div>
    <template v-if="mission == 8 && !mission8AstraTurnCompleted">
      <div class="mt-2 d-sm-flex">
        <CardDisplay class="card" :card="permutations[0][0]" back/>
        <div class="ms-3">
          <p v-html="t('turn.mission8.astraTurn')"></p>
          <ul class="mt-3 pe-2">
            <li class="fw-bold" v-html="t('turn.mission8.planet', {value:permutations[0][0].value})"></li>
            <li v-if="isPlantOrWater(permutations[0][0])" v-html="t('turn.mission8.plantWater')"></li>
            <li v-if="isPlaningOrAstronaut(permutations[0][0])" v-html="t('turn.mission8.planningAstronaut')"></li>
            <template v-if="isRobotOrEnergy(permutations[0][0])">
              <li v-html="t('turn.mission8.robotEnergy')"></li>
              <li v-html="t('turn.mission8.robotEnergyNoBenefit')"></li>
            </template>
          </ul>
        </div>
      </div>
      <button class="btn btn-primary pickButton mt-3" @click="mission8AstraTurnCompleted = true">
        {{t('action.next')}}
      </button>
    </template>

    <template v-else>
      <div class="permutation" v-for="(cards,index) of sortedPermutations" :key="index" :data-testid="`card-permutation-${index}`">
        <div class="selection" @click="selectCards(cards)" data-bs-toggle="modal" data-bs-target="#cardSelectionModal">
          <CardDisplay class="card" :card="cards[0]" back/>
          <CardDisplay class="card" :card="cards[1]" front/>
          <button class="btn btn-primary pickButton" @click="selectCards(cards)" data-bs-toggle="modal" data-bs-target="#cardSelectionModal">
            {{t('turn.select')}}
          </button>
        </div>
        <div class="bot" v-if="cards[2]">
          <CardDisplay class="card" :card="cards[2]" back/>
          <AppIcon name="cross-out" extension="svg" class="cross-out"/>
        </div>
      </div>
    </template>
  </div>

  <ModalDialog id="cardSelectionModal" :sizeLg="true">
    <template #body>
      <div class="permutation large" v-if="selectedCards">
        <div v-for="(card,index) of selectedCards" :key="card.id" class="selection" :class="{'me-0': index==0}">
          <CardDisplay class="card" :class="{disabled:removeCard && giveToBotCardId==card.id}" :card="card" :front="index==1"/>
          <AppIcon v-if="giveToBotCardId==card.id" name="cross-out" extension="svg" class="cross-out"/>
          <div class="form-check" v-if="allowGiveBotAnyCard">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="giveToBotCard" v-model="giveToBotCardId" :value="card.id">
              <template v-if="!removeCard">{{t('turn.astra')}}</template>
            </label>
          </div>
          <div v-else>
            <template v-if="index==2 && !removeCard">{{t('turn.astra')}}</template>
            <template v-else>&nbsp;</template>
          </div>
        </div>
      </div>
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" :value="true" v-model="removeCard">
          <AppIcon name="solo-bonus" class="soloBonus"/>
          {{t('turn.useSoloBonus')}}
        </label>
      </div>
    </template>
    <template #footer>
      <button v-if="selectedCards" class="btn btn-primary" data-bs-dismiss="modal" @click="giveCardToBot()">{{t('action.ok')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/services/Card'
import getCardPermutations from '@/util/getCardPermutations'
import sortCardPermutations from '@/util/sortCardPermutations'
import CardDisplay from '../structure/CardDisplay.vue'
import AppIcon from '../structure/AppIcon.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import Action from '@/services/enum/Action'
import NavigationState from '@/util/NavigationState'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'CardSelection',
  components: {
    CardDisplay,
    AppIcon,
    ModalDialog
  },
  emits: {
    botCardSelected: (_card: Card, _remove: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      selectedCards: undefined as Card[]|undefined,
      giveToBotCardId: undefined as number|undefined,
      removeCard: false,
      mission8AstraTurnCompleted: false
    }
  },
  computed: {
    mission() : number {
      return this.navigationState.mission.mission
    },
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    },
    permutations() : Card[][] {
      return getCardPermutations([...this.cardDeck.currentCards])
    },
    sortedPermutations() : Card[][] {
      return sortCardPermutations(this.permutations)
    },
    /* Mission 6: Allow to give bot any card until event 164/index 170 was drawn */
    allowGiveBotAnyCard() : boolean {
      return (this.selectedCards?.length == 2) ||
          (this.mission == 6
          && this.navigationState.campaignOptions.find(option => option.name == 'mission-6-event-164') != undefined
          && this.cardDeck.pile.find(card => card.id == 164) != undefined)
    }
  },
  methods: {
    selectCards(selectedCards: Card[]) {
      this.selectedCards = selectedCards
      this.giveToBotCardId = selectedCards[selectedCards.length-1].id
    },
    giveCardToBot() {
      if (this.giveToBotCardId) {
        const card = this.cardDeck.currentCards.find(item => item.id == this.giveToBotCardId)
        if (card) {
          this.$emit('botCardSelected', card, this.removeCard)
        }
      }
    },
    isPlantOrWater(card: Card) {
      return card.action == Action.PLANT || card.action == Action.WATER
    },
    isPlaningOrAstronaut(card: Card) {
      return card.action == Action.PLANNING || card.action == Action.ASTRONAUT
    },
    isRobotOrEnergy(card: Card) {
      return card.action == Action.ROBOT || card.action == Action.ENERGY
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  width: 100px;
  min-width: 100px;
  max-height: 150px;
  margin-right: 3px;
  &.disabled {
    filter: grayscale(1); opacity: 0.5;
  }
  @media (max-width: 600px) {
    width: 50px;
    min-width: 50px;
    max-height: 75px;
  }
}
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
.permutation {
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 15px;
  @media (max-width: 600px) {
    margin-right: 10px;
    margin-bottom: 10px;
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
  }
  &.large {
    .card {
      width: 135px;
      min-width: 135px;
      max-height: 230px;
      @media (max-width: 600px) {
        width: 100px;
        min-width: 100px;
        max-height: 150px;
      }
    }
    .cross-out {
      left: 13px;
      top: 54px;
      width: 108px;
      @media (max-width: 600px) {
        left: 10px;
        top: 40px;
        width: 80px;
      }
    }
  }
}
.soloBonus {
  width: 1.5rem;
}
ul {
  @media (max-width: 600px) {
    font-size: small;
  }
}
</style>
