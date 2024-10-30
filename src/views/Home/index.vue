<!--
 * @Author       : zhangyong
 * @Date         : 2023-07-13 10:52:09
 * @Description  :
-->
<template>
  <div class="entrance-main">
    <h2>{{ title }}</h2>
    <h3>请选择访问的内容</h3>
    <!-- @click.stop="jumpUrl(screen.viewUrl)" -->
    <div v-for="(screen, idx) in screens" :key="idx"  @click.stop="jumpUrl(screen.viewUrl)">
      <el-popover placement="top-start" :width="400" trigger="hover">
        <template #reference>
          <div>
            <h4>{{ screen.title }}</h4>
            <!-- <p><a @click="handeDesc(screen.md)">查看简介</a></p> -->
            <p><a @click.stop="jumpUrl(screen.viewUrl)">查看页面</a></p>
            <!-- <p><a @click.stop="jumpUrl(screen.devViewUrl)">查看可缩放页面</a></p> -->
          </div>
        </template>
        <div>
          <mdViewer :value="screen.md"/>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projectList } from '@/projectList';
import mdViewer from '@/components/markdown/mdViewer.vue'

const router = useRouter();
const title = ref('项目名称');
const screens = ref(projectList);


const jumpUrl = (url) => {
  const path = import.meta.env.DEV ? `/src/project${url}` : url;
  // router.push(path);
  location.href = path;
};
</script>

<style lang="scss" scoped>
/* 动画，控制背景 background-position */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.entrance-main {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 18vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  background: linear-gradient(-45deg, #eeeeee, #658886, #88916f);
  background-size: 600% 600%;
  animation: gradientBG 5s ease infinite;

  h2 {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 3vh;
    font-size: 5vh;
  }

  h3 {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 10vh;
    font-size: 3vh;
  }

  &>div {
    border-radius: 1rem;
    border: 0.2rem solid #ccc;
    padding: 1rem;
    min-width: 10vw;
    max-width: 30vw;
    margin: 1rem;
    text-align: center;

    h4 {
      font-size: 3vh;
      line-height: 2;
    }

    p {
      line-height: 1.6;
      font-size: 1.8vh;

      &:hover {
        cursor: pointer;
        color: blue;
      }
    }

    &:hover {
      cursor: pointer;
      border: 0.2rem solid rgb(104, 149, 233);
    }
  }
}
</style>
