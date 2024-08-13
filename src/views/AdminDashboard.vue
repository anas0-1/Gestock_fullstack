<template>
  <div class="admin-dashboard flex">
    <Sidebar :username="username" @view="view = $event" />
    <div class="content flex-1">
      <Navbar />
      <div class="p-4">
        <!-- Conditionally render the UserList component based on the view state -->
        <UserList
          v-if="view === 'users'"
          :users="users"
          @refresh="fetchUsers"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/PageSidebar.vue';
import Navbar from '@/components/PageNavbar.vue';
import UserList from '@/components/UserList.vue';
import { getUsers } from '@/services/users';

export default {
  components: {
    Sidebar,
    Navbar,
    UserList
  },
  data() {
    return {
      username: localStorage.getItem('username') || 'Admin',
      view: 'users', // Default view to 'users'
      users: [], // To store user data
      selectedUser: null,
      isEditModalOpen: false,
      isDeleteModalOpen: false
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        this.users = await getUsers();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    openEditModal(user) {
      this.selectedUser = user;
      this.isEditModalOpen = true;
    },
    openDeleteModal(user) {
      this.selectedUser = user;
      this.isDeleteModalOpen = true;
    }
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
