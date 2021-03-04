<template>
  <div></div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      
    }
  },
  created(){},
  mounted(){
      // this.getFriendsAccept();
  },
  watch:{},
  computed:{},
  methods:{
    getFriendsAccept(){
      if(window.localStorage.getItem("personAccount")) {
        this.$axios.post("/notice/systematicNotification",{noticeType:"friendsValidation",personAccount:window.localStorage.getItem("personAccount")}).then(res=>{
          if(res.data.status=="1"){
            this.$message.error(res.data.msg);
          }else{
            this.messageList=res.data.msg;
            this.isHaveMsg=this.messageList.length>0?true:false;
          }
        });
      }else {
        this.isHaveMsg = false;
      }
    },
  },
}
</script>
<style lang="less" scoped>

</style>