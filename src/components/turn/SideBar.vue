<template>
  <div class="sidebar">
    <table>
      <tbody>
        <template v-if="mission == 1">
          <tr v-for="actionScore of score.actionScores" :key="actionScore.action">
            <td><AppIcon type="action" :name="actionScore.action" class="action"/></td>
            <td class="fw-bold" :class="{lowest:actionScore.lowest,highest:actionScore.highest}">{{actionScore.points}}</td>
          </tr>
          <tr>
            <td colspan="6">
              <AppIcon v-for="(check,index) of score.mission1Dots" :key="index"
                  type="checkbox" :name="check ? 'on' : 'off'" extension="svg" class="checkbox"/>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>=</td>
            <td class="fw-bold">{{score.totalPoints}}</td>
          </tr>
          <tr v-if="score.totalPoints >= 150">
            <td colspan="6" class="fw-bold text-danger pt-2">
              {{t('turn.mission1Launch')}}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="actionScore of score.actionScores" :key="actionScore.action">
            <td><AppIcon type="action" :name="actionScore.action" class="action"/></td>
            <td class="fw-bold" :class="{lowest:actionScore.lowest,highest:actionScore.highest}">{{actionScore.points}}</td>
            <td>x</td>
            <td>{{actionScore.count}}</td>
            <td>=</td>
            <td>{{actionScore.total}}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>+</td>
            <td>{{score.fixedPoints}}</td>
          </tr>
          <tr>
            <td colspan="2">
              L{{score.level}}
            </td>
            <td>x</td>
            <td>{{score.levelMultiplier}}</td>
            <td>=</td>
            <td>{{score.levelPoints}}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>=</td>
            <td class="fw-bold">{{score.totalPoints}}</td>
          </tr>
        </template>
        <tr v-if="mission != 1 || score.totalPoints < 150">
          <td colspan="6" class="small pt-2">
            {{t('turn.turnsLeft')}} {{navigationState.cardDeck.remainingTurns}}
          </td>
        </tr>
        <tr>
          <td colspan="6" class="small">
            {{t('turn.cardsLeft')}} {{navigationState.cardDeck.pile.length}}
            <AppIcon name="shuffle" extension="svg" class="shuffle" v-if="navigationState.cardDeck.exhaustCount > 0"/>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="missionCards">
      <template v-for="card of missionCards.cards" :key="card.id">
        <a href="#" data-bs-toggle="modal" :data-bs-target="`#missionCardModal-${card.id}`">
          <CardDisplay :card="card" :front="!(missionCards.isFlipped(card) || missionCards.isAccomplished(card))" class="card" :class="{accomplished:missionCards.isAccomplished(card)}"/>
        </a>
      </template>
    </div>
  </div>

  <ModalDialog v-for="card of missionCards.cards" :key="card.id" :id="`missionCardModal-${card.id}`" :title="t('turn.missionCard.title')">
    <template #body>
      <CardDisplay :card="card" :front="!(missionCards.isFlipped(card) || missionCards.isAccomplished(card))" class="card"/>
    </template>
    <template #footer>
      <button v-if="!missionCards.isAccomplished(card)" class="btn btn-success" data-bs-dismiss="modal" @click="missionCards.accomplish(card)">{{t('turn.missionCard.accomplish')}}</button>
      <button v-if="!missionCards.isFlipped(card) && !missionCards.isAccomplished(card)" class="btn btn-secondary" data-bs-dismiss="modal" @click="missionCards.flip(card)">{{t('turn.missionCard.flip')}}</button>
      <button v-if="missionCards.isFlipped(card) || missionCards.isAccomplished(card)" class="btn btn-danger" data-bs-dismiss="modal" @click="missionCards.reset(card)">{{t('turn.missionCard.reset')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import ScoreCalculator from '@/services/ScoreCalculator'
import MissionCards from '@/services/MissionCards'
import CardDisplay from '../structure/CardDisplay.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon,
    CardDisplay,
    ModalDialog
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
  computed: {
    mission() : number {
      return this.navigationState.mission.mission
    },
    score() : ScoreCalculator {
      return new ScoreCalculator(this.navigationState.mission, this.navigationState.level,
          this.navigationState.cardDeck.bot)
    },
    missionCards() : MissionCards {
      return this.navigationState.missionCards
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  background-color: black;
  color: #bbb;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 10px;
  width: 125px;
  margin-right: -12px;
  margin-left: 2px;
  margin-bottom: 20px;
  padding-right: 10px;
  @media (max-width: 600px) {
    width: 118px;
  }
}
table {
  td:first-child {
    text-align: center;
  }
}
.action {
  width: 1.5rem;
}
.lowest {
  color: green;
}
.highest {
  color: #b00;
}
.checkbox {
  width: 0.7rem;
  margin-right: 0.1rem;
}
.shuffle {
  width: 1.2rem;
  margin-top: -0.1rem;
}
.missionCards {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.5rem;
  .card {
    width: 80px;
    cursor: pointer;
    &.accomplished {
      opacity: 0.3;
    }
    @media (max-width: 600px) {
      width: 45px;
    }
  }
}
</style>
