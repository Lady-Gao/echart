import CvEchart from './src/echart.vue'

CvEchart.install = function(Vue) {
    Vue.component(CvEchart.name, CvEchart);
}

export default CvEchart;