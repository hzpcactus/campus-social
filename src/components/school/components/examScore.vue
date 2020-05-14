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
            <el-table-column prop="grade" label="学年学期" align='center'></el-table-column>
            <el-table-column prop="scheduleId" label="课程号" align='center'></el-table-column>
            <el-table-column prop="scheduleName" label="课程名称" align='center'></el-table-column>
            <el-table-column prop="scheduleType" label="课程类别" align='center'></el-table-column>
            <el-table-column prop="scheduleProperty" label="课程性质" align='center'></el-table-column>
            <el-table-column prop="scheduleCredit" width="50" label="学分" align='center'></el-table-column>
            <el-table-column prop="examScore" width="50" label="成绩" align='center'>
              <template slot-scope="scope">
                <el-link
                :type="scope.row.examScore <60 ? 'danger' : 'primary'"
                :underline="false">{{scope.row.examScore}}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column prop="examMethod" width="50" label="修读方式" align='center'></el-table-column>
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
           grade:'2019-2020 第一学期',
           scheduleId:'1812026003',
           scheduleName:'形势与政策（2019秋）',
           scheduleType:'通识必修',
           scheduleProperty:'必修课',
           scheduleCredit:0.25,
           examScore:92,
           examMethod:'初修',
        },{
           grade:'2018-2019 第一学期',
           scheduleId:'17077005',
           scheduleName:'基础日语（上）',
           scheduleType:'专业选修',
           scheduleProperty:'选修课',
           scheduleCredit:4.0,
           examScore:56,
           examMethod:'初修',
        },{
           grade:'2018-2019 第一学期',
           scheduleId:'1412026003',
           scheduleName:'马克思主义基本原理概论',
           scheduleType:'通识必修',
           scheduleProperty:'必修课',
           scheduleCredit:3.0,
           examScore:97,
           examMethod:'',
        },{
           grade:'2018-2019 第二学期',
           scheduleId:'14077022',
           scheduleName:'生产实习',
           scheduleType:'专业必修',
           scheduleProperty:'必修课',
           scheduleCredit:4.0,
           examScore:84,
           examMethod:'',
        },{
           grade:'2018-2019 第二学期',
           scheduleId:'1411021002',
           scheduleName:'就业指导',
           scheduleType:'通识选修',
           scheduleProperty:'选修课',
           scheduleCredit:1.0,
           examScore:91,
           examMethod:'初修',
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