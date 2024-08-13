<template>
  <transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    }
  }
}
</script>
