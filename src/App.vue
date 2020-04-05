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
    <Header v-if="islogin"></Header>
    <router-view @personAccount="getPersonAccount"></router-view>
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
  created() {
    const h = this.$createElement;
    this.sockets.subscribe("getmsg", (data) => {
      // this.msg = data.message;
      console.log(data,data.isYN);
      if(data.personAccept==window.localStorage.getItem("personAccount")&&data.isYN==undefined){
        console.log("进来了");
        this.$notify.info({
          title: `${data.personApply}请求加您为好友`,
          dangerouslyUseHTMLString: true,
          message: h('div',null,[
                    h('p',null,data.sendmsg||""),
                    h('div',{style:{marginTop:'15px'}},[
                      h("el-button",{
                        'class':{"el-button--mini":true,"is-round":true,"el-button--primary":true},
                        on:{click:()=>{this.submitApply(data,'Y')}}
                        },"同意"),
                      h("el-button",{
                        'class':{"el-button--mini":true,"is-round":true,"el-button--danger":true},
                        on:{click:()=>{this.submitApply(data,'N')}}
                        },"拒绝")])]),
          duration: 0
        });
      }else{
        if(data.personApply==window.localStorage.getItem("personAccount")&&data.isYN=="Y"){
          this.$notify({
            title: `好友验证通过`,
            type: 'success',
            message: `${data.personAccept}已同意您的好友申请`,
            duration: 0
          });
        }
        if(data.personApply==window.localStorage.getItem("personAccount")&&data.isYN=="N"){
          this.$notify({
            title: `好友验证不通过`,
            type: 'error',
            message: `${data.personAccept}已拒绝您的好友申请`,
            duration: 0
          });
        }
        
      }
    });
    // var chat = io('http://localhost/friendApply');
    // // var chat = io.connect(`http://localhost/${window.localStorage.getItem("personAccount")}`);
     
    // chat.subscribe(`${window.localStorage.getItem("personAccount")}`, function (data) {
    //     console.log(data);
    //     //  chat.emit('hi!');
    // });
    // chat.on('connect_error', (error) => {
    //   console.log(error);
    // });
    
  },
  mounted(){
    // const h = this.$createElement;
    // this.$notify.info({
    //       title: `dd请求加您为好友`,
    //       dangerouslyUseHTMLString: true,
    //       message: h('div',null,[
    //         h('p',null,"测试测试"),
    //         h('div',{style:{marginTop:'15px'}},[
    //           h("el-button",{
    //             'class':{"el-button--mini":true,"is-round":true,"el-button--primary":true},
    //             on:{click:this.submitApply}
    //             },"同意"),
    //           h("el-button",{
    //             'class':{"el-button--mini":true,"is-round":true,"el-button--danger":true},on:{click:this.submitApply}},"拒绝")])]),
    //       duration: 0
    //     });
    //  this.$socket.open();
    // this.$axios.post("/users",{personAccount:window.localStorage.getItem("personAccount")}).then(res=>{
    //    console.log(res.data);
    //  });
//     var timerOne = window.setInterval(() => {

//       if (this.$socket) {

//         this.$socket.emit('connectmessage', "连接成功!!!!!!!!!!!!!!!")

//         window.clearInterval(timerOne)

//         return;

//       }

//     }, 500);
  },
  methods: {
    getPersonAccount(val){
      this.islogin=false;
      if(val!=""){
        this.personAccount=val;
      }
      this.$nextTick(()=>{
        this.islogin=true;
      })
      
    },
    submitApply(data,isYN){
      console.log(data,isYN);
      Object.assign(data,{"isYN":isYN});  //{personApply,personAccept,sendmsg}
      this.$axios.post("/friends/friendsApply",data).then(res=>{
        if(res.data.status="0"&&res.data.msg=="已同意"){
          this.$message.success(res.data.msg);
          this.$socket.emit("sendmsg", data);
        }else if(res.data.status="0"&&res.data.msg=="已拒绝"){
          this.$message.error(res.data.msg);
          this.$socket.emit("sendmsg", data);
        }else{
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  watch:{
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
