<template>
  <div class="friendChat_div">
    <div class="friendList_div">
      <div :style="isHaveFriends">
		    <div :class="[clickIndex==index?'active_friend_div':'friend_div']" v-show="isShow" v-for="(item,index) in searchFriendList" :key="index" @click="clickChat(item,index)">
          <img :src="item.person_picture" alt=" " class="friend_img"/>
          <div style="display:inline-block;">
		        <b>&nbsp;&nbsp;{{item.person_account}}</b>
          </div>
          <el-badge style="float:right;line-height:60px;" :value="item.unRead" v-show="item.unRead!=0"/>
		      <div class="clearfix"> </div>
	    	</div>
		    <div v-show="!isShow" class="nofriends">
		      <i class="el-icon-user">暂无好友</i>
		    </div>
	    </div>  
    </div>
    <div class="chat_div">
      <div class="account_div">
        <span style="font-size:20px;letter-spacing:2px;color:#00b7f1;">{{this.chatItem.person_account}}</span>
      </div>
      <div class="content_div" id="scrollDiv">
        <div v-for="(item,index) in chatList" :key="index">
          <!-- 大于2分钟显示时间 -->
          <div style="text-align:center;color:#808080;" v-show="index==0||new Date(item.send_time)-new Date(chatList[index-1].send_time)>2*60*1000">
            {{item.send_time.toLocaleString()}}
          </div>
          <div style="float:left;" v-if="item.from_person_id!=userName">
           <el-avatar size="medium" :src="chatItem.person_picture"></el-avatar>
           <el-popover
              placement="right"
              width="160"
              trigger="hover">
              <p>是否将此内容进行收藏？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text">否</el-button>
                <el-button type="primary" size="mini" @click="toCollection(item)">是</el-button>
              </div>
              <div class="dialog_to_div" slot="reference" v-html="item.message">
              </div>
           </el-popover>
           
           <div style="clear:both;"></div>
          </div>
          <div style="float:right;" v-else>
           <div class="dialog_from_div" slot="reference" v-html="item.message">
           </div>
           <el-avatar size="medium" :src="imgUrl"></el-avatar>
           <div style="clear:both;"></div>
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
      <div class="input_chat_div">
        <div class="function_div">
          <el-tooltip class="tooltip-item" effect="light" content="表情" placement="bottom">
            <svg class="icon" aria-hidden="true" @click="showEmoji = !showEmoji">
            <use xlink:href="#icon-biaoqing1"></use>
            </svg>
          </el-tooltip>
          <el-upload
            ref="uploadChatImg"
            action="/chat/upload/chatImage"
            :on-success="uploadChatImgSuccess"
            style="display:inline-block"
            :show-file-list="false">
          <el-tooltip class="tooltip-item" effect="light" content="图片" placement="bottom">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tupian"></use>
            </svg>
          </el-tooltip>
          </el-upload>
          <el-upload
            ref="uploadChatImg"
            action="/chat/upload/chatfile"
            :on-success="uploadChatFileSuccess"
            style="display:inline-block"
            :show-file-list="false">
          <el-tooltip class="tooltip-item" effect="light" content="文件" placement="bottom">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wenjian1"></use>
            </svg>
          </el-tooltip>
          </el-upload>
        </div>
        <div class="browBox" v-if="showEmoji">
          <vue-emoji @select="selectEmoji"></vue-emoji>
        </div>
        <div class="send_msg_div">
          <div 
            contenteditable="true" 
            class="textareaDiv" 
            v-html="content" 
            @blur="content=$event.target.innerHTML"
          >
          </div>
          <div class="send_div">
            <el-button type="primary" size="small" @click="sendSocket(content)">发送</el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import vueEmoji from '../emoji.vue'
