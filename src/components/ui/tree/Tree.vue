<script setup lang="ts" generic="T extends Record<string, any>">
import type { TreeRootEmits, TreeRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TreeRoot, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<
    TreeRootProps<T> & {
      indent?: number;
      class?: HTMLAttributes['class'];
    }
  >(),
  { indent: 20 },
);
const emits = defineEmits<TreeRootEmits>();
const delegatedProps = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <TreeRoot
    v-slot="slotProps"
    data-slot="tree"
    :style="{
      '--tree-indent': `${props.indent}px`,
    }"
    :class="cn('flex flex-col', props.class)"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </TreeRoot>
</template>
