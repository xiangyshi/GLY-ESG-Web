import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'; 
import DataView from '@/views/DataView.vue';
import _2024View from '@/views/2024View.vue';
const routes = [
  {
    path: '/',        
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/data',
    name: "Data",
    component: DataView,
  },
  {
    path: '/2024',
    component: _2024View,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
