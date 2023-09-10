<script setup lang="ts">
import routerServe from "@/hooks/useRouter";
import { useI18n } from "vue-i18n";
import { MenuProps } from "@/types";
const { t } = useI18n();

const props = defineProps({
  subMenu: {
    type: Array as () => Array<MenuProps>,
  },
});

function handleMenuClick(cmenu: any) {
  routerServe.linkPage(cmenu);
}
</script>

<template>
  <!-- {{ props.subMenu }} -->
  <template v-for="(menu, index) of props.subMenu" :key="menu.path">
    <template v-if="!menu.hidden">
      <el-sub-menu v-if="menu.children" :key="index" :index="menu.path!">
        <template #title>
          <el-icon v-if="menu.meta.icon"
            ><component :is="menu.meta.icon"
          /></el-icon>
          <span>{{ t(menu.meta.title!) }}</span>
        </template>
        <menu-item :sub-menu="menu.children" />
      </el-sub-menu>
      <template v-else>
        <el-menu-item
          :key="menu.path"
          :index="menu.path!"
          @click="handleMenuClick(menu)"
        >
          <el-icon v-if="menu.meta.icon"
            ><component :is="menu.meta.icon"
          /></el-icon>
          <span>{{ t(menu.meta.title) }}</span>
        </el-menu-item>
      </template>
    </template>
  </template>
</template>
