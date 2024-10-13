import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'; 
import DataView from '@/views/DataView.vue';
import AlumView from '@/views/AlumView.vue';
import AgricultureView from "@/views/AgricultureView.vue";

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
    path: '/alum',
    name: 'Alum',
    component: AlumView,
  },
  {
    path: '/agriculture',
    name: 'Agriculture',
    component: AgricultureView,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
