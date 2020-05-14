<template>
  <div>
    <div class="groupList_div">
      <div class="add_group">
         <el-link type="primary" :underline="false" icon="el-icon-circle-plus-outline" @click="addGroup">创建群聊</el-link>
      </div>
      <div class="scroll_div">
		  <div :class="[clickIndex==index?'active_group_div':'group_div']" v-for="(item,index) in searchGroupList" :key="item.group_id" @click="clickChatGroup(item,index)">
          <div style="display:inline-block;">
		      <b>&nbsp;&nbsp;{{item.group_name}}</b>
          </div>
          <!-- <el-badge style="float:right;line-height:60px;" :value="item.unRead" v-show="item.unRead!=0"/> -->
		      <div class="clearfix"> </div>
	    </div>
	   </div>  
    </div>
    <div class="chat_div">
      <div class="account_div">
        <span style="font-size:20px;letter-spacing:2px;color:#00b7f1;">{{this.chatItem.group_name}}</span>
      </div>
      <div class="content_div" id="scrollDiv">
        <div v-for="(item,index) in chatList" :key="index">
          <!-- 大于2分钟显示时间 -->
          <div style="text-align:center;color:#808080;" v-show="index==0||new Date(item.send_time)-new Date(chatList[index-1].send_time)>2*60*1000">
            {{item.send_time.toLocaleString()}}
          </div>
          <div style="float:left;" v-if="item.from_person_id!=userName">
           <el-avatar size="medium" :src="item.from_person_picture"></el-avatar>
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
        <div class="browBox" v-show="showEmoji">
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
    <div class="person_or_file_div">
      <el-tabs type="border-card" style="height:100%;">
        <el-tab-pane label="群成员">
          <div class="group_person_div">
            <div class="group_person" v-for="(item,index) in groupPersonList" :key="index">
              <!-- <el-avatar shape="square" size="small" src=""></el-avatar> -->
              <img :src="item.person_picture" width="28" height="28" alt="">
              <span style="margin-left:5px;">
                {{item.person_account}}
              </span>
              <i class="el-icon-circle-close" style="float:right;margin-top:13px;" @click="deleteGroupPerson(item)" v-if="chatItem.group_creater==userName&&item.person_account!=chatItem.group_creater"></i>
              <el-tag type="danger" style="float:right;margin-right:5px;margin-top:10px;" size="mini" effect="plain" v-if="item.person_account==chatItem.group_creater">
                群主
              </el-tag>
              <div style="clear:both;"></div>
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="文件列表">
          <div class="group_person_div">
            <div class="group_file" v-for="(item,index) in groupfileList" :title="'来自'+item.file_from_person_id" :key="index">
              <a :href="item.file_url" :download="item.file_name" target="_blank">
                {{item.file_name}}
              </a>
              <span style="float:right;color:#808080;font-size:10px;">{{item.file_size}}</span>
              <div style="clear:both;"></div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="clear:both;"></div>
    <addGroup :dialogGroupVisible="dialogGroupVisible" @getGroup="searchGroup" @dialogGroupVisible="getDialogGroupVisible"></addGroup>
  </div>
</template>

