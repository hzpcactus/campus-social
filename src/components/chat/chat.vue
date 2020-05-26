<template>
  <div>
    <div class="main_section_agile inner_height" id="home" style="text-align:center;height:80px;"></div>
    <div class="chat_div">
     <div style="float:left;">
      <div class="avatar_img">
        <el-avatar :size="45" :src="imgUrl" style="margin:0 auto;" @error="true">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
      </div>
      <el-menu
        default-active="/friendChat"
        class="el-menu-vertical-demo"
        :collapse="true"
        background-color="#2c2c2c"
        :router="true"
      >
      <el-menu-item index="/friendChat" @click="handleOpenMenu('/friendChat')">
        <svg class="icon" :style="menu=='/friendChat'?{fill:'white'}:{fill:'#808080'}" aria-hidden="true">
            <use xlink:href="#icon-iconfontyonghu"></use>
        </svg>
        <span slot="title">好友</span>                   
      </el-menu-item>
      <el-menu-item index="/groupChat" @click="handleOpenMenu('/groupChat')">
          <svg class="icon" :style="menu=='/groupChat'?{fill:'white'}:{fill:'#808080'}" aria-hidden="true">
            <use xlink:href="#icon-31haoyou"></use>
          </svg>
        <span slot="title">群聊</span>
      </el-menu-item>
      <el-menu-item index="/collection" @click="handleOpenMenu('/collection')">
        <svg class="icon" :style="menu=='/collection'?{fill:'white'}:{fill:'#808080'}" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <span slot="title">收藏</span>
      </el-menu-item>
      <el-menu-item index="/fileChat" @click="handleOpenMenu('/fileChat')">
        <svg class="icon" :style="menu=='/fileChat'?{fill:'white'}:{fill:'#808080'}" aria-hidden="true">
            <use xlink:href="#icon-wenjian-copy"></use>
        </svg>
        <span slot="title">文件</span>
      </el-menu-item>
      </el-menu>
     </div>
     <router-view :chatMsg="chatMsg" style="width:calc(100% - 64px);display:inline-block;height:640px;"></router-view>
     <!-- <div style="clear:both"></div> -->
    </div>
  
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    chatMsg:{
       type:Object,
       default:{}
    }
  },
  data(){
    return {
      imgUrl:"",
      menu:"/friendChat",
    }
  },
  created(){},
  mounted(){
    this.imgUrl = window.localStorage.getItem("personPicture");
    this.$router.push({path:'/friendChat'}); 
  },
  watch:{},
  computed:{},
  methods:{
    handleOpenMenu(item){
      this.menu = item;
    }
  },
}
</script>
<style lang="less" scoped>
.main_section_agile.inner_height{
   background: url(../../assets/images/banner2.jpg)no-repeat 0px 0px;
  //  background: url(/static/img/banner2.8ec90fe.jpg)no-repeat 0px 0px;
   background-size: cover;
   -webkit-background-size: cover;
   -moz-background-size: cover;
   -o-background-size: cover;
   -ms-background-size: cover;
}
.chat_div{
  width:100%;
  height:640px;
}
.icon{
  font-size:30px !important; 
}
.avatar_img{
  width:64px;
  height:70px;
  border-right: 1px solid #e6e6e6;
  text-align:center;
  padding:12.5px 0;
  background: #2c2c2c;
}
.el-menu{
  height:570px;
}
</style>