<template>
  <q-layout>
    <Header />
    <q-page-container>
      <div class="q-pa-md row items-start">
        <div class="col-6 col-sm-12 col-xs-12 col-md-6">
          <q-input
            style="width: 350px"
            v-model="busqueda"
            debounce="500"
            filled
            dense
            placeholder="Busqueda"
            hint="Busca por categoría o por nombre :D"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <br />
          <q-list padding style="max-height: 500px; overflow-y: scroll;">
            <q-separator spaced />
            <div v-for="item in negocios" v-bind:key="item.uid" @mouseover="mouseOver(item)">
              <q-item class="q-mt-md q-mb-md">
                <q-item-section top thumbnail class="q-ml-none">
                  <q-img
                    v-on:click="redirect(item.uid)"
                    style="width:60px"
                    v-if="item.image!=='' && item.image!=null"
                    :src="'https://drive.google.com/uc?export=view&id='+item.image"
                  ></q-img>
                </q-item-section>

                <q-item-section v-on:click="redirect(item.uid)">
                  <q-item-label class="text-h6">{{item.name | uppercase}}</q-item-label>
                  <q-item-label caption>{{item.description | cutcad}}.</q-item-label>
                </q-item-section>

                <q-item-section bottom side>
                  <div class="q-gutter-xs">
                    <q-btn
                      v-if="item.whatsapp==='1'"
                      type="a"
                      target="_blank"
                      :href="`https://api.whatsapp.com/send?phone=521${ item.cellphone }&text=Hola!%20Te%20encontre%20en%20apoya%20local%20y%20quiero%20informacion%20por%20favor`"
                      size="12px"
                      color="light-green-14"
                      flat
                      dense
                      round
                      icon="fab fa-whatsapp"
                    />
                    <q-btn
                      type="a"
                      :href="`tel:+${ item.cellphone }`"
                      size="12px"
                      color="green-14"
                      flat
                      dense
                      round
                      icon="phone"
                    />
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
            </div>
          </q-list>
        </div>

        <div v-if="$q.screen.gt.xs" class="col-6 col-sm-12 col-xs-12 col-md-6">
          <GmapMap
            ref="themap"
            :center="{lat:currentLocation.lat, lng:currentLocation.lng}"
            :zoom="zoom"
            :options="{ streetViewControl: false,clickableIcons: false }"
            style="width: 100%; height: 600px"
            @dragend="test"
          >
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="closeInfo"
            >
              <div>
                <p>{{hoverName}}</p>
              </div>
            </gmap-info-window>
            <GmapMarker
              v-for="item in negocios"
              v-bind:key="item.uid"
              ref="themarker"
              :position="{lat: parseFloat(item.lat), lng: parseFloat(item.lng)}"
              :clickable="true"
              :draggable="false"
              @click="handleClick"
            />
          </GmapMap>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/MainMenu.vue";
import servidor from "@/server_conf.js";

export default {
  name: "Item",
  components: {
    Header
  },
  data() {
    return {
      busqueda: "",
      defaultLat: "19.043522331313046",
      defaultLng: "-98.19798590761836",
      negocios: [],
      hoverName: "",
      zoom: 13,
      currentLocation: { lat: 19.043522331313046, lng: -98.19798590761836 },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false
    };
  },
  mounted: function() {
    this.geolocation();
    let self = this;
    this.axios
      .post(
        servidor + "index.php/Inicio/get_negocios_busqueda",
        JSON.stringify({
          query: this.$route.params.query,
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng
        })
      )
      .then(function(response) {
        self.negocios = response.data;
      });
  },
  watch: {
    busqueda: function() {
      this.search();
    }
  },
  methods: {
    search: function() {
      this.infoWinOpen = false;
      this.zoom = 16;
      let self = this;
      this.axios
        .post(
          servidor + "index.php/Inicio/get_negocios_busqueda",
          JSON.stringify({
            query: this.busqueda,
            lat: this.currentLocation.lat,
            lng: this.currentLocation.lng
          })
        )
        .then(function(response) {
          self.negocios = response.data;
          self.ready = true;
        });
    },
    test: function() {
      //console.log("end");
      var lat = this.$refs.themap.$mapObject.getCenter().lat();
      var lng = this.$refs.themap.$mapObject.getCenter().lng();
      this.currentLocation = {
        lat: lat,
        lng: lng
      };
      this.search();
    },
    handleClick: function(location) {
      var lat = location.latLng.lat();
      var lng = location.latLng.lng();
      this.currentLocation = {
        lat: lat,
        lng: lng
      };
      this.infoWinOpen = true;
      this.hoverName = this.nameByLocation(lat, lng);
      this.infoWindowPos = {
        lat: lat,
        lng: lng
      };
    },
    closeInfo: function() {
      this.zoom = 13;
      this.infoWinOpen = false;
    },
    redirect: function(uid) {
      this.$router.push("/item/" + uid);
    },
    mouseOver: function(item) {
      this.infoWinOpen = true;
      this.zoom = 16;
      if (item.lat != "") {
        this.hoverName = item.name.toUpperCase();
        this.infoWindowPos = {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng)
        };
        this.currentLocation = {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng)
        };
      }
      else{
        this.hoverName = item.name.toUpperCase()+" - No hay ubicación registrada";
        this.infoWindowPos = {
          lat: parseFloat(this.defaultLat),
          lng: parseFloat(this.defaultLng)
        };
        this.currentLocation = {
          lat: parseFloat(this.defaultLat),
          lng: parseFloat(this.defaultLng)
        };
      }
    },
    geolocation: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    nameByLocation(lat, lng) {
      var nombreMarker = "";
      this.negocios.forEach(item => {
        if (item.lat == lat && item.lng == lng) {
          nombreMarker = item.name;
        }
      });
      return nombreMarker;
    }
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    },
    cutcad: function(v) {
      return v.substring(0, 200);
    }
  }
};
</script>

<style>
.item-title {
  top: 0;
  bottom: 0;
  left: 0;
  width: 70px;
  height: 2px;
  background: #33eb39;
  content: "";
}
</style>