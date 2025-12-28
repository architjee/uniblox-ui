<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import type { ProgressRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import {
  ProgressIndicator,
  ProgressRoot,
} from 'reka-ui';
import { cn } from '@/lib/utils';
import { indicatorVariants, progressVariants } from '.';

interface Props extends ProgressRootProps {
  class?: HTMLAttributes['class'];
  variant?: VariantProps<typeof progressVariants>['variant'];
}

const props = withDefaults(
  defineProps<Props>(),
  {
    modelValue: 0,
    variant: 'default',
  },
);

const delegatedProps = reactiveOmit(props, 'class', 'variant');
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    v-bind="delegatedProps"
    :class="cn(progressVariants({ variant: props.variant }), props.class)"
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      :class="cn(indicatorVariants({ variant: props.variant }))"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
