<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        id="name"
        v-model="localUser.name"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        required
      />
    </div>
    
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="localUser.email"
        type="email"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        required
      />
    </div>
    
    <div>
      <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
      <select
        id="role"
        v-model="localUser.role"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        required
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
    
    <div class="flex justify-end">
      <button
        type="submit"
        class="py-2 px-4 bg-blue-600 text-white rounded"
      >
        Save
      </button>
      <button
        type="button"
        @click="$emit('close')"
        class="ml-4 py-2 px-4 bg-gray-200 text-gray-700 rounded"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localUser: { ...this.user }
    };
  },
  methods: {
    async submitForm() {
      try {
        await this.$emit('save', this.localUser);
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  }
};
</script>
