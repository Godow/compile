<template>
  <div class="layout">
    <header-bar></header-bar>
    <div class="body">
      <LeftMenu @changeLang="changeLang"></LeftMenu>
      <MainCoder ref="coder" :lang="lang"></MainCoder>
    </div>
  </div>
</template>

<script>
import LeftMenu from "./components/LeftMenu.vue";
import MainCoder from "./components/MainCoder/index.vue";
import { ElMessage } from "element-plus";
import { saveAs } from "file-saver";
import { langMapFile } from "@/config/langMapFile.js";
import headerBar from "./components/headerBar/index.vue";
export default {
  components: {
    LeftMenu,
    MainCoder,
    ElMessage,
    headerBar,
  },
  data() {
    return {
      lang: window.appConfig.langOptions[0].value, // 编程语言，默认编程语言
    };
  },
  methods: {
    // 变更编程语言
    changeLang(lang) {
      this.lang = lang;
    },
    // 添加到收藏夹
    downloadToFile() {
      const content = this.$refs.coder.inputContent;
      if (/^\s*$/.test(content)) {
        ElMessage("There is no content need to save");
      } else {
        const fileName = langMapFile.get(this.lang) || `${this.lang}.txt`;
        const blob = new Blob([content]);
        saveAs(blob, fileName);
      }
    },
  },
};
</script>

<style scoped lang="less">
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  user-select: none;

  header-bar {
    height: 40px;
  }

  .body {
    height: calc(100vh - 40px);
    overflow: auto;
    display: flex;
    flex-direction: row;
  }
}
</style>
