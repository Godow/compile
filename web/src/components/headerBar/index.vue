<template>
  <div class="header-bar">
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
          <i class="iconfont icon-save download-to-file"></i>
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-bar",
  methods: {
    downloadToFile() {
      this.$emit("downloadToFile");
    },
  },
};
</script>

<style lang="less" scoped>
.header-bar {
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
      color: rgb(190, 190, 190);

      &:hover {
        cursor: pointer;
        color: white;
      }
    }
  }
}
</style>
