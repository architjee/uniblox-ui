<script setup lang="ts">
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_MASK,
  PATTERN_BACKGROUND_VARIANT,
} from '@/components/ui/pattern-background';
import PatternBackground from '@/components/ui/pattern-background/PatternBackground.vue';
</script>

<template>
  <div data-slot="private-canvas-layout" class="min-h-screen min-w-screen">
    <PatternBackground
      :direction="PATTERN_BACKGROUND_DIRECTION.TopRight" :variant="PATTERN_BACKGROUND_VARIANT.Dot"
      :mask="PATTERN_BACKGROUND_MASK.FullCover" size="md" class="flex -z-1 absolute inset-0 items-center justify-center"
    />
    <slot />
  </div>
</template>
