<template>
    <div>
      <!-- banner -->

	<div class="main_section_agile inner" id="home">
		
	</div>
	<!-- //banner -->
	<!--/w3_short-->
	<div class="services-breadcrumb">
		<div class="agile_inner_breadcrumb">

			<ul class="w3_short">
				<li><a href="index.html">主页</a><span>|</span></li>
				<li v-if="islogin">登录</li>
          <li v-if="!islogin">注册</li>
			</ul>
		</div>
	</div>
	<!--//w3_short-->
      <!-- /icons-->
	<div class="contact-form agile_inner_grids">    
        <div class="banner-bottom inner">
            <div class="container">
                <div class="wthree_head_section">
                    <h3 class="w3l_header w3_agileits_header" v-if="islogin">登录 <span> 页面 </span></h3>
                    <h3 class="w3l_header w3_agileits_header" v-if="!islogin">注册 <span> 页面 </span></h3>
                </div>
                <div class="wthree_head_section" v-if="!islogin">
                <el-steps :active="steps" finish-status="success" class="steps_style" align-center>
                  <el-step title="注册账号"></el-step>
                  <el-step title="实名认证"></el-step>
                  <el-step title="审核"></el-step>
                </el-steps>
                </div>
                <div class="fields-grid" v-if="islogin||steps==0">
                    <div class="styled-input">
                        <input type="text" required="" name="username" id="username">
                        <label>账号</label>
                        <span></span>
                    </div>
                    <div class="styled-input">
                        <input type="text" required="" name="password" id="password">
                        <label>密码</label>
                        <span></span>
                    </div>
                </div>
                <div v-if="steps==1">
                    <div class="styled-input">
                        <input type="text" required="" name="password" id="password">
                        <label>姓名</label>
                        <span></span>
                    </div>
                    <div class="styled-input">
                        <input type="text" required="" name="password" id="password">
                        <label>身份证号</label>
                        <span></span>
                    </div>
                    <div class="fields-grid_first">
                      <span class="sex_style">性别&nbsp;&nbsp;&nbsp;</span>
                      <el-radio-group v-model="sex" @change="changeSex" :fill="sexCss">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                      </el-radio-group>
                    </div>
                    <div class="fields-grid_first">
                      <span class="sex_style">出生年月&nbsp;&nbsp;&nbsp;</span>
                      <el-date-picker
                        v-model="birthday"
                        prefix-icon="none"
                        type="date">
                      </el-date-picker>
                    </div>
                    <div class="fields-grid_first">
                      <span class="sex_style">所在地&nbsp;&nbsp;&nbsp;</span>
                      <el-cascader
                        :options="options"
                        v-model="selectedOptions"
                        :props="{ expandTrigger: 'hover' }"
                        size="medium"
                        @change="handleChange"
                        style="width:300px"
                        >
                       </el-cascader>
                    </div>
                    <div class="styled-input">
                        <input type="text" required="" name="password" id="password">
                        <label>详细地址</label>
                        <span></span>
                    </div>
                </div>
                <input type="button" value="返回" id="login_btn" @click="back" v-if="steps==0">
                <input type="button" value="上一步" id="login_btn" @click="previous" v-if="!islogin&&steps!=0">
                <input type="button" value="下一步" id="login_btn" v-if="!resgistOver&&!islogin" @click="next">
                <input type="button" value="完成" id="login_btn" v-if="resgistOver" @click="finishResgist">
                <input type="button" value="登录" id="login_btn" v-if="islogin">&nbsp;&nbsp;
                <input type="button" value="注册" id="registered_btn" @click="registered" v-if="islogin">
            </div>
        </div>
    </div>
    <!-- //icons -->
    </div>
</template>

<script>
import {regionData} from 'element-china-area-data'
export default {
    data() {
      return {
        islogin:true,
        resgistOver:false,
        sexCss:"#409EFF",
        sex:"男",
        steps:-1,
        options: regionData,
        selectedOptions: [],
        birthday:"",
      };
    },
    created() {

    },
    mounted() {

    },
    methods: {
      back(){
        this.islogin=true;
        this.steps=-1;
      },
      registered(){
        this.islogin=false;
        this.steps=0;
      },
      changeSex(val){
        if(val=="女"){
          this.sexCss="lightpink";
        }else{
          this.sexCss="#409EFF";
        }
      },
      handleChange (value) {
        console.log(value)
      },
      finishResgist(){
        this.resgistOver=false;
        this.back();
      },
      previous(){
        if(this.steps!=0){
          this.steps--;
        }
        this.resgistOver=false;
      },
      next(){
        this.resgistOver=(this.steps==2)?true:false;
        this.steps++;
      }
    }
};
</script>

<style scoped lang="less">
.sex_style{
    color: #2c2c2d;
    pointer-events: none;
    line-height: 1em;
    letter-spacing: 2px;
    font-weight: 600;
    font-size: 1em;
}
.steps_style{
    margin-top:30px;
}
.fields-grid_first{
    margin: 2em 0 2em 0em;
}
</style>
