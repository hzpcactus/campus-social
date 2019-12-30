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
                  <el-step title="上传信息"></el-step>
                </el-steps>
                </div>
                <div class="fields-grid" v-if="islogin||steps==0">
                  <el-form :model="userForm" :rules="userRules" ref="userRuleForm" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="userName">
                      <el-input v-model="userForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userPassword" show-password>
                      <el-input v-model="userForm.userPassword"></el-input>
                    </el-form-item>
                    <!--<div class="styled-input">
                        <el-input type="text" required="" name="username" id="username"></el-input>
                        <label>账号</label>
                        <span></span>
                    </div>
                    <div class="styled-input">
                        <input type="text" required="" name="password" id="password">
                        <label>密码</label>
                        <span></span>
                    </div>-->
                    </el-form>
                </div>
                <div v-if="steps==1">
                  <el-form :model="userInfoForm" :rules="userRules" ref="userRuleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="userRealName">
                      <el-input v-model="userInfoForm.userRealName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="userIdCard">
                      <el-input v-model="userInfoForm.userIdCard"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                      <el-radio-group v-model="userInfoForm.sex" @change="changeSex" :fill="sexCss">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="出生年月" prop="birthday">
                      <el-date-picker
                        v-model="userInfoForm.birthday"
                        prefix-icon="none"
                        style="width:100%;"
                        type="date"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="所在地" prop="userPlace">
                      <el-cascader
                        :options="options"
                        v-model="userInfoForm.userPlace"
                        :props="{ expandTrigger: 'hover' }"
                        size="medium"
                        @change="handleChange"
                        style="width:100%;"
                        >
                      </el-cascader>
                    </el-form-item>
                    <!--<div class="styled-input">
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
                    </div>-->
                  </el-form>
                </div>
                <div v-if="steps==2">
                  <el-form :model="userInfoForm" :rules="userRules" ref="userRuleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="个人头像" prop="userPicture">
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :headers="requestImgHeader"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <img v-if="userInfoForm.headImageUrl" :src="userInfoForm.headImageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="个性签名" prop="userSignature">
                      <el-input
                        type="textarea" 
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="userInfoForm.userSignature">
                      </el-input>
                    </el-form-item>
                  </el-form>
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
        requestImgHeader:{
          "Access-Control-Allow-Headers":"Content-Type, api_key, Authorization",
          "Access-Control-Allow-Origin":"*"
        },
        userForm:{
          userName:"",
          userPassword:""
        },
        userInfoForm:{
          sex:"",
          userPlace: [],
          birthday:"",
          headImageUrl:"",
          userSignature:"",
        },
        userRules:{
          userName:[{required:true,message:'请输入账号',trigger:'blur'}],
          userPassword:[{required:true,message:'请输入密码',trigger:'blur'}],
          userRealName:[{required:true,message:'请输入姓名',trigger:'blur'}],
          userIdCard:[{required:true,message:'请输入身份证号',trigger:'blur'}],
          userIdCard:[{required:true,message:'请输入身份证号',trigger:'blur'}],
          sex:[{required:true,message:'请选择性别',trigger:'change'}],
          birthday:[{ type: 'date',required:true,message:'请选择出生年月',trigger:'change'}],
          userPlace:[{type: 'array',required:true,message:'请选择所在地',trigger:'change'}],
          userPicture:[{required:true,message:'请上传头像',trigger:'change'}]
        },

        islogin:true,
        resgistOver:false,
        sexCss:"#409EFF",
        steps:-1,
        options: regionData,
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
        // switch(this.steps){
        //   case -1:
        //     this.submitForm(userRuleForm); 
        //     break;
        //   case 0:
        //     this.submitForm(userRuleForm); 
        //     break;
        //   case 1:
        //     this.submitForm(userInfoRuleForm); 
        //     break;
        // }
        console.log(this.steps);
        this.$refs["userRuleForm"].validate((valid) => {
          if (valid) {
            this.steps++;
            this.resgistOver=(this.steps==2)?true:false;
          }else{
            this.$message.error('请输入必填项');
            return false;
          }
        });
        
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.$message.error('请输入必填项');
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
        console.log(res,file);
        this.headImageUrl = URL.createObjectURL(file.raw);
        console.log(this.headImageUrl);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
};
</script>

<style scoped>

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
//上传头像
 .avatar-uploader .el-upload {
     border: 1px dashed #d9d9d9;
     border-radius: 6px;
     cursor: pointer;
     position: relative;
     overflow: hidden;
   }
  .avatar-uploader-icon:hover {
     border-color: #409EFF;
   }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
