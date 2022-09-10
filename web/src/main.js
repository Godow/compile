import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/main.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import { basicSetup } from "codemirror";
// import { GlobalCmComponent } from "codemirror-editor-vue3";

const app = createApp(App);

app.use(router);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.mount("#app");
