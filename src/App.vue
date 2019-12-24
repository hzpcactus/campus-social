<template>
  <div id="app">
    <!--<img src="./assets/logo.png">
    <Index></Index>-->
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Index from '@/components/index.vue'
import Footer from '@/components/footer.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components:{
    Index,
    Footer,
    Header
  }
}
</script>

<style>
</style>
