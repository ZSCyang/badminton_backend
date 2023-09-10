<script setup lang="ts">
import EmptyBlock from "./components/EmptyBlock.vue";
</script>

<template>
  <el-main>
    <router-view v-slot="{ Component, route }">
      <template v-if="!route.meta?.iframe_link">
        <Transition appear name="el-fade-in-linear">
          <EmptyBlock>
            <keep-alive>
              <component :is="Component" v-if="route.meta?.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!route.meta.keepAlive" />
          </EmptyBlock>
        </Transition>
      </template>
      <template v-else>
        <Transition appear name="el-fade-in-linear">
          <EmptyBlock>
            <iframe
              class="w-full h-full iframe"
              :src="(route.meta?.iframe_link as string)"
              frameborder="0"
            ></iframe>
          </EmptyBlock>
        </Transition>
      </template>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>

</style>
