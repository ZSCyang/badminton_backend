<template>
  <el-container class="w-full h-full home-main">
    <Menu />
    <el-container direction="vertical">
      <Header />
      <MainPages />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Menu from "./components/menu/index.vue";
import Header from "./components/header/header.vue";
import MainPages from "./components/mainPages/index.vue";
</script>
<style scoped lang="scss">

</style>
