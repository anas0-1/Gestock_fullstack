import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginPage.vue';
import Register from '../components/RegisterPage.vue';
import Home from '../components/HomePage.vue'; 

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: Home, meta: { requiresAuth: true } } // Protect routes that need authentication
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
