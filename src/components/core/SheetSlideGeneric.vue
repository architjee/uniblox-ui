<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import {
  SheetContent,
} from '@/components/ui/sheet';

const props = defineProps<{
  titleText?: string;
  subtitleText?: string;
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <SheetContent variant="modal" :class="props.class">
    <slot name="header">
      <div data-slot="header" class="h-15">
        <div class="h-full px-6 flex items-center">
          <div data-slot="inner-header">
            <h3 class="text-lg grow font-semibold">
              <slot name="title">
                {{ titleText }}
              </slot>
              <span class="text-base font-normal text-muted-foreground">
                <slot name="subtext" />
              </span>
            </h3>
            <div class="font-normal text-muted-foreground">
              <slot name="subtitle">
                {{ subtitleText }}
              </slot>
            </div>
          </div>
        </div>
      </div>
    </slot>
    <div data-slot="content" class="grow-0 border-y border-brand-primary h-[calc(100%-30*var(--spacing))]">
      <ScrollArea class="h-full">
        <slot name="default" />
      </ScrollArea>
    </div>
    <slot name="footer">
      <div data-slot="footer" class="h-15">
        <slot name="footerContent" />
      </div>
    </slot>
  </SheetContent>
</template>
