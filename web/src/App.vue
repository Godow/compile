<template>
  <div class="home-page">
    <el-select
      v-model="lang"
      @change="langChanged()"
      class="m-2"
      placeholder="Select"
      size="large"
    >
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
export default {
  data() {
    return {
      inputContent: "",
      result: "",
      // 语言列表
      langOptions: window.appConfig.langOptions,
      lang: "node", // 默认语言、选中的语言
    };
  },
  methods: {
    // 切换语言
    langChanged() {
      this.inputContent = "";
      if (this.lang === "java") {
        this.inputContent =
          'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}';
      } else if (this.lang === "cpp") {
        this.inputContent =
          '#include <iostream>\nusing namespace std;\nint main()\n{\n    cout << "Hello, world!" << endl;\n    return 0;\n}';
      } else if (this.lang === "c") {
        this.inputContent =
          '#include <stdio.h>\n \nint main()\n{\n    printf("Hello, World! \\n");\n    return 0;\n}';
      } else if (this.lang === "golang") {
        this.inputContent =
          'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}';
      }
    },
    async run() {
      if (!this.inputContent) {
        return;
      }

      axios({
        method: "post",
        url: window.appConfig.serverOrigin,
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
<style scoped>
.home-page {
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
