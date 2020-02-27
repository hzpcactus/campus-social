<template>
  <div>
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
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
            </template>
            <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
        </el-menu>
       </el-col>
       <el-col :span="20" style="background:red;"> 
           
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
      userName:""
    }
  },
  created(){},
  mounted(){
      this.userName =  window.localStorage.getItem("personAccount");
	  this.imgUrl = "static"+ window.localStorage.getItem("personPicture").split("static")[1];
  },
  watch:{},
  computed:{},
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
</style>