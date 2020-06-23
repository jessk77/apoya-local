<template>
  <q-layout>
    <Header />
    <q-page-container>
      <div class="q-pa-md row items-start">
        <div class="col-1 col-sm-12 col-md-1"></div>
        <div class="col-10 col-sm-12 col-md-10">
          <div class="row items-start">
            <div class="col-2 col-sm-12 col-xs-12 col-md-2 text-center">
              <q-img style="width: 90%;" :src="file_url" :ratio="1" />
              <!-- <q-img style="width: 90%; height: auto" :src="file_url"></q-img> -->
              <!-- <q-img style="width: 300px; height: auto" :src="file_url"></q-img> -->
            </div>
            <div class="col-10 col-sm-12 col-xs-12 col-md-10">
              <p class="text-h4 q-mt-lg">{{name | uppercase}}</p>
              <div class="item-title"></div>
              <p class="q-mt-lg text-grey-7" style="fontSize:15px">{{description}}</p>
              <div class="q-pa-md flex">
                <div class="text-h6 q-ma-sm">
                  <q-icon class="text-light-green-14" name="phone_iphone" />
                  {{cellphone}} ・
                </div>
                <div v-if="phone!=='-' && phone!==''" class="text-h6 q-ma-sm">
                  <q-icon class="text-light-green-14" name="phone" />
                  {{phone}} ・
                </div>
                <div v-if="conditions!=='-' && conditions!==''" class="text-h6 q-ma-sm">
                  <q-icon class="text-light-green-14" name="local_taxi" />
                  <span style="fontSize:13px; width: 50%">{{conditions}}</span>
                </div>
              </div>
              <q-btn
                type="a"
                :href="`tel:+${cellphone }`"
                label="LLAMAR"
                color="green-14"
                icon="phone"
                class="q-mb-lg q-mr-sm"
              />
              <q-btn
                v-if="whatsapp==='1'"
                type="a"
                target="_blank" 
                :href="`https://api.whatsapp.com/send?phone=521${ cellphone }&text=Hola!%20Te%20encontre%20en%20apoya%20local%20y%20quiero%20informacion%20por%20favor`" 
                label="enviar whatsapp"
                color="light-green-14"
                icon="fab fa-whatsapp"
                class="q-mb-lg"
              />
            </div>
          </div>
          <GmapMap
            :center="{lat:currentLocation.lat, lng:currentLocation.lng}"
            :zoom="14"
            :options="{ streetViewControl: false }"
            style="width: 100%; height: 300px"
          >
            <GmapMarker
              :position="{lat:currentLocation.lat, lng:currentLocation.lng}"
              :clickable="false"
              :draggable="false"
            />
          </GmapMap>
          <br />
          <q-markup-table flat bordered v-if="products.length>0">
            <thead class="bg-grey-3">
              <tr>
                <th colspan="5">
                  <div class="row no-wrap items-center">
                    <div class="text-h5 q-ml-md">Productos que ofrece:</div>
                  </div>
                </th>
              </tr>
              <tr>
                <th class="text-left">Producto</th>
                <th class="text-left">Precio</th>
              </tr>
            </thead>
            <tbody class>
              <tr v-for="item in products" v-bind:key="item.id">
                <td class="text-left">{{ item.name | uppercase }}</td>
                <td class="text-left">${{item.price}}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import servidor from "@/server_conf.js";
import Header from "@/components/MainMenu";

export default {
  name: "Item",
  components: {
    Header
  },
  data() {
    return {
      file_url: "",
      name: "",
      description: "",
      cellphone: "",
      phone: "-",
      whatsapp: '0',
      conditions: "-",
      products: [],
      currentLocation: { lat: 19.043522331313046, lng: -98.19798590761836 }
    };
  },
  mounted: function() {
    let self = this;
    this.axios
      .post(
        servidor + "index.php/Inicio/get_data",
        JSON.stringify({
          uid: this.$route.params.uid
        })
      )
      .then(function(response) {
        self.name = response.data.name;
        self.description = response.data.description;
        self.cellphone = response.data.cellphone;
        self.whatsapp = response.data.whatsapp;
        self.phone = response.data.phone;
        self.conditions = response.data.conditions;
        self.products = response.data.products;
        self.currentLocation = {
          lat: parseFloat(response.data.lat),
          lng: parseFloat(response.data.lng)
        };
        if (response.data.image != "" && response.data.image != null) {
          self.file_url =
            "https://drive.google.com/uc?export=view&id=" + response.data.image;
        } else {
          self.file_url = "/images/pic_box_2.jpg";
        }
      });
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
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