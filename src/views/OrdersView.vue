<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getMyOrders } from '@/services/user';
import { getProducts } from '@/services/products';
import type { UserOrder, Product } from '@/types/api';
import { toast } from 'vue-sonner';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';

const orders = ref<UserOrder[]>([]);
const products = ref<Product[]>([]);
const loading = ref(true);

const productMap = computed(() => {
  const map = new Map<number, Product>();
  for (const p of products.value) {
    map.set(p.id, p);
  }
  return map;
});

onMounted(async () => {
  try {
    const [ordersRes, productsRes] = await Promise.all([getMyOrders(), getProducts()]);
    orders.value = ordersRes.data.orders;
    products.value = productsRes.data.products;
  }
  catch {
    toast.error('Failed to load orders');
  }
  finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold">My Orders</h1>

    <template v-if="loading">
      <div class="space-y-2">
        <Skeleton v-for="n in 5" :key="n" class="h-12 w-full" />
      </div>
    </template>

    <template v-else-if="orders.length === 0">
      <Empty>
        <EmptyHeader><EmptyTitle>No orders yet</EmptyTitle></EmptyHeader>
      </Empty>
    </template>

    <template v-else>
      <div class="space-y-4">
        <div v-for="order in orders" :key="order.id" class="rounded-lg border p-4">
          <div class="mb-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="font-mono text-sm text-muted-foreground">#{{ order.id }}</span>
              <Badge variant="secondary">{{ new Date(order.createdAt).toLocaleDateString() }}</Badge>
            </div>
            <div class="text-right">
              <template v-if="order.discountAmount > 0">
                <p class="text-sm text-muted-foreground line-through">₹{{ order.totalAmount + order.discountAmount }}</p>
                <p class="font-semibold">₹{{ order.totalAmount }}</p>
                <p class="text-xs text-green-600">Saved ₹{{ order.discountAmount }}</p>
              </template>
              <p v-else class="font-semibold">₹{{ order.totalAmount }}</p>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead class="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in order.items" :key="item.productId">
                <TableCell>{{ productMap.get(item.productId)?.name || `Product #${item.productId}` }}</TableCell>
                <TableCell>{{ item.quantity }}</TableCell>
                <TableCell class="text-right">₹{{ item.price }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </template>
  </div>
</template>
