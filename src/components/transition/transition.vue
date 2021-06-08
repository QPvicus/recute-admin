<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-08 15:38:18
 * @LastEditTime: 2021-06-08 18:21:34
 * @Description: 重定向  带有动画效果
-->

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RouterTransiiton',
  setup() {},
})
</script>
