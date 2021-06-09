<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 15:07:01
 * @LastEditTime: 2021-06-09 09:34:51
 * @Description:
-->

<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="back">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Error-404',
  setup() {
    const router = useRouter()
    const back = () => {
      router.replace('/')
    }
    return {
      back
    }
  },
})
</script>
