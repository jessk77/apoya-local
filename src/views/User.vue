<template>
  <q-layout>
    <Header />

    <q-page-container>
      <div class="q-mr-lg q-ml-lg">
        <q-parallax style="height: 220px;">
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
              <div class="text-h3 text-white text-left q-ml-lg">Panel de usuario</div>
              <div class="text-h6 text-grey-3 text-left q-ml-lg">Configura como se ve tu negocio</div>
            </div>

            <div class="main-shapes">
              <img v-if="$q.screen.gt.xs" src="/images/main_slider_shapes.png" class="q-ml-lg" />
            </div>
          </template>
        </q-parallax>

        <div class="row items-start">
          <div class="col-7 col-sm-12 col-xs-12 col-md-7">
            <form action="#" @submit.prevent="submit">
              <q-stepper
                flat
                v-model="step"
                header-nav
                ref="stepper"
                vertical
                done-color="green-14"
                active-color="light-green-14"
                animated
              >
                <q-step :name="1" title="Datos generales" icon="settings" :done="step > 1">
                  <div
                    class="text-subtitle1 text-center q-mb-lg"
                  >Configura como tus clientes ven tu negocio.</div>

                  <div class="row justify-center items-center">
                    <q-input
                      filled
                      v-model="name"
                      type="text"
                      dense
                      required
                      label="Nombre"
                      style="width: 390px;"
                      class="q-mb-sm"
                    />
                  </div>
                  <div class="row justify-center items-center">
                    <q-input
                      filled
                      v-model="description"
                      dense
                      required
                      type="textarea"
                      label="Descripción"
                      style="width: 390px;"
                      class="q-mb-sm"
                    />
                  </div>
                  <div class="row justify-center items-center">
                    <q-input
                      filled
                      v-model="cellphone"
                      dense
                      required
                      mask="(###) ### - ####"
                      unmasked-value
                      label="Celular"
                      style="width: 260px;"
                      class="q-mb-sm"
                    />
                    <q-checkbox v-model="whatsapp" true-value="1"
        false-value="0" label="Es WhatsApp?" color="green-14" />
                  </div>
                  <div class="row justify-center items-center">
                    <q-input
                      filled
                      v-model="phone"
                      mask="(###) ### - ####"
                      unmasked-value
                      dense
                      label="Teléfono"
                      style="width: 390px;"
                      class="q-mb-sm"
                    />
                  </div>
                  <div class="row justify-center items-center">
                    <q-input
                      filled
                      v-model="conditions"
                      type="textarea"
                      dense
                      label="Condiciones de envío"
                      style="width: 390px;"
                      class="q-mb-sm"
                    />
                  </div>
                  <div class="row justify-center items-center">
                    <q-select
                      filled
                      label="Categorías"
                      hint="Seleccionalas del menu o agrega tu categoria escribiendola y pulsando 'enter'"
                      v-model="category"
                      use-input
                      use-chips
                      multiple
                      input-debounce="0"
                      @new-value="createValue"
                      :options="filterOptions"
                      @filter="filterFn"
                      style="width: 390px"
                    />
                  </div>
                  <q-stepper-navigation>
                    <q-btn @click="step = 2" color="light-green-14" label="Ir a mapa" />
                  </q-stepper-navigation>
                </q-step>

                <q-step :name="2" title="Ubicación en el Mapa" icon="place" :done="step > 2">
                  <div class="text-subtitle1 text-center q-mb-lg">Mueve tu ubicación en el mapa.</div>

                  <GmapMap
                    :center="{lat:currentLocation.lat, lng:currentLocation.lng}"
                    :zoom="15"
                    :options="{ streetViewControl: false }"
                    style="width: 100%; height: 350px"
                  >
                    <GmapMarker
                      :position="{lat:currentLocation.lat, lng:currentLocation.lng}"
                      :clickable="true"
                      :draggable="true"
                      @dragend="getCoordenadas($event.latLng)"
                    />
                  </GmapMap>
                  <br />
                  <q-stepper-navigation>
                    <q-btn
                      flat
                      @click="step = 1"
                      color="light-green-14"
                      label="Atras"
                      class="q-ml-sm"
                    />
                    <q-btn @click="step = 3" color="light-green-14" label="Ir a imagen" />
                  </q-stepper-navigation>
                </q-step>

                <q-step :name="3" title="Imagen de Portada" caption="Opcional" icon="image">
                  <div
                    class="text-subtitle1 text-center q-mb-lg"
                  >Sube una imagen .png o .jpg no mayor a 3MB.</div>
                  <div class="row justify-center items-center">
                    <q-input
                      filled
                      ref="file"
                      type="file"
                      dense
                      style="width: 350px;"
                      class="q-mb-sm"
                      @change="onFileChange"
                    />
                  </div>

                  <div id="preview">
                    <img v-if="file_url" :src="file_url" />
                  </div>
                  <br />
                  <q-stepper-navigation>
                    <q-btn
                      flat
                      @click="step = 2"
                      color="light-green-14"
                      label="Atras"
                      class="q-ml-sm"
                    />
                  </q-stepper-navigation>
                </q-step>
              </q-stepper>
              <div class="text-center">
                <q-btn
                  type="submit"
                  label="GUARDAR"
                  color="light-green-14"
                  class="q-mb-lg q-mt-md"
                  style="width: 200px;"
                />
              </div>
            </form>
          </div>

          <div class="col-5 col-sm-12 col-xs-12 col-md-5">
            <div class="q-pa-md q-mt-lg">
              <q-markup-table flat bordered>
                <thead>
                  <tr class="text-light-green-14">
                    <th colspan="5">
                      <div class="row no-wrap items-center">
                        <div class="text-subtitle2">Productos</div>
                      </div>
                    </th>
                  </tr>
                  <tr v-if="!userDb">
                    <th colspan="5">
                      <div class="row no-wrap items-center">
                        <div
                          class="q-ml-md"
                        >Para agregar productos primero debes guardar tu información general</div>
                      </div>
                    </th>
                  </tr>
                  <tr v-if="userDb">
                    <th colspan="5">
                      <div class="row no-wrap items-center">
                        <q-input
                          filled
                          dense
                          v-model="product_name"
                          class="q-mr-sm"
                          label="Nombre"
                        />
                        <q-input
                          filled
                          dense
                          v-model="product_price"
                          type="number"
                          class="q-mr-sm"
                          label="precio"
                        />
                        <q-btn color="light-green-14" round icon="add" v-on:click="add_product()" />
                      </div>
                    </th>
                  </tr>
                  <tr class="bg-grey-3">
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Precio</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody class>
                  <tr v-for="(item, index) in products" v-bind:key="item.id">
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-right">${{item.price}}</td>
                    <td class="text-right">
                      <q-btn
                        size="sm"
                        color="red"
                        flat
                        dense
                        round
                        icon="delete"
                        v-on:click="detele_product(item.id,index)"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
