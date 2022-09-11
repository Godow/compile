<template>
  <div class="layout">
    <LeftMenu @changeLang="changeLang"></LeftMenu>
    <MainCoder :lang="lang"></MainCoder>
  </div>
</template>

<script>
import LeftMenu from "./components/LeftMenu.vue";
import MainCoder from "./components/MainCoder/index.vue";
export default {
  components: {
    LeftMenu,
    MainCoder,
  },
  data() {
    return {
      lang: "node",
    };
  },
  methods: {
    changeLang(lang) {
      this.lang = lang;
    },
  },
};
</script>

<style scoped lang="less">
.layout {
  height: 100vh;
  width: 100vw;
  overflow: auto;
  display: flex;
}
</style>
