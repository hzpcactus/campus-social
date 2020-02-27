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
				<li>动态</li>
			</ul>
		</div>
	</div>
	<!--//w3_short-->
	<!-- /blog -->
	<div class="banner-bottom inner">
		<div class="container">
			<div class="wthree_head_section">
				<h3 class="w3l_header w3_agileits_header">动态 <span>页面</span></h3>
			</div>
			<div class="agile_wthree_inner_grids">
				<div class="col-md-8 event-left w3-agile-event-left">
					<div class="event-left1 w3-agile-event-left1">
						<div class="event-left1-left agile-event-left1-left">
							<a href="single.html"><img src="../assets/images/banner1.jpg" alt=" " class="img-responsive" /></a>
							<div class="event-left1-left-pos agileits-w3layouts-event-left1-left-pos">
								<ul>
									<li><a href="#"><span class="fa fa-tags" aria-hidden="true"></span> 3个动态</a></li>
									<li><a href="#"><span class="fa fa-heart-o" aria-hidden="true"></span> 2个赞</a></li>
									<li><a href="#"><span class="fa fa-user" aria-hidden="true"></span> {{userName}}</a></li>
								</ul>
							</div>
						</div>
						<div class="event-left1-right w3-agileits-event-left1-right">
							<h4>2nd / June 2017</h4>
							<h5><a href="single.html">consectetur adipiscing elit, sed do eiusmod</a></h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.In elementum, magna id pellentesque
								auctor, risus dolor congue urna, nec dapibus eros magna a odio. Duis laoreet risus eget malesuada consequat.</p>
							<div class="agileits-button two">
								<a class="btn btn-primary btn-lg hvr-underline-from-left" href="single.html" role="button">Read More »</a>
							</div>
						</div>
						<div class="clearfix"> </div>
					</div>
					<nav class="paging1 agileits-w3layouts-paging1">
						<ul class="pagination paging w3-agileits-paging">
							<li>
								<a href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					  </a>
							</li>
							<li><a href="#">1</a></li>
							<li><a href="#">2</a></li>
							<li><a href="#">3</a></li>
							<li><a href="#">4</a></li>
							<li><a href="#">5</a></li>
							<li>
								<a href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					  </a>
							</li>
						</ul>
					</nav>
				<div class="leave-coment-form" style="border-top: 2px solid #ededed">
					<h3 style="margin-top: 30px;"><b>发表个人言论</b></h3>
					<!-- <form action="#" method="post"> -->
						<!-- <input type="text" name="Name" placeholder="Name" required="">
						<input type="email" name="Email" placeholder="Email" required=""> -->
						<textarea name="Message" id="myArea" placeholder="分享新鲜事..." required=""></textarea>
						<div class="w3_single_submit">
							<input type="button" id="saveMySpeech" value="发表">
						</div>
					<!-- </form> -->
				</div>
				</div>
				<div class="col-md-4 event-right wthree-event-right">
					<div class="event-right1 agileinfo-event-right1">
						<div class="search1 agileits-search1">
							<!-- <form action="#" method="post"> -->
								<input type="search" name="Search" placeholder="查找动态相关内容" required="" v-model="sendmsg">
								<input type="submit" value="查找" @click="send">
							<!-- </form> -->
						</div>
						<!-- <div class="categories w3ls-categories">
							<h3>Categories</h3>
							<ul>
								<li><i class="fa fa-check" aria-hidden="true"></i><a href="single.html">At vero eos et accusamus iusto</a></li>
								<li><i class="fa fa-check" aria-hidden="true"></i><a href="single.html">Sed ut perspiciatis unde omnis</a></li>
								<li><i class="fa fa-check" aria-hidden="true"></i><a href="single.html">Accusantium doloremque lauda</a></li>
								<li><i class="fa fa-check" aria-hidden="true"></i><a href="single.html">Vel illum qui dolorem fugiat quo</a></li>
								<li><i class="fa fa-check" aria-hidden="true"></i><a href="single.html">Quis autem vel eum reprehenderit</a></li>
								<li><i class="fa fa-check" aria-hidden="true"></i><a href="single.html">Neque porro quisquam est qui</a></li>
							</ul>
						</div> -->
						<div class="posts w3l-posts" style="margin: 3em 0;" id="friendstable">
							<h3 style="float: left;">好友列表</h3>
							<span class="fa fa-user-plus" title="添加好友" aria-hidden="true" style="float:right;margin-top: 5px;cursor: pointer;" @click="popAddBox()"></span>
							<i class="el-icon-search" title="查找好友" style="float:right;margin-top: 5px;margin-right: 5px;cursor: pointer;" @click="popSearchBox()"></i>
							<!-- 添加好友 start  -->
                            <el-dialog title="添加好友" :visible.sync="dialogTableVisible" width="400px" :close-on-click-modal="false" @closed="closeDialog">
                            <el-row type="flex" align="middle">
                              <el-col :span="3">
                                <p>账号:</p>
                              </el-col>
                              <el-col :span="18">
                                <el-input size="small" v-model="searchPerson" placeholder="请输入内容" @input="addSearch"></el-input>
                              </el-col>
                              <el-col :span="3" :offset="1">
                                <el-button size="small" type="primary" @click="addSearch">查找</el-button>
                              </el-col>
                            </el-row>
                           <!-- <div class="dialogDiv">-->
							  <div class="posts-grids w3-posts-grids" style="overflow:scroll;overflow-x: hidden;overflow-y: scroll;height:480px;">
								<div class="posts-grid w3-posts-grid blog_hover" v-for="item in addSearchList" :key="item.person_account">
									<div class="posts-grid-left w3-posts-grid-left">
									    <img :src="item.person_picture" alt=" " class="img1-responsive" />
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;{{item.person_account}}</a></h4>
										<ul class="wthree_blog_events_list">
											<li :title="item.person_signature"><i class="el-icon-edit" aria-hidden="true"></i>{{item.person_signature.length>10?item.person_signature.substring(0,10)+"...":item.person_signature}}</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<el-button icon="el-icon-plus" type="primary" size="mini" circle class="add_button"  v-if="!item.applying" @click="addcontext(item)"></el-button>
									<span style="font-size:10px" v-if="item.applying">等待验证中...</span>
									<!-- <i class="el-icon-plus" @click="addcontext(item)" v-if="!item.applying"></i> -->
									<div class="clearfix"> </div>
								</div>
							<!--</div>-->
                              <!--<el-table :data="gridData">
                                <el-table-column property="date" label="日期" width="150"></el-table-column>
                                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                                <el-table-column property="address" label="地址"></el-table-column>
                              </el-table>-->
                            </div>
                            </el-dialog>
							<!-- 添加好友 end  -->
							<!-- 查询好友 start  -->
							<el-dialog title="查找好友" :visible.sync="searchTableVisible" width="400px" :close-on-click-modal="false" @closed="closeDialog">
                            <el-row type="flex" align="middle">
                              <el-col :span="3">
                                <p>账号:</p>
                              </el-col>
                              <el-col :span="18">
                                <el-input size="small" v-model="findPerson" placeholder="请输入内容" @input="findSearch"></el-input>
                              </el-col>
                              <el-col :span="3" :offset="1">
                                <el-button size="small" type="primary" @click="findSearch">查找</el-button>
                              </el-col>
                            </el-row>
                           <!-- <div class="dialogDiv">-->
							  <div class="posts-grids w3-posts-grids" style="overflow:scroll;overflow-x: hidden;overflow-y: scroll;height:480px;">
								<div class="posts-grid w3-posts-grid blog_hover" v-for="item in searchFriendList" :key="item.person_account">
									<div class="posts-grid-left w3-posts-grid-left">
									  <img :src="item.person_picture" alt=" " class="img1-responsive" />
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;{{item.person_account}}</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="el-icon-edit" aria-hidden="true"></i>{{item.person_signature.length>10?item.person_signature.substring(0,10)+"...":item.person_signature}}</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
							<!--</div>-->
                              <!--<el-table :data="gridData">
                                <el-table-column property="date" label="日期" width="150"></el-table-column>
                                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                                <el-table-column property="address" label="地址"></el-table-column>
                              </el-table>-->
                            </div>
                            </el-dialog>
							<!-- 查询好友 end  -->
							<div class="posts-grids w3-posts-grids" :style="isHaveFriends">
								<div class="posts-grid w3-posts-grid" v-show="isShow" v-for="item in friendList" :key="item.person_account">
									<div class="posts-grid-left w3-posts-grid-left">
										<img :src="item.person_picture" alt=" " class="img1-responsive" />
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;{{item.person_account}}</a></h4>
										<ul class="wthree_blog_events_list">
											<li :title="item.person_signature"><i class="el-icon-edit" aria-hidden="true"></i>{{item.person_signature.length>10?item.person_signature.substring(0,10)+"...":item.person_signature}}</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div v-show="!isShow" class="nofriends">
									  <i class="el-icon-user">暂无好友</i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="clearfix"> </div>
			</div>
		</div>
	</div>
	<!-- //blog -->
    </div>
