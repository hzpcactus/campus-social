<template>
  <div style="background:url(//s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/infocenterbg.a1a0d152.jpg) top/cover no-repeat fixed ">
    <div class="main_section_agile inner" id="home" style="text-align:center;">
	 <el-avatar class="avatar" :src="imgUrl"></el-avatar>
     <span style="color:white;font-weight:bold;font-size:35px;display:block;margin-top:25px;">{{userName}}</span>
	</div>
    <!--/w3_short-->
	 <div class="services-breadcrumb">
		<div class="agile_inner_breadcrumb">
			<ul class="w3_short">
				<li><a href="index.html">主页</a><span>|</span></li>
				<li>管理员权限</li>
			</ul>
		</div>
	</div>
    <div>
      <el-row class="tac">
      <el-col :span="4"> 
      <el-menu
        default-active="/sendNotice"
        class="el-menu-vertical-demo"
        :router="true"
      >
        <el-menu-item index="/sendNotice">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-RectangleCopy"></use>
            </svg>
            <span slot="title">发布通知</span>
        </el-menu-item>
        <el-menu-item index="/grantPermissions">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quanxian"></use>
            </svg>
            <span slot="title">授予权限</span>
        </el-menu-item>
        <el-submenu index="1">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shujufenxi"></use>
          </svg>
          <span>数据分析</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/dataAnalysis">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ditu"></use>
          </svg>
          <span>用户分布图</span>
          </el-menu-item>
          <el-menu-item index="/schoolData">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tubiaozhuzhuangtu"></use>
          </svg>
          <span>学校数据柱状图</span>
          </el-menu-item>
          <el-menu-item index="/onlinePersonData">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-line-chart"></use>
          </svg>
          <span>在线人数折线图</span>
          </el-menu-item>
        </el-menu-item-group>
        </el-submenu>
      </el-menu>
      </el-col>
      <el-col :span="20" ref="noticeView" style="min-height:500px; position: relative;padding:5px;background: rgba(221,240,248,0.5); "> 
         <router-view  style="width:98%;padding:20px;margin:0 auto;"></router-view>
      </el-col>
     </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      imgUrl:"",
      userName:""
    }
  },
  created(){},
  mounted(){
    this.userName =  window.localStorage.getItem("personAccount");
    this.imgUrl =window.localStorage.getItem("personPicture");
    this.toSendNotice();
    // console.log(this.$refs.noticeView);
},
  watch:{},
  computed:{},
  methods:{
    toSendNotice(){
       this.$router.push({path:'/sendNotice'}); 
    },
    toGrantPermissions(){
       this.$router.push({path:'/grantPermissions'}); 
    },
    toDataAnalysis(){
      this.$router.push({path:'/dataAnalysis'}); 
    }
  },
}
</script>
<style lang="less" scoped>
.avatar{
     width:120px;
     height:120px;
     margin-top:120px;
}
.el-menu-vertical-demo{
  min-height:500px;
  background: rgba(221,240,248,0.5);
}
.el-menu-item-group{
  background: rgba(221,240,248,0.5) !important;
}
.icon{
  font-size:18px !important; 
}
</style>