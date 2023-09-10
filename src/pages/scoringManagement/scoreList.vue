<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
// import { getgroupList, delCategory,saveCategory } from "@/api/cookOrderList";
onMounted(() => {
  // getgroupListFn()
})
const playType = ref('1')

const loadingCategory = ref(false)

// 用户来源

const teamList = ref([
  {
    id: 1,
    name: '妈湾电力一队VS深能（河源）蓄能',
    teamName: '男双',
    teamer:'张三，李四VS王五，赵六',
    score: '20:11',
  },
   {
    id: 2,
    name: '妈湾电力一队VS深能（河源）蓄能',
     teamName: '女双',
    teamer:'程咬金，李逵VS张飞，赵云',
    score: '20:11',
  },
])
const playTypeChange = () => {
  console.log(playType.value)
}



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
    <el-select v-model="playType" @change="playTypeChange()">
      <el-option label="循环赛" value="1"></el-option>
      <el-option label="淘汰赛" value="2"></el-option>
    </el-select>
    <el-table :data="teamList" stripe  v-loading="loadingCategory" >
      <el-table-column prop="id" label="ID" width="50" fixed/>
      <el-table-column prop="name" label="比赛队伍" min-width="100" fixed/>
      <el-table-column prop="teamName" label="形式" min-width="100" fixed/>
      <el-table-column prop="teamer" label="人员" min-width="180" fixed/>
      <el-table-column  label="分数" width="180" fixed>
        <template  #default="scope">
          <el-input v-model="scope.row.score" />
        </template>
      </el-table-column>
    </el-table>
  </div>  
</template>
<style scoped lang="scss">
  



</style>
