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
							<li :class="[clickItem=='首页'?'active':'']" @click="changeStyle('首页')"><router-link to="./" class="effect-3">首页</router-link></li>
							<li :class="[clickItem=='聊天'?'active':'']"><a class="effect-3" @click="toChat">&nbsp;&nbsp;<el-badge :is-dot="isChat">聊天</el-badge>&nbsp;&nbsp;&nbsp;</a></li>
							<li :class="[clickItem=='动态'?'active':'']" @click="changeStyle('动态')">
							  <router-link to="blog" class="effect-3">&nbsp;&nbsp;动态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
							</li>
							<li :class="[clickItem=='通知'?'active':'']" @click="changeStyle('通知')"><router-link to="notice" class="effect-3">&nbsp;&nbsp;通知&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</router-link></li>
							<li :class="[clickItem=='管理员权限'?'active':'']" @click="changeStyle('管理员权限')"><router-link to="manager" class="effect-3">管理员权限</router-link></li>
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
							<li :class="[clickItem=='登录'?'active':'']" @click="changeStyle('登录')" v-else><router-link to="login" class="effect-3">登录</router-link></li>
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
	props:{
	  chatMsg:{
		 type:Object,
		 default:{}
	  }
	},
    data() {
        return {
		  userName:"",
		  password:"",
		  isUser:false,
		  imgUrl:"",
		  isManager:false,
		  isChat:false,
		  clickItem:"首页"
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
		 this.password = personPassword;
      }else{
		 this.isUser=false;
	  }
    },
    methods: {
       toAbout(){
		   this.clickItem="";
		   this.$router.push({name:'about'});
	   },
	   findManage(){
		   this.$axios.post("/users/search",{personAccount:this.userName,personPassword:this.password}).then(res=>{
			 if(res.data.status=="0"){
				 console.log(res.data.msg.person_ismanage==0?false:true);
                 this.isManager=res.data.msg.person_ismanage==0?false:true;
			 }else{
				 console.log(res.data);
				 this.isManager=false;
			 }
		   })
	   },
	   toChat(){
		   this.$router.push({name:'chat'});
		   this.isChat = false;
		   this.clickItem = '聊天';
	   },
	   changeStyle(item){
		   this.clickItem = item;
	   }
	},
	watch:{
	  userName(val){
		console.log("检查管理员权限",this.userName);
		if(this.userName){
		//   this.$nextTick(()=>{
			this.findManage();
		//   })
		}else{
          this.isManager = false;
		}
		
		// this.isManager=this.userName?this.findManage():false;
		console.log(this.isManager);
	  },
	  chatMsg(val){
		  console.log(this.chatMsg,111);
        if(JSON.stringify(this.chatMsg) == "{}"){    //没有信息
           this.isChat = false;
		}else{
           this.isChat = true;
		}
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
