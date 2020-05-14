<template>
  <div>
    <el-card style="background:#f0f9eb;">
       <el-row type="flex" align="middle">
           <el-col :span="2">课程名：</el-col>
           <el-col :span="20">
              <el-input v-model="searchSchedule" placeholder="请输入课程名" @input="search"></el-input> 
           </el-col>
           <el-col :span="2">
             <el-button type="primary" @click="search">查找</el-button>
           </el-col>
       </el-row>
    </el-card>
    <el-card class="card">
        <el-table :data="examSearchList" style="width: 100%" stripe>
            <el-table-column type="index" label="序号" width="50" align='center'></el-table-column>
            <el-table-column prop="scheduleId" label="课程号" align='center'></el-table-column>
            <el-table-column prop="scheduleName" label="课程名" align='center'></el-table-column>
            <el-table-column prop="scheduleType" label="课程性质" align='center'></el-table-column>
            <el-table-column prop="scheduleTeacher" label="任课老师" align='center'></el-table-column>
            <el-table-column prop="scheduleCredit" width="50" label="学分" align='center'></el-table-column>
            <el-table-column prop="examTime" label="考试时间" align='center'></el-table-column>
            <el-table-column prop="examPlace" label="考试地点" align='center'></el-table-column>
            <el-table-column prop="examForm" width="50" label="考试形式" align='center'></el-table-column>
            <el-table-column prop="examMethod" width="50" label="考试方式" align='center'></el-table-column>
            <el-table-column prop="examStatus" label="状态" align='center'>
              <template slot-scope="scope">
                <el-tag
                :type="scope.row.examStatus == '已结束' ? 'danger' : 'success'"
                disable-transitions>{{scope.row.examStatus}}</el-tag>
              </template>
            </el-table-column>

        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      examList:[
        {
           scheduleId:'14077002',
           scheduleName:'程序设计基础',
           scheduleType:'必修课',
           scheduleTeacher:'郭兴凯',
           scheduleCredit:4,
           examTime:'2016-11-19 18:30-20:15',
           examPlace:'3号教学楼-3号楼-205',
           examForm:'闭卷',
           examMethod:'笔试',
           examStatus:'未开始'
        },{
           scheduleId:'1412011004',
           scheduleName:'高等数学B（Ⅱ）',
           scheduleType:'必修课',
           scheduleTeacher:'李媛',
           scheduleCredit:4,
           examTime:'2017-05-06 09:20-10:20',
           examPlace:'1号教学楼-1号楼-4j',
           examForm:'闭卷',
           examMethod:'笔试',
           examStatus:'已结束'
        },{
           scheduleId:'1412012007',
           scheduleName:'大学物理C',
           scheduleType:'必修课',
           scheduleTeacher:'宋秀丹',
           scheduleCredit:4,
           examTime:'2017-05-07 16:30-17:10',
           examPlace:'1号教学楼-1号楼-221',
           examForm:'闭卷',
           examMethod:'笔试',
           examStatus:'已结束'
        },{
           scheduleId:'1412025001',
           scheduleName:'大学英语A（Ⅰ）',
           scheduleType:'必修课',
           scheduleTeacher:'孙晶',
           scheduleCredit:2.5,
           examTime:'2016-12-26 10:20-12:20',
           examPlace:'汇文楼-汇文楼-220',
           examForm:'闭卷',
           examMethod:'笔试',
           examStatus:'已结束'
        },{
           scheduleId:'14077003',
           scheduleName:'面向对象程序设计',
           scheduleType:'必修课',
           scheduleTeacher:'丁大勇',
           scheduleCredit:3,
           examTime:'2017-04-08 15:40-17:30',
           examPlace:'3号教学楼-3号楼-224',
           examForm:'闭卷',
           examMethod:'笔试',
           examStatus:'已结束'
        }  
      ],
      examSearchList:[],
      searchSchedule:"",
    }
  },
  created(){},
  mounted(){
    this.examSearchList=this.examList;
  },
  watch:{},
  computed:{},
  methods:{
      search(){
        let arr=[];
        this.examList.forEach(item=>{
          if(item.scheduleName.includes(this.searchSchedule)){
            arr.push(item);
          }          
        });
        this.examSearchList=arr;
      }
  },
}
</script>
<style lang="less" scoped>
.card{
    margin-top: 20px;
}
.icon{
  font-size:18px !important; 
}
</style>