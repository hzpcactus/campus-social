<template>
  <div>
    <el-card>
      <el-row type="flex" align="middle">
          <el-col :span="2"><span>所在地：</span></el-col>
          <el-col :span="20">
            <el-select v-model="schoolPlace" filterable style="width:100%;" @change="getHistogram">
                <el-option
                v-for="item in regionData"
                :key="item.value"
                :label="item.label"
                :value="getProvince(item.label)"
                >
                </el-option>
            </el-select>
          </el-col>
      </el-row>
    </el-card>
    <div ref="histogramChart" v-show="isHaveMsg" style="width:100%;height:418px;"></div>
    <div v-show="!isHaveMsg" style="width:100%;height:418px;position:relative;">
       <div class="bg-img" ></div>
    </div>
  </div>
</template>

<script>
import {regionData} from 'element-china-area-data'
export default {
  components:{},
  data(){
    return {
      regionData:regionData,
      schoolPlace:"",
      isHaveMsg:true,
      charts:null
    }
  },
  created(){},
  mounted(){
    this.schoolPlace = this.getProvince(regionData[0].label)
    this.getHistogram(this.schoolPlace);
    // console.log(regionData);
  },
  watch:{},
  computed:{},
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods:{
    getProvince(province){
      if(province.includes("内蒙古")){
        province=province.substr(0,3);
      }else if(province.includes("自治区")||province.includes("特别行政区")){
        province=province.substr(0,2);
      }else{
        province=province.substr(0,province.length-1);
      }
      return province;
    },
    async getHistogram(val){
      console.log(this.schoolPlace);
      let schoolObj = (await this.$axios.post("/manage/getschool",{region:val})).data.msg;
      console.log(schoolObj);
      let schoolNameArr=[],schoolValueArr=[];
      for(let [key,value] of Object.entries(schoolObj)){
        schoolNameArr.push(key);
        schoolValueArr.push(value);
      }
      console.log(schoolNameArr,schoolValueArr);
      let histogramChart = this.$echarts.init(this.$refs.histogramChart);
      this.charts = histogramChart;
      let option = {
            color: ['#409eff'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: schoolNameArr,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    minInterval:1
                }
            ],
            series: [
                {
                    name: '学生使用人数',
                    type: 'bar',
                    barWidth: '30%',
                    data: schoolValueArr
                }
            ]
        };
        if(Object.keys(schoolObj).length === 0){    //判断所在地是否有数据
            this.isHaveMsg=false;
        }else{
            this.isHaveMsg=true;
            histogramChart.setOption(option);
        }

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
  background: url(//s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/nodata.4d721f9d.png) center/contain no-repeat;
}
</style>