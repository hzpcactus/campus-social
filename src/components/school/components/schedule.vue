<template>
  <div>
    <el-row type="flex" justify="center" style="padding:10px 0;">
      <el-col :span="1"></el-col>
      <el-col :span="3">周一</el-col>
      <el-col :span="3">周二</el-col>
      <el-col :span="3">周三</el-col>
      <el-col :span="3">周四</el-col>
      <el-col :span="3">周五</el-col>
      <el-col :span="3">周六</el-col>
      <el-col :span="3">周日</el-col>
    </el-row>
    <el-row :gutter="5" type="flex" align="middle" v-for="(item1,index1) in scheduleList" :key="index1">
      <el-col :span="1" style="text-align:center;">{{index1+1}}</el-col>
      <el-col :span="3" v-for="(item2,index2) in item1" :key="index2">
        <el-card shadow="hover" :style="colorRandom()" v-show="item2.name">
          <div>
            <p>{{item2.name}}</p>
            <p>{{item2.place}}</p>
            <p>{{item2.time}}</p>
          </div>
        </el-card>   
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
       scheduleList:[
       [
         {
            name:"人机交互",
            place:"四号楼-[513]",
            time:"1-7周"
         },
         {},
         {
            name:"高等数学",
            place:"汇文楼-[470]",
            time:"1-18周"
         },
         {
            name:"线性代数",
            place:"汇文楼-[223]",
            time:"1-15周"
         },
         {
            name:"C语言",
            place:"三号楼-[215]",
            time:"2-15周"
         },
         {},
         {
            name:"Java程序设计",
            place:"四号楼-[440]",
            time:"1-19周"
         }
       ],[
         {
            name:"计组",
            place:"三号楼-[214]",
            time:"1-20周"
         },
         {},
         {
            name:"计算机网络",
            place:"四号楼-[405]",
            time:"5-10周"
         },
         {
            name:"软件体系结构",
            place:"四号楼-[134]",
            time:"14-17周"
         },
         {},
         {},
         {
            name:"毛泽东思想",
            place:"二号楼-[117]",
            time:"1-16周"
         }
       ],[
         {},
         {
            name:"软件系统分析",
            place:"三号楼-[415]",
            time:"1-9周"
         },{
            name:"软件工程实验",
            place:"四号楼-[134]",
            time:"10-18周"
         },{
            name:"大学体育",
            place:"体育场",
            time:"1-7周"
         },{
            name:"人机交互",
            place:"四号楼-[513]",
            time:"1-7周"
         },{
            name:"团队激励",
            place:"三号楼-[315]",
            time:"12-13周"
         },{}
       ],[
         {
           name:"Java程序设计",
            place:"四号楼-[440]",
            time:"1-19周"
         },
         {
            name:"习近平理论",
            place:"二号楼-[513]",
            time:"1-7周"
         },{
            
         },{
            name:"思修",
            place:"一号楼-[210]",
            time:"1-7周"
         },{
            name:"软件工程实验",
            place:"四号楼-[134]",
            time:"10-18周"
         },{
            name:"人机交互",
            place:"四号楼-[513]",
            time:"1-7周"
         }
       ],[
         {},
         {
            name:"C++",
            place:"三号楼-[240]",
            time:"1-7周"
         },{
            name:"就业指导",
            place:"汇文楼-[460]",
            time:"1-4周"
         },{
            name:"人机交互",
            place:"四号楼-[513]",
            time:"1-7周"
         },
         {},
         {},
         {}
       ],[
         {
            name:"人机交互",
            place:"四号楼-[513]",
            time:"1-7周"
         },
         {
            name:"人机交互",
            place:"四号楼-[513]",
            time:"1-7周"
         },{
            
         },{
            name:"人机交互",
            place:"四号楼-[513]",
            time:"1-7周"
         },{
            name:"人机交互",
            place:"四号楼-[513]",
            time:"1-7周"
         },{
            
         },{

         }
       ],[
         {
            name:"C实验",
            place:"四号楼-[413]",
            time:"1-7周"
         },
         {
            name:"大学英语",
            place:"四号楼-[442]",
            time:"1-7周"
         },{
            name:"马克思",
            place:"一号楼-[513]",
            time:"1-21周"
         },{
            name:"大学物理",
            place:"汇文楼-[423]",
            time:"1-7周"
         },{
            name:"数据库设计",
            place:"四号楼-[415]",
            time:"1-7周"
         },
         {},
         {}
       ],[
         {
            name:"形式与政策",
            place:"汇文楼-[120]",
            time:"1-7周"
         },
         {
            name:"高等数学",
            place:"汇文楼-[448]",
            time:"1-19周"
         },{
            name:"大学物理",
            place:"汇文楼-[210]",
            time:"1-20周"
         },{
            name:"大学物理实验",
            place:"实验楼-[544]",
            time:"1-7周"
         },
         {},
         {}
       ]
       ],
       colorList:['rgba(255,182,193,0.5)','rgba(173,216,230,0.5)','rgba(243, 202, 115,0.5)','rgba(153, 211, 98,0.5)','rgba(122, 194, 165,0.5)','rgba(148, 175, 235,0.5)'],
    }
  },
  created(){},
  mounted(){},
  watch:{},
  computed:{},
  methods:{
      colorRandom(){
         let list=this.colorList;
         let colorItem = Math.floor((Math.random()*list.length));
         let colorObj={
           background:list[colorItem]
         };
         return colorObj;
      }
  },
}
</script>
<style lang="less" scoped>
p{
   color:black;
}
</style>