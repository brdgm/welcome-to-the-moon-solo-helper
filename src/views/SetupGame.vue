<template>
  <h1>{{t('setup.title')}}</h1>

  <MissionSelection/>
  <DifficultyLevel/>
  <MissionCardSetup/>
  <CampaignOptionsSelection/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import MissionSelection from '@/components/setup/MissionSelection.vue'
import CardDeck from '@/services/CardDeck'
import CampaignOptionsSelection from '@/components/setup/CampaignOptionsSelection.vue'
import getCampaignOptions from '@/util/getCampaignOptions'
import MissionCardSetup from '@/components/setup/MissionCardSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    MissionSelection,
    DifficultyLevel,
    MissionCardSetup,
    CampaignOptionsSelection
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      const campaignOptions = getCampaignOptions(this.state.setup.mission, this.state)
      this.state.setup.initialCardDeck = CardDeck.new(campaignOptions).toPersistence()
      this.$router.push('/turn/1')
    }
  }
})
</script>
