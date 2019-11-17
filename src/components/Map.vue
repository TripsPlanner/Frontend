<template>
  <div id="all">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'map',
  props: {
    markerArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      address_detail: null, //详细地址
      userlocation: { lng: '', lat: '' },
    };
  },
  watch: {
    markerArr(val) {
      this.markMap(val);
    },
  },
  mounted() {
    this.markMap(this.markerArr);
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
    markMap(markerArr) {
      //   var markerArr = this.markerArr
      var map = new BMap.Map('map'); // 创建Map实例
      var point = new BMap.Point(110.488773, 29.11817); //地图中心点，广州市
      map.centerAndZoom(point, 9); // 初始化地图,设置中心点坐标和地图级别。
      map.enableScrollWheelZoom(true); //启用滚轮放大缩小
      //向地图中添加缩放控件
      var ctrlNav = new window.BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
      });
      map.addControl(ctrlNav);

      //向地图中添加缩略图控件
      var ctrlOve = new window.BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1,
      });
      map.addControl(ctrlOve);

      //向地图中添加比例尺控件
      var ctrlSca = new window.BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT,
      });
      map.addControl(ctrlSca);

      var point = new Array(); //存放标注点经纬信息的数组
      var marker = new Array(); //存放标注点对象的数组
      var info = new Array(); //存放提示信息窗口对象的数组
      for (var i = 0; i < markerArr.length; i++) {
        var p0 = markerArr[i].point.split(',')[0]; //
        var p1 = markerArr[i].point.split(',')[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
        point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
        marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
        map.addOverlay(marker[i]);
        marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        var label = new window.BMap.Label(markerArr[i].title, {
          offset: new window.BMap.Size(20, -10),
        });
				marker[i].setLabel(label);
        info[i] = new window.BMap.InfoWindow(
          '<p style=’font-size:12px;lineheight:1.8em;’>' +
            markerArr[i].title +
            '</br>地址：' +
            markerArr[i].address +
            '</br> 电话：' +
            markerArr[i].tel +
            '</br></p>',
				); // 创建信息窗口对象
				console.log(info[i]);
				marker[i].addEventListener('mouseover', () => {
					// marker[i].openInfoWindow(info[i]);  
					window.openInfoWindow(info[i])
				})
      }
    },
  },
};
</script>
<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
