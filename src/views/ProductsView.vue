<script setup lang="ts">
import type { Product } from '@/types/api';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { addToCart } from '@/services/cart';
import { getProducts } from '@/services/products';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
const products = ref<Product[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await getProducts();
    products.value = data.products;
  }
  catch {
    toast.error('Failed to load products');
  }
  finally {
    loading.value = false;
  }
});

async function handleAdd(productId: number) {
  if (!auth.user) {
    toast.error('Please sign in to add items to cart');
    return;
  }
  try {
    await addToCart(productId, 1);
    toast.success('Added to cart');
  }
  catch {
    toast.error('Failed to add item');
  }
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold">
      Products
    </h1>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <template v-if="loading">
        <Card v-for="n in 8" :key="n">
          <CardContent class="p-4">
            <Skeleton class="mb-2 h-4 w-3/4" />
            <Skeleton class="h-4 w-1/2" />
          </CardContent>
          <CardFooter class="p-4 pt-0">
            <Skeleton class="h-10 w-full" />
          </CardFooter>
        </Card>
      </template>
      <Card v-for="product in products" :key="product.id" class="flex flex-col">
        <CardContent class="flex-1 p-4">
          <h3 class="mb-2 font-semibold">
            {{ product.name }}
          </h3>
          <div class="flex items-center gap-2">
            <Badge variant="secondary">
              ₹{{ product.price }}
            </Badge>
            <span class="text-xs text-muted-foreground">{{ product.quantity }} in stock</span>
          </div>
        </CardContent>
        <CardFooter class="p-4 pt-0">
          <Button class="w-full" @click="handleAdd(product.id)">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
