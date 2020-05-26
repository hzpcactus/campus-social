<template>
  <div style="background:url(http://s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/infocenterbg.a1a0d152.jpg) top/cover no-repeat fixed ">
    <div class="main_section_agile inner" id="home" style="text-align:center;">
	   <el-avatar class="avatar" :src="imgUrl"></el-avatar>
     <span style="color:white;font-weight:bold;font-size:35px;display:block;margin-top:25px;">{{userName}}</span>
	  </div>
    <!--/w3_short-->
	 <div class="services-breadcrumb">
		<div class="agile_inner_breadcrumb">
			<ul class="w3_short">
				<li><a href="index.html">主页</a><span>|</span></li>
				<li>通知</li>
			</ul>
		</div>
	</div>
	<div>   
     <el-row class="tac">
       <el-col :span="4"> 
        <el-menu
        default-active="/getNotice"
        class="el-menu-vertical-demo"
        :router="true"
       >
        <el-menu-item index="/getNotice">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xitongtongzhi"></use>
            </svg>
            <span slot="title">系统通知</span>
        </el-menu-item>
        <el-menu-item index="/getLike">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zan"></use>
            </svg>
            <span slot="title">收到的赞</span>
        </el-menu-item>
        <el-menu-item index="/getRemark">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
            </svg>
            <span slot="title">评论</span>
        </el-menu-item>
        <el-menu-item index="/friendsAccept">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31haoyou"></use>
            </svg>
            <span slot="title">好友验证</span>
        </el-menu-item>
        </el-menu>
       </el-col>
       <el-col :span="20" style="min-height:500px; position: relative;padding:5px;"> 
          <router-view></router-view>
       </el-col>
     </el-row>
    </div>
	<!--//w3_short-->
   
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      imgUrl:"",
      userName:"",
    }
  },
  created(){},
  mounted(){
    this.userName =  window.localStorage.getItem("personAccount");
    this.imgUrl =window.localStorage.getItem("personPicture");
    this.$router.push({path:'/getNotice'}); 
  },
  watch:{},
  computed:{},
  methods:{
  },
  
}
</script>
<style lang="less" scoped>
.avatar{
     width:120px;
     height:120px;
     margin-top:120px;
}
.icon{
  font-size:18px !important; 
}
.el-menu-vertical-demo{
  min-height:500px;
  background: rgba(221,240,248,0.5);
}
</style>