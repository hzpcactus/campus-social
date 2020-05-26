<template>
  <div style="padding:15px;position:relative;">
    <div v-show="collectionList.length>0">
      <el-card class="card" v-for="(item,index) in collectionList" :key="index" shadow="hover">
        <div>
            <div v-html="item.collection_content"></div>
            <div style="margin-top:10px;">
              <span>发布者：</span><span style="color:#00b7f1;">{{item.collection_from_person_id}}</span>
              <el-tag
                type="danger"
                v-show="item.collection_from_group_name!='null'&&item.collection_from_group_name!=null"
                size="mini"
                style="margin-left:10px;"
                effect="plain">
                {{ item.collection_from_group_name }}
              </el-tag>
            </div>
            <div>
              <span>时间：</span><span style="color:#00b7f1;">{{item.collection_time}}</span>
              <svg class="icon icondelete" aria-hidden="true" @click="deleteCollection(item)">
              <use xlink:href="#icon-shanchu"></use>
              </svg>
            </div>
        </div>
      </el-card>
    </div>
    <div class="bg-img" v-show="collectionList.length==0">

    </div>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      collectionList:[],
      userName:window.localStorage.getItem("personAccount")
    }
  },
  created(){},
  mounted(){
      this.getcollection();
  },
  watch:{},
  computed:{},
  methods:{
      getcollection(){
          this.$axios.post("/chat/getCollection",{
            personAccount:this.userName
          }).then(res=>{
            if(res.data.status=="0"){
               this.collectionList = res.data.msg;
            }else{
               this.$message.error(res.data.msg);
            }
          });
      },
      deleteCollection(item){
         this.$axios.post("/chat/delCollection",item).then(res=>{
            if(res.data.status=="0"){
              this.$message.success(res.data.msg);
              this.getcollection();
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
.icondelete{
  fill:red;
  cursor: pointer;
  float: right;
}
</style>