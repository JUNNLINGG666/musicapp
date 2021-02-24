<template>
  <div id="app">
    <TopNav></TopNav>
  <div style="padding:70px 0px">
    <keep-alive>
          <router-view/>
    </keep-alive>
  </div>
    <Play></Play>
  </div>
</template>

<script>
import TopNav from './components/TopNav'
import Play from './components/Play'
export default {
  components:{
    TopNav,
    Play
  }
}
</script>
<style>
a{
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-width: 375px;
  margin: 0 auto;
}
</style>
