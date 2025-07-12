<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'NotFound',
  setup() {
    onMounted(() => {
      throw new Error('صفحه مورد نظر یافت نشد')
    })

    return {}
  },
})
</script>
