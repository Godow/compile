<template>
  <main>{{ data }}</main>
</template>

<script>
import axios from "axios";
// import { ElButton } from "element-plus";
export default {
  // components: { ElButton },
  mounted() {
    axios.get("//127.0.0.1:3000/").then((res) => {
      console.log("res:", res.data);
      this.data = res.data ?? "";
    });
  },
  data() {
    return {
      data: 123,
    };
  },
};
</script>
