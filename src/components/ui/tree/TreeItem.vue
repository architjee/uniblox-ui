<script setup lang="ts" generic="T">
import type { TreeItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { TreeItem } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<
  TreeItemProps<T> & { hasChildren?: boolean; class?: HTMLAttributes['class'] }
>();
</script>

<template>
  <TreeItem
    v-slot="slotProps"
    :class="
      cn(
        'z-10 ps-(--tree-padding) outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
    :style="{
      '--tree-padding': `calc(${props.level - 1} * var(--tree-indent))`,
    }"
    :data-folder="props.hasChildren ?? false"
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </TreeItem>
</template>
