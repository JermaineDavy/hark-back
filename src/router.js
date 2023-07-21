import { createRouter, createWebHistory } from 'vue-router';
import GameWindow from '@/views/GameWindow.vue';
import About from '@/views/About.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameWindow
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});

export default router;
