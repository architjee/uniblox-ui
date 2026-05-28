<script setup lang="ts">
import type { Analytics } from '@/types/api';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getAnalytics } from '@/services/admin';

const analytics = ref<Analytics | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await getAnalytics();
    analytics.value = data;
  }
  catch {
    toast.error('Failed to load analytics');
  }
  finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <template v-if="loading">
      <Card v-for="n in 4" :key="n">
        <CardHeader><Skeleton class="h-4 w-24" /></CardHeader>
        <CardContent><Skeleton class="h-8 w-16" /></CardContent>
      </Card>
    </template>
    <Card v-else>
      <CardHeader>
        <CardTitle class="text-sm font-medium">
          Items Purchased
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-bold">
          {{ analytics?.totalItemsPurchased }}
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle class="text-sm font-medium">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-bold">
          ₹{{ analytics?.totalRevenue }}
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle class="text-sm font-medium">
          Discount Codes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-bold">
          {{ analytics?.totalDiscountCodes }}
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle class="text-sm font-medium">
          Discount Given
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-bold">
          ₹{{ analytics?.totalDiscountGiven }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
