<template>
  <div>
    <el-dialog title="评论" :close-on-click-modal="false" :visible.sync="dialogRemarkVisible_">
      <div class="blogDiv">
        <div 
        contenteditable="true" 
        class="textareaDiv" 
        v-html="remarkContent" 
        @blur="remarkContent=$event.target.innerHTML"
        >
        </div>
      </div>
      <div class="func">
        <el-tooltip class="tooltip-item" effect="dark" content="表情" placement="right">
		  <svg class="icon" aria-hidden="true" @click="showEmoji = !showEmoji">
			<use xlink:href="#icon-biaoqing1"></use>
		  </svg>
		</el-tooltip>
      </div>
      <div class="browBox" v-if="showEmoji">
        <vue-emoji @select="selectEmoji"></vue-emoji>
      </div>
      <div slot="footer" class="dialog-footer">
      <el-button @click="dialogRemarkVisible_ = false;remarkContent = ''">取 消</el-button>
      <el-button type="primary" @click="remarkBlog()">评 论</el-button>
	  </div>
    </el-dialog>    
  </div>
</template>

<script>
import vueEmoji from '../../emoji.vue'
export default {
  components:{
    vueEmoji
  },
  props:{
    dialogRemarkVisible:{
      type: Boolean,
      default:false
    },
    remarkItem:{
      type: Object,
      default:{}
    },
    userName:{
      type: String,
      default:""
    }
  },
  data(){
    return {
      remarkContent:"",
      showEmoji:false,
    }
  },
  created(){},
  mounted(){
    console.log(this.remarkItem);
  },
  watch:{},
  computed:{
    dialogRemarkVisible_: {
      get() {
        return this.dialogRemarkVisible;
      },
      set(val) {
        //dialogVisible_改变由父组件控制
        this.$emit("dialogRemarkVisible", val);
      }
    }
  },
  methods:{
    remarkBlog(){
        this.$axios.post('/blog/remark',{
          blogId:this.remarkItem.blog_id,
          remarkAccount:this.userName,
          remarkContent:this.remarkContent,
          blogSender:this.remarkItem.blog_sender,
        }).then(res=>{
            if(res.data.status=="0"){
               this.$message.success(res.data.msg);
               this.dialogRemarkVisible_ = false;
               this.remarkItem.remark=this.remarkItem.remark?this.remarkItem.remark:[];
               this.remarkItem.remark.push({
                 remark_account:this.userName,
                 remark_content:this.remarkContent
               });
               this.remarkContent = "";
               this.$emit("remark",this.remarkItem.remark);
            }else{
               this.$message.error(res.data.msg);
            }
        });
    },
    selectEmoji (code) {
      this.remarkContent += this.emoji(code);
    },
  },
}
</script>
<style lang="less" scoped>
.blogDiv{
  border-radius: 3px;
  border: 1px solid #ebebeb;
  padding:2px 5px;
}
.textareaDiv{
   width:100%;
   height:150px;
  //  border-radius: 3px;
  //  border: 1px solid #ebebeb;
   outline:none;
   padding:5px;
   transition: 0.2s;
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
.func{
    width:100%;
    height:30px;
    padding:5px;
    // background: red;
    // position: relative;
    margin-top:-30px;
}
.icon{
    cursor: pointer;
}
</style>