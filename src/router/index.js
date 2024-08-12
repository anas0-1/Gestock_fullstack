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
  { path: '/AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/UserDashboard', component: UserDashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  // Redirect to login if route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/');
  }

    // Allow access if authentication is not required or user is authenticated
    next();
});

export default router;
