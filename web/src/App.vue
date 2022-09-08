<template>
  <div>
    <el-select v-model="lang" class="m-2" placeholder="Select" size="large">
      <el-option
        v-for="item in langOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-input
      v-model="inputContent"
      :autosize="{ minRows: 10, maxRows: 20 }"
      type="textarea"
      placeholder="Please input your code at here ..."
    />
    <el-button @click="run()"> RUN </el-button>

    <el-input
      v-model="result"
      :autosize="{ minRows: 10, maxRows: 20 }"
      type="textarea"
      disabled
      placeholder="Your running result will be here ❤"
    />
  </div>
</template>

<script>
import axios from "axios";
import config from "../public/config.json";
export default {
  data() {
    return {
      inputContent: "",
      result: "",
      // 语言列表
      langOptions: [
        {
          value: "node",
          label: "node",
        },
      ],
      lang: "node", // 默认语言、选中的语言
    };
  },
  methods: {
    getConfig() {
      return new URL(`../public/server.json`, import.meta.url);
    },
    run() {
      if (!this.inputContent) {
        return;
      }

      axios({
        method: "post",
        url: config.serverOrigin,
        data: {
          lang: this.lang,
          inputContent: this.inputContent,
        },
      }).then((res) => {
        this.result = res.data;
      });
    },
  },
};
</script>
<style scoped></style>
