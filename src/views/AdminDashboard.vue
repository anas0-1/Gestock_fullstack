<template>
  <div class="admin-dashboard flex">
    <Sidebar :username="username" />
    <div class="content flex-1">
      <Navbar />
      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/PageSidebar.vue';
import Navbar from '@/components/PageNavbar.vue';

export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      username: 'Admin' // Replace with dynamic username if available
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
