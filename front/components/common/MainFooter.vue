<template>
  <div>
    <el-link href="http://www.beian.miit.gov.cn/" :underline="false">{{
      beian
    }}</el-link>
  </div>
</template>

<script>
export default {
  name: "page-main-footer",
  data() {
    return {
      beian: "豫ICP备19040343号-1"
    };
  }
};
</script>

<style></style>
