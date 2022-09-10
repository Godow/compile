<template>
  <div>
    <div class="switch">
      <el-icon :size="25" v-if="isCollapse" @click="isCollapse = !isCollapse">
        <Grid />
      </el-icon>
      <el-icon :size="25" v-else @click="isCollapse = !isCollapse">
        <Menu />
      </el-icon>
    </div>

    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      collapse-transition
    >
      <div v-for="(item, inx) in state.langOptionList" :key="inx">
        <el-menu-item :index="String(inx)" @click="changeLang(item.value)">
          <el-icon>{{ item.value?.[0]?.toUpperCase() }}</el-icon>
          <template #title>{{ item.value }}</template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const state = reactive({
  langOptionList: [{ value: 123 }],
});

onMounted(() => {
  state.langOptionList = window.appConfig.langOptions;
});
const emit = defineEmits(["changeLang"]);
const changeLang = (lang) => {
  console.log("lang", lang);
  emit("changeLang", lang);
};
const isCollapse = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.switch {
  /* background-color: red; */
  display: inline-block;
  width: 64px;
  text-align: center;
  padding: 10px;
  /* border: 4px solid blue; */
  &:hover {
    cursor: pointer;
  }
}
</style>
