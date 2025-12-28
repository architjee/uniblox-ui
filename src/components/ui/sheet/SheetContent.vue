<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-vue-next';
import {
  DialogClose,
  DialogContent,

  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import SheetOverlay from './SheetOverlay.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right',
  variant: 'default',
});

const emits = defineEmits<DialogContentEmits>();

const sheetVariants = cva(
  'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
      variant: {
        default: '',
        modal: '',
      },
    },
    defaultVariants: {
      side: 'right',
      variant: 'default',
    },
    compoundVariants: [
      {
        side: 'right',
        variant: 'modal',
        class:
          'top-1/2 right-4 gap-0 h-[calc(100%-8*var(--spacing))] w-full sm:max-w-2xl max-w-[min(calc(100vw-8*var(--spacing)),theme(maxWidth.2xl))] -translate-y-1/2 rounded-sm bg-sidebar shadow-lg',
      },
    ],
  },
);

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class'];
  side?: VariantProps<typeof sheetVariants>['side'];
  variant?: VariantProps<typeof sheetVariants>['variant'];
}

const delegatedProps = computed(() => {
  const { class: _, side, variant, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <SheetOverlay />
    <DialogContent
      data-slot="sheet-content"
      :class="cn(sheetVariants({ side, variant }), props.class)"
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />

      <DialogClose
        class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <X class="size-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
