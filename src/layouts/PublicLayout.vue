<template>
  <div class="app-container">
    <!-- Header -->
    <header class="glass-header">
      <div class="nav-container">
        <div class="header-left">
          <!-- Mobile Menu Drawer Toggle Button -->
          <button 
            v-if="hasDrawer" 
            class="mobile-menu-btn" 
            @click="toggleDrawer" 
            aria-label="Open landmarks list drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <router-link to="/" class="logo-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary)">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>LocalMap Story</span>
          </router-link>
        </div>

        <nav class="nav-links">
          <!-- Admin Avatar Icon Button -->
          <button @click="handleAdminClick" class="btn-avatar" aria-label="Admin Portal">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Provide mobile drawer open state to children (specifically PublicArea.vue)
const isMobileDrawerOpen = ref(false);
provide('isMobileDrawerOpen', isMobileDrawerOpen);

const hasDrawer = computed(() => route.name === 'PublicArea');

const toggleDrawer = () => {
  isMobileDrawerOpen.value = !isMobileDrawerOpen.value;
};

// Guard/check admin authentication state on click
const handleAdminClick = () => {
  const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
  if (isAdminLoggedIn) {
    router.push('/admin');
  } else {
    router.push('/admin/login');
  }
};
</script>

<style scoped>
.nav-container {
  max-width: none;
  padding: 0 12px;
  width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-menu-btn {
  display: none;
}

.nav-links {
  display: flex;
  align-items: center;
}

.btn-avatar {
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.btn-avatar:hover {
  background-color: var(--primary-light);
  color: var(--primary);
}

.footer {
  background-color: var(--bg-card);
  border-top: 1px solid var(--border-color);
  padding: 24px 20px;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.footer-content p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.footer-links {
  display: flex;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.footer-links a {
  color: var(--text-secondary);
}

.footer-links a:hover {
  color: var(--primary);
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 6px;
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
  }

  .mobile-menu-btn:hover {
    background-color: var(--primary-light);
    color: var(--primary);
  }
}
</style>
