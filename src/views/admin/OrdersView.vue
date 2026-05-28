<script setup lang="ts">
import type { Order } from '@/types/api';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import { Button } from '@/components/ui/button';
import { Empty, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getOrders } from '@/services/admin';

const orders = ref<Order[]>([]);
const nextCursor = ref<number | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await getOrders();
    orders.value = data.orders;
    nextCursor.value = data.nextCursor;
  }
  catch {
    toast.error('Failed to load orders');
  }
  finally {
    loading.value = false;
  }
});

async function loadMore() {
  if (!nextCursor.value)
    return;
  loading.value = true;
  try {
    const { data } = await getOrders(nextCursor.value!);
    orders.value = [...orders.value, ...data.orders];
    nextCursor.value = data.nextCursor;
  }
  catch {
    toast.error('Failed to load more orders');
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <template v-if="loading && orders.length === 0">
    <div class="space-y-2">
      <Skeleton v-for="n in 5" :key="n" class="h-10 w-full" />
    </div>
  </template>
  <template v-else-if="orders.length === 0">
    <Empty>
      <EmptyHeader><EmptyTitle>No orders yet</EmptyTitle></EmptyHeader>
    </Empty>
  </template>
  <template v-else>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in orders" :key="order.id">
          <TableCell class="font-mono text-xs">
            #{{ order.id }}
          </TableCell>
          <TableCell class="font-mono text-xs">
            {{ order.userId.slice(0, 8) }}…
          </TableCell>
          <TableCell>{{ order.items.length }} item(s)</TableCell>
          <TableCell>₹{{ order.totalAmount }}</TableCell>
          <TableCell>{{ new Date(order.createdAt).toLocaleDateString() }}</TableCell>
        </TableRow>
        <TableEmpty v-if="orders.length === 0" />
      </TableBody>
    </Table>
    <div v-if="nextCursor" class="mt-4 flex justify-center">
      <Button variant="outline" :disabled="loading" @click="loadMore">
        {{ loading ? 'Loading...' : 'Load More' }}
      </Button>
    </div>
  </template>
</template>
