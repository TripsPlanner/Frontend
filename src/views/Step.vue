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
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
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
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
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
      timeOptions: [{
          value: 'am',
          label: '上午'
        },{
          value: 'pm',
          label: '下午'
        }],
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
      this.getListData()
    },
    handleData(list) {
      let result = []
      for(let item of list) {
        result.push({
          point: item.coordinateX + ',' +item.coordinateY,
          title: item.city + item.destination,
          address: item.address,
          photo: item.photo,
          tel: item.favorite
        })
      }
      return result;
    },
    getListData() {
      let markerArr = [
        {
          "id": 1,
          "tid": 1024,
          "destination": "天门山",
          "address": "张家界市永定区南部8公里处",
          "favorite": 10,
          "stime": 4,
          "coordinateX": 110.488773,
          "coordinateY": 29.11817,
          "city": "张家界",
          "photo": "https://p4-q.mafengwo.net/s10/M00/38/10/wKgBZ12AWPSAGibIAAEKOqBNYYE213.jpg"
        },
        {
          "id": 2,
          "tid": 1025,
          "destination": "大峡谷玻璃桥",
          "address": "张家界大峡谷景区,位于张家界市的慈利县三家寺乡",
          "favorite": 8,
          "stime": 8,
          "coordinateX": 110.707811,
          "coordinateY": 29.40118,
          "city": "张家界",
          "photo": "https://p1-q.mafengwo.net/s11/M00/79/E8/wKgBEFsaNbiATuM8AAsrx8BmJgg86.jpeg"
        },
        {
          "id": 5,
          "tid": 1028,
          "destination": "国家森林公园",
          "address": "湖南省张家界市武陵源区金鞭路279号",
          "favorite": 8,
          "stime": 16,
          "coordinateX": 110.441345,
          "coordinateY": 29.321096,
          "city": "张家界",
          "photo": "http://zjj.cqyouqia.com/upload/201911/09/201911091315224384.jpg"
        },
        {
          "id": 3,
          "tid": 1026,
          "destination": "苗寨",
          "address": "湖南省军地坪武陵源风景名胜区",
          "favorite": 7,
          "stime": 8,
          "coordinateX": 110.005176,
          "coordinateY": 29.395766,
          "city": "张家界",
          "photo": "https://p3-q.mafengwo.net/s5/M00/F6/0E/wKgB21AGepW1vTaXABDIDleo5kE54.jpeg"
        },
        {
          "id": 4,
          "tid": 1027,
          "destination": "凤凰古城",
          "address": "湖南省湘西土家族苗族自治州的西南部",
          "favorite": 7,
          "stime": 8,
          "coordinateX": 109.609029,
          "coordinateY": 27.953214,
          "city": "张家界",
          "photo": "https://p2-q.mafengwo.net/s13/M00/36/C1/wKgEaVyjadiAAvf4AAJ7W7tTMLM96.jpeg"
        }
      ]
      this.markerArr = this.handleData(markerArr)
      const {
        startDate,
        endDate,
        startTime,
        endTime,
        city,
      } = this.form;
      this.$axios({
        url: '/guideline/search',
        methods: 'get',
        params: {
          target: city,
          start_time: startDate,
          start_stage: startTime,
          end_time: endDate,
          end_stage: endTime,
        }
      }).then(res => {
        console.log(res);
      })
    }
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
  padding-top: 10%;
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
