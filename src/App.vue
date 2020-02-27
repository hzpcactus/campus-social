<template>
  <div id="app">
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
    // console.log(window.localStorage.getItem("personAccount"));
    this.sockets.subscribe("getmsg", (data) => {
      // this.msg = data.message;
      console.log(data);
      if(data.personAccept==window.localStorage.getItem("personAccount")){
        this.$notify.info({
          title: `${data.personApply}请求加您为好友`,
          dangerouslyUseHTMLString: true,
          message: `<p>${data.sendmsg||""}</p> <div style="margin-top:15px;"> <button type="button" class="el-button el-button--primary el-button--mini is-round"><!----><!----><span>同意</span></button> <button type="button" class="el-button el-button--danger el-button--mini is-round"><!----><!----><span>拒绝</span></button></div>`,
          duration: 0
        });
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
      this.personAccount=val;
      this.$nextTick(()=>{
        this.islogin=true;
      })
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
</style>
