<script setup lang="ts">
import type { Reward } from '@/types/api';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Empty, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { generateCoupon, getRewards } from '@/services/admin';

const rewards = ref<Reward[]>([]);
const loading = ref(true);
const couponCode = ref('');
const couponOpen = ref(false);

const statusVariant: Record<string, 'secondary' | 'default' | 'destructive'> = {
  PENDING: 'secondary',
  APPROVED: 'default',
  REJECTED: 'destructive',
};

onMounted(async () => {
  try {
    const { data } = await getRewards();
    rewards.value = data.rewards;
  }
  catch {
    toast.error('Failed to load rewards');
  }
  finally {
    loading.value = false;
  }
});

async function handleGenerate(rewardId: number) {
  try {
    const { data } = await generateCoupon(rewardId);
    couponCode.value = data.couponCode;
    couponOpen.value = true;
    const idx = rewards.value.findIndex(r => r.id === rewardId);
    if (idx !== -1)
      rewards.value[idx].status = 'APPROVED';
  }
  catch (err) {
    toast.error(err?.response?.data?.error || 'Failed to generate coupon');
  }
}
</script>

<template>
  <template v-if="loading && rewards.length === 0">
    <div class="space-y-2">
      <Skeleton v-for="n in 5" :key="n" class="h-10 w-full" />
    </div>
  </template>
  <template v-else-if="rewards.length === 0">
    <Empty>
      <EmptyHeader><EmptyTitle>No rewards yet</EmptyTitle></EmptyHeader>
    </Empty>
  </template>
  <template v-else>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="reward in rewards" :key="reward.id">
          <TableCell class="font-mono text-xs">
            #{{ reward.id }}
          </TableCell>
          <TableCell class="font-mono text-xs">
            #{{ reward.orderId }}
          </TableCell>
          <TableCell>₹{{ reward.discount }}</TableCell>
          <TableCell>
            <Badge :variant="statusVariant[reward.status] || 'secondary'">
              {{ reward.status }}
            </Badge>
          </TableCell>
          <TableCell>
            <Button
              v-if="reward.status === 'PENDING'"
              size="sm"
              @click="handleGenerate(reward.id)"
            >
              Generate Coupon
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </template>

  <Dialog v-model:open="couponOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Coupon Generated</DialogTitle>
        <DialogDescription>
          Coupon code: <Badge variant="outline" class="ml-1 text-base">
            {{ couponCode }}
          </Badge>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
