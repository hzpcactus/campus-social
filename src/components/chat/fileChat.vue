<template>
  <div style="padding:15px;position:relative;">
    <div v-show="fileList.length>0">
      <el-card class="card" shadow="hover">
         <el-table :data="fileList" height="570" style="width: 100%" stripe>
            <el-table-column prop="file_from_person_picture" label="" width="50" align='center'>
              <template slot-scope="scope">
                <el-avatar :src="scope.row.file_from_person_picture"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="file_from_person_id" label="发布者" align='center'></el-table-column>
            <el-table-column prop="file_name" label="文件名" align='center'></el-table-column>
            <el-table-column prop="file_type" label="文件类型" align='center'></el-table-column>
            <el-table-column prop="file_size" label="文件大小" align='center'></el-table-column>
            <el-table-column prop="send_file_time" label="发布文件时间" align='center'>
              <!-- <template slot-scope="scope">
                {{getName(scope.row.person_place)}}
              </template> -->
            </el-table-column>
            <el-table-column prop="from_type" label="来源" align='center'>
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.from_type === 'friend' ? 'primary' : 'success'"
                disable-transitions>{{fromTypeObj[scope.row.from_type]}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align='center'>
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="下载" placement="top">
                    <el-button type="text" size="small">
                      <a :href="scope.row.file_url" :download="scope.row.file_name" target="_blank">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiazai"></use>
                      </svg>
                      </a>
                    </el-button>
                  </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="bg-img" v-show="fileList.length==0">

    </div>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      fileList:[],
      fromTypeObj:{
        friend:"来自好友",
        group:"来自群"
      }
    }
  },
  created(){},
  mounted(){
    this.getFileList();
  },
  watch:{},
  computed:{},
  methods:{
    getFileList(){
      this.$axios.get("/chat/getFileList",{params:{
        personAccount:window.localStorage.getItem("personAccount")
      }}).then(res=>{
        if(res.data.status=="0"){
          this.fileList = res.data.msg;
          console.log(this.fileList);
        }else{
          this.$message.error(res.data.msg);
        }
      });
    }
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
  background: rgba(226,244,255,0.5);
  margin-bottom: 15px;
}
</style>