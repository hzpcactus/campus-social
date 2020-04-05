<template>
  <div>
    <el-card style="background:#f0f9eb;">
       <el-row type="flex" align="middle">
           <el-col :span="2">账号：</el-col>
           <el-col :span="20">
              <el-input v-model="searchAccount" placeholder="请输入账号" @input="search"></el-input> 
           </el-col>
           <el-col :span="2">
             <el-button type="primary" @click="search">查找</el-button>
           </el-col>
       </el-row>
    </el-card>
    <el-card class="card">
        <el-table :data="personSearchList" style="width: 100%" stripe>
            <el-table-column prop="person_picture" label="" width="50" align='center'>
              <template slot-scope="scope">
                <el-avatar :src="scope.row.person_picture"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="person_account" label="账号" align='center'></el-table-column>
            <el-table-column prop="person_name" label="姓名" align='center'></el-table-column>
            <el-table-column prop="person_sex" label="性别" align='center'></el-table-column>
            <el-table-column prop="person_birthday" label="出生日期" align='center'></el-table-column>
            <el-table-column prop="person_place" label="所在地" align='center'>
              <template slot-scope="scope">
                {{getName(scope.row.person_place)}}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align='center'>
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="授权" placement="top">
                    <el-button @click="givePermission(scope.row)" type="text" size="small" :disabled="scope.row.person_ismanage==1">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shouquan"></use>
                      </svg>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <el-button @click="deletePerson(scope.row)" type="text" size="small">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shanchu"></use>
                      </svg> 
                    </el-button>
                  </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import {regionData} from 'element-china-area-data'
export default {
  components:{},
  data(){
    return {
      personList:[],
      personSearchList:[],
      searchAccount:"",
      regionObj:{},
      regionData:regionData,
    }
  },
  created(){},
  mounted(){
    this.saveName(this.regionData);
    this.searchPerson();
    console.log(this.regionObj);
  },
  watch:{},
  computed:{},
  methods:{
      searchPerson(){
          this.$axios.get("/manage/searchPerson",{}).then(res=>{
              this.personList = res.data.msg;
              this.personSearchList=this.personList;
          });
      },
      saveName(region){
        region.forEach(item=>{
          this.regionObj[item.value]=item.label;
          if(item.children){
            this.saveName(item.children);
          }
        });
      },
      getName(region){
        let regionList = region.split(",");
        regionList = regionList.map((item)=>{
          return this.regionObj[item];
        });
        return regionList.join("/");
      },
      givePermission(row){
        this.$confirm(`是否将${row.person_account}设置成管理员?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$axios.post("/manage/grantPermissions",{
            personAccount:row.person_account
          }).then(res=>{
            if(res.data.status=="0"){
              this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
            this.searchPerson();
          });
        });
      },
      deletePerson(row){
        this.$confirm(`是否将用户${row.person_account}删除?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(()=>{
          this.$axios.post("/manage/delete",{
            personAccount:row.person_account
          }).then(res=>{
            if(res.data.status=="0"){
              this.$message.success(res.data.msg);
            }else{
              this.$message.error(res.data.msg);
            }
            this.searchPerson();
          });
        });
      },
      search(){
        let arr=[];
        this.personList.forEach(item=>{
          if(item.person_account.includes(this.searchAccount)){
            arr.push(item);
          }          
        });
        this.personSearchList=arr;
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