<script>
import addGroup from './addGroup.vue'
import vueEmoji from '../emoji.vue'
export default {
  components:{
    addGroup,
    vueEmoji
  },
  data(){
    return {
      dialogGroupVisible:false,
      searchGroupList:[],
      groupPersonList:[],
      groupfileList:[],
      userName:"",
      imgUrl:"",
      clickIndex:"",
      content:"",
      showEmoji:false,
      getGroup:false,
      chatItem:{},
      chatList:[]

    }
  },
  created(){},
  mounted(){
     this.userName = window.localStorage.getItem("personAccount");
     this.imgUrl = window.localStorage.getItem("personPicture");
     this.getGroupList();
  },
  watch:{
    getGroup(val){
      if(this.getGroup){
        this.getGroupList();
      }
    }
  },
  computed:{},
  methods:{
    addGroup(){
      this.dialogGroupVisible = true;
    },
    searchGroup(val){
      this.getGroup = val;
    },
    getDialogGroupVisible(val){
      this.dialogGroupVisible = val;
    },
    clickChatGroup(item,index){
      this.clickIndex = index;
      this.chatItem = item;
      this.getGroupChat(item);
      this.getGroupPersonList();
      this.getGroupfileList();
      //进入群聊
      this.$socket.emit('group',item.group_id);
      this.sockets.subscribe('sendGroupMsg',(msg)=>{
        console.log(msg);
        Object.assign(msg,{send_time:new Date()});
        this.chatList.push(msg);
      });

    },
    getGroupList(){
        console.log(this.userName);
        this.$axios.get("/chat/getGroup",{
          params:{
            personAccount:this.userName
          }
        }).then(res=>{
            if(res.data.status=="0"){
              this.searchGroupList = res.data.msg;
              this.getGroup = false;
            }else{
              this.$message.error(res.data.msg);
            }
        });
    },
    selectEmoji (code) {
      this.content += this.emoji(code);
    },
    uploadChatImgSuccess(response, file, fileList){
      console.log(response, file);
      if(response.status=="0"){
        this.content+=`<img src="${response.personPicture}" alt="" height="50">`
      }else{
        this.$message.error(response.msg);
      }
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
        this.getGroupfileList();
      }else{
          this.$message.error(response.msg);
      }
    },
    sendSocket(content){
        let param = {
          from_person_id: this.userName,      //自己
          to_group_id: this.chatItem.group_id,          //群id
          message: content,  //信息
          from_person_picture: this.imgUrl     //自己头像
        }; 
        Object.assign(param,{send_time:new Date()});
        this.chatList.push(param);
        this.$nextTick(function(){
          document.getElementById('scrollDiv').scrollTop = document.getElementById('scrollDiv').scrollHeight;
        });
        this.$socket.emit('groupmessage',param);
        this.content="";
    },
    getGroupChat(item){
       this.$axios.get("/chat/getGroupChat",{
         params:{
            groupId:item.group_id
         }
       }).then(res=>{
         if(res.data.status=="0"){
           this.chatList = res.data.msg;
         }else{
           this.$message.error(res.data.msg);
         }
       });
    },
    getGroupPersonList(){
       this.$axios.get("/chat/getGroupPersonList",{
         params:{
           groupId:this.chatItem.group_id
         }
       }).then(res=>{
         if(res.data.status=="0"){
           let personList = res.data.msg;
           let personItem = personList.find((item)=>{
              return item.person_account==this.chatItem.group_creater;
           });
           personList.splice(personList.findIndex((item)=>{
              return item.person_account==this.chatItem.group_creater;
           }),1);
           personList.unshift(personItem);
           this.groupPersonList = personList;
         }else{
           this.$message.error(res.data.msg);
         }
       });
    },
    deleteGroupPerson(item){
      this.$axios.post("/chat/deleteGroupPerson",{
        personAccount:item.person_account,
        groupId:this.chatItem.group_id
      }).then(res=>{
        if(res.data.status=="0"){
          this.$message.success(res.data.msg);
          this.getGroupPersonList();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getGroupfileList(){
      this.$axios.get("/chat/getGroupfileList",{
        params:{
          groupId:this.chatItem.group_id
        }
      }).then(res=>{
        if(res.data.status=="0"){
           this.groupfileList = res.data.msg;
         }else{
           this.$message.error(res.data.msg);
         }
      });
    },
    saveFile(response, file){
       this.$axios.post("/chat/saveGroupFile",{
         fileGroupId: this.chatItem.group_id,
         fileFromPersonId:this.userName,
         fileFromPersonPicture:this.imgUrl,
         fileSize:this.formatFileSize(file.size),
         fromType:'group',
         fileName:file.name,
         fileUrl:response.fileUrl         
       });
    },
    toCollection(item){
        this.$axios.post("/chat/toCollection",{
          personAccount:this.userName,
          collectionContent:item.message,
          fromPersonId:item.from_person_id,
          collectionFromGroupName:this.chatItem.group_name,
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
  },

}
</script>
<style lang="less" scoped>
i{
  cursor: pointer;
}
.groupList_div{
  width:305px;
  height:100%;
  background:white;
  // display: inline-block;
  // border-right: 1px solid #808080;
  float: left;
}
.group_div{
  padding:15px;
  cursor:pointer;
  background:whitesmoke;
}
.active_group_div{
  padding:15px;
  cursor:pointer;
  background:#dee1e6;
}
.group_div:hover{
  background:#f1f1f1;
}
.add_group{
  width:100%;
  height:40px;
  padding:5px;
  text-align: center;
  line-height:30px;
}
.scroll_div{
  overflow:scroll;
  overflow-x: hidden;
  overflow-y: scroll;
  height:calc(100% - 40px);
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
.chat_div{
  width:calc(100% - 555px);
  height:100%;
  float: left;
  // display: inline-block;
}
.person_or_file_div{
  width:250px;
  height:100%;
  float:right;
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
.tooltip-item{
  margin-right:10px;
}
.group_person_div{
  overflow:scroll;
  overflow-x: hidden;
  overflow-y: hidden;
  height:calc(100% - 40px);
  // background: red;
}
.group_person{
  width:100%;
  height:40px;
  // padding:5px;
  line-height:40px;
  // background: blue;
}
.group_file{
  width:100%;
  height:30px;
  padding:5px;
  line-height:30px;
  // background: blue;
}
</style>