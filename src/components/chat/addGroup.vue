<template>
  <div>
    <el-dialog
    title="创建群聊"
    :visible.sync="dialogGroupVisible_"
    :close-on-click-modal="false"
    width="30%"
    >
      <el-row>
        <el-col :span="4">群名称：</el-col>
        <el-col :span="20"><el-input size="mini" v-model="groupName" placeholder="请输入群名称"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">群成员：</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            ref="multipleTable"
            :data="searchFriendList"
            tooltip-effect="dark"
            style="width: 100%"
            height="400"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
            >
            </el-table-column>
            <el-table-column
            prop="person_picture"
            label=""
            width="50">
            <template slot-scope="scope">
               <el-avatar :src="scope.row.person_picture"></el-avatar>
            </template>
            </el-table-column>
            <el-table-column
            prop="person_account"
            label="好友"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closedialog">取 消</el-button>
        <el-button type="primary" @click="createGroup">创建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    dialogGroupVisible:{
      type:Boolean,
      default:false,
    }
  },
  components:{},
  data(){
    return {
      friendList:[],
      groupName:"",
      searchFriendList:[],
      userName:"",
      imgUrl:"",
      groupPersonList:[]
    }
  },
  created(){},
  mounted(){
      this.searchFriend();
  },
  watch:{},
  computed:{
    dialogGroupVisible_: {
      get() {
        return this.dialogGroupVisible;
      },
      set(val) {
        //dialogGroupVisible_改变由父组件控制
        this.$emit("dialogGroupVisible", val);
      }
    }
  },
  methods:{
     searchFriend(){
        this.userName =  window.localStorage.getItem("personAccount");
        this.imgUrl =window.localStorage.getItem("personPicture");
        this.$axios.post("/friends/search",{personAccount:this.userName}).then(res=>{
          this.friendList=res.data.msg;
          this.searchFriendList=this.friendList;
        });
     },
     handleSelectionChange(val) {
        this.groupPersonList = val;
        console.log(this.groupPersonList);
     },
     createGroup(){
        if(this.groupName==""){
          this.$message.warning("群名称不能为空！");
        }else if(this.groupPersonList.length==0){
          this.$message.warning("群成员的个数不能为0！");
        }else{
            let groupPerson = [];
            groupPerson = this.groupPersonList.map(function(item){
               return `''${item.person_account}''`;
            });
            groupPerson.push(`''${this.userName}''`);
            groupPerson = groupPerson.join(",");
            this.$axios.post("/chat/addGroup",{
               groupName:this.groupName,
               groupPerson:groupPerson,
               groupCreater:this.userName
            }).then(res=>{
               if(res.data.status=="0"){
                  this.$message.success(res.data.msg);
                  this.closedialog();
                  this.$emit('getGroup',true);
               }else{
                  this.$message.error(res.data.msg);
               }
            });
        }
     },
     closedialog(){
        this.dialogGroupVisible_ = false;
        this.groupPersonList=[];
        this.groupName="";
     }
  },
}
</script>
<style lang="less" scoped>

</style>