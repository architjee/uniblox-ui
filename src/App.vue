<script setup lang="ts">
import AppNav from '@/components/AppNav.vue';
import { Toaster } from '@/components/ui/sonner';
</script>

<template>
  <div class="min-h-screen">
    <AppNav />
    <router-view />
    <Toaster />
  </div>
</template>
