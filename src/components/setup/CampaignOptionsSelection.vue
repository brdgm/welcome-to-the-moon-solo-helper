<template>
  <h3 class="mt-4 mb-3">{{t('setup.campaignOptions.title')}}</h3>

  <div class="mb-1" v-if="!show && !showInitially">
    <button class="btn btn-sm btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#campaignOptionSelection" aria-expanded="false" aria-controls="campaignOptionSelection" @click="show=true">
      {{t('setup.campaignOptions.show')}}
    </button>
  </div>
  <div :class="{collapse:!showInitially}" id="campaignOptionSelection">
    <p class="fst-italic text-muted" v-html="t('setup.campaignOptions.intro')"></p>
    <div class="row" v-for="campaignOptionType of campaignOptionTypes" :key="campaignOptionType">
      <h5>{{t(`setup.campaignOptions.type.${campaignOptionType}.title`)}}</h5>
      <div class="col mb-2">
        <div class="form-check form-switch" v-for="item of campaignOptions.filter(option => option.type == campaignOptionType)" :key="item.name">
          <input class="form-check-input" type="checkbox" :id="`option-${item.name}`" :checked="hasCampaignOption(item)" @input="toggleCampaignOption(item)">
          <label class="form-check-label" :for="`option-${item.name}`">
            <span class="fw-bold">&lt;{{item.index}}&gt; </span>
            <span v-html="optionTitle(item)"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import toggleArrayItem from 'brdgm-commons/src/util/array/toggleArrayItem'
import CampaignOption from '@/services/CampaignOption'
import CampaignOptions from '@/services/CampaignOptions'
import CampaignOptionType from '@/services/enum/CampaignOptionType'

export default defineComponent({
  name: 'CampaignOptionsSelection',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const showInitially = state.setup.campaignOptions.length > 0
    return { t, state, showInitially }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    campaignOptionTypes() : CampaignOptionType[] {
      return Object.values(CampaignOptionType)
    },
    campaignOptions() : CampaignOption[] {
      return CampaignOptions.getAll()
          .filter(option => option.mission == this.state.setup.mission || !option.mission)
    }
  },
  methods: {
    hasCampaignOption(campaignOption : CampaignOption) : boolean {
      return this.state.setup.campaignOptions.includes(campaignOption.name)
    },
    toggleCampaignOption(campaignOption : CampaignOption) {
      // for each type of campaign option only one can be selected
      this.state.setup.campaignOptions = this.state.setup.campaignOptions.filter(name => {
        const option = CampaignOptions.get(name)
        return option.type != campaignOption.type || option.name == campaignOption.name
      })
      toggleArrayItem(this.state.setup.campaignOptions, campaignOption.name)
    },
    optionTitle(option : CampaignOption) : string {
      switch (option.type) {
        case CampaignOptionType.EVENT_CARD: {
          const cards = [...(option.deckCards ?? []), ...(option.deckBottomCards ?? [])]
          return this.t(`setup.campaignOptions.type.${option.type}.option`,
            {index:option.index,mission:option.mission,value:cards.join(', ')},cards.length)
        }
        case CampaignOptionType.STARSHIP_CARD: {
          return this.t(`setup.campaignOptions.type.${option.type}.option`,
              {index:option.index,value:option.starshipCards?.join(', ')})
        }
        case CampaignOptionType.BLOCK_CARDS: {
          if (option.blockCardsValue) {
            return this.t(`setup.campaignOptions.type.${option.type}.optionBlockValue`,
              {index:option.index,value:option.blockCardsValue?.join(', ')},option.blockCardsValue?.length)
          }
          else {
            const block1 = (option.blockCardsAction ?? [])[0]
            const block2 = (option.blockCardsAction ?? [])[1]
            return this.t(`setup.campaignOptions.type.${option.type}.optionBlockAction`,
              {index:option.index,
                action1:this.t(`starshipAction.${block1?.action}`),count1:block1?.count,
                action2:this.t(`starshipAction.${block2?.action}`),count2:block2?.count})
          }
        }
      }
    }
  }
})
</script>
