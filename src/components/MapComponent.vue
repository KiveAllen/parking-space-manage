<template>
  <div id="container"></div>
  <div id="panel"></div>
</template>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import {useRouter} from "vue-router";
import {listParkingSpaceByPageUsingPost} from "../api/parkingSpaceController";
import {locationCenter} from "../store/locationCenter";

const router = useRouter();

let map = null;
let driving = null;

const createMap = async () => {
  window._AMapSecurityConfig = {
    securityJsCode: "fb26bd68e3810266239fa535b108f0f2",
  };
  AMapLoader.load({
    key: "fbb1c616ee8188f59672b5288f4ed1ec", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0",
    plugins: ["AMap.Scale", "AMap.PlaceSearch", "AMap.ToolBar", "AMap.Driving", "AMap.DragRoute"],
  }).then((AMap) => {
    map = new AMap.Map("container", {
      // 设置地图容器id
      viewMode: "3D", // 是否为3D地图模式
      zoom: 13, // 初始化地图级别
      center: center
    });
    // 添加工具条
    const toolbar = new AMap.ToolBar(); //创建工具条插件实例
    map.addControl(toolbar); //添加工具条插件到页面

    //构造路线导航类
    driving = new AMap.Driving({
      map: map,
      panel: "panel"
    });

    // 绘制路线
    // drawRoute([114.404840, 23.053223])
  })
      .catch((e) => {
        console.log(e);
      });


  setTimeout(async () => {
    const parkList = await listParkingSpaceByPageUsingPost({
      pageNum: 1,
      pageSize: 100,
      longitude: center[0],
      latitude: center[1],
    });
    parkList.data.records.forEach((item) => {
      addMarker(item.longitude, item.latitude, item.id);
    });
  }, 1000)
};

const destroyMap = () => {
  map?.destroy();
};

// 惠州学院
const center = locationCenter;

// 设置经纬度
const setLngLat = (lng, lat) => {
  console.log(lng, lat)
  map?.setCenter([lng, lat]);
};

// 添加点标记
const addMarker = (lng, lat, value) => {
  const marker = new AMap.Marker({
    position: [lng, lat],
    icon: "public/park.svg",
    offset: new AMap.Pixel(-11, -22),
    value: value
  });
  marker.on("click", (e) => {
    console.log(e);
    router.push({
      path: '/park/detail',
      query: {
        id: value,
      }
    })

  });
  map?.add(marker);
};

// 清空点标记
const clearMarker = () => {
  map?.clearMap();
};

// 绘制路线
const drawRoute = (end) => {
  // 根据起终点经纬度规划驾车导航路线
  driving.search(
      center,
      end,
      function (status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === 'complete') {
          console.log('绘制驾车路线完成')
          map.setCenter(center)
        } else {
          console.log('获取驾车数据失败：' + result)
        }
      });
};


defineExpose({
  setLngLat,
  addMarker,
  clearMarker,
  destroyMap,
  createMap,
  drawRoute
});

</script>


<style scoped>
#container {
  width: 100%;
  height: 100%;
}

#panel {
  position: fixed;
  background-color: white;
  max-height: 30%;
  overflow-y: auto;
  top: 25px;
  right: 0;
  width: 100%;
}

.custom-content-marker {
  position: relative;
  width: 25px;
  height: 34px;
}

.custom-content-marker img {
  width: 100%;
  height: 100%;
}

</style>
