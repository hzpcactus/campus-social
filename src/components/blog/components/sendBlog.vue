<template>
  <div>
    <el-dialog title="发布动态" :close-on-click-modal="false" :visible.sync="dialogVisible_">
	  <!-- <el-row>
		<el-col :span="24"> -->
    <div class="blogDiv">
			<div 
			contenteditable="true" 
			class="textareaDiv" 
			v-html="content" 
			@blur="content=$event.target.innerHTML"
			>
			</div>
      <el-divider><i class="el-icon-lollipop"></i></el-divider>
      <!-- 上传图片 start -->
      <div style="padding:5px;">
		    <el-upload
          ref="blogUpload"
          action="/blog/upload/headImage"
          list-type="picture-card"
          :on-success="uploadFilesSuccess"
        >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="imgVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <!-- 上传图片 end -->

			<div class="func">
			<el-tooltip class="tooltip-item" effect="dark" content="添加链接" placement="right">
				<svg class="icon" aria-hidden="true" @click="centerDialogVisible = true;showEmoji = false;">
				<use xlink:href="#icon-lianjie"></use>
				</svg>
			</el-tooltip>
			<el-divider direction="vertical"></el-divider>
			<el-tooltip class="tooltip-item" effect="dark" content="表情" placement="right">
				<svg class="icon" aria-hidden="true" @click="showEmoji = !showEmoji">
				<use xlink:href="#icon-biaoqing1"></use>
				</svg>
			</el-tooltip>
			<el-divider direction="vertical"></el-divider>
      <el-tooltip class="tooltip-item" effect="dark" content="@好友" placement="right">
				<svg class="icon" aria-hidden="true" @click="getDrawer">
				<use xlink:href="#icon-ren"></use>
				</svg>
			</el-tooltip>
			</div>
		  <div class="browBox" v-if="showEmoji">
			  <vue-emoji @select="selectEmoji"></vue-emoji>
			</div>
    </div>
		<!-- </el-col>
	  </el-row> -->
	  <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible_ = false">取 消</el-button>
      <el-button type="primary" @click="sendBlog">发 布</el-button>
	  </div>
    </el-dialog>
    <!-- 添加链接的弹窗 -->
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
    <!-- @人的列表 -->
    <el-drawer
      title="选择要@的人"
      id="drawer"
      size="150"
      :visible.sync="drawer"
      :with-header="false"
      direction="ltr"
    >
    <div class="drawer">
      <h4>选择要@的人</h4>
      <el-divider><i class="el-icon-user"></i></el-divider>
      <el-table
        ref="singleTable"
        :data="friendList"
        highlight-current-row
        :show-header="false"
        :max-height="drawerHeight"
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          property="person_picture"
          label=""
          width="50"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar :src="scope.row.person_picture"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          property="person_account"
          width="100"
          align="center"
          label="">
        </el-table-column>
      </el-table>
    </div>
    </el-drawer>
  </div>
</template>

<script>
import vueEmoji from '../../emoji.vue'
export default {
  components: {
	  vueEmoji
  },
  props:{
    dialogVisible:{
      type: Boolean,
      default:false
    },
    friendList:{
      type:Array,
      dafault:[]
    }
  },
  data(){
    return {
      personAccount:"",
      centerDialogVisible:false,
      imgVisible:false,
      disabled: false,
      showEmoji:false,
      drawer:false,
      urlPath:"",
      content:"",
      dialogImageUrl:"",
      currentPerson:null,
      drawerHeight:"100%",
      fileSuccessList:[],
      sendFriendList:[]
    }
  },
  created(){},
  mounted(){
    this.personAccount = window.localStorage.getItem("personAccount");
  },
  watch:{},
  computed:{
    dialogVisible_: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        //dialogVisible_改变由父组件控制
        this.$emit("dialogVisible", val);
      }
    }

  },
  methods:{
    sendBlog(){
      let params,fileSuccessList1,sendFriendList;
      sendFriendList = this.pick(this.content);
      console.log(sendFriendList);
      fileSuccessList1 = this.fileSuccessList.map(item=>{
        return item.response.personPicture;
      });
      params={
        blogSender:this.personAccount,
        blogPicture:fileSuccessList1.join(","),
        blogContent:this.content,
        blogFriend:sendFriendList.join(","),
        isblogForwarding:false,
        blogOriginal:this.personAccount
      };
      this.$axios.post("/blog/sendBlog",params).then(res=>{
         if(res.data.status=="0"){
           this.$message.success(res.data.msg);
           this.dialogVisible_ = false;
           this.content = "";
           this.$emit("getBlog",true);             // 刷新自己博客
         }else{
           this.$message.error(res.data.msg);
         }
      });
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
    },
    selectEmoji (code) {
      this.content += this.emoji(code);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPerson = val;
      this.content+=`<a href="javascript:void(0)">@${val.person_account}</a>`;
      this.$nextTick(()=>{
        this.drawer = false;
      })
    },
    getDrawer(){
      this.drawer = true;
      this.drawerHeight = window.innerHeight-85;
      // console.log(window.innerHeight);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    uploadFilesSuccess(response, file, fileList){
      console.log(file,fileList);
      this.fileSuccessList = fileList;
    },
    pick(str){      //找出动态内容中@好友的账号
      let reg = /@([^\s]*?)\<\/a>/g, ret = [],arr;
      while(arr = reg.exec(str)) ret.push(arr[1]);
      return ret;
    }
  },
}
</script>
<style lang="less" scoped>
.textareaDiv{
   width:100%;
   height:150px;
  //  border-radius: 3px;
  //  border: 1px solid #ebebeb;
   outline:none;
   padding:5px;
   transition: 0.2s;
}
.func{
    width:100%;
    height:30px;
    padding:5px;
    // background: red;
    // position: relative;
    // margin-top:-30px;
}
.browBox {
  width: 100%;
  height: 186px;
  background: #e6e6e6;
//   position: absolute;
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
.tooltip-item{
  cursor: pointer;
}
.drawer{
  padding:20px;
}
.blogDiv{
  border-radius: 3px;
  border: 1px solid #ebebeb;
  padding:2px 5px;
}


</style>