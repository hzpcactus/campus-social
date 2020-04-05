<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div ref="lineChart" :style="{width: '100%', height: '460px'}"></div>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
      charts:null,
      loading:true
    }
  },
  created(){},
  mounted(){
    this.getLineChart();
  },
  watch:{},
  computed:{},
  methods:{
    async getLineChart(){
      let data = (await this.$axios.get("/manage/getOnlineData",{})).data.msg;
      let dateTimeArr=[],onlineNumberArr=[];
      data.forEach(item=>{
        dateTimeArr.push(item.date_time);
        onlineNumberArr.push(item.online_number);
      });
      let lineChart = this.$echarts.init(this.$refs.lineChart);
      this.charts = lineChart;
      let option = {
        title: {
            text: '每天在线人数折线图',
            left:'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                return "日期："+params.name+ "<br>在线总人数："+params.value
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'category',
            data: dateTimeArr
        },
        yAxis: {
            type: 'value',
            minInterval:1
        },
        series: [{
            data: onlineNumberArr,
            type: 'line'
        }]
      };
      if(data){
        this.loading = false;
        lineChart.setOption(option);
      }
    }
  },
}
</script>
<style lang="less" scoped>

</style>