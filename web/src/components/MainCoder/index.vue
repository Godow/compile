<template>
  <div class="home-page">
    <Codemirror
      class="code-input"
      v-model:value="inputContent"
      :options="cmOptions"
      @change="codeInputChange"
    />

    <div class="division" @mousedown="mousedown" />

    <Codemirror
      class="code-output"
      v-model:value="result"
      :options="outputOptions"
    />

    <div class="run-btn-wrapper">
      <VueDraggableResizable
        :isActive="true"
        :h="80"
        :w="80"
        :parentLimitation="false"
        :isResizable="false"
      >
        <div @click="run()" class="run">Run</div>
      </VueDraggableResizable>
    </div>
  </div>
</template>

<script>
import Codemirror from "codemirror-editor-vue3";
import axios from "axios";
import { ElMessage } from "element-plus";
import { codemirrorConfig } from "@/config/codemirrorConfig.js";
// import VueDragResize from "vue-drag-resize";
// 可选择导入默认样式
// import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import VueDraggableResizable from "vue-draggable-resizable/src/components/vue-draggable-resizable.vue";

// codemirror基础样式
// import "@/lib/codemirror/lib/codemirror.css";

// language 语法高亮
import "@/lib/codemirror/mode/javascript/javascript.js"; // js
import "@/lib/codemirror/mode/clike/clike.js"; // c c++ java
import "@/lib/codemirror/mode/go/go.js"; // go
import "@/lib/codemirror/mode/shell/shell.js"; // shell

// theme
import "@/lib/codemirror/theme/panda-syntax.css";
import "@/lib/codemirror/theme/oceanic-next.css";

// 支持使用Sublime快捷键
import "@/lib/codemirror/keymap/sublime.js";

// 搜索功能的依赖
import "@/lib/codemirror/addon/dialog/dialog.js";
import "@/lib/codemirror/addon/dialog/dialog.css";
// 支持搜索功能
import "@/lib/codemirror/addon/search/search";
import "@/lib/codemirror/addon/search/searchcursor.js";

// 支持各种代码折叠
import "@/lib/codemirror/addon/fold/foldgutter.css";
import "@/lib/codemirror/addon/fold/foldcode.js";
import "@/lib/codemirror/addon/fold/foldgutter.js";
import "@/lib/codemirror/addon/fold/brace-fold.js";
import "@/lib/codemirror/addon/fold/comment-fold.js";

// 支持代码区域全屏功能
import "@/lib/codemirror/addon/display/fullscreen.css";
import "@/lib/codemirror/addon/display/fullscreen.js";

// 支持代码自动补全
import "@/lib/codemirror/addon/hint/show-hint.css";
import "@/lib/codemirror/addon/hint/show-hint.js";
import "@/lib/codemirror/addon/hint/anyword-hint.js";

// 行注释
import "@/lib/codemirror/addon/comment/comment.js";

//括号匹配
import "@/lib/codemirror/addon/edit/matchbrackets.js";
import "@/lib/codemirror/addon/edit/closebrackets.js";

// import "@/lib/codemirror/addon/hint/show-hint.css"; // 自动补全
// import "@/lib/codemirror/addon/hint/show-hint.js"; // 自动补全
import "@/lib/codemirror/addon/hint/javascript-hint.js"; // 自动补全
import "@/lib/codemirror/mode/sql/sql.js"; // 自动补全

export default {
  components: { Codemirror, ElMessage, VueDraggableResizable },
  props: ["lang"], // lang 选中的语言
  mounted() {
    // 拖动调整输出窗口大小
    document.addEventListener("mousemove", (e) => {
      if (this.dragging) {
        const ele = document.getElementsByClassName("code-output")?.[0];
        ele.style.height = `${this.outputHeight + this.pos[1] - e.screenY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  },
  data() {
    return {
      inputContent: "",
      result: "",
      // 语言列表
      langOptions: window.appConfig.langOptions,
      // 代码输入框配置项
      cmOptions: {
        mode: codemirrorConfig.get(this.lang), // 语言模式
        theme: "panda-syntax", // 主题
        lineNumbers: true, // 显示行号
        smartIndent: true, // 智能缩进
        indentUnit: 4, // 智能缩进单位为4个空格长度
        // foldGutter: true, // 启用行槽中的代码折叠
        styleActiveLine: true, // 显示选中行的样式
        autofocus: true, // 自动获得焦点
        // 括号匹配
        matchBrackets: true,
        autoCloseBrackets: true,
        // 绑定sublime快捷键
        keyMap: "sublime",
        // 开启代码折叠
        lineWrapping: true,
        foldGutter: true,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers",
        ],
        // CodeMirror-lint-markers是实现语法报错功能
        lint: true,
        // 全屏模式
        fullScreen: false,
        // extraKeys: { Ctrl: "autocomplete" }, // 自动补全快捷键
        autoRefresh: true, // 自动刷新
      },

      outputOptions: {
        theme: "oceanic-next", // 主题
        lineNumbers: false, // 显示行号
        smartIndent: false, // 智能缩进
        foldGutter: false, // 启用行槽中的代码折叠
        readOnly: true, // 只读
        cursorBlinkRate: -1, // 光标闪动的间隔，单位为毫秒。默认为530。当设置为0时，会禁用光标闪动。负数会隐藏光标
      },

      dragging: false, // 是否正在拖动
      pos: [0, 0], // 鼠标当前坐标
      outputHeight: 0, // 准备拖动元素时元素的高度
      loading: false, // 正在执行
    };
  },
  watch: {
    lang() {
      this.langChanged();
    },
    loading() {
      if (this.loading) {
        this.result = "Executing ...";
      }
    },
  },
  methods: {
    mousedown(e) {
      this.dragging = true;
      this.pos = [e.screenX, e.screenY];
      this.outputHeight =
        document.getElementsByClassName("code-output")?.[0]?.clientHeight;
    },
    mouseup() {
      this.dragging = false;
    },
    codeInputChange(inputContent) {
      this.inputContent = inputContent;
    },
    // 切换语言
    langChanged() {
      // 变更codemirror配置
      this.cmOptions.mode = codemirrorConfig.get(this.lang) || "clike"; // 如果找不到就用clike

      this.inputContent = "";
      this.result = "";
      if (this.lang === "java") {
        this.inputContent =
          '// Pleash don\'t change the top class name\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java !");\n    }\n}';
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
      if (/^\s*$/.test(this.inputContent)) {
        ElMessage("Please input your code first");
        return;
      }

      this.loading = true;
      axios({
        method: "post",
        url: window.appConfig.serverOrigin,
        data: {
          lang: this.lang,
          inputContent: this.inputContent,
        },
      })
        .then((res) => {
          this.result = String(res.data);
        })
        .catch(() => {
          ElMessage("Network error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped lang="less">
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .code-input {
    font-size: 15px;
    flex: 1;
  }

  .division {
    width: 100%;
    height: 3px;
    background-color: gray;

    &:hover {
      cursor: row-resize;
    }
  }

  .code-output {
    resize: vertical;
    max-height: 90vh;
    min-height: 50px;
    height: auto;
    resize: none;
  }

  .run-btn-wrapper {
    position: fixed;
    z-index: 10;
    right: 30px;
    bottom: 130px;

    .run {
      display: fixed;
      width: 80px;
      height: 80px;
      background-color: #409efc;
      color: white;
      border-radius: 50%;
      font-weight: bold;
      font-size: 30px;
      line-height: 80px;
      text-align: center;

      // 该文字不可被选中
      user-select: none;

      &:hover {
        box-shadow: 4px 4px 2px gray;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