// import servidor from '@/server_conf.js'
import Header from "@/components/MainMenu";

import { gmapApi } from "vue2-google-maps";

import servidor from "@/server_conf.js";
import stringOptions from "@/categories.js";


export default {
  name: "User",
  components: {
    Header
  },
  data() {
    return {
      step: 1,
      userDb: false,
      menuActive: false,
      uid: "",
      name: "",
      description: "",
      cellphone: "",
      phone: "",
      conditions: "",
      category: [],
      whatsapp: "1",
      lat: "",
      lng: "",
      product_name: "",
      product_price: "",
      products: [],
      file_url: "images/pic_box_2.jpg",
      portada: null,
      currentLocation: { lat: 19.043522331313046, lng: -98.19798590761836 },
      filterOptions: stringOptions
    };
  },
  computed: {
    google: gmapApi
  },
  beforeCreate: function() {
    
    if (!this.$session.exists()) {
      this.$router.push("/");
    } else {
      this.uid = this.$session.get("jwt");
      //console.log(this.$session.get("jwt"));
    }
  },
  mounted: function() {
    this.geolocation();
    let self = this;
    this.axios
      .post(
        servidor + "index.php/Inicio/get_data",
        JSON.stringify({
          uid: this.$session.get("jwt")
        })
      )
      .then(function(response) {
        if (response.data != null) {
          self.name = response.data.name;
          self.description = response.data.description;
          self.cellphone = response.data.cellphone;
          self.whatsapp = response.data.whatsapp;
          self.phone = response.data.phone;
          self.conditions = response.data.conditions;
          self.category = response.data.category.split(",");
          self.lat = response.data.lat;
          self.lng = response.data.lng;
          self.products = response.data.products;
          self.currentLocation = {
            lat: parseFloat(response.data.lat),
            lng: parseFloat(response.data.lng)
          };
          if (response.data.image != "" && response.data.image != null) {
            self.file_url =
              "https://drive.google.com/uc?export=view&id=" +
              response.data.image;
          }

          self.userDb = true;
        } else {
          self.userDb = false;
        }
      });
  },
  methods: {
    submit() {
      let self = this;
      let formData = new FormData();
      formData.append("uid", this.$session.get("jwt"));
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("cellphone", this.cellphone);
      formData.append("whatsapp", this.whatsapp);
      formData.append("phone", this.phone);
      formData.append("conditions", this.conditions);
      formData.append("category", this.category.join());
      formData.append("lat", this.lat);
      formData.append("lng", this.lng);
      if (this.portada != null) {
        formData.append("portada", this.portada);
      }

      this.$q.loading.show({
        message: "<b>Guardando,</b> espere un momento...<br/>"
      });

      this.axios
        .post(servidor + "index.php/Inicio/save_data", formData)
        .then(function(response) {
          self.userDb = true;
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
      //console.log(this.coordenadas);
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
    },
    add_product() {
      if (this.products.length <= 30) {
        if (
          !isNaN(this.product_price) &&
          this.product_name != "" &&
          this.product_price != ""
        ) {
          let self = this;
          this.$q.loading.show({
            message: "<b>Guardando,</b> espere un momento...<br/>"
          });
          this.axios
            .post(
              servidor + "index.php/Inicio/save_product",
              JSON.stringify({
                name: this.product_name,
                price: this.product_price,
                uid: this.$session.get("jwt")
              })
            )
            .then(function(response) {
              self.$q.loading.hide();
              self.products.push({
                id: response,
                name: self.product_name,
                price: self.product_price
              });
            });
        } else {
          this.$q.notify({
            color: "warning",
            message: "Ingresa un valor valido",
            icon: "warning",
            position: "top-right"
          });
        }
      } else {
        this.$q.notify({
          color: "warning",
          message: "Limite de Productos: 30",
          icon: "warning",
          position: "top-right"
        });
      }
    },
    detele_product(id, index) {
      let self = this;
       this.$q.loading.show({
            message: "<b>Eliminando,</b> espere un momento...<br/>"
          });
      this.axios
        .post(servidor + "index.php/Inicio/delete_product/" + id)
        .then(function() {
          self.$q.loading.hide();
          self.products.splice(index, 1);
        });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      console.log(file);
      if (file.size > 2048 * 2048) {
        this.$q.notify({
          color: "warning",
          message: "La imagen es muy grande",
          icon: "warning",
          position: "center"
        });
        return;
      } else if (file.type != "image/jpeg" && file.type != "image/png") {
        this.$q.notify({
          color: "warning",
          message: "La imagen no tiene un formato valido",
          icon: "warning",
          position: "center"
        });
      } else {
        this.portada = e.target.files[0];
        this.file_url = URL.createObjectURL(file);
      }
    },
    
    createValue(val, done) {
      if (val.length > 0) {
        const model = (this.model || []).slice();

        val
          .split(/[,;|]+/)
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .forEach(v => {
            if (stringOptions.includes(v) === false) {
              stringOptions.push(v);
            }
            if (model.includes(v) === false) {
              model.push(v);
            }
          });

        done(null);
        this.model = model;
      }
    },

    filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.filterOptions = stringOptions;
        } else {
          const needle = val.toLowerCase();
          this.filterOptions = stringOptions.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    }
  }
};
</script>

<style >
#preview {
  display: flex;
  justify-content: center;
  align-items: left;
}

#preview img {
  max-width: 100%;
  max-height: 250px;
}
</style>

