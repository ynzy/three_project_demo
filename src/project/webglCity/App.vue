<script setup lang="ts">
import { initCity } from '@webglCity/enter';

onMounted(() => {
  initCity();
});
</script>
<template>
  <canvas id="webgl">浏览器不支持canvas，请切换浏览器重试</canvas>
</template>
<style lang="scss" scoped></style>
