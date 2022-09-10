<template>
  <div class="home-page">
    <!-- <el-select
      v-model="lang"
      @change="langChanged()"
      class="m-2"
      placeholder="Select"
      size="mini"
    >
      <el-option
        v-for="item in langOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select> -->

    <Codemirror
      class="code-input"
      v-model:value="inputContent"
      :options="cmOptions"
      border
      placeholder="test placeholder"
      @change="codeInputChange"
    />

    <el-input
      class="result-output"
      v-model="result"
      resize="none"
      :autosize="{ minRows: 6, maxRows: 10 }"
      type="textarea"
      readonly
      placeholder="Your running result will be here ❤"
    />

    <div @click="run()" class="run">Run</div>
  </div>
</template>

<script>
import Codemirror from "codemirror-editor-vue3";
import axios from "axios";
import { ElMessage } from "element-plus";

// language 语法高亮
import "/codemirror/mode/javascript/javascript.js"; // js
import "/codemirror/mode/clike/clike.js"; // c c++ java
import "/codemirror/mode/go/go.js"; // go
import "/codemirror/mode/shell/shell.js"; // shell

// theme
import "/codemirror/theme/panda-syntax.css";

// web\codemirror\mode\javascript\javascript.js

// import { ref } from "vue";

export default {
  components: { Codemirror, ElMessage },
  props: ["lang"],
  data() {
    return {
      inputContent: "",
      result: "",
      // 语言列表
      langOptions: window.appConfig.langOptions,
      // lang: "node", // 默认语言、选中的语言
      coder: "",
      cmOptions: {
        mode: "javascript", // 语言模式
        theme: "panda-syntax", // 主题
        lineNumbers: true, // 显示行号
        smartIndent: true, // 智能缩进
        indentUnit: 2, // 智能缩进单位为4个空格长度
        foldGutter: true, // 启用行槽中的代码折叠
        styleActiveLine: true, // 显示选中行的样式
      },
    };
  },
  watch: {
    lang() {
      this.langChanged();
    },
  },
  methods: {
    codeInputChange(inputContent) {
      this.inputContent = inputContent;
    },
    // 切换语言
    langChanged() {
      this.inputContent = "";
      if (this.lang === "java") {
        this.inputContent =
          '// pleash don\'t change the top class name\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java !");\n    }\n}';
      } else if (this.lang === "cpp") {
        this.inputContent =
          '#include <iostream>\nusing namespace std;\nint main()\n{\n    cout << "Hello, C++ !" << endl;\n    return 0;\n}';
      } else if (this.lang === "c") {
        this.inputContent =
          '#include <stdio.h>\n \nint main()\n{\n    printf("Hello, C ! \\n");\n    return 0;\n}';
      } else if (this.lang === "golang") {
        this.inputContent =
          'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, golang !")\n}';
      }
    },
    async run() {
      if (!this.inputContent) {
        ElMessage("There is no code to execute here");
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
<style scoped lang="less">
.home-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .code-input {
    font-size: 15px;
    flex: 1;
  }
  .run {
    position: absolute;
    right: 30px;
    bottom: 150px;
    width: 80px;
    height: 80px;
    background-color: #409efc;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    font-size: 30px;
    line-height: 80px;
    text-align: center;

    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