export default {
  props:{
    chatMsg:{
       type:Object,
       default:{}
    }
  },
  components:{
	  vueEmoji
  },
  data(){
    return {
      userName:"",
      imgUrl:"",
      friendList:[],
      searchFriendList:[],
      chatList:[],
		  isHaveFriends:"display:flex;justify-content:center;height:100%;",
      isShow:false,
      clickIndex:"",
      content:"",
      chatItem:{},
      showEmoji:false,
      visible:false
    }
  },
  created(){
  },
  mounted(){
    this.searchFriend();
  },
  watch:{
    chatMsg(val){
      this.getUnread(this.chatMsg);
    },
  },
  computed:{},
  methods:{
     searchFriend(){
        this.userName =  window.localStorage.getItem("personAccount");
        this.imgUrl =window.localStorage.getItem("personPicture");
        this.$axios.post("/friends/search",{personAccount:this.userName}).then(res=>{
          this.friendList=res.data.msg;
          // this.searchFriendList=this.friendList;
          this.isShow=res.data.msg==null?false:true;
          this.isHaveFriends=this.isShow?"overflow:scroll;overflow-x: hidden;overflow-y: scroll;height:100%;":"display:flex;justify-content:center;height:100%;";
          // console.log(this.searchFriendList);
          this.$axios.post("/chat/searchUnread",{personAccount:this.userName}).then(res1=>{
            if(res1.data.status=="0"){
              this.friendList.forEach(item=>{
                item['unRead']=res1.data.msg[item.person_account];
              });
              this.searchFriendList=this.friendList;
              // console.log(this.searchFriendList);
            } 
          });
        });
        
     },
     clickChat(item,index){      //点击好友进入二人聊天室
       this.clickIndex = index;
       this.chatItem = item;
       item.unRead = 0;
       this.$axios.post("/chat/updateUnread",{
         toChatPerson:item.person_account,
         personAccount:this.userName
       });
       console.log(this.userName+item.person_account);
       this.$socket.emit('chat',{from:this.userName,to:item.person_account});
       this.sockets.subscribe('sendMessage',(msg)=>{
          Object.assign(msg,{send_time:new Date()});
          this.chatList.push(msg);
       });
       this.getChatList(item);
     },
     selectEmoji (code) {
      this.content += this.emoji(code);
     },
     sendSocket(content){
        let param = {
          to:this.chatItem.person_account+"#"+this.userName,   //toid+#+fromid组合
          message: content,  //信息
          from_person_id: this.userName,      //自己
          to_person_id: this.chatItem.person_account          //对方
        }; 
        Object.assign(param,{send_time:new Date()});
        this.chatList.push(param);
        this.$nextTick(function(){
          document.getElementById('scrollDiv').scrollTop = document.getElementById('scrollDiv').scrollHeight;
        });
        this.$socket.emit('message',param);
        this.content="";
     },
     getUnread(chatMsg){
       //找出发来信息的好友的位置(即时)
       let updateItemIndex = this.searchFriendList.findIndex(function(item, index, arr) {
          return item.person_account == chatMsg.from_person_id;
       });
       //将好友信息储存到一个变量当中
       let updateItem = this.searchFriendList[updateItemIndex];
       updateItem.unRead = updateItem.unRead!=undefined?updateItem.unRead+1:1;
       console.log(updateItem.unRead);
       this.searchFriendList.splice(updateItemIndex,1);
       this.searchFriendList.unshift(updateItem);
      //  this.searchFriendList.forEach(item=>{
      //     if(chatMsg.fromPersonId==item.person_account){
      //         // item.unRead = item.unRead?item.unRead++:1;
      //       console.log(item.unRead);
      //     }
      //   });
     },
     getChatList(item){
       this.$axios.post("/chat/chatList",{
         fromPersonId:item.person_account,
         personAccount:this.userName
       }).then(res=>{
         if(res.data.status=="0"){
           this.chatList = res.data.msg;
           this.$nextTick(function(){
             document.getElementById('scrollDiv').scrollTop = document.getElementById('scrollDiv').scrollHeight;
           });
         }
       });
     },
     uploadChatFileSuccess(response, file, fileList){
       console.log(response, file);
      if(response.status=="0"){
        let fileContent = `<a href="${response.fileUrl}" download="${file.name}" target="_blank">
          <div style="background:white;width:180px;height:80px;padding:10px 5px;position:relative;">
          <svg class="icon" style="font-size:60px !important;" aria-hidden="true">
            <use xlink:href="#icon-wenjian"></use>
          </svg>
          <div style="float:right;padding:5px;height:100%;width:calc(100% - 60px);">${file.name}
          <div style="position:absolute;bottom:10px;right:5px;color:#808080;font-size:10px;">${this.formatFileSize(file.size)}</div></div>
          <div style="clear:both;"></div>
          </div>
        </a>`;
        this.sendSocket(fileContent);
        this.saveFile(response, file);
      }else{
          this.$message.error(response.msg);
      }
     },
     uploadChatImgSuccess(response, file, fileList){
        console.log(response, file);
        if(response.status=="0"){
          this.content+=`<img src="${response.personPicture}" alt="" height="50">`
        }else{
          this.$message.error(response.msg);
        }
     },
     toCollection(item){
        this.$axios.post("/chat/toCollection",{
          personAccount:this.userName,
          collectionContent:item.message,
          fromPersonId:item.from_person_id,
          sendTime:item.send_time
        }).then(res=>{
          if(res.data.status="0"){
            this.$message.success(res.data.msg);
          }else{
            this.$message.error("收藏失败："+res.data.msg);
          }
        });
     },
     formatFileSize(size) {
        let value = Number(size);
        if (size && !isNaN(value)) {
            const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
            let index = 0;
            let k = value;
            if (value >= 1024) {
                while (k > 1024) {
                    k = k / 1024;
                    index++;
                }
            }
            return `${(k).toFixed(2)}${units[index]}`;
        }
        return '-';
     },
     saveFile(response, file){
       this.$axios.post("/chat/saveFile",{
         filePersonId: this.chatItem.person_account,
         fileFromPersonId:this.userName,
         fileFromPersonPicture:this.imgUrl,
         fileSize:this.formatFileSize(file.size),
         fromType:'friend',
         fileName:file.name,
         fileUrl:response.fileUrl         
       });
     }
  },
}
</script>
<style lang="less" scoped>
.nofriends{
  align-self:center;
  font-size: 25px;
  color:#777777;
}
.friendChat_div{
  width:100%;
  // float: left;
  height:640px;
}
.friendList_div{
  width:305px;
  height:100%;
  background:white;
  // display: inline-block;
  // border-right: 1px solid #808080;
  float: left;
}
.chat_div{
  width:calc(100% - 305px);
  height:100%;
  float: left;
  // display: inline-block;
}
.friend_div{
  padding:15px;
  cursor:pointer;
  background:whitesmoke;
}
.active_friend_div{
  padding:15px;
  cursor:pointer;
  background:#dee1e6;
}
.friend_div:hover{
  background:#f1f1f1;
}
.account_div{
  height:40px;
  border-bottom: 1px solid #808080;
  padding:0 10px;
  line-height: 40px;
}
.content_div{
  height:calc(100% - 210px);
  overflow:scroll;
  overflow-x: hidden;
  overflow-y: scroll;
  padding:10px;
  // background: red;
}
.input_chat_div{
  height: 170px;
  border-top: 1px solid #808080;
}
.function_div{
  height:35px;
  padding:0 15px;
  line-height: 35px;
  background: white;
  position: relative;
}
.friend_img{
  width:60px;
  height:60px;
}
.send_msg_div{
  height: 134px;
  // padding:10px;
  background: lightcyan;
}
.send_div{
  width:100%;
  height:34px;
  line-height: 34px;
  padding:0 10px;
}
.tooltip-item{
  margin-right:10px;
}
::-webkit-scrollbar {
  width:5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 0px black;
  box-shadow: inset 0 0 0px black;
  background-color: black;
}
.browBox {
  width: 100%;
  height: 186px;
  background: #e6e6e6;
  position: absolute;
//   bottom: 0px;
  // overflow: scroll;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    li {
      width: 14%;
      font-size: 26px;
      list-style: none;
      text-align: center;
    }
  }
}
.textareaDiv{
  width:100%;
  height:100px;
  //  border-radius: 3px;
  //  border: 1px solid #ebebeb;
  overflow:scroll;
  overflow-x: hidden;
  overflow-y: scroll;
  outline:none;
  padding:5px;
  transition: 0.2s;
  background: lightgoldenrodyellow;
}
.dialog_from_div{
  padding:5px;
  border-radius:5px 0 5px 5px;
  display: inline-block;
  background: lightblue;
}
.dialog_to_div{
  padding:5px;
  border-radius:0 5px 5px 5px;
  display: inline-block;
  background: lightpink;
}
.el-badge__content{
  border:0 !important;
}
.iconFile{
  font-size:60px !important;
}
</style>