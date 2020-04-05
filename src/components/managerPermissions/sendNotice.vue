<template>
  <div>
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="2">
        <span>题目：</span> 
      </el-col>
      <el-col :span="22">
        <el-input v-model="title" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin:20px 0;">
      <el-col :span="2">
        <span>内容：</span> 
      </el-col>
      <el-col :span="22">
        <div 
        contenteditable="true" 
        class="textareaDiv" 
        v-html="content" 
        @blur="content=$event.target.innerHTML"
        ref="textarea"
        >
      
        </div>
        <div class="func">
          <el-tooltip class="item" effect="dark" content="添加链接" placement="right">
            <svg class="icon" aria-hidden="true" @click="centerDialogVisible = true">
              <use xlink:href="#icon-lianjie"></use>
            </svg>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end" style="margin:20px 0;">
      <el-col :span="20">
      </el-col>
      <el-col :span="4">
        <el-button type="danger" @click="reset">重置</el-button>
        <el-button type="primary" @click="send">发布</el-button>
      </el-col>
    </el-row>
    <el-dialog
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <el-row type="flex" align="middle">
      <el-col :span="5">
        <span>链接地址：</span>
      </el-col>
      <el-col :span="19">
        <el-input v-model="urlPath" placeholder="请输入内容" @keyup.enter.native="addLink"></el-input>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false;urlPath='';">取 消</el-button>
        <el-button type="primary" @click="addLink">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      title:"",
      content:"",
      centerDialogVisible:false,
      urlPath:""
    }
  },
  created(){},
  mounted(){},
  watch:{},
  computed:{},
  methods:{
    reset(){
      this.title="";
      this.content="";
    },
    send(){
       this.content="<span>"+this.content+"</span>";
       this.$axios.post("/notice/send",{title:this.title,content:this.content,noticeType:"notice"}).then(res=>{
          if(res.data.status=="0"){
            this.$message.success(res.data.msg);
            this.reset();
          }else{
            this.$message.error(res.data.msg);
          }
       });
    },
    changeContent(){
      this.content = this.$refs.textarea.innerHTML;
      console.log(this.$refs.textarea.innerHTML);
    },
    addLink(){
      this.centerDialogVisible = false;
      let url = this.urlPath;
      this.content+=`
        <a href="${url}" target="_blank">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-lianjie"></use>
        </svg>&nbsp;网页链接
       </a>&nbsp;
      `;
      this.urlPath="";
      console.log(this.content);
    }
  },
}
</script>
<style lang="less" scoped>
 .func{
    width:100%;
    height:30px;
    padding:5px;
    // background: red;
    position: relative;
    top:-30px;
 }
.icon{
  font-size:20px !important; 
  cursor: pointer;
}
.icon:hover{
  color: #409EFF !important;
}
.textareaDiv{
   width:100%;
   height:150px;
   border-radius: 3px;
   border: 1px solid #ebebeb;
   padding:5px;
   transition: 0.2s;
   background: white;
}
</style>