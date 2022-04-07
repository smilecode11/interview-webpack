<template>
  <div class="container">
    {{ message }} - {{ count }} - 尘心
    <button @click="count++">add count</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      message: "hello vue!",
      count: 0,
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
