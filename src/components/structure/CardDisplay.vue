<template>
  <div class="cardWrapper">
    <div class="cardImage" :style="{
      'background-image': `url(${imageUrl})`,
      'background-position': `calc(${spriteIndexX} * 100%/9) calc(${spriteIndexY} * 100%/6)`
    }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '@/services/Card'

export default defineComponent({
  name: 'CardDisplay',
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true
    },
    front: {
      type: Boolean,
      required: false
    },
    back: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    imageUrl() : string {
      let suffix = 'front'
      if (this.back || !this.front) {
        suffix = 'back'
      }
      return new URL(`/src/assets/cards/${this.card.sprite}-${suffix}.jpg`, import.meta.url).toString()
    },
    spriteIndexX() : number {
      return this.card.spriteIndex % 10
    },
    spriteIndexY() : number {
      return (this.card.spriteIndex-this.spriteIndexX) / 10
    }
  }
})
</script>

<style lang="scss" scoped>
.cardWrapper {
  display: inline-block;
  width: 200px;
  height: auto;
  aspect-ratio: calc(3878/10) / calc(4096/7);
}
.cardImage {
  width: 100%;
  height: 100%;
  background-size: 1000%;
  background-repeat: no-repeat;
}
</style>
