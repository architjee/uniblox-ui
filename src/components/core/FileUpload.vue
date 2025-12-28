<script setup lang="ts">
import type { FileMetadata, FileWithPreview } from '@/composables/useFileUpload';
import {
  LucideAlertCircle,
  LucideFileUp,
  LucideX,
} from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { formatBytes, useFileUpload } from '@/composables/useFileUpload';
import { cn } from '@/lib/utils';
import { getFileIcon } from './getFileIconService';

const props = withDefaults(defineProps<{
  accept?: string;
  frozen?: boolean;
}>(), {
  accept: '*',
  frozen: false,
});

const emits = defineEmits<{
  (e: 'filesChanged', files: FileWithPreview[]): void;
}>();

const initialFiles: FileMetadata[] = [];

const maxSize = 2 * 1024 * 1024 * 1024; // 100MB default
const maxFiles = 10;

const {
  files,
  errors,
  openFileDialog,
  removeFile,
  clearFiles,
  dropzoneRef,
  inputRef,
} = useFileUpload({
  multiple: true,
  maxFiles,
  maxSize,
  initialFiles,
  accept: props.accept,
  onFilesChange: (files: FileWithPreview[]) => {
    emits('filesChanged', files);
  },
});

const extraFileMetaState = ref<Record<string, {
  uploaded: number;
  removable: boolean;
}>>({});

function setExtraMetaForFile(fileName: string, meta: { uploaded: number; removable: boolean }) {
  extraFileMetaState.value[fileName] = meta;
}

console.warn('Adding console in FileUpload cause vue isn\'t able to resolve ref usages', inputRef, dropzoneRef);

defineExpose({
  files,
  setExtraMetaForFile,
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Drop area -->
    <div
      ref="dropzoneRef"
      role="button"
      class="border-2 hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-50 flex-col items-center justify-center rounded-xl border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
      @click="openFileDialog"
    >
      <input ref="inputRef" aria-label="Upload files">

      <div class="flex flex-col items-center justify-center text-center">
        <div
          class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <LucideFileUp class="size-4 opacity-60" />
        </div>
        <p class="mb-1.5 text-base font-medium">
          Upload files
        </p>
        <p class="text-muted-foreground mb-2 text-sm">
          Drag & drop or click to browse
        </p>
        <div
          class="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs"
        >
          <span>All files</span>
          <span>∙</span>
          <span>Max {{ maxFiles }} files</span>
          <span>∙</span>
          <span>Up to {{ formatBytes(maxSize) }}</span>
        </div>
      </div>
    </div>

    <div
      v-if="errors.length > 0"
      class="text-destructive flex items-center gap-1 text-xs"
      role="alert"
    >
      <LucideAlertCircle class="size-3 shrink-0" />
      <span>{{ errors[0] }}</span>
    </div>

    <!-- File list -->
    <div v-if="files.length > 0" class="space-y-2">
      <div
        v-for="file in files"
        :key="file.id"
        :class="cn('bg-background z-0 flex items-center justify-between gap-2 overflow-clip rounded-lg relative border p-2 pe-3')"
      >
        <div
          v-if="extraFileMetaState[file.file.name]?.uploaded" class="absolute inset-0 -z-1 transition-transform duration-100 ease-in-out bg-brand-primary/30 origin-left" :style="{
            transform: `scaleX(${extraFileMetaState[file.file.name]?.uploaded})`,
          }"
        />
        <div class="flex items-center gap-3">
          <div
            class="flex aspect-square size-10 shrink-0 items-center justify-center rounded border"
          >
            <component :is="getFileIcon(file)" class="size-4 opacity-60" />
          </div>
          <div class="flex min-w-0 flex-col gap-0.5">
            <p class="truncate text-[13px] font-medium">
              {{ file.file.name }}
            </p>
            <p class="text-muted-foreground text-xs">
              {{ formatBytes(file.file.size) }}
            </p>
          </div>
        </div>

        <Button
          v-if="extraFileMetaState[file.file.name]?.removable !== false"
          size="icon"
          variant="ghost"
          class="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
          aria-label="Remove file"
          @click=" removeFile(file.id)"
        >
          <LucideX class="size-4" aria-hidden="true" />
        </Button>
      </div>

      <!-- Remove all files button -->
      <div v-if="files.length > 1 && !props.frozen">
        <Button size="sm" variant="outline" @click="clearFiles">
          Remove all files
        </Button>
      </div>
    </div>
  </div>
</template>
