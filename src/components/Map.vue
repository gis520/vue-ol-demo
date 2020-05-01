<template>
  <div>
    <div id="map" :style="{ height: mapHeight + 'px' }"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { defaults as defaultControls, OverviewMap } from "ol/control";
import { transform } from "ol/proj";

import {
  vector,
  addInteraction,
  clearDrawOnMap
} from "../shared/tools/measure";

export default {
  name: "Map",
  props: {},
  data: function() {
    return {
      mapHeight: 500,
      map: null
    };
  },
  created: function() {
    this.mapHeight = window.innerHeight - 60;
    // 初始化绘制工具
    this.$on("initDraw", type => {
      addInteraction(this.map, type);
    });
    this.$on("clean", () => {
      clearDrawOnMap(this.map);
    });
  },
  mounted: function() {
    const source = new XYZ({
      url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    });
    const overviewMapControl = new OverviewMap({
      layers: [
        new TileLayer({
          source
        })
      ]
    });

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source
        }),
        vector
      ],
      controls: defaultControls().extend([overviewMapControl]),
      view: new View({
        center: [500000, 6000000],
        zoom: 7
      })
    });
    this.map = map;
    // 根据鼠标事件获取当前的经纬度
    map.on("click", $event => {
      const lonlat = transform($event.coordinate, "EPSG:3857", "EPSG:4326");
      //   console.log(lonlat);
      this.$emit(
        "map-click",
        `${lonlat[0].toFixed(6)},${lonlat[1].toFixed(6)}`
      );
    });
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>