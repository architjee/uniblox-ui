import { cva } from 'class-variance-authority';

export { default as Progress } from './Progress.vue';

export const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-primary/20 h-2',
        neon: 'bg-primary/20 h-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const indicatorVariants = cva(
  'h-full w-full flex-1 transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        neon: 'bg-brand-primary shadow-[0_0_8px_rgba(var(--brand-primary),0.5)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
