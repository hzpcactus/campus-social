<template>
  <div id="app">
    <el-backtop :bottom="55">
     <el-tooltip class="item" effect="dark" content="回到顶部" placement="top-start">
      <el-button circle>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huojian"></use>
        </svg>
      </el-button>
     </el-tooltip> 
    </el-backtop>
    <!--<img src="./assets/logo.png">
    <Index></Index>-->
    <Header v-if="islogin" :chatMsg="chatMsg"></Header>
    <router-view :chatMsg="chatMsg" @personAccount="getPersonAccount"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Index from '@/components/index.vue'
import Footer from '@/components/footer.vue'
import Header from '@/components/Header.vue'
import '@/tools/weather.js'
import io from 'socket.io-client'
export default {
  name: 'App',
  components:{
    Index,
    Footer,
    Header
  },
  data () {
    return {
      personAccount:"",
      islogin:true,
      chatMsg:{}
    }
  },
  sockets: {
    connect: function () {
        console.log('socket connected')
    },
    customEmit: function (data) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    // test1(data){console.log(data);}
  },
  created(){},
  mounted(){
    if(window.localStorage.getItem("personAccount")){
      this.loginSocket();
    }
    this.getFriendApply();
  },
  methods: {
    getFriendApply(){
      const h = this.$createElement;
      this.sockets.subscribe("getFriendApply", (data) => {
        // this.msg = data.message;
        console.log(data,data.isYN);
        if(data.to_person_id==window.localStorage.getItem("personAccount")&&data.isYN==undefined){
          console.log("进来了");
          this.$notify.info({
            title: `${data.from_person_id}请求加您为好友`,
            dangerouslyUseHTMLString: true,
            message: h('div',null,[
                      h('p',null,data.sendmsg||""),
                      h('div',{style:{marginTop:'15px'}},[
                        h("el-button",{
                          'class':{"el-button--mini":true,"is-round":true,"el-button--primary":true},
                          on:{click:()=>{this.submitApply(data,'Y',this.$notify)}}
                          },"同意"),
                        h("el-button",{
                          'class':{"el-button--mini":true,"is-round":true,"el-button--danger":true},
                          on:{click:()=>{this.submitApply(data,'N',this.$notify)}}
                          },"拒绝")])]),
            duration: 0
          });
        }else{
          if(data.to_person_id==window.localStorage.getItem("personAccount")&&data.isYN=="Y"){
            this.$notify({
              title: `好友验证通过`,
              type: 'success',
              message: `${data.from_person_id}已同意您的好友申请`,
              duration: 0
            });
          }
          if(data.to_person_id==window.localStorage.getItem("personAccount")&&data.isYN=="N"){
            this.$notify({
              title: `好友验证不通过`,
              type: 'error',
              message: `${data.from_person_id}已拒绝您的好友申请`,
              duration: 0
            });
          }
          
        }
      });
    },
    getPersonAccount(val){
      this.islogin=false;
      if(val!=""){
        this.personAccount=val;
      }
      this.$nextTick(()=>{
        this.islogin=true;
      })
      
    },
    submitApply(data,isYN,notify){
      console.log(data,isYN,notify);
      Object.assign(data,{"isYN":isYN});  //{from_person_id,to_person_id,sendmsg}
      this.$axios.post("/friends/friendsApply",data).then(res=>{
        if(res.data.status="0"&&res.data.msg=="已同意"){
          this.$message.success(res.data.msg);
          data.to_person_id = data.from_person_id;
          data.from_person_id = window.localStorage.getItem("personAccount");
          this.$socket.emit("sendFriendApply", data);
          notify.close();
        }else if(res.data.status="0"&&res.data.msg=="已拒绝"){
          this.$message.error(res.data.msg);
          data.to_person_id = data.from_person_id;
          data.from_person_id = window.localStorage.getItem("personAccount");
          this.$socket.emit("sendFriendApply", data);
          notify.close();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    loginSocket(){
      console.log("发送了登录");
      this.$socket.emit('login',window.localStorage.getItem("personAccount"));
      this.sockets.subscribe('addMsg',(msg)=>{
         console.log("收到了",msg);
         this.chatMsg = msg;
      })
    }
  },
  watch:{
    personAccount(val){
       if(this.personAccount){
         this.loginSocket();
       }
    }
  }
}
</script>

<style>
#weather-float-he{
  z-index:3000;
  position: fixed !important;
}
.icon{
  font-size:18px !important;
}
</style>
