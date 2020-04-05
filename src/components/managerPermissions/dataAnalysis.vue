<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div ref="mapChart" :style="{width: '100%', height: '460px'}"></div>
  </div>
</template>

<script>
import 'echarts/map/js/china'
import regionCoordinates from '../../tools/coordinates'  //获取城市坐标键值对
import {regionData} from 'element-china-area-data'
export default {
  components:{},
  data(){
    return {
      regionObj:{},
      loading:true,
      chart:null
    }
  },
  created(){},
  mounted(){
    this.saveName(regionData);
    console.log(this.regionObj);
    this.getMap();
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
    async getMap(){
        let data = (await this.$axios.get("/manage/getAddress",{})).data.msg;
        let mapChart = this.$echarts.init(this.$refs.mapChart);
        this.chart = mapChart;
        this.loading=false;
        let option = {
            title:{
              text:'全国用户数据分布图',
              left:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter :function(params){
                  let data1=params.data;
                  return `所在地：${data1.name} <br> 人数：${data1.value[2]}`;
                  // console.log(params);
                }
            },
            geo:{
              map:'china',
              label: {
                normal: {
                  show: true, // 是否显示对应地名
                  textStyle: {
                    color: 'rgba(0,0,0,0.4)'
                  }
                }
              },
              zoom: 1.1,
              itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            },
            series: [{
                type: 'scatter',
                coordinateSystem: 'geo', // 对应上方配置
                hoverAnimation: true,
                showEffectOn: 'render',
                data: this.convertData(data),
                symbolSize: function (val) {
                    return val[2]*5;
                },
                label: {
                    formatter: '{@[2]}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                  label: {
                      show: true
                  }
                }
            }]
        };
        mapChart.setOption(option,true);
        // mapChart.on('click',function(params){
        //     console.log(params);
        //     this.$axios.get('/manage/getschool',{region:params.region.name}).then(res=>{
              
        //     });
        //     mapChart.setOption(option2, true);
        // })
    },
    saveName(region){
        region.forEach(item=>{
          if(item.label.length==2){
            this.regionObj[item.value]=item.label;
          }else if(item.label.includes("内蒙古")){
            this.regionObj[item.value]=item.label.substr(0,3);
          }else if(item.label.includes("自治区")||item.label.includes("特别行政区")){
            this.regionObj[item.value]=item.label.substr(0,2);
          }else{
            this.regionObj[item.value]=item.label.substr(0,item.label.length-1);
          }

          if(item.children){
            this.saveName(item.children);
          }
        });
    },
    convertData(data) {
        let res = [];
        for (var i = 0; i < data.length; i++) {
            let geoCoord = regionCoordinates[this.regionObj[data[i].name]];
          console.log(this.regionObj[data[i].name],geoCoord);
            if (geoCoord) {
                res.push({
                    name: this.regionObj[data[i].name],
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        console.log(res);
        return res;
    }
  },
}
</script>
<style lang="less" scoped>

</style>