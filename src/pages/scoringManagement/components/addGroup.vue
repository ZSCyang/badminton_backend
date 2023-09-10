<script setup lang="ts">
import { ref, reactive, watch, defineProps, onMounted,defineEmits } from "vue"
import { type UploadProps, type UploadUserFile, type FormRules,type FormInstance, ElMessageBox } from 'element-plus'

import { uploadImg, saveMenu, getMenuById } from "@/api/cookOrderList"
import Editor from '@/components/wanggeEdit/index.vue';
const emits = defineEmits(['success'])
const cancelClick = () => {
  isClear.value = true;
  ruleFormRef.value.resetFields()
  dishDrawerVisible.value = false
  imgList.value = []
}
const categoryId = ref(null)
const confirmClick = async(formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let params:any = {
        ...formLabelAlign,
        categoryId: categoryId.value,
      }
      params.img=imgList.value?.join(',')
      if (titleName.value === '修改菜品') { 
        params.id = dishId.value
      }
      saveMenu(params).then((res) => {
        if (res.code === 0) { 
          cancelClick()
          emits("success")
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const dishId = ref<number | null>(null)
const dishDrawerVisible = ref<boolean>(false)
const titleName = ref('')
const formLabelAlign = reactive({
  name: '',
  cookTime: '',
  effect: '',
  img: '',
  material: '',
  seasoning: '',
  someoneDo: '',
  status: 1,
  step: '',
  suitable: ''
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (index: number) => {
  ElMessageBox.confirm('此操作将删除该图片, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        imgList.value.splice(index, 1)
      })
}

const handlePictureCardPreview= (item:any) => {
  dialogImageUrl.value = item
  dialogVisible.value = true
}
const upload = (params)=>{
  //FormData是HTML5新增的js类型，用于将数据封装成"键-值"形式，
  // 以便用于发送HTTP请求。在创建FormData对象时，可以利用JS的Blob对象来封装文件流数据：
  let formData=new FormData();
  formData.append('file', params.file);
  uploadImg(formData).then((res) => {
    const { data } = res
    imgList.value.push(data) 
    ElMessage.success({
      message: '上传成功!',
    });
  })
}
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
  name: [
    { required: true, message: '请输入菜名', trigger: 'blur' }
  ],
  cookTime: [
    { required: true, message: '请输入烹饪时间', trigger: 'blur' }
  ],
  material: [
    { required: true, message: '请输入原材料', trigger: 'blur' }
  ],
  seasoning: [
    { required: true, message: '请输入调料', trigger: 'blur' }
  ],
})
const imgList = ref([])
const getMenuByIdFn = async(id: number) => {
  const res = await getMenuById({menuId:id})
  if (res.code === 0) { 
    const { data } = res
    formLabelAlign.name = data.name
    formLabelAlign.cookTime = data.cookTime
    formLabelAlign.effect = data.effect
    // formLabelAlign.img = data.img
    formLabelAlign.material = data.material
    formLabelAlign.seasoning = data.seasoning
    formLabelAlign.someoneDo = data.someoneDo
    formLabelAlign.status = data.status
    formLabelAlign.step = data.step
    detailContent.value = data.step
    editor.value.setContent(detailContent.value)
    formLabelAlign.suitable = data.suitable
    if (data.img) { 
      data.img?.split(',').map(item => { 
        imgList.value.push(item)
      })
    }
  }
}
const isClear = ref<boolean>(false);
let detailContent = ref<string>('');
const passContent = (value: string): void => {
  formLabelAlign.step = value;
}
const editor = ref(null)
defineExpose({
  dishDrawerVisible,
  titleName,
  dishId,
  categoryId,
  cancelClick,
  confirmClick,
  getMenuByIdFn
})
</script>
<template>
  <el-drawer v-model="dishDrawerVisible" :close-on-click-modal="false" :close-on-press-escape="false" :size="'55%'" :before-close="cancelClick">
    <template #header>
      <h4>{{titleName}}</h4>
    </template>
    <template #default>
      <el-form
        ref="ruleFormRef"
        :label-position="'right'"
        label-width="100px"
        :model="formLabelAlign"
        :rules="rules"
        style="max-width: 800px"
      >
      <el-form-item label="组名" prop="name">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
     
    </el-form>
  </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick(ruleFormRef)">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
.imgBox{
  display: flex;
  .imgItem{
    position: relative;
    .handleBox{
      display: none;
      width: 92%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,.5);
      .el-icon{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 5px;
      }
      .el-icon:hover{
        color: #1890ff;
      }
    }
  }
  .imgItem:hover{
    .handleBox{
      display: flex;
      align-items: center;
      justify-content: center;
      
    }
  }
}
.dishImg{
  width: 148px;
  height: 148px;
  margin-right: 12px;
}
</style>