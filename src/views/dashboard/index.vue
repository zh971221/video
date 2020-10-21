<template>
  <div class="app">
    <div id="myChart" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>

import echarts from 'echarts'

export default {
  data() {
    return {
      
    }
  },
  mounted() {
    this.drawLine();
  },
 methods: {
   drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '订单情况' },
            tooltip: {},
            xAxis: {
            type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
        }]
        });
   },
   
 },

}
</script>