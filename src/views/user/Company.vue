<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 19:51:12
 * @LastEditTime: 2021-07-13 15:27:48
 * @Description:
-->

<template>
  <a-table
    :columns="CompanyUserColumns"
    :data-source="dataSource"
    :pagination="{
      current: page.nowPage,
      defaultPageSize: page.sumPage,
      total: page.total,
    }"
    @change="currentPageChange"
    bordered
  >
    <template #operation="{ record }">
      <a-popconfirm
        title="你确定要删除吗?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="onDelete(record.key)"
      >
        <a-button>删除</a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { CompanyUserColumns, CompanyUserDataItem } from './user'
import { deleteCompanyUserById, getAllCompanyList } from '/@/api/user'
export default defineComponent({
  name: 'Company',
  setup() {
    const dataSource = ref<CompanyUserDataItem[]>([])
    const page = reactive({
      nowPage: 1,
      sumPage: 6,
      total: 1,
    })
    const fetchStudentData = async () => {
      try {
        const { data } = await getAllCompanyList(page.nowPage, page.sumPage)
        console.log(data)
        let list = data.message.companyUserList as CompanyUserDataItem[]
        if (list.length > 0) {
          list = list.map((li) => ({ ...li, key: li.id }))
          dataSource.value = list
          page.total = data.message.cont
        }
        console.log(dataSource.value)
      } catch {
        message.error('接口错误')
      }
    }
    const currentPageChange = (payload: any) => {
      page.nowPage = payload.current
      fetchStudentData()
    }
    const onDelete = async (id: string) => {
      try {
        const { data } = await deleteCompanyUserById(id)
        message.success(data.message)
        location.reload()
      } catch {
        message.error('接口错误')
      }
    }
    onMounted(() => {
      fetchStudentData()
    })
    return {
      dataSource,
      CompanyUserColumns,
      editingKey: '',
      onDelete,
      page,
      currentPageChange,
    }
  },
})
</script>
