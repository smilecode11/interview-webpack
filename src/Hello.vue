<template>
  <div class="container">
    {{ message }} - {{ count }} - {{ name }}
    <button @click="count++">add count</button>
  </div>
  <div class="footer">
    <span>footer</span>&nbsp;
    <span class="info">@尘心 - 18958849752</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      message: "hello vue!",
      count: 0,
      name: "尘心",
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  font-weight: bolder;
  border: 1px solid skyblue;
  background: yellow;
}
</style>

<style lang="scss" scoped>
.footer {
  text-align: center;
  .info {
    font-weight: bold;
    color: yellowgreen;
  }
}
</style>
