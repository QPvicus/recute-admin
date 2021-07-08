<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-27 10:57:31
 * @LastEditTime: 2021-07-08 13:26:43
 * @Description:
-->

<template>
  <CompanyTable :list="companyList" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import CompanyTable from './components/company-table.vue'
import { companyColumn, CompanyDataItem } from './companyTable'
import { getCompanyList } from '/@/api/company'
import { message } from 'ant-design-vue'
export default defineComponent({
  name: 'CompanyManagerView',
  components: {
    CompanyTable,
  },
  setup() {
    const page = reactive({
      nowPage: 1,
      sumPage: 6,
    })
    const companyList = ref<CompanyDataItem[]>([])
    const fetchData = async () => {
      try {
        const { data } = await getCompanyList(page.nowPage, page.sumPage)
        companyList.value = data.message.companyInformationList.map((item) => ({
          ...item,
          key: item.id,
        }))
      } catch {
        message.error('接口错误')
      }
    }
    onMounted(() => {
      fetchData()
    })
    return {
      companyColumn,
      companyList,
    }
  },
})
</script>
