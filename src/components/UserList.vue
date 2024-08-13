<template>
    <div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="editUser(user)" class="text-blue-500 hover:text-blue-700">Edit</button>
              <button @click="deleteUser(user)" class="text-red-500 hover:text-red-700 ml-4">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Edit User Modal -->
      <PopModal v-model:modelValue="isEditModalOpen">
        <EditUserForm :user="selectedUser" @save="handleSave" @close="closeEditModal"/>
      </PopModal>
  
      <!-- Delete User Modal -->
      <PopModal v-model:modelValue="isDeleteModalOpen">
        <div>
          <p>Are you sure you want to delete {{ selectedUser.name }}?</p>
          <button @click="handleDelete" class="text-red-500 hover:text-red-700">Delete</button>
          <button @click="closeDeleteModal" class="text-gray-500 hover:text-gray-800 ml-4">Cancel</button>
        </div>
      </PopModal>
    </div>
  </template>
  
  <script>
  import PopModal from '@/components/PopModal.vue';
  import EditUserForm from '@/components/EditUserForm.vue';
  import { updateUser, deleteUser } from '@/services/users';
  
  export default {
    components: {
      PopModal,
      EditUserForm
    },
    props: {
      users: Array
    },
    data() {
      return {
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        selectedUser: null
      };
    },
    methods: {
      editUser(user) {
        this.selectedUser = user;
        this.isEditModalOpen = true;
      },
      deleteUser(user) {
        this.selectedUser = user;
        this.isDeleteModalOpen = true;
      },
      async handleSave(updatedUser) {
        try {
          await updateUser(updatedUser);
          this.$emit('refresh');
          this.isEditModalOpen = false;
        } catch (error) {
          console.error('Failed to update user:', error);
        }
      },
      async handleDelete() {
        try {
          await deleteUser(this.selectedUser.id);
          this.$emit('refresh');
          this.isDeleteModalOpen = false;
        } catch (error) {
          console.error('Failed to delete user:', error);
        }
      },
      closeEditModal() {
        this.isEditModalOpen = false;
      },
      closeDeleteModal() {
        this.isDeleteModalOpen = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  