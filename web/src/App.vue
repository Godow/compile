<template>
  <div class="layout">
    <div class="header">
      <div class="left">
        <img class="favicon" src="/favicon.ico" />
        <span class="title">Coding Online</span>
        <span class="version">v1.0.3</span>
      </div>
      <div class="right">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Save current content to local file"
          placement="bottom-end"
        >
          <el-icon @click="downloadToFile" class="download-to-file">
            <Download color="rgb(190,190,190)" />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
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
export default {
  components: {
    LeftMenu,
    MainCoder,
    ElMessage,
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

  .header {
    height: 40px;
    background-color: #515151;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      .favicon {
        width: 25px;
        height: 25px;
        margin-left: 15px;
      }

      .title {
        color: white;
        font-weight: 400;
        padding-left: 10px;
        font-family: Montserrat, Helvetica Neue, Helvetica, PingFang SC,
          Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
      }

      .version {
        font-size: 14px;
        color: gray;
        margin-left: 10px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      .download-to-file {
        font-size: 20px;
        margin-right: 20px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .body {
    height: calc(100vh - 40px);
    overflow: auto;
    display: flex;
    flex-direction: row;
  }
}
</style>
