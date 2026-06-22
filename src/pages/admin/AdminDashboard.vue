<template>
  <div class="admin-dashboard animate-fade-in">
    <!-- Header -->
    <div class="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p class="subtitle">Welcome back! Manage your story map areas and locations.</p>
      </div>
      <button class="btn btn-primary" @click="createNewArea">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        New Area
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="card stat-card">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div>
          <span class="stat-label">Total Areas</span>
          <h3 class="stat-value">1</h3>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon icon-places">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
        </div>
        <div>
          <span class="stat-label">Total Places</span>
          <h3 class="stat-value">4</h3>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon icon-routes">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
        </div>
        <div>
          <span class="stat-label">Curated Routes</span>
          <h3 class="stat-value">0</h3>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon icon-media">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </div>
        <div>
          <span class="stat-label">Storage Usage</span>
          <h3 class="stat-value">1.2 MB / 50 MB</h3>
        </div>
      </div>
    </div>

    <!-- Table of Areas -->
    <div class="card table-card">
      <div class="table-header">
        <h2>Your Story Areas</h2>
        <div class="search-box">
          <input type="text" class="form-control form-control-sm" placeholder="Search areas..." />
        </div>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Area Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Places</th>
              <th>Routes</th>
              <th class="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="area in areas" :key="area.id">
              <td class="area-name-cell">
                <span class="area-icon">📍</span>
                <div>
                  <strong>{{ area.name }}</strong>
                  <p class="area-desc-short">{{ area.desc }}</p>
                </div>
              </td>
              <td><code>/{{ area.provinceCode || 'hn' }}/{{ area.slug }}</code></td>
              <td>
                <span class="badge-status" :class="area.status">
                  {{ area.status === 'published' ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td>{{ area.placesCount }}</td>
              <td>{{ area.routesCount }}</td>
              <td class="actions-cell">
                <router-link :to="`/${area.provinceCode || 'hn'}/${area.slug}`" class="btn btn-secondary btn-sm" target="_blank">
                  View
                </router-link>
                <button class="btn btn-secondary btn-sm" @click="editArea(area)">
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteArea(area)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const areas = ref([
  {
    id: 1,
    name: 'Hà Nội',
    slug: 'ha-noi',
    provinceCode: 'hn',
    desc: 'Bản đồ khám phá văn hóa lịch sử, ẩm thực Phố cổ Hà Nội.',
    status: 'published',
    placesCount: 4,
    routesCount: 0
  }
]);

const createNewArea = () => {
  alert('Simulating creating a new area...');
};

const editArea = (area: any) => {
  alert(`Editing Area: ${area.name}`);
};

const deleteArea = (area: any) => {
  if (confirm(`Are you sure you want to delete ${area.name}?`)) {
    alert('Simulating delete...');
  }
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.dashboard-header h1 {
  font-size: 2.2rem;
  margin-bottom: 4px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background-color: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.icon-places {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.stat-icon.icon-routes {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.stat-icon.icon-media {
  background-color: rgba(168, 85, 247, 0.1);
  color: var(--secondary);
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 2px;
}

.table-card {
  padding: 0;
  overflow: hidden;
}

.table-header {
  padding: 24px 32px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.form-control-sm {
  padding: 8px 12px;
  font-size: 0.875rem;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th, 
.data-table td {
  padding: 18px 32px;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.95rem;
}

.data-table th {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--text-secondary);
  background-color: var(--bg-app);
}

.area-name-cell {
  display: flex;
  align-items: center;
  gap: 16px;
}

.area-icon {
  font-size: 1.5rem;
}

.area-desc-short {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 400;
  margin-top: 2px;
}

.badge-status {
  display: inline-flex;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.badge-status.published {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.badge-status.draft {
  background-color: var(--border-color);
  color: var(--text-secondary);
}

.actions-header {
  text-align: right;
}

.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .table-header {
    padding: 16px 20px;
  }
  .data-table th, 
  .data-table td {
    padding: 12px 20px;
  }
}
</style>
