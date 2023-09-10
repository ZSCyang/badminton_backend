<script setup lang="ts">
import { ref, reactive,watch,defineProps,onMounted  } from "vue"
import { getDishesList, delCategory, saveCategory,saveMenu } from "@/api/cookOrderList"
import addOrEditDish  from './components/addOrEditDish.vue'
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})
const toRefId = toRef(props, "id");
const getCategoryListFn = () => {
  dishesLoading.value = true
  getDishesList({...page.value, categoryId: props.id,isServer:1}).then((res) => {
    const { data } = res
    dishesList.value = data.records
    page.value.total = data.total
    page.value.pageIndex = data.current
    page.value.pageSize = data.size

  }).finally(() => {
    dishesLoading.value = false
  })
}
onMounted(() => {
  getCategoryListFn()
})
watch(toRefId, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    getCategoryListFn()
  }
})
const dishesList = ref([])
const dishesLoading = ref(false)

const changeStatus = (row: any) => {
  let params = { ...row }
  console.log(row.status)
  params.status = row.status
  saveMenu(params).then((res) => {
    if (res.code === 0) {
      getCategoryListFn()
    }
  })
}
const editDishes = (type: string, row?:any) => {
  addOrEditDishRef.value.dishDrawerVisible = true
  addOrEditDishRef.value.categoryId = props.id
  if (type === 'add') {
    addOrEditDishRef.value.titleName = '添加菜品'
  } else if (type === 'edit') {
    addOrEditDishRef.value.titleName = '修改菜品'
    addOrEditDishRef.value.getMenuByIdFn(row.id)
  } else {
    addOrEditDishRef.value.titleName = '查看菜品'
    addOrEditDishRef.value.getMenuByIdFn(row.id)
  }
  addOrEditDishRef.value.dishId = row?.id || null
}
const handleSizeChange = (val: number) => {
  page.value.pageSize = val
  getCategoryListFn()
}
const handleCurrentChange = (val: number) => {
  page.value.pageIndex = val
  getCategoryListFn()
}
const page = ref({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
})
const visibleIt = ref<boolean>(false)
const addOrEditDishRef = ref(null)
</script>

<template>
  <div>
    <el-button type="primary"  @click="editDishes('add')" size="small" class="addBtn">添加菜品 </el-button>
    <addOrEditDish ref="addOrEditDishRef" @success="getCategoryListFn"/>
    <el-table :data="dishesList" stripe style="width: 100%" v-loading="dishesLoading" >
      <el-table-column prop="id" label="ID" width="50" fixed/>
      <el-table-column prop="name" label="菜名" width="180" fixed/>
      <el-table-column  label="参考图片" width="180" fixed>
        <template  #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.img"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column  label="上架/下架" width="120" >
        <template  #default="scope">
          <el-switch
            v-model="scope.row.status"
            size="small"
            @change="changeStatus(scope.row)"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column  label="原材料" width="180" prop="material" show-overflow-tooltip />
      <el-table-column  label="调料" width="180" prop="seasoning" show-overflow-tooltip />
      <el-table-column  label="做法步骤" width="180" prop="step" show-overflow-tooltip >
        <template  #default="scope">
          <p v-html="scope.row.step" class="tx_el"></p>
          <!-- <el-popover
            placement="right"
            width="200"
            trigger="hover"
          >
            <p v-html="scope.row.step"></p>
            <div slot="reference" class="name-wrapper">
              <p v-html="scope.row.step"></p>
            </div>
          </el-popover> -->
        </template>
      </el-table-column>
      <el-table-column  label="功效参考" width="180" prop="effect" show-overflow-tooltip />
      <el-table-column  label="制作时长" width="100" prop="cook_time"  />
      <el-table-column  label="适合人群" width="100" prop="suitable"  />
      <el-table-column  label="多少人做过" width="100" prop="someoneDo" />
      <el-table-column  label="操作" width="160" fixed="right">
        <template  #default="scope">
          <el-button type="primary" text @click="editDishes('edit',scope.row)">修改 </el-button>
          <el-button type="primary" text @click="editDishes('view',scope.row)">查看 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page.pageIndex"
      v-model:page-size="page.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      small
      layout="total,sizes, prev, pager, next"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pageBox"
    />
  </div>
</template>



<style scoped lang="scss">
  .addBtn{
    margin-bottom: 12px;
  }
  .pageBox{
    position: fixed;
    bottom: 24px;
    right: 24px;
  }
  .tx_el{
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>