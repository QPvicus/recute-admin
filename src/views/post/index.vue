<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 19:59:32
 * @LastEditTime: 2021-07-13 20:50:28
 * @Description:
-->

<template>
  <a-row class="my-4" :gutter="20">
    <a-col>
      <a-input v-model:value="searchValue" />
    </a-col>
    <a-col>
      <a-button type="primary" @click="searchPost">
        <template #icon><SearchOutlined /></template>
        搜索
      </a-button>
    </a-col>
  </a-row>
  <a-table
    :columns="PostColumns"
    :dataSource="dataSource"
    :scroll="{ x: 1490 }"
    bordered
    :pagination="{
      current: page.nowPage,
      defaultPageSize: page.sumPage,
      total: page.total,
    }"
    @change="currentPageChange"
  >
    <template #classify="{ text: classify }">
      <template v-for="tag in classify.split(',')" :key="tag">
        <a-tag color="cyan" style="margin-right: 10px">{{ tag }}</a-tag>
      </template>
    </template>
    <template #safeguard="{ text: tags }">
      <template v-for="tag in tags.split(',')" :key="tag">
        <a-tag color="cyan" style="margin-right: 10px">{{ tag }}</a-tag>
      </template>
    </template>
    <template #operation="{ record }">
      <a-button
        style="margin-right: 10px"
        @click="modalVisible[record.key] = true"
        >查看</a-button
      >
      <a-modal
        v-model:visible="modalVisible[record.key]"
        centered
        @ok="modalVisible[record.key] = false"
        width="800"
      >
        <div class="flex flex-col">
          <div class="flex flex-col">
            <h class="font-extrabold text-2xl mb-2">职位描述</h>
            <p class="whitespace-pre text-base">
              {{ record.information }}
            </p>
          </div>
          <div class="flex flex-col">
            <h class="font-extrabold text-2xl mb-2">职位要求</h>
            <p class="whitespace-pre text-base">
              {{ record.demand }}
            </p>
          </div>
        </div>
      </a-modal>
      <a-popconfirm
        title="你确定要删除吗?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="onDelete(record.key)"
      >
        <a-button type="danger">删除</a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { JobDataItem, PostColumns } from './post'
import { deleteJobById, getAllJob, getJobBySearch } from '/@/api/job'
import { SearchOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'PostIndex',
  components: {
    SearchOutlined,
  },
  setup() {
    const dataSource = ref<JobDataItem[]>([])
    const router = useRouter()
    const searchValue = ref('')
    const route = useRoute()
    const modalVisible = ref({} as Record<string, boolean>)
    const page = reactive({
      nowPage: 1,
      sumPage: 6,
      total: 1,
    })
    function resetPage() {
      page.nowPage = 1
      page.sumPage = 4
    }
    const searchPost = () => {
      router
        .replace({ name: 'PostIndex', query: { q: searchValue.value } })
        .then(() => {
          resetPage()
          fetchDataBySearch()
        })
    }
    const fetchDataBySearch = async () => {
      try {
        const { data } = await getJobBySearch(
          page.nowPage,
          page.sumPage,
          searchValue.value
        )
        let list = data.message.companyPositionList
        list = list.map((li) => ({ ...li, key: li.id }))
        console.log(list, 'kust')
        page.total = data.message.cont
        dataSource.value = list
      } catch {
        message.error('接口错误')
      }
    }
    const fetchData = async () => {
      try {
        const { data } = await getAllJob(page.nowPage, page.sumPage)
        console.log(data)
        let list = data.message.companyPositionList
        list = list.map((li) => ({ ...li, key: li.id }))
        page.total = data.message.cont
        dataSource.value = list
      } catch {
        message.error('接口错误')
      }
    }
    const onDelete = async (id: string) => {
      try {
        const { data } = await deleteJobById(id)
        console.log(data)
        message.success(data.message)
        location.reload()
      } catch {
        message.error('接口错误')
      }
    }
    const currentPageChange = (index: any) => {
      // console.log(index)
      page.nowPage = index.current
      const q = route.query.q
      if (q) {
        fetchDataBySearch()
      } else {
        fetchData()
      }
    }
    onMounted(() => {
      fetchData()
    })
    return {
      PostColumns,
      onDelete,
      dataSource,
      page,
      currentPageChange,
      searchValue,
      searchPost,
      modalVisible,
    }
  },
})
</script>
