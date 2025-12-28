<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core';
import { Motion } from 'motion-v';
import { computed, ref, useId, useTemplateRef } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    words?: string[];
    interval?: number;
    animationDuration?: number;
    class?: string;
    textClass?: string;
  }>(),
  {
    words: () => ['better', 'modern', 'beautiful', 'awesome'],
    interval: 3000,
    animationDuration: 700,
  },
);

const id = useId();

const currentWordIndex = ref(0);
const textRef = useTemplateRef<HTMLDivElement>('textRef');

const width = computed(() => {
  if (textRef.value) {
    return textRef.value.scrollWidth + 30;
  }
  return 100;
});

useIntervalFn(() => {
  currentWordIndex.value = (currentWordIndex.value + 1) % props.words.length;
}, props.interval);
</script>

<template>
  <Motion
    :key="words[currentWordIndex]"
    as="p"
    :layout-id="`words-here-${id}`"
    :animate="{ width }"
    :transition="{ duration: props.animationDuration / 2000 }"
    :class="
      cn(
        'relative inline-block rounded-lg pt-2 pb-3 px-4 text-center text-4xl font-bold text-black dark:text-white',
        props.class,
      )
    "
  >
    <Motion
      ref="textRef"
      as="div"
      :transition="{
        duration: animationDuration / 1000,
        ease: 'easeInOut',
      }"
      :class="cn('inline-block', props.textClass)"
      :layout-id="`word-div-${words[currentWordIndex]}-${id}`"
    >
      <Motion
        as="div"
        class="inline-block"
      >
        <Motion
          v-for="(letter, index) in words[currentWordIndex]"
          :key="index"
          as="span"
          :initial="{
            opacity: 0,
            filter: 'blur(10px)',
          }"
          :animate="{
            opacity: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            delay: index * 0.02,
          }"
        >
          {{ letter }}
        </Motion>
      </Motion>
    </Motion>
  </Motion>
</template>

<style scoped></style>
