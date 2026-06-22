import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { MAP_CONFIG } from '../config/map';

// Layouts
import PublicLayout from '../layouts/PublicLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';

// Pages
import PublicArea from '../pages/public/PublicArea.vue';
import AdminDashboard from '../pages/admin/AdminDashboard.vue';
import AdminLogin from '../pages/admin/AdminLogin.vue';

const routes: Array<RouteRecordRaw> = [
  // Public Paths
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Landing',
        redirect: () => {
          const defaultArea = MAP_CONFIG.areas[MAP_CONFIG.defaultAreaSlug];
          return `/${defaultArea?.provinceCode || 'hn'}/${MAP_CONFIG.defaultAreaSlug}`;
        }
      },
      {
        path: ':provinceCode/:areaSlug',
        name: 'PublicArea',
        component: PublicArea
      }
    ]
  },
  
  // Admin Login (Independent Layout)
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },

  // Admin Dashboard Paths
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard
      },
      // Placeholder routes for project-setup
      {
        path: 'areas',
        name: 'AdminAreas',
        component: AdminDashboard // Reusing dashboard for placeholder
      }
    ]
  },

  // Fallback Catch-all Route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
