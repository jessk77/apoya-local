<template>
  <q-layout>
    <Header />

    <q-page-container>
      <div class="q-mr-lg q-ml-lg">
        <q-parallax style="height: 450px;">
          <template v-slot:media>
            <img src="images/main_slider_1.jpg" />
          </template>

          <template v-slot:content="scope">
            <div
              class="absolute column items-left"
              :style="{
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
            >
              <h1 class="text-h3 text-white text-left q-ml-lg q-mt-none">Apoya el comercio local</h1>
              <div class="text-h6 text-grey-3 text-left q-ml-lg">
                <q-input
                  outlined
                  square
                  bg-color="white"
                  v-model="busqueda"
                  dense
                  placeholder="Busca negocios cerca de ti"
                  style="width: 300px;"
                  class="q-mt-lg"
                />
                <q-btn
                  dense
                  :to="{ name: 'Search', params: {query: busqueda } }"
                  label="buscar"
                  size="16px"
                  color="light-green-14"
                  class="q-mt-lg q-pa-sm"
                  style="width: 200px;"
                />
              </div>
            </div>

            <div class="main-shapes">
              <img v-if="$q.screen.gt.xs" src="/images/main_slider_shapes.png" class="q-ml-lg" />
            </div>
          </template>
        </q-parallax>
        <br />
        <p class="text-h5 text-center q-mt-lg text-grey-9">MIEMBROS DE LA COMUNIDAD</p>
        <br />
        <div class="q-pa-md row items-start">
          <div
            class="col-4 col-sm-12 col-xs-12 col-md-4 q-pa-md"
            v-for="item in negocios"
            v-bind:key="item.uid"
          >
            <q-card class="my-card">
              <router-link class="pic_box_link" :to="{ name: 'Item', params: {uid: item.username } }">
                <q-img style="height: 280px" :src="item.image | driveImage" />
              </router-link>
              <q-card-section>
                <q-btn
                  fab
                  color="green-14"
                  icon="place"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%);"
                />

                <h5 class="q-ma-none col text-h5 ellipsis">{{item.name}}</h5>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-btn flat type="a" :href="`tel:+${ item.cellphone }`" icon="phone" name="phone">
                  <div class="text-subtitle1">・{{item.cellphone}}</div>
                </q-btn>
                <div class="text-caption text-grey-7">{{item.description | cutcad}}.</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="text-center">
            <q-btn
                  to="/members"
                  label="ver todos"
                  size="16px"
                  color="green-14"
                  class="q-mt-lg q-mb-lg"
                  style="width: 200px;"
                />
        </div>
        

        <q-parallax >
          <template v-slot:media>
            <img src="images/main_slider_2.jpg" />
          </template>

          <template v-slot:content="scope">
            <div
              class="absolute column items-center"
              :style="{
            top: (scope.percentScrolled * 50) + '%',
            left: 0,
            right: 0
          }"
            >
            <h1 class="text-h3 text-white text-left q-ml-lg q-mt-none">¿Qué es Apoya local?</h1>
              <img src="/images/tipoApoya.png" style="width: 250px" />

              <div class="text-subtitle1 text-grey-3 text-center q-ma-lg">
                Este sitio ha sido creado para apoyar a los comercios locales de la ciudad de Puebla,
                <br />debido a la contingencia de COVID-19.
                <br />La finalidad es encontrar los negocios más cercanos para solicitar productos a domicilio,
                <br />lamentablemente muchos negocios mexicanos no cuentan con los recursos suficientes
                <br />como para cerrar durante el aislamiento.
              </div>
              <q-btn
                  type="a"
                  href="https://atomikod.com/contact.php"
                  target="a_blank"
                  label="contacto"
                  size="16px"
                  color="light-green-14"
                  class="q-mt-lg q-mb-lg"
                  style="width: 200px;"
                />
                
              

            </div>

            <!-- <div  class="main-shapes">
              <img v-if="$q.screen.gt.xs" src="/images/main_slider_shapes.png" class="q-ml-lg" />
            </div>-->
          </template>
        </q-parallax>
      </div>

      <q-page-sticky position="top-right" :offset="[0, 18]">
        <q-btn type="a"
                  href="https://www.facebook.com/apoyalocalmx" target="a_blank" size="lg" color="indigo" :icon="fabFacebook" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import servidor from "@/server_conf.js";
import Header from "@/components/MainMenu";
import { fabFacebook } from "@quasar/extras/fontawesome-v5";
import { openURL } from "quasar";

export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      busqueda: null,
      negocios: []
    };
  },
  mounted: function() {
    let self = this;
    this.axios
      .post(servidor + "index.php/Inicio/get_negocios")
      .then(function(response) {
        self.negocios = response.data;
      });
  },
  methods: {
    callCellphone: function(phone) {
      openURL("tel:" + phone);
    }
  },
  filters: {
    driveImage: function(v) {
      if (v != "" && v != null) {
        return  v;
      } else {
        return "images/pic_box_2.jpg";
      }
    },
    cutcad: function(v) {
      return v.substring(0, 250) + "...";
    }
  },
  created() {
    this.fabFacebook = fabFacebook;
  }
};
</script>



<style >
.main-shapes {
  position: absolute;
  top: 10%;
  right: 16%;
  max-width: 25%;
  height: auto;
  z-index: 2;
}

.my-card {
  /* height: "300px;"; */
}
</style>

