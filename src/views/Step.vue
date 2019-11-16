<template>
  <div>
    <full-page ref="fullpage" :options="options">
      <div class="section">
        <div class="section1">
          <div class="text">
            <h1>欢迎来到旅行规划师</h1>
            <el-button @click="$refs.fullpage.api.moveSectionDown()"
              >开始您的旅行规划</el-button
            >
          </div>
          <wenxiang />
        </div>
      </div>
      <div class="section">
        <div class="section2">
          <div class="searchBox">
            <el-input
              placeholder="请输入地区"
              v-model="form.city">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="开始时间">
              <el-date-picker
                class="myDate"
                v-model="form.startDate"
                type="date"
                placeholder="开始日期">
              </el-date-picker>
              <el-select v-model="form.startTime" placeholder="上午/下午" class="myTime">
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                class="myDate"
                v-model="form.endDate"
                type="date"
                placeholder="结束日期">
              </el-date-picker>
              <el-select v-model="form.endTime" placeholder="上午/下午" class="myTime">
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- <el-button>搜索</el-button> -->
          <!-- <el-input placeholder="请输入地区" v-model="form.city">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input> -->
          <el-button @click="genMap">下一步</el-button>
        </div>
      </div>
      <div class="section">
        <Map :markerArr="markerArr" />
      </div>
    </full-page>
  </div>
</template>

<script>
import Vue from 'vue';
import wenxiang from '@/components/wenxiang';
import LightingText from '@/components/LightingText';
import Map from '@/components/Map';
import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true
import VueFullPage from 'vue-fullpage.js';
Vue.use(VueFullPage);

export default {
  components: {
    wenxiang,
    LightingText,
    Map,
  },
  data() {
    return {
      options: {
        controlArrows: false,
        sectionsColor: ['#41b883', '#cccccc', '#0798ec'],
      },
      form: {
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        city: null,
      },
      markerArr: [
        {
          title: '名称：广州塔（赤岗塔）',
          point: '113.330934,23.113401',
          address: '广东省广州市广州塔（赤岗塔） ',
          tel: '18500000000',
        },
        {
          title: '名称：广州动物园',
          point: '113.312213,23.147267',
          address: '广东省广州市广州动物园',
          tel: '18500000000',
        },
        {
          title: '名称：天河公园',
          point: '113.372867,23.134274',
          address: '广东省广州市天河公园',
          tel: '18500000000',
        },
      ],
    };
  },
  mounted() {
    this.$refs.fullpage.api.setAllowScrolling(false);
    this.$refs.fullpage.api.setKeyboardScrolling(false);
  },
  methods: {
    genMap() {
      this.$refs.fullpage.api.moveSectionDown();
      this.markerArr = [{
        title: '名称：张家界天门山',
        point: '110.488773,29.118170',
        address: '湖南张家界',
        tel: 'qweqwewq',
      }]
    },
  },
};
</script>

<style lang="scss" scoped>
.section1 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding-top: 30%;
  .text {
    z-index: 4;
    h1 {
      color: #ffffff;
    }
  }
}
.section2 {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
</style>
