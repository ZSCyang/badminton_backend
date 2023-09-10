
<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import i18nService from "./hooks/useI18n";
import { useUserStore } from "@/stores/useUser";
import useLoading from "@/hooks/useLoading"
const { showLoading,hideLoading } = useLoading
const locale = computed(() => {
  return i18nService.locale.value === "zh-CN" ? zhCn : en;
});
const route = useRoute();
console.log(route);
watchEffect(() => {
  // handleBreadcrumb(route.matched);
  useUserStore().setBreadcrumb(route.matched);
});
showLoading()
nextTick(() => { 
  hideLoading()
})
</script>

<template>
  <el-config-provider :locale="locale" v-cloak />
  <div class="h-full min-w-mobile">
    <router-view />
  </div>
  <el-config-provider />
</template>
