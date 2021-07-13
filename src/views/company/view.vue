<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-27 10:57:31
 * @LastEditTime: 2021-07-13 19:30:52
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
  <CompanyTable
    :list="companyList"
    v-model:current="page.nowPage"
    :total="page.total"
    :defaultPageSize="page.sumPage"
    @change="currentPageChange"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import CompanyTable from './components/company-table.vue'
import { companyColumn, CompanyDataItem } from './companyTable'
import { getCompanyList, queryCompanyListBySearch } from '/@/api/company'
import { message } from 'ant-design-vue'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'CompanyManagerView',
  components: {
    CompanyTable,
    SearchOutlined,
    PlusOutlined,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const searchValue = ref('')
    const companyList = ref<CompanyDataItem[]>([])
    const page = reactive({
      nowPage: 1,
      sumPage: 4,
      total: 30,
    })
    function resetPage() {
      page.nowPage = 1
      page.sumPage = 4
    }
    const fetchData = async () => {
      try {
        const { data } = await getCompanyList(page.nowPage, page.sumPage)
        companyList.value = data.message.companyInformationList.map((item) => ({
          ...item,
          key: item.id,
        }))
        page.total = data.message.cont
      } catch {
        message.error('接口错误')
      }
    }
    const fetchDataBySearch = () => {
      queryCompanyListBySearch(searchValue.value, page.nowPage, page.sumPage)
        .then((res) => {
          console.log(res, 'queryCompanyListBySearch')
          companyList.value = res.data.message.companyInformationList.map(
            (item) => ({
              ...item,
              key: item.id,
            })
          )
        })
        .catch(() => {
          message.error('接口错误')
        })
    }
    const currentPageChange = (event: any) => {
      console.log(event.current)
      page.nowPage = event.current
      const q = route.query.q
      if (q) {
        fetchDataBySearch()
      } else {
        fetchData()
      }
    }
    // 搜索
    const searchPost = () => {
      router
        .replace({
          name: 'CompanyManagerView',
          query: {
            q: searchValue.value,
          },
        })
        .then(() => {
          resetPage()
          fetchDataBySearch()
        })
    }
    const addCompany = () => {
      router.push({
        name: 'CompanyManagerEdit',
      })
    }
    onMounted(() => {
      fetchData()
    })
    return {
      companyColumn,
      companyList,
      searchValue,
      addCompany,
      searchPost,
      page,
      currentPageChange,
    }
  },
})
</script>
