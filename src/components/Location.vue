<template>
  <div class="location">
    <label>输入经纬度：</label>
    <input v-model="position" />
    <button @click="locate">定位</button>
  </div>
</template>

<script>
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

import { getLayersById } from "../shared/utils";

export default {
  name: "Location",
  props: {},
  data: function() {
    return { position: "", marker: null };
  },
  methods: {
    locate: function() {
      if (!this.position.trim()) {
        alert("请输入经纬度");
        return;
      }

      const lonlat = this.position.split(",");
      // console.log(lonlat);
      const map = window.map;
      map.removeLayer(getLayersById("location_marker"));
      var view = map.getView();
      var wh = fromLonLat(lonlat);
      view.setCenter(wh);
      const vectorSource = new VectorSource({});
      this.marker = new Feature({
        type: "icon",
        geometry: new Point(wh)
      });
      vectorSource.addFeature(this.marker);
      const iconStyle = new Style({
        image: new Icon({
          opacity: 0.75,
          src:
            "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
        })
      });
      const vectorLayer = new VectorLayer({
        id: "location_marker",
        source: vectorSource,
        style: iconStyle
      });
      //添加进map层
      map.addLayer(vectorLayer);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.location {
  position: absolute;
  z-index: 200;
  width: 300px;
  height: 100px;
  top: 150px;
  left: 40%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 3px 5px #888;
}
</style>
