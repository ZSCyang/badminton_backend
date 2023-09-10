<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
// import { getgroupList, delCategory,saveCategory } from "@/api/cookOrderList";
onMounted(() => {
  // getgroupListFn()
})


const loadingCategory = ref(false)

// 用户来源

const teamList = ref([
  {
    id: 1,
    name: '妈湾电力一队',
    teamName:'张三,李四,王五'
  },
   {
    id: 1,
    name: '深能（河源）蓄能',
    teamName:'张三,李四,王五'
  },
])




// const getgroupListFn = () => {
//   loadingCategory.value = true
//   getgroupList({}).then((res) => {
//     const { data } = res
//     data.forEach((item: any) => {
//       item.isHover = false
//     })
//     teamList.value = data
//   }).finally(() => {
//     loadingCategory.value = false
//   })
// }

</script>

<template>
  <div class="contentBox">
    <el-table :data="teamList" stripe  v-loading="loadingCategory" >
      <el-table-column prop="id" label="ID" width="50" fixed/>
      <el-table-column prop="name" label="组名" min-width="100" fixed/>
      <el-table-column prop="teamName" label="组内成员" min-width="180" fixed/>
    </el-table>
  </div>  
</template>
<style scoped lang="scss">
.contentBox{
  display: flex;
}



</style>
