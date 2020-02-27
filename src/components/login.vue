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
                  <el-form :model="personForm" :rules="personRules" ref="personRuleForm" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="personAccount">
                      <el-input v-model="personForm.personAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="personPassword" show-password>
                      <el-input v-model="personForm.personPassword"></el-input>
                    </el-form-item>
                    <!--<div class="styled-input">
                        <el-input type="text" required="" name="personAccount" id="personAccount"></el-input>
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
                  <el-form :model="personInfoForm" :rules="personRules" ref="personRuleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="personName">
                      <el-input v-model="personInfoForm.personName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="personIdCard">
                      <el-input v-model="personInfoForm.personIdCard"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="personSex">
                      <el-radio-group v-model="personInfoForm.personSex" @change="changeSex" :fill="sexCss">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="出生年月" prop="personBirthday">
                      <el-date-picker
                        v-model="personInfoForm.personBirthday"
                        prefix-icon="none"
                        style="width:100%;"
                        type="date"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="所在地" prop="personPlace">
                      <el-cascader
                        :options="options"
                        v-model="personInfoForm.personPlace"
                        :props="{ expandTrigger: 'hover' }"
                        size="medium"
                        @change="handleChange"
                        style="width:100%;"
                        >
                      </el-cascader>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-if="steps==2">
                  <el-form :model="personInfoForm" :rules="personRules" ref="personRuleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="个人头像" prop="personPicture">
                      <el-upload
                        class="upload-demo"
                        action="/users/upload/headImage"
                        :on-preview="handlePreview"
                        :on-success="handleSuccess"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="学校" prop="personSchool">
                      <el-select v-model="personInfoForm.personSchool" filterable placeholder="请选择" prefix-icon="none" style="width:100%;">
                        <el-option
                          v-for="item in schoolList"
                          :key="item.id"
                          :value="item.name"
                          :label="item.name"
                        >
                          <span>{{ item.name }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.place }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="专业" prop="personProfessional">
                      <el-input
                        type="text" 
                        placeholder="请输入内容"
                        v-model="personInfoForm.personProfessional">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="年级" prop="personGrade">
                      <el-date-picker
                        v-model="personInfoForm.personGrade"
                        type="year"
                        placeholder="请选择"
                        prefix-icon="none" 
                        style="width:100%;"
                        value-format="yyyy"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="个性签名" prop="personSignature">
                      <el-input
                        type="textarea" 
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="personInfoForm.personSignature">
                      </el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <input type="button" value="返回" id="login_btn" @click="back" v-if="steps==0">
                <input type="button" value="上一步" id="login_btn" @click="previous" v-if="!islogin&&steps!=0">
                <input type="button" value="下一步" id="login_btn" v-if="!resgistOver&&!islogin" @click="next">
                <input type="button" value="完成" id="login_btn" v-if="resgistOver" @click="finishResgist">
                <input type="button" value="登录" id="login_btn" v-if="islogin" @click="login">&nbsp;&nbsp;
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
        personForm:{
          personAccount:"",
          personPassword:""
        },
        personInfoForm:{
          personAccount:"",
          personPassword:"",
          personName:"",
          personIdCard:"",
          personSex:"",
          personPlace: [],
          personBirthday:"",
          // headImageUrl:"",
          personSignature:"",
          personPicture:"",
          personSchool:"",
          personProfessional:"",
          personGrade:"",
        },
        schoolList:[],
        fileList:[],

        personRules:{
          personAccount:[{required:true,message:'请输入账号',trigger:'blur'}],
          personPassword:[{required:true,message:'请输入密码',trigger:'blur'}],
          personName:[{required:true,message:'请输入姓名',trigger:'blur'}],
          personIdCard:[{required:true,message:'请输入身份证号',trigger:'blur'}],
          personSex:[{required:true,message:'请选择性别',trigger:'change'}],
          personBirthday:[{ required:true,message:'请选择出生年月',trigger:'change'}],
          personPlace:[{type: 'array',required:true,message:'请选择所在地',trigger:'change'}],
          personPicture:[{required:true,message:'请上传头像',trigger:'change'}],
          personSchool:[{required:true,message:'请选择学校',trigger:'blur'}],
          personProfessional:[{required:true,message:'请输入专业',trigger:'blur'}],
          personGrade:[{required:true,message:'请选择年级',trigger:'blur'}],
          
        },

        islogin:true,
        resgistOver:false,
        sexCss:"#409EFF",
        steps:-1,
        options: regionData,
      };
    },
    watch: {
      personForm: {
        handler(newName,oldName){
           this.personInfoForm.personAccount=this.personForm.personAccount;
           this.personInfoForm.personPassword=this.personForm.personPassword;
        },
        deep: true,
        immediate: true
      },
      // "personInfoForm.personPlace": {
      //   handler(newName,oldName){
      //     this.personInfoForm.personPlace=this.personInfoForm.personPlace.join(",");
      //   },
      //   deep: true,
      //   immediate: true
      // }
    },
    created() {

    },
    mounted() {
      this.$axios.get("/users/school",{}).then(res=>{
        // console.log(res);
        this.schoolList=res.data.msg;
        console.log(this.schoolList);
      });

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
      login(){
        this.$axios.post("/users/login",this.personForm).then(res=>{
           if(res.data.status=="0"){   //登录成功
             this.$message.success("登录成功！");
             window.localStorage.setItem("personAccount",this.personInfoForm.personAccount);
             window.localStorage.setItem("personPassword",this.personInfoForm.personPassword);
             window.localStorage.setItem("personPicture",res.data.msg.person_picture);
             this.$emit('personAccount', this.personInfoForm.personAccount);
             this.$router.push({path:'/'})
           }else{   
             this.$message.warning(res.data.msg);
           }
        });
      },
      finishResgist(){
        this.$refs["personRuleForm"].validate((valid) => {
          console.log(this.personInfoForm);
          if (valid) {
            // this.resgistOver=false;
            this.$axios.post("/users/registered",this.personInfoForm).then(res=>{
              if(res.data.status=="1"){          //注册失败
                this.$message.error(res.data.msg);
                this.resgistOver=true;
              }else{             //注册成功
                this.$message.success(res.data.msg);
                this.steps=-1;
                this.islogin=true;
                this.resgistOver=false;

                //表单初始化
                window.localStorage.setItem("personAccount",this.personInfoForm.personAccount);
                window.localStorage.setItem("personPassword",this.personInfoForm.personPassword);
                window.localStorage.setItem("personPicture",this.personInfoForm.personPicture);
                this.personInfoForm.personName="";
                this.personInfoForm.personIdCard="";
                this.personInfoForm.personSex="";
                this.personInfoForm.personPlace= [];
                this.personInfoForm.personBirthday="";
                this.personInfoForm.personSignature="";
                this.personInfoForm.personPicture="";
                this.personInfoForm.personSchool="";
                this.personInfoForm.personProfessional="";
                this.personInfoForm.personGrade="";
                this.$emit('personAccount', this.personInfoForm.personAccount);
                this.$router.push({path:'/'});
              }
            });
          }else{
            this.$message.error('请输入必填项');
            return false;
          }
         });
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
        //     this.submitForm(personRuleForm); 
        //     break;
        //   case 0:
        //     this.submitForm(personRuleForm); 
        //     break;
        //   case 1:
        //     this.submitForm(personInfoRuleForm); 
        //     break;
        // }
        console.log(this.steps);
        this.$refs["personRuleForm"].validate((valid) => {
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
      handleSuccess(response,file,fileList){
        console.log(response);
        this.personInfoForm.personPicture=response.personPicture;
      },
      beforeUpload(file){
        console.log(file);
      },
      handleRemove(file, fileList) {
        this.$axios.post("/users/delete/headImage",{
          personPicture:this.personInfoForm.personPicture
        }).then(res=>{
          console.log(res);
           if(res.data.status=="0"){    //成功
             this.personInfoForm.personPicture="";
             this.$message.success(`${res.data.msg}`);
           }else{
             this.$message.error(`${res.data.msg}`);
           }
        });
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
/*上传头像*/
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
