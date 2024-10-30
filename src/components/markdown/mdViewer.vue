<template>
    <Viewer v-bind="$attrs" :plugins="plugins"/>
</template>
<script lang="ts" setup>
import { Editor,Viewer  } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import 'bytemd/dist/index.css'
import './juejin.css'

const plugins = [gfm()]
    
</script>
<style lang="scss" scoped>

</style>