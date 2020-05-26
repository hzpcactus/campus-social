<template>
  <div>
    <div class="bg-img" v-show="!isHaveMsg"></div>
    <el-card shadow="hover" class="card" v-for="(item,index) in messageList" :key="index">
      <el-row>
          <el-col :span="1">
            <el-avatar :src="item.person_picture"></el-avatar>
          </el-col>
          <el-col :span="23" style="padding:0 10px;">
              <el-row>
                <el-col :span="24">
                  <b>{{item.remark_account}}</b>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <p>{{item.remark_time}}</p>
                </el-col>
              </el-row>
          </el-col>
      </el-row>
      <div style="margin-top:10px;">
        <svg class="icon iconbutton" style="fill:#00b7f1" aria-hidden="true">
		  <use xlink:href="#icon-pinglun"></use>
		</svg>
        <span>评论了你的动态：</span>
        <span v-html="item.remark_content"></span>
      </div>
      <div class="blog-show">
         <b>{{item.blog_sender}}</b>：<span v-html="item.blog_content"></span>
         <div style="padding:20px;" v-if="item.blog_picture.split(',').length>0||item.blog_picture==null">
            <img class="blog-img" v-for="(item1,index1) in item.blog_picture.split(',')" :key="index1" :src="item1">
         </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      isHaveMsg:true,
      messageList:[],
    }
  },
  created(){},
  mounted(){
      this.getRemark();
  },
  watch:{},
  computed:{},
  methods:{
    getRemark(){
      this.$axios.post("/notice/getRemark",{personAccount:window.localStorage.getItem("personAccount")}).then(res=>{
        if(res.data.status=="1"){
          this.$message.error(res.data.msg);
        }else{
          this.messageList=res.data.msg;
          this.isHaveMsg=this.messageList.length>0?true:false;
        }
      });
    },
  },
}
</script>
<style lang="less" scoped>
.bg-img{
  width: 402px;
  height: 304px;
  position: absolute;
  left: 50%;  /* 父盒子宽度的50% */
  top: 50%;   /* 父盒子高度的50% */
  transform: translate(-50%,-50%);    /* 子盒子自身宽高的50% */   
  background: url(http://s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/placeholder.6b466963.png) center/contain no-repeat;
}
.card{
  width: 100%;
  display: inline-block;
  margin: 0 auto;
  background: rgba(221,240,248,0.5);
}
.blog-show{
  width:100%;
  background:#f4f4f4;
  padding:15px;
  margin-top: 10px;
}
.blog-img{
  height:150px;
  margin:5px 0 0 5px;
  border:1px solid #DBDBDB;
}
</style>