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
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import ScoreCalculator from '@/services/ScoreCalculator'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon
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
</style>
