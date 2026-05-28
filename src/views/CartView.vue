<script setup lang="ts">
import type { CartItem, Product } from '@/types/api';
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { addToCart, checkout, getCart } from '@/services/cart';
import { getProducts } from '@/services/products';

const cartItems = ref<CartItem[]>([]);
const allProducts = ref<Product[]>([]);
const loading = ref(true);
const couponCode = ref('');
const checkoutOpen = ref(false);
const orderId = ref<number | null>(null);
const checkoutLoading = ref(false);

const productMap = computed(() => {
  const map = new Map<number, Product>();
  for (const p of allProducts.value) {
    map.set(p.id, p);
  }
  return map;
});

const total = computed(() => {
  let sum = 0;
  for (const item of cartItems.value) {
    const product = productMap.value.get(item.productId);
    if (product) {
      sum += product.price * item.quantity;
    }
  }
  return sum;
});

onMounted(async () => {
  try {
    const [cartRes, prodRes] = await Promise.all([getCart(), getProducts()]);
    cartItems.value = cartRes.data.items;
    allProducts.value = prodRes.data.products;
  }
  catch {
    toast.error('Failed to load cart');
  }
  finally {
    loading.value = false;
  }
});

async function handleQuantityChange(productId: number, delta: number) {
  const item = cartItems.value.find(i => i.productId === productId);
  if (!item)
    return;
  const newQty = Math.max(1, item.quantity + delta);
  try {
    await addToCart(productId, newQty);
    item.quantity = newQty;
  }
  catch {
    toast.error('Failed to update quantity');
  }
}

async function handleCheckout() {
  checkoutLoading.value = true;
  try {
    const { data } = await checkout(couponCode.value || undefined);
    orderId.value = data.orderId;
    cartItems.value = [];
    couponCode.value = '';
    checkoutOpen.value = false;
    toast.success(data.message);
  }
  catch (err) {
    toast.error(err?.response?.data?.error || 'Checkout failed');
  }
  finally {
    checkoutLoading.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold">
      Cart
    </h1>

    <template v-if="loading">
      <div class="space-y-4">
        <Skeleton v-for="n in 3" :key="n" class="h-20 w-full" />
      </div>
    </template>

    <template v-else-if="cartItems.length === 0 && !orderId">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyDescription>
            Browse products and add items to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button as-child>
            <router-link to="/">
              Browse Products
            </router-link>
          </Button>
        </EmptyContent>
      </Empty>
    </template>

    <template v-else-if="orderId">
      <Card>
        <CardHeader>
          <CardTitle>Order Placed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Your order <Badge variant="outline">
              #{{ orderId }}
            </Badge> has been placed successfully.
          </p>
          <Button as-child class="mt-4">
            <router-link to="/">
              Continue Shopping
            </router-link>
          </Button>
        </CardContent>
      </Card>
    </template>

    <template v-else>
      <div class="space-y-4">
        <Card v-for="item in cartItems" :key="item.productId">
          <CardContent class="flex items-center justify-between p-4">
            <div>
              <p class="font-medium">
                {{ productMap.get(item.productId)?.name || `Product #${item.productId}` }}
              </p>
              <p class="text-sm text-muted-foreground">
                ₹{{ productMap.get(item.productId)?.price }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <Button variant="outline" size="icon" @click="handleQuantityChange(item.productId, -1)">
                −
              </Button>
              <span class="w-8 text-center">{{ item.quantity }}</span>
              <Button variant="outline" size="icon" @click="handleQuantityChange(item.productId, 1)">
                +
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <Input v-model="couponCode" placeholder="Coupon code (optional)" class="max-w-xs" />
          </div>
          <div class="flex items-center justify-between">
            <p class="text-lg font-semibold">
              Total: ₹{{ total }}
            </p>
            <Button @click="checkoutOpen = true">
              Place Order
            </Button>
          </div>
        </div>
      </div>

      <Dialog v-model:open="checkoutOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Checkout</DialogTitle>
            <DialogDescription>
              Total amount: <strong>₹{{ total }}</strong>
              <span v-if="couponCode"> — Coupon: <Badge variant="outline">{{ couponCode }}</Badge></span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" @click="checkoutOpen = false">
              Cancel
            </Button>
            <Button :disabled="checkoutLoading" @click="handleCheckout">
              {{ checkoutLoading ? 'Placing Order...' : 'Confirm' }}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </template>
  </div>
</template>
