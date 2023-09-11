<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import {  delCategory,saveCategory } from "@/api/cookOrderList"
onMounted(() => {
  // getgroupListFn()
})


const loadingCategory = ref(false)

// 用户来源

const groupList = ref([
  {
    id: 1,
    name: '第一组',
    groupName:'妈湾电力一队,深能（河源）蓄能,售电公司,服务公司'
  },
   {
    id: 1,
    name: '第一组',
    groupName:'妈湾电力一队,深能（河源）蓄能,售电公司,服务公司'
  },
   {
    id: 2,
    name: '第二组',
    groupName:'东部电厂,保定电力,燃气控股二队'
  },
   {
    id: 3,
    name: '第三组',
    groupName:'洪湾电力,置业分公司,财务公司、融资租赁公司联队'
  }
])




// const getgroupListFn = () => {
//   loadingCategory.value = true
//   delCategory({}).then((res) => {
//     const { data } = res
//     data.forEach((item: any) => {
//       item.isHover = false
//     })
//     groupList.value = data
//   }).finally(() => {
//     loadingCategory.value = false
//   })
// }

</script>

<template>
  <div class="contentBox">
    <el-table :data="groupList" stripe  v-loading="loadingCategory" >
      <el-table-column prop="id" label="ID" width="50" fixed/>
      <el-table-column prop="name" label="组名" min-width="100" fixed/>
      <el-table-column prop="groupName" label="组内队名" min-width="180" fixed/>
    </el-table>
  </div>  
</template>
<style scoped lang="scss">
.contentBox{
  display: flex;
}



</style>
