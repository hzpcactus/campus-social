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
							<li><a href="javascript:void(0);" class="effect-3" @click="friendsview()">查看好友列表</a></li>
							<li>
							  <a href="javascript:void(0);" class="effect-3" @click="blog()">&nbsp;&nbsp;<el-badge :value="9">动态</el-badge>&nbsp;&nbsp;&nbsp;</a>
							</li>
							<li><a href="javascript:void(0);" class="effect-3" @click="uploading()">上传</a></li>
							<li class="dropdown">
								<a href="#" class="dropdown-toggle effect-3" data-toggle="dropdown">操作 <b class="caret"></b></a>
								<ul class="dropdown-menu agile_short_dropdown">
									<li><a href="login.html">登录</a></li>
									<li><a href="registered.html">注册</a></li>
								</ul>
							</li>
							<li v-if="isUser"><a href="mail.html" class="effect-3">{{userName}}</a></li>
							<li v-else><router-link to="login" class="effect-3" @click="">登录</router-link></li>
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
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="less">

</style>
