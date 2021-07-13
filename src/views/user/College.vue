<!--
 * @Author: Taylor Swift
 * @Date: 2021-06-06 19:50:05
 * @LastEditTime: 2021-07-13 15:26:46
 * @Description:
-->

<template>
  <a-table
    :columns="StudentColumns"
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
import { StudentColumns, StudentDataItem } from './user'
import { deleteStudentById, getAllStudent } from '/@/api/user'

export default defineComponent({
  setup() {
    const dataSource = ref<StudentDataItem[]>([])
    const page = reactive({
      nowPage: 1,
      sumPage: 6,
      total: 30,
    })
    const fetchStudentData = async () => {
      try {
        const { data } = await getAllStudent(page.nowPage, page.sumPage)
        console.log(data)
        let list = data.message.studentUserList as StudentDataItem[]
        if (list.length > 0) {
          list = list.map((li) => ({ ...li, key: li.id }))
          dataSource.value = list
          page.total = data.message.cont
        }
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
        const { data } = await deleteStudentById(id)
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
      StudentColumns,
      onDelete,
      page,
      currentPageChange,
    }
  },
})
</script>

<style lang="less" scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
