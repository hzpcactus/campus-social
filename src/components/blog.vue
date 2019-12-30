<template>
    <div>
    <div class="main_section_agile inner" id="home">
		
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
							<form action="#" method="post">
								<input type="search" name="Search" placeholder="查找动态相关内容" required="">
								<input type="submit" value="查找">
							</form>
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
							<span class="fa fa-user-plus" title="添加好友" aria-hidden="true" style="float:right;margin-top: 5px;cursor: pointer;" @click="popBox()"></span>
							<i class="el-icon-search" title="查找好友" style="float:right;margin-top: 5px;margin-right: 5px;cursor: pointer;" @click="popSearchBox()"></i>
							<!-- 添加好友 start  -->
                            <el-dialog title="添加好友" :visible.sync="dialogTableVisible" width="400px" :close-on-click-modal="false">
                            <el-row type="flex" align="middle">
                              <el-col :span="3">
                                <p>账号:</p>
                              </el-col>
                              <el-col :span="18">
                                <el-input size="small" v-model="findPerson" placeholder="请输入内容"></el-input>
                              </el-col>
                              <el-col :span="3" :offset="1">
                                <el-button size="small" type="primary">查找</el-button>
                              </el-col>
                            </el-row>
                           <!-- <div class="dialogDiv">-->
							  <div class="posts-grids w3-posts-grids" style="overflow:scroll;overflow-x: hidden;overflow-y: scroll;height:480px;">
								<div class="posts-grid w3-posts-grid blog_hover">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g6.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="single.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin2</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>12/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g4.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="single.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin3</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>13/8/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin4</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
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
							<!-- 添加好友 end  -->
							<!-- 查询好友 start  -->
							<el-dialog title="查找好友" :visible.sync="searchTableVisible" width="400px" :close-on-click-modal="false">
                            <el-row type="flex" align="middle">
                              <el-col :span="3">
                                <p>账号:</p>
                              </el-col>
                              <el-col :span="18">
                                <el-input size="small" v-model="findPerson" placeholder="请输入内容"></el-input>
                              </el-col>
                              <el-col :span="3" :offset="1">
                                <el-button size="small" type="primary">查找</el-button>
                              </el-col>
                            </el-row>
                           <!-- <div class="dialogDiv">-->
							  <div class="posts-grids w3-posts-grids" style="overflow:scroll;overflow-x: hidden;overflow-y: scroll;height:480px;">
								<div class="posts-grid w3-posts-grid blog_hover">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g6.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="single.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin2</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>12/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g4.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="single.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin3</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>13/8/2017</li>
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
							<div class="posts-grids w3-posts-grids" style="overflow:scroll;overflow-x: hidden;overflow-y: scroll;height:480px;">
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g6.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="single.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin2</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>12/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g4.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="single.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin3</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>13/8/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin4</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
								<div class="posts-grid w3-posts-grid">
									<div class="posts-grid-left w3-posts-grid-left">
										<a href="single.html"><img src="../assets/images/g3.jpg" alt=" " class="img1-responsive" /></a>
									</div>
									<div class="posts-grid-right w3-posts-grid-right">
										<h4><a href="mail.html"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Admin</a></h4>
										<ul class="wthree_blog_events_list">
											<li><i class="fa fa-calendar" aria-hidden="true"></i>10/7/2017</li>
											<!-- <li><i class="fa fa-user" aria-hidden="true"></i><a href="single.html">Admin</a></li> -->
										</ul>
									</div>
									<div class="clearfix"> </div>
								</div>
							</div>
						</div>
						<!-- <div class="tags tags1 w3layouts-tags">
							<h3>Recent Tags</h3>
							<ul>
								<li><a href="single.html">Designs</a></li>
								<li><a href="single.html">Growth</a></li>
								<li><a href="single.html">Latest</a></li>
								<li><a href="single.html">Price</a></li>
								<li><a href="single.html">Tools</a></li>
								<li><a href="single.html">Agile</a></li>
								<li><a href="single.html">Category</a></li>
								<li><a href="single.html">Themes</a></li>
								<li><a href="single.html">Growth</a></li>
								<li><a href="single.html">Agile</a></li>
								<li><a href="single.html">Price</a></li>
								<li><a href="single.html">Tools</a></li>
								<li><a href="single.html">Business</a></li>
								<li><a href="single.html">Category</a></li>
							</ul>
						</div> -->
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
export default {
    data() {
        return {
          userName:"用户名",
          dialogTableVisible:false,
		  searchTableVisible:false,
          findPerson:"",
          gridData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
      popBox(){
          this.dialogTableVisible=true;
      },
	  popSearchBox(){
		  this.searchTableVisible=true;
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
</style>
