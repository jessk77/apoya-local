<template>
  <div>
    <div class="text-h6 q-mb-md">Datos generales</div>
    <q-form @submit="submit">
      <div class="row q-gutter-row">
        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="row justify-center items-center">
            <q-input
              filled
              ref="name"
              v-model="name"
              type="text"
              dense
              lazy-rules
              :rules="[val => !!val || 'Este campo es obligatorio']"
              label="Nombre"
              style="width: 390px;"
              class="q-mb-sm"
            />
          </div>
          <div class="row justify-center items-center">
            <q-input
              filled
              ref="username"
              v-model="username"
              type="text"
              dense
              bottom-slots
              error-message="El nombre de usuario no es valido"
              hint="Utilice solo numeros y letras en minúscula"
              :error="!validUsername"
              label="Nombre de usuario"
              style="width: 390px;"
              class="q-mb-sm"
            />
            <p
              v-if="userError"
              style="width: 390px;"
              class="q-pa-sm text-white bg-red"
            >Este nombre de usuario ya esta siendo usado.</p>
          </div>
          <div class="row justify-center items-center">
            <q-input
              filled
              ref="description"
              v-model="description"
              dense
              lazy-rules
              :rules="[val => !!val || 'Este campo es obligatorio']"
              type="textarea"
              label="Descripción"
              style="width: 390px;"
              class="q-mb-sm"
            />
          </div>
        </div>

        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="row justify-center items-center">
            <q-input
              filled
              ref="cellphone"
              v-model="cellphone"
              dense
              lazy-rules
              :rules="[val => !!val || 'Este campo es obligatorio']"
              mask="(###) ### - ####"
              unmasked-value
              label="Celular"
              style="width: 260px;"
              class="q-mb-sm"
            />
            <q-checkbox
              v-model="whatsapp"
              true-value="1"
              false-value="0"
              label="Es WhatsApp?"
              color="green-14"
            />
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
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
        </div>
      </div>
      <div class="text-center">
        <q-btn
          type="submit"
          label="GUARDAR"
          color="light-green-14"
          class="q-mb-lg"
          style="width: 200px;"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import stringOptions from "@/categories.js";
import servidor from "@/server_conf.js";
import firebase from "firebase";

export default {
  name: "General",
  props: ["data"],
  data() {
    return {
      tab: "general",
      uid: "",
      name: "",
      usernameOrigin: "",
      username: "",
      userError: false,
      description: "",
      cellphone: "",
      phone: "",
      conditions: "",
      category: [],
      whatsapp: "1",
      filterOptions: stringOptions
    };
  },
  computed: {
    validUsername() {
      var valido = true;
      var regexp = new RegExp("^[0-9a-z]+$");
      if (this.username.length == 0 && this.username.length > 30) {
        valido = false;
      }
      if (!regexp.test(this.username)) {
        valido = false;
      }
      return valido;
    }
  },
  mounted: function() {
    if (this.data != null) {
      this.name = this.data.name;
      this.username = this.data.username;
      this.usernameOrigin = this.data.username;
      this.description = this.data.description;
      this.cellphone = this.data.cellphone;
      this.whatsapp = this.data.whatsapp;
      this.phone = this.data.phone;
      this.conditions = this.data.conditions;
      this.category = this.data.category.split(",");
    }
  },
  methods: {
    submit: async function() {

        if(this.username!=this.usernameOrigin){
          var valido=await this.validateUser()
          
          if(valido){
            this.userError=true;
            return;
          }
        }

      
        let self = this;
        let formData = new FormData();
        formData.append("uid", this.$session.get("jwt"));
        formData.append("name", this.name);
        formData.append("username", this.username);
        formData.append("description", this.description);
        formData.append("cellphone", this.cellphone);
        formData.append("whatsapp", this.whatsapp);
        formData.append("phone", this.phone);
        formData.append("conditions", this.conditions);
        formData.append("category", this.category.join());

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
            self.usernameOrigin = self.username;
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      
    },
    validateUser: async function (){
        try {
          const snapshot = await firebase.firestore().collection('users').where('username', '==', this.username).get()
          const userData= snapshot.docs.map(doc => doc.data())[0];
          return userData? true : false;
        }
        catch{
          return false;
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