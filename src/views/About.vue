<template>
<el-container>
  <el-header class="header">
    <h1 class="title">旅行规划师</h1>
  </el-header>
  <el-main class="main">
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
    <el-button>搜索</el-button>
  </el-main>
</el-container>
</template>

<script>
  export default {
    data() {
      return {
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
          city: null
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss" scoped>
.header {
  background: #292b2c;
  color: #ffffff;
  .title {

  }
}
.main {
  background: #f0f0f0;
  .searchBox {
    margin-bottom: 20px;
  }
  .myDate {
    width: 150px;
  }
  .myTime {
    width: 110px;
  }
}
</style>