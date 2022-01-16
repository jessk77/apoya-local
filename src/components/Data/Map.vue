<template>
  <div>
    <div class="q-ma-sm">
      <div class="text-subtitle1 text-center q-mb-sm">Mueve tu ubicación en el mapa.</div>

      <GmapMap
        :center="{lat:currentLocation.lat, lng:currentLocation.lng}"
        :zoom="15"
        :options="{ streetViewControl: false }"
        style="width: 100%; height: 300px"
      >
        <GmapMarker
          :position="{lat:lat, lng:lng}"
          :clickable="true"
          :draggable="true"
          @dragend="getCoordenadas($event.latLng)"
        />
      </GmapMap>
    </div>
    <div class="text-center">
      <q-btn
        @click="submit"
        label="GUARDAR"
        color="light-green-14"
        class="q-mb-lg"
        style="width: 200px;"
      />
    </div>
  </div>
</template>
<script>
import { gmapApi } from "vue2-google-maps";
import servidor from "@/server_conf.js";
export default {
  name: "Map",
  props: ["data"],
  data() {
    return {
      lat: "",
      lng: "",
      currentLocation: { lat: 19.39857526367259, lng: -99.1066917016915 }
    };
  },
  computed: {
    google: gmapApi
  },
  mounted: function() {
    
    if (this.data != null) {
      if (this.data.lat != 0) {
        this.lat = parseFloat(this.data.lat);
        this.lng = parseFloat(this.data.lng);
        this.currentLocation = {
          lat: parseFloat(this.data.lat),
          lng: parseFloat(this.data.lng)
        };
      }
    }else{
      this.geolocation();
    }
  },
  methods: {
    submit() {
      let self = this;
      let formData = new FormData();
      formData.append("uid", this.$session.get("jwt"));
      formData.append("lat", this.lat);
      formData.append("lng", this.lng);

      this.$q.loading.show({
        message: "<b>Guardando,</b> espere un momento...<br/>"
      });

      this.axios
        .post(servidor + "index.php/Inicio/save_data", formData)
        .then(function(response) {
          self.$q.loading.hide();
          self.$q.notify({
            color: "light-green-14",
            message: "Datos guardados",
            icon: "tag_faces",
            position: "bottom"
          });
          console.log(response);
          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCoordenadas(evnt) {
      this.lat = evnt.lat();
      this.lng = evnt.lng();
      console.log(this.lat, this.lng);
    },
    geolocation: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        if (this.lat == "") {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      });
    }
  }
};
</script>