<template>
    <div :class="'cv-echart '+name" ref="chart">
    </div>
</template>
<script>
import service from 'utils/service'

export default {
    name: 'CvEchart',
    props: {
        data: {},
        name: {
            type: String,
            default: 'line'
        }
    },
    data() {
        return {
            // chartdom元素
            chart: null,
            throttle: null,
            //lineData
            lineOptions: {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: ""
                },
                legend: {
                    data: []
                },
                grid: {
                    top: '10px',
                    left: '30px',
                    right: '40px',
                    bottom: '25px',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['暂', '无', '数', '据']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    type: 'line',
                    data: [0, 0, 0, 0]
                }]
            },
            //pieData
            pieOptions: {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    data: []
                },
                series: [{
                    name:'--',
                    type: 'pie',
                    center: ['50%', '50%'],
                    data: [{
                            value: 0,
                            name: '暂'
                        },
                        {
                            value: 0,
                            name: '无'
                        },
                        {
                            value: 0,
                            name: '数'
                        },
                        {
                            value: 0,
                            name: '据'
                        }
                    ]
                }],
                color: ['#00a5d6', '#00e4e2', '#ffd970', '#ff6693', '#8078e4', '#edb9f0']
            },
            //barData
            barOptions: {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['暂', '无', '数', '据'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [0, 0, 0, 0]
                }]
            },
            //gaugeCarData
            gaugeCarOptions: {
                backgroundColor: '#1b1b1b',
                tooltip: {
                    formatter: "{a} <br/>{c} {b}"
                },
                series: [{
                        name: '油耗百分比',
                        type: 'gauge',
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        radius: '50%',
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [0.09, 'lime'],
                                    [0.82, '#1e90ff'],
                                    [1, '#ff4500']
                                ],
                                width: 3,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: { // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 15, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: { // 分隔线
                            length: 25, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: { // 分隔线
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 10,
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail: {
                            backgroundColor: 'rgba(30,144,255,0.8)',
                            borderWidth: 1,
                            borderColor: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 5,
                            offsetCenter: [0, '50%'], // x, y，单位px
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                color: '#fff'
                            }
                        },
                        data: [{
                            value: 0,
                            name: '油耗百分比(%)'
                        }]
                    },
                    {
                        name: '转速',
                        type: 'gauge',
                        center: ['25%', '55%'], // 默认全局居中
                        radius: '40%',
                        min: 0,
                        max: 7,
                        endAngle: 45,
                        splitNumber: 7,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [0.29, 'lime'],
                                    [0.86, '#1e90ff'],
                                    [1, '#ff4500']
                                ],
                                width: 2,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: { // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 12, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: { // 分隔线
                            length: 20, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {
                            width: 5,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title: {
                            offsetCenter: [0, '-30%'], // x, y，单位px
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail: {
                            //backgroundColor: 'rgba(30,144,255,0.8)',
                            // borderWidth: 1,
                            borderColor: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 5,
                            width: 80,
                            height: 30,
                            offsetCenter: [25, '20%'], // x, y，单位px
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                color: '#fff'
                            }
                        },
                        data: [{
                            value: 0,
                            name: 'x1000 r/min'
                        }]
                    },
                    {
                        name: '油表',
                        type: 'gauge',
                        center: ['75%', '50%'], // 默认全局居中
                        radius: '30%',
                        min: 0,
                        max: 2,
                        startAngle: 135,
                        endAngle: 45,
                        splitNumber: 2,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [0.2, 'lime'],
                                    [0.8, '#1e90ff'],
                                    [1, '#ff4500']
                                ],
                                width: 2,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 12, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: {
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            },
                            formatter: function(v) {
                                switch (v + '') {
                                    case '0':
                                        return 'E';
                                    case '1':
                                        return 'Gas';
                                    case '2':
                                        return 'F';
                                }
                            }
                        },
                        splitLine: { // 分隔线
                            length: 15, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {
                            width: 2,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            show: false
                        },
                        data: [{
                            value: 0,
                            name: 'gas'
                        }]
                    },
                    {
                        name: '水表',
                        type: 'gauge',
                        center: ['75%', '50%'], // 默认全局居中
                        radius: '30%',
                        min: 0,
                        max: 2,
                        startAngle: 315,
                        endAngle: 225,
                        splitNumber: 2,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [0.2, 'lime'],
                                    [0.8, '#1e90ff'],
                                    [1, '#ff4500']
                                ],
                                width: 2,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            show: false
                        },
                        axisLabel: {
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            },
                            formatter: function(v) {
                                switch (v + '') {
                                    case '0':
                                        return 'H';
                                    case '1':
                                        return 'Water';
                                    case '2':
                                        return 'C';
                                }
                            }
                        },
                        splitLine: { // 分隔线
                            length: 15, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 3,
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {
                            width: 2,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            show: false
                        },
                        data: [{
                            value: 0.5,
                            name: 'gas'
                        }]
                    }
                ]
            },
            //mapData
            mapOptions: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                visualMap: {
                    // max:1000,
                    // min:0,
                    left: '30',
                    bottom: '50',
                    // text: ['高','低'],           // 文本，默认为数值文本
                    // calculable: true,
                    // textGap:['100px']
                    // inRange: {
                    //  color: ['lightskyblue','yellow', 'orangered']
                    // }
                },
                series: [{
                    name: '中国',
                    type: 'map',
                    mapType: 'china',
                    selectedMode: 'multiple',
                    left: 'center',
                    top: '30px',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    aspectScale: 0.8,
                    itemStyle: {
                        normal: {
                            borderWidth: .5, //区域边框宽度
                            borderColor: '#000', //区域边框颜色
                            areaColor: "#eee", //区域颜色
                        },
                        emphasis: {
                            borderWidth: .5,
                            borderColor: '#4b0082',
                            areaColor: "#ffdf33",
                        }
                    },
                    data: [{
                            name: '北京',
                            value: 0
                        },
                        {
                            name: '天津',
                            value: 0
                        },
                        {
                            name: '上海',
                            value: 0
                        },
                        {
                            name: '重庆',
                            value: 0
                        },
                        {
                            name: '河北',
                            value: 0
                        },
                        {
                            name: '河南',
                            value: 0
                        },
                        {
                            name: '云南',
                            value: 0
                        },
                        {
                            name: '辽宁',
                            value: 0
                        },
                        {
                            name: '黑龙江',
                            value: 0
                        },
                        {
                            name: '湖南',
                            value: 0
                        },
                        {
                            name: '安徽',
                            value: 0
                        },
                        {
                            name: '山东',
                            value: 0
                        },
                        {
                            name: '新疆',
                            value: 0
                        },
                        {
                            name: '江苏',
                            value: 0
                        },
                        {
                            name: '浙江',
                            value: 0
                        },
                        {
                            name: '江西',
                            value: 0
                        },
                        {
                            name: '湖北',
                            value: 0
                        },
                        {
                            name: '广西',
                            value: 0
                        },
                        {
                            name: '甘肃',
                            value: 0
                        },
                        {
                            name: '山西',
                            value: 0
                        },
                        {
                            name: '内蒙古',
                            value: 0
                        },
                        {
                            name: '陕西',
                            value: 0
                        },
                        {
                            name: '吉林',
                            value: 0
                        },
                        {
                            name: '福建',
                            value: 0
                        },
                        {
                            name: '贵州',
                            value: 0
                        },
                        {
                            name: '广东',
                            value: 0
                        },
                        {
                            name: '青海',
                            value: 0
                        },
                        {
                            name: '西藏',
                            value: 0
                        },
                        {
                            name: '四川',
                            value: 0
                        },
                        {
                            name: '宁夏',
                            value: 0
                        },
                        {
                            name: '海南',
                            value: 0
                        },
                        {
                            name: '台湾',
                            value: 0
                        },
                        {
                            name: '香港',
                            value: 0
                        },
                        {
                            name: '澳门',
                            value: 0
                        },
                    ]
                }]
            }
        }
    },
    methods: {
        getEchartScript(callback) {
            if (!global.echarts) {
                global.echarts = {};
                global.echarts._preloader = new Promise((resolve, reject) => {
                    const $script = document.createElement('script');
                    $script.type = 'text/javascript';
                    $script.src = `http://lib.cvtsp.com/echarts/echarts.min.js`;
                    global.document.body.appendChild($script);
                    if (service.isIe() && service.IE_VERSION < 11) {
                        $script.onreadystatechange = function() {
                            if ($script.readyState == 'loaded' || $script.readyState == 'complete') {
                                resolve(global.echarts);
                                global.echarts._preloader = null;
                            }
                        }
                    } else {
                        $script.onload = function() {
                            resolve(global.echarts);
                            global.echarts._preloader = null;
                        }
                    }
                })
                return global.echarts._preloader;
            } else if (!global.echarts._preloader) {
                return Promise.resolve(global.echarts);
            } else {
                return global.echarts._preloader;
            }
        },
        linearGradient(left, bottom, right, top, array) {
            return new echarts.graphic.LinearGradient(left, bottom, right, top, array);
        },
        getEchart() {
            return this.chart;
        },
        setOptions() {
            if (this.name === 'map') {
                //echarts.registerMap('china', require('./model/echarts/src/china').default)
            }
            this.chart = echarts.init(this.$refs['chart']);
            switch (this.name) {
                case 'line':
                    this.chart.setOption(
                        service.isEmptyObject(this.data) ?
                        this.lineOptions :
                        this.data
                    );
                    console.log( this)
                    break;
                case 'bar':
                    this.chart.setOption(
                        service.isEmptyObject(this.data) ?
                        this.barOptions :
                        this.data
                    );
                    break;
                case 'pie':
                    this.chart.setOption(
                        service.isEmptyObject(this.data) ?
                        this.pieOptions :
                        this.data
                    );
                    break;
                case 'map':
                    this.chart.setOption(service.isEmptyObject(this.data) ?
                        this.mapOptions :
                        this.data
                    );
                    break;
                case 'gaugeCar':
                    this.chart.setOption(
                        service.isEmptyObject(this.data) ?
                        this.gaugeCarOptions :
                        this.data
                    );
                    break
            };
        },
        reiszeEchart() {
            this.chart && this.chart.resize();
        }
    },
    watch: {
        data(newVal) {
            if (!echarts) return;
            if (this.name === 'map') {
                //echarts.registerMap('china', require('./model/echarts/src/china').default)
            }
            this.chart = echarts.init(this.$refs['chart']);
            switch (this.name) {
                case 'line':
                    service.extend(this.lineOptions, newVal);
                    this.chart.clear();
                    this.chart.setOption(this.lineOptions);
                    break;
                case 'bar':
                    service.extend(this.barOptions, newVal);
                    this.chart.clear();
                    this.chart.setOption(this.barOptions);
                    break;
                case 'pie':
                    service.extend(this.pieOptions, newVal);
                    this.chart.clear();
                    this.chart.setOption(this.pieOptions);
                    break;
                case 'map':
                    service.extend(this.mapOptions, newVal);
                    this.chart.clear();
                    this.chart.setOption(this.mapOptions);
                    break;
                case 'gaugeCar':
                    service.extend(this.gaugeCarOptions, newVal);
                    this.chart.clear();
                    this.chart.setOption(this.gaugeCarOptions);
                    break;
            }
        }
    },
    beforeMount() {
        this.throttle = service.throttle(() => {
            this.reiszeEchart();
        })
    },
    beforeDestory() {
        window.removeEventListener('resize', this.throttle);
    },
    mounted() {
        const {
            getEchartScript,
            setOptions
        } = this;
        getEchartScript().then(setOptions);
        window.addEventListener("resize", this.throttle);
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
    .cv-echart {
        min-height: 200px;
    }
</style>


