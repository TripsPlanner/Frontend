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
              placeholder="请输入目的地"
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
          <div>
            <el-button @click="recommend">查看推荐景点</el-button>
            <el-button @click="popular">查看热门景点</el-button>
          </div>
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
        sectionsColor: ['#41b883', '#ffffff', '#0798ec'],
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
    recommend() {
      const formErrorMsg = {
        startDate: '请先输入开始日期',
        endDate: '请先输入结束日期',
        startTime: '请先选择游玩时间',
        endTime: '请先选择游玩时间',
        city: '请先输入目的地',
      }
      for(let key in this.form) {
        if (!this.form[key]) {
          this.$message(formErrorMsg[key]);
          return;
        }
      }
      this.getListData()
      this.$refs.fullpage.api.moveSectionDown();
    },
    popular() {
      if (!this.form.city) {
        this.$message('请先输入目的地');
        return;
      }
      this.popularSearch()
      this.$refs.fullpage.api.moveSectionDown();
    },
    handleData(list) {
      let result = []
      for(let item of list) {
        result.push({
          point: item.coordinateX + ',' +item.coordinateY,
          title: item.city + item.destination,
          address: item.address,
          photo: item.photo,
          favorite: item.favorite
        })
      }
      return result;
    },
    // 热门
    popularSearch() {
      const loading = this.$loading({
        lock: false,
        text: '提交中',
        background: 'rgba(0, 0, 0, 0.4)'
      })
      this.$axios({
        url: '/popular/search',
        params: {
          target: this.form.city
        }
      }).then(res => {
        loading.close()
        if (res.code === 0) {
          this.markerArr = this.handleData(res.data)
        }
      })
    },
    // 推荐
    getListData() {
      const {
        startDate,
        endDate,
        startTime,
        endTime,
        city,
      } = this.form;
      const loading = this.$loading({
        lock: false,
        text: '提交中',
        background: 'rgba(0, 0, 0, 0.4)'
      })
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
        loading.close()
        if (res.code === 0) {
          this.markerArr = this.handleRecommandData(res.data)
        }
      })
    },
    handleRecommandData(list) {
      let result = []
      for(let item of list) {
        result.push({
          point: item.CoordinateX + ',' +item.CoordinateY,
          title: item.N,
          address: item.N,
          photo: '',
          favorite: ''
        })
      }
      return result
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
  .searchBox {
    margin-bottom: 20px;
    width: 50vw;
  }
  .myDate {
    width: 150px;
  }
  .myTime {
    width: 110px;
  }
}
</style>
