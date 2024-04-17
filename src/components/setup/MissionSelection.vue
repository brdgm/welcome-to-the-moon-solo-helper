<template>
  <h3 class="mt-4 mb-3">{{t('setup.missionSelection.title')}}</h3>

  <div class="row">
    <div class="col-12 col-md-6">
      <select class="form-select" v-model="state.setup.mission">
        <option v-for="mission of missions" :value="mission.mission" :key="mission.mission">
          {{t(`mission.${mission.mission}`)}}
        </option>
      </select>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Mission from '@/services/Mission'
import Missions from '@/services/Missions'

export default defineComponent({
  name: 'MissionSelection',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    missions() : Mission[] {
      return Missions.getAll()
    }
  }
})
</script>
