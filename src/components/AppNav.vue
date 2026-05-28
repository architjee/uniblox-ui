<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
const router = useRouter();

const cartCount = computed(() => 0);

async function handleSignOut() {
  await auth.signOut();
  await router.push('/');
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
      <router-link to="/" class="font-semibold text-lg">
        Uniblox
      </router-link>

      <NavigationMenu class="flex-1">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <router-link to="/" class="text-sm">
                Products
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem v-if="auth.user">
            <NavigationMenuLink as-child>
              <router-link to="/cart" class="text-sm">
                Cart
                <Badge v-if="cartCount > 0" variant="secondary" class="ml-1">
                  {{ cartCount }}
                </Badge>
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem v-if="auth.user">
            <NavigationMenuLink as-child>
              <router-link to="/orders" class="text-sm">Orders</router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem v-if="auth.user?.role === 'admin'">
            <NavigationMenuLink as-child>
              <router-link to="/admin" class="text-sm">
                Admin
              </router-link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div class="flex items-center gap-2">
        <template v-if="auth.user">
          <span class="text-sm text-muted-foreground">{{ auth.user.name }}</span>
          <Button variant="outline" size="sm" @click="handleSignOut">
            Sign Out
          </Button>
        </template>
        <template v-else>
          <Button variant="outline" size="sm" as-child>
            <router-link to="/login">
              Sign In
            </router-link>
          </Button>
        </template>
      </div>
    </div>
  </header>
</template>
