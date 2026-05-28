<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleSubmit() {
  error.value = '';
  loading.value = true;
  try {
    await auth.signIn(email.value, password.value);
    const redirect = (route.query.redirect as string) || (auth.user?.role === 'admin' ? '/admin' : '/');
    toast.success('Signed in successfully');
    await router.push(redirect);
  }
  catch (err) {
    error.value = err?.response?.data?.message || 'Invalid email or password';
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center px-4">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">
          Sign In
        </CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="email" type="email" placeholder="test@test.com" required />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" placeholder="••••••••" required />
          </div>
          <p v-if="error" class="text-sm text-destructive">
            {{ error }}
          </p>
          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </Button>
          <p class="text-center text-sm text-muted-foreground">
            Don't have an account?
            <router-link to="/signup" class="underline underline-offset-4 hover:text-primary">Sign up</router-link>
          </p>
        </form>
      </CardContent>
      <div class="border-t px-6 py-3">
        <p class="mb-2 text-xs text-muted-foreground">Autofill creds for-</p>
        <div class="flex gap-2">
          <Button type="button" variant="outline" size="sm" class="flex-1 text-xs"
            @click="email='test@test.com'; password='Test@123'">
            Test User
          </Button>
          <Button type="button" variant="destructive" size="sm" class="flex-1 text-xs"
            @click="email='admintest@test.com'; password='Test@123'">
            Admin
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>
