<script setup lang="ts">
import { initThreeJs } from './three/index';
import * as tool from '@/utils/tool';
const threeDom = ref(null);
onMounted(() => {
  window.tool = tool;
  initThreeJs(threeDom.value);
});
</script>
<template>
  <!-- <router-view></router-view> -->
  <div id="three3D" ref="threeDom"></div>
</template>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#three3D {
  width: 100%;
  height: 100%;
}
</style>
./three/index
