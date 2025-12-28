<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
  containerClass?: string;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="cn(
      'relative w-full aspect-video bg-zinc-900 rounded-lg border border-white/10 shadow-2xl overflow-visible group',
      containerClass,
    )"
  >
    <!-- Browser Header -->
    <div class="absolute top-0 w-full rounded-t-lg h-8 bg-zinc-800 border-b border-white/5 flex items-center px-4 space-x-2 z-20">
      <div class="w-2 h-2 rounded-full bg-red-500" />
      <div class="w-2 h-2 rounded-full bg-yellow-500" />
      <div class="w-2 h-2 rounded-full bg-green-500" />
    </div>

    <!-- Content Slot -->
    <div
      :class="cn(
        'w-full h-full flex items-center justify-center transition duration-700 pt-8',
        $props.class,
      )"
    >
      <slot />
    </div>
  </div>
</template>
