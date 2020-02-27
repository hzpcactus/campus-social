<template>
    <div>
      <div class="main_section_agile" id="home">
		<div class="agileits_w3layouts_banner_nav">
			<nav class="navbar navbar-default">
				<div class="navbar-header navbar-left">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<h1><a class="navbar-brand" href="index.html"> <span>L</span>ifer</a></h1>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
					<nav class="link-effect-2" id="link-effect-2">
						<ul class="nav navbar-nav">
							<li class="active"><router-link to="./" class="effect-3">首页</router-link></li>
							<li><router-link to="blog" class="effect-3">查看好友列表</router-link></li>
							<li>
							  <router-link to="blog" class="effect-3">&nbsp;&nbsp;<el-badge :value="9">动态</el-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
							</li>
							<li><a href="javascript:void(0);" class="effect-3" @click="upload()">上传</a></li>
							<li><router-link to="notice" class="effect-3">&nbsp;&nbsp;<el-badge :value="16">通知</el-badge>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</router-link></li>
							<!-- <li class="dropdown">
								<a href="#" class="dropdown-toggle effect-3" data-toggle="dropdown">操作 <b class="caret"></b></a>
								<ul class="dropdown-menu agile_short_dropdown">
									<li><a href="login.html">登录</a></li>
									<li><a href="registered.html">注册</a></li>
								</ul>
							</li> -->
							<li v-if="isUser">
								<div @click="toAbout">
								  <!-- <el-tooltip effect="light" :content="userName" placement="bottom-start"> -->
      								 <el-avatar class="avatar" :title="userName" size="medium" style="margin-top:10px;" :src="imgUrl"></el-avatar>
                                  <!-- </el-tooltip> -->
								</div>
							</li>
							<!-- <li v-if="isUser"><router-link to="about" class="effect-3">{{userName}}</router-link></li> -->
							<li v-else><router-link to="login" class="effect-3">登录</router-link></li>
						</ul>
					</nav>
				</div>
			</nav>
			<div class="clearfix"> </div>
		</div>
	 </div>
    </div>
</template>

<script> 

export default {
    data() {
        return {
          userName:"用户名",
		  isUser:false,
		  imgUrl:"",
        };
    },
    created() {

    },
    mounted() {
      let personAccount = window.localStorage.getItem("personAccount")||"";
	  let personPassword = window.localStorage.getItem("personPassword")||"";
	  this.imgUrl =window.localStorage.getItem("personPicture")||"";
	//   this.imgUrl =window.localStorage.getItem("personPicture")? "static"+ window.localStorage.getItem("personPicture").split("static")[1]:"";
	  console.log(this.imgUrl);
      if(personAccount&&personPassword){
		 this.isUser = true;
		 this.userName = personAccount;
      }else{
		 this.isUser=false;
	  }
    },
    methods: {
       toAbout(){
		   this.$router.push({name:'about'});
	   }
    }
};
</script>

<style scoped lang="less">
.avatar{
	cursor: pointer;
}
.avatar:hover{
	box-shadow:5px 2px 6px #000;
}
</style>
