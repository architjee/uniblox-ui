<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCoupons } from '@/services/admin';
import type { Coupon } from '@/types/api';
import { toast } from 'vue-sonner';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';

const coupons = ref<Coupon[]>([]);
const loading = ref(true);

const statusVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  ACTIVE: 'default',
  USED: 'secondary',
};

onMounted(async () => {
  try {
    const { data } = await getCoupons();
    coupons.value = data.coupons;
  }
  catch {
    toast.error('Failed to load coupons');
  }
  finally {
    loading.value = false;
  }
});
</script>

<template>
  <template v-if="loading">
    <div class="space-y-2">
      <Skeleton v-for="n in 5" :key="n" class="h-10 w-full" />
    </div>
  </template>
  <template v-else-if="coupons.length === 0">
    <Empty>
      <EmptyHeader><EmptyTitle>No coupons yet</EmptyTitle></EmptyHeader>
    </Empty>
  </template>
  <template v-else>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="coupon in coupons" :key="coupon.id">
          <TableCell class="font-mono text-xs font-medium">{{ coupon.code }}</TableCell>
          <TableCell>₹{{ coupon.discount }}</TableCell>
          <TableCell>
            <Badge :variant="statusVariant[coupon.status] || 'outline'">
              {{ coupon.status }}
            </Badge>
          </TableCell>
          <TableCell>
            <span v-if="coupon.usedByOrderId" class="font-mono text-xs">#{{ coupon.usedByOrderId }}</span>
            <span v-else class="text-muted-foreground">—</span>
          </TableCell>
          <TableCell class="text-xs text-muted-foreground">{{ new Date(coupon.createdAt).toLocaleDateString() }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </template>
</template>
