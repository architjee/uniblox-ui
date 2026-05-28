<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleSubmit() {
  error.value = '';
  loading.value = true;
  try {
    await auth.signUp(name.value, email.value, password.value);
    toast.success('Account created successfully');
    const redirect = auth.user?.role === 'admin' ? '/admin' : '/';
    await router.push(redirect);
  }
  catch (err: any) {
    error.value = err?.response?.data?.message || 'Failed to create account';
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
        <CardTitle class="text-xl">Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input id="name" v-model="name" type="text" placeholder="Your name" required />
          </div>
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="email" type="email" placeholder="you@example.com" required />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" placeholder="••••••••" required />
          </div>
          <p v-if="error" class="text-sm text-destructive">{{ error }}</p>
          <Button type="submit" class="w-full" :disabled="loading">
            {{ loading ? 'Creating account...' : 'Sign Up' }}
          </Button>
          <p class="text-center text-sm text-muted-foreground">
            Already have an account?
            <router-link to="/login" class="underline underline-offset-4 hover:text-primary">Sign in</router-link>
          </p>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
