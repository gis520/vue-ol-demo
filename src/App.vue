<template>
  <div id="app">
    <div class="header">
      <img alt="Vue logo" src="./assets/logo.png" />
      <ul class="menu">
        <li @click="initDraw('line')">长度测量</li>
        <li @click="initDraw('area')">面积测量</li>
        <li @click="clean('clean')">清除</li>
        <li @click="showLocation=!showLocation">坐标定位</li>
      </ul>
      <span style="position:absolute;right:20px;top:15px;color:blue">坐标获取：{{mousePosition}}</span>
    </div>
    <Map ref="map" @map-click="mapClick" />
    <Location v-if="showLocation" />
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Location from "./components/Location.vue";

export default {
  name: "App",
  components: {
    Map,
    Location
  },
  data: function() {
    return {
      mousePosition: "",
      showLocation: false
    };
  },
  methods: {
    initDraw: function($event) {
      this.$refs.map.$emit("initDraw", $event);
    },
    clean: function() {
      this.$refs.map.$emit("clean");
      this.showLocation = false;
    },
    mapClick: function(evt) {
      this.mousePosition = evt;
    }
  }
};
</script>

<style>
body,
ul {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  /* margin-top: 60px; */
}
.header {
  height: 60px;
  background-color: #42b983;
}
.header img {
  height: 60px;
  float: left;
  line-height: 60px;
  background-color: #cef5ae;
}
.menu {
  display: inline-block;
  line-height: 60px;
}

.menu li {
  display: inline-block;
  width: 100px;
  color: #fff;
  cursor: pointer;
  height: 60px;
}
.menu li:hover {
  background-color: #10b168;
}
.ol-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
  font-size: 12px;
}
.ol-tooltip-measure {
  opacity: 1;
  font-weight: bold;
}
.ol-tooltip-static {
  background-color: #6533ff;
  color: #fff;
  border: 1px solid white;
}
.ol-tooltip-measure:before,
.ol-tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
.ol-tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>