</template>

<script>
import '@/assets/css/blog.css'
import '@/assets/css/single.css'
import io from 'socket.io-client'
export default {
    data() {
        return {
          userName:"用户名",
          dialogTableVisible:false,
		  searchTableVisible:false,
		  isShow:false,
		  isHaveFriends:"display:flex;justify-content:center;height:480px;",
		  findPerson:"",
		  personAccount:"",
		  imgUrl:"",
		  searchPerson:"",
		  sendmsg:"",
		  friendList:[],
		  searchFriendList:[],
		  addFriendList:[],
		  addSearchList:[],
        };
    },
    created() {

    },
    mounted() {
	  this.userName =  window.localStorage.getItem("personAccount");
	  this.imgUrl =window.localStorage.getItem("personPicture");
	  this.$axios.post("/friends/search",{personAccount:this.userName}).then(res=>{
		  console.log(res.data);
		  this.friendList=res.data.msg;
		  this.searchFriendList=this.friendList;
		  this.isShow=res.data.msg==null?false:true;
		  this.isHaveFriends=this.isShow?"overflow:scroll;overflow-x: hidden;overflow-y: scroll;height:480px;":"display:flex;justify-content:center";
	  });
    },
    methods: {
      popAddBox(){
		  this.dialogTableVisible=true;
		  this.$axios.post("/friends/addSearch",{personAccount:this.userName}).then(res=>{
			 this.addFriendList=res.data.msg;
			 this.addSearchList=this.addFriendList;
		  });
      },
	  popSearchBox(){
		  this.searchTableVisible=true;
	  },
	  addFriend(item,value){
		let load=this.$message({
			type: 'warning',
			message:"正在发送请求",
			iconClass:"el-icon-loading",
			duration:0
		 });
		 this.$axios.post("/friends/add",{
			 personFriend:"'"+item.person_account+"'",
			 personAccount:window.localStorage.getItem("personAccount")
		 }).then(res=>{
			 load.close();
			 if(res.data.status=="0"){
				this.$message.success(res.data.msg);
				var obj={};
				obj.personApply=window.localStorage.getItem("personAccount");
				obj.personAccept=item.person_account;
				obj.sendmsg=value;
				this.$socket.emit("sendmsg", obj);
				// var chat = io.connect(`http://localhost:3000/dd`);
				// chat.on('friendApply', function (data) {
				// 	console.log(data);
				// 	// chat.emit('hi!');
				// });
			 }else{
				this.$message.error(res.data.msg);
			 }
		 }).then(()=>{
			this.$axios.post("/friends/addSearch",{personAccount:this.userName}).then(res=>{
				this.addFriendList=res.data.msg;
				this.addSearchList=this.addFriendList;
			});
		 });
	  },
	  addcontext(item){
        this.$prompt('填写验证信息', '添加好友', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.addFriend(item,value);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
 	  },
	  addSearch(){
		 this.addSearchList=[];
		 for(let i=0;i<this.addFriendList.length;i++){
            if(this.addFriendList[i].person_account.includes(this.searchPerson)){
              this.addSearchList.push(this.addFriendList[i]);
			}
		 }
		 
	  },
	  findSearch(){
        this.searchFriendList=[];
		 for(let i=0;i<this.friendList.length;i++){
            if(this.friendList[i].person_account.includes(this.findPerson)){
              this.searchFriendList.push(this.friendList[i]);
			}
		 }
	  },
	  closeDialog(){
		  this.searchPerson="";
		  this.findPerson="";
	  },
	  send(){
		//    var chat = io('http://localhost/friendApply');
		//    chat.emit(`${window.localStorage.getItem('personAccount')}`, `发送信息：${this.sendmsg}`);
		var obj={};
		obj.personApply=window.localStorage.getItem("personAccount");
		obj.personAccept="test1";
		obj.sendmsg=this.sendmsg;
		this.$socket.emit("sendmsg", obj);
		// this.sockets.subscribe(`${window.localStorage.getItem("personAccount")}`, (data) => {
		// 	this.msg = data.message;
		// 	console.log(this.msg);
		// });
		// this.sockets.unsubscribe(`${window.localStorage.getItem("personAccount")}`);
	  }
    }
};
</script>

<style scoped lang="less">
.dialogDiv{
    height:350px;
    overflow:auto;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  background-color: rgba(240, 240, 240, .5);
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px black;
  background-color: black;
}
.blog_hover:hover{
  background-color:#eeeeee;
}
.avatar{
     width:120px;
     height:120px;
     margin-top:120px;
}
.el-icon-plus{
	cursor: pointer;
}
.add_button{
   margin-right: 28px;
}
.nofriends{
  align-self:center;
  font-size: 25px;
  color:#777777;
}
</style>
