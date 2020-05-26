<template>
  <div>
    <div class="bg-img" v-show="!isHaveMsg"></div>
    <el-card shadow="hover" v-show="isHaveMsg" class="card" v-for="item in messageList" :key="item.notice_time">
    <div>
      <b>{{item.notice_title}}</b>
      <span style="color:#999;">{{changeDate(item.notice_time)}}</span>
      </div>
      <div style="margin-top:5px;" v-html="'&nbsp;&nbsp;&nbsp;'+item.notice_content"></div>
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
    this.getNotice();
  },
  watch:{},
  computed:{},
  methods:{
    getNotice(){
      this.$axios.post("/notice/systematicNotification",{noticeType:"notice",personAccount:window.localStorage.getItem("personAccount")}).then(res=>{
        if(res.data.status=="1"){
          this.$message.error(res.data.msg);
        }else{
          this.messageList=res.data.msg;
          this.isHaveMsg=this.messageList.length>0?true:false;
        }
      });
    },
    changeDate(date){
      let dateTime = new Date(new Date(date).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''));
      Date.prototype.Format = function(fmt)
      {  
        var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
        };
        if(/(y+)/.test(fmt))
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
          if(new RegExp("("+ k +")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      }
      return dateTime.Format("yyyy年MM月dd日 hh:mm");
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
  background:url(http://s1.hdslb.com/bfs/static/blive/live-web-center/static/img/2.273d197.png) no-repeat center top #fff;
  // background: url(//s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/placeholder.6b466963.png) center/contain no-repeat;
}
.card{
  width: 100%;
  display: inline-block;
  margin: 0 auto;
  background: rgba(226,244,255,0.5);
}
</style>