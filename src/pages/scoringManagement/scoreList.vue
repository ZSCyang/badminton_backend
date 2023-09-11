<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getMatchList,addCore } from "@/api/badminton";
onMounted(() => {
  getMatchListtFn()
})
const playType = ref('1')

const loadingCategory = ref(false)

// 用户来源

const teamList = ref([])
const playTypeChange = () => {
  getMatchListtFn()
}
const getMatchListtFn = () => {
  loadingCategory.value = true
  getMatchList({kind:playType.value}).then((res) => {
    const { data } = res
    data.forEach((item: any) => {
      item.isHover = false
    })
    teamList.value = data
  }).finally(() => {
    loadingCategory.value = false
  })
}
const addCoreFn = (row:any) => {
  let params = {
    match_score_id:row.id,
    first_team_score:row.first_team_score?Number(row.first_team_score):0,
    second_team_score:row.second_team_score?Number(row.second_team_score):0,
  }
  addCore(params).then((res) => {
    if (res.code === 0) { 
      getMatchListtFn()
    }else{
      ElMessage.error(res.msg)
    }
  })

}

</script>

<template>
  <div class="contentBox">
    <el-select v-model="playType" @change="playTypeChange()">
      <el-option label="循环赛" value="1"></el-option>
      <el-option label="淘汰赛" value="2"></el-option>
    </el-select>
    <el-table :data="teamList" stripe  v-loading="loadingCategory" >
      <el-table-column prop="group" label="组别" width="60" fixed/>
      <el-table-column prop="name" label="比赛队伍" min-width="100" fixed>
        <template  #default="scope">
          <span>
            {{ `${scope.row.first_team} VS ${scope.row.second_team}` }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="final_score" label="成绩" min-width="80" fixed/>
      <el-table-column  label="分数" min-width="250" fixed>
        <template  #default="scope">
          <div v-for="(item,index) in scope.row.match_score_list" :key="index" class="scoreBox">
            <div style="width: 158px;">{{ item.rule }}:</div>
            <el-input v-model="item.first_team_score" />
            :
            <el-input v-model="item.second_team_score" />

            <el-button @click="addCoreFn(item)" style="margin-left: 24px;">提交</el-button>
          </div>
          <!-- <el-input v-model="scope.row.score" /> -->
        </template>
      </el-table-column>
    </el-table>
  </div>  
</template>
<style scoped lang="scss">
  .scoreBox{
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }



</style>
