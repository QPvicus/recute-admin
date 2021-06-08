<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-08 18:01:09
 * @LastEditTime: 2021-06-08 18:25:51
 * @Description:
-->

<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Empty } from 'ant-design-vue'
export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      const { query, params } = route
      const { path } = params
      router.replace({
        path: '/' + (Array.isArray(path) ? path.join('/') : path),
        query,
      })
    })
    return () => {
      return <Empty />
    }
  },
})
</script>
