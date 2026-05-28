<script setup lang="ts">
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <h1 class="mb-6 text-3xl font-bold">
      Admin Panel
    </h1>

    <NavigationMenu class="mb-8">
      <NavigationMenuList class="gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink as-child>
            <router-link to="/admin" class="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent" exact-active-class="bg-accent font-medium">
              Analytics
            </router-link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink as-child>
            <router-link to="/admin/orders" class="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent" exact-active-class="bg-accent font-medium">
              Orders
            </router-link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink as-child>
            <router-link to="/admin/rewards" class="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent" exact-active-class="bg-accent font-medium">
              Rewards
            </router-link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <router-view />
  </div>
</template>
