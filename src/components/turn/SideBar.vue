<template>
  <div class="sidebar">
    <table>
      <tbody>
        <tr v-for="action of actions" :key="action">
          <td><AppIcon type="action" :name="action" class="action"/></td>
          <td class="fw-bold" :class="{lowest:isLowest(action),highest:isHighest(action)}">{{getActionPoints(action)}}</td>
          <td>x</td>
          <td>{{getActionCards(action)}}</td>
          <td>=</td>
          <td>{{getActionPoints(action) * getActionCards(action)}}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>+</td>
          <td>{{mission.fixedPoints}}</td>
        </tr>
        <tr>
          <td colspan="2">
            L{{level.level}}
          </td>
          <td>x</td>
          <td>{{mission.levelMultiplier}}</td>
          <td>=</td>
          <td>{{level.level * mission.levelMultiplier}}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>=</td>
          <td class="fw-bold">{{total}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Action from '@/services/enum/Action'
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import Level from '@/services/Level'
import Mission from '@/services/Mission'

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
    actions() : Action[] {
      return [Action.ROBOT,Action.ENERGY,Action.PLANT,Action.WATER,Action.ASTRONAUT,Action.PLANNING]
    },
    mission() : Mission {
      return this.navigationState.mission
    },
    level() : Level {
      return this.navigationState.level
    },
    total() : number {
      return this.actions.reduce((acc,action) => acc + this.getActionPoints(action) * this.getActionCards(action), 0)
          + this.mission.fixedPoints
          + this.level.level * this.mission.levelMultiplier
    }
  },
  methods: {
    getActionPoints(action: Action) : number {
      return this.level.actions.find(item => item.action == action)?.points ?? 0
    },
    getActionCards(action: Action) : number {
      return this.navigationState.cardDeck.bot.filter(item => item.action == action || item.action.includes(action)).length
    },
    isLowest(action: Action) : boolean {
      const points = this.getActionPoints(action)
      return this.level.actions.filter(item => item.points < points).length == 0
          && this.level.actions.filter(item => item.points == points).length == 1
    },
    isHighest(action: Action) : boolean {
      const points = this.getActionPoints(action)
      return this.level.actions.filter(item => item.points > points).length == 0      
          && this.level.actions.filter(item => item.points == points).length == 1
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
  width: 120px;
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
</style>
