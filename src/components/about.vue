<template>
 <div>
<!-- banner -->

	<div class="main_section_agile inner" id="home" style="text-align:center;">
		<el-avatar class="avatar" :src="imgUrl"></el-avatar>
    <span style="color:white;font-weight:bold;font-size:35px;display:block;margin-top:25px;">{{this.personInfoForm.personAccount}}</span>
	</div>
	<!-- //banner -->
	<!--/w3_short-->
	<div class="services-breadcrumb">
		<div class="agile_inner_breadcrumb">

			<ul class="w3_short">
				<li><a href="index.html">主页</a><span>|</span></li>
				<li>个人信息</li>
			</ul>
		</div>
	</div>
    <!--//w3_short-->

   <!-- /mail -->
    <div class="banner-bottom inner">
        <div class="container">
            <div class="wthree_head_section">
                <h3 class="w3l_header w3_agileits_header">个人信息</h3>
            </div>
          <div class="agile_wthree_inner_grids">
          <!-- <div class="contact_img_agile">
		</div> -->
		<div class="contact-form agile_inner_grids">
				<div class="fields-grid">
                  <el-form :model="personInfoForm" :rules="personRules" ref="personRuleForm" label-width="120px" class="demo-ruleForm">
					          <el-form-item label="账号：" prop="personAccount">
                      <el-input disabled v-model="personInfoForm.personAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="personPassword" show-password>
                      <el-input :disabled="!isEdit" v-model="personInfoForm.personPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="personName">
                      <el-input :disabled="!isEdit" v-model="personInfoForm.personName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：" prop="personIdCard">
                      <el-input disabled v-model="personInfoForm.personIdCard"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" prop="personSex">
                      <el-radio-group v-model="personInfoForm.personSex" :disabled="!isEdit"  @change="changeSex" :fill="sexCss">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="出生年月：" prop="personBirthday">
                      <el-date-picker
                        v-model="personInfoForm.personBirthday"
                        :disabled="!isEdit"
                        prefix-icon="none"
                        style="width:100%;"
                        type="date"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </el-form-item>
					          <el-form-item label="所在地：" prop="personPlace">
                      <el-cascader
                        :options="options"
                        :disabled="!isEdit"
                        v-model="personInfoForm.personPlace"
                        :props="{ expandTrigger: 'hover' }"
                        size="medium"
                        style="width:100%;"
                        >
                      </el-cascader>
                    </el-form-item>
                    <el-form-item label="个人头像：" prop="personPicture">
                      <el-upload
                        class="upload-demo"
                        action="/users/upload/headImage"
                        :on-preview="handlePreview"
                        :on-success="handleSuccess"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :disabled="!isEdit"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary" :disabled="!isEdit">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="学校：" prop="personSchool">
                      <el-select v-model="personInfoForm.personSchool" :disabled="!isEdit" filterable placeholder="请选择" prefix-icon="none" style="width:100%;">
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
                    <el-form-item label="专业：" prop="personProfessional">
                      <el-input
                        type="text" 
                        placeholder="请输入内容"
                        :disabled="!isEdit"
                        v-model="personInfoForm.personProfessional">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="年级：" prop="personGrade">
                      <el-date-picker
                        v-model="personInfoForm.personGrade"
                        type="year"
                        :disabled="!isEdit"
                        placeholder="请选择"
                        prefix-icon="none" 
                        style="width:100%;"
                        value-format="yyyy"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="个性签名：" prop="personSignature">
                      <el-input
                        type="textarea" 
                        :disabled="!isEdit"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="personInfoForm.personSignature">
                      </el-input>
                    </el-form-item>
                  </el-form>
				</div>
				
				<input type="button" value="修改" v-if="!isEdit" @click="change">
				<input type="button" value="保存" v-if="isEdit" @click="save">
		</div>
		<!-- <div class="clearfix"> </div> -->
          </div>
        </div>
    </div>
 </div>
</template>

<script>
import {regionData} from 'element-china-area-data'

 export default {
   data () {
     return {
        isEdit:false,
        personInfoForm:{
          personAccount:"",
          personPassword:"",
          personName:"",
          personIdCard:"",
          personSex:"女",
          personPlace: [],
          personBirthday:"",
          personSignature:"",
          personPicture:"",
          personSchool:"",
          personProfessional:"",
          personGrade:"",
        },
        schoolList:[],
        fileList:[],
        sexCss:"#409EFF",
        options: regionData,
        imgUrl:"",

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
     }
   },
   components: {

   },
   created() {

   },
   mounted() {
     this.imgUrl = window.localStorage.getItem("personPicture");
     let personAccount=window.localStorage.getItem("personAccount");
     let personPassword=window.localStorage.getItem("personPassword");
     if(personAccount&&personPassword){
        this.$axios.get("/users/school",{}).then(res=>{
            // console.log(res);
            this.schoolList=res.data.msg;
            // console.log(this.schoolList);
        });
        this.$axios.post("/users/search",{
            personAccount:window.localStorage.getItem("personAccount"),
            personPassword:window.localStorage.getItem("personPassword")
        }).then(res=>{
            if(res.data.status=="0"){
                this.personInfoForm.personAccount=res.data.msg.person_account;
                this.personInfoForm.personPassword=res.data.msg.person_password;
                this.personInfoForm.personName=res.data.msg.person_name;
                this.personInfoForm.personIdCard=res.data.msg.person_id_card;
                this.personInfoForm.personSex=res.data.msg.person_sex;
                this.personInfoForm.personBirthday=res.data.msg.person_birthday;
                this.personInfoForm.personPlace=res.data.msg.person_place.split(",");
                this.personInfoForm.personSignature=res.data.msg.person_signature;
                this.personInfoForm.personSchool=res.data.msg.person_school;
                this.personInfoForm.personProfessional=res.data.msg.person_professional;
                this.personInfoForm.personGrade=res.data.msg.person_grade.toString();
                this.personInfoForm.personPicture=res.data.msg.person_picture;
                this.fileList=[{name:this.personInfoForm.personAccount+'的头像.jpg',url:this.personInfoForm.personPicture}];
                console.log(this.fileList);
            }else{
                this.$message.error(res.data.msg);
            }
        });
     }else{
        this.$message.warning("请登录！"); 
        this.$router.push({path:"/login"});
     }
     
     this.personInfoForm.personSex=="女"?this.sexCss="lightpink":this.sexCss="#409EFF";
   },
   methods:{
      save(){
        this.$refs["personRuleForm"].validate((valid) => {
          if(valid){
            this.personInfoForm.personBirthday=this.personInfoForm.personBirthday.split("T")[0];
            this.$axios.post("/users/update",this.personInfoForm).then(res=>{
              if(res.data.status=="0"){
                this.$message.success(res.data.msg);
                this.isEdit=false;
              }else{
                this.$message.error(res.data.msg);
              }
            }); 
          }else{
            this.$message.error('请输入必填项');
            return false;
          }
        });
      },
      change(){
        this.isEdit=true;
      },
      changeSex(val){
        if(val=="女"){
          this.sexCss="lightpink";
        }else{
          this.sexCss="#409EFF";
        }
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
 }
</script>

<style scoped>
   .contact-form.agile_inner_grids{
       padding:0 !important;
   }
   .avatar{
     width:120px;
     height:120px;
     margin-top:120px;
   }

 
</style>
