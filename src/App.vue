<script setup lang="ts">
import { onMounted } from 'vue';
import AppNav from '@/components/AppNav.vue';
import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();

onMounted(() => {
  auth.checkSession();
});
</script>

<template>
  <div class="min-h-screen">
    <AppNav />
    <router-view />
    <Toaster />
  </div>
</template>
