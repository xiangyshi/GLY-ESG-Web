import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'; 
import DataView from '@/views/DataView.vue';
import AlumView from '@/views/AlumView.vue';
import AgricultureView from "@/views/AgricultureView.vue";
import DigitalView from "@/views/DigitalView.vue";
import FinancialView from "@/views/FinancialView.vue";
import ComparisonView from "@/views/ComparisonView.vue";
import Financial2023View from "@/views/benchmarks/financial/Financial2023View.vue";
import Financial2024View from "@/views/benchmarks/financial/Financial2024View.vue";

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
  },
  {
    path: '/digital',
    name: 'Digital',
    component: DigitalView,
  },
  {
    path: '/financial',
    name: 'Financial',
    component: FinancialView,
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: ComparisonView,
  },
  {
    path: '/financial/2023',
    name: 'Financial2023',
    component: Financial2023View,
  },
  {
    path: '/financial/2024',
    name: 'Financial2024',
    component: Financial2024View,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
