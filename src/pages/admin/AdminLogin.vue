<template>
  <div class="login-container flex-center animate-fade-in">
    <div class="login-bg-decor shadow-glow"></div>
    <div class="card login-card">
      <div class="login-header">
        <router-link to="/" class="logo-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>LocalMap Story</span>
        </router-link>
        <h2>Admin Authentication</h2>
        <p>Access your local maps workspace</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMessage" class="error-banner">
          {{ errorMessage }}
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            class="form-control" 
            v-model="email" 
            required 
            placeholder="admin@localmapstory.com"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            class="form-control" 
            v-model="password" 
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" class="btn btn-primary w-full" :disabled="loading">
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="login-footer">
        <button class="btn btn-secondary btn-sm w-full" @click="fillMockCredentials">
          Fill Demo Credentials
        </button>
        <router-link to="/" class="back-link">
          &larr; Back to Public Site
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const fillMockCredentials = () => {
  email.value = 'admin@localmapstory.com';
  password.value = 'admin123';
  errorMessage.value = '';
};

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  
  // Simulate network request
  setTimeout(() => {
    loading.value = false;
    
    // Very simple check for demo validation
    if (email.value === 'admin@localmapstory.com' && password.value === 'admin123') {
      // Set persistent auth flag
      localStorage.setItem('admin_logged_in', 'true');
      // Redirect to admin landing
      router.push('/admin');
    } else {
      errorMessage.value = 'Invalid email or password. Use demo credentials button below to fill.';
    }
  }, 800);
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  position: relative;
  background-color: var(--bg-app);
  padding: 20px;
}

.login-bg-decor {
  position: absolute;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.05) 60%, transparent 100%);
  filter: blur(50px);
  z-index: 0;
  pointer-events: none;
}

.login-card {
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 10;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.login-header {
  text-align: center;
}

.login-header .logo-text {
  justify-content: center;
  margin-bottom: 24px;
}

.login-header h2 {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.login-header p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.error-banner {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;
}

.w-full {
  width: 100%;
}

.login-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 8px;
}

.back-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.back-link:hover {
  color: var(--primary);
}
</style>
