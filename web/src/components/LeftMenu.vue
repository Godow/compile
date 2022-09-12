<template>
  <div class="left-menu">
    <div class="switch">
      <el-icon
        :size="18"
        color="#fff"
        v-if="isCollapse"
        @click="isCollapse = !isCollapse"
      >
        <Grid />
      </el-icon>
      <el-icon :size="18" color="#fff" v-else @click="isCollapse = !isCollapse">
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
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
    >
      <div v-for="(item, inx) in state.langOptionList" :key="inx">
        <el-menu-item :index="String(inx)" @click="changeLang(item.value)">
          <template v-if="item.icon">
            <i class="iconfont" :class="item.icon"></i>
          </template>
          <template v-else>
            <el-icon>{{ item.value?.[0]?.toUpperCase() }}</el-icon>
          </template>
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
  langOptionList: [],
});

onMounted(() => {
  state.langOptionList = window.appConfig.langOptions;
});
const emit = defineEmits(["changeLang"]);
const changeLang = (lang) => {
  emit("changeLang", lang);
};
const isCollapse = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
</script>

<style scoped lang="less">
.el-menu-vertical-demo {
  border: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 130px;
}

.left-menu {
  height: 100%;
  background-color: #545c64;
  .switch {
    display: inline-block;
    width: 56px;
    text-align: center;
    padding: 10px;
    &:hover {
      cursor: pointer;
    }
  }

  .iconfont {
    font-size: 17px;
    margin-right: 10px;
  }
}
</style>
