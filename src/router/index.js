import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'; // Adjust the path as necessary
import AlumView from '@/views/AlumView.vue';
import AgricultureView from "@/views/AgricultureView.vue";

const routes = [
  {
    path: '/',           // Default route
    name: 'Home',
    component: HomeView, // The HomeView component to load for this route
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
