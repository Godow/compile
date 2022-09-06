<template>
  <div>
    <el-input
      v-model="inputContent"
      :autosize="{ minRows: 10, maxRows: 20 }"
      type="textarea"
      placeholder="Please input"
    />
    <el-button @click="run()"> RUN </el-button>
    <el-input
      v-model="result"
      :autosize="{ minRows: 10, maxRows: 20 }"
      type="textarea"
      disabled
      placeholder="执行结果"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputContent: "",
      result: "",
    };
  },
  methods: {
    run() {
      axios({
        method: "post",
        url: "http://localhost:3000",
        data: {
          lang: "node",
          inputContent: this.inputContent,
        },
      }).then((res) => {
        this.result = res.toString();
      });
    },
  },
};
</script>
<style scoped></style>
