<template>
  <div id="all">
    <input
      type="text"
      id="suggestId"
      name="address_detail"
      placeholder="地址"
      v-model="address_detail"
      class="input_style"
    />
    <!-- <div id="allmap"></div> -->
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'map',
  data() {
    return {
      address_detail: null, //详细地址
      userlocation: { lng: '', lat: '' },
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.searchMap()
      this.markMap()
    });
  },
  methods: {
    searchMap() {
      var th = this;
      // 创建Map实例
      var map = new BMap.Map('allmap');
      // 初始化地图,设置中心点坐标，
      var point = new BMap.Point(121.160724, 31.173277); // 创建点坐标，汉得公司的经纬度坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom();
      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: 'suggestId',
        location: map,
      });
      var myValue;
      ac.addEventListener('onconfirm', function(e) {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        this.address_detail = myValue;
        setPlace();
      });

      function setPlace() {
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
          th.userlocation = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18);
          map.addOverlay(new BMap.Marker(th.userlocation)); //添加标注
        }

        var local = new BMap.LocalSearch(map, {
          //智能搜索
          onSearchComplete: myFun,
        });
        local.search(myValue);

        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener('click', function(e) {
          //经度
          console.log(th.userlocation.lng);
          //维度
          console.log(th.userlocation.lat);
        });
      }
    },
    markMap() {
      var markerArr = [
          { title: "名称：张家界天门山", point: "110.488773,29.118170", address: "湖南张家界", tel: "qweqwewq" },  
          { title: "名称：广州塔（赤岗塔）", point: "113.330934,23.113401", address: "广东省广州市广州塔（赤岗塔） ", tel: "18500000000" },  
          { title: "名称：广州动物园", point: "113.312213,23.147267", address: "广东省广州市广州动物园", tel: "18500000000" },  
          { title: "名称：天河公园", point: "113.372867,23.134274", address: "广东省广州市天河公园", tel: "18500000000" }  

      ];  
      var map = new BMap.Map("map"); // 创建Map实例  
      var point = new BMap.Point(110.488773, 29.118170); //地图中心点，广州市  
      map.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别。  
      map.enableScrollWheelZoom(true); //启用滚轮放大缩小  
      //向地图中添加缩放控件  
      var ctrlNav = new window.BMap.NavigationControl({  
          anchor: BMAP_ANCHOR_TOP_LEFT,  
          type: BMAP_NAVIGATION_CONTROL_LARGE  
      });  
      map.addControl(ctrlNav);  

      //向地图中添加缩略图控件  
      var ctrlOve = new window.BMap.OverviewMapControl({  
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,  
          isOpen: 1  
      });  
      map.addControl(ctrlOve);  

      //向地图中添加比例尺控件  
      var ctrlSca = new window.BMap.ScaleControl({  
          anchor: BMAP_ANCHOR_BOTTOM_LEFT  
      });  
      map.addControl(ctrlSca);  

      var point = new Array(); //存放标注点经纬信息的数组  
      var marker = new Array(); //存放标注点对象的数组  
      var info = new Array(); //存放提示信息窗口对象的数组  
      for (var i = 0; i < markerArr.length; i++) {  
          var p0 = markerArr[i].point.split(",")[0]; //  
          var p1 = markerArr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来  
          point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点  
          marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记  
          map.addOverlay(marker[i]);  
          marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画  
          var label = new window.BMap.Label(markerArr[i].title, { offset: new window.BMap.Size(20, -10) });  
          marker[i].setLabel(label);  
          info[i] = new window.BMap.InfoWindow("<p style=’font-size:12px;lineheight:1.8em;’>" + markerArr[i].title + "</br>地址：" + markerArr[i].address + "</br> 电话：" + markerArr[i].tel + "</br></p>"); // 创建信息窗口对象  
      }  
      marker[0].addEventListener("mouseover", function () {  
          this.openInfoWindow(info[0]);  
      });  
      marker[1].addEventListener("mouseover", function () {  
          this.openInfoWindow(info[1]);  
      });  
      marker[2].addEventListener("mouseover", function () {  
          this.openInfoWindow(info[2]);  
      });
    }
  },
};
</script>
<style scoped>
#allmap, #map {
  width: 100%;
  height: 100vh;
  font-family: '微软雅黑';
  border: 1px solid green;
}
</style>
