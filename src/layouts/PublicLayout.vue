<template>
  <div class="app-container">
    <!-- Header -->
    <header class="glass-header">
      <div class="nav-container">
        <router-link to="/" class="logo-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary)">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>LocalMap Story</span>
        </router-link>

        <nav class="nav-links">
          <router-link to="/hn/ha-noi" class="nav-link" active-class="active">
            Demo Area (Ha Noi)
          </router-link>
          <router-link to="/admin" class="btn btn-secondary btn-sm-nav">
            Admin Portal
          </router-link>
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
// Layout for public route views
</script>

<style scoped>
.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.95rem;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--primary);
  background-color: var(--primary-light);
}

.nav-link.active {
  color: var(--primary);
  background-color: var(--primary-light);
}

.btn-sm-nav {
  padding: 8px 16px;
  font-size: 0.875rem;
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

@media (max-width: 640px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 16px 20px;
    gap: 16px;
  }
  .nav-links {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
