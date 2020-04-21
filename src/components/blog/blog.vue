<template>
  <div :style="'background:url('+backgroundTheme+') top/cover no-repeat fixed' ">
	<div class="el-backtop" style="left:25px;bottom: 25px;">
     <el-tooltip class="item" effect="dark" content="发布动态" placement="top-start">
      <el-button circle @click="dialogVisible=true">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fabudongtai-copy"></use>
        </svg>
      </el-button>
     </el-tooltip> 
    </div>
	<send-blog :dialogVisible="dialogVisible" :friendList="friendList" @dialogVisible="getDialogVisible"></send-blog>
	
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
			    <el-link style="float:right;" type="warning" :underline="false" icon="el-icon-view el-icon--right" @click="toBlogTheme">动态主题</el-link>
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
							<a href="single.html"><img src="../../assets/images/banner1.jpg" alt=" " class="img-responsive" /></a>
							<div class="event-left1-left-pos agileits-w3layouts-event-left1-left-pos">
								<ul>
									<li><a href="#"><span class="fa fa-tags" aria-hidden="true"></span> 3个动态</a></li>
									<li><a href="#"><span class="fa fa-heart-o" aria-hidden="true"></span> 2个赞</a></li>
									<li><a href="#"><span class="fa fa-user" aria-hidden="true"></span> {{userName}}</a></li>
								</ul>
							</div>
						</div>
						<div style="margin-top:28px;">
							<el-card shadow="hover" style="padding:5px;margin-top:5px;position:relative;" v-for="(item,index) in blogList" :key="index">
								<svg class="icon forwarding" v-show="item.is_blog_forwarding" aria-hidden="true">
								 <use xlink:href="#icon-zhuanfa"></use>
								</svg>
							<!-- <div class="event-left1-right w3-agileits-event-left1-right" > -->
								<el-row :gutter="10" type="flex" align="middle">
									<el-col :span="2">
									<el-avatar :src="item.person_picture" @error="errorHandler" circle>
										<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
									</el-avatar>
									</el-col>
									<el-col :span="15" style="line-height:35px;">
									<h4 style="display:inline-block;color:#00b7f1;">{{item.blog_sender}}</h4>
									</el-col>
									<el-col :span="7">
									<p style="text-align:right;">{{item.blog_time}}</p>
									</el-col>
								</el-row>
								<!-- <h4>2nd / June 2017</h4>
								<h5><a href="single.html">consectetur adipiscing elit, sed do eiusmod</a></h5> -->
								<p style="margin-top:15px;" v-html="item.blog_content"></p>
								<div style="padding:20px;">
                                  <img class="blog-img" v-for="(itemPicture,index) in item.blog_picture.split(',')" :key="index" :src="itemPicture">
								</div>
								<p style="margin-bottom:15px;" v-if="item.is_blog_forwarding">
								  <svg class="icon" aria-hidden="true">
									<use xlink:href="#icon-forward-null"></use>
								  </svg>
								  动态转自 {{item.blog_original}}
								</p>
							    <div class="blog-svg">
								  <el-tooltip class="item" effect="dark" :content="item.is_like==true?'已点赞':'点赞'" placement="top">
									<svg class="icon iconbutton" :style="{fill:(item.is_like==true?'#00b7f1':'currentColor')}" aria-hidden="true" @click="giveLike(item)">
										<use xlink:href="#icon-zan"></use>
									</svg>
								  </el-tooltip>
								  <el-divider direction="vertical"></el-divider>
								  <el-tooltip class="item" effect="dark" content="评论" placement="top">
									<svg class="icon iconbutton" aria-hidden="true" @click="remarkdialog(item)">
										<use xlink:href="#icon-pinglun"></use>
									</svg>
								  </el-tooltip>
								  <el-divider direction="vertical"></el-divider>
								  <el-tooltip class="item" effect="dark" content="转发" placement="top">
									<svg class="icon iconbutton" aria-hidden="true" @click="forwardingBlog(item)">
										<use xlink:href="#icon-fenxiangdaozhuanfafasongzhiyuanquanxianxing"></use>
									</svg>
								  </el-tooltip>
								  <el-tooltip class="item" effect="dark" content="删除" placement="top">
									<svg class="icon iconbutton icondelete" aria-hidden="true" v-if="item.blog_sender===userName" @click="deleteBlog(item)">
										<use xlink:href="#icon-shanchu1"></use>
									</svg>
								  </el-tooltip>
								</div>
								<div v-show="item.blog_like?true:false">
                                 <el-divider></el-divider>
								 <svg class="icon" style="fill:#00b7f1" aria-hidden="true">
									<use xlink:href="#icon-zan"></use>
								 </svg>
								 <span><b>{{item.blog_like}}  </b>共有{{item.blog_like?item.blog_like.split("、").length:""}}人觉得很赞</span>
								</div>
								<div v-show="item.remark">
                                 <el-divider></el-divider>
                                 <p style="margin-top:5px;" v-for="(item1,index1) in item.remark" :key="index1">
									 <b style="color:#6d757a;">{{item1.remark_account}}</b>:
									 <span style="color:black;" v-html="item1.remark_content"></span>
								 </p>
								</div>
								
							<!-- </div> -->
						   </el-card>
						</div>
						<div class="clearfix"> </div>
					</div>
					<remark :remarkItem="remarkItem" :userName="userName" :dialogRemarkVisible="dialogRemarkVisible" @dialogRemarkVisible="getDialogRemarkVisible" @remark="getRemark"></remark>
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
						<div class="posts w3l-posts" style="margin: 3em 0;background: rgba(255,255,255,0.5);" id="friendstable">
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
import qs from 'qs';
import '@/assets/css/blog.css'
import '@/assets/css/single.css'
import io from 'socket.io-client'
import sendBlog from './components/sendBlog.vue'
import remark from './components/remark.vue'
export default {
	components:{
	  sendBlog,
	  remark
	},
    data() {
        return {
          userName:"用户名",
          dialogTableVisible:false,
		  searchTableVisible:false,
		  dialogVisible:false,
		  dialogRemarkVisible:false,
		  isShow:false,
		  isHaveFriends:"display:flex;justify-content:center;height:480px;",
		  findPerson:"",
		  personAccount:"",
		  imgUrl:"",
		  searchPerson:"",
		  sendmsg:"",
		  backgroundTheme:"",
		  friendList:[],
		  searchFriendList:[],
		  addFriendList:[],
		  addSearchList:[],
		  blogList:[],
		  remarkItem:{},
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
		  this.isHaveFriends=this.isShow?"overflow:scroll;overflow-x: hidden;overflow-y: scroll;height:480px;":"display:flex;justify-content:center;height:480px;";
	  });
      this.getTheme();
	  this.searchBlog();
    },
    methods: {
	  searchBlog(){
        this.$axios.post("/blog/searchBlog",{personAccount:this.userName}).then(res=>{
			// console.log(res);
			this.blogList = res.data.msg;
		});
	  },
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
				let obj={
				   from_person_id:window.localStorage.getItem("personAccount"),
				   to_person_id:item.person_account,
				   sendmsg:value
				};
				// obj.personApply=window.localStorage.getItem("personAccount");
				// obj.personAccept=item.person_account;
				// obj.sendmsg=value;
				this.$socket.emit("sendFriendApply", obj);
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
	  },
	  getDialogVisible(val){
        this.dialogVisible = val;
	  },
	  getDialogRemarkVisible(val){
        this.dialogRemarkVisible = val;
	  },
	  errorHandler(){
		return true;
	  },
	  giveLike(item){
		this.$axios.post("/blog/giveLike",{
			personAccount:this.userName,
			isgiveLike:!item.is_like,
			blogId:item.blog_id,
			blogSender:item.blog_sender
		}).then(res=>{
          if(res.data.status=="0"){
		    item.is_like = !item.is_like;
			item.blog_like = this.updateGiveLike(item.blog_like,item.is_like);
		  }else{
			this.$message.error("点赞失败！"+res.data.msg);
		  }
		});
	  },
	  forwardingBlog(item){
		let param = {
			blogSender:this.userName,
			blogPicture:item.blog_picture,
			blogContent:item.blog_content,
			blogFriend:"",
			isblogForwarding:true,
			blogOriginal:item.blog_sender
		}
		this.$axios.post("/blog/sendBlog",param).then(res=>{
          if(res.data.status=="0"){
           this.$message.success(res.data.msg);
           //this.$emit("getBlog",true);             // 刷新动态
          }else{
           this.$message.error(res.data.msg);
          }
		});
	  },
	  updateGiveLike(str,isgiveLike){
		let arr=[];
		arr = (str==""||str==null)?[]:str.split("、");
        if(isgiveLike){  //点赞
          arr.push(this.userName);
		}else{      //取消赞
          arr.splice(arr.findIndex((value,index,arr)=>{
            return value == this.userName;
          }),1);
		}
		arr = arr.join("、");
		return arr;

	  },
	  remarkdialog(item){
		this.dialogRemarkVisible = true;
		this.remarkItem = item;
	  },
	  getRemark(val){
		this.remarkItem.remark = val;
	  },
	  deleteBlog(item){
        this.$axios.post("/blog/delete",{
          blogId:item.blog_id
		}).then(res=>{
			if(res.data.status=="0"){
			   this.$message.success(res.data.msg);
			   this.searchBlog();
			}else{
			   this.$message.error(res.data.msg);
			}
		});
	  },
	  islikeFunc(item){
		let arr = [];
		if(item.blog_like===null){
          return false;
		}else{
		  arr = item.blog_like.split("、");
		  for(let i=0;i<arr.length;i++){
            if(arr[i]==this.userName){
               return true;
			}
		  }
		  return false;
		}
	  },
	  toBlogTheme(){
		this.$router.push({name:"blogTheme",params:{backgroundTheme:this.backgroundTheme}});
	  },
	  getTheme(){
		  this.$axios.post("/blog/getTheme",{personAccount:this.userName}).then(res=>{
			 if(res.data.status=="0"){
			   this.backgroundTheme = res.data.msg.blog_theme;
			 }else{
			   this.$massage.error(res.data.msg);
			 } 
		  });
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
.blog-svg{
  margin-top:10px;
  position: relative;
//   background:red;
}
.iconbutton{
  font-size:22px !important; 
  cursor: pointer;
}
.blog-img{
  height:150px;
  margin:5px 0 0 5px;
  border:1px solid #DBDBDB;
}
.forwarding{
  position:absolute;
  top:0;
  right:0;
  font-size:35px !important;
}
.icondelete{
  fill:#f56c6c;
  position:absolute;
  right:0;
}
</style>
