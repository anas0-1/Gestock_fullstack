import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginPage.vue';
import Register from '../views/RegisterPage.vue';
import Home from '../views/HomePage.vue';
import AdminDashboard from '../views/AdminDashboard.vue'; // Import the AdminDashboard component
import UserDashboard from '../views/UserDashboard.vue'; // Import the UserDashboard component

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/user', component: UserDashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole'); // Retrieve the stored role

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/');
  }

  if (to.meta.requiresAdmin && userRole !== 'admin') {
    return next('/'); // Redirect to a suitable route if not admin
  }

  next();
});

export default router;
