<template>
  <div>
    <div class="main_section_agile inner" id="home" style="text-align:center;">
        <div class="main_section_agile inner" id="home" style="text-align:center;line-height:350px;">
          <el-input placeholder="求输入关键词搜索背景" class="search_inner" v-model="searchBackground" @keyup.enter.native="searchTheme">
            <el-button style="background:#00b7f1;" slot="append" @click="searchTheme">
              <svg class="icon" style="fill:#ffffff" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
              </svg>
            </el-button>
          </el-input>
        </div>
    </div>
    <!--/w3_short-->
	<div class="theme_show" infinite-scroll-throttle-delay="2000" infinite-scroll-disabled="gifLoading" v-infinite-scroll="getTheme">
    <ul style="display:table;margin:0 auto;">
      <li class="card_theme" v-for="(item,index) in themeList" :key="index">
        <el-card style="width:236px;margin:0 auto;" :body-style="{ padding: '0px' }">
          <el-image :src="item.key" fit="cover" class="img_theme" lazy :preview-src-list="item.key.split(',')"></el-image>
          <div style="padding: 14px;">
            <span :title="item.text">{{item.text.length>13?item.text.substring(0,10)+"...":item.text}}</span>
            <!-- <div style="padding:5px 0;">
              <el-tag type="success" style="margin-right:5px;" v-for="(itemTags,indexTags) in item.tags" :key="indexTags" size="mini">{{itemTags}}</el-tag>
            </div> -->
            <div style="padding:5px 0;">
              <span class="icon_margin" title="转采">
                <svg class="icon" style="fill:#8c7e7e;" aria-hidden="true">
                  <use xlink:href="#icon-zhuanfa1"></use>
                </svg>
                {{item.repin_count}}
              </span>
              <span class="icon_margin" title="喜欢">
                <svg class="icon" style="fill:#8c7e7e;" aria-hidden="true">
                  <use xlink:href="#icon-xin"></use>
                </svg>
                {{item.like_count}}
              </span>
            </div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" style="float:right;" @click="dialogThemeVisible = true;chooseTheme=item.key;" :disabled="backgroundTheme==item.key?true:false">{{backgroundTheme==item.key?"已翻牌":"小主，求翻牌"}}</el-button>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
    <div v-show="gifLoading">
      <div class="loading_gif"></div>
    </div>
    <div v-show="isNoMore" style="text-align:center">没有更多了...</div>
    <el-dialog
      :visible.sync="dialogThemeVisible"
      width="30%">
      <span>确定选择此图片作为背景图片？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseThemeSuccess">确 定</el-button>
      </span>
    </el-dialog>
	</div>

  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      searchBackground:"",
      chooseTheme:"",
      backgroundTheme:"",
      themeList:[],
      page:0,
      gifLoading:false,
      chooseDisabled:false,
      isNoMore:false,
      dialogThemeVisible:false
    }
  },
  created(){},
  mounted(){
    // this.getTheme();
    this.backgroundTheme = this.$route.params.backgroundTheme;
    console.log(this.$route.params.backgroundTheme,1);
  },
  watch:{},
  computed:{},
  methods:{
    getTheme(){
      this.gifLoading = true;
      console.log("请求中",this.page);
      setTimeout(() => {
      this.$axios.post("/blog/searchTheme",{
        searchBackground:this.searchBackground==""?encodeURI("电脑壁纸"):encodeURI(this.searchBackground),
        page:this.page+1
      }).then(res=>{
        if(res.data.status=="0"){
          this.gifLoading = false;
          if(res.data.msg.length==0){
            this.isNoMore = true;
          }else{
            this.themeList = this.themeList.concat(res.data.msg);
            this.page = this.page + 1;
          }
          
          // this.gifScrollLoading = false;
        }else{
          this.$message.error(res.data.msg);
        }
      });
      }, 1000)
    },
    chooseThemeSuccess(){
      console.log(this.chooseTheme);
      this.$axios.post("/blog/chooseTheme",{
        personAccount:window.localStorage.getItem("personAccount"),
        blogTheme: this.chooseTheme
      }).then(res=>{
        if(res.data.status=="0"){
          this.$message.success(res.data.msg);
          this.$router.push({path:"/blog"});
        }else{
          this.chooseDisabled = false;
          this.$message.error(res.data.msg);
        }
      });
    },
    searchTheme(){
      this.themeList=[];
      this.page=0;
      this.isNoMore=false;
      this.getTheme();
    }
  },
}
</script>
<style lang="less" scoped>
.search_inner{
   width:50%;
}
.theme_show{
    width:100%;
    min-height:500px;
    height:1000px;
    background: #f5f5f5;
    padding:25px;
    overflow-y: auto;
    position: relative;
}
.img_theme{
  width:236px;
  height:150px;
}
.icon_margin{
  font-size:12px;
  margin-right: 10px;
}
.loading_gif{
  width: 100%;
  height: 150px;
  // margin:0 auto;
  // position: absolute;
  // left: 50%;  /* 父盒子宽度的50% */
  // top: 50%;   /* 父盒子高度的50% */
  // transform: translate(-50%,-50%);    /* 子盒子自身宽高的50% */   
  background: url(//wimg.588ku.com/gif620/19/07/14/7bf3d73e340726f4aa3a762b5e11efaa.gif)center/contain no-repeat;
}
.card_theme{
  width:251px;
  padding:15px 15px;
  list-style-type:none;
  float:left;
  // margin-bottom:10px;
  // margin-top:10px;
  // display:inline-block;

}
</style>